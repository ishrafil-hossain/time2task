import { BaseApi } from "../BaseApi/BaseApi";

export const UseScheduleApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get schedule data with filters
    getSchedule: builder.query({
      query: (args) => {
        const { start_date, end_date, shift_id, department_id, status, page, limit } = args || {};

        const query = {
          url: "/schedule",
          params: {},
        };

        if (start_date) query.params.start_date = start_date;
        if (end_date) query.params.end_date = end_date;
        if (shift_id) query.params.shift_id = shift_id;
        if (department_id) query.params.department_id = department_id;
        if (status) query.params.status = status;
        if (page) query.params.page = page;
        if (limit) query.params.limit = limit;

        return query;
      },
      providesTags: ["Schedule"],
    }),

    // Get single schedule by ID
    getScheduleById: builder.query({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),

    // Create new schedule
    addSchedule: builder.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Schedule"],
    }),

    // Update schedule
    updateSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/schedule/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Schedule"],
    }),

    // Delete schedule
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schedule"],
    }),
  }),
});

export const {
  useGetScheduleQuery,
  useGetScheduleByIdQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = UseScheduleApi;