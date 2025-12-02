// src/redux/api/professionApiSlice.js
import { apiSlice } from "./apiSlice";

export const professionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all professionals
    getProfessions: builder.query({
      query: () => "/professions",
      providesTags: [{ type: "Profession", id: "LIST" }],
    }),
    createProfession: builder.mutation({
      query: (newProfession) => ({
        url: "/professions",
        method: "POST",
        body: newProfession,
      }),
      invalidatesTags: [{ type: "Profession", id: "LIST" }],
    }),

    // Update profession information
    updateProfessionName: builder.mutation({
      query: ({ profession_id, profession_name }) => ({
        url: `/professions/updateName/${profession_id}`,
        method: "PATCH",
        body: { profession_name },
      }),
      invalidatesTags: [{ type: "Profession", id: "LIST" }],
    }),

    // Assign a professional to a profession
    assignProfessional: builder.mutation({
      query: ({ profession_id, new_professional_id }) => ({
        url: "/professions/assign",
        method: "PATCH",
        body: { profession_id, new_professional_id },
      }),
      invalidatesTags: [{ type: "Profession", id: "LIST" }],
    }),

    // Unassign a profession by user ID
    unassignProfession: builder.mutation({
      query: (user_id) => ({
        url: `/professions/unassign/${user_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "Profession", id: "LIST" }],
    }),

    // Reset profession password
    resetProfessionPassword: builder.mutation({
      query: (professionData) => ({
        url: "/professions/resetPassword",
        method: "PATCH",
        body: professionData,
      }),
      invalidatesTags: [{ type: "Profession", id: "LIST" }],
    }),

    // Fetch all professionals under the same division
    getAllProfessionals: builder.query({
      query: () => "/professions/allProfessionals",
      providesTags: [{ type: "Professional", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProfessionsQuery,
  useCreateProfessionMutation,
  useUpdateProfessionNameMutation,
  useAssignProfessionalMutation,
  useUnassignProfessionMutation,
  useResetProfessionPasswordMutation,
  useGetAllProfessionalsQuery,
} = professionApiSlice;
