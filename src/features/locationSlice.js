import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLocations } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

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

export const fetchDistricts = createAsyncThunk(
  "location/fetchDistricts",
  async params =>
    await getLocations({
      type: 2,
      params,
    })
);

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    loading: false,
    countries: [],
    cities: [],
    districts: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLocations.pending.type]: state => {
      state.loading = true;
    },
    [fetchLocations.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.countries = getPropertyKeyLabel(payload.data);
    },

    [fetchCities.pending.type]: state => {
      state.loading = true;
    },
    [fetchCities.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.cities = payload.data;
    },

    [fetchDistricts.pending.type]: state => {
      state.loading = true;
    },
    [fetchDistricts.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.districts = payload.data;
    },
  },
});

const { reducer } = locationSlice;
export default reducer;
