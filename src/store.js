import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/authSlice";
import candidatesReducer from "features/candidatesSlice";
import userPageReducer from "features/userPageSlice";
import locationReducer from "features/locationSlice";
import categoryReducer from "features/categorySlice";
import languageReducer from "features/languageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidatesReducer,
    userPage: userPageReducer,
    location: locationReducer,
    category: categoryReducer,
    language: languageReducer,
  },
});
