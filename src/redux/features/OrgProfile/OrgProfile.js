import { BaseApi } from "../../BaseApi/BaseApi";

export const useOrganizationProfileApi = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get profile data
    getProfile: builder.query({
      query: () => ({
        url: "profile",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["OrganizationProfile"],
    }),

    // Add two factor
    addTwoFactor: builder.mutation({
      query: (twoFactorData) => ({
        url: "user",
        method: "POST",
        body: twoFactorData,
      }),
      invalidatesTags: ["OrganizationProfile"],
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (profilesData) => ({
        url: `user/update`,
        method: "PUT",
        body: profilesData,
      }),
      invalidatesTags: ["OrganizationProfile"],
    }),

    // delete account
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `user?id=${id}`,
        method: "DELETE",
        body: { ids: [id] },
      }),
      invalidatesTags: ["OrganizationProfile"],
    }),
  }),
});

export const { useGetProfileQuery, useAddTwoFactorMutation, useDeleteAccountMutation } =
  useOrganizationProfileApi;
