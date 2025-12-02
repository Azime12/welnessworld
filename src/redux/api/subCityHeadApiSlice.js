import { apiSlice } from "./apiSlice";

export const subCityHeadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Retrieve a list of all Sectors
    getSectors: builder.query({
      query: () => "/sectors",
      providesTags: [{ type: "Sector", id: "LIST" }],
    }),

    // Create a new Sector
    createSector: builder.mutation({
      query: (newSector) => ({
        url: "/sectors",
        method: "POST",
        body: newSector,
      }),
      invalidatesTags: [{ type: "Sector", id: "LIST" }],
    }),

    // Update Sector information
    updateSectorName: builder.mutation({
      query: ({ sector_id, sector_name }) => ({
        url: `/sectors/updateName/${sector_id}`,
        method: "PATCH",
        body: { sector_name },
      }),
      invalidatesTags: [{ type: "Sector", id: "LIST" }],
    }),

    // Assign a new leader to a Sector
    assignSectorLeader: builder.mutation({
      query: ({ sector_id, new_sector_leader_id }) => ({
        url: "/sectors/assign",
        method: "PATCH",
        body: { sector_id, new_sector_leader_id },
      }),
      invalidatesTags: [{ type: "Sector", id: "LIST" }, "UserSeen"],
    }),

    // Unassign a user by changing their status to pending
    unassignSectorUser: builder.mutation({
      query: (user_id) => ({
        url: `/sectors/unassign/${user_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Sector", id: "LIST" }],
    }),

    // Reset a Sector leader's password to the default
    resetSectorPassword: builder.mutation({
      query: (sector_leader_id) => ({
        url: "/sectors/resetPassword",
        method: "PATCH",
        body: sector_leader_id,
      }),
      invalidatesTags: [{ type: "Sector", id: "LIST" }],
    }),

    // Fetch all Sector leaders in the same Sub City
    getAllSectorLeaders: builder.query({
      query: () => "/sectors/allSectorLeaders",
      providesTags: [{ type: "Sector", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSectorsQuery,
  useCreateSectorMutation,
  useUpdateSectorNameMutation,
  useAssignSectorLeaderMutation,
  useUnassignSectorUserMutation,
  useResetSectorPasswordMutation,
  useGetAllSectorLeadersQuery,
} = subCityHeadApiSlice;
