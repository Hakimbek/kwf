import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import { Filter } from "./components/filter/Filter.tsx";
import { Reports } from "./components/reports/Reports.tsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Filter />
      <Routes>
        <Route path="/" element={<Navigate to="/KWF/All" replace />} />
        <Route path="/KWF/All" element={<Reports />} />
        <Route path="*" element={<Navigate to="/KWF/All" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
