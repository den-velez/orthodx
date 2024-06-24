import { FormFollowUpComponent } from "@/components";

import { IPatient } from "@/interfaces";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

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

export default async function FollowUp({ params }: { params: { id: string } }) {
  const patientId = params.id || "";
  const patient = (await patientData(patientId)) as IPatient;

  const followupList = patient.followupList || [];

  return (
    <div className='grid grid-cols-1 gap-6'>
      <FormFollowUpComponent
        patientId={patientId}
        followupList={followupList}
      />
    </div>
  );
}
