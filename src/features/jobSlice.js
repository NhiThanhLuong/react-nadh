import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailJob, getJobs } from "ultis/api";

export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async params =>
    await getJobs({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    })
);

export const fetchDetailJob = createAsyncThunk(
  "clients/fetchDetailJob",
  getDetailJob
);

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    loadingDetail: false,
    count: 0,
    data: [],
    detailData: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchJobs.pending.type]: state => {
      state.loading = true;
    },
    [fetchJobs.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.count = payload.count;
      state.data = payload.data;
    },
    [fetchJobs.rejected.type]: state => {
      state.loading = false;
    },

    // Get Detail Job
    [fetchDetailJob.pending.type]: state => {
      state.loading = true;
    },
    [fetchDetailJob.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      state.loading = false;
    },
    [fetchDetailJob.rejected.type]: state => {
      state.loading = false;
    },
  },
});

const { reducer } = jobSlice;
// export const { getPicItem, deletePicItem } = jobSlice.actions;
export default reducer;
