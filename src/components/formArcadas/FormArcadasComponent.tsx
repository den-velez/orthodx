"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonComponent, ModalComponent } from "@/components";
import { IArches } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";
import {
  getDiscrepancyDiagnostic,
  getExpansionDiagnostic,
} from "@/lib/diagnostic/arches";

import { PAGE_TITLES } from "@/constants/constants";

type FormData = {
  d11?: string;
  d12?: string;
  d13?: string;
  d21?: string;
  d22?: string;
  d23?: string;
  d31?: string;
  d32?: string;
  d33?: string;
  d41?: string;
  d42?: string;
  d43?: string;
  d4a4: string;
  loAnt?: string;
  dist3a3Inf?: string;
  dist6a6Inf?: string;
  dist6a6Inf2?: string;
  dist6a6Sup?: string;
};

const FormSchema: ZodType<FormData> = z.object({
  d11: z.string().optional(),
  d12: z.string().optional(),
  d13: z.string().optional(),
  d21: z.string().optional(),
  d22: z.string().optional(),
  d23: z.string().optional(),
  d31: z.string().optional(),
  d32: z.string().optional(),
  d33: z.string().optional(),
  d41: z.string().optional(),
  d42: z.string().optional(),
  d43: z.string().optional(),
  d4a4: z.string().min(1),
  loAnt: z.string().optional(),
  dist3a3Inf: z.string().optional(),
  dist6a6Inf: z.string().optional(),
  dist6a6Inf2: z.string().optional(),
  dist6a6Sup: z.string().optional(),
});

export default function FormArcadasComponent({
  patientId,
  currentValoration,
}: {
  patientId: string;
  currentValoration: IArches;
}) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
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

    const dist6a6Inf = getValues("dist6a6Inf");
    if (dist6a6Inf !== getValues("dist6a6Inf2")) {
      setValue("dist6a6Inf2", dist6a6Inf);
    }

    const dataFixed = {
      d11: Number(data.d11) || 0,
      d12: Number(data.d12) || 0,
      d13: Number(data.d13) || 0,
      d21: Number(data.d21) || 0,
      d22: Number(data.d22) || 0,
      d23: Number(data.d23) || 0,
      d31: Number(data.d31) || 0,
      d32: Number(data.d32) || 0,
      d33: Number(data.d33) || 0,
      d41: Number(data.d41) || 0,
      d42: Number(data.d42) || 0,
      d43: Number(data.d43) || 0,
      loAnt: Number(data.loAnt) || 0,
      d4a4: Number(data.d4a4) || 0,
      dist6a6Sup: Number(data.dist6a6Sup) || 0,
      dist3a3Inf: Number(data.dist3a3Inf) || 0,
      dist6a6Inf: Number(data.dist6a6Inf) || 0,
      dist6a6Inf2: Number(data.dist6a6Inf2) || 0,
    };
    const discrepancy = await getDiscrepancyDiagnostic(dataFixed);
    const expansion = await getExpansionDiagnostic(dataFixed);

    const payload = {
      valorationArches: dataUpdated,
      discrepancyDiagnostic: discrepancy,
      expansionDiagnostic: expansion,
    };

    try {
      const user = await updatePatient(payload, patientId);
      setSubmitted(true);
    } catch (error) {
      setError("root", {
        message: "El email o la contraseña son incorrectos",
      });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateDist6a6Inf2 = (retroinclinacion: boolean) => {
    const dist6a6Inf = getValues("dist6a6Inf");
    if (retroinclinacion) {
      const newValue = Number(dist6a6Inf) + 2;
      setValue("dist6a6Inf2", newValue.toString());
    } else {
      setValue("dist6a6Inf2", dist6a6Inf);
    }
    closeModal();
  };

  return (
    <>
      <ModalComponent isOpen={isOpen}>
        <div className=' py-10 px-6 flex flex-col gap-10 items-center shadow-inner'>
          <h3 className='text-h5 text-txtLight-100'>
            ¿Tiene retroinclinación Postero inferior?
          </h3>
          <div className='h-[60px] flex justify-evenly gap-10'>
            <div className='min-w-28'>
              <ButtonComponent
                label='No'
                variant='secondary'
                onClick={() => updateDist6a6Inf2(false)}
                widthfull
              />
            </div>
            <div className='min-w-28'>
              <ButtonComponent
                label='Si'
                variant='primary'
                onClick={() => updateDist6a6Inf2(true)}
                widthfull
              />
            </div>
          </div>
        </div>
      </ModalComponent>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto grid gap-[60px] w-full max-w-[500px]'>
        <section className='w-full px-3 pt-6 pb-[60px] bg-bgDark-080 rounded-[12px] shadow'>
          <h3 className='mb-6 text-h3 text-light-090 text-center capitalize'>
            {PAGE_TITLES.arches}
          </h3>

          <div className='px-6 grid grid-cols-6 gap-3'>
            <div className='mt-8 flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>1.3</span>
              </label>
              <input
                placeholder='1.3'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d13")}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>1.2</span>
              </label>
              <input
                placeholder='1.2'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d12")}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>1.1</span>
              </label>
              <input
                placeholder='1.1'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d11")}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>2.1</span>
              </label>
              <input
                placeholder='2.1'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d21")}
              />
            </div>
            <div className='flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>2.2</span>
              </label>
              <input
                placeholder='2.2'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d22")}
              />
            </div>
            <div className='mt-8 flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>2.3</span>
              </label>
              <input
                placeholder='2.3'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d23")}
              />
            </div>
          </div>
          <div className='h-[140px] flex flex-col items-center justify-end'>
            <div className='flex flex-col items-center gap-1'>
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>Distancia 6 a 6 Superior</span>
              </label>
              <input
                placeholder='dist 6 a 6'
                className='h-8 w-20 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("dist6a6Sup")}
              />
            </div>
          </div>

          <div className='min-h-[180px]  mt-24 flex flex-col items-center justify-start gap-3'>
            {getValues("dist6a6Inf") !== getValues("dist6a6Inf2") && (
              <div className='flex flex-col items-center gap-1'>
                <label
                  htmlFor=''
                  className='text-caption text-txtDark-090 flex flex-col items-center'>
                  <span>Distancia 6 a 6 Inferior</span>
                  <span>(Retroinclinación)</span>
                </label>
                <input
                  placeholder='dist 6 a 6'
                  className='h-8 w-20 text-center no-spinner'
                  type='number'
                  step='0.1'
                  pattern='^\d+(\.\d{1})?$'
                  disabled
                  {...register("dist6a6Inf2")}
                />
              </div>
            )}
            <div className='flex flex-col items-center gap-1'>
              <label htmlFor='' className='text-caption text-txtDark-090'>
                Distancia 6 a 6 Inferior
              </label>
              <input
                placeholder='dist 6 a 6'
                className='h-8 w-20 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("dist6a6Inf")}
                onBlur={() => {
                  openModal();
                }}
              />
            </div>
          </div>
          <div className='px-6 grid grid-cols-6 gap-3'>
            <div className='flex flex-col items-center gap-1'>
              <input
                placeholder='4.3'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d43")}
              />
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>4.3</span>
              </label>
            </div>
            <div className='mt-8 flex flex-col items-center gap-1'>
              <input
                placeholder='4.2'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d42")}
              />
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>4.2</span>
              </label>
            </div>
            <div className='mt-8 flex flex-col items-center gap-1'>
              <input
                placeholder='4.1'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d41")}
              />
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>4.1</span>
              </label>
            </div>
            <div className='mt-8 flex flex-col items-center gap-1'>
              <input
                placeholder='3.1'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d31")}
              />
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>3.1</span>
              </label>
            </div>
            <div className='mt-8 flex flex-col items-center gap-1'>
              <input
                placeholder='3.2'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d32")}
              />
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>3.2</span>
              </label>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <input
                placeholder='3.3'
                className='w-full h-8 text-center no-spinner'
                type='number'
                step='0.1'
                pattern='^\d+(\.\d{1})?$'
                {...register("d33")}
              />
              <label
                htmlFor=''
                className='text-caption text-txtDark-090 flex flex-col items-center'>
                <span>3.3</span>
              </label>
            </div>
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
