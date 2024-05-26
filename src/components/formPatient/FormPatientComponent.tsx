"use client";

import Image from "next/image";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { ButtonComponent } from "@/components";
import { createPatient, updatePatient } from "@/lib/actions/actions";

type FormData = {
  id?: string;
  name: string;
  age: string;
  doctorOffice: string;
};

const FormSchema: ZodType<FormData> = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  age: z.string().min(1),
  doctorOffice: z.string().min(1),
});

export default function FormPatientComponent({
  newPatient = false,
  patient,
}: {
  newPatient?: boolean;
  patient?: FormData;
}) {
  const router = useRouter();
  const params = useParams();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: patient,
  });

  const cancelButtonAction = () => {
    if (newPatient) {
      return "/patients";
    } else {
      return `/patients/${params.id}`;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (!newPatient) {
        const patientId = patient?.id || "";
        await updatePatient(data, patientId);
      } else {
        await createPatient(data);
      }
      reset({ name: "", age: "", doctorOffice: "" });
      router.back();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className='p-6 rounded-[12px] bg-bgDark-080'>
      <div className='flex justify-center items-center'>
        <Image
          className='w-[200px] h-[200px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          src='/images/noResults.png'
          alt='No se encontraron resultados'
          width={200}
          height={200}
        />
      </div>
      <form className='w-full px-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mt-6'>
          <label className='text-small text-txtLight-100 ' htmlFor='name'>
            Nombre del paciente
          </label>
          <input
            id='name'
            className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
            placeholder='Nombre del paciente'
            {...register("name")}
          />
          {errors.name && (
            <span className='text-msg-error h-10'>Campo Requerido</span>
          )}
        </div>
        <div className='flex flex-col mt-6'>
          <label className='text-small text-txtLight-100 ' htmlFor='age'>
            Edad
          </label>
          <input
            id='age'
            className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
            placeholder='Edad (años)'
            {...register("age")}
          />
          {errors.age && (
            <span className='text-msg-error h-10'>
              Campo Requerido, debe ser numero
            </span>
          )}
        </div>
        <div className='flex flex-col mt-6'>
          <label
            className='text-small text-txtLight-100 '
            htmlFor='doctorOffice'>
            Consultorio
          </label>
          <input
            className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
            placeholder='Consultorio'
            {...register("doctorOffice")}
          />
          {errors.doctorOffice && (
            <span className='text-msg-error h-10'>Campo Requerido</span>
          )}
        </div>
        <div className='mt-[60px] h-[60px] w-full'>
          <ButtonComponent
            type='submit'
            variant='primary'
            label='Guardar'
            widthfull
          />
        </div>
        <div className='mt-[60px] h-[60px] w-full'>
          <ButtonComponent
            type='button'
            variant='secondary'
            label='Cancelar'
            widthfull
            anchor
            anchorUrl={cancelButtonAction()}
          />
        </div>
      </form>
    </section>
  );
}
