import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues, putDetailCandidate } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";
import { toast } from "react-toastify";

export const fetchSoftSkills = createAsyncThunk(
  "skill/fetchSoftSkills",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "soft_skills",
      },
    })
);

export const fetchFunctionSoftSkills = createAsyncThunk(
  "skill/fetchFunctionSoftSkills",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "functions_skills",
        parent_id: "null",
      },
    })
);

export const putSoftSkillDetailCandidate = createAsyncThunk(
  "skill/putSoftSkillDetailCandidate",
  async ({ id, params }) => await putDetailCandidate(id, params)
);

export const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    softSkills: [],
    functionSkills: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSoftSkills.pending.type]: state => {
      state.loading = true;
    },
    [fetchSoftSkills.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.softSkills = getPropertyKeyLabel(payload.data);
    },

    // Put Detail Candidate
    [putSoftSkillDetailCandidate.pending.type]: state => {
      state.loading = true;
    },
    [putSoftSkillDetailCandidate.fulfilled.type]: state => {
      state.loading = false;
      toast.success("Successfully updated", {
        position: "top-right",
      });
    },
    [putSoftSkillDetailCandidate.rejected.type]: state => {
      state.loading = false;
      toast.error("Duplicated Soft Skills value", {
        position: "top-right",
      });
    },
    // Fetch function skills

    [fetchFunctionSoftSkills.pending.type]: state => {
      state.loading = true;
    },
    [fetchFunctionSoftSkills.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.functionSkills = payload.data;
    },
  },
});

const { reducer } = skillSlice;
export default reducer;
