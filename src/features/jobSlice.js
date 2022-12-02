import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDetailJob, getJobs, postCandidateFlows } from "ultis/api";

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
  "job/fetchDetailJob",
  getDetailJob
);

export const postJobCandidateFlows = createAsyncThunk(
  "job/postJobCandidateFlows",
  postCandidateFlows
);

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    loading: false,
    loadingDetail: false,
    count: 0,
    data: [],
    detailData: undefined,
    filterIdCandidateList: 0,
  },
  reducers: {
    filterCandidateListByID: (state, { payload }) => {
      state.filterIdCandidateList = payload;
    },
    closeFilterTagCandidateList: state => {
      state.filterIdCandidateList = 0;
    },
  },
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

    // post job candidate flows
    [postJobCandidateFlows.pending.type]: state => {
      state.loadingDetail = true;
    },
    [postJobCandidateFlows.fulfilled.type]: (state, { payload }) => {
      state.detailData.candidate_flows = [
        ...state.detailData.candidate_flows,
        ...payload,
      ];
      state.loadingDetail = false;
    },
    [postJobCandidateFlows.rejected.type]: state => {
      state.loadingDetail = false;
    },
  },
});

const { reducer } = jobSlice;
export const { filterCandidateListByID, closeFilterTagCandidateList } =
  jobSlice.actions;
export default reducer;
