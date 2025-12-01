// Manages global item list state (used in many components)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemService from "../../services/itemService";

export interface Item {
  id: number;
  itemCode: string;
  description: string;
  price: number;
}

interface ItemState {
  items: Item[];        // Stores API item list
  loading: boolean;     // Loader flag
  error: string | null; // Error flag
}

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

// Async API call → GET /items
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (_, thunkAPI) => {
    try {
      return await itemService.getAllItems(); // Calls service → backend
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message); // API error handling
    }
  }
);

// Handles loading → success → error for items
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {}, // No manual reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true; // API started
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // API success → store items
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // API failed
      });
  },
});

export default itemSlice.reducer;
