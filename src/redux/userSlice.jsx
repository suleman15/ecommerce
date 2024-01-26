import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default user.reducer;

export const { setUser } = user.actions;
