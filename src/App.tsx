import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import { Filter } from "./components/filter/Filter.tsx";
import { Reports } from "./components/reports/Reports.tsx";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import type {StorageType} from "./utils/type.ts";

function App() {
  const [, setStorageType] = useLocalStorage<StorageType>("storageType", "kwf");
  const [, setManager] = useLocalStorage("manager", "All");

  useEffect(() => {
    setStorageType("kwf");
    setManager("All");
  }, []);

  return (
    <div>
      <Header />
      <Filter />
      <Reports />
      <ToastContainer />
    </div>
  );
}

export default App;
