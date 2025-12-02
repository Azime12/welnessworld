import { apiSlice } from "./apiSlice";

export const ReportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch coordinator additional work report
    getCoordinatorAdditionalWorkReport: builder.query({
      query: ({ startDate, endDate, page, limit }) =>
        `/additionalWorkEntry/coordinatorAdditionalWorkReport/${startDate}/${endDate}/${page}/${limit}`,
      //   transformResponse: (response) => response.data, // Optional: Extract and return the `data` property
      //   transformResponse: (response) => ({
      //     totalRecords: response.data.totalRecords,
      //     totalPages: response.data.totalPages,
      //     currentPage: response.data.currentPage,
      //     report: response.data.report.map((item) => ({
      //       id: item.additional_work_id,
      //       workName: item.additional_work_name,
      //       quantity: item.additional_work_quantity,
      //       startTime: item.additional_work_start_time,
      //       endTime: item.additional_work_end_time,
      //       date: item.additional_work_date,
      //       user: `${item.userFirstName} ${item.userLastName}`,
      //       role: item.userRole,
      //       group: item.groupName,
      //     })),
      //   }),
    }),

    // Endpoint for fetching coordinator work report
    getCoordinatorWorkReport: builder.query({
      query: ({ startDate, endDate }) =>
        `/workEntry/coordinatorWorkReport/${startDate}/${endDate}`,
      // transformResponse: (response) => response.data, // Optional: Extract and return the `data` property
    }),

    // Sector Additional Work Report
    getSectorAdditionalWorkReport: builder.query({
      query: ({ startDate, endDate, page = 1, limit = 10 }) =>
        `/additionalWorkEntry/sectorAdditionalWorkReport/${startDate}/${endDate}/${page}/${limit}`,
      // transformResponse: (response) => response.data,
    }),
    // /workEntry/subCityHeadReport/{startDate}/{endDate}
    // Sector Leader Work Report
    getSectorLeaderWorkReport: builder.query({
      query: ({ startDate, endDate }) =>
        `/workEntry/sectorLeaderWorkReport/${startDate}/${endDate}`,
    }),

    getSubCityHeadReport: builder.query({
      query: ({ startDate, endDate }) =>
        `/workEntry/subCityHeadReport/${startDate}/${endDate}`,
    }),
  }),
});

export const {
  useGetCoordinatorAdditionalWorkReportQuery,
  useGetCoordinatorWorkReportQuery,
  useGetSectorAdditionalWorkReportQuery,
  useGetSectorLeaderWorkReportQuery,
  useGetSubCityHeadReportQuery,
} = ReportApiSlice;
