import {
  DoctorHeaderComponent,
  FooterComponent,
  SearcherComponent,
  ButtonComponent,
} from "@/components";
import { PatientsContainer } from "@/containers";
import { DOCTOR_MOCK_VALUE } from "@/constants/contants";

import { PATIENTLIST_MOCK } from "@/constants/contants";

export default function PatientsPage() {
  const favs = PATIENTLIST_MOCK;
  const patients = PATIENTLIST_MOCK;

  return (
    <>
      <DoctorHeaderComponent {...DOCTOR_MOCK_VALUE} />
      <main className='flex flex-col gap-3 px-3 pt-6 bg-bgDark-090 min-h-screen'>
        <SearcherComponent />
        <PatientsContainer
          favs={PATIENTLIST_MOCK}
          patients={PATIENTLIST_MOCK}
        />
        <div className='my-[48px] h-[60px] flex justify-center'>
          <ButtonComponent label='Agregar Paciente' variant='primary-dark' />
        </div>
      </main>
      <FooterComponent type='home' />
    </>
  );
}
