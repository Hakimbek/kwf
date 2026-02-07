import { db } from "../../../firebase/firebaseConfig.ts";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  limit,
  updateDoc,
} from "firebase/firestore";

export const VERSION_COLLECTION_NAME = "version";

export const versionRef = collection(db, VERSION_COLLECTION_NAME);

/**
 * Creates a new version document.
 * @returns A promise that resolves to the newly created Firestore document reference.
 */
export const addVersion = async (name: string) =>
  await addDoc(versionRef, { name });

/**
 * Internal helper to check if a specific document ID is referenced as 'versionId'
 * across a set of other Firestore collections.
 * @param id - The Firestore document ID of the version.
 * @param collectionsToCheck - An array of collection names to search through.
 * @returns The name of the first collection where a reference is found, or null if clear.
 */
const checkUsageInCollections = async (
  id: string,
  collectionsToCheck: string[],
) => {
  for (const name of collectionsToCheck) {
    const q = query(
      collection(db, name),
      where("versionId", "==", id),
      limit(1),
    );
    const snap = await getDocs(q);
    if (!snap.empty) return name;
  }
  return null;
};

/**
 * Deletes a version document only if they are not referenced in other collections.
 * @param id - The ID of the version to delete.
 * @throws {Error} Throws an error containing the name of the collection that blocks deletion.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteVersion = async (id: string) => {
  const restrictedCollections: string[] = [];

  const blockingCollection = await checkUsageInCollections(
    id,
    restrictedCollections,
  );

  if (blockingCollection) throw new Error();

  return await deleteDoc(doc(db, VERSION_COLLECTION_NAME, id));
};

/**
 * Updates specific fields of an existing version document.
 * @param id - The ID of the version to update.
 * @param data - An object containing the fields to be updated (e.g., { name: "New Name" }).
 * @returns A promise that resolves when the update is complete.
 */
export const updateVersion = async (id: string, data: object) => {
  const docRef = doc(db, VERSION_COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

/**
 * Subscribes to the version collection in real-time.
 * @param callback - Function to handle the updated array of version documents.
 * @returns Unsubscribe function to stop listening to changes.
 */
export const subscribeToVersion = (callback: (data: any[]) => void) => {
  return onSnapshot(versionRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};
