"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {  ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", desktop: 1200, mobile: 900 },
  { month: "Feb", desktop: 2900, mobile: 1200 },
  { month: "Mar", desktop: 3500, mobile: 1600 },
  { month: "Apr", desktop: 2800, mobile: 1800 },
  { month: "May", desktop: 3800, mobile: 2100 },
  { month: "Jun", desktop: 4200, mobile: 2400 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} 

export function BarChartDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Traffic</CardTitle>
        <CardDescription>Comparison of desktop and mobile traffic over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[4/3]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
