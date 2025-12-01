// Manages global client list state (shared across the app)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "../../services/clientService";

export interface Client {
  id: number;
  name: string;
  address1?: string;
  address2?: string;
  address3?: string;
  state?: string;
  postCode?: string;
}

interface ClientState {
  clients: Client[];     // Stores client list from API
  loading: boolean;      // For showing loaders
  error: string | null;  // For API error state
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

// Async API call → GET /clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, thunkAPI) => {
    try {
      return await clientService.getAllClients(); // Calls service → backend
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message); // Handles error
    }
  }
);

// Slice handles state changes based on API result
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {}, // No manual reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true; // API call started
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload; // API success → store clients
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // API failed
      });
  },
});

export default clientSlice.reducer;
