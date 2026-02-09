import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ICompany } from "../../../type/type.ts";
import {
  subscribeToCollection,
  updateDocument,
  COMPANY_COLLECTION,
  PRODUCTS_COLLECTION,
  MANAGERS_COLLECTION,
} from "../../../firebase/services.ts";
import {
  createColumn,
  createDateColumn,
  createActionColumn,
} from "../../../utils/columnFactory.tsx";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { CollectionHeader } from "../header/CollectionHeader.tsx";
import { toast } from "react-toastify";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import styles from "../Collection.module.css";

export const Company = () => {
  const [rowData, setRowData] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(COMPANY_COLLECTION, setRowData);
    return () => unsubscribe();
  }, []);

  const toggle = () => setIsModalOpen(!isModalOpen);

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
      await updateDocument(COMPANY_COLLECTION, data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
  };

  const columnDefs = useMemo<ColDef<ICompany>[]>(
    () => [
      createColumn("name", "Name", { editable: true }),
      createDateColumn("createdAt", "Created At"),
      createDateColumn("lastEditedAt", "Last Edited At"),
      createActionColumn<ICompany>((data) => openDeleteModal(data)),
    ],
    [],
  );

  return (
    <div className={styles.wrapper}>
      <CollectionHeader
        collectionName={COMPANY_COLLECTION}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <AgGridReact<ICompany>
        rowData={rowData}
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
        collectionName={COMPANY_COLLECTION}
        restrictedCollections={[PRODUCTS_COLLECTION, MANAGERS_COLLECTION]}
        foreignKey="companyId"
      />
    </div>
  );
};
