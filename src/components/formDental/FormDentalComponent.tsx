"use client";

import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonComponent } from "@/components";
import { IDental } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";
import { DENTAL_ITEMS, ARCADAS_ITEMS } from "@/constants/contants";

type FormData = {
  relacionMolarDer: string;
  relacionMolarIzq: string;
  relacionCaninaDer: string;
  relacionCaninaIzq: string;
  mordidaPosteriorDer: string;
  mordidaPosteriorIzq: string;
  denticion: string;
  tamanoArcadaSup: string;
  tamanoArcadaInf: string;
  formaArcadaInf: string;
  formaArcadaSup: string;
  apinamientoSup: string;
  apinamientoInf: string;
  mordidaAnterior: string;
  mordidaAnteriorMM?: string;
  comments?: string;
};

const FormSchema: ZodType<FormData> = z.object({
  relacionMolarDer: z.string().min(1),
  relacionMolarIzq: z.string().min(1),
  relacionCaninaDer: z.string().min(1),
  relacionCaninaIzq: z.string().min(1),
  mordidaPosteriorDer: z.string().min(1),
  mordidaPosteriorIzq: z.string().min(1),
  denticion: z.string().min(1),
  tamanoArcadaSup: z.string().min(1),
  tamanoArcadaInf: z.string().min(1),
  formaArcadaInf: z.string().min(1),
  formaArcadaSup: z.string().min(1),
  apinamientoSup: z.string().min(1),
  apinamientoInf: z.string().min(1),
  mordidaAnterior: z.string().min(1),
  mordidaAnteriorMM: z.string().optional(),
  comments: z.string().optional(),
});

type TDentalItems = {
  label: string;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  name:
    | "relacionMolarDer"
    | "relacionMolarIzq"
    | "relacionCaninaDer"
    | "relacionCaninaIzq"
    | "mordidaPosteriorDer"
    | "mordidaPosteriorIzq"
    | "denticion"
    | "tamanoArcadaSup"
    | "tamanoArcadaInf"
    | "formaArcadaInf"
    | "formaArcadaSup"
    | "apinamientoSup"
    | "apinamientoInf"
    | "mordidaAnterior"
    | "mordidaAnteriorMM";
  options: string[];
};

function DentalFormItem({
  label,
  name,
  register,
  errors,
  options = [],
}: TDentalItems) {
  return (
    <div className='flex flex-col'>
      <label className='capitalize text-small text-ctaLight-090'>{label}</label>
      <select
        {...register(name)}
        className='px-3 py-2 rounded-bl-[12px] bg-bgDark-070 text-ctaLight-090 text-h5'>
        <option value=''>Seleccionar</option>
        {options.map((option, key) => (
          <option key={key} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className='text-msg-error text-small'>
          {errors[name].message}
        </span>
      )}
    </div>
  );
}

export default function FormDentalComponent({
  patientId,
  currentValoration,
}: {
  patientId: string;
  currentValoration: IDental;
}) {
  const [isSubmitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
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

    const payload = { valorationDental: dataUpdated };
    console.log("payload: ", payload);
    return;
    try {
      const user = await updatePatient(payload, patientId);
      setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "El email o la contraseña son incorrectos",
      });
    }
  };
  watch("denticion");

  return (
    <>
      <h3 className='text-h2 text-txtBrand-primary text-center'>
        Valoración Dental
        <button onClick={() => console.log(errors)} className='text-h5'>
          errors
        </button>
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className='grid gap-6'>
        <section className='px-3 py-6 bg-bgDark-080 rounded-[12px] shadow'>
          <h3 className='mb-6 text-h3 text-light-090 text-center capitalize'>
            Dental
          </h3>
          <div className='grid gap-3'>
            {DENTAL_ITEMS.map((item, index) => (
              <DentalFormItem
                key={index}
                register={register}
                errors={errors}
                {...item}
              />
            ))}
          </div>
          {watch("mordidaAnterior") !== "normal" &&
            watch("mordidaAnterior") !== "borde a borde" && (
              <div className='mt-3 gap-3 flex items-center justify-end '>
                <label
                  className='flex-grow capitalize  text-ctaLight-090 text-right'
                  htmlFor='mordidaAnteriorMM'>
                  Mordida Anterior en mm
                </label>
                <input
                  className='p-3 w-[25%]  bg-bgDark-070 text-ctaLight-090 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
                  id='mordidaAnteriorMM'
                  type='number'
                  {...register("mordidaAnteriorMM")}
                />
              </div>
            )}
        </section>
        <section className='px-3 py-6 bg-bgDark-080 rounded-[12px] shadow'>
          <h3 className='mb-6 text-h3 text-light-090 text-center capitalize'>
            Arcadas
          </h3>
          <div className='grid gap-3'>
            {ARCADAS_ITEMS.map((item, index) => (
              <DentalFormItem
                key={index}
                register={register}
                errors={errors}
                {...item}
              />
            ))}
          </div>
        </section>
        <div className='mt-[48px] w-full flex flex-col gap-3'>
          <label
            className='w-full text-txtBrand-secondary text-center'
            htmlFor='observaciones'>
            Observaciones Oclusion Y Guias Funcionales
          </label>
          <textarea
            className='p-3 w-full rounded-[12px] focus:outline-none focus:ring-2 focus:ring-cta-100 focus:ring-opacity-50 text-h5'
            name='observaciones'
            id=''
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
              anchorUrl={`/patients/${patientId}/arcadas`}
            />
          </div>
        )}
      </form>
    </>
  );
}
