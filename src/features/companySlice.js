import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPropertyValues, postPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

export const fetchCompanys = createAsyncThunk(
  "company/fetchCompanys",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "company",
      },
    })
);

export const postCompany = createAsyncThunk(
  "company/postCompany",
  async value =>
    await postPropertyValues({
      value,
      name: "company",
    })
);

export const companySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    companys: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCompanys.pending.type]: state => {
      state.loading = true;
    },
    [fetchCompanys.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.companys = getPropertyKeyLabel(payload.data);
    },

    [postCompany.pending.type]: state => {
      state.loading = true;
    },
    [postCompany.fulfilled.type]: state => {
      state.loading = false;
      toast.success("Successfully Creates", {
        position: "top-right",
      });
    },
    [postCompany.rejected.type]: state => {
      state.loading = false;
      toast.error("Duplicated company value", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = companySlice;
export default reducer;
