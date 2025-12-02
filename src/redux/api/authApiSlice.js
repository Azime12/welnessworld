// src/redux/api/authApiSlice.js
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    signupAdmin: builder.mutation({
      query: (userData) => ({
        url: "/users/admin",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

    signupHead: builder.mutation({
      query: (userData) => ({
        url: "/users/head",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),

  }),
});

export const { useLoginMutation, useSignupMutation, useSignupAdminMutation, useSignupHeadMutation } = authApiSlice;
