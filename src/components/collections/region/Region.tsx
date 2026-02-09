import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { toast } from "react-toastify";
import { REGION_COLLECTION } from "../../../firebase/services.ts";
import type { IRegion } from "../../../type/type.ts";
import { CollectionHeader } from "../header/CollectionHeader.tsx";
import {
  subscribeToCollection,
  updateDocument,
} from "../../../firebase/services.ts";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import {
  createActionColumn,
  createColumn,
  createDateColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";

export const Region = () => {
  const [rowData, setRowData] = useState<IRegion[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(REGION_COLLECTION, setRowData);
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
      await updateDocument(REGION_COLLECTION, data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
    }
  };

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
  };

  const columnDefs = useMemo<ColDef<IRegion>[]>(
    () => [
      createColumn("name", "Name", { editable: true }),
      createDateColumn("createdAt", "Created At"),
      createDateColumn("lastEditedAt", "Last Edited At"),
      createActionColumn<IRegion>((data) => openDeleteModal(data)),
    ],
    [],
  );

  return (
    <div className={styles.wrapper}>
      <CollectionHeader
        collectionName={REGION_COLLECTION}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <AgGridReact<IRegion>
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
        collectionName={REGION_COLLECTION}
      />
    </div>
  );
};
