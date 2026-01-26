import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import { KwfReportGroup } from "./components/reports/kwf/KwfReportGroup.tsx";
import { MPReportGroup } from "./components/reports/mp/MPReportGroup.tsx";
import { Filter } from "./components/filter/Filter.tsx";

function App() {
  return (
    <div>
      <Header />
      <Filter />
      <Routes>
        <Route path="/" element={<Navigate to="/kwf" />} />
        <Route path="/kwf" element={<KwfReportGroup />} />
        <Route path="/mp" element={<MPReportGroup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
