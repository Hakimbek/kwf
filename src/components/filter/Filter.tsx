import {
  ManagerName,
  StorageName,
  CollectionName,
  type ManagerType,
  type CollectionType,
} from "../../type/import.ts";
import useLocalStorage from "use-local-storage";
import "./Filter.css";

export const Filter = () => {
  const { KWF, MP } = CollectionName;
  const { COLLECTION, MANAGER } = StorageName;
  const { ALL, MUROD, ULUGBEK, XURSAND, FARRUX, SHOKIRJON } = ManagerName;
  const [collection] = useLocalStorage<CollectionType>(COLLECTION, KWF);
  const [manager, setManager] = useLocalStorage<ManagerType>(MANAGER, ALL);

  const handleClick = (manager: ManagerType) => {
    setManager(manager);
  };

  return (
    <div className="filter-container">
      {collection === KWF && (
        <>
          <button
            className={`filter-option ${manager === ALL && "active-filter"}`}
            onClick={() => handleClick(ALL)}
          >
            {ALL}
          </button>
          <button
            className={`filter-option ${manager === MUROD && "active-filter"}`}
            onClick={() => handleClick(MUROD)}
          >
            {MUROD}
          </button>
          <button
            className={`filter-option ${manager === FARRUX && "active-filter"}`}
            onClick={() => handleClick(FARRUX)}
          >
            {FARRUX}
          </button>
          <button
            className={`filter-option ${manager === SHOKIRJON && "active-filter"}`}
            onClick={() => handleClick(SHOKIRJON)}
          >
            {SHOKIRJON}
          </button>
        </>
      )}
      {collection === MP && (
        <>
          <button
            className={`filter-option ${manager === ALL && "active-filter"}`}
            onClick={() => handleClick(ALL)}
          >
            {ALL}
          </button>
          <button
            className={`filter-option ${manager === ULUGBEK && "active-filter"}`}
            onClick={() => handleClick(ULUGBEK)}
          >
            {ULUGBEK}
          </button>
          <button
            className={`filter-option ${manager === XURSAND && "active-filter"}`}
            onClick={() => handleClick(XURSAND)}
          >
            {XURSAND}
          </button>
        </>
      )}
    </div>
  );
};
