"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { uploadImage } from "@/lib/firebase/storage";
import { ButtonComponent, IconsComponent } from "@/components";
import { updatePatient } from "@/lib/actions/actions";

type FormData = {
  imageRx: string;
};

const FormSchema: ZodType<FormData> = z.object({
  imageRx: z.string(),
});

export default function NewImageComponent({
  title,
  type,
  patientId,
  imageURL,
}: {
  patientId: string;
  type: "assets" | "draw";
  title: string;
  imageURL?: string;
}) {
  const linkToBack =
    type === "assets"
      ? `/patients/${patientId}/gallery`
      : `/patients/${patientId}`;

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      imageRx: imageURL ?? "/images/noResults.png",
    },
  });

  const imageURLUpdated = getValues("imageRx") || "/images/avatar.png";
  const imageLabel =
    imageURLUpdated === "/images/noResults.png" ? "Seleccionar" : "Cambiar";

  const imageRx = watch("imageRx");
  console.log("imageRx", imageRx);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const url = await uploadImage(file, type, { patientId });
      if (url) {
        setValue("imageRx", url);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    const createdAt = new Date().toISOString().split("T")[0];

    const payload = {
      ...getValues(),
      createdAt,
    };

    try {
      await updatePatient(payload, patientId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className='p-6 rounded-[12px] bg-bgDark-080'>
      <h3 className='text-h3 text-txtLight-100 text-center'>{title}</h3>
      <div className='relative mt-[60px] flex flex-col justify-center items-center'>
        <Image
          className='w-[250px] h-[250px] p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow'
          src={watch("imageRx")}
          alt='Radiografia lateral del paciente'
          width={200}
          height={200}
        />
        <div className='absolute w-[200px] px-3 py-2 bottom-[-16px] bg-cta-090 text-h5 rounded-lg text-txtDark-090 '>
          <label htmlFor='image' className='flex items-center gap-3'>
            <IconsComponent icon='camera' />
            <span className='h-full border-l px-2'>{imageLabel}</span>
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
      <div className='mx-auto mt-[60px] h-[60px] w-[250px]'>
        <ButtonComponent
          type='button'
          variant='secondary'
          label='Cerrar'
          widthfull
          anchor
          anchorUrl={linkToBack}
        />
      </div>
    </section>
  );
}
