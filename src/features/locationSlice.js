import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocations } from "ultis/api";

export const fetchLocations = createAsyncThunk(
  "location/fetchLocations",
  async params =>
    await getLocations({
      params,
    })
);

export const fetchCities = createAsyncThunk(
  "location/fetchCities",
  async params =>
    await getLocations({
      params,
    })
);

export const authSlice = createSlice({
  name: "location",
  initialState: {
    loading: false,
    countries: [],
    cities: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLocations.pending.type]: state => {
      state.loading = true;
    },
    [fetchLocations.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.countries = payload.data?.map(({ key, label }) => ({
        key,
        label,
      }));
    },
    [fetchCities.pending.type]: state => {
      state.loading = true;
    },
    [fetchCities.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.cities = payload.data;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
