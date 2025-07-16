import { get, onValue, push, ref, remove, set } from "firebase/database";
import { auth, db } from "../firebase.config";
import { updateProfile } from "firebase/auth";

export async function writeDataInDb(path, data) {
  try {
    const dbRef = ref(db, path);
    await set(dbRef, data);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createMessage(path, data) {
  try {
    const dbRef = ref(db, path);
    await push(dbRef, data);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function readData(path) {
  try {
    const snapShot = await get(ref(db, path));

    if (!snapShot.exists()) throw new Error("Data not found at path: " + path);
    return snapShot;
  } catch (error) {
    throw new Error("Read Failed: " + error.message);
  }
}

export async function updateUserInfo(data) {
  try {
    await updateProfile(auth.currentUser, { displayName: data });
  } catch (error) {
    throw new Error(error.message);
  }
}
export function listenToPath(path, callback) {
  const dbRef = ref(db, path);
  const unsubscribe = onValue(dbRef, callback);
  return unsubscribe; // call this in useEffect cleanup
}

export async function removeData(path) {
  try {
    const dbRef = ref(db, path);
    await remove(dbRef);
  } catch (error) {
    throw new Error("Remove Failed: " + error.message);
  }
}
