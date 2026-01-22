import useLocalStorage from "use-local-storage";
import "./Filter.css";

export const FilterRegion = () => {
  const [region, setRegion] = useLocalStorage("region", "All");

  return (
    <div className="filter-container">
      <button
        className={`filter-option ${region === "All" && "active-filter"}`}
        onClick={() => setRegion("All")}
      >
        All
      </button>
      <button
        className={`filter-option ${region === "Xorazm va QQP" && "active-filter"}`}
        onClick={() => setRegion("Xorazm va QQP")}
      >
        Xorazm va QQP
      </button>
      <button
        className={`filter-option ${region === "Buxoro va Navoiy" && "active-filter"}`}
        onClick={() => setRegion("Buxoro va Navoiy")}
      >
        Buxoro va Navoiy
      </button>
      <button
        className={`filter-option ${region === "Vodiy: FAN" && "active-filter"}`}
        onClick={() => setRegion("Vodiy: FAN")}
      >
        Vodiy: FAN
      </button>
      <button
        className={`filter-option ${region === "Kash va Surx" && "active-filter"}`}
        onClick={() => setRegion("Kash va Surx")}
      >
        Kash va Surx
      </button>
      <button
        className={`filter-option ${region === "Sam, Jizz, Sir" && "active-filter"}`}
        onClick={() => setRegion("Sam, Jizz, Sir")}
      >
        Sam, Jizz, Sir
      </button>
      <button
        className={`filter-option ${region === "Toshkent" && "active-filter"}`}
        onClick={() => setRegion("Toshkent")}
      >
        Toshkent
      </button>
      <button
        className={`filter-option ${region === "Eksport (kushni)" && "active-filter"}`}
        onClick={() => setRegion("Eksport (kushni)")}
      >
        Eksport (kushni)
      </button>
      <button
        className={`filter-option ${region === "Eksport (kushni emas)" && "active-filter"}`}
        onClick={() => setRegion("Eksport (kushni emas)")}
      >
        Eksport (kushni emas)
      </button>
    </div>
  );
};
