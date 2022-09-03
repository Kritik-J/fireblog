import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  blogs: [],
  error: null,
  blogsNotFound: false,

  readBlogLoading: false,
  readBlog: null,
  readBlogError: null,
  readBlogNotFound: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogs: (state) => {
      state.loading = true;
      state.error = null;
      state.blogsNotFound = false;
    },

    getBlogsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.blogs = action.payload;
      state.blogsNotFound = false;
    },

    getBlogsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.blogsNotFound = true;
    },

    readBlog: (state) => {
      state.readBlogLoading = true;
      state.readBlogError = null;
      state.readBlogNotFound = false;
    },

    readBlogSuccess: (state, action) => {
      state.readBlogLoading = false;
      state.readBlog = action.payload;
      state.readBlogError = null;
      state.readBlogNotFound = false;
    },

    readBlogFailure: (state, action) => {
      state.readBlogLoading = false;
      state.readBlogError = action.payload;
      state.readBlogNotFound = true;
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
