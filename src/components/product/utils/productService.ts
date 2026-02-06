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

export const PRODUCTS_COLLECTION_NAME = "products";

export const productsRef = collection(db, PRODUCTS_COLLECTION_NAME);

/**
 * Creates a new product document.
 * @returns A promise that resolves to the newly created Firestore document reference.
 */
export const addProduct = async (name: string) =>
  await addDoc(productsRef, { name });

/**
 * Internal helper to check if a specific document ID is referenced as 'productId'
 * across a set of other Firestore collections.
 * @param id - The Firestore document ID of the product.
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
      where("productId", "==", id),
      limit(1),
    );
    const snap = await getDocs(q);
    if (!snap.empty) return name;
  }
  return null;
};

/**
 * Deletes a product document only if they are not referenced in other collections.
 * @param id - The ID of the product to delete.
 * @throws {Error} Throws an error containing the name of the collection that blocks deletion.
 * @returns A promise that resolves when the deletion is successful.
 */
export const deleteProduct = async (id: string) => {
  // TODO: make dynamic
  const restrictedCollections: string[] = [];

  const blockingCollection = await checkUsageInCollections(
    id,
    restrictedCollections,
  );

  if (blockingCollection) throw new Error();

  return await deleteDoc(doc(db, PRODUCTS_COLLECTION_NAME, id));
};

/**
 * Updates specific fields of an existing product document.
 * @param id - The ID of the product to update.
 * @param data - An object containing the fields to be updated (e.g., { name: "New Name" }).
 * @returns A promise that resolves when the update is complete.
 */
export const updateProduct = async (id: string, data: object) => {
  const docRef = doc(db, PRODUCTS_COLLECTION_NAME, id);
  return await updateDoc(docRef, data);
};

/**
 * Subscribes to the managers collection in real-time.
 * @param callback - Function to handle the updated array of manager documents.
 * @returns Unsubscribe function to stop listening to changes.
 */
export const subscribeToProducts = (callback: (data: any[]) => void) => {
  return onSnapshot(productsRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
};
