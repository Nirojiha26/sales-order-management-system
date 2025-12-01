// Manages sales order form data (customer, invoice fields, items, totals)
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  itemId: number;
  itemCode: string;
  description: string;
  quantity: number;
  price: number;
  taxRate: number;
  excl: number; // line total excl tax
  tax: number;  // line tax
  incl: number; // line total incl tax
}

interface SalesOrderState {
  customerId: number | null; // selected customer
  invoiceNo: string;
  invoiceDate: string;
  reference: string;

  items: OrderItem[]; // all order items
  totals: {
    totalExcl: number;
    totalTax: number;
    totalIncl: number;
  };
}

const initialState: SalesOrderState = {
  customerId: null,
  invoiceNo: "",
  invoiceDate: "",
  reference: "",
  items: [], // no items initially
  totals: {
    totalExcl: 0,
    totalTax: 0,
    totalIncl: 0,
  },
};

// Handles invoice UI logic (not API)
const salesOrderSlice = createSlice({
  name: "salesOrder",
  initialState,
  reducers: {
    // set selected customer
    setCustomer(state, action: PayloadAction<number | null>) {
      state.customerId = action.payload;
    },

    // update invoice fields dynamically
    setInvoiceField(
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) {
      (state as any)[action.payload.field] = action.payload.value;
    },

    // add new item and recalc totals
    addItem(state, action: PayloadAction<OrderItem>) {
      state.items.push(action.payload);
      recalcTotals(state); // auto update totals
    },

    // remove item by index and recalc totals
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((_, index) => index !== action.payload);
      recalcTotals(state);
    },
  },
});

// calculates invoice totals based on added items
function recalcTotals(state: SalesOrderState) {
  let excl = 0;
  let tax = 0;
  let incl = 0;

  state.items.forEach((item) => {
    excl += item.excl;
    tax += item.tax;
    incl += item.incl;
  });

  state.totals.totalExcl = excl;
  state.totals.totalTax = tax;
  state.totals.totalIncl = incl;
}

export const { setCustomer, setInvoiceField, addItem, removeItem } =
  salesOrderSlice.actions;

export default salesOrderSlice.reducer;
