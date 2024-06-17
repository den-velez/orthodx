import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import {
  ButtonComponent,
  FooterComponent,
  FormDoctorComponent,
} from "@/components";
import { IDoctor } from "@/interfaces";

const getDoctorData = async (id: string) => {
  const docRef = doc(db, "doctors", id);
  const docSnap = await getDoc(docRef);
  let doctorData = undefined;
  if (docSnap.exists()) {
    doctorData = {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
  return doctorData;
};

export default async function DoctorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const doctorData = async (id: string) => {
    const baseDoctorData = {
      id: "",
      greetings: "",
      email: "",
      name: "",
      avatar: "/images/avatar.png",
      credits: 0,
      createdAt: "",
      updatedAt: "",
    };

    if (!id || id === "new") {
      return baseDoctorData;
    }
    const doctor = (await getDoctorData(id)) as IDoctor;

    if (!doctor) {
      return baseDoctorData;
    }

    return doctor;
  };

  const doctor = (await doctorData(id)) as IDoctor;

  return (
    <div className='bg-bgDark-090 h-screen'>
      <main className='px-3 pt-6 pb-[60px]'>
        <FormDoctorComponent {...doctor} />
        <div className='mt-[60px] h-[60px] px-6'>
          <ButtonComponent
            variant='primary-dark'
            label='OrthoDx shop'
            anchor
            anchorUrl='/store'
            widthfull
          />
        </div>
      </main>
      <FooterComponent type='doctor' doctorId='id' />
    </div>
  );
}
