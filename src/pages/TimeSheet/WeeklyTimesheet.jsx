"use client";

import { useState, useEffect } from "react";
import {

  Calendar,
} from "lucide-react";

import { motion } from "framer-motion";
import WeeklyTimeSheetFilter from "../../components/WeeklyTimeSheetComp/WeeklyTimeSheetFilter";
import { useGetProfileQuery } from "../../redux/features/OrgProfile/OrgProfile";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useGetWeeklyReportQuery } from "../../redux/Weekly/weeklyApi";
import { endOfISOWeek, format, startOfISOWeek } from "date-fns";
import Nodata from "../../components/Common/No-data";

export default function WeeklyTimesheet() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [mounted, setMounted] = useState(false);

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState({
    startDate: format(startOfISOWeek(today), "yyyy-MM-dd"),
    endDate: format(endOfISOWeek(today), "yyyy-MM-dd"),
  });

  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (profile) {
      setSelectedValue(profile?.id);
    } else {
      setSelectedValue(null);
    }
  }, [profile]);

  const { data: users } = useGetSearchMembersQuery({
    page: 1,
    limit: 1000,
  });

  const {
    data: weeklyData,
    isloading,
    isError,
  } = useGetWeeklyReportQuery({
    from_date: selectedDate?.startDate,
    to_date: selectedDate?.endDate,
    user_id: selectedValue,
  });

  console.log("weeklyData", weeklyData);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate days of the week
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);
  const daysToSubtract = dayOfWeek === 0 ? 1 : dayOfWeek + 1;
  startOfWeek.setDate(today.getDate() - daysToSubtract + currentWeek * 7);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const formatDay = (date) => date.getDate();

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  if (!mounted) return null;

  // Compact format (e.g., "1h 30m" becomes "1.5h")
  function formatHoursToHMCompact(hours) {
    if (typeof hours === "number" && hours === 0) return "0h";

    if (typeof hours === "string") {
      const [h, m, s] = hours.split(":").map(Number);
      const totalHours = h + m / 60;
      return totalHours % 1 === 0
        ? `${totalHours}h`
        : `${totalHours.toFixed(1)}h`;
    }

    return "0h";
  }

  // Convert "HH:MM:SS" to decimal hours
  function convertHoursToDecimal(timeStr) {
    if (typeof timeStr === "number") return timeStr;
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours + minutes / 60 + seconds / 3600;
  }

  // Convert decimal hours to "Xh Ym" format
  function formatDecimalToHM(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }




  
  return (
    <div className="min-h-screen  p-6">
      <div className=" container mx-auto rounded-xl bg-white  overflow-hidden">
        {/* Header */}
        <div className=" text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              <h1 className="text-2xl font-bold text-black">
                Weekly Timesheet
              </h1>
            </div>
          </div>
        </div>

        {/* Controls */}
        <WeeklyTimeSheetFilter
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          users={users}
          setSelectedDate={setSelectedDate}
        />
        {/* Weekly Calendar */}
        {
          !weeklyData?.members || weeklyData.members.length <= 0 ? (
            <div className="py-6">
            {/* Days of week header */}
            
  
            {/* Week dates */}
            {/* Weekly Calendar */}
            <div className="p-6">
              {/* Days of week header - fixed at top */}
              <div className="grid grid-cols-8 gap-4 mb-2 sticky top-0 bg-white z-10 pb-2 border-b">
                <div className="text-left font-semibold text-gray-700 min-w-[120px]">
                  Members
                </div>
                <div className="grid grid-cols-7 gap-4 col-span-7">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className="text-center font-semibold text-gray-700 text-sm"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
  
              {/* Member rows */}
              <div className="space-y-3">
                {weeklyData?.members.map((member) => (
                  <div
                    key={member.name}
                    className="grid grid-cols-8 gap-4 items-center"
                  >
                    {/* Member name */}
                    <div className="text-left font-medium text-gray-800 truncate min-w-[120px]">
                      {member.name}
                    </div>
  
                    {/* Week dates for this member */}
                    <div className="grid grid-cols-7 gap-4 col-span-7">
                      {weekDates.map((date, index) => {
                        const isDateToday = isToday(date);
                        const isDateWeekend = isWeekend(date);
                        const dateStr = format(date, "yyyy-MM-dd");
  
                        const dailyData = member.dailyHours.find(
                          (d) => d.date === dateStr
                        );
                        const hoursDisplay = dailyData
                          ? dailyData.hours === 0
                            ? "0h"
                            : formatHoursToHMCompact(dailyData.hours)
                          : "0h";
  
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className={`
                    rounded-lg border p-2 h-16 flex flex-col
                    ${
                      isDateToday
                        ? "border-purple-300 bg-purple-50"
                        : "border-gray-200 bg-white"
                    }
                    ${isDateWeekend ? "bg-opacity-50" : ""}
                    hover:shadow-sm transition-shadow
                  `}
                          >
                            <div
                              className={`
                      text-center mb-1 font-medium text-xs rounded-full w-6 h-6 flex items-center justify-center mx-auto
                      ${
                        isDateToday ? "bg-purple-600 text-white" : "text-gray-600"
                      }
                    `}
                            >
                              {formatDay(date)}
                            </div>
  
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex justify-center flex-grow items-center"
                            >
                              <div
                                className={`
                      bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 rounded-md 
                      text-xs text-center shadow-xs w-full
                      ${dailyData?.hours === 0 ? "opacity-50" : ""}
                    `}
                              >
                                {hoursDisplay}
                              </div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Total row */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-8 gap-4 items-center border-t pt-3">
                <div className="text-left font-semibold text-gray-800 min-w-[120px]">
                  Total
                </div>
                <div className="grid grid-cols-7 gap-4 col-span-7">
                  {weekDates.map((date, index) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const totalHours = weeklyData?.members.reduce(
                      (sum, member) => {
                        const dailyData = member.dailyHours.find(
                          (d) => d.date === dateStr
                        );
                        if (dailyData && dailyData.hours !== 0) {
                          return sum + convertHoursToDecimal(dailyData.hours);
                        }
                        return sum;
                      },
                      0
                    );
  
                    return (
                      <div
                        key={index}
                        className="h-16 flex items-center justify-center"
                      >
                        <div className="bg-gray-100 text-gray-800 font-medium px-2 py-1 rounded-md text-xs">
                          {totalHours > 0 ? formatDecimalToHM(totalHours) : "0h"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          ) :(<div className=" mt-5"> <Nodata  /></div>)
        }

      </div>
    </div>
  );
}
