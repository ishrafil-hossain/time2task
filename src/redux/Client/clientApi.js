import { BaseApi } from "../BaseApi/BaseApi";

export const clientApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    //gett all data
    getClient: builder.query({
      query: ({ page, limit, query, id }) => ({
        url: "/client",
        params: { page, limit, query, id },
      }),
      transformResponse: (res) => {
        return {
          data: res.data.rows,
          metadata: res.data.meta,
        };
      },
      providesTags: ["Client"],
    }),

    //get client by name
    getClientByName: builder.query({
      query: ({ query }) => ({
        url: "/client",
        method: "GET",
        params: { query: query },
      }),
      providesTags: ["Client"],
    }),
    //get client by ID
    getClientByID: builder.query({
      query: (id) => ({
        url: `/client/${id}`, 
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    

    addClient: builder.mutation({
      query: ({ name, email, phoneNumber, address }) => ({
        url: "/client",
        method: "POST",
        body: {
          name: name,
          email: email,
          phone: phoneNumber,
          address: address,
        },
      }),
      invalidatesTags: ["Client"],
    }),

    updateClient: builder.mutation({
      query: (body) => ({
        url: `/client/${body.id}`,
        method: "PUT",
        body: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          address: body.address,
        },
      }),
      invalidatesTags: ["Client"],
    }),

    deleteClient: builder.mutation({
      query: ({ id }) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useGetClientQuery,
  useGetClientByIDQuery,
  useGetClientByNameQuery,
  useAddClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;
