"use client";

import { useEffect, useState } from "react";
import { Plus, CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import MonthlyTimesheetFilter from "../../components/TimeSheetComp/MonthlyTimesheetComp/MonthlyTimesheetFilter";
import { useGetProfileQuery } from "../../redux/features/OrgProfile/OrgProfile";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useMonthlyTimeReportQuery } from "../../redux/Timesheet/monthlyTimeSheetApi";
import MonthlyTimesheetTable from "../../components/TimeSheetComp/MonthlyTimesheetComp/MonthlyTimesheetTable";

export default function MonthlyTimesheet() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // Generate calendar data
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const nextMonthDays = Array.from({ length: 5 }, (_, i) => i + 1);

  // Create calendar grid with 5 weeks
  const weeks = [
    currentMonthDays.slice(0, 7),
    currentMonthDays.slice(7, 14),
    currentMonthDays.slice(14, 21),
    currentMonthDays.slice(21, 28),
    [...currentMonthDays.slice(28, 31), ...nextMonthDays.slice(0, 4)],
  ];

  const daysWithEntries = selectedUser ? new Set(currentMonthDays) : new Set();

  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const displayMonth = "October";

  const isWeekend = (weekIndex, dayIndex) => {
    return dayIndex === 5 || dayIndex === 6;
  };

  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [month, setMonth] = useState(null);

  const [selectedValue, setSelectedValue] = useState(null);


  useEffect(() => {
    if (profile) {
      setSelectedValue(profile?.id);
    } else {
      setSelectedValue(null);
    }
  }, [profile]);

  console.log('profile' , profile)
  
  const { data: users } = useGetSearchMembersQuery({
    page: 1,
    limit: 1000,
  });

  const { data: monthlyTimeSheetData, isLoading: monthlyTimeSheetLoading } =
    useMonthlyTimeReportQuery({
      month: month,
      user_id: selectedValue,
    });

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg ">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-purple-600" />
            <h1 className="text-xl font-medium text-gray-900">
              Monthly Timesheet
            </h1>
          </div>
        </div>

        <div className=" ">
          <MonthlyTimesheetFilter
            selectedValue={selectedUser}
            setSelectedValue={setSelectedUser}
            users={users}
            setMonth={setMonth}
          />
        </div>

        {/* Calendar */}
        <MonthlyTimesheetTable 
          monthlyTimeSheetData={monthlyTimeSheetData} 
          selectedMonth={month}
        />
      </div>
    </div>
  );
}
