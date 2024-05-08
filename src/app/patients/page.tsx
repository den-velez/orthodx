import {
  DoctorHeaderComponent,
  FooterComponent,
  SearcherComponent,
  ButtonComponent,
  PatientEditComponent,
  ModalComponent,
} from "@/components";
import { PatientsContainer } from "@/containers";
import { DOCTOR_MOCK_VALUE } from "@/constants/contants";
import { Suspense } from "react";

type TSearcParams = {
  modal?: boolean;
};

export default function PatientsList({
  searchParams,
}: {
  searchParams: TSearcParams;
}) {
  return (
    <>
      <ModalComponent isOpen={searchParams.modal || false}>
        <PatientEditComponent />
      </ModalComponent>

      <DoctorHeaderComponent {...DOCTOR_MOCK_VALUE} />
      <main className='flex flex-col gap-3 px-3 pt-6 bg-bgDark-090 min-h-screen'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearcherComponent />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PatientsContainer />
        </Suspense>

        <div className='mx-auto my-[48px] h-[60px] flex justify-center w-[240px]'>
          <ButtonComponent
            label='Agregar Paciente'
            variant='primary-dark'
            widthfull
            anchor
            anchorUrl='/patients?modal=true'
          />
        </div>
      </main>

      <FooterComponent type='home' />
    </>
  );
}
