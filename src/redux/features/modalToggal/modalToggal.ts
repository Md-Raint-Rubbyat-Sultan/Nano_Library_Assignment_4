import type { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { open: boolean } = {
  open: false,
};

const modalToggalSlice = createSlice({
  name: "modalToggal",
  initialState,
  reducers: {
    toggal: (state) => {
      state.open = !state.open;
    },
  },
});

export const selectToggal = (state: RootState) => state.toggal.open;

export const { toggal } = modalToggalSlice.actions;

export default modalToggalSlice.reducer;
