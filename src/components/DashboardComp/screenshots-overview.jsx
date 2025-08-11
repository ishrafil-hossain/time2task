import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const users = [
  {
    name: "Tasfia Barshat",
    initials: "TB",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    screenshots: [
      {
        timeRange: "11:00 am-11:10 am",
        screens: 4,
        activeTime: 9,
        activeTimePercentage: 95,
        progressColor: "bg-green-500",
      },
      {
        timeRange: "11:10 am-11:20 am",
        screens: 4,
        activeTime: 1.56,
        activeTimePercentage: 95,
        progressColor: "bg-red-500",
      },
      {
        timeRange: "11:20 am-11:30 am",
        screens: 4,
        activeTime: 9.21,
        activeTimePercentage: 95,
        progressColor: "bg-green-500",
      },
      {
        timeRange: "11:30 am-11:40 am",
        screens: 4,
        activeTime: 6.02,
        activeTimePercentage: 95,
        progressColor: "bg-purple-500",
      },
      {
        timeRange: "11:40 am-11:50 am",
        screens: 4,
        activeTime: 2.31,
        activeTimePercentage: 95,
        progressColor: "bg-red-500",
      },
    ],
  },
  {
    name: "Sabariya Muzumder",
    initials: "SM",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    screenshots: [
      {
        timeRange: "11:00 am-11:10 am",
        screens: 4,
        activeTime: 9,
        activeTimePercentage: 95,
        progressColor: "bg-green-500",
      },
      {
        timeRange: "11:10 am-11:20 am",
        screens: 4,
        activeTime: 1.56,
        activeTimePercentage: 95,
        progressColor: "bg-red-500",
      },
      {
        timeRange: "11:20 am-11:30 am",
        screens: 4,
        activeTime: 9.21,
        activeTimePercentage: 95,
        progressColor: "bg-green-500",
      },
      {
        timeRange: "11:30 am-11:40 am",
        screens: 4,
        activeTime: 6.02,
        activeTimePercentage: 95,
        progressColor: "bg-purple-500",
      },
      {
        timeRange: "11:40 am-11:50 am",
        screens: 4,
        activeTime: 2.31,
        activeTimePercentage: 95,
        progressColor: "bg-red-500",
      },
    ],
  },
];

export default function ScreenshotsOverview() {
  return (
    <Card className="border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Recent Screenshots Overview
        </CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Captured the screenshots based on every 10 minutes interval
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {users.map((user, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.avatarUrl || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <button className="flex items-center gap-1 text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-md">
                <span>See All</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {user.screenshots.map((screenshot, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-md overflow-hidden"
                >
                  <div className="h-36 w-full overflow-hidden">
                    <img
                      src="https://i.ibb.co.com/yBgLZ9zK/Screenshot-4.png"
                      alt={`Screenshot ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 className="text-sm font-medium">
                      Time Tracking Application
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">
                        {screenshot.timeRange}
                      </span>
                      <span className="text-xs text-purple-500">
                        {screenshot.screens} screens
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          screenshot.progressColor
                        )}
                        style={{ width: `${screenshot.activeTimePercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {screenshot.activeTimePercentage}% of Active Time{" "}
                      {screenshot.activeTime} minutes
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
