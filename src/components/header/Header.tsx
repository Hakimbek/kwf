import { NavLink } from "react-router-dom";
import { Import } from "../import/Import.tsx";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="d-flex gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-button active" : "nav-button"
            }
            to={"/reports"}
          >
            Визуализация
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-button active" : "nav-button"
            }
            to={"/data"}
          >
            Данные
          </NavLink>
        </div>
        <Import />
      </nav>
    </header>
  );
};
