import Image from "next/image";

import { ButtonComponent } from "@/components";

export default function PatientDrawComponent() {
  return (
    <section className='p-6 rounded-[12px] bg-bgDark-080'>
      <h3 className='text-h3 text-txtLight-100 text-center'>
        Solicitar Trazado
      </h3>
      <div className='my-[60px] flex justify-center items-center'>
        <Image
          className='w-[250px] h-[250px] p-1 rounded-[12px] ring-2 dark:ring-bgDark-070 shadow'
          src='/images/noResults.png'
          alt='Radiografia lateral del paciente'
          width={200}
          height={200}
        />
      </div>
      <div className='mx-auto h-[60px] w-[250px]'>
        <ButtonComponent
          type='button'
          variant='secondary'
          label='Cancelar'
          widthfull
          anchor
          anchorUrl='/patients/2'
        />
      </div>
      <div className='mx-auto mt-[60px]  h-[60px] w-[250px]'>
        <ButtonComponent
          type='submit'
          variant='primary'
          label='Enviar'
          widthfull
          anchor
          anchorUrl='/patients/2'
        />
      </div>
    </section>
  );
}
