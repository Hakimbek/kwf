import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import type { DataType } from "../../../type/import.ts";
import { clearCollection } from "../../../firebase/clear.ts";
import { uploadLargeArray } from "../../../firebase/upload.ts";

export const importFile = (file: File | undefined, storage: string) => {
  if (!file) {
    toast.error("Файл не выбран");
    return;
  }

  if (!/\.(xls|xlsx)$/i.test(file.name)) {
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

    const json: DataType[] = XLSX.utils.sheet_to_json(worksheet, {
      defval: null,
    });

    toast.success("Успешно");
    await clearCollection(storage);
    await uploadLargeArray(json, storage);
  };

  reader.readAsArrayBuffer(file);
};
