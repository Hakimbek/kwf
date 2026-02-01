import {
  ManagerName,
  StorageName,
  CollectionName,
  type ManagerType,
  type CollectionType,
} from "../../type/import.ts";
import { Filter } from "../filter/Filter.tsx";
import useLocalStorage from "use-local-storage";
import "./Header.css";

export const Header = () => {
  const { KWF, MP } = CollectionName;
  const { KEY, MANAGER } = StorageName;
  const { ALL } = ManagerName;
  const [key, setKey] = useLocalStorage<CollectionType>(KEY, KWF);
  const [, setManager] = useLocalStorage<ManagerType>(MANAGER, ALL);

  const handleClick = (key: CollectionType) => {
    setKey(key);
    setManager(ALL);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="d-flex gap-2">
          <button
            className={`nav-button ${key === KWF && "active-nav"}`}
            onClick={() => handleClick(KWF)}
          >
            {KWF.toUpperCase()}
          </button>
          <button
            className={`nav-button ${key === MP && "active-nav"}`}
            onClick={() => handleClick(MP)}
          >
            {MP.toUpperCase()}
          </button>
        </div>
        <div className="d-flex gap-2">
          <Filter />
        </div>
      </nav>
    </header>
  );
};
