import { useState, useEffect, useMemo } from "react";
import { Button, Input } from "reactstrap";
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
}

export const Manager = () => {
  const [rowData, setRowData] = useState<IManager[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToManagers(setRowData);
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    await addManager(name)
    setName("");
  }

  const handleDelete = async (data: IManager) => {
    try {
      await deleteManager(data.id);
    } catch {
      toast.error("Manager is used in other collections!");
    }
  };

  const onCellValueChanged = async (event: CellValueChangedEvent) => {
    const { data, oldValue, newValue, node } = event;
    if (oldValue === newValue) return;

    const trimmedValue = newValue?.trim() || "";

    if (trimmedValue === "") {
      toast.error("Name cannot be empty!");
      node.setDataValue("name", oldValue);
      return;
    }

    try {
      await updateManager(data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const columnDefs = useMemo<ColDef<IManager>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        editable: true,
        sortable: true,
        unSortIcon: true,
        resizable: false,
      },
      {
        headerName: "Actions",
        width: 80,
        resizable: false,
        headerClass: "managers-header-cell",
        cellClass: "managers-cell",
        cellRenderer: (p: any) => (
          <button onClick={() => handleDelete(p.data)} className="managers-button">
            <i className="bi bi-trash" style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="managers-wrapper">
      <h2 className="managers-title">Managers</h2>
      <div className="managers-header">
        <div>
          <Input
              type="search"
              placeholder="Search by name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="managers-add">
          <Input
              type="text"
              placeholder="Type name"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <Button color="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
      <AgGridReact<IManager>
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};
