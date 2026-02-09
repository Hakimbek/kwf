import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import type { IClient } from "../../../type/type.ts";
import {
  CLIENT_COLLECTION,
  subscribeToCollection,
  updateDocument,
} from "../../../firebase/services.ts";
import { CollectionHeader } from "../header/CollectionHeader.tsx";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import {
  createActionColumn,
  createColumn,
  createDateColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";

export const Client = () => {
  const [rowData, setRowData] = useState<IClient[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(CLIENT_COLLECTION, setRowData);
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
      await updateDocument(CLIENT_COLLECTION, data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
  };

  const columnDefs = useMemo<ColDef<IClient>[]>(
    () => [
      createColumn("name", "Name", { editable: true }),
      createDateColumn("createdAt", "Created At"),
      createDateColumn("lastEditedAt", "Last Edited At"),
      createActionColumn<IClient>((data) => openDeleteModal(data)),
    ],
    [],
  );

  return (
    <div className={styles.wrapper}>
      <CollectionHeader
        collectionName={CLIENT_COLLECTION}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <AgGridReact<IClient>
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
        collectionName={CLIENT_COLLECTION}
      />
    </div>
  );
};
