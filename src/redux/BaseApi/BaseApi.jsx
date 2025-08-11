import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

// Create a custom base query that handles 401 responses
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${localStorage.getItem("token")}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
    window.location.href = '/auth/login';
  }

  return result;
};

export const BaseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Role",
    "Members",
    "Permissions",
    "Client",
    "InitPermission",
    "Projects",
    "OrganizationProfile",
    "TimeTracking",
    "Task",
    "TimeEntry",
    "Configuration",
    "TimeSheetData",
    "Activities",
    "Dashboard",
    "reports",
    "Invoice",
    "Xero",
    "MonthlyTimeSheet",
    "WeeklyReport"
  ],
  endpoints: () => ({}),
});
