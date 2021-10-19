import { configureStore } from "@reduxjs/toolkit";
import filemakerReducer from "./filemaker";
import formReducer from "./form";

export const store = configureStore({
  reducer: {
    filemaker: filemakerReducer,
    form: formReducer,
  },
});
