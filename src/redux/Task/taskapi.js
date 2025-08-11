import { BaseApi } from "../BaseApi/BaseApi";


const taskApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all task
    getAllTask: builder.query({
      query: (args) => {
        const { status, page, limit, query, user_id, project_id } = args || {};
        const querys = {
          url: "/task",
          params: {},
        };

        if (status) {
          querys.params.status = status;
        }
        if (page) {
          querys.params.page = page;
        }
        if (limit) {
          querys.params.limit = limit;
        }
        if (query) {
          querys.params.query = query;
        }
        if (user_id) {
          querys.params.user_id = user_id;
        }
        if (project_id) {
          querys.params.project_id = project_id;
        }
        return querys;
      },
      providesTags: ["Task"],
    }),

    // get task based on proejct id
    getAllProjectTask: builder.query({
      query: (args) => {
        const { status, page, limit, query, id } = args || {};
        const querys = {
          url: `task/project/${id}`,
          params: {},
        };

        if (status) {
          querys.params.status = status;
        }
        if (page) {
          querys.params.page = page;
        }
        if (limit) {
          querys.params.limit = limit;
        }
        if (query) {
          querys.params.query = query;
        }

        return querys;
      },
      transformResponse: (res) => {
        return {
          data: res.data.rows,
          metadata: res.data.meta,
        };
      },
      providesTags: ["Task"],
    }),


    // get single task via id
    getSingleTask: builder.query({
      query: (taskId) => ({
        url: `task/${taskId}`,
      }),
      invalidatesTags: ["Task"],
    }),

    // add task
    addTask: builder.mutation({
      query: (taskData) => ({
        url: "task",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["Task"],
    }),

    // update task
    updateTask: builder.mutation({
      query: (taskData) => ({
        url: `task/${taskData?.id}`,
        method: "PUT",
        body: taskData,
      }),
      invalidatesTags: ["Task"],
    }),

    // end tracking
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllTaskQuery,
  useGetAllProjectTaskQuery,
  useGetSingleTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
