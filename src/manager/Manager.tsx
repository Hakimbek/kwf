import { useState, useEffect, useMemo } from "react";
import { Input } from "reactstrap";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  subscribeToManagers,
  addManager,
  deleteManager,
  updateManager,
} from "./utils/managerService.ts";
import { toast } from "react-toastify";
import type { CellValueChangedEvent } from "ag-grid-community";
import "./Manager.css";

export interface IManager {
  id: string;
  name: string;
  isActive: boolean;
  isAddButton?: boolean;
}

export const Manager = () => {
  const [rowData, setRowData] = useState<IManager[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToManagers(setRowData);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (data: IManager) => {
    try {
      await deleteManager(data.id);
    } catch {
      toast.error("Manager is used in other collections!");
    }
  };

  const onCellValueChanged = async (event: CellValueChangedEvent) => {
    const { data, oldValue, newValue, node } = event;
    if (oldValue === newValue || data.isAddButton) return;

    const trimmedValue = newValue?.trim() || "";

    if (trimmedValue !== "") {
      const isDup = rowData.some(
        (m) =>
          m.id !== data.id &&
          m.name.toLowerCase() === trimmedValue.toLowerCase(),
      );
      if (isDup) {
        toast.error(`The name "${trimmedValue}" is already taken!`);
        node.setDataValue("name", oldValue);
        return;
      }
    }

    await updateManager(data.id, { name: trimmedValue });
  };

  const columnDefs = useMemo<ColDef<IManager>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        editable: (p) => !p.data?.isAddButton,
        sortable: true,
        unSortIcon: true,
        resizable: false,
        cellRenderer: (p: any) => p.data.isAddButton ?
            <div onClick={() => addManager()} style={{ color: '#16a34a', fontWeight: 'bold', cursor: 'pointer' }}>+ Add Manager</div> :
            p.value || <span style={{ color: '#aaa' }}>Enter Name...</span>
      },
      {
        field: "isActive",
        headerName: "Active",
        editable: (p) => !p.data?.isAddButton,
        sortable: true,
        unSortIcon: true,
        resizable: false,
        cellRenderer: "agCheckboxCellRenderer",
        cellEditor: "agCheckboxCellEditor",
        width: 120,
      },
      {
        headerName: "Actions",
        width: 80,
        resizable: false,
        headerClass: 'right-header',
        cellClass: 'vertical-border right-cell',
        cellRenderer: (p: any) => p.data.isAddButton ? null :
            <button onClick={() => handleDelete(p.data)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
      }
    ],
    [],
  );

  return (
    <div className="managers-wrapper">
      <div className="managers-header">
        <h2 className="managers-title">Managers</h2>
        <Input
          className="managers-search"
          type="search"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <AgGridReact<IManager>
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        pinnedBottomRowData={[{ isAddButton: true } as any]}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};
