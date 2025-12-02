// src/redux/api/profileApiSlice.js
import { apiSlice } from "./apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔥 Create profile (multipart/form-data)
    createProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "POST",
        body: formData,
      }),
    }),
    sendEmail: builder.mutation({
      query: (emailData) => ({
        url: "/users/sendBulkEmail",
        method: "POST",
        body: emailData,
      }),
    }),

    // 👀 Get all profiles
    getProfiles: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
     getSectorName: builder.query({
      query: () => "/users/sectorName",
      providesTags: ["Profile"],
    }),


    // 🎯 Get profile by ID
    getProfileById: builder.query({
      query: (id) => `/profile/${id}`,
      providesTags: ["Profile"],
    }),

    // 📞 Get profile by phone number
 // 📞 Get profile by phone number
// 👀 Get profile by phone number
getProfileByPhone: builder.query({
  query: (phone) => `/profile/User/${phone}`,
  providesTags: (_result, _error, phone) => [{ type: "Profile", id: phone }],
}),


    // 🧑‍💻 Get profile by admin username
    getProfileByAdmin: builder.query({
      query: (username) => `/profile/admin/${username}`,
    }),
getAllProfileForSector: builder.query({
      query: () => '/profile/admin/sector',
    }),
    // ✍️ Update personal info
   updatePersonalInfo: builder.mutation({
  query: (payload) => ({
    url: "/profile/updatePersonalInfo",
    method: "PATCH",
    body: payload,
  }),
  invalidatesTags: (_result, _error, arg) =>
    arg?.phone ? [{ type: "Profile", id: arg.phone }] : ["Profile"],
}),


    // 📎 Update single file (multipart/form-data)
    updateSingleFile: builder.mutation({
      query: (formData) => ({
        url: "/profile/update/singleFile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

   resetPasswordCoders: builder.mutation({
  query: (phoneNumber) => ({
    url: `users/resetPassword/${phoneNumber}`,
    method: "PATCH",
  }),
  // invalidatesTags: ["Profile"],
}),
    // ❌ Delete profile
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useCreateProfileMutation,
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useGetProfileByPhoneQuery,
  useGetProfileByAdminQuery,
  useUpdatePersonalInfoMutation,
  useUpdateSingleFileMutation,
  useDeleteProfileMutation,
  useGetAllProfileForSectorQuery,
  useSendEmailMutation,
  useGetSectorNameQuery,
  useResetPasswordCodersMutation,
} = profileApiSlice;
