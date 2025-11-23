// src/redux/slices/salesOrderSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  itemId: number;
  itemCode: string;
  description: string;
  quantity: number;
  price: number;
  taxRate: number;
  excl: number;
  tax: number;
  incl: number;
}

interface SalesOrderState {
  customerId: number | null;
  invoiceNo: string;
  invoiceDate: string;
  reference: string;
  items: OrderItem[];
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
  items: [],
  totals: {
    totalExcl: 0,
    totalTax: 0,
    totalIncl: 0,
  },
};

const salesOrderSlice = createSlice({
  name: "salesOrder",
  initialState,
  reducers: {
    setCustomer(state, action: PayloadAction<number | null>) {
      state.customerId = action.payload;
    },

    setInvoiceField(
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) {
      (state as any)[action.payload.field] = action.payload.value;
    },

    addItem(state, action: PayloadAction<OrderItem>) {
      state.items.push(action.payload);
      recalcTotals(state);
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((_, index) => index !== action.payload);
      recalcTotals(state);
    },
  },
});

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
