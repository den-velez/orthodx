import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDohMG2rSaBs8WhvvACCkN6R1J2WwTlgAI",
  authDomain: "orthodx-v2.firebaseapp.com",
  projectId: "orthodx-v2",
  storageBucket: "orthodx-v2.appspot.com",
  messagingSenderId: "888397771866",
  appId: "1:888397771866:web:cbd6afa463acf198bd9463",
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
