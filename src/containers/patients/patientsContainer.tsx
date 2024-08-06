import Image from "next/image";
import { where, getDocs, collection, query } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { PatientCardComponent } from "@/components";
import { db } from "@/lib/firebase/firebase";
import { IPatientCard } from "@/interfaces";
import { NO_RESULTS_IMG } from "@/constants/constants";

async function getPatientsData(doctor: string) {
  const q = query(collection(db, "patients"), where("doctor", "==", doctor));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data || [];
}

export default async function PatientsContainer({
  name,
}: {
  name: string | null;
}) {
  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctorEmail = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );

  if (!doctorEmail) redirect("/auth/login");

  const patientList = (await getPatientsData(doctorEmail)) as IPatientCard[];

  const noPatientsFound =
    patientList.length === 0
      ? "No hay pacientes registrados"
      : "No se encontraron pacientes";

  if (!patientList || patientList.length === 0) {
    return (
      <section className='min-h-[200px] p-6 rounded-[12px] bg-bgDark-080 '>
        <div className='flex flex-col items-center gap-3'>
          <Image
            src={NO_RESULTS_IMG}
            alt='No hay pacientes registrados'
            width={300}
            height={225}
          />
          <p className='text-white text-center'>{noPatientsFound}</p>
        </div>
      </section>
    );
  }

  const patientListFavs: IPatientCard[] = [];
  let patientListRegular: IPatientCard[] = [];

  const calculateFavs = (totalPatients: number) => {
    if (totalPatients % 2 == 0) return totalPatients;
    return totalPatients - 1;
  };

  const totalFavs = calculateFavs(patientList.length);
  if (!name) {
    patientList.forEach((patient, index) => {
      if (index < totalFavs) {
        patientListFavs.push(patient as IPatientCard);
      } else {
        patientListRegular.push(patient as IPatientCard);
      }
    });
  } else {
    const patientsSearch = patientList.filter((patient) =>
      patient.name.toLowerCase().includes(name?.toLowerCase() ?? "")
    );
    patientListRegular = [...patientsSearch] as IPatientCard[];
  }

  if (patientListFavs.length === 0 && patientListRegular.length === 0) {
    return (
      <section className='min-h-[200px] p-6 rounded-[12px] bg-bgDark-080 '>
        <div className='flex flex-col items-center gap-3'>
          caas
          <Image
            src={NO_RESULTS_IMG}
            alt='No hay pacientes registrados'
            width={300}
            height={225}
          />
          <p className='text-white text-center'>{noPatientsFound}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='p-6 rounded-[12px] bg-bgDark-080 '>
      <div className='grid grid-cols-2 gap-3'>
        {patientListFavs.map((fav) => (
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
        {patientListRegular.map((patient) => (
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
