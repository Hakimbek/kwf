import { useParams, useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter.ts";
import { Button } from "reactstrap";
import { useEffect, useMemo, useState } from "react";
import {
  FACT_COLLECTION,
  MANAGERS_COLLECTION,
  PRODUCTS_COLLECTION,
  REGION_COLLECTION,
  CLIENT_COLLECTION,
  subscribeToCollection,
  updateDocument,
} from "../../../firebase/services.ts";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";
import type {
  IFact,
  IFactItem,
  IManager,
  IProduct,
  IRegion,
  IClient,
} from "../../../type/type.ts";
import { AgGridReact } from "ag-grid-react";
import { documentId, where } from "firebase/firestore";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { FactModal } from "../../modal/fact/FactModal.tsx";
import {
  createActionColumn,
  createColumn,
  createSelectColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";
import { toast } from "react-toastify";

export const FactItems = () => {
  const [fact, setFact] = useState<IFact[]>([]);
  const [factItems, setFactItems] = useState<IFactItem[]>([]);
  const [region, setRegion] = useState<IRegion[]>([]);
  const [managers, setManagers] = useState<IManager[]>([]);
  const [clients, setClient] = useState<IClient[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isFactModalOpen, setIsFactModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const {
    year,
    month = "",
    id,
  } = useParams<{ year: string; month: string; id: string }>();

  useEffect(() => {
    if (!id) return;

    const unsubFactItems = subscribeToCollection(
      `${FACT_COLLECTION}/${id}/items`,
      setFactItems,
    );
    const unsubFact = subscribeToCollection(
      FACT_COLLECTION,
      setFact,
      where(documentId(), "==", id),
    );
    const unsubRegion = subscribeToCollection(REGION_COLLECTION, setRegion);
    const unsubClient = subscribeToCollection(CLIENT_COLLECTION, setClient);
    const unsubManagers = subscribeToCollection(
      MANAGERS_COLLECTION,
      setManagers,
    );
    const unsubProducts = subscribeToCollection(
      PRODUCTS_COLLECTION,
      setProducts,
    );
    return () => {
      unsubFactItems();
      unsubRegion();
      unsubManagers();
      unsubProducts();
      unsubClient();
      unsubFact();
    };
  }, [id]);

  const toggleFactModal = () => setIsFactModalOpen(!isFactModalOpen);
  const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggleDeleteModal();
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

  const itemColumnDefs = useMemo<ColDef<IFactItem>[]>(
    () => [
      createSelectColumn("regionId", "Region", region, {
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
        managers.filter(({ companyId }) => companyId === fact[0]?.companyId),
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
        products.filter(({ companyId }) => companyId === fact[0]?.companyId),
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
      createSelectColumn("clientId", "Client", clients, {
        editable: true,
        filter: true,
        filterValueGetter: (params) => {
          const selected = clients.find(
            (p) => p.id === params.data?.clientId,
          );
          return selected ? selected.name : "";
        },
      }),
      createColumn("amount", "Amount", {
        editable: true,
        filter: "agNumberColumnFilter",
      }),
      createColumn("margin", "Margin", {
        editable: true,
        filter: "agNumberColumnFilter",
      }),
      createActionColumn<IFactItem>((data) => openDeleteModal(data)),
    ],
    [region, managers, products, fact],
  );

  const onCellValueChanged = async (event: CellValueChangedEvent) => {
    const { data, colDef, newValue, oldValue } = event;
    const path = `${FACT_COLLECTION}/${id}/items`;

    if (oldValue === newValue) return;

    try {
      await updateDocument(path, data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
    }
  };

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
          <h2 className={styles.title}>
            {year} {capitalizeFirstLetter(month)}
          </h2>
          <div>
            <span>Total Amount: </span>
            <span>{totalAmount.toLocaleString()}</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Button onClick={() => navigate("/fact")}>
            <i className="bi bi-arrow-left"></i>
          </Button>
          <Button
            className={styles.addButton}
            color="primary"
            onClick={toggleFactModal}
          >
            <i className="bi bi-plus-lg"></i>
          </Button>
        </div>
      </div>
      <AgGridReact<IFactItem>
        rowData={factItems}
        columnDefs={itemColumnDefs}
        defaultColDef={defaultColDef}
        onCellValueChanged={onCellValueChanged}
        onModelUpdated={onModelUpdated}
        stopEditingWhenCellsLoseFocus={true}
      />
      <FactModal
        isModalOpen={isFactModalOpen}
        toggle={toggleFactModal}
        selectedCompanyId={fact[0]?.companyId}
      />
      <DeleteModal
        toggle={toggleDeleteModal}
        isModalOpen={isDeleteModalOpen}
        selectedDataName={selectedData?.year + " " + selectedData?.month}
        selectedDataId={selectedData?.id}
        collectionName={`${FACT_COLLECTION}/${id}/items`}
      />
    </div>
  );
};
