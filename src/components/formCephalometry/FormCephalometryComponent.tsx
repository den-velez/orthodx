"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonComponent } from "@/components";
import { CEPHALOMETRY_ITEMS } from "@/constants/constants";
import { TCephalometryItem, ICephalometry } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";
import { cephalometryDiagnostic } from "@/lib/diagnostic/cephalometry";

type FormData = {
  na: string;
  longMaxilar: string;
  longMandibular: string;
  alturaFacialInf: string;
  planoMandibular: string;
  witts: string;
  ejeFacial: string;
  locPorion: string;
  mm: string;
  bimler: string;
  ejeIncisivoSuperior: string;
  ejeIncisivoInferior: string;
  molarInferior: string;
  comments?: string;
};

const FormSchema: ZodType<FormData> = z.object({
  na: z.string().min(1),
  longMaxilar: z.string().min(1),
  longMandibular: z.string().min(1),
  alturaFacialInf: z.string().min(1),
  planoMandibular: z.string().min(1),
  witts: z.string().min(1),
  ejeFacial: z.string().min(1),
  locPorion: z.string().min(1),
  mm: z.string().min(1),
  bimler: z.string().min(1),
  ejeIncisivoSuperior: z.string().min(1),
  ejeIncisivoInferior: z.string().min(1),
  molarInferior: z.string().min(1),
  comments: z.string().optional(),
});

function CephalometryItem({
  label,
  inputName,
  rangeLabel,
  rangeMin,
  rangeMax,
  register,
  errors,
}: TCephalometryItem) {
  const errorStyle = errors[inputName] ? "bg-msg-error text-txtLight-100" : "";
  return (
    <div className='flex gap-3 text-small sm:text-body'>
      <div
        className='flex justify-between px-3 py-2 flex-grow bg-bgDark-070 text-txtBrand-secondary
      '>
        <span>{label}</span>
        {rangeLabel && <span>{rangeLabel}</span>}
        {!rangeLabel && (
          <div className='flex gap-2'>
            <span className='px-1 sm:px-3 border border-bgDark-080'>
              {rangeMin}
            </span>
            <span className='px-1 sm:px-3 border border-bgDark-080'>
              {rangeMax}
            </span>
          </div>
        )}
      </div>
      <div className='w-[20%] flex gap-3 justify-between'>
        <div className='w-2 h-full bg-txtBrand-primary'></div>
        <input
          type='number'
          {...register(inputName, { required: true })}
          className={`bg-light-100 w-full text-center text-h5 ${errorStyle}`}
        />
      </div>
    </div>
  );
}

export default function FormCephalometryComponent({
  currentValoration,
  patientId,
}: {
  currentValoration: ICephalometry;
  patientId: string;
}) {
  const [isSubmitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: currentValoration,
  });

  const onSubmit = async (data: FormData) => {
    const createdAt =
      currentValoration.createdAt === "" ||
      currentValoration.createdAt === undefined
        ? new Date().toISOString().split("T")[0]
        : currentValoration.createdAt;
    const updatedAt = new Date().toISOString().split("T")[0];
    const dataUpdated = { ...data, createdAt, updatedAt };

    const cephalometry = await cephalometryDiagnostic({
      na: Number(data.na),
      longitudMaxilar: Number(data.longMaxilar),
      longitudMandibular: Number(data.longMandibular),
      alturaFacialInf: Number(data.alturaFacialInf),
      planoMandibular: Number(data.planoMandibular),
      witts: Number(data.witts),
      ejeFacial: Number(data.ejeFacial),
      locDePorion: Number(data.locPorion),
      mm: Number(data.mm),
      bimler: Number(data.bimler),
      ejeIncisivoSuperior: Number(data.ejeIncisivoSuperior),
      ejeIncisivoInferior: Number(data.ejeIncisivoInferior),
      segundoMolarInferior: Number(data.molarInferior),
      comments: data.comments,
    });

    const payload = { valorationCephalometry: dataUpdated, cephalometry };

    try {
      const user = await updatePatient(payload, patientId);
      setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "El email o la contraseña son incorrectos",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=' grid gap-3'>
        {CEPHALOMETRY_ITEMS.map((item, index) => (
          <CephalometryItem
            key={index}
            register={register}
            errors={errors}
            {...item}
          />
        ))}

        <div className='mt-3 w-full flex flex-col gap-3'>
          <label
            className='w-full text-txtBrand-secondary text-center'
            htmlFor='observaciones'>
            Observaciones De Radiografia Panoramica
          </label>
          <textarea
            className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
            {...register("comments")}
            rows={6}></textarea>
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
              label='Siguiente'
              variant='primary'
              widthfull
              anchor
              anchorUrl={`/patients/${patientId}/dental`}
            />
          </div>
        )}
      </form>
    </>
  );
}
