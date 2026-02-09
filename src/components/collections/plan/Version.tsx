import { useParams, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useEffect, useState, useMemo } from "react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { PlanModal } from "../../modal/plan/PlanModal.tsx";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import { AgGridReact } from "ag-grid-react";
import type {
  IPlanVersion,
  IRegion,
  IManager,
  IProduct,
  IPlan,
} from "../../../type/type.ts";
import {
  subscribeToCollection,
  PLAN_COLLECTION,
  REGION_COLLECTION,
  MANAGERS_COLLECTION,
  PRODUCTS_COLLECTION,
  updateDocument,
} from "../../../firebase/services.ts";
import {
  createColumn,
  createSelectColumn,
  createActionColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";
import { toast } from "react-toastify";
import { documentId, where } from "firebase/firestore";

export const Version = () => {
  const [plan, setPlan] = useState<IPlan[]>([]);
  const [version, setVersion] = useState<IPlanVersion[]>([]);
  const [region, setRegion] = useState<IRegion[]>([]);
  const [managers, setManagers] = useState<IManager[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { name, id } = useParams<{ name: string; id: string }>();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const path = `${PLAN_COLLECTION}/${id}/items`;

    const unsubVersion = subscribeToCollection(path, setVersion);
    const unsubPlan = subscribeToCollection(
      PLAN_COLLECTION,
      setPlan,
      where(documentId(), "==", id),
    );
    const unsubRegion = subscribeToCollection(REGION_COLLECTION, setRegion);
    const unsubManagers = subscribeToCollection(
      MANAGERS_COLLECTION,
      setManagers,
    );
    const unsubProducts = subscribeToCollection(
      PRODUCTS_COLLECTION,
      setProducts,
    );
    return () => {
      unsubVersion();
      unsubRegion();
      unsubManagers();
      unsubProducts();
      unsubPlan();
    };
  }, [id]);

  const togglePlanModal = () => setIsPlanModalOpen(!isPlanModalOpen);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggleDeleteModal();
  };

  const onCellValueChanged = async (event: CellValueChangedEvent) => {
    const { data, colDef, newValue, oldValue } = event;
    const path = `${PLAN_COLLECTION}/${id}/items`;

    if (oldValue === newValue) return;

    try {
      await updateDocument(path, data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
    }
  };

  const itemColumnDefs = useMemo<ColDef<IPlanVersion>[]>(
    () => [
      createSelectColumn("regionId", "Region", region, {
        editable: true,
      }),
      createSelectColumn(
        "managerId",
        "Manager",
        managers.filter(({ companyId }) => companyId === plan[0]?.companyId),
        {
          editable: true,
        },
      ),
      createSelectColumn(
        "productId",
        "Product",
        products.filter(({ companyId }) => companyId === plan[0]?.companyId),
        {
          editable: true,
        },
      ),
      createColumn("amount", "Amount", {
        editable: true,
      }),
      createActionColumn<IPlanVersion>((data) => openDeleteModal(data)),
    ],
    [region, managers, products],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button onClick={() => navigate("/plan")}>Back</Button>
        <h2 className={styles.title}>{name}</h2>
        <Button
          className={styles.addButton}
          color="primary"
          onClick={togglePlanModal}
        >
          Add
        </Button>
      </div>
      <AgGridReact<IPlanVersion>
        rowData={version}
        columnDefs={itemColumnDefs}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
      <PlanModal
        isModalOpen={isPlanModalOpen}
        toggle={togglePlanModal}
        selectedCompanyId={plan[0]?.companyId}
      />
      <DeleteModal
        toggle={toggleDeleteModal}
        isModalOpen={isDeleteModalOpen}
        selectedDataName={selectedData?.name}
        selectedDataId={selectedData?.id}
        collectionName={`${PLAN_COLLECTION}/${id}/items`}
      />
    </div>
  );
};
