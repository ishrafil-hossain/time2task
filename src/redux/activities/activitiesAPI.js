import { BaseApi } from "../BaseApi/BaseApi";


export const useActivitiesApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAppsAndUrl: builder.query({
      query: (args) => {
        const { start_date, end_date, project_id, user_id, time_zone } =
          args || {};
        const querys = {
          url: "/screenshot/app-url",
          params: {},
        };

        if (start_date) {
          querys.params.start_date = start_date;
        }
        if (end_date) {
          querys.params.end_date = end_date;
        }
        if (user_id) {
          querys.params.user_id = user_id;
        }
        if (project_id) {
          querys.params.project_id = project_id;
        }
        if (time_zone) {
          querys.params.time_zone = time_zone;
        }
        return querys;
      },
      providesTags: ["Activities"],
    }),

    getScreenShotData: builder.query({
      query: ({ nimute, user_id, project_id, date, time_zone }) => {
        const params = {};
        
        if (nimute !== undefined && nimute !== null) {
          params.nimute = nimute;
        }
        if (user_id !== undefined && user_id !== null) {
          params.user_id = user_id;
        }
        if (project_id !== undefined && project_id !== null) {
          params.project_id = project_id;
        }
        if (date !== undefined && date !== null) {
          params.date = date;
        }
        if (time_zone !== undefined && time_zone !== null) {
          params.time_zone = time_zone;
        }
        
        return {
          url: "/screenshot",
          params,
        };
      },
      providesTags: ["Activities"],
    }),
    deleteScreenShotData: builder.mutation({
      query: ({ start_time, end_time, user_id }) => ({
        url: `/screenshot-delete?start_time=${start_time}&end_time=${end_time}&user_id=${user_id}`,
        method: "DELETE",
      }),
      providesTags: ["Activities"],
    }),
  }),
});

export const {
  useGetAppsAndUrlQuery,
  useGetScreenShotDataQuery,
  useDeleteScreenShotDataMutation,
} = useActivitiesApi;
