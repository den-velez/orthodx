"use client";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updatePatient } from "@/lib/actions/actions";
import { getKorkhauseTurnsModified } from "@/lib/diagnostic/arches";
import { IDiscrepancyDiagnostic, IToothSize, IExpansion } from "@/interfaces";
import { ButtonComponent, ModalComponent } from "@/components";
import DentalSizeComponent from "./DentalSizeComponent";
export type FormDataDentalSize = {
  d11: string;
  d12: string;
  d13: string;
  d21: string;
  d22: string;
  d23: string;
  d31: string;
  d32: string;
  d33: string;
  d41: string;
  d42: string;
  d43: string;
  aboveSum: number;
  belowSum: number;
  discrepancy: boolean;
};

function getTeethSum(
  valuesArray: number[],
  factor?: number,
  factorRounded?: boolean
) {
  if (!factor && !factorRounded) {
    return valuesArray.reduce((a, b) => a + b, 0);
  }
  if (factor) {
    if (factorRounded) {
      return Math.round(valuesArray.reduce((a, b) => a + b, 0) * factor);
    }
    return valuesArray.reduce((a, b) => a + b, 0) * factor;
  }
}

const FormSchema: ZodType<FormDataDentalSize> = z.object({
  d11: z.string(),
  d12: z.string(),
  d13: z.string(),
  d21: z.string(),
  d22: z.string(),
  d23: z.string(),
  d31: z.string(),
  d32: z.string(),
  d33: z.string(),
  d41: z.string(),
  d42: z.string(),
  d43: z.string(),
  aboveSum: z.number(),
  belowSum: z.number(),
  discrepancy: z.boolean(),
});

export default function FormDentalSizeComponent({
  patientId,
  currentArcadas,
  discrepancyDx,
  dentalSizeModified,
  expansionDiagnostic,
}: {
  patientId: string;
  currentArcadas: any;
  discrepancyDx: IDiscrepancyDiagnostic;
  dentalSizeModified: IToothSize;
  expansionDiagnostic: IExpansion;
}) {
  const [dataShow, setDataShow] = useState<"paciente" | "calcular">("paciente");
  const [isSubmitted, setSubmitted] = useState(false);
  const [suggestionsShown, setSuggestionsShown] = useState(false);

  const {
    d11: d11P,
    d12: d12P,
    d13: d13P,
    d21: d21P,
    d22: d22P,
    d23: d23P,
    d31: d31P,
    d32: d32P,
    d33: d33P,
    d41: d41P,
    d42: d42P,
    d43: d43P,
  } = currentArcadas;

  const { discrepancy: discrepancyP } = discrepancyDx;

  const sumAboveRounded =
    discrepancyDx.sumAboveRounded == 0
      ? (getTeethSum(
          [
            Number(d13P) || 0,
            Number(d12P) || 0,
            Number(d11P) || 0,
            Number(d21P) || 0,
            Number(d22P) || 0,
            Number(d23P) || 0,
          ],
          0.75,
          true
        ) as number)
      : discrepancyDx.sumAboveRounded;
  const sumBelow =
    discrepancyDx.sumBelow == 0
      ? getTeethSum([
          Number(d43P) || 0,
          Number(d42P) || 0,
          Number(d41P) || 0,
          Number(d31P) || 0,
          Number(d32P) || 0,
          Number(d33P) || 0,
        ])
      : discrepancyDx.sumBelow;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<FormDataDentalSize>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      d11: dentalSizeModified.d11 || d11P || "",
      d12: dentalSizeModified.d12 || d12P || "",
      d13: dentalSizeModified.d13 || d13P || "",
      d21: dentalSizeModified.d21 || d21P || "",
      d22: dentalSizeModified.d22 || d22P || "",
      d23: dentalSizeModified.d23 || d23P || "",
      d31: dentalSizeModified.d31 || d31P || "",
      d32: dentalSizeModified.d32 || d32P || "",
      d33: dentalSizeModified.d33 || d33P || "",
      d41: dentalSizeModified.d41 || d41P || "",
      d42: dentalSizeModified.d42 || d42P || "",
      d43: dentalSizeModified.d43 || d43P || "",
      aboveSum: dentalSizeModified.aboveSum || sumAboveRounded,
      belowSum: dentalSizeModified.belowSum || sumBelow,
      discrepancy: dentalSizeModified.discrepancy || discrepancyP || false,
    },
  });

  const patientMeasures = {
    upper: [d13P, d12P, d11P, d21P, d22P, d23P],
    lower: [d43P, d42P, d41P, d31P, d32P, d33P],
  };

  const upperValues = useWatch({
    control,
    name: ["d13", "d12", "d11", "d21", "d22", "d23"],
  });

  const lowerValues = useWatch({
    control,
    name: ["d43", "d42", "d41", "d31", "d32", "d33"],
  });

  const sumAboveFactor = 0.75;
  const sumAboveCalculated = Math.round(
    sumAboveFactor * upperValues.reduce((acc, value) => acc + Number(value), 0)
  );
  const sumBelowCalculated = lowerValues.reduce(
    (acc, value) => acc + Number(value),
    0
  );
  const discrepancyCalculated = sumAboveCalculated !== sumBelowCalculated;

  const upperToothMeasuresTreatment = upperValues.map((value, index) => {
    if (Number(value) > Number(patientMeasures.upper[index])) {
      return "increase";
    } else if (Number(value) < Number(patientMeasures.upper[index])) {
      return "stripping";
    } else {
      return "none";
    }
  });

  const lowerToothMeasuresTreatment = lowerValues.map((value, index) => {
    if (Number(value) > Number(patientMeasures.lower[index])) {
      return "increase";
    } else if (Number(value) < Number(patientMeasures.lower[index])) {
      return "stripping";
    } else {
      return "none";
    }
  });

  const onSubmit = async (data: FormDataDentalSize) => {
    const createdAt =
      dentalSizeModified.createdAt === "" ||
      dentalSizeModified.createdAt === undefined
        ? new Date().toISOString().split("T")[0]
        : dentalSizeModified.createdAt;
    const updatedAt = new Date().toISOString().split("T")[0];
    const dataUpdated = { ...data, createdAt, updatedAt };

    const korkhauseTurnsModPayload = {
      d11: Number(dataUpdated.d11),
      d12: Number(dataUpdated.d12),
      d21: Number(dataUpdated.d21),
      d22: Number(dataUpdated.d22),
      dist6a6Sup: Number(currentArcadas.dist6a6Sup),
    };
    const korkhauseTurnsMod = await getKorkhauseTurnsModified(
      korkhauseTurnsModPayload
    );

    const payload = {
      expansionDiagnostic: {
        ...expansionDiagnostic,
        korkhauseTurnsMod: korkhauseTurnsMod.korkhauseModTurns,
      },
      toothSizeModifed: {
        ...dataUpdated,
        discrepancy: discrepancyCalculated,
        sumAbove: sumAboveCalculated,
        sumBelow: sumBelowCalculated,
      },
    };

    try {
      const user = await updatePatient(payload, patientId);
      if (user) setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "El email o la contraseña son incorrectos",
      });
    }
  };

  const openSuggestions = () => {
    setSuggestionsShown(true);
  };

  const closeSuggestions = () => {
    setSuggestionsShown(false);
  };

  return (
    <>
      <ModalComponent isOpen={suggestionsShown}>
        <div className='flex flex-col items-center gap-3 text-h5 text-txtLight-100'>
          {discrepancyDx.suggestions?.map((suggestion, index) => (
            <p key={index}>{suggestion}</p>
          ))}
          {discrepancyDx.suggestions?.length === 0 && <p>No hay sugerencias</p>}
          <div className='h-[60px] my-6 flex gap-6 w-[280px]'>
            <ButtonComponent
              label='Cerrar'
              variant='secondary'
              widthfull
              onClick={closeSuggestions}
            />
          </div>
        </div>
      </ModalComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='h-[60px] my-[48px] flex gap-6'>
          <ButtonComponent
            label='Paciente'
            variant={dataShow === "paciente" ? "primary-dark" : "secondary"}
            onClick={() => setDataShow("paciente")}
            widthfull
          />
          <ButtonComponent
            label='Calcular'
            variant={dataShow !== "paciente" ? "primary-dark" : "secondary"}
            onClick={() => setDataShow("calcular")}
            widthfull
          />
        </div>
        <div className='flex justify-center items-center  bg-bgDark-070 rounded-t-[12px]'>
          <h3 className='p-2 text-h3 text-txtDark-090 capitalize'>
            {dataShow}
          </h3>
        </div>
        {dataShow === "paciente" && (
          <DentalSizeComponent
            discrepancy={discrepancyP}
            patient={true}
            upper={patientMeasures.upper ?? []}
            lower={patientMeasures.lower ?? []}
            sumAbove={sumAboveRounded}
            sumBelow={sumBelow as number}
            register={register}
          />
        )}
        {dataShow === "calcular" && (
          <DentalSizeComponent
            discrepancy={discrepancyCalculated}
            patient={false}
            register={register}
            sumAbove={sumAboveCalculated}
            sumBelow={sumBelowCalculated}
            upperTreatment={upperToothMeasuresTreatment}
            lowerTreatment={lowerToothMeasuresTreatment}
          />
        )}
        <div className='h-[60px] my-[48px] flex gap-6'>
          <ButtonComponent
            label='Sugerencias'
            variant='secondary'
            widthfull
            onClick={openSuggestions}
          />
        </div>

        {!isSubmitted && (
          <div className='mt-[60px] h-[60px]'>
            <ButtonComponent
              type='submit'
              label='Guardar'
              variant='primary'
              widthfull
            />
          </div>
        )}
        {isSubmitted && (
          <div className='mt-[60px] h-[60px]'>
            <ButtonComponent
              label='Salir'
              variant='primary'
              widthfull
              anchor
              anchorUrl={`/patients/${patientId}`}
            />
          </div>
        )}
      </form>
    </>
  );
}
