import { BaseApi } from "../BaseApi/BaseApi";

export const UserRoleAPI = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get role data
    getRole: builder.query({
      query: (args) => {
        const { status, page, limit } = args || {};

        const query = {
          url: "/role",
          params: {},
        };

        if (status) {
          query.params.status = status;
        }
        if (page) {
          query.params.page = page;
        }
        if (limit) {
          query.params.limit = limit;
        }

        return query;
      },
      providesTags: ["Role"],
    }),

    //post role data
    addRole: builder.mutation({
      query: ({ id, name, status, is_admin, is_hr, is_manager, is_employee }) => ({
        url: "/role",
        method: "POST",
        body: { id, name, status, is_admin, is_hr, is_manager, is_employee },
      }),
      invalidatesTags: ["Role"],
    }),

    //put: update role data
    updateRole: builder.mutation({
      query: ({ id, name, status, is_admin, is_hr, is_manager, is_employee }) => ({
        url: `/role/${id}`,
        method: "PUT",
        body: { id, name, status, is_admin, is_hr, is_manager, is_employee },
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation({
      query: ({ id }) => ({
        url: `/role/${id}`,
        method: "DELETE",
      }),
    }),
    invalidatesTags: ["Role"],
  }),
});

export const {
  useAddRoleMutation,
  useGetRoleQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = UserRoleAPI;
