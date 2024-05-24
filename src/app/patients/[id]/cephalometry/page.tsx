import { IPatient, ICephalometry, ICephalometryResult } from "@/interfaces";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FormCephalometryComponent } from "@/components";

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

export default async function Cephalometry({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const patient = (await patientData(id)) as IPatient;
  const cephalometry: ICephalometryResult = patient.cephalometry ?? {
    createdAt: "",
    updatedAt: "",
    alturaFacialInfR1: "",
    alturaFacialInfR2: "",
    alturaFacialInfR3: "",
    alturaFacialInfR4: "",
    alturaFacialInfR5: "",
    alturaInferior: "",
    alturaInferiorMm: "",
    biotipo: "",
    cajaDental: "",
    dxIIoIII: "",
    ejeIncisivoInferior: "",
    ejeIncisivoSuperior: "",
    longMandR1: "",
    longMandR2: "",
    longMandR3: "",
    longMandR4: "",
    planoDeOclusion: "",
    relacionEsqueletica: "",
    relacionEsqueleticaMm: "",
    segundoMolarInferior: "",
    tendenciaVertical: "",
  };
  const valorationCephalometry: ICephalometry =
    patient.valorationCephalometry ?? {
      createdAt: "",
      updatedAt: "",
      na: "",
      longMaxilar: " ",
      longMandibular: " ",
      alturaFacialInf: " ",
      planoMandibular: " ",
      witts: " ",
      ejeFacial: " ",
      locPorion: " ",
      mm: " ",
      bimler: " ",
      ejeIncisivoSuperior: " ",
      ejeIncisivoInferior: " ",
      molarInferior: " ",
      comments: " ",
    };
  return (
    <>
      <div className='px-3 pt-6 pb-[60px] bg-bgDark-080 shadow rounded-[12px]'>
        <h3 className='text-h4 text-txtLight-100 text-center'>
          Analisis Radiograficos
        </h3>
        <h4 className='my-3 text-h4 text-txtBrand-secondary text-center'>
          Cefalometría
        </h4>
        <FormCephalometryComponent
          patientId={id}
          currentValoration={valorationCephalometry}
          cephalometry={cephalometry}
        />
      </div>
    </>
  );
}
