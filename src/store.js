import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/authSlice";
import candidatesReducer from "features/candidatesSlice";
import userPageReducer from "features/userPageSlice";
import locationReducer from "features/locationSlice";
import categoryReducer from "features/categorySlice";
import languageReducer from "features/languageSlice";
import nationalityReducer from "features/nationalitySlice";
import positionReducer from "features/positionSlice";
import degreeReducer from "features/degreeSlice";
import skillReducer from "features/skillSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidatesReducer,
    userPage: userPageReducer,
    location: locationReducer,
    category: categoryReducer,
    language: languageReducer,
    nationality: nationalityReducer,
    position: positionReducer,
    degree: degreeReducer,
    skill: skillReducer,
  },
});
