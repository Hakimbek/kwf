import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Manager } from "./components/manager/Manager.tsx";
import { Company } from "./components/company/Company.tsx";
import { Product } from "./components/product/Product.tsx";
import { Region } from "./components/region/Region.tsx";
import { Client } from "./components/client/Client.tsx";
import { Plan } from "./components/Plan/Plan.tsx";
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
        <Route path="/clients" element={<Client />} />
        <Route path="/regions" element={<Region />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
