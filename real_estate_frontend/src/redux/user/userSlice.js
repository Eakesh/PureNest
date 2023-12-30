import { createSlice } from "@reduxjs/toolkit";
import { trusted } from "mongoose";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  signUperror: null,
  signUploading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    Logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    signUpStart: (state) => {
      state.signUploading = true;
    },
    signUpComplete: (state) => {
      state.signUploading = false;
      state.signUperror = null;
    },
    signUpFailure: (state, action) => {
      state.signUploading = false;
      state.signUperror = action.payload;
    },
  },
});

export const {
  SignInStart,
  signInFailure,
  signInSuccess,
  Logout,
  signUpStart,
  signUpComplete,
  signUpFailure,
} = userSlice.actions;
export default userSlice.reducer;
