import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserPage, putUserPage } from "ultis/api";

export const fetchUserPage = createAsyncThunk(
  "userPage/fetchUserPage",
  async params =>
    await getUserPage({
      params,
    })
);

export const putUserPageSlice = createAsyncThunk(
  "userPage/putUserPageSlice",
  putUserPage
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

    // put user page when change columns
    [putUserPageSlice.pending.type]: state => {
      state.loading = true;
    },
    [putUserPageSlice.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    },
    [putUserPageSlice.rejected.type]: state => {
      state.loading = true;
    },
  },
});

const { reducer } = userPageSlice;
export default reducer;
