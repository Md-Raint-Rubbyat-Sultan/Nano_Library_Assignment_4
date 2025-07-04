import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/basiapi";
import modalToggalSlice from "../redux/features/modalToggal/modalToggal";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    toggal: modalToggalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
