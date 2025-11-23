import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SalesOrderPage from "./pages/SalesOrderPage";
import PrintInvoicePage from "./pages/PrintInvoicePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<SalesOrderPage />} />
        <Route path="/sales-order" element={<SalesOrderPage />} />
<Route path="/sales-order/:id/print" element={<PrintInvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
