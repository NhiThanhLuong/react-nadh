import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getClients,
  getDetailClient,
  putDetailClient,
  putDetailClientTax,
} from "ultis/api";
import { toast } from "react-toastify";

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

export const fetchDetailClient = createAsyncThunk(
  "clients/fetchDetailClient",
  getDetailClient
);

export const putDetailClientNotLoading = createAsyncThunk(
  "clients/putDetailClientNotLoading",
  async ({ id, params }) => await putDetailClient(id, params)
);

export const putDetailClientTaxCode = createAsyncThunk(
  "clients/putDetailClientTaxCode",
  async ({ id, tax_code }) => await putDetailClientTax(id, tax_code)
);

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    loading: false,
    count: 0,
    data: [],
    detailData: undefined,
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

    // Get Detail Candidate
    [fetchDetailClient.pending.type]: state => {
      state.loading = true;
    },
    [fetchDetailClient.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      state.loading = false;
    },

    // put Detail Candidate not loading
    [putDetailClientNotLoading.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      toast.success("Updated successful", {
        position: "top-right",
      });
    },
    [putDetailClientNotLoading.rejected.type]: () => {
      toast.error("Updated error", {
        position: "top-right",
      });
    },

    // put Detail Candidate tax code
    [putDetailClientTaxCode.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      toast.success("Updated successful", {
        position: "top-right",
      });
    },
    [putDetailClientTaxCode.rejected.type]: () => {
      toast.error("Updated error", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = clientSlice;

export default reducer;
