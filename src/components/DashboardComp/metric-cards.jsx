"use client";

import React from "react";

import {
  ClipboardCheck,
  Clock,
  DollarSign,
  Clock3,
  ChartSpline,
} from "lucide-react";
import { LineChart, Line } from "recharts";

const sparklineData = [
  { value: 10 },
  { value: 15 },
  { value: 5 },
  { value: 20 },
  { value: 12 },
  { value: 18 },
];

const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  chartColor,
  extraContent,
  bgColor,
}) => {
  return (
    <div className={`rounded-lg ${color} p-6`}>
      <div className="flex items-center gap-2 text-black">
        <Icon
          className="h-8 w-8 p-2 rounded-full"
          style={{ backgroundColor: bgColor }}
        />

        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-3xl ">
          {value}
          {extraContent}
        </div>
        <div className="h-12 w-24">
          <LineChart width={96} height={48} data={sparklineData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-green-500">
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
  );
};

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Weekly Activity"
        value="84%"
        icon={ChartSpline}
        color="bg-purple-50"
        bgColor="#B129FF1A"
        chartColor="#c084fc"
      />
      <MetricCard
        title="Total Work Time"
        value="43:16:41"
        icon={Clock}
        color="bg-blue-50"
        bgColor="#4361EE1A"
        chartColor="#60a5fa"
      />
      <MetricCard
        title="Total Bill"
        value="$892.51"
        icon={DollarSign}
        color="bg-cyan-50"
        chartColor="#67e8f9"
        bgColor="#4CC9F01A"
        extraContent={<span className="ml-1 text-green-500">↑</span>}
      />
      <MetricCard
        title="Idle Time"
        value="0:06:17"
        icon={Clock3}
        color="bg-pink-50"
        bgColor="#F725851A"
        chartColor="#f9a8d4"
      />
    </div>
  );
}
