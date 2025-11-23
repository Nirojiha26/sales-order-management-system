import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCustomer,
  setInvoiceField,
  addItem,
  removeItem,
} from "../redux/slices/salesOrderSlice";

import { fetchClients } from "../redux/slices/clientSlice";
import { fetchItems } from "../redux/slices/itemSlice";

import salesOrderService from "../services/salesOrderService";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

import type { RootState, AppDispatch } from "../redux/store";

const SalesOrderPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const { clients } = useSelector((state: RootState) => state.clients);
  const { items } = useSelector((state: RootState) => state.items);
const salesOrder = useSelector((state: RootState) => state.salesOrder);
  // Temporary UI state for item input form
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [taxRate, setTaxRate] = useState<number>(15);

  // Fetch clients + items when screen loads
  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchItems());
  }, [dispatch]);

  // Derived selected customer
  const selectedCustomer = clients.find(
    (c) => c.id === salesOrder.customerId
  );

  // Derived selected item
  const selectedItem = items.find((i) => i.id === selectedItemId);

  // Add item handler
  const handleAddItem = () => {
    if (!selectedItem) return;

    const price = selectedItem.price;
    const excl = qty * price;
    const tax = (excl * taxRate) / 100;
    const incl = excl + tax;

    dispatch(
      addItem({
        itemId: selectedItem.id,
        itemCode: selectedItem.itemCode,
        description: selectedItem.description,
        quantity: qty,
        price,
        taxRate,
        excl,
        tax,
        incl,
      })
    );

    // reset fields
    setSelectedItemId(null);
    setQty(1);
    setTaxRate(15);
  };

  // Save order handler
  const handleSaveOrder = async () => {
    // Basic validation to avoid 400 from backend
    if (!salesOrder.customerId) {
      alert("Please select a customer");
      return;
    }
    if (!salesOrder.invoiceDate) {
      alert("Please select an invoice date");
      return;
    }
    if (salesOrder.items.length === 0) {
      alert("Please add at least one item");
      return;
    }

    const orderPayload = {
      clientId: salesOrder.customerId,
      invoiceNumber: salesOrder.invoiceNo,
      invoiceDate: salesOrder.invoiceDate,
      reference: salesOrder.reference,
      totalExcl: salesOrder.totals.totalExcl,
      totalTax: salesOrder.totals.totalTax,
      totalIncl: salesOrder.totals.totalIncl,
      items: salesOrder.items.map((i) => ({
        itemId: i.itemId,
        quantity: i.quantity,
        taxRate: i.taxRate,
        note: "",
      })),
    };

    try {
      await salesOrderService.createSalesOrder(orderPayload);
      alert("Sales order saved!");
    } catch (err: any) {
      const msg = err?.response?.data ? JSON.stringify(err.response.data) : err?.message || "Failed to save order";
      alert(msg);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Create Sales Order</h1>

      {/* ========================== CUSTOMER DETAILS =========================== */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Customer Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Customer"
            value={salesOrder.customerId ?? ""}
            options={clients.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
            onChange={(val) => dispatch(setCustomer(Number(val)))}
          />

          <Input label="Address 1" readOnly value={selectedCustomer?.address1 ?? ""} />
          <Input label="Address 2" readOnly value={selectedCustomer?.address2 ?? ""} />
          <Input label="Address 3" readOnly value={selectedCustomer?.address3 ?? ""} />
          <Input label="State" readOnly value={selectedCustomer?.state ?? ""} />
          <Input label="Post Code" readOnly value={selectedCustomer?.postCode ?? ""} />
        </div>
      </Card>

      {/* ========================== INVOICE DETAILS =========================== */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Invoice No"
            value={salesOrder.invoiceNo}
            onChange={(e) =>
              dispatch(setInvoiceField({ field: "invoiceNo", value: e.target.value }))
            }
          />

          <Input
            label="Invoice Date"
            type="date"
            value={salesOrder.invoiceDate}
            onChange={(e) =>
              dispatch(setInvoiceField({ field: "invoiceDate", value: e.target.value }))
            }
          />

          <Input
            label="Reference"
            value={salesOrder.reference}
            onChange={(e) =>
              dispatch(setInvoiceField({ field: "reference", value: e.target.value }))
            }
          />
        </div>
      </Card>

      {/* ========================== ITEMS SECTION ============================= */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Items</h2>

        {/* Add item row */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <Select
            label="Item Code"
            value={selectedItemId ?? ""}
            options={items.map((i) => ({
              label: i.itemCode,
              value: i.id,
            }))}
            onChange={(val) => setSelectedItemId(Number(val))}
          />

          <Input label="Description" readOnly value={selectedItem?.description ?? ""} />

          <Input
            label="Qty"
            type="number"
            value={Number.isFinite(qty) ? qty : 0}
            onChange={(e) => {
              const v = e.target.value;
              setQty(v === "" ? 0 : Number(v));
            }}
          />

          <Input
            label="Price"
            readOnly
            value={selectedItem?.price?.toFixed(2) ?? ""}
          />

          <Input
            label="Tax (%)"
            type="number"
            value={Number.isFinite(taxRate) ? taxRate : 0}
            onChange={(e) => {
              const v = e.target.value;
              setTaxRate(v === "" ? 0 : Number(v));
            }}
          />

          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </div>

        {/* Items table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Item Code</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Excl</th>
                <th className="p-2 border">Tax</th>
                <th className="p-2 border">Incl</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {salesOrder.items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border">{item.itemCode}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.price.toFixed(2)}</td>
                  <td className="p-2 border">{item.excl.toFixed(2)}</td>
                  <td className="p-2 border">{item.tax.toFixed(2)}</td>
                  <td className="p-2 border">{item.incl.toFixed(2)}</td>

                  <td className="p-2 border text-center">
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeItem(index))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ========================== TOTALS ============================= */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Total Excl" value={salesOrder.totals.totalExcl.toFixed(2)} readOnly />
          <Input label="Total Tax" value={salesOrder.totals.totalTax.toFixed(2)} readOnly />
          <Input label="Total Incl" value={salesOrder.totals.totalIncl.toFixed(2)} readOnly />
        </div>

        <Button variant="primary" className="mt-6" onClick={handleSaveOrder}>
          Save Sales Order
        </Button>
      </Card>
    </div>
  );
};

export default SalesOrderPage;
