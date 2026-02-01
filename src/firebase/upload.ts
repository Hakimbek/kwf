import { collection, doc, writeBatch } from "firebase/firestore";
import type { ExcelRow } from "../components/import/Import.tsx";
import { db } from "./firebaseConfig.ts";

export const uploadLargeArray = async (
  dataArray: ExcelRow[],
  collectionName: string,
) => {
  const chunkSize = 500;

  for (let i = 0; i < dataArray.length; i += chunkSize) {
    const chunk = dataArray.slice(i, i + chunkSize);
    const batch = writeBatch(db);

    chunk.forEach((row) => {
      const docRef = doc(collection(db, collectionName));

      const formattedRow = {
        ...row,
        Fact_Kun: Number(row.Fact_Kun || 0),
        Plan_Oy: Number(row.Plan_Oy || 0),
        Plan_Kun: Number(row.Plan_Kun || 0),
      };

      batch.set(docRef, formattedRow);
    });

    await batch.commit();
  }
};
