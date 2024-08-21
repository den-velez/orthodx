"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ButtonComponent,
  ModalComponent,
  NewImageComponent,
  GalleryComponent,
} from "@/components";
import { getImagesFromFolder, deleteImage } from "@/lib/firebase/storage";

type TSearcParams = {
  newimage?: boolean;
  image?: boolean;
};

export default function GalleryPatient({
  searchParams,
  params,
}: {
  searchParams: TSearcParams;
  params: { id: string };
}) {
  const [gallery, setGallery] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = params;

  useEffect(() => {
    getGalleryList();

    async function getGalleryList() {
      const assets = await getImagesFromFolder(
        `images-patients/${params.id}/assets`
      );
      setGallery(assets);
    }
  }, []);

  const toggleModal = (asset: string) => {
    if (isOpen) {
      setImageSelected("");
    } else {
      setImageSelected(asset);
    }

    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ModalComponent isOpen={searchParams.newimage || false}>
        <NewImageComponent
          patientId={id}
          title='Agregar Imagen'
          type='assets'
          patientAvatar=''
          patientName=''
          updateGallery={(newImage) => {
            setGallery([...gallery, newImage]);
          }}
        />
      </ModalComponent>
      <ModalComponent isOpen={isOpen}>
        <GalleryComponent
          imageSelected={imageSelected}
          closeModal={() => toggleModal("")}
          deleteImage={() => {
            deleteImage(imageSelected);
            setGallery(gallery.filter((img) => img !== imageSelected));
          }}
        />
      </ModalComponent>
      <h3 className='mb-6 text-h3 text-txtLight-100 text-center'>
        Galeria del paciente
      </h3>
      <div className='max-h-[400px]  mx-auto grid grid-cols-2 gap-x-3 gap-y-6 overflow-auto'>
        {gallery.map((asset, index) => (
          <button
            onClick={() => toggleModal(asset)}
            key={index}
            className='bg-bgDark-070 rounded-[12px] shadow'>
            <Image
              className='w-full h-full object-cover rounded-[12px]'
              src={asset}
              alt={`${asset} image`}
              width={192}
              height={96}
              unoptimized
            />
          </button>
        ))}
      </div>
      <div className='mt-[60px] h-[60px]'>
        <ButtonComponent
          label='Agregar Imagen'
          variant='primary-dark'
          widthfull
          anchor
          anchorUrl={`/patients/${id}/gallery?newimage=true`}
        />
      </div>
    </div>
  );
}
