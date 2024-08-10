"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { uploadImage } from "@/lib/firebase/storage";
import { ButtonComponent, IconsComponent } from "@/components";
import { IDrawRequest } from "@/interfaces";
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
  updateGallery,
}: {
  patientId: string;
  type: "assets" | "draw";
  title: string;
  imageURL?: string;
  updateGallery?: (image: string) => void;
}) {
  const linkToBack =
    type === "assets"
      ? `/patients/${patientId}/gallery`
      : `/patients/${patientId}`;

  const validateImage = (value: string | undefined) => {
    const defaultImage = "/images/noResults.png";
    if (!value) return defaultImage;
    if (value === "") return defaultImage;
    return value;
  };

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      imageRx: validateImage(imageURL),
    },
  });

  const imageURLUpdated = getValues("imageRx") || "/images/avatar.png";
  const imageLabel =
    imageURLUpdated === "/images/noResults.png" ? "Seleccionar" : "Cambiar";

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const url = await uploadImage(file, type, { patientId });
      if (url) {
        setValue("imageRx", url);
        if (updateGallery) {
          updateGallery(url);
        } else {
          handleUpdatePatient(url);
        }
      }
    }
  };

  const handleUpdatePatient = async (imageUrl: string) => {
    const payload = {
      drawRequest: {
        createdAt: new Date().toISOString().split("T")[0],
        status: "pending",
        urlRxImage: imageUrl,
      } as IDrawRequest,
    };

    await updatePatient(payload, patientId)
      .then(() => {
        console.log("Patient updated");
      })
      .catch(() => {
        console.error("Error updating patient");
      });
  };

  return (
    <section className='w-full p-6 rounded-[12px] bg-bgDark-080'>
      <h3 className='text-h3 text-txtLight-100 text-center'>{title}</h3>
      <div className='relative mt-[60px] flex flex-col justify-center items-center'>
        <Image
          className='w-[250px] h-[250px] p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow'
          src={watch("imageRx")}
          alt='Radiografia lateral del paciente'
          width={200}
          height={200}
          unoptimized
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
