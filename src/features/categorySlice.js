import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "ultis/api";

export const fetchIndustries = createAsyncThunk(
  "category/fetchIndustries",
  async params =>
    await getCategories({
      params,
    })
);

export const fetchSectors = createAsyncThunk(
  "category/fetchSectors",
  async params =>
    await getCategories({
      params,
    })
);

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async params =>
    await getCategories({
      params,
    })
);

export const authSlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    industries: [],
    sectors: [],
    categories: [],
  },
  reducers: {},
  extraReducers: {
    [fetchIndustries.pending.type]: state => {
      state.loading = true;
    },
    [fetchIndustries.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.industries = payload.data;
    },
    [fetchSectors.pending.type]: state => {
      state.loading = true;
    },
    [fetchSectors.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.sectors = payload.data;
    },
    [fetchCategory.pending.type]: state => {
      state.loading = true;
    },
    [fetchCategory.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
