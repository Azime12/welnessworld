import { apiSlice } from "./apiSlice";

export const PublicReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for fetching public report
    getNumberReport: builder.query({
      query: () => `/users/numberReport`,
    }),
  }),
});

export const { useGetNumberReportQuery } = PublicReportApiSlice;
