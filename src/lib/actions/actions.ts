"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { auth, db, storage } from "@/lib/firebase/firebase";
import { revalidatePath } from "next/cache";
import { IDoctor, INewPurchase } from "@/interfaces";

export async function login(email: string, password: string) {
  let emailCrypted = "";
  const key = process.env.CRYPTO_SECRET || "";
  let user;
  let sessionUser;
  let sessionUserCrypted;

  try {
    user = await signInWithEmailAndPassword(auth, email, password);
    sessionUser = await getDoctorSubscription(email);
    emailCrypted = CryptoJS.AES.encrypt(email, key).toString();
    sessionUserCrypted = CryptoJS.AES.encrypt(sessionUser, key).toString();

    const userVerified = user.user?.emailVerified;

    if (!user) {
      throw new Error("El email o la contraseña son incorrectos");
    }

    if (!userVerified) {
      throw new Error("La cuenta no ha sido verificada");
    }

    cookies().set({
      name: "userID",
      secure: true,
      value: emailCrypted,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    cookies().set({
      name: "suscriptionUser",
      secure: true,
      value: sessionUserCrypted,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return true;
  } catch (error) {
    throw new Error("Email o password no es correcto");
  }
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

  const doctorData = (await getDoctorData(doctorEmail)) as IDoctor;

  if (!doctorData) {
    throw new Error("Doctor not found");
  }

  const { credits, paidCredits, memberCredits } = doctorData;

  // get credits from doctor and add to patient
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

export async function getDocById(id: string, collection: string) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  let resultData = undefined;
  if (docSnap.exists()) {
    resultData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return resultData;
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
    const doctor = await updateDoc(docRef, payload);

    revalidatePath("/patients");
    return doctor;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function getDoctorData(userID: string | null) {
  if (!userID) return null;

  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctorEmail = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );

  const q = query(collection(db, "doctors"), where("email", "==", doctorEmail));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const doctorData = { ...data, id: doc.id } as IDoctor;
    return doctorData;
  });

  return data[0] || null;
}

export async function getDoctorSubscription(email: string) {
  const q = query(collection(db, "doctors"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  const doctorData = (data[0] as IDoctor) || null;

  if (!doctorData) return "No membership date found";

  const doctorExpiredDate = doctorData.membershipExpireAt || null;

  if (!doctorExpiredDate) return "No membership date found";

  const expiredDate = new Date(doctorExpiredDate);
  const currentDate = new Date();
  const isActive = currentDate <= expiredDate;

  return isActive ? doctorExpiredDate : "No membership date found";
}

export async function newPurchase(newPurchaseData: INewPurchase) {
  try {
    const purchase = await addDoc(collection(db, "purchases"), newPurchaseData);

    const getProduct = await getDocById(newPurchaseData.productId, "products");
    const doctor = await getDocById(newPurchaseData.doctorId, "doctors");

    if (!getProduct || !doctor) {
      throw new Error("Product or doctor not found");
    }

    const credits = getProduct.credits || 0;
    const doctorCredits = doctor.credits || 0;
    const creditsUpdated = credits + doctorCredits;

    await updateDoctor({ credits: creditsUpdated }, newPurchaseData.doctorId);

    revalidatePath("/patients");

    return {
      purchaseTicket: purchase.id,
      message: "Purchase created successfully",
    };
  } catch (e) {
    console.error("Error in purchase: ", e);
    return false;
  }
}

export async function getAllProducts() {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return data || [];
}

async function getPatientsByDoctor(doctor: string) {
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

export async function getDoctorIdByEmail() {
  const key = process.env.CRYPTO_SECRET || "";
  const doctorRaw = cookies().get("userID")?.value || "";
  const doctor = CryptoJS.AES.decrypt(doctorRaw, key).toString(
    CryptoJS.enc.Utf8
  );
  const q = query(collection(db, "doctors"), where("email", "==", doctor));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return {
      doctorId: doc.id,
      credits: doc.data().credits,
    };
  });

  if (data.length === 0) return null;

  const { doctorId, credits } = data[0];

  return { doctorId, credits };
}
