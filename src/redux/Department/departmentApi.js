import { BaseApi } from "../BaseApi/BaseApi";

export const useDepartmentApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all departments with pagination
    getDepartments: builder.query({
      query: ({ page = 1, limit = 1000 }) => ({
        url: `/department?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Department"],
    }),

    // Get single department by ID
    getDepartmentById: builder.query({
      query: (id) => ({
        url: `/department/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),

    // Create new department
    createDepartment: builder.mutation({
      query: (department) => ({
        url: "/department",
        method: "POST",
        body: department,
      }),
      invalidatesTags: ["Department"],
    }),

    // Update department
    updateDepartment: builder.mutation({
      query: ({ id, ...department }) => ({
        url: `/department/${id}`,
        method: "PUT",
        body: department,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Department", id },
        "Department",
      ],
    }),

    // Delete department
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `/department/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = useDepartmentApi;
