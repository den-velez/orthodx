import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import {
  ButtonComponent,
  TreatmentDoneComponent,
  TreatmentPendingComponent,
  ModalComponent,
  NewImageComponent,
} from "@/components";
import { IPatient } from "@/interfaces";

const patientData = async (id: string) => {
  const docRef = doc(db, "patients", id);
  const docSnap = await getDoc(docRef);
  let patientData = undefined;
  if (docSnap.exists()) {
    patientData = docSnap.data();
  } else {
    return {};
    console.log("No such document!");
  }
  return patientData;
};

export default async function Patient({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { draw?: boolean };
}) {
  const patientId = params.id || "";
  const patient = (await patientData(patientId)) as IPatient;

  const treatmentsListDone =
    patient.treatmentList?.filter((treatment) => treatment.done === true) || [];

  const treatmentsListPending =
    patient.treatmentList?.filter((treatment) => !treatment.done) || [];

  const links = {
    treatment: `/patients/${patientId}/treatments`,
    gallery: `/patients/${patientId}/gallery`,
    cephalometry: `/patients/${patientId}/cephalometry`,
    dental_size: `/patients/${patientId}/dental_size`,
    diagnostic: `/patients/${patientId}/diagnostic`,
    drawRequest: `/patients/${patientId}?draw=true`,
  };

  const drawRequested = patient.drawRequest?.status ? false : true;

  return (
    <>
      {drawRequested && (
        <ModalComponent isOpen={searchParams.draw || false}>
          <NewImageComponent patientId={patientId} />
        </ModalComponent>
      )}
      <main className='grid gap-6 bg-bgDark-090 px-3 pt-6 pb-[60px]'>
        <section className=' flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Seguimiento
          </h3>
          <div className='w-full grid gap-[60px]'>
            <TreatmentPendingComponent
              treatments={treatmentsListPending}
              unmutated
            />
            <TreatmentDoneComponent treatments={treatmentsListDone} />
          </div>
        </section>

        <section className='flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Odontologia
          </h3>
          <div className='w-[250px] h-[144px] flex flex-col gap-6'>
            <ButtonComponent
              label='Plan de Tratamiento'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl={links.treatment}
            />
            <ButtonComponent
              label='Galeria'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl={links.gallery}
            />
          </div>
        </section>
        <section className='flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Ortodoncia
          </h3>
          <div className='w-[250px] h-[312px] flex flex-col gap-6'>
            {drawRequested && (
              <ButtonComponent
                label='Solicitar Trazado'
                variant='primary-dark'
                widthfull
                anchor
                anchorUrl={links.drawRequest}
              />
            )}
            <ButtonComponent
              label='Valoración'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl={links.cephalometry}
            />
            <ButtonComponent
              label='Tamaño Dental'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl={links.dental_size}
            />
            <ButtonComponent
              label='Diagnóstico'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl={links.diagnostic}
            />
          </div>
        </section>
      </main>
    </>
  );
}
