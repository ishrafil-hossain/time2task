import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "../providers/AuthProvider";
import Dashboard from "../pages/Dashboard/Dashboard";
import AttendanceTracker from "../pages/Work_Planner/Attendance";
import { Schedule } from "../pages/Work_Planner/Schedule";
import { LeaveRequest } from "../pages/Work_Planner/Leave";
import Payroll from "../pages/Report/Payroll";
import Project from "../pages/Project/Project";
import Employee from "../pages/User/Employee";
import Client from "../pages/User/Client";
import TimeActivity from "../pages/Report/Time&Activity";
import CDMSInterface from "../pages/Report/CDMS";
import Appurl from "../pages/Activities/AppUrl/Appurl";
import Screenshot from "../pages/Activities/Screenshot/Screenshot";
import Login from "../pages/Auth/login/login";
import TimesheetList from "../pages/TimeSheet/TimesheetList";
import DailyTimesheet from "../pages/TimeSheet/DailyTimesheet";
import WeeklyTimesheet from "../pages/TimeSheet/WeeklyTimesheet";
import MonthlyTimesheet from "../pages/TimeSheet/MonthlyTimeSheet";
import Tasks from "../pages/Task/Tasks";
import Department from "../pages/Department/Department";
import Shift from "../pages/Shift/Shift";
import UserRoles from "../pages/Settings/UserRoles";
import ManageRoles from "../pages/Settings/ManageRoles";
import Configurations from "../pages/Settings/Configurations";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Activity */}
      <Route
        path="/activity/screenshot"
        element={
          <ProtectedRoute>
            <Screenshot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/activity/app-url"
        element={
          <ProtectedRoute>
            <Appurl />
          </ProtectedRoute>
        }
      />

      {/* Timesheet */}
      <Route
        path="/timesheet/timesheet-list"
        element={
          <ProtectedRoute>
            <TimesheetList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timesheet/daily-timesheet"
        element={
          <ProtectedRoute>
            <DailyTimesheet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timesheet/weekly-timesheet"
        element={
          <ProtectedRoute>
            <WeeklyTimesheet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/timesheet/monthly-timesheet"
        element={
          <ProtectedRoute>
            <MonthlyTimesheet />
          </ProtectedRoute>
        }
      />

      {/* Work Planner */}
      <Route
        path="/work-planner/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/work-planner/attendance"
        element={
          <ProtectedRoute>
            <AttendanceTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/work-planner/leave-request"
        element={
          <ProtectedRoute>
            <LeaveRequest />
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/report/payroll"
        element={
          <ProtectedRoute>
            <Payroll />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report/time-activity"
        element={
          <ProtectedRoute>
            <TimeActivity />
          </ProtectedRoute>
        }
      />
      <Route
        path="/report/cdms"
        element={
          <ProtectedRoute>
            <CDMSInterface />
          </ProtectedRoute>
        }
      />

      {/* Project */}
      <Route
        path="/project"
        element={
          <ProtectedRoute>
            <Project />
          </ProtectedRoute>
        }
      />

      {/* Tasks */}
      <Route
        path="/task"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      {/* Users */}
      <Route
        path="/user/employee"
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/client"
        element={
          <ProtectedRoute>
            <Client />
          </ProtectedRoute>
        }
      />

      {/* orgranization  */}
      <Route
        path="/orgranization/department"
        element={
          <ProtectedRoute>
            <Department />
          </ProtectedRoute>
        }
      />
      {/* orgranization/shift  */}
      <Route
        path="/orgranization/shift"
        element={
          <ProtectedRoute>
            <Shift />
          </ProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings/user-roles"
        element={
          <ProtectedRoute>
            <UserRoles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/manage-roles"
        element={
          <ProtectedRoute>
            <ManageRoles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/configurations"
        element={
          <ProtectedRoute>
            <Configurations />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
    </Routes>
  );
};
