"use client";

import Image from "next/image";

import { useForm, SubmitHandler } from "react-hook-form";
import { ButtonComponent } from "@/components";
import { PATIENTLIST_MOCK } from "@/constants/contants";

type Inputs = {
  name: string;
  age: number;
  doctorOffice: string;
};

export default function PatientEditComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newPatient = {
      id: PATIENTLIST_MOCK.length + 1,
      avatar: "/images/avatar.png",
      name: data.name,
      age: data.age,
      doctorOffice: data.doctorOffice,
      fav: false,
    };
    PATIENTLIST_MOCK.push(newPatient);
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
            className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
            placeholder='Nombre del paciente'
            required
            {...register("name")}
          />
          {errors.name && (
            <span className='text-error h-10'>Campo Requerido</span>
          )}
        </div>
        <div className='flex flex-col mt-6'>
          <label className='text-small text-txtLight-100 ' htmlFor='age'>
            Edad
          </label>
          <input
            className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
            placeholder='Edad (años)'
            required
            {...register("age")}
          />
          {errors.age && <span>Campo Requerido</span>}
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
            required
            {...register("doctorOffice")}
          />
          {errors.doctorOffice && <span>Campo Requerido</span>}
        </div>
        <div className='mt-[60px] h-[60px] w-full'>
          <ButtonComponent
            type='button'
            variant='secondary'
            label='Cancelar'
            widthfull
            anchor
            anchorUrl='/patients'
          />
        </div>
        <div className='mt-[60px] h-[60px] w-full'>
          <ButtonComponent
            type='submit'
            variant='primary'
            label='Guardar'
            widthfull
            anchor
            anchorUrl='/patients'
          />
        </div>
      </form>
    </section>
  );
}
