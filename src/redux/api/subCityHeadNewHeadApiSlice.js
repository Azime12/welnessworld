import { apiSlice } from "./apiSlice";

export const subCityHeadNewHeadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Retrieve a list of all Heads
    getHeads: builder.query({
      query: () => "/committees",
      providesTags: [{ type: "Head", id: "LIST" }],
    }),

    // Create a new Head
    createHead: builder.mutation({
      query: (newHead) => ({
        url: "/committees",
        method: "POST",
        body: newHead,
      }),
      invalidatesTags: [{ type: "Head", id: "LIST" }],
    }),

    // Update Head information
    updateHeadName: builder.mutation({
      query: ({ committee_id, committee_name }) => ({
        url: `/committees/updateName/${committee_id}`,
        method: "PATCH",
        body: { committee_name },
      }),
      invalidatesTags: [{ type: "Head", id: "LIST" }],
    }),

    // Assign a new leader to a Head
    assignHeadLeader: builder.mutation({
      query: ({ committee_id, new_committee_leader_id }) => ({
        url: "/committees/assign",
        method: "PATCH",
        body: { committee_id, new_committee_leader_id },
      }),
      invalidatesTags: [{ type: "Head", id: "LIST" }],
    }),

    // Unassign a user by changing their status to pending
    unassignHeadUser: builder.mutation({
      query: (user_id) => ({
        url: `/committees/unassign/${user_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Head", id: "LIST" }],
    }),

    // Reset a Head leader's password to the default
    resetHeadPassword: builder.mutation({
      query: (committee_leader_id) => ({
        url: "/committees/resetPassword",
        method: "PATCH",
        body: committee_leader_id,
      }),
      invalidatesTags: [{ type: "Head", id: "LIST" }],
    }),

    // Fetch all Head leaders in the same Sub City
    getAllHeadLeaders: builder.query({
      query: () => "/committees/allCommitteeLeaders",
      providesTags: [{ type: "Head", id: "LIST" }],
    }),
  }),
});

export const {
  useGetHeadsQuery,
  useCreateHeadMutation,
  useUpdateHeadNameMutation,
  useAssignHeadLeaderMutation,
  useUnassignHeadUserMutation,
  useResetHeadPasswordMutation,
  useGetAllHeadLeadersQuery,
} = subCityHeadNewHeadApiSlice;
