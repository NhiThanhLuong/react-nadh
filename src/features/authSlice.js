import { createSlice } from "@reduxjs/toolkit";
import { storage } from "_constants";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem(storage.ACCESS_TOKEN)),
    info: JSON.parse(localStorage.getItem(storage.USER)) ?? {
      id: 1,
      name: "Trần Nguyễn Quỳnh Thi",
    },
  },
  reducers: {
    login: (state, action) => {
      state.token = action?.payload?.token;
      state.info = action?.payload?.info;
      return state;
    },
    logout: (state) => {
      state.token = undefined;
      state.info = undefined;
      localStorage.removeItem(storage.USER);
      localStorage.removeItem(storage.ACCESS_TOKEN);
      return state;
    },
  },
});

const { reducer } = authSlice;
export const { login, logout } = authSlice.actions;
export default reducer;
