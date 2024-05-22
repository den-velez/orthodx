"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonComponent, ModalComponent } from "@/components";
import { IArches } from "@/interfaces";
import { updatePatient } from "@/lib/actions/actions";

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

    const payload = { valorationArches: dataUpdated };

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
      <ModalComponent isOpen={false}>
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
            Arcadas
          </h3>

          <div className='px-6 grid grid-cols-6 gap-3'>
            <input
              placeholder='1.3'
              className='h-8 mt-8 text-center'
              type='number'
              {...register("d13")}
            />
            <input
              placeholder='1.2'
              className='h-8 text-center'
              type='number'
              {...register("d12")}
            />
            <input
              placeholder='1.1'
              className='h-8 text-center'
              type='number'
              {...register("d11")}
            />
            <input
              placeholder='2.1'
              className='h-8 text-center'
              type='number'
              {...register("d21")}
            />
            <input
              placeholder='2.2'
              className='h-8 text-center'
              type='number'
              {...register("d22")}
            />
            <input
              placeholder='2.3'
              className='h-8 mt-8 text-center'
              type='number'
              {...register("d23")}
            />
          </div>
          <div className='flex flex-col items-center gap-3'>
            <input
              placeholder='dist 1 a 1'
              className='h-8 w-20 text-center'
              type='number'
              {...register("loAnt")}
            />
            <input
              placeholder='dist 4 a 4'
              className='h-8 w-20 text-center'
              type='number'
              {...register("d4a4")}
            />
            <input
              placeholder='dist 6 a 6'
              className='h-8 w-20 text-center'
              type='number'
              {...register("dist6a6Sup")}
            />
          </div>

          <div className='mt-24 flex flex-col items-center gap-3'>
            {getValues("dist6a6Inf") !== getValues("dist6a6Inf2") && (
              <input
                placeholder='dist 6 a 6'
                className='h-8 w-20 text-center'
                type='number'
                disabled
                {...register("dist6a6Inf2")}
              />
            )}
            <input
              placeholder='dist 6 a 6'
              className='h-8 w-20 text-center'
              type='number'
              {...register("dist6a6Inf")}
              onBlur={() => {
                openModal();
              }}
            />
            <input
              placeholder='dist 3 a 3'
              className='h-8 w-20 text-center'
              type='number'
              {...register("dist3a3Inf")}
            />
          </div>
          <div className='px-6 grid grid-cols-6 gap-3'>
            <input
              placeholder='4.3'
              className='h-8 text-center'
              type='number'
              {...register("d43")}
            />
            <input
              placeholder='4.2'
              className='mt-8 h-8 text-center'
              type='number'
              {...register("d42")}
            />
            <input
              placeholder='4.1'
              className='mt-8 h-8 text-center'
              type='number'
              {...register("d41")}
            />
            <input
              placeholder='3.1'
              className='mt-8 h-8 text-center'
              type='number'
              {...register("d31")}
            />
            <input
              placeholder='3.2'
              className='mt-8 h-8 text-center'
              type='number'
              {...register("d32")}
            />
            <input
              placeholder='3.3'
              className='h-8 text-center'
              type='number'
              {...register("d33")}
            />
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
              label='Siguiente'
              variant='primary'
              widthfull
              anchor
              anchorUrl={`/patients/${patientId}/odontogram`}
            />
          </div>
        )}
      </form>
    </>
  );
}
