import {
  ManagerName,
  StorageName,
  CollectionName,
  type ManagerType,
  type CollectionType,
} from "../../type/import.ts";
import { Filter } from "../filter/Filter.tsx";
import useLocalStorage from "use-local-storage";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const { KWF, MP } = CollectionName;
  const { COLLECTION, MANAGER } = StorageName;
  const { ALL } = ManagerName;
  const [collection, setCollection] = useLocalStorage<CollectionType>(
    COLLECTION,
    KWF,
  );
  const [, setManager] = useLocalStorage<ManagerType>(MANAGER, ALL);

  const handleClick = (key: CollectionType) => {
    setCollection(key);
    setManager(ALL);
  };

  return (
    <header className="header-wrapper">
      <div className="d-flex gap-3">
        <NavLink className={({ isActive }) => `header-link ${isActive && 'header-link_active'}`} to="/managers">Managers</NavLink>
        <NavLink className={({ isActive }) => `header-link ${isActive && 'header-link_active'}`} to="/company">Company</NavLink>
      </div>
      <div className="d-flex gap-2">
        <Filter />
      </div>
    </header>
  );
};
