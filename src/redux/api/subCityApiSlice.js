import { apiSlice } from "./apiSlice";

export const SubcityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all subcities (Subcitys)
    getSubcities: builder.query({
      query: () => "/subcities",
      providesTags: [{ type: "Subcity", id: "LIST" }],
    }),

    // Create a new subcity (Subcity)
    createSubcity: builder.mutation({
      query: (newSubcity) => ({
        url: "/subcities",
        method: "POST",
        body: newSubcity,
      }),
      invalidatesTags: [{ type: "Subcity", id: "LIST" }],
    }),

    // Update subcity (Subcity) name
    updateSubcityName: builder.mutation({
      query: ({ subcity_id, subcity_name }) => ({
        url: `/subcities/updateName/${subcity_id}`,
        method: "PATCH",
        body: { subcity_name },
      }),
      invalidatesTags: [{ type: "Subcity", id: "LIST" }],
    }),

    // Assign a new Subcity leader to a division
    assignSubcityLeader: builder.mutation({
      query: ({ subcity_id, new_subcity_leader_id }) => ({
        url: "/subcities/assign",
        method: "PATCH",
        body: { subcity_id, new_subcity_leader_id },
      }),
      invalidatesTags: [{ type: "Subcity", id: "LIST" }, "UserSeen"],
    }),

    // Unassign a user from a subcity (Subcity)  UserSeen
    unassignSubcity: builder.mutation({
      query: (user_id) => ({
        url: `/subcities/unassign/${user_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Subcity", id: "LIST" }],
    }),

    // Reset the password for a subcity leader
    resetSubcityPassword: builder.mutation({
      query: (subcity_leader_id) => ({
        url: "/subcities/resetPassword",
        method: "PATCH",
        body: subcity_leader_id,
      }),
      invalidatesTags: [{ type: "Subcity", id: "LIST" }],
    }),

    // Fetch all subcity (Subcity) leaders
    getAllSubcityLeaders: builder.query({
      query: () => "/subcities/allSubcityLeaders",
      providesTags: [{ type: "SubcityLeader", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSubcitiesQuery,
  useCreateSubcityMutation,
  useUpdateSubcityNameMutation,
  useAssignSubcityLeaderMutation,
  useUnassignSubcityMutation,
  useResetSubcityPasswordMutation,
  useGetAllSubcityLeadersQuery,
} = SubcityApiSlice;
