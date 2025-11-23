import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left border">Invoice No</th>
              <th className="p-3 text-left border">Date</th>
              <th className="p-3 text-left border">Customer</th>
              <th className="p-3 text-left border">Reference</th>
              <th className="p-3 text-left border">Total Incl</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows will come from Redux later */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
