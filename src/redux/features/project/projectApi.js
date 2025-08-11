import { BaseApi } from "../../BaseApi/BaseApi";

export const UseProjectApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page, limit, status, query, client_id }) => {
        const params = new URLSearchParams({ page, limit, status });

        if (query) {
          params.append("query", query);
        }
        if (client_id) {
          params.append("client_id", client_id);
        }

        return {
          url: `/project?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),

    
    getProjectsByMember: builder.query({
      query: ({ user_id, page, limit, status, query, client_id, project_id }) => {
        const params = new URLSearchParams();
    
        // Add required parameters
        if (page) {
          params.append("page", page);
        }
        if (limit) {
          params.append("limit", limit);
        }
    
        // Conditionally add optional parameters if valid
        if (status && status !== "null") {
          params.append("status", status);
        }
        if (query) {
          params.append("query", query);
        }
        if (client_id) {
          params.append("client_id", client_id);
        }
        if (project_id && project_id !== "null") {
          params.append("project_id", project_id);
        }
    
        // Construct the full URL
        const baseUrl = `/project/user/${user_id}`;
        const urlWithParams = params.toString()
          ? `${baseUrl}?${params.toString()}`
          : baseUrl;
    
        return {
          url: urlWithParams,
          method: "GET",
        };
      },
      providesTags: ["Project"],
    }),
    
    
    

    getProjectById: builder.query({
      query: ({ id }) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    addProject: builder.mutation({
      query: (createProject) => ({
        url: "/project",
        method: "POST",
        body: createProject,
      }),
      invalidatesTags: ["Project"],
    }),

    addArchive: builder.mutation({
      query: ({ project_id, type }) => ({
        url: "/project-archive",
        method: "POST",
        body: { project_id, type },
      }),
      invalidatesTags: ["Project"],
    }),
    

    updateProject: builder.mutation({
      query: (updateProject) => ({
        url: `/project/${updateProject.id}`,
        method: "PUT",
        body: updateProject,
      }),
      invalidatesTags: ["Project"],
    }),

    findProjectById: builder.query({
      query: (id) => `project/${id}`,
      providesTags: ["Projects"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectsByMemberQuery,
  useAddArchiveMutation,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useFindProjectByIdQuery,
} = UseProjectApi;
