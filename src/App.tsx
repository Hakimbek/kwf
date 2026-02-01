import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import useLocalStorage from "use-local-storage";
import { KWFReports } from "./components/reports/kwf/KWFReports.tsx";
import { MPReports } from "./components/reports/mp/MPReports.tsx";
import { CollectionName, StorageName } from "./type/import.ts";
import { Routes, Route } from "react-router-dom";
import Import from "./components/import/Import.tsx";

function App() {
  const { KWF, MP } = CollectionName;
  const { KEY } = StorageName;
  const [key] = useLocalStorage(KEY, KWF);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={key === KWF ? <KWFReports /> : <MPReports />}
        />
        <Route
          path="/import"
          element={
            <div className="d-flex justify-content-center gap-3">
              <Import collection={KWF} />
              <Import collection={MP} />
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
