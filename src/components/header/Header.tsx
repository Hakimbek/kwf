import Import from "../import/Import.tsx";
import { storage } from "../../utils/data.ts";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { KWF, MP } = storage;

  return (
    <header className="header">
      <nav className="nav">
        <div className="d-flex gap-2">
          <button
            className={`nav-button ${pathname.includes(KWF) && "active-nav"}`}
            onClick={() => navigate(`/${KWF}/All`)}
          >
            {KWF}
          </button>
          <button
            className={`nav-button ${pathname.includes(MP) && "active-nav"}`}
            onClick={() => navigate(`/${MP}/All`)}
          >
            {MP}
          </button>
        </div>
        <div className="d-flex gap-2">
          <Import storage={KWF} />
          <Import storage={MP} />
        </div>
      </nav>
    </header>
  );
};
