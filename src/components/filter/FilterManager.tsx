import useLocalStorage from "use-local-storage";
import "./Filter.css";

export const FilterManager = () => {
  const [manager, setManager] = useLocalStorage("manager", "All");

  return (
    <div className="filter-container">
      <button
        className={`filter-option ${manager === "All" && "active-filter"}`}
        onClick={() => setManager("All")}
      >
        All
      </button>
      <button
        className={`filter-option ${manager === "Murod" && "active-filter"}`}
        onClick={() => setManager("Murod")}
      >
        Murod
      </button>
      <button
        className={`filter-option ${manager === "Farrux" && "active-filter"}`}
        onClick={() => setManager("Farrux")}
      >
        Farrux
      </button>
      <button
        className={`filter-option ${manager === "Shokirjon" && "active-filter"}`}
        onClick={() => setManager("Shokirjon")}
      >
        Shokirjon
      </button>
    </div>
  );
};
