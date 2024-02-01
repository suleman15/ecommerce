import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false,
};
export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export default theme.reducer;

export const { setTheme } = theme.actions;
