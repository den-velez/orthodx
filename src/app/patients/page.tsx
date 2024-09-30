import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getDoctorData } from "@/lib/actions/actions";

import {
  DoctorHeaderComponent,
  FooterComponent,
  SearcherComponent,
  ButtonComponent,
  FormPatientComponent,
  ModalComponent,
} from "@/components";
import { PatientsContainer } from "@/containers";
import { IDoctor } from "@/interfaces";

type TSearcParams = {
  newpatient?: boolean;
  name?: string;
};

export default async function PatientsList({
  searchParams,
}: {
  searchParams: TSearcParams;
}) {
  const cookieUserID = cookies().get("userID")?.value || null;
  const doctor = (await getDoctorData(cookieUserID)) as IDoctor;

  if (!cookieUserID && !doctor) {
    redirect("/auth/login");
  }

  if (!doctor) {
    redirect("/doctors/new");
  }

  const { id, paidCredits, memberCredits } = doctor;
  const credits = paidCredits + memberCredits || 0;

  return (
    <>
      <ModalComponent isOpen={searchParams.newpatient || false}>
        <FormPatientComponent
          newPatient={searchParams.newpatient ? true : false}
        />
      </ModalComponent>

      <DoctorHeaderComponent />
      <main className='relative pb-[90px] flex flex-col gap-3 px-3 pt-6 bg-bgDark-090 min-h-screen'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearcherComponent />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PatientsContainer name={searchParams.name || null} />
        </Suspense>
        {credits >= 1 ? (
          <div className='fixed left-0 right-0 bottom-28 mx-auto flex h-[60px] w-[240px]'>
            <ButtonComponent
              label='Agregar Paciente'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl='/patients?newpatient=true'
            />
          </div>
        ) : (
          <div className='mx-auto my-[48px] h-[60px] flex justify-center w-[240px]'>
            <ButtonComponent
              label='OrthoDx shop'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl='/store'
            />
          </div>
        )}
      </main>

      <FooterComponent type='home' doctorId={id} />
    </>
  );
}
