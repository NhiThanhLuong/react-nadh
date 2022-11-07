import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCandidates,
  getDetailCandidate,
  putDetailCandidate,
} from "ultis/api";

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

export const fetchDetailCandidate = createAsyncThunk(
  "candidates/fetchDetailCandidate",
  getDetailCandidate
);

export const fetchEditDetailCandidate = createAsyncThunk(
  "candidates/putDetailCandidate",
  async ({ id, params }) => await putDetailCandidate(id, params)
);

export const authSlice = createSlice({
  name: "candidates",
  initialState: {
    loading: false,
    count: 0,
    data: [],
    detailData: undefined,
  },
  reducers: {},
  extraReducers: {
    // Get Candidates
    [fetchCandidates.pending.type]: state => {
      state.loading = true;
    },
    [fetchCandidates.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.count = payload.count;
      state.data = payload.data;
    },
    // Get Detail Candidate
    [fetchDetailCandidate.pending.type]: state => {
      state.loading = true;
    },
    [fetchDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      state.loading = false;
    },
    // Put Detail Candidate
    [fetchEditDetailCandidate.pending.type]: state => {
      state.loading = true;
    },
    [fetchEditDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.detailData = payload;
    },
  },
});

const { reducer } = authSlice;
export default reducer;