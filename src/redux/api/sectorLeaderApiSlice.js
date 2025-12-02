import { apiSlice } from "./apiSlice";

export const sectorLeaderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all divisions in the same sector
    getDivisions: builder.query({
      query: () => "/divisions",
      providesTags: [{ type: "Division", id: "LIST" }],
    }),

    // Create a new division
    createDivision: builder.mutation({
      query: (newDivision) => ({
        url: "/divisions",
        method: "POST",
        body: newDivision,
      }),
      invalidatesTags: [{ type: "Division", id: "LIST" }],
    }),

    // Fetch all Coordinators in the same sector
    getAllCoordinators: builder.query({
      query: () => "/divisions/allCoordinators",
      providesTags: [{ type: "Coordinator", id: "LIST" }],
    }),

    // Update division information
    updateDivisionName: builder.mutation({
      query: ({ division_id, division_name }) => ({
        url: `/divisions/updateName/${division_id}`,
        method: "PATCH",
        body: { division_name },
      }),
      invalidatesTags: [{ type: "Division", id: "LIST" }],
    }),

    // Assign a new Coordinator to a division
    assignCoordinator: builder.mutation({
      query: ({ division_id, new_coordinator_id }) => ({
        url: "/divisions/assign",
        method: "PATCH",
        body: { division_id, new_coordinator_id },
      }),
      invalidatesTags: [{ type: "Division", id: "LIST" }],
    }),

    // Unassign a user by changing their status to pending
    unassignDivisionUser: builder.mutation({
      query: (user_id) => ({
        url: `/divisions/unassign/${user_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Division", id: "LIST" }],
    }),

    // Reset a Coordinator's password to the default
    resetCoordinatorPassword: builder.mutation({
      query: (coordinator_id) => ({
        url: "/divisions/resetPassword",
        method: "PATCH",
        body: coordinator_id,
      }),
      invalidatesTags: [{ type: "Coordinator", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDivisionsQuery,
  useCreateDivisionMutation,
  useGetAllCoordinatorsQuery,
  useUpdateDivisionNameMutation,
  useAssignCoordinatorMutation,
  useUnassignDivisionUserMutation,
  useResetCoordinatorPasswordMutation,
} = sectorLeaderApiSlice;
