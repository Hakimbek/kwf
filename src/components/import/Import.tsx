import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useRef } from "react";
import * as XLSX from "xlsx";
import cptable from "codepage";
XLSX.set_cptable(cptable);
import "./Import.css";

type ExcelRow = Record<string, string | number | boolean | null>;

type ImportPropsType = {
  type: "kwfData" | "mpData";
};

export const Import = ({ type }: ImportPropsType) => {
  const [, setData] = useLocalStorage(type, "");
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

    reader.onload = (event) => {
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
      setData(JSON.stringify(json));
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <form className="import-form">
      <input
        id="excelFile"
        name="file"
        type="file"
        accept=".xls,.xlsx"
        ref={fileInputRef}
        onChange={handleImport}
        hidden
      />
      <label htmlFor="excelFile" className="import-label">
        Выберите файл
      </label>
    </form>
  );
};
