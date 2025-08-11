import { BaseApi } from "../../BaseApi/BaseApi";
export const useMembersApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all members
    getAllMembers: builder.query({
      query: ({ page, limit, query, status } = {}) => {
        const params = {};

        if (page !== undefined) params.page = page;
        if (limit !== undefined) params.limit = limit;
        if (query) params.query = query;
        if (status) params.status = status;

        return {
          url: "user",
          params,
        };
      },
      transformResponse: (res) => ({
        data: res.data.rows,
        metadata: res.data.meta,
      }),
      providesTags: ["Members"],
    }),
    getSearchMembers: builder.query({
      query: ({ project_id, status } = {}) => {
        const params = {};
    
        // Only include project_id if it is provided
        if (project_id !== undefined) params.project_id = project_id;
    
        // Optionally include other query parameters like status
        if (status !== undefined) params.status = status;
    
        return {
          url: "dropdown-user",
          params,
        };
      },
      transformResponse: (res) => ({
        data: res.data.rows,
        metadata: res.data.meta,
      }),
      providesTags: ["Members"],
    }),
    

    // get member by name
    getMemberByName: builder.query({
      query: ({ query }) => ({
        url: `user`, // base URL
        method: "GET",
        params: { query },
      }),
      providesTags: ["Members"],
    }),

    // get member by id
    getMemberById: builder.query({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: ["Members"],
    }),

    // get currency and timezone
    getTimezoneCurrency: builder.query({
      query: () => ({
        url: "user-timezone-currency",
      }),
      providesTags: ["Members"],
    }),

    // Add members
    addMembers: builder.mutation({
      query: (membersData) => ({
        url: "user",
        method: "POST",
        body: membersData,
      }),
      invalidatesTags: ["Members"],
    }),

    // update tracking status
    updateMembersTracking: builder.mutation({
      query: (membersData) => ({
        url: "user/disable-enable-tracking",
        method: "POST",
        body: membersData,
      }),
      invalidatesTags: ["Members"],
    }),

    // update members
    updateMember: builder.mutation({
      query: (membersData) => ({
        url: `user/${membersData.id}`,
        method: "PUT",
        body: {
          email: membersData?.email,
          role_id: membersData?.role_id,
          password:membersData?.password,
          currency: membersData?.currency,
          status: membersData?.status,
          pay_rate_hourly: membersData?.pay_rate_hourly,
          bill_rate_hourly: membersData?.bill_rate_hourly,
          time_zone: membersData?.time_zone,
          is_time_sheet_approval: membersData?.is_time_sheet_approval,
          url_tracking:membersData?.url_tracking
        },
      }),
      invalidatesTags: ["Members"],
    }),

    // update image
    updateImage: builder.mutation({
      query: (image) => ({
        url: "user/update-image",
        method: "POST",
        body: image,
      }),
      invalidatesTags: ["Members"],
    }),

    // delete member
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `user?id=${id}`,
        method: "DELETE",
        body: {
          ids: [id],
        },
      }),
      invalidatesTags: ["Members"],
    }),
  }),
});

export const {
  useGetAllMembersQuery,
  useGetSearchMembersQuery,
  useGetMemberByNameQuery,
  useGetMemberByIdQuery,
  useGetTimezoneCurrencyQuery,
  useAddMembersMutation,
  useUpdateMemberMutation,
  useUpdateMembersTrackingMutation,
  useUpdateImageMutation,
  useDeleteMemberMutation,
} = useMembersApi;
