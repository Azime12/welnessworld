import { apiSlice } from "./apiSlice";
import { USERS_DATA_URL,SUPER_ADMIN_URL } from "../../constatants/apiConfig";

export const userDataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addData: builder.mutation({
      query: (data) => ({
        url: `${USERS_DATA_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Data"],
    }),
    getAllUserData: builder.query({
      query: (id) => ({
        url: `${USERS_DATA_URL}`,
        params: { id: id },
      }),
      providesTags: ["Data"],
    }),
    getUserDetail: builder.query({
      query: (id) => ({
        url: `${USERS_DATA_URL}/userInfo/${id}`,
        // params: { id: id },
      }),
      providesTags: ["Data"],
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: `${USERS_DATA_URL}/update/info`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Data"],
    }),
    updateSingleFile: builder.mutation({
      query: (data) => ({
        url: `${USERS_DATA_URL}/update/singleFile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Data"],
    }),
    addSingleFile: builder.mutation({
      query: (data) => ({
        url: `${USERS_DATA_URL}/add/singleFile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Data"],
    }),
    deleteSingleFile: builder.mutation({
      query: (data) => ({
        url: `${USERS_DATA_URL}/delete/singleFile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Data"],
    }),
    permision: builder.mutation({
      query: (data) => ({
        url: `${SUPER_ADMIN_URL}/permission`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Data"],
      
    }),
    getDataWithDateRange: builder.mutation({
      query:  (data)=> ({
        url: `${USERS_DATA_URL}/UserInfoTime`,
        method:'POST',
        body:data
      }),
      providesTags: ["Data"],
    }),
    getMyUserData: builder.query({
      query: () => ({
        url: `${USERS_DATA_URL}/adminUserInfo`,
      }),
      providesTags: ["Data"],
    }),
  }),
});

export const {
useAddDataMutation,
useGetAllUserDataQuery,
useUpdateInfoMutation,
useAddSingleFileMutation,
useDeleteSingleFileMutation,
useGetUserDetailQuery,
useUpdateSingleFileMutation,
usePermisionMutation,
useGetDataWithDateRangeMutation,
useGetMyUserDataQuery,

} = userDataApiSlice;
