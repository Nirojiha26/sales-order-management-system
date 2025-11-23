import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";

import salesOrderService from "../services/salesOrderService";

const HomePage = () => {
  const [salesOrders, setSalesOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const load = async () => {
      try {
        const data = await salesOrderService.getSalesOrders();
        setSalesOrders(data);
      } catch (e: any) {
        setError("Failed to load sales orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
console.log("SALES ORDERS:", salesOrders);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Sales Orders</h1>

        <Link to="/sales-order">
          <Button variant="primary">+ New Sales Order</Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4 max-w-md">
        <Input placeholder="Search by invoice number or customer..." />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
  <table className="w-full text-sm border">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-3 text-left border">Invoice No</th>
        <th className="p-3 text-left border">Date</th>
        <th className="p-3 text-left border">Customer</th>
        <th className="p-3 text-left border">Reference</th>
        <th className="p-3 text-left border">Total Incl</th>

        {/* NEW ACTION COLUMN */}
        <th className="p-3 text-left border">Actions</th>
      </tr>
    </thead>

    <tbody>
  {loading && (
    <tr key="loading">
      <td colSpan={6} className="p-4 text-center">Loading...</td>
    </tr>
  )}

  {error && (
    <tr key="error">
      <td colSpan={6} className="p-4 text-center text-red-500">{error}</td>
    </tr>
  )}

  {!loading && salesOrders.length === 0 && (
    <tr key="empty">
      <td colSpan={6} className="p-4 text-center">No sales orders found.</td>
    </tr>
  )}

  {salesOrders.map((order) => (
    <tr key={order.id} className="hover:bg-gray-100">
      <td className="p-3 border">{order.invoiceNumber}</td>
      <td className="p-3 border">{new Date(order.invoiceDate).toLocaleDateString()}</td>
      <td className="p-3 border">{order.client?.name}</td>
      <td className="p-3 border">{order.reference}</td>
      <td className="p-3 border">{order.totalIncl.toFixed(2)}</td>

      <td className="p-3 border text-center">
        <Link to={`/sales-order/${order.id}/print`}>
  <button className="bg-green-600 text-white px-3 py-1 rounded">
    Print
  </button>
</Link>

      </td>
    </tr>
  ))}
</tbody>

  </table>
</div>
    </div>
  );
};

export default HomePage;
