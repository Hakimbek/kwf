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
import { subscribeToCompany } from "../company/utils/companyService.ts";
import { toast } from "react-toastify";
import type { CellValueChangedEvent } from "ag-grid-community";
import type { ICompany } from "../company/Company.tsx";
import "./Manager.css";

export interface IManager {
  id: string;
  name: string;
  companyId: string;
}

export const Manager = () => {
  const [managers, setManagers] = useState<IManager[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubManagers = subscribeToManagers(setManagers);
    const unsubCompanies = subscribeToCompany(setCompanies);
    return () => {
      unsubManagers();
      unsubCompanies();
    };
  }, []);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name || !selectedCompanyId) return;
    setIsLoading(true);
    await addManager(name, selectedCompanyId);
    setIsLoading(false);
    setName("");
    setSelectedCompanyId("");
  };

  const handleDelete = async (data: IManager) => {
    try {
      await deleteManager(data.id);
    } catch {
      toast.error("Manager is used in other collections!");
    }
  };

  const onCellValueChanged = async (event: CellValueChangedEvent) => {
    const { data, colDef, newValue, oldValue, node } = event;
    if (oldValue === newValue) return;

    const trimmedValue = newValue?.trim() || "";

    if (trimmedValue === "" && colDef.field === "name") {
      toast.error("Name cannot be empty!");
      node.setDataValue("name", oldValue);
      return;
    }

    try {
      await updateManager(data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
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
        field: "companyId",
        headerName: "Company",
        flex: 1,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: companies.map(({ id }) => id),
        },
        refData: companies.reduce(
          (acc, curr) => {
            acc[curr.id] = curr.name;
            return acc;
          },
          {} as Record<string, string>,
        ),
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
          <button
            onClick={() => handleDelete(p.data)}
            className="managers-button"
          >
            <i className="bi bi-x-circle  " style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [companies],
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
        <form className="managers-add">
          <Input
            type="text"
            placeholder="Type manager name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="select"
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <option value="">Select company name...</option>
            {companies.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
          <Button
            disabled={isLoading || !name || !selectedCompanyId}
            type="submit"
            color="primary"
            onClick={(e) => handleAdd(e)}
          >
            Add
          </Button>
        </form>
      </div>
      <AgGridReact<IManager>
        rowData={managers}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};
