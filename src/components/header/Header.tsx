import { Filter } from "../filter/Filter.tsx";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="d-flex gap-3">
        <NavLink
          className={({ isActive }) =>
            `header-link ${isActive && "header-link_active"}`
          }
          to="/managers"
        >
          Managers
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-link ${isActive && "header-link_active"}`
          }
          to="/company"
        >
          Company
        </NavLink>
      </div>
      <div className="d-flex gap-2">
        <Filter />
      </div>
    </header>
  );
};
