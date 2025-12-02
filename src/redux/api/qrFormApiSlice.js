// src/redux/api/qrCodeApiSlice.js
import { apiSlice } from "./apiSlice";

export const qrCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. GET QR Form
    getQrForm: builder.query({
      query: (event_id) => ({
        url: `/event/qrform/${event_id}`,
        method: "GET",
      }),
      providesTags: ["QrForm"],
    }),
  getQrFormByEventId: builder.query({
      query: (event_id) => `/event/${event_id}`,
      providesTags: ["QrForm"],
    }),
    // 2. POST QR Form Submission
    submitQrForm: builder.mutation({
      query: (formData) => ({
        url: `/event/qrform`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["QrForm"],
    }),
  }),
});

export const {
  useGetQrFormQuery,
  useSubmitQrFormMutation,
  useGetQrFormByEventIdQuery,
} = qrCodeApiSlice;
