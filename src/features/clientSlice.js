import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getClients,
  getDetailClient,
  postComment,
  putDetailClient,
  putDetailClientTax,
  removeDetailClientPicItem,
} from "ultis/api";
import { toast } from "react-toastify";

export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async params =>
    await getClients({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    })
);

export const fetchDetailClient = createAsyncThunk(
  "clients/fetchDetailClient",
  getDetailClient
);

export const putDetailClientNotLoading = createAsyncThunk(
  "clients/putDetailClientNotLoading",
  async ({ id, params }) => await putDetailClient(id, params)
);

export const putDetailClientTaxCode = createAsyncThunk(
  "clients/putDetailClientTaxCode",
  async ({ id, tax_code }) => await putDetailClientTax(id, tax_code)
);

export const postCommentSlice = createAsyncThunk(
  "comment/postCommentSlice",
  async params =>
    await postComment({
      source: { module: "client", section: "detail" },
      ...params,
    })
);

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    loading: false,
    count: 0,
    data: [],
    detailData: undefined,
    pic_item: {},
  },
  reducers: {
    getPicItem: (state, { payload: id }) => {
      state.pic_item = state.detailData.pic.find(item => item.id === id);
    },
    deletePicItem: (state, { payload: id }) => {
      state.detailData.pic = state.detailData.pic.filter(
        item => item.id !== id
      );
      removeDetailClientPicItem(id);
      toast.success("Delete client contact person successful", {
        position: "top-right",
      });
    },
  },
  extraReducers: {
    [fetchClients.pending.type]: state => {
      state.loading = true;
    },
    [fetchClients.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.count = payload.count;
      state.data = payload.data;
    },

    // Get Detail Candidate
    [fetchDetailClient.pending.type]: state => {
      state.loading = true;
    },
    [fetchDetailClient.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      state.loading = false;
    },

    // put Detail Candidate not loading
    [putDetailClientNotLoading.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      toast.success("Updated successful", {
        position: "top-right",
      });
    },
    [putDetailClientNotLoading.rejected.type]: () => {
      toast.error("Updated error", {
        position: "top-right",
      });
    },

    // put Detail Candidate tax code
    [putDetailClientTaxCode.fulfilled.type]: (state, { payload }) => {
      state.detailData = payload;
      toast.success("Updated successful", {
        position: "top-right",
      });
    },
    [putDetailClientTaxCode.rejected.type]: () => {
      toast.error("Updated error", {
        position: "top-right",
      });
    },

    // Post Comment
    [postCommentSlice.fulfilled.type]: (state, { payload }) => {
      state.detailData.detail_comments = [
        payload,
        ...state.detailData.detail_comments,
      ];
      // toast.success("Commented successful", {
      //   position: "top-right",
      // });
    },
    [postCommentSlice.rejected.type]: () => {
      toast.error("comment error", {
        position: "top-right",
      });
    },
  },
});

const { reducer } = clientSlice;
export const { getPicItem, deletePicItem } = clientSlice.actions;
export default reducer;
