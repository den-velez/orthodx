"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";

import CardContainer from "@/containers/card/CardContainer";
import { ButtonComponent, FooterComponent, IconsComponent } from "@/components";
import { createDoctor, updateDoctor } from "@/lib/actions/actions";
import { uploadImage } from "@/lib/firebase/storage";
import { db } from "@/lib/firebase/firebase";

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
  const params = useParams<{ doctorId: string }>();
  const [imageURL, setImageURL] = useState<string>("");

  const doctorId = (params.doctorId as string) || undefined;
  let doctorFormDefaultValues = {
    name: "",
    saludo: "",
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const url = await uploadImage(file);
      if (url) {
        setImageURL(url);
        // Here, you can save the image URL to the form data or handle it as needed
        console.log("Image uploaded: ", url);
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: doctorFormDefaultValues,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (params.doctorId === "new") {
        await createDoctor(data);
      } else {
        const doctorId = (params.doctorId as string) || "";
        const payload = { ...doctorFormDefaultValues, ...data };
        await updateDoctor(payload, doctorId);
      }
      router.push("/patients");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const doctorData = async (id: string) => {
      const docRef = doc(db, "doctors", id);
      const docSnap = await getDoc(docRef);
      let doctorData = undefined;
      if (docSnap.exists()) {
        doctorData = docSnap.data();
      } else {
        console.log("No such document!");
      }
      return doctorData;
    };

    if (doctorId !== "new" && doctorId !== undefined) {
      const getDoctorData = async () => {
        const doctor = (await doctorData(doctorId)) as FormData;
        setValue("name", doctor.name);
        setValue("saludo", doctor.saludo);
        doctorFormDefaultValues = doctor;
      };

      getDoctorData();
    }
  }, []);

  return (
    <div className='bg-bgDark-090'>
      <main className='px-3 pt-6 pb-[60px]'>
        <CardContainer styles='flex flex-col items-center'>
          <div className='relative flex flex-col items-center justify-center'>
            <div>
              <Image
                className='w-[200px] h-[200px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
                width={40}
                height={40}
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
      <FooterComponent type='doctor' doctorId='' />
    </div>
  );
}
