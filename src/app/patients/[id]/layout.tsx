import { getDoc, doc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import { PatientHeaderComponent, FooterComponent } from "@/components";
import { IPatient } from "@/interfaces";

type PatientLayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

const patientData = async (id: string) => {
  const docRef = doc(db, "patients", id);
  const docSnap = await getDoc(docRef);
  let patientData = undefined;
  if (docSnap.exists()) {
    patientData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return patientData;
};

function NotFound({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-[calc(100vh-218px)] px-3 py-6 pb-[60px] bg-bgDark-090'>
      {children}
    </main>
  );
}

export default async function Layout({ children, params }: PatientLayoutProps) {
  const patientId = params.id || undefined;

  if (!patientId) return <NotFound>{children}</NotFound>;

  const patient = await patientData(patientId);

  if (!patient) return <NotFound>{children}</NotFound>;

  const { avatar, name, age, doctorOffice } = patient as IPatient;

  const patientHeader = { avatar, name, age, doctorOffice };

  return (
    <>
      <PatientHeaderComponent {...patientHeader} />
      <main className='min-h-[calc(100vh-218px)] px-3 py-6 pb-[60px] bg-bgDark-090'>
        {children}
      </main>
      <FooterComponent type='patient' patientId={patientId} />
    </>
  );
}
