import useLocalStorage from "use-local-storage";
import { mpManagers, kwfManagers } from "../../utils/data.ts";
import { storage } from "../../utils/data.ts";
import type { StorageType } from "../../utils/type.ts";
import "./Filter.css";

export const Filter = () => {
  const [manager, setManager] = useLocalStorage("manager", "All");
  const [storageType] = useLocalStorage<StorageType>("storageType", "kwf");

  return (
    <div className="filter-container">
      {storage.KWF === storageType &&
        kwfManagers.map((item) => (
          <button
            className={`filter-option ${manager === item && "active-filter"}`}
            onClick={() => setManager(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      {storage.MP === storageType &&
        mpManagers.map((item) => (
          <button
            className={`filter-option ${manager === item && "active-filter"}`}
            onClick={() => setManager(item)}
            key={item}
          >
            {item}
          </button>
        ))}
    </div>
  );
};
