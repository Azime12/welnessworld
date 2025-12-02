import { apiSlice } from './apiSlice';

export const certificateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorks: builder.query({
      query: () => '/work',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ work_history_id }) => ({ type: 'Work', id: work_history_id })),
              { type: 'Work', id: 'LIST' },
              'Profile'
            ]
          : [{ type: 'Work', id: 'LIST' }, 'Profile'],
    }),

    getWorkById: builder.query({
      query: (id) => `/work/${id}`,
      providesTags: (result, error, id) => [{ type: 'Work', id }, 'Profile'],
    }),
 getWorkCertificateByProfileId: builder.query({
      query: (profileId) => `/work/${profileId}`,
      providesTags: (result, error, profileId) => [{ type: 'Work', profileId }, 'Profile'],
    }),
    createWork: builder.mutation({
      query: (formData) => ({
        url: '/work',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Work', 'Profile'],
    }),

    updateWork: builder.mutation({
      query: ({ work_history_id, formData }) => ({
        url: `/work/${work_history_id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { work_history_id }) => [
        { type: 'Work', id: work_history_id },
        'Profile'
      ],
    }),

    deleteWork: builder.mutation({
      query: (work_history_id) => ({
        url: `/work/${work_history_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Work', 'Profile'],
    }),

    getProfile: builder.query({
      query: (phone) => `/profile/phone/${phone}`,
      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetWorksQuery,
  useGetWorkByIdQuery,
  useCreateWorkMutation,
  useUpdateWorkMutation,
  useDeleteWorkMutation,
  useGetProfileQuery,
  useGetWorkCertificateByProfileIdQuery,
} = certificateApiSlice;