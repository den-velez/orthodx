"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import DoctorHeaderComponent from "@/components/headers/doctorHeaderComponent";
import CardContainer from "@/containers/card/CardContainer";
import ButtonComponent from "@/components/button/ButtonComponent";
import FooterComponent from "@/components/footer/FooterComponent";

import { DOCTOR_MOCK_VALUE } from "@/constants/contants";

type Inputs = {
  avantar: string;
  doctorSaludo: string;
  doctorName: string;
};

const DoctorPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("doctorSaludo"));
  return (
    <main className='bg-bgDark-090'>
      <DoctorHeaderComponent {...DOCTOR_MOCK_VALUE} />

      <main className='px-3 pt-6 pb-[60px]'>
        <CardContainer styles='flex flex-col items-center'>
          <div>
            <div>
              <Image
                className='w-[200px] h-[200px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
                width={40}
                height={40}
                src={DOCTOR_MOCK_VALUE.avatar}
                alt={DOCTOR_MOCK_VALUE.name}
              />
            </div>
          </div>
          <form className='w-full px-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col mt-6'>
              <label
                className='text-small text-txtLight-100 '
                htmlFor='doctorSaludo'>
                Saludo
              </label>
              <input
                className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
                placeholder='Saludo'
                {...register("doctorSaludo")}
              />
              {errors.doctorSaludo && <span>This field is required</span>}
            </div>
            <div className='flex flex-col mt-6'>
              <label
                className='text-small text-txtLight-100 '
                htmlFor='doctorName'>
                Nombre
              </label>
              <input
                className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
                placeholder='Nombre del doctor'
                {...register("doctorName")}
              />
              {errors.doctorName && <span>This field is required</span>}
            </div>
            <div className='mt-[60px] h-[60px] w-full'>
              <ButtonComponent
                type='submit'
                variant='primary'
                label='Guardar'
                widthfull
              />
            </div>
          </form>
        </CardContainer>
        <div className='mt-[60px] h-[60px] px-6'>
          <ButtonComponent
            variant='primary-dark'
            label='OrthoDx shop'
            anchor
            anchorUrl='/store'
            widthfull
          />
        </div>
      </main>
      <FooterComponent type='doctor' />
    </main>
  );
};

export default DoctorPage;
