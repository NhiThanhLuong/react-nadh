import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues, postPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";
import { toast } from "react-toastify";

export const fetchNationality = createAsyncThunk(
  "nationality/fetchNationality",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "nationality",
      },
    })
);

export const postNationality = createAsyncThunk(
  "nationality/postNationality",
  async value =>
    await postPropertyValues({
      value,
      name: "nationality",
    })
);

export const nationalitySlice = createSlice({
  name: "nationality",
  initialState: {
    loading: false,
    nationalities: [],
  },
  reducers: {},
  extraReducers: {
    [fetchNationality.pending.type]: state => {
      state.loading = true;
    },
    [fetchNationality.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.nationalities = getPropertyKeyLabel(payload.data);
    },

    [postNationality.pending.type]: state => {
      state.loading = true;
    },
    [postNationality.fulfilled.type]: state => {
      state.loading = false;
      toast.success("Successfully Creates", {
        position: "top-right",
      });
    },
    [postNationality.rejected.type]: state => {
      state.loading = false;
      toast.error("Duplicated nationality value", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = nationalitySlice;
export default reducer;
