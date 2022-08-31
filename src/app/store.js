import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resetPasswordReducer from "../features/resetPassword/resetPasswordSlice";
import createBlogReducer from "../features/createBlog/createBlogSlice";
import menuReducer from "../features/menu/menuSlice";
import blogReducer from "../features/blog/blogSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resetPassword: resetPasswordReducer,
    createBlog: createBlogReducer,
    blog: blogReducer,
    menu: menuReducer,
  },
});
