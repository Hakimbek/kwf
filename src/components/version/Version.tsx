import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useEffect, useMemo, useState } from "react";
import { addVersion, deleteVersion, subscribeToVersion, updateVersion } from "./utils/versionService.ts";
import { AgGridReact } from "ag-grid-react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import type { ICompany } from "../company/Company.tsx";
import "./Version.css";

export interface IVersion {
  id: string;
  name: string;
}

export const Version = () => {
  const [rowData, setRowData] = useState<IVersion[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToVersion(setRowData);
    return () => unsubscribe();
  }, []);

  const toggle = () => setIsModalOpen(!isModalOpen);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) return;
    setIsLoading(true);
    await addVersion(name);
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
      await updateVersion(data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
  };

  const handleDelete = async (data: ICompany) => {
    try {
      await deleteVersion(data.id);
      toggle();
    } catch {
      toast.error("Version is used in other collections!");
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
        headerClass: "version-header-cell",
        cellClass: "version-cell",
        cellRenderer: (p: any) => (
          <button
            onClick={() => openDeleteModal(p.data)}
            className="version-button"
          >
            <i className="bi bi-x-circle" style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="version-wrapper">
      <h2 className="version-title">Version</h2>
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
      <AgGridReact<IVersion>
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete {selectedData?.name}</ModalHeader>
        <ModalBody>Are you sure you want to delete this record?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(selectedData)}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
