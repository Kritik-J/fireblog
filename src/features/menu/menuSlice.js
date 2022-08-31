import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileMenu: false,
};

const menuSlice = createSlice({
  name: "menu",

  initialState,

  reducers: {
    openProfileMenu: (state) => {
      state.profileMenu = true;
    },

    closeProfileMenu: (state) => {
      state.profileMenu = false;
    },

    toggleProfileMenu: (state) => {
      state.profileMenu = !state.profileMenu;
    },
  },
});

export const { openProfileMenu, closeProfileMenu, toggleProfileMenu } =
  menuSlice.actions;

export default menuSlice.reducer;
