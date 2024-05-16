"use server";

import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

export async function login(email: string, password: string) {
  let ciphertext = "";
  const key = process.env.CRYPTO_SECRET || "";
  let user;

  try {
    user = await signInWithEmailAndPassword(auth, email, password);
    ciphertext = CryptoJS.AES.encrypt(email, key).toString();
  } catch (error) {
    console.error("Error Login: ", error);
  }

  if (!user) {
    throw new Error("Error en la autenticación");
  }

  cookies().set({
    name: "userID",
    secure: true,
    value: ciphertext,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return true;
}
