/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCandidates,
  getDetailCandidate,
  putDetailCandidate,
  postCandidate,
  deleteCandidateHistories,
  postCandidateHistories,
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
  async params =>
    await postCandidateHistories({
      ...params,
      type: 1,
    })
);

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    loading: false,
    isDetailLoading: false,
    count: 0,
    data: [],
    detailData: undefined,
    history: {},
  },
  reducers: {
    getHistory: (state, { payload: id }) => {
      state.history = state.detailData.histories.find(item => item.id === id);
      return state;
    },
    deleteHistory: (state, { payload: id }) => {
      state.detailData.histories = state.detailData.histories.filter(
        item => item.id !== id
      );
      deleteCandidateHistories(id);
      toast.success("Delete candidate history successful", {
        position: "top-right",
      });
      return state;
    },
    resetHistory: state => {
      state.history = {};
      return state;
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
    [putLanguageDetailCandidate.pending.type]: state => {
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

    // Put Language
    [putLanguageDetailCandidate.pending.type]: state => {
      state.isDetailLoading = true;
    },
    [putLanguageDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.isDetailLoading = false;
      state.detailData.languages = payload.languages;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putLanguageDetailCandidate.rejected.type]: state => {
      state.isDetailLoading = false;
      toast.error("Duplicated languages value", {
        position: "top-right",
      });
    },

    // Put Industry
    [putIndustryDetailCandidate.pending.type]: state => {
      state.isDetailLoading = true;
    },
    [putIndustryDetailCandidate.fulfilled.type]: (state, { payload }) => {
      state.isDetailLoading = false;
      state.detailData.business_line = payload.business_line;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putIndustryDetailCandidate.rejected.type]: state => {
      state.isDetailLoading = false;
      toast.error("Duplicated Industry Value", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = candidatesSlice;
export const { getHistory, deleteHistory, resetHistory } =
  candidatesSlice.actions;
export default reducer;
