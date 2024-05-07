import { IPatient } from "../../interfaces/patient.interface";
import { PatientCardComponent } from "@/components";

type PatientsContainerProps = {
  favs: IPatient[];
  patients: IPatient[];
};

export default function PatientsContainer({
  favs = [],
  patients = [],
}: PatientsContainerProps) {
  return (
    <section className='p-6 rounded-[12px] bg-bgDark-080 '>
      <div className='grid grid-cols-2 grid-rows-2 gap-3'>
        {favs.map((fav) => (
          <PatientCardComponent
            key={fav.id}
            avatar={fav.avatar}
            name={fav.name}
            type='fav'
          />
        ))}
      </div>
      <div className='mt-3 grid grid-cols-1 gap-3'>
        {patients.map((patient) => (
          <PatientCardComponent
            key={patient.id}
            avatar={patient.avatar}
            name={patient.name}
            type='regular'
          />
        ))}
      </div>
    </section>
  );
}
