import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useRef, memo } from "react";
import * as XLSX from "xlsx";
import type { StorageType } from "../../utils/type.ts";
import { uploadLargeArray } from "../../firebase/upload.ts";
import { clearCollection } from "../../firebase/clear.ts";
import cptable from "codepage";
XLSX.set_cptable(cptable);
import "./Import.css";

export type ExcelRow = Record<string, string | number | boolean | null>;

type ImportPropsType = {
  storage: StorageType;
};

const Import = ({ storage }: ImportPropsType) => {
  const [data, setData] = useLocalStorage("data", {});
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      await clearCollection(storage);
      await uploadLargeArray(json, storage);
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
