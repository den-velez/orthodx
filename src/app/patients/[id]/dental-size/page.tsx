import {
  IPatient,
  IArches,
  IToothSize,
  IDiscrepancyDiagnostic,
} from "@/interfaces";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CardContainer } from "@/containers";
import { ButtonComponent, FormDentalSizeComponent } from "@/components";

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

export default async function DentalSize({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const patient = (await patientData(id)) as IPatient;
  const labels = {
    title: "Tamaño Dentario",
  };

  const discrepancyDx =
    (patient.discrepancyDiagnostic as IDiscrepancyDiagnostic) ?? {
      discrepancy: false,
      suggestions: [],
      sumAboveRounded: 0,
      sumBelow: 0,
    };

  const arcadas = (patient.valorationArches as IArches) ?? {
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
  const toothSizeModified = (patient.toothSizeModifed as IToothSize) ?? {
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
    aboveSum: 0,
    belowSum: 0,
    discrepancy: false,
  };

  return (
    <CardContainer>
      <h3 className='mb-[60px] text-h3 text-center text-txtLight-100'>
        Tamaño Dentario
      </h3>
      <FormDentalSizeComponent
        patientId={id}
        currentArcadas={arcadas}
        discrepancyDx={discrepancyDx}
        dentalSizeModified={toothSizeModified}
      />
    </CardContainer>
  );
}
