import { BaseApi } from "../BaseApi/BaseApi";

export const ManualTimeEntry = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get role data

    //post role data
    addManualTimeEntry: builder.mutation({
      query: (data) => ({
        url: "/time-entry/manual-entry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TimeEntry"],
    }),
    updateManualTimeEntry: builder.mutation({
      query: ({data,id}) => ({
        url: `/time-entry/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TimeEntry"],
    }),
  }),
});

export const { useAddManualTimeEntryMutation, useUpdateManualTimeEntryMutation } = ManualTimeEntry;
