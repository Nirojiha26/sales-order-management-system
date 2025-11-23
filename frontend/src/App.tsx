import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SalesOrderPage from "./pages/SalesOrderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<SalesOrderPage />} />
        <Route path="/sales-order" element={<SalesOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
