"use client";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import CardContainer from "@/containers/card/CardContainer";
import { ButtonComponent, FooterComponent } from "@/components";
import { createDoctor } from "@/lib/actions/actions";

type FormData = {
  saludo: string;
  name: string;
};

const FormSchema: ZodType<FormData> = z.object({
  saludo: z.string().min(1),
  name: z.string().min(1),
});

export default function DoctorPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createDoctor(data);
      router.push("/patients");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className='bg-bgDark-090'>
      <main className='px-3 pt-6 pb-[60px]'>
        <CardContainer styles='flex flex-col items-center'>
          <div>
            <div>
              <Image
                className='w-[200px] h-[200px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
                width={40}
                height={40}
                src='/images/avatar.png'
                alt='doctor avatar'
              />
            </div>
          </div>
          <form className='w-full px-3' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col mt-6'>
              <label className='text-small text-txtLight-100 ' htmlFor='saludo'>
                Saludo
              </label>
              <select
                className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
                {...register("saludo")}>
                <option value='' selected>
                  Seleccionar
                </option>
                <option value='dr'>Dr</option>
                <option value='dra'>Dra</option>
              </select>
              {errors.saludo && (
                <span className='text-msg-error h-10'>Campo Requerido</span>
              )}
            </div>
            <div className='flex flex-col mt-6'>
              <label className='text-small text-txtLight-100 ' htmlFor='name'>
                Nombre
              </label>
              <input
                className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
                placeholder='Nombre del doctor'
                {...register("name")}
              />
              {errors.name && (
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
    </div>
  );
}
