import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPage } from "ultis/api";

export const fetchUserPage = createAsyncThunk(
  "userPage/fetchUserPage",
  async params =>
    await getUserPage({
      params,
    })
);

export const authSlice = createSlice({
  name: "userPage",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchUserPage.pending.type]: state => {
      state.loading = true;
    },
    [fetchUserPage.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
