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
import schoolReducer from "features/schoolSlice";
import majorReducer from "features/majorSlice";
import modalReducer from "features/modalSlice";
import companyReducer from "features/companySlice";
import currencyReducer from "features/currencySlice";
import fileReducer from "features/fileSlice";
import clientReducer from "features/clientSlice";
import userReducer from "features/userSlice";

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
    school: schoolReducer,
    major: majorReducer,
    modal: modalReducer,
    company: companyReducer,
    currency: currencyReducer,
    file: fileReducer,
    client: clientReducer,
    user: userReducer,
  },
});
