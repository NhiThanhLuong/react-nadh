import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getClients } from "ultis/api";

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async params =>
    await getClients({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    })
);

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    loading: false,
    count: 0,
    data: [],
  },
  reducer: {},
  extraReducers: {
    [fetchClients.pending.type]: state => {
      state.loading = true;
    },
    [fetchClients.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.count = payload.count;
      state.data = payload.data;
    },
  },
});

const { reducer } = clientSlice;

export default reducer;
