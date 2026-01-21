import useLocalStorage from "use-local-storage"
import { Button, Input } from "reactstrap"
import { toast } from 'react-toastify'
import { useState, useRef } from "react"
import * as XLSX from "xlsx"

type ExcelRow = Record<string, string | number | boolean | null>;

export const Import = () => {
  const [file, setFile] = useState<File | null>(null);
  const [, setRawData] = useLocalStorage("rawData", "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleImport = () => {
    if (!file) {
      toast.error('Файл не выбран');
      return;
    }

    if (!/\.(xls|xlsx)$/i.test(file.name)) {
      toast.error('Не верный тип файла');
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const buffer = event.target?.result;
      if (!buffer) {
        toast.error('Не верный контент файла');
        return;
      }

      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const json: ExcelRow[] = XLSX.utils.sheet_to_json(worksheet, {
        defval: null,
      });
      console.log(json);
      toast.success('Успешно');
      setRawData(JSON.stringify(json));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <form className="col-6 d-flex gap-2 align-items-center">
      <Input
        id="excelFile"
        name="file"
        type="file"
        accept=".xls,.xlsx"
        innerRef={fileInputRef}
        onChange={handleFileChange}
      />
      <Button disabled={!file} color="primary" onClick={handleImport}>Импортировать</Button>
    </form>
  )
}