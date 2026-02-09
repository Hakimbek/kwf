import { db } from "./firebaseConfig.ts";
import {
  QueryConstraint,
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
  serverTimestamp,
} from "firebase/firestore";

export const COMPANY_COLLECTION = "company";
export const MANAGERS_COLLECTION = "managers";
export const PRODUCTS_COLLECTION = "products";
export const REGION_COLLECTION = "region";
export const CLIENT_COLLECTION = "client";
export const PLAN_COLLECTION = "plan";

/**
 * Generic function to add a document to any collection with timestamps.
 * @param collectionName - The name of the Firestore collection.
 * @param data - The object data to save (excluding ID and timestamps).
 */
export const addDocument = async <T extends object>(
  collectionName: string,
  data: T,
) => {
  await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    lastEditedAt: serverTimestamp(),
  });
};

/**
 * Checks if a specific ID is being used as a reference in other collections.
 * @param id - The ID of the document being deleted (e.g., 'comp_123').
 * @param collectionsToCheck - Array of collections to search through.
 * @param targetFieldName - The field name to look for (e.g., 'companyId').
 * Defaults to a generated name if not provided.
 */
const checkUsageInCollections = async (
  id: string,
  collectionsToCheck: string[],
  targetFieldName: string,
) => {
  for (const name of collectionsToCheck) {
    const q = query(
      collection(db, name),
      where(targetFieldName, "==", id),
      limit(1),
    );

    const snap = await getDocs(q);

    if (!snap.empty) return name;
  }

  return null;
};

/**
 * Generic delete function with a relational usage check.
 * @param collectionName - The collection where the document lives.
 * @param id - The ID of the document to delete.
 * @param restrictedCollections - Optional list of collections to check for usage.
 * @param foreignKey - The field name used to link documents (e.g., 'companyId').
 */
export const deleteDocument = async (
  collectionName: string,
  id: string,
  restrictedCollections: string[] = [],
  foreignKey?: string,
) => {
  if (restrictedCollections.length > 0 && foreignKey) {
    const blockingCollection = await checkUsageInCollections(
      id,
      restrictedCollections,
      foreignKey,
    );

    if (blockingCollection) {
      throw new Error(`Cannot delete: record is used in ${blockingCollection}`);
    }
  }

  return await deleteDoc(doc(db, collectionName, id));
};

/**
 * Generic update function for any Firestore collection.
 * @param collectionName - The name of the collection (e.g., "company", "managers").
 * @param id - The document ID to update.
 * @param data - A partial object of the type T.
 */
export const updateDocument = async <T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>,
) => {
  const docRef = doc(db, collectionName, id);

  return await updateDoc(docRef, {
    ...data,
    lastEditedAt: serverTimestamp(),
  });
};

/**
 * Subscribes to any collection or query in real-time.
 * @param collectionName - The string name of the collection.
 * @param callback - Function that receives the typed array of data.
 * @param constraints - Optional Firestore query constraints (where, orderBy, etc.).
 */
export const subscribeToCollection = <T>(
  collectionName: string,
  callback: (data: (T & { id: string })[]) => void,
  ...constraints: QueryConstraint[]
) => {
  const q = query(collection(db, collectionName), ...constraints);

  return onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data({ serverTimestamps: "estimate" }) as T),
    }));
    callback(data);
  });
};
