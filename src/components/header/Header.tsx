import { NavLink, useLocation } from "react-router-dom";
import { Import } from "../import/Import.tsx";
import { storage } from "../../utils/data.ts";
import "./Header.css";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="d-flex gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-button active-nav" : "nav-button"
            }
            to={`/${storage.KWF}`}
          >
            KWF
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-button active-nav" : "nav-button"
            }
            to={`/${storage.MP}`}
          >
            MP
          </NavLink>
        </div>
        <Import
          type={location.pathname.includes(storage.KWF) ? `${storage.KWF}Data` : `${storage.MP}Data`}
        />
      </nav>
    </header>
  );
};
