import useLocalStorage from "use-local-storage";
import "./Filter.css";

export const FilterProduct = () => {
  const [product, setProduct] = useLocalStorage("product", "All");

  return (
    <div className="filter-container">
      <button
        className={`filter-option ${product === "All" && "active-filter"}`}
        onClick={() => setProduct("All")}
      >
        All
      </button>
      <button
        className={`filter-option ${product === "wRSC" && "active-filter"}`}
        onClick={() => setProduct("wRSC")}
      >
        wRSC
      </button>
      <button
        className={`filter-option ${product === "non-RSC" && "active-filter"}`}
        onClick={() => setProduct("non-RSC")}
      >
        non-RSC
      </button>
      <button
        className={`filter-option ${product === "RSC" && "active-filter"}`}
        onClick={() => setProduct("RSC")}
      >
        RSC
      </button>
      <button
        className={`filter-option ${product === "Gofrolist" && "active-filter"}`}
        onClick={() => setProduct("Gofrolist")}
      >
        Gofrolist
      </button>
      <button
        className={`filter-option ${product === "SnP" && "active-filter"}`}
        onClick={() => setProduct("SnP")}
      >
        SnP
      </button>
      <button
        className={`filter-option ${product === "SnP Lam" && "active-filter"}`}
        onClick={() => setProduct("SnP Lam")}
      >
        SnP Lam
      </button>
      <button
        className={`filter-option ${product === "Monokarton" && "active-filter"}`}
        onClick={() => setProduct("Monokarton")}
      >
        Monokarton
      </button>
    </div>
  );
};
