"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, CartesianGrid, Line, ComposedChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const timeData = [
  { name: "Sabariya", hours: 1, order: 1 },
  { name: "Tashfia", hours: 4, order: 2 },
  { name: "Ishrafil", hours: 10, order: 10 },
  { name: "Ahmed", hours: 2, order: 2 },
  { name: "Aminul", hours: 4, order: 3 },
  { name: "Saiful", hours: 4, order: 3 },
]

const timeOptions = ["This Week", "This Month", "This Quarter", "This Year"]

export default function TaskOverviewChart() {
  const [selectedTime, setSelectedTime] = useState("This Week")

  return (
    <Card className="p-6 shadow-sm bg-[#f8faff]">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Task Overview</h2>
          <p className="text-gray-500 text-sm">Productive hours logged in app or urls</p>
        </div>
        <Button
          variant="ghost"
          className="text-gray-500 flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          {selectedTime} <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-[300px] mt-4">
        <ChartContainer
          config={{
            hours: {
              label: "Time",
              color: "#10b981",
            },
            order: {
              label: "Order",
              color: "#ef4444",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={timeData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              {/* Clean horizontal grid only */}
              <CartesianGrid 
                horizontal={true}
                vertical={false}
                stroke="#e5e7eb"
                strokeDasharray="3 3"
              />
              
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#6b7280", fontSize: 12 }} 
              />
              
              {/* Left Y-axis for hours */}
              <YAxis
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `${value}h`}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#10b981", fontSize: 12 }}
                domain={[0, 'dataMax + 2']}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              
              {/* Right Y-axis for orders */}
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#ef4444", fontSize: 12 }}
                domain={[0, 'dataMax + 2']}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              
              <Tooltip content={<ChartTooltipContent />} cursor={false} />
              
              <Bar 
                dataKey="hours" 
                yAxisId="left" 
                fill="#a855f7" 
                radius={[4, 4, 0, 0]} 
                barSize={40} 
              />
              
              <Line
                type="monotone"
                dataKey="order"
                yAxisId="right"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#10b981" }}
              />
              
              <Legend
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: 20 }}
                payload={[
                  { value: "Time", type: "circle", color: "#a855f7" },
                  { value: "Order", type: "circle", color: "#10b981" },
                ]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  )
}