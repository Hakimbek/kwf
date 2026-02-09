import { useEffect, useMemo, useState } from "react";
import type { IPlan, ICompany } from "../../../type/type.ts";
import { CollectionHeader } from "../header/CollectionHeader.tsx";
import {
  PLAN_COLLECTION,
  COMPANY_COLLECTION,
  subscribeToCollection,
  updateDocument,
} from "../../../firebase/services.ts";
import { AgGridReact } from "ag-grid-react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import {
  createColumn,
  createDateColumn,
  createSelectColumn,
} from "../../../utils/columnFactory.tsx";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import { toast } from "react-toastify";
import styles from "../Collection.module.css";

export const Plan = () => {
  const [plan, setPlan] = useState<IPlan[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubPlan = subscribeToCollection(PLAN_COLLECTION, setPlan);
    const unsubCompany = subscribeToCollection(
      COMPANY_COLLECTION,
      setCompanies,
    );
    return () => {
      unsubPlan();
      unsubCompany();
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
      await updateDocument(PLAN_COLLECTION, data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
    }
  };

  const columnDefs = useMemo<ColDef<IPlan>[]>(
    () => [
      createColumn("name", "Name", { editable: true }),
      createSelectColumn("companyId", "Company", companies, { editable: true }),
      createDateColumn("createdAt", "Created At"),
      createDateColumn("lastEditedAt", "Last Edited At"),
      {
        headerName: "Actions",
        width: 80,
        resizable: false,
        headerClass: styles.cellHeader,
        cellClass: styles.cell,
        cellRenderer: (p: any) => (
          <div className="d-flex gap-2">
            <button
              className={styles.deleteButton}
              onClick={() =>
                navigate(`version/${p?.data?.name}/${p?.data?.id}`)
              }
            >
              <i className="bi bi-arrow-up-right-circle text-primary"></i>
            </button>
            <button
              onClick={() => openDeleteModal(p.data)}
              className={styles.deleteButton}
            >
              <i className="bi bi-x-circle text-danger"></i>
            </button>
          </div>
        ),
      },
    ],
    [companies],
  );

  return (
    <div className={styles.wrapper}>
      <CollectionHeader
        collectionName={PLAN_COLLECTION}
        searchText={searchText}
        setSearchText={setSearchText}
        collections={companies}
      />
      <AgGridReact<IPlan>
        rowData={plan}
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
        collectionName={PLAN_COLLECTION}
      />
    </div>
  );
};
