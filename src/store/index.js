import { configureStore } from "@reduxjs/toolkit";
import filemakerReducer from "./filemaker";

export const store = configureStore({
  reducer: {
    filemaker: filemakerReducer,
  },
});
