import { Button, Input } from "reactstrap";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import {
  addRegion,
  subscribeToRegion,
  deleteRegion,
  updateRegion,
} from "./utils/regionService.ts";
import "./Region.css";

export interface IRegion {
  id: string;
  name: string;
}

export const Region = () => {
  const [rowData, setRowData] = useState<IRegion[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToRegion(setRowData);
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) return;
    setIsLoading(true);
    await addRegion(name);
    setIsLoading(false);
    setName("");
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
      await updateRegion(data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const handleDelete = async (data: IRegion) => {
    try {
      await deleteRegion(data.id);
    } catch {
      toast.error("Region is used in other collections!");
    }
  };

  const columnDefs = useMemo<ColDef<IRegion>[]>(
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
        headerClass: "region-header-cell",
        cellClass: "region-cell",
        cellRenderer: (p: any) => (
          <button
            onClick={() => handleDelete(p.data)}
            className="region-button"
          >
            <i className="bi bi-x-circle" style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="region-wrapper">
      <h2 className="region-title">Regions</h2>
      <div className="company-header">
        <div>
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <form className="company-add">
          <Input
            type="text"
            placeholder="Type company name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            disabled={isLoading || !name}
            type="submit"
            color="primary"
            onClick={(e) => handleAdd(e)}
          >
            Add
          </Button>
        </form>
      </div>
      <AgGridReact<IRegion>
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};
