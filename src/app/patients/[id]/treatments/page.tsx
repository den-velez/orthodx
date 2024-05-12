import {
  TreatmentDoneComponent,
  TreatmentPendingComponent,
} from "@/components";

import { TREATMENT_DONE_MOCK, TREATMENT_MOCK } from "@/constants/contants";

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

export default function TreatmentPlan() {
  const expansionOptions = [
    {
      label: "Korkhause",
      turns: "10",
      selected: true,
    },
    {
      label: "korkhause modificado",
      turns: "3",
      selected: false,
    },
    {
      label: "mordida cruzada",
      turns: "12",
      selected: false,
    },
    {
      label: "apiñamiento inferior",
      turns: "20",
      selected: false,
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-6'>
      <TreatmentsSection title='Expansion (giros)'>
        <div className='flex flex-col gap-6'>
          {expansionOptions.map((option, index) => (
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
      <TreatmentsSection title='Plan de Tratamiento'>
        <TreatmentPendingComponent treatments={TREATMENT_MOCK} />
      </TreatmentsSection>
      <TreatmentsSection title='Realizado'>
        <TreatmentDoneComponent treatments={TREATMENT_DONE_MOCK} />
      </TreatmentsSection>
      uno
    </div>
  );
}
