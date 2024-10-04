"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { uploadImage, updateImage } from "@/lib/firebase/storage";
import { ButtonComponent, IconsComponent } from "@/components";
import { IDrawRequestPatient } from "@/interfaces";
import {
  updatePatient,
  drawRequest,
  getDoctorIdByEmail,
} from "@/lib/actions/actions";

type FormData = {
  image: string;
  imageAditional: string;
};

const FormSchema: ZodType<FormData> = z.object({
  image: z.string(),
  imageAditional: z.string(),
});

export default function NewImageComponent({
  title,
  type,
  patientId,
  patientAvatar,
  patientName,
  imageURL,
  imageURLAditional,
  updateGallery,
  drawRequestID,
}: {
  title: string;
  type: "assets" | "draw";
  patientId: string;
  patientAvatar: string;
  patientName: string;
  imageURL?: string;
  imageURLAditional?: string;
  updateGallery?: (image: string) => void;
  drawRequestID?: string;
}) {
  const router = useRouter();
  const [drawRquestError, setDrawRequestError] = useState(false);
  const [drawRequested, setDrawRequested] = useState(false);
  const [newDrawRequestID, setNewDrawRequestID] = useState<string | boolean>(
    drawRequestID || false
  );
  const linkToBack =
    type === "assets"
      ? `/patients/${patientId}/gallery`
      : `/patients/${patientId}`;

  const validateImage = (value: string | undefined) => {
    const defaultImage = "/images/addImage.png";
    if (!value || value === "") return defaultImage;
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
      image: validateImage(imageURL),
      imageAditional: validateImage(imageURLAditional),
    },
  });

  const imageURLUpdated = getValues("image") || "/images/addImage.png";
  const imageURLAditionalUpdated =
    getValues("imageAditional") || "/images/addImage.png";
  const imageLabel =
    imageURLUpdated === "/images/addImage.png" ? "Seleccionar" : "Cambiar";

  const imageAditionalLabel =
    imageURLAditionalUpdated === "/images/addImage.png"
      ? "Seleccionar"
      : "Cambiar";

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageName = e.target.id as "image" | "imageAditional";
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const currentImage = getValues(imageName);
      const isDefaultImage = currentImage === "/images/addImage.png";
      console.log("currentImage", currentImage);
      console.log("isDefaultImage", isDefaultImage);
      let url = null;

      if (isDefaultImage) {
        url = await uploadImage(file, type, { patientId });
      } else {
        url = await updateImage(file, type, { patientId }, currentImage);
      }

      if (url) {
        setValue(imageName, url);
        if (updateGallery) {
          updateGallery(url);
          router.push(linkToBack);
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
        patientRxImg: watch("image"),
        patientRxImgPanoramic: watch("imageAditional"),
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
        patientAvatar: patientAvatar || "",
        patientName: patientName || "",
        patientRxImg: imageURL || "",
      });

      if (!response) {
        throw new Error("Error requesting draw");
      }

      setNewDrawRequestID(response);
      setDrawRequested(true);
    } catch (error) {
      setDrawRequestError(true);
    }
  };

  useEffect(() => {
    if (type !== "draw") {
      setDrawRequested(true);
    } else {
      const isImageValid = drawRequestID && drawRequestID !== "";
      if (isImageValid) setDrawRequested(isImageValid);
    }
  }, []);

  if (drawRquestError) {
    return (
      <section className='w-full p-6 rounded-[12px] bg-bgDark-080 text-white'>
        <h3 className='text-h3 text-txtLight-100 text-center'>
          Ocurrio un error al solicitar el trazado, volver a intentar
          <div className='mx-auto mt-[60px] h-[60px] w-[250px]'>
            <ButtonComponent
              type='button'
              variant='primary'
              label='Aceptar'
              widthfull
              anchor
              anchorUrl={linkToBack}
            />
          </div>
        </h3>
      </section>
    );
  }

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
        {type === "draw" && (
          <h4 className='py-2 text-light-090 text-center'>
            Radiografia lateral
          </h4>
        )}
        <Image
          className='w-[250px] h-[250px] p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow'
          src={watch("image")}
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
      {type === "draw" && (
        <div className='relative mt-[60px] flex flex-col justify-center items-center'>
          <h4 className='py-2 text-light-090 text-center'>
            Radiografia Panorámica
          </h4>
          <Image
            className='w-[250px] h-[250px] p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow'
            src={watch("imageAditional")}
            alt='Radiografia lateral del paciente'
            width={200}
            height={200}
            unoptimized
          />
          <div className='absolute w-[200px] px-3 py-2 bottom-[-16px] bg-cta-090 text-h5 rounded-lg text-txtDark-090 '>
            <label htmlFor='imageAditional' className='flex items-center gap-3'>
              <IconsComponent icon='camera' />
              <span className='h-full border-l px-2'>
                {imageAditionalLabel}
              </span>
            </label>
            <input
              className='hidden'
              type='file'
              id='imageAditional'
              accept='image/*'
              onChange={handleImageChange}
            />
          </div>
        </div>
      )}
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
