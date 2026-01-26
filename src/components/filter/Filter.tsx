import { mpManagers, kwfManagers } from "../../utils/data.ts";
import { storage } from "../../utils/data.ts";
import { useLocation, useNavigate } from "react-router-dom";
import "./Filter.css";

export const Filter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { KWF, MP } = storage;

  return (
    <div className="filter-container">
      {pathname.includes(KWF) &&
        kwfManagers.map((item) => (
          <button
            className={`filter-option ${decodeURIComponent(pathname).includes(item) && "active-filter"}`}
            onClick={() => navigate(`/${KWF}/${item}`)}
            key={item}
          >
            {item}
          </button>
        ))}
      {pathname.includes(MP) &&
        mpManagers.map((item) => (
          <button
            className={`filter-option ${decodeURIComponent(pathname).includes(item) && "active-filter"}`}
            onClick={() => navigate(`/${MP}/${item}`)}
            key={item}
          >
            {item}
          </button>
        ))}
    </div>
  );
};
