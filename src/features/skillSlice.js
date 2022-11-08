import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

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

export const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    softSkills: [],
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
  },
});

const { reducer } = skillSlice;
export default reducer;
