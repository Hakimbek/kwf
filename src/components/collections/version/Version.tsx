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
import { toast } from "react-toastify";
import { documentId, where } from "firebase/firestore";
import styles from "../Collection.module.css";

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
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const unsubVersion = subscribeToCollection(
      `${PLAN_COLLECTION}/${id}/items`,
      setVersion,
    );
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

  const onModelUpdated = (event: any) => {
    const api = event.api;
    let sum = 0;

    api.forEachNodeAfterFilter((node: any) => {
      if (node.data && node.data.amount) {
        const amt = parseFloat(node.data.amount);
        if (!isNaN(amt)) {
          sum += amt;
        }
      }
    });

    setTotalAmount(sum);
  };

  const itemColumnDefs = useMemo<ColDef<IPlanVersion>[]>(
    () => [
      createSelectColumn("regionId", "RegionSales", region, {
        editable: true,
        filter: true,
        filterValueGetter: (params) => {
          const selected = region.find((r) => r.id === params.data?.regionId);
          return selected ? selected.name : "";
        },
      }),
      createSelectColumn(
        "managerId",
        "Manager",
        managers.filter(({ companyId }) => companyId === plan[0]?.companyId),
        {
          editable: true,
          filter: true,
          filterValueGetter: (params) => {
            const selected = managers.find(
              (m) => m.id === params.data?.managerId,
            );
            return selected ? selected.name : "";
          },
        },
      ),
      createSelectColumn(
        "productId",
        "Product",
        products.filter(({ companyId }) => companyId === plan[0]?.companyId),
        {
          editable: true,
          filter: true,
          filterValueGetter: (params) => {
            const selected = products.find(
              (p) => p.id === params.data?.productId,
            );
            return selected ? selected.name : "";
          },
        },
      ),
      createColumn("amount", "Amount", {
        editable: true,
        filter: "agNumberColumnFilter",
      }),
      createActionColumn<IPlanVersion>((data) => openDeleteModal(data)),
    ],
    [region, managers, products, plan],
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
      floatingFilter: true,
      sortable: true,
    }),
    [],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{name}</h2>
          <div>
            <span>Total Amount: </span>
            <span>{totalAmount.toLocaleString()}</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button onClick={() => navigate("/plan")}>
            <i className="bi bi-arrow-left"></i>
          </Button>
          <Button
            className={styles.addButton}
            color="primary"
            onClick={togglePlanModal}
          >
            <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
      </div>
      <AgGridReact<IPlanVersion>
        rowData={version}
        columnDefs={itemColumnDefs}
        defaultColDef={defaultColDef}
        onCellValueChanged={onCellValueChanged}
        onModelUpdated={onModelUpdated}
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
