import { useState, useEffect, useMemo } from "react";
import {
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import type { CellValueChangedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { db } from "../firebase/firebaseConfig.ts";
import "./Manager.css";

interface IManager {
  id: string;
  name: string;
  isActive: boolean;
}

const MANAGERS_COLLECTION_NAME = "managers";

export const Manager = () => {
  const [rowData, setRowData] = useState<IManager[]>([]);
  const [newName, setNewName] = useState("");
  const [selectedRows, setSelectedRows] = useState<IManager[]>([]);
  const [searchText, setSearchText] = useState("");

  const managersRef = collection(db, MANAGERS_COLLECTION_NAME);

  useEffect(() => {
    const unsubscribe = onSnapshot(managersRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        isActive: doc.data().isActive,
      })) as IManager[];
      setRowData(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async () => {
    const trimmedName = newName.trim();

    if (!trimmedName) return;

    // Check if name already exists in our local state
    const isDuplicate = rowData.some(
      (m) => m.name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (isDuplicate) {
      alert("This manager name already exists!");
      return;
    }

    await addDoc(managersRef, {
      name: trimmedName,
      isActive: true,
      sortOrder: rowData.length,
    });

    setNewName("");
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, MANAGERS_COLLECTION_NAME, id));
  };

  const handleBatchDelete = async () => {
    if (selectedRows.length === 0) return;

    const batch = writeBatch(db);
    let deletedCount = 0;
    let blockedManagers: string[] = [];

    for (const manager of selectedRows) {
      // 1. Check if manager is used in the 'financials' collection
      const usageQuery = query(
        collection(db, "financials"),
        where("managerId", "==", manager.id),
      );
      const usageSnap = await getDocs(usageQuery);

      if (usageSnap.empty) {
        // 2. Safe to delete
        batch.delete(doc(db, "managers", manager.id));
        deletedCount++;
      } else {
        // 3. Blocked! Record the name to tell the user
        blockedManagers.push(manager.name);
      }
    }

    await batch.commit();

    if (blockedManagers.length > 0) {
      alert(
        `Deleted ${deletedCount} managers. The following could not be deleted because they have active data: ${blockedManagers.join(", ")}`,
      );
    } else {
      alert(`Successfully deleted ${deletedCount} managers.`);
    }
  };

  const onCellValueChanged = async (event: CellValueChangedEvent<IManager>) => {
    const { data, oldValue, newValue, node } = event;
    if (!data || oldValue === newValue) return;

    // Check if the NEW name is used by ANY OTHER row
    const isDuplicate = rowData.some(
      (m) =>
        m.id !== data.id && m.name.toLowerCase() === newValue.toLowerCase(),
    );

    if (isDuplicate) {
      alert("Name must be unique!");
      // Roll back the change in the grid UI
      node.setDataValue("name", oldValue);
      return;
    }

    // If unique, proceed to update Firestore
    const docRef = doc(db, "managers", data.id);
    await updateDoc(docRef, { name: newValue });
  };

  const columnDefs = useMemo<ColDef<IManager>[]>(
    () => [
      {
        headerName: "",
        width: 80,
        pinned: "left",
        lockPosition: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        suppressMenu: true,
        resizable: false,
      },
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        unSortIcon: true,
        resizable: false,
        editable: true,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "Active",
        sortable: true,
        unSortIcon: true,
        pinned: "right",
        editable: true,
        resizable: false,
        cellRenderer: "agCheckboxCellRenderer",
        cellEditor: "agCheckboxCellEditor",
        width: 120,
      },
    ],
    [],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2>Managers</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter Manager Name"
        />
        <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
          Add Manager
        </button>
        {selectedRows.length > 0 && (
          <button
            onClick={handleBatchDelete}
            style={{
              backgroundColor: "#ff4d4f",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Delete Selected ({selectedRows.length})
          </button>
        )}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Search managers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "400px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

      <div style={{ flexGrow: 1, width: "100%" }}>
        <AgGridReact<IManager>
          rowData={rowData}
          columnDefs={columnDefs}
          quickFilterText={searchText}
          rowSelection="multiple"
          onSelectionChanged={(event) => {
            const selected = event.api.getSelectedRows();
            setSelectedRows(selected);
          }}
          onCellValueChanged={onCellValueChanged}
          getRowId={(params) => params.data.id}
        />
      </div>
    </div>
  );
};
