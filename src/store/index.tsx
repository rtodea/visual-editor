import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { drawablesSlice } from "@/store/slices/drawables";

const makeStore = () =>
  configureStore({
    reducer: {
      [drawablesSlice.name]: drawablesSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
