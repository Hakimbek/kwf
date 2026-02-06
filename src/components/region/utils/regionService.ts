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
import { db } from "../../../firebase/firebaseConfig.ts";

export const REGION_COLLECTION_NAME = "region";

export const regionRef = collection(db, REGION_COLLECTION_NAME);

/**
 * Creates a new REGION document.
 * @returns A promise that resolves to the newly created Firestore document reference.
 */
export const addRegion = async (name: string) =>
  await addDoc(regionRef, { name });

/**
 * Internal helper to check if a specific document ID is referenced as 'regionId'
 * across a set of other Firestore collections.
 * @param id - The Firestore document ID of the region.
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
      where("regionId", "==", id),
      limit(1),
    );
    const snap = await getDocs(q);
    if (!snap.empty) return name;
  }
  return null;
};

/**
 * Deletes a region document only if they are not referenced in other collections.
 * @param id - The ID of the company to delete.
 * @throws {Error} Throws an error containing the name of the collection that blocks deletion.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteRegion = async (id: string) => {
  const restrictedCollections: string[] = [];

  const blockingCollection = await checkUsageInCollections(
    id,
    restrictedCollections,
  );

  if (blockingCollection) throw new Error();

  return await deleteDoc(doc(db, REGION_COLLECTION_NAME, id));
};

/**
 * Updates specific fields of an existing region document.
 * @param id - The ID of the company to update.
 * @param data - An object containing the fields to be updated (e.g., { name: "New Name" }).
 * @returns A promise that resolves when the update is complete.
 */
export const updateRegion = async (id: string, data: object) => {
  const docRef = doc(db, REGION_COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

/**
 * Subscribes to the region collection in real-time.
 * @param callback - Function to handle the updated array of region documents.
 * @returns Unsubscribe function to stop listening to changes.
 */
export const subscribeToRegion = (callback: (data: any[]) => void) => {
  return onSnapshot(regionRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};
