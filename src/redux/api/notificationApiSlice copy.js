// src/redux/api/notificationApiSlice.js
import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET /users/adminIsSeen
    getUsersSeenByAdmin: builder.query({
      query: () => "/users/adminIsSeen",
      providesTags: ["UserSeen"],
    }),

    // 2. GET /users/removeIsSeen/{user_id}
    removeIsSeenForUser: builder.mutation({
      query: (user_id) => ({
        url: `/users/removeIsSeen/${user_id}`,
        method: "GET", // Since your backend expects GET — not typical, but okay
      }),
      invalidatesTags: ["UserSeen"], // To refetch getUsersSeenByAdmin
    }),
  }),
});

export const { useGetUsersSeenByAdminQuery, useRemoveIsSeenForUserMutation } =
  notificationApiSlice;
