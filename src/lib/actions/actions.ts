"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { auth, db, storage } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";

export async function login(email: string, password: string) {
  let emailCrypted = "";
  const key = process.env.CRYPTO_SECRET || "";
  let user;

  try {
    user = await signInWithEmailAndPassword(auth, email, password);
    emailCrypted = CryptoJS.AES.encrypt(email, key).toString();
  } catch (error) {
    console.error("Error Login: ", error);
  }

  if (!user) {
    throw new Error("Error en la autenticación");
  }

  cookies().set({
    name: "userID",
    secure: true,
    value: emailCrypted,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return true;
}

export async function createPatient(newPatientData: {
  name: string;
  age: string;
  doctorOffice: string;
}) {
  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctorEmail = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );

  const payload = {
    ...newPatientData,
    doctor: doctorEmail,
  };

  try {
    const patient = await addDoc(collection(db, "patients"), payload);
    revalidatePath("/patients");
    return patient.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function updatePatient(payload: any, patientId: string) {
  try {
    const docRef = doc(db, "patients", patientId);
    await updateDoc(docRef, payload);

    revalidatePath("/patients");
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function createDoctor(newDoctorData: {
  name: string;
  greetings: string;
}) {
  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctorEmail = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );

  const payload = {
    ...newDoctorData,
    email: doctorEmail,
  };

  try {
    const doctor = await addDoc(collection(db, "doctors"), payload);
    revalidatePath("/patients");
    return doctor.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function updateDoctor(payload: any, doctorId: string) {
  try {
    const docRef = doc(db, "doctors", doctorId);
    await updateDoc(docRef, payload);

    revalidatePath("/patients");
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}
