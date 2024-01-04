import { configureStore } from "@reduxjs/toolkit";
import { pdtReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";

export const store = configureStore({
  reducer: {
    pdtReducer,
    cartReducer
  }
});