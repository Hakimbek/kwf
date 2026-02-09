import { useEffect, useMemo } from "react";
import { useState } from "react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import type { IProduct, ICompany } from "../../../type/type.ts";
import {
  updateDocument,
  subscribeToCollection,
  COMPANY_COLLECTION,
  PRODUCTS_COLLECTION,
} from "../../../firebase/services.ts";
import { CollectionHeader } from "../header/CollectionHeader.tsx";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import {
  createActionColumn,
  createColumn,
  createDateColumn,
  createSelectColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";

export const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubProducts = subscribeToCollection(
      PRODUCTS_COLLECTION,
      setProducts,
    );
    const unsubCompanies = subscribeToCollection(
      COMPANY_COLLECTION,
      setCompanies,
    );
    return () => {
      unsubProducts();
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
      await updateDocument(PRODUCTS_COLLECTION, data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
    }
  };

  const columnDefs = useMemo<ColDef<IProduct>[]>(
    () => [
      createColumn("name", "Name", { editable: true }),
      createSelectColumn("companyId", "Company", companies, { editable: true }),
      createDateColumn("createdAt", "Created At"),
      createDateColumn("lastEditedAt", "Last Edited At"),
      createActionColumn<IProduct>((data) => openDeleteModal(data)),
    ],
    [companies],
  );

  return (
    <div className={styles.wrapper}>
      <CollectionHeader
        collectionName={PRODUCTS_COLLECTION}
        searchText={searchText}
        setSearchText={setSearchText}
        collections={companies}
      />
      <AgGridReact<IProduct>
        rowData={products}
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
        collectionName={PRODUCTS_COLLECTION}
      />
    </div>
  );
};
