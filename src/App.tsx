import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Manager } from "./components/collections/manager/Manager.tsx";
import { Company } from "./components/collections/company/Company.tsx";
import { Product } from "./components/collections/product/Product.tsx";
import { Region } from "./components/collections/region/Region.tsx";
import { Client } from "./components/collections/client/Client.tsx";
import { Version } from "./components/collections/version/Version.tsx";
import { Fact } from "./components/collections/fact/Fact.tsx";
import { Plan } from "./components/collections/plan/Plan.tsx";
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
        <Route path="/fact" element={<Fact />} />
        <Route path="/plan/version/:name/:id" element={<Version />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
