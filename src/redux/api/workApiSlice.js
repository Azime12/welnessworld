import { apiSlice } from "./apiSlice";

export const planApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserReport: builder.query({
      query: ({ userId, currentDate }) => `/workEntry/userReport/${userId}/${currentDate}`,
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
   
    getAdditionalLattestTasks: builder.query({
      query: () => '/additionalWorkEntry/latestAdditionalWorkUserReport',
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getDataHierarcy: builder.query({
      query: () => '/users/userData',
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getAdditionalLattestTasksForGroup: builder.query({
      query: () => '/additionalWorkEntry/latestgroupAdditionalWorkReport',
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getAdditionalTasksForGroupWithDate: builder.query({
      query: ({currentDate }) => `/additionalWorkEntry/groupAdditionalWorkReport/${currentDate}`,
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    
    getAdditionalTasks: builder.query({
      query: ({ userId, currentDate }) => `/additionalWorkEntry/userAdditionWorkReport/${userId}/${currentDate}`,
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getLattestReport: builder.query({
      query: () => 'workEntry/latestUserReport',
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getGroupReport: builder.query({
      query: ({currentDate }) => `/workEntry/groupWorkReport/${currentDate}`,
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getGroupReportWithDateRange: builder.query({
      query: ({startDate,endDate}) => `/workEntry/groupWorkReportRange/${startDate}/${endDate}`,
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
    getGroupLattestReport: builder.query({
      query: () => `/workEntry/latestgroupWorkReport/`,
      providesTags: [{ type: "Report", id: "LIST" }],
    }),
  
    createWorkEntery: builder.mutation({
      query: (newWorkEntery) => ({
        url: "workEntry/register",
        method: "POST",
        body: newWorkEntery,
      }),
      invalidatesTags: [{ type: "Report", id: "LIST" }],
    }),
      
    createAdditionalWork: builder.mutation({
      query: (newWorkEntery) => ({
        url: "/additionalWorkEntry/additionalWorkRegister",
        method: "POST",
        body: newWorkEntery,
      }),
      invalidatesTags: [{ type: "Report", id: "LIST" }],
    }),

   
    
    
   

    // Delete a plan
  }),
});

export const {
  useGetGroupReportWithDateRangeQuery,
  useGetDataHierarcyQuery,
  useGetGroupLattestReportQuery,
  useGetGroupReportQuery,
  useGetAdditionalLattestTasksQuery,
  useGetAdditionalLattestTasksForGroupQuery,
  useGetAdditionalTasksForGroupWithDateQuery,
  useGetAdditionalTasksQuery,
  useCreateAdditionalWorkMutation,
  useCreateWorkEnteryMutation,
  useGetLattestReportQuery,
  useGetUserReportQuery,
  useUpdateTargetMutation,
  useDeleteTargetMutation,
} = planApiSlice;
