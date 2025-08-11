import { get, off, onValue, push, ref, remove, set } from "firebase/database";
import { db } from "../firebase.config";

export async function writeDataInDb(path, data) {
  try {
    const dbRef = ref(db, path);
    await set(dbRef, data);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function writeDataWithIdInDb(path, data) {
  try {
    const dbRef = push(ref(db, path));
    await set(dbRef, { ...data, id: dbRef.key });
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function readData(path) {
  try {
    const snapshot = await get(ref(db, path));

    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val());
  } catch (error) {
    throw new Error("Read Failed: " + error.message);
  }
}
export async function readSingleData(path) {
  try {
    const snapshot = await get(ref(db, path));

    if (!snapshot.exists()) return [];
    return snapshot.val();
  } catch (error) {
    throw new Error("Read Failed: " + error.message);
  }
}

export function readDataObserver(path, callback) {
  const dataRef = ref(db, path);
  const listener = onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) callback(Object.values(snapshot.val()));
    else callback([]);
  });
  return () => off(dataRef, "value", listener);
}

export async function removeData(path) {
  try {
    const dbRef = ref(db, path);
    await remove(dbRef);
  } catch (error) {
    throw new Error("Remove Failed: " + error.message);
  }
}
