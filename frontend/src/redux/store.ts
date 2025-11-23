// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";

import clientReducer from "../redux/slices/clientSlice";
import itemReducer from "../redux/slices/itemSlice";
import salesOrderReducer from "../redux/slices/salesOrderSlice";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    items: itemReducer,
    salesOrder: salesOrderReducer, // FIXED: consistent name
  }
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
