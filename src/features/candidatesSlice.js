import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCandidates } from "ultis/api";

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async params =>
    await getCandidates({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    })
);

export const authSlice = createSlice({
  name: "candidates",
  initialState: {
    loading: false,
    count: 0,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCandidates.pending.type]: state => {
      state.loading = true;
    },
    [fetchCandidates.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.count = payload.count;
      state.data = payload.data;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
