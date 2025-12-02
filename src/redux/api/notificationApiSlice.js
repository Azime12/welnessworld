// src/redux/api/notificationApiSlice.js
import { apiSlice } from "./apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersSeenByAdmin: builder.query({
      query: () => "/users/adminIsSeen",
      providesTags: ["Notifications"], // Changed to simpler tag
    }),

    removeIsSeenForUser: builder.mutation({
      query: (user_id) => ({
        url: `/users/removeIsSeen/${user_id}`,
        method: "PATCH", // Changed to PATCH as per your backend
      }),
      invalidatesTags: ["Notifications"], // Consistent tag
    }),
  }),
});

export const { useGetUsersSeenByAdminQuery, useRemoveIsSeenForUserMutation } =
  notificationApiSlice;
