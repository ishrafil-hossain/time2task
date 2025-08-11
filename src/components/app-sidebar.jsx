import * as React from "react";
import {
  AudioWaveform,
  BarChartIcon,
  Bot,
  BuildingIcon,
  ClockIcon,
  Command,
  FolderIcon,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  ListTodo,
  Settings,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavDashboard } from "./nav-dashboard";
import { NavActivities } from "./nav-activities";
import { NavUser } from "./nav-user";
import { SidebarSeparator, useSidebar } from "./ui/sidebar";
import { NavProject } from "./nav-project";
import { useLocation } from "react-router";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  TimeSheet: [
    {
      title: "TimeSheet",
      url: "#",
      icon: ClockIcon,
      isActive: false,
      items: [
        {
          title: "TimeSheet List",
          url: "/timesheet/timesheet-list",
        },
        {
          title: "Daily TimeSheet",
          url: "/timesheet/daily-timesheet",
        },
        {
          title: "Weekly TimeSheet",
          url: "/timesheet/weekly-timesheet",
        },
        {
          title: "Monthly TimeSheet",
          url: "/timesheet/monthly-timesheet",
        },
      ],
    },
  ],
  Work_Planner: [
    {
      title: "Work Planner",
      url: "#",
      icon: LayoutDashboardIcon,
      isActive: false,
      items: [
        {
          title: "Schedule",
          url: "/work-planner/schedule",
        },
        // {
        //   title: "Request List",
        //   url: "/work-planner/request-list",
        // },
        {
          title: "Attendance",
          url: "/work-planner/attendance",
        },
        {
          title: "Leave Request",
          url: "/work-planner/leave-request",
        },
        // {
        //   title: "Leave Calender",
        //   url: "/work-planner/leave-calender",
        // },
      ],
    },
  ],
  Reports: [
    {
      title: "Reports",
      url: "/report",
      icon: BarChartIcon,
      isActive: false,
      items: [
        {
          title: "Time & Activity",
          url: "/report/time-activity",
        },
        {
          title: "Payroll",
          url: "/report/payroll",
        },
        {
          title: "CDMS",
          url: "/report/cdms",
        },
      ],
    },
  ],
  Users: [
    {
      title: "Users",
      url: "/user",
      icon: UsersIcon,
      isActive: false,
      items: [
        {
          title: "Employees",
          url: "/user/employee",
        },
        {
          title: "Clients",
          url: "/user/client",
        },
      ],
    },
  ],
  Dashboard: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
  ],
  Activities: [
    {
      title: "Activities",
      url: "/activity",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "Screenshot",
          url: "/activity/screenshot",
        },
        {
          title: "App & Url",
          url: "/activity/app-url",
        },
      ],
    },
  ],
  Projects: [
    {
      name: "Projects",
      url: "/project",
      icon: FolderIcon,
    },
  ],
  Organization: [
    {
      title: "Organization",
      url: "/organization",
      icon: BuildingIcon,
      isActive: false,
      items: [
        {
          title: "Department",
          url: "/orgranization/department",
        },
        {
          title: "Shift",
          url: "/orgranization/shift",
        },
      ],
    },
  ],
  Settings: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "User Roles",
          url: "/settings/user-roles",
        },
        {
          title: "Manage Roles",
          url: "/settings/manage-roles",
        },
        {
          title: "Configurations",
          url: "/settings/configurations",
        },
      ],
    },
  ],
  tasks: [
    {
      name: "task",
      url: "/task",
      icon: ListTodo,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth/login";
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-between w-full px-4 py-4">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center justify-between w-full">
          {state !== "collapsed" ? (
            <img className=" w-[120px] " src="/time2task.png" alt="" />
          ) : (
            <img
              className=" w-[20px] "
              src="/Time2Task_small_Logo.png"
              alt=""
            />
          )}

          {state !== "collapsed" && (
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 p-2.5 bg-primary_color rounded-md inline-flex justify-center items-center gap-2.5">
                <p className="justify-start text-white text-sm font-semibold leading-tight">
                  FS
                </p>
              </button>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarSeparator className=" !bg-white" />
      <SidebarContent>
        <NavDashboard items={data.Dashboard} />
        <NavActivities items={data.Activities} />
        <NavMain items={data.TimeSheet} />
        <NavMain items={data.Reports} />

        <NavMain items={data.Work_Planner} />
        {/* <SidebarSeparator className="" /> */}
        <NavProject items={data.Projects} />
        <NavProject items={data.tasks} />
        <NavUser items={data.Users} />
        <NavMain items={data.Organization} />
        <NavMain items={data.Settings} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
