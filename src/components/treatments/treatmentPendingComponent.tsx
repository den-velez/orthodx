import { ITreatment } from "@/interfaces/treatment.interface";
import { IconsComponent } from "@/components";

function TreatmentItem({ treatment }: ITreatment) {
  return (
    <div className='px-3 flex items-center gap-3'>
      <div className='px-1 h-full flex items-center bg-bgDark-070 text-ctaLight-090'>
        <input className='w-7 h-7 ' type='checkbox' name='' id='' />
      </div>
      <div className='px-3 py-2 flex flex-grow items-center bg-bgDark-070 text-ctaLight-090'>
        <span>{treatment}</span>
      </div>
      <div className='px-1 h-full flex items-center justify-center bg-bgDark-070 text-ctaLight-090 shadow hover:border hover:border-light-090'>
        <button>
          <IconsComponent icon='trash' />
        </button>
      </div>
    </div>
  );
}

export default function TreatmentPendingComponent({
  treatments = [],
  title = "Tratamientos por Realizar",
}: {
  treatments: ITreatment[];
  title?: string;
}) {
  return (
    <div className='w-full'>
      <h4 className='text-h4 text-ctaLight-090 text-center'>{title}</h4>
      <div className='mt-3 grid gap-3'>
        {treatments.map((treatment) => {
          if (treatment.done) return null;
          return <TreatmentItem key={treatment.treatment} {...treatment} />;
        })}
      </div>
    </div>
  );
}
