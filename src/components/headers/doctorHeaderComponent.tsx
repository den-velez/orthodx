import Image from "next/image";
import { db } from "@/lib/firebase/firebase";
import { where, getDocs, collection, query } from "firebase/firestore";

interface IDoctorHeaderComponent {
  avatar: string;
  name: string;
  credits: number;
}

const getData = async () => {
  const q = query(collection(db, "doctors"), where("name", "==", "Dr. House"));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map(
    (doc) => doc.data() as IDoctorHeaderComponent
  );
  return (
    (data[0] as IDoctorHeaderComponent) || { name: "", avatar: "", credits: 0 }
  );
};

export default async function DoctorHeaderComponent() {
  const { name, avatar, credits } = await getData();

  return (
    <header className='flex justify-between p-3 min-h-24 bg-bgDark-080 shadow'>
      <div className='flex flex-col justify-between text-txtBrand-secondary'>
        <h1 className='text-h4 '>{name}</h1>
        <p className=' '>Creditos Disponibles: {credits}</p>
      </div>
      <div>
        <Image
          className='w-[72px] h-[72px] p-1 rounded-full ring-2 dark:ring-bgDark-070 shadow'
          width={40}
          height={40}
          src={avatar}
          alt={name}
        />
      </div>
    </header>
  );
}
