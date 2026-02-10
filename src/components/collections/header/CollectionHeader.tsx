import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter.ts";
import { addDocument } from "../../../firebase/services.ts";
import { Button, Input, Spinner } from "reactstrap";
import { useState } from "react";
import type { ICollection } from "../../../type/type.ts";
import styles from "../Collection.module.css";

interface ICollectionHeader {
  collectionName: string;
  searchText: string;
  setSearchText: (searchText: string) => void;
  collections?: ICollection[];
}

export const CollectionHeader = ({
  collectionName,
  searchText,
  setSearchText,
  collections,
}: ICollectionHeader) => {
  const [name, setName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) return;
    setIsAdding(true);
    await addDocument(collectionName, { name, companyId: selectedId });
    setIsAdding(false);
    setName("");
    setSelectedId("");
  };

  return (
    <>
      <h2 className={styles.title}>{capitalizeFirstLetter(collectionName)}</h2>
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
            placeholder="Type name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {collections && (
            <Input
              className={`${selectedId === "" && "text-secondary"}`}
              type="select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="" hidden>
                Select company name...
              </option>
              {collections.map(({ id, name }) => (
                <option key={id} value={id} className="text-black">
                  {name}
                </option>
              ))}
            </Input>
          )}
          <Button
            disabled={isAdding || !name || (collections && !selectedId)}
            type="submit"
            className={styles.addButton}
            color="primary"
            onClick={(e) => handleAdd(e)}
          >
            {!isAdding ? <i className="bi bi-plus-lg"></i> : <Spinner size="sm"/>}
          </Button>
        </form>
      </div>
    </>
  );
};
