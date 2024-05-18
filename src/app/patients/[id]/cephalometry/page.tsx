import { IPatient, ICephalometry } from "@/interfaces";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CephalometryFormComponent } from "@/components";

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
  const patient = (await patientData(params.id)) as IPatient;
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
      observaciones: " ",
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
        <CephalometryFormComponent
          patientId={id}
          currentValoration={valorationCephalometry}
        />
      </div>
    </>
  );
}
