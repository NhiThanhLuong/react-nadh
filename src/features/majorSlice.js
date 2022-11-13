import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPropertyValues, postPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

export const fetchMajors = createAsyncThunk(
  "major/fetchMajors",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "major",
      },
    })
);

export const postMajor = createAsyncThunk(
  "major/postMajor",
  async value =>
    await postPropertyValues({
      value,
      name: "major",
    })
);

export const majorSlice = createSlice({
  name: "major",
  initialState: {
    loading: false,
    majors: [],
  },
  reducers: {},
  extraReducers: {
    [fetchMajors.pending.type]: state => {
      state.loading = true;
    },
    [fetchMajors.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.majors = getPropertyKeyLabel(payload.data);
    },

    [postMajor.pending.type]: state => {
      state.loading = true;
    },
    [postMajor.fulfilled.type]: state => {
      state.loading = false;
      toast.success("Successfully Creates", {
        position: "top-right",
      });
    },
    [postMajor.rejected.type]: state => {
      state.loading = false;
      toast.error("Duplicated major value", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = majorSlice;
export default reducer;
