import { Button, Input } from "reactstrap";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  addCompany,
  subscribeToCompany,
  updateCompany,
  deleteCompany,
} from "./utils/companyService.ts";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import "./Company.css";

export interface ICompany {
  id: string;
  name: string;
}

export const Company = () => {
  const [rowData, setRowData] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCompany(setRowData);
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) return;
    setIsLoading(true);
    await addCompany(name);
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
      await updateCompany(data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const handleDelete = async (data: ICompany) => {
    try {
      await deleteCompany(data.id);
    } catch {
      toast.error("Company is used in other collections!");
    }
  };

  const columnDefs = useMemo<ColDef<ICompany>[]>(
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
        headerClass: "company-header-cell",
        cellClass: "company-cell",
        cellRenderer: (p: any) => (
          <button
            onClick={() => handleDelete(p.data)}
            className="company-button"
          >
            <i className="bi bi-trash" style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="company-wrapper">
      <h2 className="company-title">Company</h2>
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
      <AgGridReact<ICompany>
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};
