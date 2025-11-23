import React from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

const SalesOrderPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Create Sales Order</h1>

      {/* Customer Section */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Customer Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Customer"
            options={[]}  // later filled from API
          />
          <Input label="Address 1" readOnly />
          <Input label="Address 2" readOnly />
          <Input label="Address 3" readOnly />
          <Input label="State" readOnly />
          <Input label="Post Code" readOnly />
        </div>
      </Card>

      {/* Invoice Section */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Invoice No" />
          <Input label="Invoice Date" type="date" />
          <Input label="Reference" />
        </div>
      </Card>

      {/* Item Entry Section */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Items</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <Select label="Item Code" options={[]} />
          <Select label="Description" options={[]} />
          <Input label="Quantity" type="number" />
          <Input label="Price" type="number" readOnly />
          <Input label="Tax (%)" type="number" />
          <Button variant="primary">Add Item</Button>
        </div>

        {/* Item Table */}
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
              {/* Dynamic rows go here */}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Section */}
      <Card>
        <h2 className="text-lg font-semibold mb-4">Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Total Excl" readOnly />
          <Input label="Total Tax" readOnly />
          <Input label="Total Incl" readOnly />
        </div>

        <Button variant="primary" className="mt-6">
          Save Sales Order
        </Button>
      </Card>
    </div>
  );
};

export default SalesOrderPage;
