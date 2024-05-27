import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

interface UploadOptions {
  doctorId?: string;
  patientId?: string;
}

export async function uploadImage(
  file: File | null,
  type: "avatar" | "draw" | "assets",
  options: UploadOptions
): Promise<string | null> {
  if (!file) return null;
  const { doctorId, patientId } = options;

  const getPath = (type: string, patientId?: string) => {
    const today = new Date().toISOString().split("T")[0];
    let path: string;
    let fileName: string;

    if (type === "avatar" && doctorId) {
      path = `images-doctors/${doctorId}`;
      fileName = `${type}-${today}`;
      return { path, fileName };
    }

    path = `images-patients/${patientId}/${type}`;
    fileName = `${type}-${today}`;
    return { path, fileName };
  };

  const ext = file.name.split(".").pop();
  const { path, fileName } = getPath(type, patientId || undefined);

  const storageRef = ref(storage, `${path}/${fileName}.${ext}`);
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
  type: "avatar" | "draw" | "assets",
  options: UploadOptions,
  imageURL: string
): Promise<string | null> {
  if (!file) return null;

  await deleteImage(imageURL);
  const newImageURL = await uploadImage(file, type, options);

  return newImageURL;
}
