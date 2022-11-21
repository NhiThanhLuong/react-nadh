import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "ultis/api";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async params =>
    await getUsers({
      params: {
        ...params,
        getAll: true,
      },
    })
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: state => {
      state.loading = true;
    },
    [fetchUsers.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
