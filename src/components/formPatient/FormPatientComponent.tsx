"use client";

import Image from "next/image";
import { ChangeEvent, useState, useEffect } from "react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { ButtonComponent, IconsComponent } from "@/components";
import { createPatient, updatePatient } from "@/lib/actions/actions";
import { uploadImage, updateImage } from "@/lib/firebase/storage";

type FormData = {
  id?: string;
  avatar?: string;
  name: string;
  age: string;
  doctorOffice: string;
};

const FormSchema: ZodType<FormData> = z.object({
  id: z.string().optional(),
  avatar: z.string().optional(),
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
  const [isChanged, setIsChanged] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: patient,
  });

  const imageURL = patient?.avatar || "/images/avatar.png";
  const watchedFields: FormData = watch();

  watchedFields;
  useEffect(() => {
    const fieldsChanged = () => {
      const { name, age, doctorOffice } = watchedFields;
      const isChanged =
        name !== patient?.name ||
        age !== patient?.age ||
        doctorOffice !== patient?.doctorOffice;

      return isChanged;
    };
    setIsChanged(fieldsChanged());
  }, [watchedFields]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) return;

    if (imageURL.includes("firebasestorage")) {
      const url = await updateImage(
        file,
        "avatar",
        { patientId: patient?.id },
        imageURL
      );
      if (url) {
        const payload = {
          ...patient,
          ...getValues(),
          avatar: url,
        };

        if (newPatient) {
          await createPatient(payload);
        } else {
          const id = patient?.id || "";
          await updatePatient(payload, id);
        }
        setValue("avatar", url);
      }
    } else {
      const url = await uploadImage(file, "avatar", { patientId: patient?.id });
      if (url) {
        const payload = {
          ...patient,
          ...getValues(),
          avatar: url,
        };

        if (newPatient) {
          await createPatient(payload);
        } else {
          const id = patient?.id || "";
          await updatePatient(payload, id);
        }
        setValue("avatar", url);
      }
    }
  };

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
      reset({ name: "", age: "", doctorOffice: "", avatar: "" });
      router.back();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className='w-full p-6 rounded-[12px] bg-bgDark-080'>
      <div className='relative flex justify-center items-center'>
        <div>
          <Image
            className='w-[200px] h-[200px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
            width={200}
            height={200}
            src={imageURL == "" ? "/images/avatar.png" : imageURL}
            alt='patient avatar'
            unoptimized
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
            disabled={!isChanged}
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
