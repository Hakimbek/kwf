import { mpManagers, kwfManagers } from "../../utils/data.ts";
import { storage } from "../../utils/data.ts";
import useLocalStorage from "use-local-storage";
import type { StorageType } from "../../utils/type.ts";
import "./Filter.css";

export const Filter = () => {
  const { KWF, MP } = storage;
  const [manager, setManager] = useLocalStorage("manager", "All");
  const [key] = useLocalStorage<StorageType>("key", KWF);

  const handleClick = (manager: string) => {
    setManager(manager);
  };

  return (
    <div className="filter-container">
      {key === KWF &&
        kwfManagers.map((item) => (
          <button
            className={`filter-option ${manager === item && "active-filter"}`}
            onClick={() => handleClick(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      {key === MP &&
        mpManagers.map((item) => (
          <button
            className={`filter-option ${manager === item && "active-filter"}`}
            onClick={() => handleClick(item)}
            key={item}
          >
            {item}
          </button>
        ))}
    </div>
  );
};
