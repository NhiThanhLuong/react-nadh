import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFile, postFile } from "ultis/api";
import { URL_FILE } from "ultis/const";

export const fetchFiles = createAsyncThunk(
  "file/fetchFiles",
  async params =>
    await getFile({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    })
);

export const fetchPostFile = createAsyncThunk("file/postFile", postFile);

export const fileSlice = createSlice({
  name: "file",
  initialState: {
    loading: false,
    file: {},
    files: [],
  },
  reducers: {},
  extraReducers: {
    [fetchFiles.pending.type]: state => {
      state.loading = true;
    },
    [fetchFiles.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.files = payload.data.map(item => {
        const newItem = { ...item, status: "done", uid: item.id };
        if (item.ext === ".jpg")
          return {
            ...newItem,
            thumbUrl: `${URL_FILE}/${item.id}`,
          };
        return newItem;
      });
    },
    [fetchFiles.rejected.type]: state => {
      state.loading = false;
    },

    [fetchPostFile.pending.type]: state => {
      state.loading = true;
    },
    [fetchPostFile.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.file = payload;
    },
    [fetchPostFile.rejected.type]: state => {
      state.loading = false;
    },
  },
});

const { reducer } = fileSlice;
export default reducer;
