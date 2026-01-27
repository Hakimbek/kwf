import Import from "../import/Import.tsx";
import { storage } from "../../utils/data.ts";
import useLocalStorage from "use-local-storage";
import type { StorageType } from "../../utils/type.ts";
import "./Header.css";

export const Header = () => {
  const { KWF, MP } = storage;
  const [key, setKey] = useLocalStorage<StorageType>("key", KWF);
  const [, setManager] = useLocalStorage("manager", "All");

  const handleClick = (key: StorageType) => {
    setKey(key);
    setManager("All");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="d-flex gap-2">
          <button
            className={`nav-button ${key === KWF && "active-nav"}`}
            onClick={() => handleClick(KWF)}
          >
            {KWF}
          </button>
          <button
            className={`nav-button ${key === MP && "active-nav"}`}
            onClick={() => handleClick(MP)}
          >
            {MP}
          </button>
        </div>
        <div className="d-flex gap-2">
          <Import storage={KWF} />
          <Import storage={MP} />
        </div>
      </nav>
    </header>
  );
};
