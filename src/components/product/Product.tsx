import { useEffect, useMemo } from "react";
import { Button, Input } from "reactstrap";
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
import "./Product.css";

export interface IProduct {
  id: string;
  name: string;
}

export const Product = () => {
  const [rowData, setRowData] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(setRowData);
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await addProduct(name);
    setIsLoading(false);
    setName("");
  };

  const handleDelete = async (data: IProduct) => {
    try {
      await deleteProduct(data.id);
    } catch {
      toast.error("Product is used in other collections!");
    }
  };

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
      await updateProduct(data.id, { name: trimmedValue });
    } catch {
      toast.error("Failed to update name");
      node.setDataValue("name", oldValue);
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
        headerName: "Actions",
        width: 80,
        resizable: false,
        headerClass: "products-header-cell",
        cellClass: "products-cell",
        cellRenderer: (p: any) => (
          <button
            onClick={() => handleDelete(p.data)}
            className="products-button"
          >
            <i className="bi bi-trash" style={{ color: "red" }}></i>
          </button>
        ),
      },
    ],
    [],
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
          <Button
            disabled={isLoading || !name}
            type="submit"
            color="primary"
            onClick={(e) => handleAdd(e)}
          >
            Add
          </Button>
        </form>
      </div>
      <AgGridReact<IProduct>
        rowData={rowData}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};
