// src/redux/slices/clientSlice.ts
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
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, thunkAPI) => {
    try {
      return await clientService.getAllClients();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default clientSlice.reducer;
