import { BaseApi } from "../BaseApi/BaseApi";

const projectsApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all Projects
    getAllProjects: builder.query({
      query: ({ page, limit, query, status }) => ({
        url: "user",
        params: { page, limit, query, status },
      }),
      transformResponse: (res) => {
        return {
          data: res.data.rows,
          metadata: res.data.meta,
        };
      },
      providesTags: ["Projects"],
    }),

    // Get Project by user id
    getUserProjects: builder.query({
      query: ({ id, page, limit, query }) => ({
        url: `project/user/${id}`,
        params: { page, limit, query },
      }),
      transformResponse: (res) => {
        return {
          data: res.data.rows,
          metadata: res.data.meta,
        };
      },
      providesTags: ["Projects"],
    }),

    getProjectCalculation: builder.query({
      query: ({ id, days }) => ({
        url: `/project/${id}/calculation?days=${days}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),

    // Add Projects
    addProjects: builder.mutation({
      query: (membersData) => ({
        url: "user",
        method: "POST",
        body: membersData,
      }),
      invalidatesTags: ["Projects"],
    }),

    // update Projects
    updateProject: builder.mutation({
      query: (members, status = "deactive") => ({
        url: `user/${members.id}`,
        method: "PUT",
        body: {
          email: members.email,
          role_id: members.role_id,
        },
      }),
      invalidatesTags: ["Projects"],
    }),

    // delete Projects
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `user?id=${id}`,
        method: "DELETE",
        body: {
          ids: [id],
        },
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetUserProjectsQuery,
  useGetProjectCalculationQuery,
  useAddMembersMutation,
  useUpdateMemberMutation,
  useUpdateMembersTrackingMutation,
  useDeleteMemberMutation,
} = projectsApi;
