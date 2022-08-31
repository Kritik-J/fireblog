import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },

    logout: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },

    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    register: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },

    googleAuth: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    googleAuthSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.message = action.payload.message;
    },

    googleAuthFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },

    loadUser: (state) => {
      // state.loading = true;
      state.error = null;
      state.message = null;
    },

    loadUserSuccess: (state, action) => {
      // state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    loadUserFailure: (state) => {
      // state.loading = false;
      state.isAuthenticated = false;
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
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  register,
  registerSuccess,
  registerFailure,
  googleAuth,
  googleAuthSuccess,
  googleAuthFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  clearError,
  clearMessage,
} = authSlice.actions;

export default authSlice.reducer;
