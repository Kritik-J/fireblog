import { createSlice } from "@reduxjs/toolkit";

export const createBlogSlice = createSlice({
  name: "createBlog",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    createBlogRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    createBlogSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    createBlogFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  createBlogRequest,
  createBlogSuccess,
  createBlogFailure,
  clearError,
  clearMessage,
} = createBlogSlice.actions;

export default createBlogSlice.reducer;
