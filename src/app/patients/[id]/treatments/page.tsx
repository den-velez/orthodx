import { FormTreatmentsComponent } from "@/components";

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

  const treatmentsList = patient.treatmentList || [];
  treatmentsList.sort((a, b) => {
    return a.priority > b.priority ? 1 : -1;
  });

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
        treatmentsList={treatmentsList}
      />
      {patient.legacyTreatment && (
        <section className='py-6 px-3 flex flex-col gap-3  bg-bgDark-080 rounded-[12px] shadow'>
          <h4 className='text-txtBrand-alternative text-h4 text-center'>
            Plan de Tratamiento
          </h4>
          <p className='text-txtBrand-alternative text-small text-center'>
            Ingresado en versión anterior
          </p>
          {patient.legacyTreatment?.doctorPlan && (
            <div className='mt-8 p-2 bg-bgDark-090 rounded-xl '>
              <h5 className=' text-txtBrand-secondary text-h5 text-center'>
                Plan de Tratamiento
              </h5>
              <p className='text-ctaLight-090 first-letter:uppercase'>
                {patient.legacyTreatment?.doctorPlan}{" "}
              </p>
            </div>
          )}
          {patient.legacyTreatment?.rehabilitationTreatment && (
            <div className='mt-8 p-2 bg-bgDark-090 rounded-xl '>
              <h5 className='text-txtBrand-secondary text-h5 text-center'>
                Rehabilitacion
              </h5>
              <p className='text-ctaLight-090 first-letter:uppercase'>
                {patient.legacyTreatment.rehabilitationTreatment}
              </p>
            </div>
          )}

          <div className='mt-8 p-2 bg-bgDark-090 rounded-xl '>
            <h5 className='text-txtBrand-secondary text-h5 text-center'>
              Extracciones
            </h5>
            <p className='flex justify-center text-ctaLight-090 first-letter:uppercase'>
              {}
              {patient.legacyTreatment.extractionsNow ? (
                <span>Inmediatas</span>
              ) : (
                patient.legacyTreatment.extractionsLater && (
                  <span>Posibles</span>
                )
              )}
            </p>
            <div className='grid grid-cols-2 grid-rows-2 justify-items-center text-ctaLight-090 gap-4'>
              <div className='py-1 w-full text-center rounded-md bg-bgDark-070'>
                {patient.legacyTreatment?.extractionsLaterList?.[0] || ""}
              </div>
              <div className='py-1 w-full text-center rounded-md bg-bgDark-070'>
                {patient.legacyTreatment?.extractionsLaterList?.[1] || ""}
              </div>
              <div className='py-1 w-full text-center rounded-md bg-bgDark-070'>
                {patient.legacyTreatment?.extractionsNowList?.[0] || ""}
              </div>
              <div className='py-1 w-full text-center rounded-md bg-bgDark-070'>
                {patient.legacyTreatment?.extractionsNowList?.[1] || ""}
              </div>
            </div>
          </div>
          {patient.legacyTreatment?.observations && (
            <div className='mt-8 p-2 bg-bgDark-090 rounded-xl '>
              <h5 className='text-txtBrand-secondary text-h5 text-center'>
                Observaciones
              </h5>
              <p className='text-ctaLight-090 first-letter:uppercase'>
                {patient.legacyTreatment?.observations}{" "}
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
