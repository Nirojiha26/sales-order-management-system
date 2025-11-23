// src/redux/slices/itemSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemService from "../../services/itemService";

export interface Item {
  id: number;
  itemCode: string;
  description: string;
  price: number;
}

interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, thunkAPI) => {
    try {
      return await itemService.getAllItems();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default itemSlice.reducer;
