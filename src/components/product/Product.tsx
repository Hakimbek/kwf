import { useEffect, useMemo } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useState } from "react";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { toast } from "react-toastify";
import {
  updateProduct,
  addProduct,
  subscribeToProducts,
  deleteProduct,
} from "./utils/productService.ts";
import type { ICompany } from "../company/Company.tsx";
import { subscribeToCompany } from "../company/utils/companyService.ts";
import "./Product.css";

export interface IProduct {
  id: string;
  name: string;
  companyId: string;
}

export const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubProducts = subscribeToProducts(setProducts);
    const unsubCompanies = subscribeToCompany(setCompanies);
    return () => {
      unsubProducts();
      unsubCompanies();
    };
  }, []);

  const toggle = () => setIsModalOpen(!isModalOpen);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name || !selectedCompanyId) return;
    setIsLoading(true);
    await addProduct(name, selectedCompanyId);
    setIsLoading(false);
    setName("");
    setSelectedCompanyId("");
  };

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
  };

  const handleDelete = async (data: IProduct) => {
    try {
      await deleteProduct(data.id);
      toggle();
    } catch {
      toast.error("Product is used in other collections!");
    }
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
      await updateProduct(data.id, {
        [colDef.field!]: newValue,
      });
    } catch (error) {
      toast.error("Failed to update manager");
    }
  };

  const columnDefs = useMemo<ColDef<IProduct>[]>(
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
        field: "companyId",
        headerName: "Company",
        flex: 1,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: companies.map(({ id }) => id),
        },
        refData: companies.reduce(
          (acc, curr) => {
            acc[curr.id] = curr.name;
            return acc;
          },
          {} as Record<string, string>,
        ),
        editable: true,
        sortable: true,
        unSortIcon: true,
        resizable: false,
      },
      {
        headerName: "Actions",
        width: 80,
        resizable: false,
        headerClass: "products-header-cell",
        cellClass: "products-cell",
        cellRenderer: (p: any) => (
          <button
            onClick={() => openDeleteModal(p.data)}
            className="products-button"
          >
            <i className="bi bi-x-circle" style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [companies],
  );

  return (
    <div className="products-wrapper">
      <h2 className="products-title">Products</h2>
      <div className="products-header">
        <div>
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <form className="products-add">
          <Input
            type="text"
            placeholder="Type product name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="select"
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <option value="" hidden>Select company name...</option>
            {companies.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Input>
          <Button
            disabled={isLoading || !name || !selectedCompanyId}
            type="submit"
            color="primary"
            onClick={(e) => handleAdd(e)}
          >
            Add
          </Button>
        </form>
      </div>
      <AgGridReact<IProduct>
        rowData={products}
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
