import { memo } from "react";
import * as XLSX from "xlsx";
import type { CollectionType } from "../../type/collection.ts";
import { importFile } from "./utils/import.ts";
import cptable from "codepage";
import "./Import.css";

XLSX.set_cptable(cptable);

type ImportPropsType = {
  collection: CollectionType;
};

const Import = ({ collection }: ImportPropsType) => {
  return (
    <div>
      <input
        id={collection}
        name="file"
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => importFile(e.target.files?.[0], collection)}
        hidden
      />
      <label htmlFor={collection} className="import-label">
        Import {collection.toUpperCase()}
      </label>
    </div>
  );
};

export default memo(Import);
