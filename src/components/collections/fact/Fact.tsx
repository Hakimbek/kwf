import { useEffect, useMemo, useState } from "react";
import { Button, Input, Spinner } from "reactstrap";
import {
  addDocument,
  subscribeToCollection,
  COMPANY_COLLECTION,
  FACT_COLLECTION,
} from "../../../firebase/services.ts";
import type { ICompany, IFact } from "../../../type/type.ts";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import {
  createColumn,
  createDateColumn,
  createSelectColumn,
} from "../../../utils/columnFactory.tsx";
import styles from "../Collection.module.css";
import { DeleteModal } from "../../modal/delete/DeleteModal.tsx";

const monthList = [
  { id: "january", name: "January" },
  { id: "february", name: "February" },
  { id: "march", name: "March" },
  { id: "april", name: "April" },
  { id: "may", name: "May" },
  { id: "june", name: "June" },
  { id: "july", name: "July" },
  { id: "august", name: "August" },
  { id: "september", name: "September" },
  { id: "october", name: "October" },
  { id: "november", name: "November" },
  { id: "december", name: "December" },
];

export const Fact = () => {
  const [fact, setFact] = useState<IFact[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [searchText, setSearchText] = useState("");
  const [year, setYear] = useState("");
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubCompany = subscribeToCollection(
      COMPANY_COLLECTION,
      setCompanies,
    );
    const unsubFact = subscribeToCollection(FACT_COLLECTION, setFact);
    return () => {
      unsubCompany();
      unsubFact();
    };
  }, []);

  const toggle = () => setIsModalOpen(!isModalOpen);

  const openDeleteModal = (data: any) => {
    setSelectedData(data);
    toggle();
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAdding(true);
    await addDocument(FACT_COLLECTION, {
      year,
      companyId: selectedCompanyId,
      month: selectedMonth,
    });
    setIsAdding(false);
    setYear("");
    setSelectedMonth("");
    setSelectedCompanyId("");
  };

  const columnDefs = useMemo<ColDef<IFact>[]>(
    () => [
      createColumn("year", "Year", { editable: true }),
      createSelectColumn("month", "Month", companies, { editable: true }),
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
      <h2 className={styles.title}>Fact</h2>
      <div className={styles.header}>
        <div>
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <form className={styles.form}>
          <Input
            type="text"
            placeholder="Type year..."
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <Input
            className={`${selectedMonth === "" && "text-secondary"}`}
            type="select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="" hidden>
              Select month...
            </option>
            {monthList.map(({ id, name }) => (
              <option key={id} value={id} className="text-black">
                {name}
              </option>
            ))}
          </Input>
          <Input
            className={`${selectedCompanyId === "" && "text-secondary"}`}
            type="select"
            value={selectedCompanyId}
            onChange={(e) => setSelectedCompanyId(e.target.value)}
          >
            <option value="" hidden>
              Select company...
            </option>
            {companies.map(({ id, name }) => (
              <option key={id} value={id} className="text-black">
                {name}
              </option>
            ))}
          </Input>
          <Button
            disabled={isAdding || !selectedMonth || !selectedCompanyId}
            type="submit"
            className={styles.addButton}
            color="primary"
            onClick={(e) => handleAdd(e)}
          >
            {!isAdding ? (
              <i className="bi bi-plus-lg"></i>
            ) : (
              <Spinner size="sm" />
            )}
          </Button>
        </form>
      </div>
      <AgGridReact<IFact>
        rowData={fact}
        columnDefs={columnDefs}
        quickFilterText={searchText}
        // onCellValueChanged={onCellValueChanged}
        stopEditingWhenCellsLoseFocus={true}
      />
      <DeleteModal
        toggle={toggle}
        isModalOpen={isModalOpen}
        selectedDataName={selectedData?.name}
        selectedDataId={selectedData?.id}
        collectionName={FACT_COLLECTION}
      />
    </div>
  );
};
