import { ITreatment } from "@/interfaces/treatment.interface";

function TreatmentItem({ treatment, finishedAt }: ITreatment) {
  return (
    <div className='flex gap-3'>
      <div className='px-3 flex flex-grow items-center bg-bgDark-070 text-ctaLight-090'>
        <span>{treatment}</span>
      </div>
      <div className='py-2 px-6 flex items-center justify-center bg-bgDark-070 text-ctaLight-090'>
        <span>{finishedAt}</span>
      </div>
    </div>
  );
}

export default function TreatmentDoneComponent({
  treatments = [],
}: {
  treatments: ITreatment[];
}) {
  return (
    <div className='w-full'>
      {treatments.length === 0 && (
        <h3 className='mt-6 text-body text-txtLight-100 text-center'>
          No hay tratamientos realizados
        </h3>
      )}
      <div className='mt-3 grid gap-3'>
        {treatments.length !== 0 && (
          <div className='flex justify-between gap-3 text-txtDark-090'>
            <span className='px-3 flex-grow text-center'>
              Tratamientos realizados
            </span>
            <span className='px-8 text-center'>Fecha </span>
          </div>
        )}
        {treatments.map((treatment) => {
          if (!treatment.done) return null;
          return <TreatmentItem key={treatment.treatment} {...treatment} />;
        })}
      </div>
    </div>
  );
}
