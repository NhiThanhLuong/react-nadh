import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModal: false,
  type_modal: 0,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload: type_modal }) => {
      state.isShowModal = true;
      state.type_modal = type_modal;
      return state;
    },
    hideModal: () => {
      return initialState;
    },
  },
});

const { reducer } = modalSlice;
export const { showModal, hideModal } = modalSlice.actions;
export default reducer;
