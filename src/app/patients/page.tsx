import {
  DoctorHeaderComponent,
  FooterComponent,
  SearcherComponent,
} from "@/components";
import { DOCTOR_MOCK_VALUE } from "@/constants/contants";

export default function PatientsPage() {
  return (
    <>
      <DoctorHeaderComponent {...DOCTOR_MOCK_VALUE} />
      <main className='px-3 pt-6 bg-bgDark-090 h-screen'>
        <SearcherComponent />
      </main>
      <FooterComponent type='home' />
    </>
  );
}
