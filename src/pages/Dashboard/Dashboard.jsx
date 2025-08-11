import React from "react";
import MetricCards from "../../components/DashboardComp/metric-cards";
import ScreenshotsOverview from "../../components/DashboardComp/screenshots-overview";
import RecentActivity from "../../components/DashboardComp/recent-activity";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActivityLogChart } from "../../components/DashboardComp/activity-log-chart";
import { CompanyPerformanceChart } from "../../components/DashboardComp/company-performance-chart";
import { TopEmployeesChart } from "../../components/DashboardComp/Top-employees-chart";
import { ProjectOverviewChart } from "../../components/DashboardComp/Project-overview-chart";
import RecentTaskList from "../../components/DashboardComp/recent-task-list";
import TaskOverviewChart from "../../components/DashboardComp/task-overview-chart";
import { DatePickerWithRange } from "../../components/Common/Multi-DatePicker";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-xl font-medium text-gray-800">Dashboard</h1>
          <DatePickerWithRange />
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <MetricCards />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <RecentTaskList />
          <TaskOverviewChart />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <CompanyPerformanceChart />
          </div>
          <div className="lg:col-span-5">
            <ProjectOverviewChart />
          </div>
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg bg-purple-50 p-6 h-[185px]">
                <h3 className="font-medium text-gray-700">Total Team Member</h3>
                <div className="mt-4 flex flex-col justify-center items-center gap-2">
                  <div className="text-5xl font-semibold">05</div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      <span className="text-sm text-gray-600">
                        Time To Task
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12.8L8 3.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.2 8L8 3.2L12.8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>8.5% Up last week</span>
                </div>
              </div>
              <div className="rounded-lg bg-[#4361EE1A] p-6 h-[185px]">
                <h3 className="font-medium text-gray-700">Task Overview</h3>
                <div className="mt-4 flex flex-col justify-center items-center gap-2">
                  <div className="text-5xl font-semibold">
                    <span className="text-green-500">10</span>
                    <span className="text-2xl text-gray-400">/12</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      <span className="text-sm text-gray-600">
                        Time To Task
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-500">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 12.8L8 3.2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.2 8L8 3.2L12.8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>8.5% Up last week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <TopEmployeesChart />
          <ActivityLogChart />
        </div>
        <div className="mt-8">
          <RecentActivity />
        </div>

        <div className="mt-8">
          <ScreenshotsOverview />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
