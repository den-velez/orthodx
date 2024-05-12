import {
  ButtonComponent,
  TreatmentDoneComponent,
  TreatmentPendingComponent,
  ModalComponent,
  NewImageComponent,
} from "@/components";
import { TREATMENT_DONE_MOCK, TREATMENT_MOCK } from "@/constants/contants";

export default function Patient({
  searchParams,
}: {
  searchParams: { draw?: boolean };
}) {
  return (
    <>
      <ModalComponent isOpen={searchParams.draw || false}>
        <NewImageComponent />
      </ModalComponent>
      <main className='grid gap-6 bg-bgDark-090 px-3 pt-6 pb-[60px]'>
        <section className=' flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Seguimiento
          </h3>
          <div className='w-full grid gap-[60px]'>
            <TreatmentPendingComponent treatments={TREATMENT_MOCK} />
            <TreatmentDoneComponent treatments={TREATMENT_DONE_MOCK} />
          </div>
        </section>

        <section className='flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Odontologia
          </h3>
          <div className='w-[250px] h-[144px] flex flex-col gap-6'>
            <ButtonComponent
              label='Plan de Tratamiento'
              variant='primary-dark'
              widthfull
            />
            <ButtonComponent
              label='Galeria'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl='/patients/2/gallery'
            />
          </div>
        </section>
        <section className='flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Ortodoncia
          </h3>
          <div className='w-[250px] h-[312px] flex flex-col gap-6'>
            <ButtonComponent
              label='Solicitar Trazado'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl='/patients/2?draw=true'
            />
            <ButtonComponent
              label='Valoración'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl='/patients/2/cephalometry'
            />
            <ButtonComponent
              label='Tamaño Dental'
              variant='primary-dark'
              widthfull
            />
            <ButtonComponent
              label='Diagnóstico'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl='/patients/2/diagnostic'
            />
          </div>
        </section>
      </main>
    </>
  );
}
