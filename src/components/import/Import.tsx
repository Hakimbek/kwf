import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useRef, memo } from "react";
import * as XLSX from "xlsx";
import type { StorageType } from "../../utils/type.ts";
import cptable from "codepage";
XLSX.set_cptable(cptable);
import { db } from "../../firebaseConfig.ts";
import { collection, writeBatch, doc, getDocs } from "firebase/firestore";
import "./Import.css";

type ExcelRow = Record<string, string | number | boolean | null>;

type ImportPropsType = {
  storage: StorageType;
};

const Import = ({ storage }: ImportPropsType) => {
  const [data, setData] = useLocalStorage("data", {});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadLargeArray = async (dataArray: ExcelRow[], collectionName: string) => {
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

  const clearCollection = async (collectionName: string) => {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    if (snapshot.size === 0) return;

    const batch = writeBatch(db);

    snapshot.docs.forEach((document) => {
      batch.delete(doc(db, collectionName, document.id));
    });

    await batch.commit();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) {
      toast.error("Файл не выбран");
      return;
    }

    if (!/\.(xls|xlsx)$/i.test(selectedFile.name)) {
      toast.error("Не верный тип файла");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      event.preventDefault();
      const buffer = event.target?.result as string;
      if (!buffer) {
        toast.error("Не верный контент файла");
        return;
      }

      const workbook = XLSX.read(buffer, { type: "array", codepage: 1251 });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const json: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });

      toast.success("Успешно");
      setData({ ...data, [storage]: json });
      await clearCollection(storage)
      await uploadLargeArray(json, storage)
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <form>
      <input
        id={storage}
        name="file"
        type="file"
        accept=".xls,.xlsx"
        ref={fileInputRef}
        onChange={handleImport}
        hidden
      />
      <label htmlFor={storage} className="import-label">
        Импорт {storage} (.xls)
      </label>
    </form>
  );
};

export default memo(Import);
