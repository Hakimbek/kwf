import { db } from "./firebaseConfig.ts";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";

export const clearCollection = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);
  const snapshot = await getDocs(collectionRef);

  if (snapshot.size === 0) return;

  const batch = writeBatch(db);

  snapshot.docs.forEach((document) => {
    batch.delete(doc(db, collectionName, document.id));
  });

  await batch.commit();
};
