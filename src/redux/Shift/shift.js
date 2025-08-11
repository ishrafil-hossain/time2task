import { BaseApi } from "../BaseApi/BaseApi";

export const useShiftApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShift: builder.query({
      query: ({ page, limit }) => {
        const params = {};
        if (page) params.page = page;
        if (limit) params.limit = limit;
        return {
          url: "/shift",
          params,
        };
      },
    }),
    addShift: builder.mutation({
      query: (data) => ({
        url: "/shift",
        method: "POST",
        body: data,
      }),
    }),

    getShiftById: builder.query({
      query: (id) => ({
        url: `/shift/${id}`,
      }),
    }),

    updateShift: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shift/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteShift: builder.mutation({
      query: (id) => ({
        url: `/shift/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetShiftQuery,
  useAddShiftMutation,
  useGetShiftByIdQuery,
  useUpdateShiftMutation,
  useDeleteShiftMutation,
} = useShiftApi;
