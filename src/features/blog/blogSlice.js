import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  blogs: [],
  error: null,

  readBlogLoading: false,
  readBlog: null,
  readBlogError: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogs: (state) => {
      state.loading = true;
      state.error = null;
    },

    getBlogsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.blogs = action.payload;
    },

    getBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    readBlog: (state) => {
      state.readBlogLoading = true;
      state.readBlogError = null;
    },

    readBlogSuccess: (state, action) => {
      state.readBlogLoading = false;
      state.readBlog = action.payload;
      state.readBlogError = null;
    },

    readBlogFailure: (state, action) => {
      state.readBlogLoading = false;
      state.readBlogError = action.payload;
    },

    clearBlogsError: (state) => {
      state.error = null;
    },

    clearReadBlogError: (state) => {
      state.readBlogError = null;
    },
  },
});

export const {
  getBlogs,
  getBlogsSuccess,
  getBlogsFailure,
  readBlog,
  readBlogSuccess,
  readBlogFailure,
  clearBlogsError,
  clearReadBlogError,
} = blogSlice.actions;

export default blogSlice.reducer;
