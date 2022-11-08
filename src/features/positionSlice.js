import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues, postPropertyPosition } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";
import { toast } from "react-toastify";

export const fetchPosition = createAsyncThunk(
  "position/fetchPosition",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "position",
      },
    })
);

export const postPosition = createAsyncThunk(
  "position/postPosition",
  postPropertyPosition
);

export const positionSlice = createSlice({
  name: "position",
  initialState: {
    loading: false,
    positions: [],
  },
  reducers: {},
  extraReducers: {
    [fetchPosition.pending.type]: state => {
      state.loading = true;
    },
    [fetchPosition.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.positions = getPropertyKeyLabel(payload.data);
    },

    [postPosition.pending.type]: state => {
      state.loading = true;
    },
    [postPosition.fulfilled.type]: state => {
      state.loading = false;
      toast.success("Successfully Creates", {
        position: "top-right",
      });
    },
    [postPosition.rejected.type]: state => {
      state.loading = false;
      toast.error("Duplicated position value", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = positionSlice;
export default reducer;
