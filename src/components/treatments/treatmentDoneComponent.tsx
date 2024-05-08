import { ITreatment } from "@/interfaces/treatment.interface";

function TreatmentItem({ treatment, finishedAt }: ITreatment) {
  return (
    <div className='px-3 flex gap-3'>
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
      <h4 className='text-h4 text-ctaLight-090 text-center'>
        Tratamientos Realizados
      </h4>
      <div className='mt-3 grid gap-3'>
        {treatments.map((treatment) => {
          if (!treatment.done) return null;
          return <TreatmentItem key={treatment.treatment} {...treatment} />;
        })}
      </div>
    </div>
  );
}
