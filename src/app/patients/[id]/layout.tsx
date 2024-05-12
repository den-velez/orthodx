import { PatientHeaderComponent, FooterComponent } from "@/components";

import { PATIENT_MOCK_VALUE } from "@/constants/contants";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PatientHeaderComponent {...PATIENT_MOCK_VALUE} />
      <main className='min-h-[calc(100vh-218px)] px-3 py-6 pb-[60px] bg-bgDark-090'>
        {children}
      </main>
      <FooterComponent type='patient-edit' />
    </>
  );
}
