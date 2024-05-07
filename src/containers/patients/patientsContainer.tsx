"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PatientCardComponent } from "@/components";
import { PATIENTLIST_MOCK } from "@/constants/contants";

export default function PatientsContainer() {
  const searchParams = useSearchParams();

  const favs = PATIENTLIST_MOCK.filter((patient) => patient.fav);
  const patients = PATIENTLIST_MOCK.filter((patient) => !patient.fav);

  const isSearch = searchParams.get("name") !== null;

  if (!isSearch) {
    return (
      <section className='p-6 rounded-[12px] bg-bgDark-080 '>
        <div className='grid grid-cols-2 grid-rows-2 gap-3'>
          {favs.map((fav) => (
            <PatientCardComponent
              key={fav.id}
              id={fav.id}
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
              id={patient.id}
              avatar={patient.avatar}
              name={patient.name}
              type='regular'
            />
          ))}
        </div>
      </section>
    );
  }

  if (searchParams.get("name")) {
    const patientsSearch = PATIENTLIST_MOCK.filter((patient) =>
      patient.name
        .toLowerCase()
        .includes(searchParams.get("name")?.toLowerCase() ?? "")
    );

    if (patientsSearch.length === 0) {
      return (
        <section className='min-h-[200px] p-6 rounded-[12px] bg-bgDark-080 '>
          <div className='grid grid-cols-1 gap-3'>
            <Image
              src='/images/noResults.png'
              alt='No se encontraron resultados'
              width={300}
              height={225}
            />
            <p className='text-white text-center'>
              No se encontraron resultados
            </p>
          </div>
        </section>
      );
    }
    return (
      <section className='p-6 rounded-[12px] bg-bgDark-080 '>
        <div className='grid grid-cols-2 grid-rows-2 gap-3'>
          {patientsSearch.map((patient) => (
            <PatientCardComponent
              key={patient.id}
              id={patient.id}
              avatar={patient.avatar}
              name={patient.name}
              type='fav'
            />
          ))}
        </div>
      </section>
    );
  }
}
