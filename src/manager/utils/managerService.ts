import { db } from "../../firebase/firebaseConfig.ts";
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

export const MANAGERS_COLLECTION_NAME = "managers";

export const managersRef = collection(db, MANAGERS_COLLECTION_NAME);

/**
 * Creates a new manager document with default empty values.
 * @returns A promise that resolves to the newly created Firestore document reference.
 */
export const addManager = async () =>
  await addDoc(managersRef, { name: "", isActive: true });

/**
 * Internal helper to check if a specific document ID is referenced as 'managerId'
 * across a set of other Firestore collections.
 * @param id - The Firestore document ID of the manager.
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
      where("managerId", "==", id),
      limit(1),
    );
    const snap = await getDocs(q);
    if (!snap.empty) return name;
  }
  return null;
};

/**
 * Deletes a manager document only if they are not referenced in other collections.
 * @param id - The ID of the manager to delete.
 * @throws {Error} Throws an error containing the name of the collection that blocks deletion.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteManager = async (id: string) => {
  // TODO: make dynamic
  const restrictedCollections: string[] = [];

  const blockingCollection = await checkUsageInCollections(
    id,
    restrictedCollections,
  );

  if (blockingCollection) throw new Error(blockingCollection);

  return await deleteDoc(doc(db, MANAGERS_COLLECTION_NAME, id));
};

/**
 * Updates specific fields of an existing manager document.
 * @param id - The ID of the manager to update.
 * @param data - An object containing the fields to be updated (e.g., { name: "New Name" }).
 * @returns A promise that resolves when the update is complete.
 */
export const updateManager = async (id: string, data: object) => {
  const docRef = doc(db, MANAGERS_COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

/**
 * Subscribes to the managers collection in real-time.
 * @param callback - Function to handle the updated array of manager documents.
 * @returns Unsubscribe function to stop listening to changes.
 */
export const subscribeToManagers = (callback: (data: any[]) => void) => {
  return onSnapshot(managersRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};
