import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";

export const getFilteredData = (
  collectionName: string,
  filters: {
    type?: string;
    region?: string;
    manager?: string;
    product?: string;
  },
  callback: (data: any[]) => void,
) => {
  const constraints: QueryConstraint[] = [];

  if (filters.type && filters.type !== "All") {
    constraints.push(where("Type", "==", filters.type));
  }
  if (filters.region && filters.region !== "All") {
    constraints.push(where("Region", "==", filters.region));
  }
  if (filters.manager && filters.manager !== "All") {
    constraints.push(where("Manager", "==", filters.manager));
  }
  if (filters.product && filters.product !== "All") {
    constraints.push(where("Product", "==", filters.product));
  }

  const q = query(collection(db, collectionName), ...constraints);

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    callback(data);
  });
};
