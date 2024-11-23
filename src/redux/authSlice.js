import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token; // Store the token after login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null; // Remove token on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
