import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "./Import.css";

type ExcelRow = Record<string, string | number | boolean | null>;

export const Import = () => {
  const [file, setFile] = useState<File | null>(null);
  const [, setRawData] = useLocalStorage("rawData", "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleImport = () => {
    if (!file) {
      toast.error("Файл не выбран");
      return;
    }

    if (!/\.(xls|xlsx)$/i.test(file.name)) {
      toast.error("Не верный тип файла");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      event.preventDefault();
      const buffer = event.target?.result;
      if (!buffer) {
        toast.error("Не верный контент файла");
        return;
      }

      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const json: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });

      toast.success("Успешно");
      setRawData(JSON.stringify(json));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <form className="import-form">
      <input
        id="excelFile"
        name="file"
        type="file"
        accept=".xls,.xlsx"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="import-input"
      />
      <button type="button" disabled={!file} className="import-button" onClick={handleImport}>
        Импортировать
      </button>
    </form>
  );
};
