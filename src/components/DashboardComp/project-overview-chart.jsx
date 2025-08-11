"use client"

import { Clock } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const projectData = [
  { name: "Time To Task", value: 25, color: "#c084fc", time: "0:91:12" },
  { name: "Time Tracking Application", value: 25, color: "#818cf8", time: "0:25:57" },
  { name: "Econmart Ecommerce", value: 25, color: "#67e8f9", time: "0:5:09" },
  { name: "Tender Web Application", value: 25, color: "#f472b6", time: "0:3:57" },
]

export const ProjectOverviewChart = () => {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm h-full ">
      <div className="mb-4 flex items-center justify-between ">
        <div>
          <h3 className="text-base font-medium text-gray-800">Project Overview</h3>
          <p className="text-xs text-gray-500">Productive hours logged in app or url's</p>
        </div>
        <div className="relative">
        <div className="flex cursor-pointer items-center gap-1 rounded-3xl  border-purple-400 border-[2px] bg-gray-50 px-3 py-1.5 text-sm">
            <span>This Week</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex  h-full">
        <div className="relative w-1/2 flex justify-center items-center  ">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {projectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-semibold">04</div>
            <div className="text-sm text-gray-500">Total Project</div>
          </div>
        </div>
        <div className="w-1/2 space-y-3 flex flex-col justify-center  ">
          {projectData.map((project, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                <span className="text-sm text-gray-600">{project.name}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-purple-400" />
                <span>{project.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
