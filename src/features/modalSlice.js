import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
  },
  reducers: {
    showModal: state => {
      state.showModal = true;
      return state;
    },
    hideModal: state => {
      state.showModal = false;
      return state;
    },
  },
});

const { reducer } = modalSlice;
export const { showModal, hideModal } = modalSlice.actions;
export default reducer;
