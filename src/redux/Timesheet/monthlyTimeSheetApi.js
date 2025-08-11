import { BaseApi } from "../BaseApi/BaseApi";

export const MonthlyTimeSheet = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    //post role data
    monthlyTimeReport: builder.query({
      query: ({ month, user_id }) => ({
        url: `/report/monthly?month=${month}&user_id=${user_id}`,
      }),
      providesTags: ["MonthlyTimeSheet"],
    }),
  }),
});

export const { useMonthlyTimeReportQuery } = MonthlyTimeSheet;
