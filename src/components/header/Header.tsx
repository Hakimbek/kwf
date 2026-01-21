import { useNavigate, useLocation } from "react-router-dom"
import { Import } from "../form/Import.tsx"
import { Button } from "reactstrap"

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="d-flex justify-content-between bg-light p-4 border rounded">
      <nav className="col-6 d-flex align-items-center gap-4">
        <h1 className="p-0 m-0">KWF</h1>
          <div className="d-flex gap-4">
            <Button
              onClick={() => navigate("/reports")}
              color="primary"
              outline={!location.pathname.includes('/reports')}>
              Визуализация
            </Button>
            <Button
              onClick={() => navigate("/data")}
              color="primary"
              outline={!location.pathname.includes('/data')}>
              Данные
            </Button>
          </div>
      </nav>
      <Import />
    </header>
  )
}
