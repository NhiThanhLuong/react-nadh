import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage } from "_constants";

import { testLogin } from "ultis/api";

export const postLogin = createAsyncThunk(
  "auth/postLogin",
  async ({ username, password }) => await testLogin(username, password)
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: localStorage.getItem("token") || "",
    user_sent: localStorage.getItem("user_sent") || "",
    err: undefined,
  },
  reducers: {
    // login: (state, action) => {
    //   state.token = action?.payload?.token;
    //   state.info = action?.payload?.info;
    //   return state;
    // },
    cancelLoginFailed: state => {
      state.err = undefined;
      return state;
    },
    logout: state => {
      state.token = undefined;
      state.user_sent = undefined;
      localStorage.removeItem(storage.token);
      localStorage.removeItem(storage.user_sent);
      return state;
    },
  },
  extraReducers: {
    [postLogin.pending.type]: state => {
      state.loading = true;
    },
    [postLogin.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.err = undefined;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_sent", JSON.stringify(payload.user_sent));
      state.token = payload.token;
      state.user_sent = JSON.stringify(payload.user_sent);
    },
    [postLogin.rejected.type]: state => {
      state.loading = false;
      state.err = "Username or password is wrong!";
    },
  },
});

const { reducer } = authSlice;
export const { cancelLoginFailed, logout } = authSlice.actions;
export default reducer;
