import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { FormPatientComponent } from "@/components";
import { IPatient } from "@/interfaces";

const patientData = async (id: string) => {
  const docRef = doc(db, "patients", id);
  const docSnap = await getDoc(docRef);
  let patientData = undefined;
  if (docSnap.exists()) {
    patientData = docSnap.data();
  } else {
    return {};
    console.log("No such document!");
  }
  return patientData;
};

export default async function Patient({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { draw?: boolean };
}) {
  const patientId = params.id || "";
  const patient = await patientData(patientId);

  const patientFormData = {
    id: patientId || "",
    avatar: patient.avatar || "",
    name: patient.name || "",
    age: (patient.age || "") as string,
    doctorOffice: patient.doctorOffice || "",
  };

  return (
    <>
      <main className='grid gap-6 bg-bgDark-090 px-3 pt-6 pb-[60px]'>
        <FormPatientComponent newPatient={false} patient={patientFormData} />
      </main>
    </>
  );
}
