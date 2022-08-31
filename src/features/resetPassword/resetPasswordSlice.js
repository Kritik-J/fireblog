import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,

  reducers: {
    resetPassword: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },

    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    forgotPassword: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message;
    },

    forgotPasswordFailure: (state, action) => {
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
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailure,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  clearError,
  clearMessage,
} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
