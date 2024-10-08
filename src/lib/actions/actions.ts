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
import {
  ICreateDrawRequest,
  IDoctor,
  IDrawRequest,
  INewProduct,
  INewPurchase,
  IPatient,
  IProduct,
  IUpdateByPurchase,
} from "@/interfaces";

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

  const { paidCredits, memberCredits, id } = doctorData;

  if (id === undefined) return false;

  if (paidCredits + memberCredits == 0) {
    throw new Error("Doctor has no credits");
  }

  let creditsSource;
  let newCreditAmount;
  if (memberCredits > 0) {
    creditsSource = "memberCredits";
    newCreditAmount = { memberCredits: memberCredits - 1 };
  } else {
    creditsSource = "paidCredits";
    newCreditAmount = { paidCredits: paidCredits - 1 };
  }

  try {
    const patient = await addDoc(collection(db, "patients"), payload);
    await updateDoctor(newCreditAmount, id);
    await saveCreditsUsage({
      doctorId: id,
      patientId: patient.id,
      creditsRequired: 1,
      operation: "create patient",
    });
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
    await updateDoc(docRef, payload);

    revalidatePath("/patients");
    return true;
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

export async function getDoctorDataByEmail(doctorEmail: string) {
  if (!doctorEmail) return null;
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

export async function paymentCheckout(
  purchaseData: INewPurchase,
  onePayment: boolean
) {
  const url = onePayment
    ? `${process.env.NEXT_PUBLIC_URL}/api/checkout/payment`
    : `${process.env.NEXT_PUBLIC_URL}/api/checkout/suscription`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error("Error al procesar la solicitud");
    const data = await response.json();
    console.log(data);
    return data.url;
  } catch (error) {
    console.error("Error in payment checkout: ", error);
    return null;
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

export async function getProductById(id: string) {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  let resultData = undefined;
  if (docSnap.exists()) {
    resultData = docSnap.data();
  } else {
    console.log("No such document!");
  }
  return resultData;
}

export async function getPatientsByDoctor(doctor: string) {
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

export async function getDoctorEmailbyCookie(userID: string | null) {
  if (!userID) return null;
  const key = process.env.CRYPTO_SECRET || "";
  const doctorEmail = CryptoJS.AES.decrypt(userID, key).toString(
    CryptoJS.enc.Utf8
  );

  return doctorEmail;
}

export async function createProduct(product: INewProduct) {
  try {
    const newProduct = await addDoc(collection(db, "products"), product);
    return newProduct.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function applyPurchase(productId: string, doctorEmail: string) {
  const product = (await getProductById(productId)) as IProduct;
  const doctor = (await getDoctorDataByEmail(doctorEmail)) as IDoctor;

  if (!product || !doctor || !doctor.id) return false;

  const { category, credits, suscriptionMonths } = product;

  const today = new Date().toISOString().split("T")[0];
  const newDate = new Date();
  const newDateRaw = newDate.setMonth(newDate.getMonth() + suscriptionMonths);
  const newDateFormatted = new Date(newDateRaw).toISOString().split("T")[0];

  let payload: IUpdateByPurchase | undefined;

  if (category === "credits") {
    const updatedAt = today;
    const paidCredits = credits + doctor.paidCredits;
    const paidCreditsExpireAt = newDateFormatted;

    payload = {
      updatedAt,
      paidCredits,
      paidCreditsExpireAt,
    };
  }

  if (category === "basic" || category === "plus") {
    const updatedAt = today;
    const memberCredits = credits;
    const memberCreditsExpireAt = newDateFormatted;
    const subscriptionActive = true;
    const membershipExpireAt = newDateFormatted;

    payload = {
      updatedAt,
      memberCredits,
      memberCreditsExpireAt,
      subscriptionActive,
      membershipExpireAt,
    };
  }

  if (!payload) return false;

  const res = await updateDoctor(payload, doctor.id);

  console.log("Applying res", res);
  if (!res) return false;

  return true;
}

export async function takeCredits(doctorId: string, creditsRequired: number) {
  const docRef = doc(db, "doctors", doctorId);
  const doctorData = (await getDoctorData(doctorId)) as IDoctor;

  const memberCredits = doctorData.memberCredits;
  const paidCredits = doctorData.paidCredits;

  if (memberCredits + paidCredits < creditsRequired) {
    throw new Error("Doctor has no enough credits");
  }
  console.log("Payload", memberCredits, paidCredits);
  let creditsTaken = 0;
  let newMemberCredits = 0;
  let newPaidCredits = 0;

  if (memberCredits > 0) {
    const creditsToTake = Math.min(memberCredits, creditsRequired);
    newMemberCredits = memberCredits - creditsToTake;
    creditsTaken = creditsToTake;
  }

  if (creditsTaken < creditsRequired) {
    const creditsToTake = creditsRequired - creditsTaken;
    newPaidCredits = paidCredits - creditsToTake;
    creditsTaken += creditsToTake;
  }

  const payload = {
    memberCredits: newMemberCredits,
    paidCredits: newPaidCredits,
  };

  try {
    const res = await updateDoc(docRef, payload);

    return true;
  } catch (error) {
    throw new Error("Error taking credits from doctor");
  }
}

export async function saveCreditsUsage({
  doctorId,
  patientId,
  creditsRequired,
  operation,
}: {
  doctorId: string;
  patientId: string;
  creditsRequired: number;
  operation: string;
}) {
  const createAt = new Date().toISOString().split("T")[0];
  const payload = {
    createAt,
    operation,
    creditsRequired,
    doctorId,
    patientId,
  };

  try {
    await addDoc(collection(db, "creditsUsage"), payload);

    revalidatePath("/patients");
    return true;
  } catch (e) {
    console.error("Error taking credits from doctor: ", e);
    return false;
  }
}

export async function saveDrawRequest({
  patientId,
  doctorId,
  patientAvatar,
  patientName,
  patientRxImg,
}: {
  patientId: string;
  doctorId: string;
  patientAvatar: string;
  patientName: string;
  patientRxImg: string;
}) {
  const createdAt = new Date().toISOString().split("T")[0];
  const status = "pending";

  const payload: IDrawRequest = {
    createdAt,
    updatedAt: createdAt,
    status,
    patientId,
    doctorId,
    patientAvatar,
    patientName,
    patientRxImg,
    isPaid: false,
  };

  try {
    const response = await addDoc(collection(db, "drawRequests"), payload);
    return response.id;
  } catch (e) {
    console.error("Error drawing request: ", e);
    return false;
  }
}

export async function drawRequest({
  doctorId,
  patientId,
  patientAvatar,
  patientName,
  patientRxImg,
}: ICreateDrawRequest) {
  try {
    await takeCredits(doctorId, 2);
    await saveCreditsUsage({
      doctorId,
      patientId,
      creditsRequired: 2,
      operation: "draw request",
    });
    const drawRequestID = await saveDrawRequest({
      patientId,
      doctorId,
      patientAvatar,
      patientName,
      patientRxImg,
    });

    await updatePatient(
      {
        drawRequest: {
          createdAt: new Date().toISOString().split("T")[0],
          status: "pending",
          urlRxImage:
            "https://firebasestorage.googleapis.com/v0/b/orthodx-v2.appspot.com/o/orthodx%2FnoResults.png?alt=media&token=29959708-e18a-4c4f-b708-d133e2504a0c",
          drawRequestId: drawRequestID,
        },
      },
      patientId
    );
    console.log("Patient updated");

    return drawRequestID;
  } catch (error) {
    throw new Error("Error drawing request ");
  }
}

// export const migrateAddPatients = async (payload: any) => {
//   try {
//     const patient = await addDoc(collection(db, "patients"), payload);
//     return patient.id;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//     return false;
//   }
// };
