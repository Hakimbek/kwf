import useLocalStorage from "use-local-storage";
import { mpManagers, kwfManagers } from "../../utils/data.ts";
import { useLocation } from "react-router-dom";
import { storage } from "../../utils/data.ts";
import "./Filter.css";

export const Filter = () => {
  const [manager, setManager] = useLocalStorage("manager", "All");
  const location = useLocation();

  return (
    <div className="filter-container">
      {location.pathname.includes(storage.KWF) &&
        kwfManagers.map((item) => (
          <button
            className={`filter-option ${manager === item && "active-filter"}`}
            onClick={() => setManager(item)}
          >
            {item}
          </button>
        ))}
      {location.pathname.includes(storage.MP) &&
        mpManagers.map((item) => (
          <button
            className={`filter-option ${manager === item && "active-filter"}`}
            onClick={() => setManager(item)}
          >
            {item}
          </button>
        ))}
    </div>
  );
};
