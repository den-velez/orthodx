"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { uploadImage } from "@/lib/firebase/storage";
import { ButtonComponent, IconsComponent } from "@/components";
import { IDrawRequestPatient } from "@/interfaces";
import {
  updatePatient,
  drawRequest,
  getDoctorIdByEmail,
} from "@/lib/actions/actions";

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
  patientAvatar,
  patientName,
  imageURL,
  updateGallery,
  drawRequestID,
}: {
  title: string;
  type: "assets" | "draw";
  patientId: string;
  patientAvatar: string;
  patientName: string;
  imageURL?: string;
  updateGallery?: (image: string) => void;
  drawRequestID?: string;
}) {
  console.log("NewImageComponent -> imageURL", imageURL, drawRequestID);
  const [drawRequested, setDrawRequested] = useState(false);
  const [newDrawRequestID, setNewDrawRequestID] = useState<string | boolean>(
    drawRequestID || false
  );
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
        patientRxImg: imageUrl,
        drawRequestId: newDrawRequestID as string,
      } as IDrawRequestPatient,
    };

    await updatePatient(payload, patientId)
      .then(() => {
        console.log("Patient updated");
      })
      .catch(() => {
        console.error("Error updating patient");
      });
  };

  const handleDrawRequest = async (patientId: string) => {
    try {
      const doctor = await getDoctorIdByEmail();
      const doctorId = doctor?.doctorId;

      if (!doctorId) {
        throw new Error("Doctor not found");
      }

      const response = await drawRequest({
        patientId,
        doctorId,
        patientAvatar: patientAvatar,
        patientName: patientName,
        patientRxImg: imageURL || "",
      });
      if (!response) {
        throw new Error("Error requesting draw");
      }

      setNewDrawRequestID(response);
      setDrawRequested(true);
    } catch (error) {
      alert("Error al solicitar el trazado");
    }
  };

  useEffect(() => {
    if (type !== "draw") {
      setDrawRequested(true);
    } else {
      const isImageValid = imageURL && imageURL !== "";
      if (isImageValid) setDrawRequested(isImageValid);
    }
  }, []);

  if (!drawRequested) {
    return (
      <section className='w-full p-6 rounded-[12px] bg-bgDark-080 text-white'>
        <h3 className='text-h3 text-txtLight-100 text-center'>
          Se tomaran 2 creditos adicionales de tu cuenta
          <div className='mx-auto mt-[60px] h-[60px] w-[250px]'>
            <ButtonComponent
              type='button'
              variant='primary'
              label='Aceptar'
              widthfull
              onClick={() => handleDrawRequest(patientId)}
            />
          </div>
        </h3>
        <div className='mx-auto mt-[30px] h-[60px] w-[250px]'>
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
