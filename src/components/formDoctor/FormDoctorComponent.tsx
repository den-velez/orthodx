"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDoctor, updateDoctor } from "@/lib/actions/actions";
import { uploadImage } from "@/lib/firebase/storage";
import CardContainer from "@/containers/card/CardContainer";
import { ButtonComponent, IconsComponent } from "@/components";
import { IDoctor } from "@/interfaces";

type FormData = {
  avatar?: string;
  greetings: string;
  name: string;
};

const FormSchema: ZodType<FormData> = z.object({
  avatar: z.string().optional(),
  greetings: z.string().min(1),
  name: z.string().min(1),
});

export default function FormDoctorComponent(doctorData: IDoctor) {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id as string;
  const [isSubmitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      avatar: doctorData.avatar || "",
      greetings: doctorData.greetings || "",
      name: doctorData.name || "",
    },
  });

  const imageURL = doctorData.avatar || "/images/avatar.png";

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const url = await uploadImage(file, "avatar", file.name);
      if (url) {
        const payload = {
          ...doctorData,
          ...getValues(),
          avatar: url,
        };

        if (doctorId === "" || doctorId === "new" || doctorId === undefined) {
          const doctorId = await createDoctor(payload);
          if (doctorId) router.push(`/doctors/${doctorId}`);
        } else {
          await updateDoctor(payload, doctorId);
        }
        setValue("avatar", url);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    const createdAt =
      doctorData.createdAt === "" || doctorData.createdAt === undefined
        ? new Date().toISOString().split("T")[0]
        : doctorData.createdAt;
    const updatedAt = new Date().toISOString().split("T")[0];
    const dataUpdated = { ...data, createdAt, updatedAt };

    try {
      if (doctorId === "" || doctorId === "new" || doctorId === undefined) {
        const doctorId = await createDoctor(dataUpdated);
        if (doctorId) router.push(`/doctors/${doctorId}`);
      } else {
        const payload = { ...doctorData, ...dataUpdated };
        await updateDoctor(payload, doctorId);
        setSubmitted(true);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <CardContainer styles='flex flex-col items-center'>
      <div className='relative flex flex-col items-center justify-center'>
        <div>
          <Image
            className='w-[200px] h-[200px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
            width={200}
            height={200}
            src={imageURL == "" ? "/images/avatar.png" : imageURL}
            alt='doctor avatar'
          />
        </div>
        <div className='absolute px-3 py-2 bottom-[-16px] bg-cta-090 text-h5 rounded-lg text-txtDark-090 '>
          <label htmlFor='image' className='flex items-center gap-3'>
            <IconsComponent icon='camera' />
            <span className='h-full border-l px-2'>Cambiar</span>
          </label>
          <input
            className='hidden'
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
          />
        </div>
      </div>
      <form className='w-full px-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mt-6'>
          <label className='text-small text-txtLight-100 ' htmlFor='greetings'>
            Saludo
          </label>
          <select
            className='p-3 bg-bgDark-070 text-txtDark-090 capitalize rounded-[12px] focus:text-txtLight-100 focus:outline-none'
            {...register("greetings")}>
            <option value=''>Seleccionar</option>
            <option value='dr'>Dr</option>
            <option value='dra'>Dra</option>
          </select>
          {errors.greetings && (
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
              anchorUrl={`/patients`}
            />
          </div>
        )}
      </form>
    </CardContainer>
  );
}
