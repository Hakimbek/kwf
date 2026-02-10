import type { ColDef, ColDefField } from "ag-grid-community";
import styles from "../components/collections/Collection.module.css";

const baseColDef: ColDef = {
  sortable: true,
  unSortIcon: true,
  resizable: false,
};

export const createColumn = <T,>(
  field: ColDefField<T, any>,
  header: string,
  overrides: ColDef<T> = {},
): ColDef<T> => {
  return {
    ...baseColDef,
    field,
    headerName: header,
    flex: 1,
    ...overrides,
  } as ColDef<T>;
};

export const createDateColumn = <T,>(
  field: ColDefField<T, any>,
  header: string,
  overrides: ColDef<T> = {},
): ColDef<T> => {
  return {
    ...createColumn(field, header, overrides),
    flex: 0,
    valueFormatter: (params) => {
      if (!params.value) return "";
      const date =
        typeof params.value?.toDate === "function"
          ? params.value.toDate()
          : new Date(params.value);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  } as ColDef<T>;
};

export const createSelectColumn = <T,>(
  field: ColDefField<T, any>,
  header: string,
  data: { id: string; name: string }[],
  overrides: ColDef<T> = {},
): ColDef<T> => {
  return {
    ...createColumn(field, header, overrides),
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: data.map((d) => d.id),
    },
    refData: data.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.name,
      }),
      {},
    ),
  } as ColDef<T>;
};

export const createActionColumn = <T,>(
  onDelete: (data: T) => void,
  overrides: ColDef<T> = {},
): ColDef<T> => {
  return {
    headerName: "Actions",
    width: 80,
    resizable: false,
    sortable: false,
    filter: false,
    cellRenderer: (params: any) => (
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(params.data)}
      >
        <i className="bi bi-x-circle" style={{ color: "red" }}></i>
      </button>
    ),
    ...overrides,
  } as ColDef<T>;
};
