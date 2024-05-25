import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(
  file: File | null,
  folder: string,
  doctor: string
): Promise<string | null> {
  if (!file) return null;

  const storageRef = ref(storage, `images/${doctor}/${folder}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

export async function getImage(imagePath: string): Promise<string> {
  const storageRef = ref(storage, imagePath);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

export async function deleteImage(imageURL: string) {
  try {
    const storageRef = ref(storage, imageURL);

    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Uh-oh, an error occurred!", error);
  }
}

export async function updateImage(
  file: File | null,
  folder: string,
  doctor: string,
  imageURL: string
): Promise<string | null> {
  if (!file) return null;

  await deleteImage(imageURL);
  const newImageURL = await uploadImage(file, folder, doctor);

  return newImageURL;
}
