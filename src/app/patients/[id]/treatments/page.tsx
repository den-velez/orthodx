import { TreatmentDoneComponent, FormTreatmentsComponent } from "@/components";

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

function TreatmentsSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className='py-6 px-3 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
      {title && (
        <h5 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
          {title}
        </h5>
      )}
      {children}
    </section>
  );
}

export default async function TreatmentPlan({
  params,
}: {
  params: { id: string };
}) {
  const patientId = params.id || "";
  const patient = (await patientData(patientId)) as IPatient;

  const treatmentsListDone =
    patient.treatmentList?.filter((treatment) => treatment.done === true) || [];

  const treatmentsListPending =
    patient.treatmentList?.filter((treatment) => !treatment.done) || [];

  const expansionTurns = patient?.expansionDiagnostic || {
    apinamientoTurns: 0,
    korkhauseTurns: 0,
    korkhauseTurnsMod: 0,
    mordidaCruzadaTurns: 0,
  };
  const expansionTreatment = patient?.expansionTreatment || "";

  return (
    <div className='grid grid-cols-1 gap-6'>
      <FormTreatmentsComponent
        patientId={patientId}
        expansionTurns={expansionTurns}
        expansionTreatment={expansionTreatment}
        treatmentsListPending={treatmentsListPending}
      />
      <TreatmentsSection title='Historial de Tratamientos'>
        <TreatmentDoneComponent treatments={treatmentsListDone} />
      </TreatmentsSection>
    </div>
  );
}
