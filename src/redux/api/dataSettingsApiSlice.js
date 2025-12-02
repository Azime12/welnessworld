// src/redux/api/dataSettingsApiSlice.js
import { apiSlice } from "./apiSlice";

export const dataSettingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsData: builder.query({
      query: (type) => ({
        url: `/list/${type}`,
        method: "GET",
      }),
      providesTags: ["List"],
    }),

   addSettingItem: builder.mutation({
  query: ({ type, columns }) => ({
    url: `/list`,
    method: "POST",
    body: { type, columns },
  }),
  invalidatesTags: ["List"],
}),



   updateSettingItem: builder.mutation({
  query: ({ type, oldValue, newValue }) => ({
    url: `/list/${type}`,
    method: "PUT",
    body: { oldValue, newValue }, // body will be JSON
  }),
  invalidatesTags: ["List"],
}),



    deleteSettingItem: builder.mutation({
      query: ({ type, value }) => ({
        url: `/list/${type}`,
        method: "DELETE",
        body: { value },
      }),
      invalidatesTags: ["List"],
    }),
  }),
});

export const {
  useGetSettingsDataQuery,
  useAddSettingItemMutation,
  useUpdateSettingItemMutation,
  useDeleteSettingItemMutation,
} = dataSettingsApiSlice;