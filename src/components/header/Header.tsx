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
          to="/company"
        >
          Company
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-link ${isActive && "header-link_active"}`
          }
          to="/regions"
        >
          Regions
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-link ${isActive && "header-link_active"}`
          }
          to="/clients"
        >
          Clients
        </NavLink>
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
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-link ${isActive && "header-link_active"}`
          }
          to="/plan"
        >
          Plan
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-link ${isActive && "header-link_active"}`
          }
          to="/fact"
        >
          Fact
        </NavLink>
      </div>
    </header>
  );
};
