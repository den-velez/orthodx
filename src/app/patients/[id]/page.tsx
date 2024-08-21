import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import {
  ButtonComponent,
  TextWithLineBreaksComponent,
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

  const treatmentsListSorted =
    patient.treatmentList?.sort((a, b) => a.priority - b.priority) || [];

  const links = {
    treatment: `/patients/${patientId}/treatments`,
    gallery: `/patients/${patientId}/gallery`,
    cephalometry: `/patients/${patientId}/cephalometry`,
    arches: `/patients/${patientId}/arches`,
    dental: `/patients/${patientId}/dental`,
    dental_size: `/patients/${patientId}/dental-size`,
    diagnostic: `/patients/${patientId}/diagnostic`,
    drawRequest: `/patients/${patientId}?draw=true`,
    odontogram: `/patients/${patientId}/odontogram`,
    followup: `/patients/${patientId}/followup`,
  };

  const patientCephalometry = patient.cephalometry ? true : false;

  const drawRequested = patient.drawRequest?.status
    ? patient.drawRequest.status
    : false;
  const drawButtonText =
    drawRequested === false || patient.drawRequest?.urlResultImage == ""
      ? "Solicitar Trazado"
      : "Ver Trazado";

  const treatmentsAdded = patient.treatmentList
    ? patient.treatmentList.length
    : 0;
  const chephalometryValorationDone = patient.valorationCephalometry
    ? true
    : false;
  const archesValorationDone = patient.valorationArches ? true : false;

  const followupPatient = patient.followupList || [];

  return (
    <>
      <ModalComponent isOpen={searchParams.draw || false}>
        <NewImageComponent
          type='draw'
          patientId={patientId}
          title='Solicitar Trazado'
          patientAvatar={patient.avatar}
          patientName={patient.name}
          imageURL={patient.drawRequest?.patientRxImg}
          drawRequestID={patient.drawRequest?.drawRequestId}
        />
      </ModalComponent>
      <main className='grid gap-6 bg-bgDark-090 px-3 py-6'>
        <section className=' flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
            Seguimiento del Paciente
          </h3>
          <div className='w-full px-6 flex flex-col gap-3 max-h-44 overflow-scroll'>
            {followupPatient.map((f) => (
              <div
                key={f.createdAt}
                className='w-full px-3 py-2 flex items-center gap-2 bg-bgDark-070 text-ctaLight-090'>
                <TextWithLineBreaksComponent text={f.content} />
              </div>
            ))}
          </div>
          <div className='mt-[60px] w-full max-w-[280px] mx-auto'>
            <ButtonComponent
              label='Editar Seguimiento'
              variant='primary-dark'
              widthfull
              anchor
              anchorUrl={links.followup}
            />
          </div>
        </section>

        {patientCephalometry && (
          <>
            <section className=' flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
              <h3 className='mb-[60px] text-h3 text-txtLight-100 text-center'>
                Tratamientos
              </h3>
              {treatmentsAdded > 0 ? (
                <>
                  <div className='w-full grid gap-[60px] px-6'>
                    <TreatmentPendingComponent
                      treatments={treatmentsListSorted}
                      unmutated
                    />
                  </div>
                  <div className='mt-[60px] w-full px-6 grid grid-cols-2 auto-rows-[120px] gap-6'>
                    <ButtonComponent
                      label='Plan de Tratamiento'
                      variant='primary-dark'
                      widthfull
                      anchor
                      anchorUrl={links.treatment}
                      iconSrc='/icons/treatments_icon.svg'
                      square
                    />
                    <ButtonComponent
                      label='Galeria'
                      variant='primary-dark'
                      widthfull
                      anchor
                      anchorUrl={links.gallery}
                      iconSrc='/icons/gallery_icon.svg'
                      square
                    />
                  </div>
                </>
              ) : (
                <div className='w-full px-6 grid grid-cols-2 auto-rows-[160px] gap-6'>
                  <ButtonComponent
                    label='Plan de Tratamiento'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.treatment}
                    iconSrc='/icons/treatments_icon.svg'
                    square
                  />
                  <ButtonComponent
                    label='Galeria'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.gallery}
                    iconSrc='/icons/gallery_icon.svg'
                    square
                  />
                </div>
              )}
            </section>

            <section className='flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
              <h3 className='mb-6 text-h3 text-txtLight-100 text-center'>
                Diagnostico
              </h3>
              {archesValorationDone ? (
                <div className='w-full px-6 grid grid-cols-2 auto-rows-[160px] gap-6'>
                  <ButtonComponent
                    label='Diagnostico'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.diagnostic}
                    iconSrc='/icons/dx_icon.svg'
                    square
                  />
                  <ButtonComponent
                    label='Tamaño Dentario'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.dental_size}
                    iconSrc='/icons/dental_size_icon.svg'
                    square
                  />
                </div>
              ) : (
                <div className='w-full grid grid-cols-1 auto-rows-[90px] gap-6'>
                  <ButtonComponent
                    label='Diagnostico'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.diagnostic}
                    iconSrc='/icons/dx_icon.svg'
                  />
                </div>
              )}
            </section>
          </>
        )}
        <section className='flex flex-col items-center bg-bgDark-080 rounded-[12px] py-6'>
          <h3 className='mb-6 text-h3 text-txtLight-100 text-center'>
            Valoración
          </h3>
          <div className='w-full px-6 grid grid-cols-1 gap-6'>
            {(drawRequested ||
              (!drawRequested && !chephalometryValorationDone)) && (
              <div className='h-[90px] '>
                <ButtonComponent
                  label={drawButtonText}
                  variant='primary-dark'
                  widthfull
                  anchor
                  anchorUrl={links.drawRequest}
                  iconSrc='/icons/draw_icon.svg'
                />
              </div>
            )}
            <div className='grid grid-cols-2 auto-rows-[160px] gap-6'>
              <ButtonComponent
                label='Valoración Cefalométrica'
                variant='primary-dark'
                widthfull
                anchor
                anchorUrl={links.cephalometry}
                iconSrc='/icons/cephalometry_icon.svg'
                square
              />
              <ButtonComponent
                label='Analísis Dental'
                variant='primary-dark'
                widthfull
                anchor
                anchorUrl={links.arches}
                iconSrc='/icons/arches_icon.svg'
                square
              />

              {chephalometryValorationDone && (
                <>
                  <ButtonComponent
                    label='Valoración Oclusal'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.dental}
                    iconSrc='/icons/dental_icon.svg'
                    square
                  />
                  <ButtonComponent
                    label='Odontograma'
                    variant='primary-dark'
                    widthfull
                    anchor
                    anchorUrl={links.odontogram}
                    iconSrc='/icons/odontogram_icon.svg'
                    square
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
