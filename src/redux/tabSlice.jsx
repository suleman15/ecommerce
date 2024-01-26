import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: "Login",
};
export const tab = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab(state, action) {
      state.active = action.payload;
    },
  },
});

export default tab.reducer;

export const { setTab } = tab.actions;
