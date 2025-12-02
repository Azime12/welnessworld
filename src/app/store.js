// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../redux/api/apiSlice"; // RTK Query API
import userReducer from "../redux/slice/userSlice"; // Example slice
import authReducer from "../redux/slice/authSlice"; // Example slice

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add RTK Query reducer
    user: userReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});
