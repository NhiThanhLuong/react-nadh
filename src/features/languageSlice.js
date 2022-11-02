import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues } from "ultis/api";

export const fetchLanguages = createAsyncThunk(
  "language/fetchLanguages",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "language",
      },
    })
);

export const authSlice = createSlice({
  name: "language",
  initialState: {
    loading: false,
    languages: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLanguages.pending.type]: state => {
      state.loading = true;
    },
    [fetchLanguages.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.languages = payload.data?.map(({ key, label }) => ({
        key,
        label,
      }));
    },
  },
});

const { reducer } = authSlice;
export default reducer;
