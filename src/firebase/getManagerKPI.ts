import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.ts";

export const getManagerKPI = async (
  managerName: string,
  callback: (amount: number) => void,
) => {
  try {
    const docRef = doc(db, "kpi", managerName.trim());
    const docSnap = await getDoc(docRef);
    callback(docSnap.exists() ? docSnap.data().amount : 0);
  } catch (error) {
    console.log(error);
  }
};
