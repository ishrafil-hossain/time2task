"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {  ChartContainer, ChartLegend, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Social Media", value: 35 },
  { name: "Direct", value: 25 },
  { name: "Organic Search", value: 20 },
  { name: "Referral", value: 15 },
  { name: "Email", value: 5 },
]

const chartConfig = {
  "Social Media": {
    label: "Social Media",
    color: "hsl(var(--chart-1))",
  },
  Direct: {
    label: "Direct",
    color: "hsl(var(--chart-2))",
  },
  "Organic Search": {
    label: "Organic Search",
    color: "hsl(var(--chart-3))",
  },
  Referral: {
    label: "Referral",
    color: "hsl(var(--chart-4))",
  },
  Email: {
    label: "Email",
    color: "hsl(var(--chart-5))",
  },
}

export function PieChartDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>Distribution of website traffic by source</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[4/3]">
          <div className="flex h-full flex-col justify-between gap-4">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={chartConfig[entry.name]?.color || "#000"} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
            <ChartLegend />
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
