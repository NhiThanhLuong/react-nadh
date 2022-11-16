import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrencies } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  getCurrencies
);

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    loading: false,
    currencies: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCurrency.pending.type]: state => {
      state.loading = true;
    },
    [fetchCurrency.fulfilled.type]: (state, { payload }) => {
      state.loading = false;

      state.currencies = getPropertyKeyLabel(payload);
    },
  },
});

const { reducer } = currencySlice;
export default reducer;
