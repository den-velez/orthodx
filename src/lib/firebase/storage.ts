import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImage(file: File | null): Promise<string | null> {
  if (!file) return null;
  console.log("Uploading image...");

  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

export async function getDownloadURLFromPath(
  imagePath: string
): Promise<string> {
  const storageRef = ref(storage, imagePath);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

// export async function deleteImage(imageURL: string) {
//   const storageRef = ref(storage, imageURL);
//   await storageRef.delete();
// }
