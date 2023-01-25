import {
  persistReducer,
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resetPasswordReducer from "../features/resetPassword/resetPasswordSlice";
import createBlogReducer from "../features/createBlog/createBlogSlice";
import menuReducer from "../features/menu/menuSlice";
import blogReducer from "../features/blog/blogSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  createBlog: createBlogReducer,
  blog: blogReducer,
  menu: menuReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
