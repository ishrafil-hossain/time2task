import {
  Trophy,
  Calendar,
  Share2,
  ChevronRight,
  DownloadIcon,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const activityData = [
  {
    employee: {
      name: "Tasfia Barshat",
      initials: "TB",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    projects: [
      "Time To Task",
      "Time Tracking...",
      "Time Tracking...",
      "Time Tracking...",
    ],
    activityPercentage: 28,
    spentTime: "7:42:00",
    breakTime: "0:10:00",
    totalTime: "7:52:00",
    totalSpent: "$76.2",
  },
  {
    employee: {
      name: "Sabariya Muzumder",
      initials: "SM",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    projects: ["Time To Task"],
    activityPercentage: 28,
    spentTime: "7:42:00",
    breakTime: "0:10:00",
    totalTime: "7:52:00",
    totalSpent: "$60.96",
  },
  {
    employee: {
      name: "Ishrafil Hossain",
      initials: "IH",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    projects: ["Time Tracking Application"],
    activityPercentage: 28,
    spentTime: "7:42:00",
    breakTime: "0:10:00",
    totalTime: "7:52:00",
    totalSpent: "$60.96",
  },
  {
    employee: {
      name: "Sofiqul Islam",
      initials: "SI",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    projects: ["Time Tracking Application"],
    activityPercentage: 28,
    spentTime: "7:42:00",
    breakTime: "0:10:00",
    totalTime: "7:52:00",
    totalSpent: "$76.2",
  },
];

export default function RecentActivity() {
  return (
    <Card className="border-gray-100">
      <CardHeader className="flex flex-row items-center justify-between pb-2 mb-3">
        <div className="flex flex-col items-start gap-2">
          <CardTitle className="text-[18px] font-medium">
            Recent Activity
          </CardTitle>
          <p className="text-xs text-gray-500">
            Productive hours logged in app or urls
          </p>
        </div>
        <div className="flex items-center text-purple-500 text-sm gap-4">
          <button className="h-[35px] p-2.5 rounded-md outline outline-1 outline-offset-[-1px] outline-primary_color inline-flex justify-center items-center gap-2.5">
            <DownloadIcon className="w-4 h-4 text-primary_color" />
            <p className="justify-start text-[#7c7c7c] text-[13px] font-light ">
              Download
            </p>
          </button>

          <button className="h-[35px] p-2.5 bg-[#f0f0f0] rounded-md inline-flex justify-center items-center gap-2.5">
            <p className="justify-start text-[#7c7c7c] text-[13px] font-light ">
              See All
            </p>
            <ArrowRight className="w-4 h-4 text-[#7c7c7c]" />
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-sm text-left">
            <colgroup>
              <col className="w-[180px]" /> {/* Employee */}
              <col className="w-[280px]" /> {/* Project - wider */}
              <col className="w-[160px]" /> {/* Activity */}
              <col className="w-[120px]" /> {/* Spent Time */}
              <col className="w-[120px]" /> {/* Break Time */}
              <col className="w-[120px]" /> {/* Total Time */}
              <col className="w-[140px]" /> {/* Total Spent */}
            </colgroup>

            <thead className="bg-[#F7F7F7] text-[#7C7C7C] text-[14px] font-medium">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Spent Time</th>
                <th className="px-4 py-3">Break Time</th>
                <th className="px-4 py-3">Total Time</th>
                <th className="px-4 py-3">Total Spent ($)</th>
              </tr>
            </thead>

            <tbody className="text-[#4A4A4A]">
              {activityData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={item.employee.avatarUrl}
                          alt={item.employee.name}
                        />
                        <AvatarFallback>
                          {item.employee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.employee.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      {item.projects.map((project, idx) => (
                        <span
                          key={idx}
                          className="bg-[#B129FF1A] text-purple-500 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${item.activityPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-purple-500">
                        {item.activityPercentage}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">{item.spentTime}</td>
                  <td className="px-4 py-3 align-top">{item.breakTime}</td>
                  <td className="px-4 py-3 align-top">{item.totalTime}</td>
                  <td className="px-4 py-3 align-top">{item.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
