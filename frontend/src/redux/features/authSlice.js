import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    AuthSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    LogoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    AuthFinished: (state) => {
      state.loading = false;
    },
  },
});

export const {
  AuthSuccess,
  LogoutSuccess,
  AuthFinished,
} = authSlice.actions;

export default authSlice.reducer;