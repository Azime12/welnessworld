// src/redux/api/userApiSlice.js
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // New endpoint for fetching user data
    getUserData: builder.query({
      query: () => "/users/userData",
      providesTags: ["User"],
    }),
    getPendingUsers: builder.query({
      query: () => "/users/pendingStatus",
      providesTags: ["User", { type: "User", id: "PENDING" }],
    }),
    getPendingAdmins: builder.query({
      query: () => "/users/adminPendingStatus",
      providesTags: ["User", { type: "User", id: "PENDING" }],
    }),
    getPendingHeads: builder.query({
      query: () => "/users/headPendingStatus",
      providesTags: ["User", { type: "User" }],
      // providesTags: ["User", { type: "User", id: "PENDING" }],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: (userData) => ({
        url: "/users/updateInfo",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPassword: builder.mutation({
      query: (userData) => ({
        url: "/users/updatePassword",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    //new
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["User"],
    }),

    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: "/users/reset-password",
        method: "POST",
        body: { password },
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the header
        },
      }),
    }),
    
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDataQuery,
  useGetPendingUsersQuery,
  useGetPendingAdminsQuery,
  useGetPendingHeadsQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useUpdateUserPasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApiSlice;
