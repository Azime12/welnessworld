import { apiSlice } from "./apiSlice";

export const planApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Create a new plan (POST /plan)
    createPlan: builder.mutation({
      query: (body) => ({
        url: `/plan`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Plan"], // Invalidate cache after creation
    }),

    // 2. Get the plan (GET /plan)
    getPlan: builder.query({
      query: () => `/plan`,
      providesTags: ["Plan"], // Provide tag for caching
    }),

    // 3. Update the plan (PUT /plan)
    updatePlan: builder.mutation({
      query: (body) => ({
        url: `/plan`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Plan"], // Invalidate cache after update
    }),

    // 4. Get all unseen plans (GET /plan/unseen)
    getUnseenPlans: builder.query({
      query: () => `/plan/unseen`,
      providesTags: ["Plan"],
    }),

    // 5. Reject a plan by ID (PUT /plan/reject/{id})
    rejectPlan: builder.mutation({
      query: (id) => ({
        url: `/plan/reject/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Plan"],
    }),

    // 6. Accept a plan by ID (PUT /plan/accept/{id})
    acceptPlan: builder.mutation({
      query: (id) => ({
        url: `/plan/accept/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Plan"],
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetPlanQuery,
  useUpdatePlanMutation,
  useGetUnseenPlansQuery,
  useRejectPlanMutation,
  useAcceptPlanMutation,
} = planApiSlice;
