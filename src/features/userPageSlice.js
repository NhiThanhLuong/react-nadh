import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPage } from "ultis/api";

export const fetchUserPage = createAsyncThunk(
  "userPage/fetchUserPage",
  async params =>
    await getUserPage({
      params,
    })
);

export const userPageSlice = createSlice({
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
    [fetchUserPage.rejected.type]: state => {
      state.loading = true;
    },
  },
});

const { reducer } = userPageSlice;
export default reducer;
