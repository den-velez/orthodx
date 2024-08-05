import { IPatient, IDental } from "@/interfaces";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FormDentalComponent } from "@/components";

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

export default async function DentalValoration({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const patient = (await patientData(id)) as IPatient;
  const valorationDental: IDental = patient.valorationDental ?? {
    createdAt: "",
    updatedAt: "",
    relacionMolarDer: "",
    relacionMolarIzq: "",
    relacionCaninaDer: "",
    relacionCaninaIzq: "",
    mordidaPosteriorDer: "",
    mordidaPosteriorIzq: "",
    denticion: "",
    tamanoArcadaSup: "",
    tamanoArcadaInf: "",
    formaArcadaInf: "",
    formaArcadaSup: "",
    apinamientoSup: "",
    apinamientoInf: "",
    mordidaAnterior: "",
    mordidaAnteriorMM: "",
    comments: "",
  };
  return (
    <>
      <FormDentalComponent
        patientId={id}
        currentValoration={valorationDental}
      />
    </>
  );
}
