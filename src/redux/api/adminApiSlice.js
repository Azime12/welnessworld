import { apiSlice } from "./apiSlice";
import { SUPER_ADMIN_URL } from "../../constatants/apiConfig";

export const userDataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAmin: builder.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    updateAdmin: builder.mutation({
        query: (data) => ({
          url: `${SUPER_ADMIN_URL}/update`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["ADMIN"],
      }),
    getAdminData: builder.query({
      query: () => ({
        url: `${SUPER_ADMIN_URL}`,
        // params: { id: id },
      }),
      providesTags: ["ADMIN"],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/resetPassword`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
  changePassword: builder.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/passwordchange`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    activation: builder.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/activeDeactive`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
  
   
  }),
});

export const {
useAddAminMutation,
useUpdateAdminMutation,
useActivationMutation,
useResetPasswordMutation,
useGetAdminDataQuery,
useChangePasswordMutation,


} = userDataApiSlice;
