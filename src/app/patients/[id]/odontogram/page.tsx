import { doc, getDoc } from "firebase/firestore";
import { FormOdontogramComponent } from "@/components";
import { IPatient, IOdontogram } from "@/interfaces";
import { db } from "@/lib/firebase/firebase";

const patientData = async (id: string) => {
  const docRef = doc(db, "patients", id);
  const docSnap = await getDoc(docRef);
  let patientData = undefined;
  if (docSnap.exists()) {
    patientData = {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
  return patientData;
};

export default async function Odontogram({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const patient = (await patientData(id)) as IPatient;
  const valorationOdotontogram: IOdontogram =
    patient.valorationOdotontogram ?? {
      createdAt: "",
      updatedAt: "",
      generalPathology: [
        {
          pathology: "",
        },
      ],
      comments: "",
    };
  return (
    <FormOdontogramComponent
      patientId={id}
      currentValoration={valorationOdotontogram}
    />
  );
}
