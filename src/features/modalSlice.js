import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowModal: false,
  type_modal: 0,
  title_modal: "",
  data: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.isShowModal = true;
      state.type_modal = payload.type;
      state.title_modal = payload.title;
      return state;
    },
    hideModal: () => {
      return initialState;
    },
    dataModal: (state, { payload }) => {
      state.data = payload;
    },
  },
});

const { reducer } = modalSlice;
export const { showModal, hideModal, dataModal } = modalSlice.actions;
export default reducer;
