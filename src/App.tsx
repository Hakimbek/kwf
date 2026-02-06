import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Manager } from "./components/manager/Manager.tsx";
import { Company } from "./components/company/Company.tsx";
import { Product } from "./components/product/Product.tsx";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header.tsx";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/managers" element={<Manager />} />
        <Route path="/company" element={<Company />} />
        <Route path="/products" element={<Product />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
