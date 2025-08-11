// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { BaseApi } from "../BaseApi/BaseApi";
import { UseProjectApi } from "../features/project/projectApi";
import { useMembersApi } from "../features/member/memberApi";
import { useOrganizationProfileApi } from "../features/OrgProfile/OrgProfile";
import { useActivitiesApi } from "../activities/activitiesAPI";
import { useWeeklyAPi } from "../Weekly/weeklyApi";
import projectCreationReducer from "../features/project/projectCreationSlice";
import { useDepartmentApi } from "../Department/departmentApi";
import { useShiftApi } from "../Shift/shift";

const apiMiddlewares = new Set([
  authApi.middleware,
  BaseApi.middleware,
  UseProjectApi.middleware,
  useMembersApi.middleware,
  useOrganizationProfileApi.middleware,
  useActivitiesApi.middleware,
  useWeeklyAPi.middleware,
  useDepartmentApi.middleware,
  useShiftApi.middleware,
]);

const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [UseProjectApi.reducerPath]: UseProjectApi.reducer,
    [useMembersApi.reducerPath]: useMembersApi.reducer,
    [useOrganizationProfileApi.reducerPath]: useOrganizationProfileApi.reducer,
    [useActivitiesApi.reducerPath]: useActivitiesApi.reducer,
    [useWeeklyAPi.reducerPath]: useWeeklyAPi.reducer,
    [useDepartmentApi.reducerPath]:useDepartmentApi.reducer,
    [useShiftApi.reducerPath]: useShiftApi.reducer,
    auth: authReducer,
    projectCreation: projectCreationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});

export default store;
