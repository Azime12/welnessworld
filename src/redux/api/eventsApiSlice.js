import { apiSlice } from "./apiSlice";
import { API_TAGS } from "../../constants/apiTags";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing: Create Event
    createEvent: builder.mutation({
      query: (formData) => ({
        url: "/event",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [API_TAGS.EVENT],
    }),

    // New: Get All Events
    getEvents: builder.query({
      query: () => "/event",
      providesTags: [API_TAGS.EVENT], // Provides tag for caching
    }),

    // New: Get Events by Sector
    getEventsBySector: builder.query({
      query: () => `/event/sector`,
      providesTags: [API_TAGS.EVENT],
    }),

    // New: Delete Event by ID
    deleteEvent: builder.mutation({
      query: (event_id) => ({
        url: `/event/${event_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.EVENT],
    }),

    addSingleFileToEvent: builder.mutation({
      query: ({ event_id, formData }) => ({
        url: `/event/add/singleFile/${event_id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: [API_TAGS.EVENT],
    }),

    deleteSingleFileFromEvent: builder.mutation({
      query: ({ event_id, delete_file_name, column_name }) => ({
        url: `/event/delete/singleFile/${event_id}`, // event_id is a string
        method: "PATCH",
        body: {
          delete_file_name,
          column_name, // new field required by backend
        },
      }),
      invalidatesTags: [API_TAGS.EVENT],
    }),
    // New: Update Event
    updateEvent: builder.mutation({
      query: ({ event_id, ...patch }) => ({
        url: `/event/updateEvent/${event_id}`,
        method: "PATCH",
        body: patch, // The body will contain the fields to update
      }),
      invalidatesTags: [API_TAGS.EVENT],
    }),

    //
    // Event Report by Date Range
    eventReport: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/event/eventReport/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.EVENT],
    }),
    eventSectorReport: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/event/sector/eventReport/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.EVENT],
    }),
    // Add this in your API slice, next to eventReport
    trainingReport: builder.query({
      query: ({ isComplete, startDate, endDate }) => ({
        url: `/work/trainingReport/${isComplete}/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.TRAINING], // adjust based on your tagging strategy
    }),

    trainingSectorReport: builder.query({
      query: ({ isComplete, startDate, endDate }) => ({
        url: `/work/sector/trainingReport/${isComplete}/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.TRAINING], // adjust based on your tagging strategy
    }),

    getEventAdminReport: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/event/sector/eventAdminReport/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.EVENT],
    }),

    getEventSuperReport: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/event/eventSuperReport/${startDate}/${endDate}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.EVENT],
    }),

    getSectorReport: builder.query({
      query: (sectorName) => ({
        url: `/event/sector/${sectorName}`,
        method: "GET",
      }),
      providesTags: [API_TAGS.EVENT],
    }),
  }),
});

// Export the new hooks
export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventsBySectorQuery,
  useDeleteEventMutation,
  useAddSingleFileToEventMutation,
  useDeleteSingleFileFromEventMutation,
  useUpdateEventMutation,
  useEventReportQuery,
  useEventSectorReportQuery,
  useTrainingReportQuery,
  useTrainingSectorReportQuery,
  useGetEventAdminReportQuery,
  useGetEventSuperReportQuery,
  useGetSectorReportQuery,
} = eventsApiSlice;
