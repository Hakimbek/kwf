import { Header } from "./components/header/Header.tsx"
import { ToastContainer } from 'react-toastify'
import { Routes, Route, Navigate } from "react-router-dom"
import { Reports } from "./components/page/Reports.tsx"
import { Data } from "./components/page/Data.tsx"

function App() {
  return (
    <div className="m-3">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/reports"/> } />
        <Route path="/reports" element={<Reports />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
