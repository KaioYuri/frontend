import { configureStore } from "@reduxjs/toolkit";
import { createStoreHook } from "react-redux";
import imageUploadSlice from "./features/ImageUploadSlice";

export const store = configureStore({
  reducer: {
    imageUpload: imageUploadSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
