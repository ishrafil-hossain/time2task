import { BaseApi } from "../BaseApi/BaseApi";

export const useDailyTimesheetApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get role data

    //post role data
    getDailyTimesheetApi: builder.query({
      query: ({ start_date, end_date, user_id, time_zone, page, limit }) => {
        const params = new URLSearchParams(
          Object.entries({
            start_date,
            end_date,
            user_id,
            page,
            limit,
            time_zone,
          }).filter(([_, value]) => value != null)
        );

        return {
          url: `time-entry/waiting-for-approval?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TimeSheetData"],
    }),

    getDailyTimesheetTableData: builder.query({
      query: ({ start_date, end_date, user_id, time_zone, page, limit }) => {
        const params = new URLSearchParams(
          Object.entries({
            start_date,
            end_date,
            user_id,
            page,
            limit,
            time_zone,
          }).filter(([_, value]) => value != null)
        );

        return {
          url: `time-entry?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["TimeSheetData"],
    }),

    //approve

    approveDailyTimesheet: builder.mutation({
      query: ({ id, type }) => ({
        url: "/time-entry/approved",
        method: "POST",
        body: {
          time_entry_ids: [id],
          type: type,
        },
      }),
      invalidatesTags: ["TimeSheetData"],
    }),

    deleteDailyTimesheet: builder.mutation({
      query: ({ id }) => ({
        url: `/time-entry-details/${id}`,
        method: "DELETE",
      }),
      providesTags: ["TimeSheetData"],
    }),
  }),
});

export const {
  useGetDailyTimesheetApiQuery,
  useApproveDailyTimesheetMutation,
  useGetDailyTimesheetTableDataQuery,
  useDeleteDailyTimesheetMutation
} = useDailyTimesheetApi;
