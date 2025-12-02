import { apiSlice } from "./apiSlice";

export const planApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all plans
    getSubService: builder.query({
      query: (main_service_id) => `/subService/${main_service_id}`,
      providesTags: [{ type: "Plan", id: "LIST" }],
    }),
    getAssignGroupsToKpi: builder.query({
      query: () => "/kpis/",
      providesTags: [{ type: "Plan", id: "LIST" }],
    }),
    getAllActivityInKpi: builder.query({
      query: (kpi_id) => `/activities/${kpi_id}`,
      providesTags: [{ type: "Plan", id: "LIST" }],
    }),
    createSupService: builder.mutation({
      query: (newSubService) => ({
        url: "/subService",
        method: "POST",
        body: newSubService,
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),
    assignGroupToKpi: builder.mutation({
      query: (groupData) => ({
        url: "/kpis/assign-kpis",
        method: "POST",
        body: groupData,
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),
    supServiceUpdate: builder.mutation({
      query: ({ sub_service_id, updatedSubService }) => {
        return {
          url: `/subService/${sub_service_id}`,  
          method: "PATCH",
          body: updatedSubService,  
        };
      },
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),
    
    GETPlanDetail: builder.query({
      query: (plan_id ) => {
        return {
          url: `/plans/${plan_id}/details`,  // Use plan_id in the URL
          method: "GET",
        };
      },
      providesTags: [{ type: "Plan", id: "LIST" }],
    }),
    
   

    // Delete a plan
    deleteSubService: builder.mutation({
      query: (sub_service_id) => ({
        url: `/subService/${sub_service_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Plan", id: "LIST" }],
    }),
  }),
});

export const {
useGetAllActivityInKpiQuery,
  useCreateSupServiceMutation,
  useAssignGroupToKpiMutation,
  useGetSubServiceQuery,
  useSupServiceUpdateMutation,
  useDeleteSubServiceMutation,
} = planApiSlice;
