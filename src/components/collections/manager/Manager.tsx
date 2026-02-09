import { useState, useEffect, useMemo } from "react";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  subscribeToCollection,
  updateDocument,
  COMPANY_COLLECTION,
  MANAGERS_COLLECTION,
} from "../../../firebase/services.ts";
import { toast } from "react-toastify";
import type { CellValueChangedEvent } from "ag-grid-community";
import type { IManager, ICompany } from "../../../type/type.ts";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import { CollectionHeader } from "../header/CollectionHeader.tsx";
import {
  createActionColumn,
  createColumn,
  createDateColumn,
  createSelectColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";

export const Manager = () => {
  const [managers, setManagers] = useState<IManager[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubManagers = subscribeToCollection(
      MANAGERS_COLLECTION,
      setManagers,
    );
    const unsubCompanies = subscribeToCollection(
      COMPANY_COLLECTION,
      setCompanies,
    );
    return () => {
      unsubManagers();
      unsubCompanies();
    };
  }, []);

  const toggle = () => setIsModalOpen(!isModalOpen);

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
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
      await updateDocument(MANAGERS_COLLECTION, data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
    }
  };

  const columnDefs = useMemo<ColDef<IManager>[]>(
    () => [
      createColumn("name", "Name", { editable: true }),
      createSelectColumn("companyId", "Company", companies, { editable: true }),
      createDateColumn("createdAt", "Created At"),
      createDateColumn("lastEditedAt", "Last Edited At"),
      createActionColumn<IManager>((data) => openDeleteModal(data)),
    ],
    [companies],
  );

  return (
    <div className={styles.wrapper}>
      <CollectionHeader
        collectionName={MANAGERS_COLLECTION}
        searchText={searchText}
        setSearchText={setSearchText}
        collections={companies}
      />
      <AgGridReact<IManager>
        rowData={managers}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
      <DeleteModal
        toggle={toggle}
        isModalOpen={isModalOpen}
        selectedDataName={selectedData?.name}
        selectedDataId={selectedData?.id}
        collectionName={MANAGERS_COLLECTION}
      />
    </div>
  );
};
