import Image from "next/image";

import { ButtonComponent } from "@/components";

export default function GalleryComponent({
  imageSelected,
  closeModal,
  deleteImage,
}: {
  imageSelected: string;
  deleteImage: () => void;
  closeModal: () => void;
}) {
  const handleDelete = () => {
    deleteImage();
    closeModal();
  };
  return (
    <section className='py-6 px-3 rounded-[12px] bg-bgDark-080'>
      <div className='flex justify-center items-center'>
        <Image
          className='w-full h-auto p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow'
          src={imageSelected}
          alt='Radiografia lateral del paciente'
          width={300}
          height={400}
        />
      </div>
      <div className='mt-[60px] flex flex-col gap-6'>
        <div className='h-[60px]'>
          <ButtonComponent
            type='button'
            variant='secondary'
            label='Borrar'
            widthfull
            onClick={handleDelete}
          />
        </div>
        <div className='h-[60px]'>
          <ButtonComponent
            type='submit'
            variant='primary'
            label='Salir'
            widthfull
            onClick={closeModal}
          />
        </div>
      </div>
    </section>
  );
}
