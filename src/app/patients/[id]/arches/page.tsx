import { doc, getDoc } from "firebase/firestore";
import { FormArcadasComponent } from "@/components";
import { IPatient, IArches } from "@/interfaces";
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

export default async function ArcadasValoration({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const patient = (await patientData(id)) as IPatient;
  const valorationArches: IArches = patient.valorationArches ?? {
    createdAt: "",
    updatedAt: "",
    d11: "",
    d12: "",
    d13: "",
    d21: "",
    d22: "",
    d23: "",
    d31: "",
    d32: "",
    d33: "",
    d41: "",
    d42: "",
    d43: "",
    d4a4: "",
    loAnt: "",
    dist3a3Inf: "",
    dist6a6Inf: "",
    dist6a6Inf2: "",
    dist6a6Sup: "",
  };
  return (
    <FormArcadasComponent patientId={id} currentValoration={valorationArches} />
  );
}
