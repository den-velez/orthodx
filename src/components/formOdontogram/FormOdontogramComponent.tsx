"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { string, z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonComponent, IconsComponent, ModalComponent } from "@/components";
import {
  IOdontogram,
  ToothState,
  ToothName,
  ITooth,
  ToothPathology,
  ToothLabel,
} from "@/interfaces";
import OdontogramModal from "./OdontogramModal";
import {
  odontogramUpItems,
  odontogramDownItems,
  STATUS_STYLES_ODONTOGRAM,
} from "@/constants/odontogram.constants";

import { updatePatient } from "@/lib/actions/actions";

const ToothStateEnum = z.enum([
  "ausente",
  "corona",
  "obturación",
  "cariesMesial",
  "cariesDistal",
  "cariesVestibular",
  "cariesLingual",
  "cariesOclusal",
  "",
]);

const ToothPathologyEnum = z.enum([
  "incluido",
  "erupción",
  "no erupcionado",
  "extruido",
  "ectópico",
  "mesiorotado",
  "mesioangulado",
  "distalrotado",
  "telescópico",
  "cruzado",
  "movilidad",
  "",
]);

const ToothNameEnum = z.enum([
  "d11",
  "d12",
  "d13",
  "d14",
  "d15",
  "d16",
  "d17",
  "d18",
  "d21",
  "d22",
  "d23",
  "d24",
  "d25",
  "d26",
  "d27",
  "d28",
  "d31",
  "d32",
  "d33",
  "d34",
  "d35",
  "d36",
  "d37",
  "d38",
  "d41",
  "d42",
  "d43",
  "d44",
  "d45",
  "d46",
  "d47",
  "d48",
  "",
]);

const ToothItem = z.object({
  name: ToothNameEnum.optional(),
  state: ToothStateEnum.optional(),
  pathology: ToothPathologyEnum.optional(),
});

type FormData = {
  d11?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d12?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d13?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d14?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d15?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d16?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d17?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d18?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d21?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d22?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d23?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d24?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d25?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d26?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d27?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d28?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d31?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d32?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d33?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d34?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d35?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d36?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d37?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d38?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d41?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d42?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d43?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d44?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d45?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d46?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d47?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  d48?: { name?: ToothName; state?: ToothState; pathology?: ToothPathology };
  generalPathology: { pathology?: string }[];
  comments?: string;
};

const FormSchema: ZodType<FormData> = z.object({
  generalPathology: z.array(
    z.object({
      pathology: string().optional(),
    })
  ),
  comments: z.string().optional(),
  d11: ToothItem.optional(),
  d12: ToothItem.optional(),
  d13: ToothItem.optional(),
  d14: ToothItem.optional(),
  d15: ToothItem.optional(),
  d16: ToothItem.optional(),
  d17: ToothItem.optional(),
  d18: ToothItem.optional(),
  d21: ToothItem.optional(),
  d22: ToothItem.optional(),
  d23: ToothItem.optional(),
  d24: ToothItem.optional(),
  d25: ToothItem.optional(),
  d26: ToothItem.optional(),
  d27: ToothItem.optional(),
  d28: ToothItem.optional(),
  d31: ToothItem.optional(),
  d32: ToothItem.optional(),
  d33: ToothItem.optional(),
  d34: ToothItem.optional(),
  d35: ToothItem.optional(),
  d36: ToothItem.optional(),
  d37: ToothItem.optional(),
  d38: ToothItem.optional(),
  d41: ToothItem.optional(),
  d42: ToothItem.optional(),
  d43: ToothItem.optional(),
  d44: ToothItem.optional(),
  d45: ToothItem.optional(),
  d46: ToothItem.optional(),
  d47: ToothItem.optional(),
  d48: ToothItem.optional(),
});

export default function FormOdontogramComponent({
  patientId,
  currentValoration,
}: {
  patientId: string;
  currentValoration: IOdontogram;
}) {
  const [tooth, setTooth] = useState({ label: "", image: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [pathologies, setPathologies] = useState<string[]>([]);

  const handleOpenModal = (label: string, image: string) => {
    setTooth({ label, image });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
    watch,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...currentValoration,
    },
  });

  const {
    fields: fieldsP,
    append: appendP,
    remove: removeP,
  } = useFieldArray({
    control,
    name: "generalPathology",
  });

  const onSubmit = async (data: FormData) => {
    const createdAt =
      currentValoration.createdAt === "" ||
      currentValoration.createdAt === undefined
        ? new Date().toISOString().split("T")[0]
        : currentValoration.createdAt;
    const updatedAt = new Date().toISOString().split("T")[0];
    const dataUpdated = { ...data, createdAt, updatedAt };

    const payload = { valorationOdotontogram: dataUpdated };

    try {
      const user = await updatePatient(payload, patientId);
      setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "Ocucrrio un error, voler a intentar",
      });
    }
  };

  return (
    <>
      <ModalComponent isOpen={isModalOpen}>
        <OdontogramModal
          label={tooth.label}
          image={tooth.image}
          onClose={closeModal}
          setInputValue={setValue}
          getInputsValue={getValues}
          register={register}
        />
      </ModalComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='pt-6 pb-20 bg-bgDark-080 rounded-[12px]'>
          <h3 className='mb-20 text-h3 text-light-090 text-center capitalize'>
            Odontograma
          </h3>
          <div className='h-[300px] flex relative items-start justify-center'>
            {odontogramUpItems.map((item, index) => {
              const quadrant = item.label.at(0);
              const tooth = Number(item.label.at(1));

              const labelStyle = quadrant === "2" ? "-scale-x-[1]" : "";
              const toothStyle =
                tooth >= 4
                  ? "bottom-0 left-[55px] "
                  : tooth >= 2
                  ? "top-[-25px] left-[-5px]"
                  : "top-[-30px] left-[calc(50%-10px)]";

              const piecelabel: ToothName = `d${item.label}` as ToothLabel;
              const piece = getValues(piecelabel) as ITooth;
              let statusStyle = "";
              if (piece) {
                const cariesIncluded = piece.state?.includes("caries");
                const cariesOclusal = piece.state?.includes("cariesOclusal");

                if (cariesIncluded && !cariesOclusal) {
                  const position =
                    Number(quadrant) === 1 || Number(quadrant) === 2
                      ? "upper"
                      : "lower";
                  const style = STATUS_STYLES_ODONTOGRAM[piece.state as string];
                  if (typeof style === "object") {
                    statusStyle = style[position] || "";
                  }
                } else {
                  statusStyle = piece.state
                    ? (STATUS_STYLES_ODONTOGRAM[piece.state] as string)
                    : "";
                }
              }
              return (
                <button
                  type='button'
                  key={item.label + index}
                  className={item.styles ?? ""}
                  onClick={() => handleOpenModal(item.label, item.image)}>
                  <div className='relative rounded-full'>
                    <p
                      className={`absolute text-light-090 ${labelStyle} ${toothStyle}`}>
                      {item.label}
                    </p>
                    <Image
                      className='w-full h-full'
                      src={item.image}
                      alt={item.label}
                      width={44}
                      height={40}
                      unoptimized
                    />
                    <div className={statusStyle ?? "hidden"} />
                  </div>
                </button>
              );
            })}
          </div>
          <div className='h-[300px] flex relative items-end justify-center '>
            {odontogramDownItems.map((item, index) => {
              const quadrant = item.label.at(0);
              const tooth = Number(item.label.at(1));

              const labelStyle = quadrant === "3" ? "-scale-x-[1]" : "";
              const toothStyle =
                tooth >= 4
                  ? "top-[10%] left-[65px] "
                  : tooth >= 2
                  ? "bottom-[-25px] left-[-5px]"
                  : "bottom-[-30px] left-[calc(50%-10px)]";
              const piecelabel: ToothName = `d${item.label}` as ToothLabel;
              const piece = getValues(piecelabel) as ITooth;
              let statusStyle = "";
              if (piece) {
                const cariesIncluded = piece.state?.includes("caries");
                const cariesOclusal = piece.state?.includes("cariesOclusal");

                if (cariesIncluded && !cariesOclusal) {
                  const position =
                    Number(quadrant) === 1 || Number(quadrant) === 2
                      ? "upper"
                      : "lower";
                  const style = STATUS_STYLES_ODONTOGRAM[piece.state as string];
                  if (typeof style === "object") {
                    statusStyle = style[position] || "";
                  }
                } else {
                  statusStyle = piece.state
                    ? (STATUS_STYLES_ODONTOGRAM[piece.state] as string)
                    : "";
                }
              }

              return (
                <button
                  type='button'
                  key={item.label + index}
                  className={item.styles ?? ""}
                  onClick={() => handleOpenModal(item.label, item.image)}>
                  <div className='relative rounded-full'>
                    <p
                      className={`absolute text-light-090 ${labelStyle} ${toothStyle} `}>
                      {item.label}
                    </p>
                    <Image
                      className='w-full h-full'
                      src={item.image}
                      alt={item.label}
                      width={44}
                      height={40}
                      unoptimized
                    />
                    <div className={statusStyle ?? "hidden"} />
                  </div>
                </button>
              );
            })}
          </div>
          <div className='w-full px-[10%] mt-20 text-txtBrand-alternative '>
            <h4 className='text-h4 mb-4'>Patologias</h4>
            <ul className='flex flex-col gap-2 text-small'>
              {Object.keys(getValues()).map((key) => {
                if (key.startsWith("d")) {
                  const allValues = getValues() as any;
                  const pathology = allValues[key].pathology;
                  if (pathology && pathology.length > 0) {
                    return <li>{`${key}: ${pathology}`}</li>;
                  }
                }
              })}
            </ul>
          </div>
        </section>
        <section className='mt-6 p-6 bg-bgDark-080 rounded-[12px]'>
          <div className='w-full grid gap-6'>
            <h4 className='text-h4 text-ctaLight-090 text-center'>
              Padecimientos Generales
            </h4>
            <div className='mt-3 grid gap-3'>
              {fieldsP.map((field, index) => (
                <div
                  key={field.id}
                  className='h-12 flex justify-between items-center bg-bgDark-070 text-ctaLight-090'>
                  <input
                    {...register(
                      `generalPathology.${index}.pathology` as const
                    )}
                    placeholder={`Agregar nevo padecimiento`}
                    className='w-full h-full px-3 first-letter:capitalize text-h5 bg-bgDark-070 focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50'
                    onBlur={() => {
                      setValue(
                        `generalPathology.${index}.pathology` as const,
                        getValues(
                          `generalPathology.${index}.pathology` as const
                        )
                      );
                    }}
                  />
                  <button className='px-3' onClick={() => removeP(index)}>
                    <IconsComponent icon='trash' />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-6 flex justify-center'>
            <ButtonComponent
              label='Agregar Padecimiento'
              variant='secondary'
              onClick={() => appendP({ pathology: "" })}
            />
          </div>
          <div className='mt-[60px] w-full flex flex-col gap-3'>
            <label
              className='w-full text-txtBrand-secondary text-center'
              htmlFor='observaciones'>
              Observaciones Generales
            </label>
            <textarea
              className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
              {...register("comments")}
              rows={4}></textarea>
          </div>
        </section>
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
