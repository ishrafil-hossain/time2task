import { BaseApi } from "../BaseApi/BaseApi";

export const useWeeklyAPi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get dashboard data
    getWeeklyReport: builder.query({
      query: ({ from_date, to_date, user_id }) => ({
        url: `/report/weekly?from_date=${from_date}&to_date=${to_date}&user_id=${user_id}`,
      }),
      
      providesTags: ["WeeklyReport"],
    }),
  }),
});

export const { useGetWeeklyReportQuery} = useWeeklyAPi;
