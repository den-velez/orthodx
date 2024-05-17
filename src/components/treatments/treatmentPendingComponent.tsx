import { ITreatment } from "@/interfaces/treatment.interface";
import { IconsComponent } from "@/components";

type ITreatmentItem = {
  treatment: ITreatment;
  disabled?: boolean;
};

function TreatmentItem({ treatment, disabled }: ITreatmentItem) {
  if (disabled) {
    return (
      <div className='flex px-3 items-center gap-3'>
        <div className='px-3 py-2 flex flex-grow items-center bg-bgDark-070 text-ctaLight-090'>
          <span>{treatment.treatment}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center gap-3'>
      <div className='px-1 h-full flex items-center bg-bgDark-070 text-ctaLight-090'>
        <input className='w-7 h-7 ' type='checkbox' name='' id='' />
      </div>
      <div className='px-3 py-2 flex flex-grow items-center bg-bgDark-070 text-ctaLight-090'>
        <span>{treatment.treatment}</span>
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
  unmutated,
}: {
  treatments: ITreatment[];
  title?: string;
  unmutated: boolean;
}) {
  console.log(unmutated);
  return (
    <div className='w-full'>
      <h4 className='text-h4 text-ctaLight-090 text-center'>{title}</h4>
      {treatments.length === 0 && (
        <h3 className='mt-6 text-body text-txtLight-100 text-center'>
          No hay tratamientos pendientes
        </h3>
      )}
      <div className='mt-3 grid gap-3'>
        {treatments.map((treatment) => {
          if (treatment.done) return null;
          return (
            <TreatmentItem
              key={treatment.treatment}
              treatment={treatment}
              disabled={unmutated}
            />
          );
        })}
      </div>
    </div>
  );
}
