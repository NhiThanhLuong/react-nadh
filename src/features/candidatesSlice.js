import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCandidates,
  getDetailCandidate,
  putDetailCandidate,
  postCandidate,
} from "ultis/api";
import { toast } from "react-toastify";

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

export const fetchPostCandidate = createAsyncThunk(
  "candidates/fetchPostCandidate",
  postCandidate
);

export const candidatesSlice = createSlice({
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
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [fetchEditDetailCandidate.rejected.type]: state => {
      state.loading = false;
      toast.error("Update error", {
        position: "top-right",
      });
    },
    // Post Candidate
    [fetchPostCandidate.pending.type]: state => {
      state.loading = true;
    },
    [fetchPostCandidate.fulfilled.type]: state => {
      state.loading = false;
      // state.detailData = payload;
      toast.success("Successfully Created Candidate", {
        position: "top-right",
      });
    },
    [fetchPostCandidate.rejected.type]: state => {
      state.loading = false;
      toast.error("Create error", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = candidatesSlice;
export default reducer;
