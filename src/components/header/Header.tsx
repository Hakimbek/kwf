import { NavLink, useLocation } from "react-router-dom";
import { Import } from "../import/Import.tsx";
import "./Header.css";

export const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="d-flex gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-button active" : "nav-button"
            }
            to={"/kwf"}
          >
            KWF
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-button active" : "nav-button"
            }
            to={"/mp"}
          >
            MP
          </NavLink>
        </div>
        <Import
          type={location.pathname.includes("kwf") ? "kwfData" : "mpData"}
        />
      </nav>
    </header>
  );
};
