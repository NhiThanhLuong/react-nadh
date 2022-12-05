import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCandidates,
  getDetailCandidate,
  putDetailCandidate,
  postCandidate,
  deleteCandidateHistories,
  postCandidateHistories,
  putCandidateHistories,
  getAssessmentsCompare,
  putCandidateFlowID,
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

export const fetchDetailCandidateNotLoading = createAsyncThunk(
  "candidates/fetchDetailCandidateNotLoading",
  getDetailCandidate
);

export const fetchEditDetailCandidate = createAsyncThunk(
  "candidates/fetchEditDetailCandidate",
  async ({ id, params }) => await putDetailCandidate(id, params)
);

export const putEditDetailCandidateNotLoading = createAsyncThunk(
  "candidates/putEditDetailCandidateNotLoading",
  async ({ id, params }) => await putDetailCandidate(id, params)
);

export const putLanguageDetailCandidate = createAsyncThunk(
  "candidates/putLanguageDetailCandidate",
  async ({ id, params }) => await putDetailCandidate(id, params)
);

export const putIndustryDetailCandidate = createAsyncThunk(
  "candidates/putIndustryDetailCandidate",
  async ({ id, params }) => await putDetailCandidate(id, params)
);

export const fetchPostCandidate = createAsyncThunk(
  "candidates/fetchPostCandidate",
  postCandidate
);

export const PostCandidateHistory = createAsyncThunk(
  "candidates/PostCandidateHistory",
  postCandidateHistories
);

export const putCandidateHistory = createAsyncThunk(
  "candidates/putCandidateHistory",
  async ({ id, params }) => await putCandidateHistories(id, params)
);

export const getObjAssessmentsCompare = createAsyncThunk(
  "candidates/getObjAssessmentsCompare",
  async params =>
    await getAssessmentsCompare({
      params,
    })
);

export const putCandidateFlowIDSlice = createAsyncThunk(
  "candidates/putCandidateFlowIDSlice",
  async ({ job_id, params }) => await putCandidateFlowID(job_id, params)
);

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    loading: false,
    loadingDetail: false,
    count: 0,
    data: [],
    detailData: undefined,
    history: {},
    assessmentCompare: {},
    flow: {},
  },
  reducers: {
    getHistory: (state, { payload: id }) => {
      state.history = state.detailData.histories.find(item => item.id === id);
    },
    deleteHistory: (state, { payload: id }) => {
      state.detailData.histories = state.detailData.histories.filter(
        item => item.id !== id
      );
      deleteCandidateHistories(id);
      toast.success("Delete candidate history successful", {
        position: "top-right",
      });
    },
    resetHistory: state => {
      state.history = {};
    },
    viewFlowJob: (state, { payload }) => {
      state.flow = payload;
    },
  },
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

    // Get Detail Candidate history
    [fetchDetailCandidateNotLoading.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
    },
    // Put Detail Candidate
    [fetchEditDetailCandidate.pending.type]: state => {
      state.loadingDetail = true;
    },
    [fetchEditDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.loadingDetail = false;
      state.detailData = payload;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [fetchEditDetailCandidate.rejected.type]: state => {
      state.loadingDetail = false;
      toast.error("Update error", {
        position: "top-right",
      });
    },

    // Put Detail Candidate not loading
    [putEditDetailCandidateNotLoading.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putEditDetailCandidateNotLoading.rejected.type]: () => {
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

    // Post Candidate History
    [PostCandidateHistory.fulfilled.type]: () => {
      toast.success("Successfully created candidate education", {
        position: "top-right",
      });
    },
    [PostCandidateHistory.rejected.type]: () => {
      toast.error("Create candidate education error", {
        position: "top-right",
      });
    },

    // Put Candidate History
    [putCandidateHistory.pending.type]: state => {
      state.loadingDetail = true;
    },
    [putCandidateHistory.fulfilled.type]: state => {
      state.loadingDetail = false;
      // state.detailData.histories = payload.histories;
      toast.success("Successfully candidate history updated", {
        position: "top-right",
      });
    },
    [putCandidateHistory.rejected.type]: state => {
      state.loadingDetail = false;
      toast.error("Duplicated candidate history Value", {
        position: "top-right",
      });
    },

    // Put Language
    [putLanguageDetailCandidate.pending.type]: state => {
      state.loadingDetail = true;
    },
    [putLanguageDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.loadingDetail = false;
      state.detailData.languages = payload.languages;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putLanguageDetailCandidate.rejected.type]: state => {
      state.loadingDetail = false;
      toast.error("Duplicated languages value", {
        position: "top-right",
      });
    },

    // Put Industry
    [putIndustryDetailCandidate.pending.type]: state => {
      state.loadingDetail = true;
    },
    [putIndustryDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.loadingDetail = false;
      state.detailData.business_line = payload.business_line;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putIndustryDetailCandidate.rejected.type]: state => {
      state.loadingDetail = false;
      toast.error("Duplicated Industry Value", {
        position: "top-right",
      });
    },

    // Get candidate and job from compare assessment
    [getObjAssessmentsCompare.pending.type]: state => {
      state.loadingDetail = true;
    },
    [getObjAssessmentsCompare.fulfilled.type]: (state, { payload }) => {
      state.loadingDetail = false;
      state.assessmentCompare = payload;
    },
    [getObjAssessmentsCompare.rejected.type]: state => {
      state.loadingDetail = false;
    },

    // Put Candidate Flow ID
    [putCandidateFlowIDSlice.pending.type]: state => {
      state.loadingDetail = true;
    },
    [putCandidateFlowIDSlice.fulfilled.type]: (state, { payload }) => {
      state.loadingDetail = false;
      state.detailData.flows = state.detailData.flows.map(item => {
        if (item.id === payload.id) return payload;
        return item;
      });
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putCandidateFlowIDSlice.rejected.type]: state => {
      state.loadingDetail = false;
      toast.error("Update error", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = candidatesSlice;
export const { getHistory, deleteHistory, resetHistory, viewFlowJob } =
  candidatesSlice.actions;
export default reducer;
