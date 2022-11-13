import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPropertyValues, postPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

export const fetchSchools = createAsyncThunk(
  "school/fetchSchools",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "school",
      },
    })
);

export const postSchool = createAsyncThunk(
  "school/postSchool",
  async value =>
    await postPropertyValues({
      value,
      name: "school",
    })
);

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    loading: false,
    schools: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSchools.pending.type]: state => {
      state.loading = true;
    },
    [fetchSchools.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.schools = getPropertyKeyLabel(payload.data);
    },

    [postSchool.pending.type]: state => {
      state.loading = true;
    },
    [postSchool.fulfilled.type]: state => {
      state.loading = false;
      toast.success("Successfully Creates", {
        position: "top-right",
      });
    },
    [postSchool.rejected.type]: state => {
      state.loading = false;
      toast.error("Duplicated school value", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = schoolSlice;
export default reducer;
