import { BaseApi } from "../BaseApi/BaseApi";

export const initSystemPermission = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInitPermission: builder.query({
      query: () => ({
        url: "/init-system",
      }),
      providesTags: ["InitPermission"],
    }),
  }),
});

export const { useGetInitPermissionQuery } = initSystemPermission;

