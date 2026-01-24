import { Header } from "./components/header/Header.tsx";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import { ReportGroup } from "./components/reports/ReportGroup.tsx";
import { Data } from "./components/data/Data.tsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/reports" />} />
        <Route path="/reports" element={<ReportGroup />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
