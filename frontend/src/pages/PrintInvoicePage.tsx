import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import salesOrderService from "../services/salesOrderService";
import clientService from "../services/clientService";
import itemService from "../services/itemService";

const PrintInvoicePage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      if (!id) return;

      const numericId = Number(id);
      if (!Number.isFinite(numericId)) return;

      try {
        const data = await salesOrderService.getSalesOrderById(numericId);
        // Fetch reference data needed for printing
        const [clients, items] = await Promise.all([
          clientService.getAllClients(),
          itemService.getAllItems(),
        ]);

        const client = clients.find((c: any) => c.id === data.clientId);
        const detailedItems = (data.items ?? []).map((it: any) => {
          const item = items.find((i: any) => i.id === it.itemId);
          const price = item?.price ?? 0;
          const excl = price * (it.quantity ?? 0);
          const tax = excl * (it.taxRate ?? 0);
          const incl = excl + tax;
          return { ...it, item, excl, tax, incl };
        });

        setOrder({ ...data, client, items: detailedItems });
      } catch (e) {
        setError("Failed to load sales order.");
      }
    };

    load();
  }, [id]);

  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!order) return <p>Loading...</p>;

  return (
    <div
      style={{
        width: "800px",
        margin: "0 auto",
        background: "white",
        padding: "40px",
        color: "black",
      }}
    >
      {/* PRINT FIX */}
      <style>
        {`
          @media print {
            body {
              background: white !important;
            }
          }
        `}
      </style>

      <h1 className="text-2xl font-bold mb-6">Sales Invoice</h1>

      {/* CUSTOMER DETAILS */}
      <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {order.client?.name ?? `Client #${order.clientId}`}</p>
        <p><strong>Address 1:</strong> {order.client?.address1 ?? "-"}</p>
        <p><strong>Address 2:</strong> {order.client?.address2 ?? "-"}</p>
        <p><strong>Address 3:</strong> {order.client?.address3 ?? "-"}</p>
        <p><strong>State:</strong> {order.client?.state ?? "-"}</p>
        <p><strong>Post Code:</strong> {order.client?.postCode ?? "-"}</p>
      </div>

      {/* INVOICE INFO */}
      <h2 className="text-xl font-semibold mb-2">Invoice Details</h2>
      <p><strong>Invoice No:</strong> {order.invoiceNumber}</p>
      <p><strong>Date:</strong> {new Date(order.invoiceDate).toLocaleDateString()}</p>
      <p><strong>Reference:</strong> {order.reference}</p>

      {/* ITEMS TABLE */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <table className="w-full border mt-2 mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Item Code</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Excl</th>
            <th className="p-2 border">Tax</th>
            <th className="p-2 border">Incl</th>
          </tr>
        </thead>
        <tbody>
          {(order.items ?? []).map((it: any, index: number) => (
            <tr key={it.id ?? `${it.item?.itemCode}-${index}`}>
              <td className="p-2 border">{it.item?.itemCode ?? it.itemId}</td>
              <td className="p-2 border">{it.item?.description ?? "-"}</td>
              <td className="p-2 border">{it.quantity}</td>
              <td className="p-2 border">{(it.item?.price ?? 0).toFixed(2)}</td>
              <td className="p-2 border">{(it.excl ?? 0).toFixed(2)}</td>
              <td className="p-2 border">{(it.tax ?? 0).toFixed(2)}</td>
              <td className="p-2 border">{(it.incl ?? 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Summary</h2>
      <p><strong>Total Excl:</strong> Rs. {order.totalExcl.toFixed(2)}</p>
      <p><strong>Total Tax:</strong> Rs. {order.totalTax.toFixed(2)}</p>
      <p><strong>Total Incl:</strong> Rs. {order.totalIncl.toFixed(2)}</p>

      {/* PRINT BUTTON */}
      <button
        onClick={() => window.print()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Print / Save as PDF
      </button>
    </div>
  );
};

export default PrintInvoicePage;
