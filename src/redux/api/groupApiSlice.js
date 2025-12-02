// src/redux/api/groupApiSlice.js
import { apiSlice } from "./apiSlice";

export const groupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all groups
    getGroups: builder.query({
      query: () => "/groups",
      providesTags: [{ type: "Group", id: "LIST" }],
    }),

    createGroup: builder.mutation({
      query: (newGroup) => ({
        url: "/groups",
        method: "POST",
        body: newGroup,
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),

    // Update group information
    updateGroupName: builder.mutation({
      query: ({ group_id, group_name }) => ({
        url: `/groups/updateName/${group_id}`,
        method: "PATCH",
        body: { group_name },
      }),
      invalidatesTags: [
        { type: "Group", id: "LIST" },
        { type: "User", id: "PENDING" },
      ],
    }),

    // Assign a group leader to a group
    assignGroupLeader: builder.mutation({
      query: ({ group_id, new_group_leader_id }) => ({
        url: "/groups/assign",
        method: "PATCH",
        body: { group_id, new_group_leader_id },
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),

    // Unassign a group by user ID
    unassignGroup: builder.mutation({
      query: (user_id) => ({
        url: `/groups/unassign/${user_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),

    // Reset group password
    resetGroupPassword: builder.mutation({
      query: (group_leader_id) => ({
        url: "/groups/resetPassword",
        method: "PATCH",
        body: group_leader_id,
      }),
      invalidatesTags: [{ type: "Group", id: "LIST" }],
    }),

    // Fetch all group leaders under the same division
    getAllGroupLeaders: builder.query({
      query: () => "/groups/allGroupLeaders",
      providesTags: [{ type: "GroupLeader", id: "LIST" }],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupNameMutation,
  useAssignGroupLeaderMutation,
  useUnassignGroupMutation,
  useResetGroupPasswordMutation,
  useGetAllGroupLeadersQuery,
} = groupApiSlice;
