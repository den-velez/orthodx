"use server";

import Image from "next/image";
import { where, getDocs, collection, query } from "firebase/firestore";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { db } from "@/lib/firebase/firebase";
import ButtonComponent from "../button/ButtonComponent";
import Link from "next/link";

interface IDoctorHeaderComponent {
  id: string;
  avatar: string;
  name: string;
  credits: number;
}

const getData = async (): Promise<IDoctorHeaderComponent | undefined> => {
  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctor = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );
  const q = query(collection(db, "doctors"), where("email", "==", doctor));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  if (!data[0]) {
    return undefined;
  }
  return data[0] as IDoctorHeaderComponent;
};

export default async function DoctorHeaderComponent() {
  const doctorData = await getData();

  if (!doctorData) {
    return (
      <header className='flex items-center justify-between p-3 min-h-24 bg-bgDark-080 shadow'>
        <ButtonComponent
          anchor
          anchorUrl='/doctors/new'
          label='ir a registrar datos del doctor(a)'
          variant='secondary'
          widthfull
        />
      </header>
    );
  }

  return (
    <header className='flex justify-between p-3 min-h-24 bg-bgDark-080 shadow'>
      <div className='flex flex-col justify-between text-txtBrand-secondary'>
        <h1 className='text-h4 capitalize'>{doctorData.name}</h1>
        <p className=' '>
          Creditos Disponibles:{" "}
          <span className='text-h5'>{doctorData.credits}</span>
        </p>
      </div>
      <div>
        <Link href={`/doctors/${doctorData.id}`}>
          <Image
            className='w-[72px] h-[72px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
            width={40}
            height={40}
            src={doctorData.avatar}
            alt={doctorData.name}
          />
        </Link>
      </div>
    </header>
  );
}
