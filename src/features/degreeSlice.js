import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

export const fetchDegrees = createAsyncThunk(
  "degree/fetchDegrees",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "degree",
      },
    })
);

export const degreeSlice = createSlice({
  name: "degree",
  initialState: {
    loading: false,
    degrees: [],
  },
  reducers: {},
  extraReducers: {
    [fetchDegrees.pending.type]: state => {
      state.loading = true;
    },
    [fetchDegrees.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.degrees = getPropertyKeyLabel(payload.data);
    },
  },
});

const { reducer } = degreeSlice;
export default reducer;
