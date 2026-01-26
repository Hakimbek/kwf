import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import { Filter } from "./components/filter/Filter.tsx";
import { Reports } from "./components/reports/Reports.tsx";

function App() {
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
