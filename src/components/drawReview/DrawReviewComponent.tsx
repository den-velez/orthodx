"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonComponent } from "@/components";

interface DrawReviewComponentProps {
  images: string[];
  editUrl: string;
  exitUrl: string;
}

export default function DrawReviewComponent({
  images = [],
  editUrl,
  exitUrl,
}: DrawReviewComponentProps) {
  const [imageShown, setImageShown] = useState(0);

  const handleNextImage = () => {
    setImageShown((prev) => (prev + 1) % images.length);
  };
  const handlePrevImage = () => {
    setImageShown((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className='w-full py-6 px-3 rounded-[12px] bg-bgDark-080'>
      <div className='flex justify-center items-center'>
        <Image
          className='w-full h-auto min-h-[400px] p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow object-contain object-center'
          src={images[imageShown] || ""}
          alt='Radiografia del paciente'
          width={300}
          height={400}
          unoptimized
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex justify-center items-center gap-6 mt-6'>
          <ButtonComponent
            type='button'
            variant='secondary'
            label='Anterior'
            onClick={handlePrevImage}
          />
          <ButtonComponent
            type='button'
            variant='secondary'
            label='Siguiente'
            onClick={handleNextImage}
          />
        </div>
      </div>
      <div className='mt-[60px] flex flex-col gap-6'>
        <div className='h-[60px]'>
          <ButtonComponent
            type='button'
            variant='secondary'
            label='Editar'
            widthfull
            anchor
            anchorUrl={editUrl}
          />
        </div>
        <div className='h-[60px]'>
          <ButtonComponent
            type='submit'
            variant='primary'
            label='Salir'
            widthfull
            anchor
            anchorUrl={exitUrl}
          />
        </div>
      </div>
    </section>
  );
}
