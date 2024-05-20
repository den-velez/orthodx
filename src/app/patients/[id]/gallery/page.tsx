import Image from "next/image";
import Link from "next/link";
import {
  ButtonComponent,
  ModalComponent,
  NewImageComponent,
  GalleryComponent,
} from "@/components";

const assets = [
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
  "/images/noResults.png",
];

type TSearcParams = {
  newimage?: boolean;
  image?: boolean;
};

export default function GalleryPatient({
  searchParams,
}: {
  searchParams: TSearcParams;
}) {
  return (
    <div>
      <ModalComponent isOpen={searchParams.newimage || false}>
        <NewImageComponent patientId='s' />
      </ModalComponent>
      <ModalComponent isOpen={searchParams.image || false}>
        <GalleryComponent />
      </ModalComponent>
      <h3 className='mb-6 text-h3 text-txtLight-100 text-center'>
        Galeria del paciente
      </h3>
      <div className='max-h-[400px]  mx-auto grid grid-cols-2 gap-x-3 gap-y-6 overflow-auto'>
        {assets.map((asset, index) => (
          <Link
            href='/patients/2/gallery?image=true'
            key={index}
            className='p-3 bg-bgDark-070 rounded-[12px] shadow'>
            <Image
              className='w-full h-full object-contain'
              src={asset}
              alt={"patient Gallery"}
              width={192}
              height={96}
            />
          </Link>
        ))}
      </div>
      <div className='mt-[60px] h-[60px]'>
        <ButtonComponent
          label='Agregar Imagen'
          variant='primary-dark'
          widthfull
          anchor
          anchorUrl='/patients/2/gallery?newimage=true'
        />
      </div>
    </div>
  );
}
