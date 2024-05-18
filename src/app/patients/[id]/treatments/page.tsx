import {
  TreatmentDoneComponent,
  TreatmentPendingComponent,
} from "@/components";

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

  const expansion = patient.resultDiagnostic?.expansion || [];

  return (
    <div className='grid grid-cols-1 gap-6'>
      {expansion.length > 0 && (
        <TreatmentsSection title='Expansion (giros)'>
          <div className='flex flex-col gap-6'>
            {expansion.map((option, index) => (
              <div key={index} className='flex items-center gap-3 text-h5'>
                <input
                  type='checkbox'
                  checked={option.selected}
                  className='h-8 w-8 min-w-6'
                />
                <div className='flex items-center justify-between gap-3 sm:gap-6 flex-grow h-full '>
                  <span className=' text-txtLight-100 capitalize'>
                    {option.label}:
                  </span>
                  <div className='flex justify-center items-center min-w-[80px] sm:min-w-[100px] h-full px-3 sm:px-6 py-1 text-txtLight-100 text-center border rounded-[6px]'>
                    <span>{option.turns}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TreatmentsSection>
      )}
      <TreatmentsSection title='Plan de Tratamiento'>
        <TreatmentPendingComponent
          treatments={treatmentsListPending}
          unmutated
        />
      </TreatmentsSection>
      <TreatmentsSection title='Historial de Tratamientos'>
        <TreatmentDoneComponent treatments={treatmentsListDone} />
      </TreatmentsSection>
    </div>
  );
}
