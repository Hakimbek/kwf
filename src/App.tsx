import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Manager } from "./manager/Manager.tsx";
import { ToastContainer } from "react-toastify";
// import useLocalStorage from "use-local-storage";
// import { Routes, Route } from "react-router-dom";
// import Import from "./components/import/Import.tsx";
// import { Header } from "./components/header/Header.tsx";
// import { CollectionName, StorageName } from "./type/import.ts";
// import { MPReports } from "./components/reports/mp/MPReports.tsx";
// import { KWFReports } from "./components/reports/kwf/KWFReports.tsx";
// import { InputKPI } from "./components/input/Input.tsx";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  // const { KWF, MP } = CollectionName;
  // const { COLLECTION } = StorageName;
  // const [key] = useLocalStorage(COLLECTION, KWF);

  return (
    <div>
      {/*<Header />*/}
      <Manager />
      {/*<Routes>*/}
      {/*  <Route*/}
      {/*    path="/"*/}
      {/*    element={key === KWF ? <KWFReports /> : <MPReports />}*/}
      {/*  />*/}
      {/*  <Route*/}
      {/*    path="/import"*/}
      {/*    element={*/}
      {/*      <>*/}
      {/*        <div className="d-flex justify-content-center gap-3">*/}
      {/*          <Import collection={KWF} />*/}
      {/*          <Import collection={MP} />*/}
      {/*        </div>*/}
      {/*        <InputKPI />*/}
      {/*      </>*/}
      {/*    }*/}
      {/*  />*/}
      {/*</Routes>*/}
      <ToastContainer />
    </div>
  );
}

export default App;
