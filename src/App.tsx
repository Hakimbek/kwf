import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import { Filter } from "./components/filter/Filter.tsx";
import useLocalStorage from "use-local-storage";
import { storage } from "./utils/data.ts";
import { KWFReports } from "./components/reports/kwf/KWFReports.tsx";
import { MPReports } from "./components/reports/mp/MPReports.tsx";

function App() {
  const [key] = useLocalStorage("key", storage.KWF)

  return (
    <div>
      <Header />
      <Filter />
      { key === storage.KWF ? <KWFReports /> : <MPReports /> }
      <ToastContainer />
    </div>
  );
}

export default App;
