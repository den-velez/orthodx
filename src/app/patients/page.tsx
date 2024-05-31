import { Suspense } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { db } from "@/lib/firebase/firebase";

import {
  DoctorHeaderComponent,
  FooterComponent,
  SearcherComponent,
  ButtonComponent,
  FormPatientComponent,
  ModalComponent,
} from "@/components";
import { PatientsContainer } from "@/containers";
import { redirect } from "next/navigation";

type TSearcParams = {
  newpatient?: boolean;
  name?: string;
};

const getData = async () => {
  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctor = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );
  const q = query(collection(db, "doctors"), where("email", "==", doctor));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return {
      doctorId: doc.id,
      credits: doc.data().credits,
    };
  });

  if (data.length === 0) return null;

  const { doctorId, credits } = data[0];

  return { doctorId, credits };
};

export default async function PatientsList({
  searchParams,
}: {
  searchParams: TSearcParams;
}) {
  const doctor = await getData();

  const { doctorId, credits } = doctor || {};

  if (!doctorId) {
    redirect("/doctors/new");
  }

  return (
    <>
      <ModalComponent isOpen={searchParams.newpatient || false}>
        <FormPatientComponent
          newPatient={searchParams.newpatient ? true : false}
        />
      </ModalComponent>

      <DoctorHeaderComponent />
      <main className='flex flex-col gap-3 px-3 pt-6 bg-bgDark-090 min-h-screen'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearcherComponent />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PatientsContainer name={searchParams.name || null} />
        </Suspense>
        {credits > 1 ? (
          <div className='mx-auto my-[48px] h-[60px] flex justify-center w-[240px]'>
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

      <FooterComponent type='home' doctorId={doctorId} />
    </>
  );
}
