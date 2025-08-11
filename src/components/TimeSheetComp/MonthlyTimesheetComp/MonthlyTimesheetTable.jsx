import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const MonthlyTimesheetTable = ({ monthlyTimeSheetData, selectedMonth }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create a map of dates to timesheet data for quick lookup
  const timesheetDataMap = useMemo(() => {
    if (!monthlyTimeSheetData?.data) return new Map();
    
    const map = new Map();
    monthlyTimeSheetData.data.forEach(entry => {
      const date = new Date(entry.date);
      const day = date.getDate();
      map.set(day, entry);
    });
    return map;
  }, [monthlyTimeSheetData]);

  // Get days with entries for highlighting
  const daysWithEntries = useMemo(() => {
    return new Set(Array.from(timesheetDataMap.keys()));
  }, [timesheetDataMap]);

  // Generate calendar weeks based on selected month
  const weeks = useMemo(() => {
    let year = currentYear;
    let month = currentMonth;
    
    // If selectedMonth is provided, parse it to get year and month
    if (selectedMonth) {
      const selectedDate = new Date(selectedMonth);
      year = selectedDate.getFullYear();
      month = selectedDate.getMonth();
    }
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const calendar = [];
    let week = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      week.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }
    
    // Add remaining days to complete the last week
    while (week.length < 7 && week.length > 0) {
      week.push(null);
    }
    if (week.length > 0) {
      calendar.push(week);
    }
    
    return calendar;
  }, [selectedMonth, currentYear, currentMonth]);

  const isWeekend = (weekIndex, dayIndex) => {
    return dayIndex === 0 || dayIndex === 6; // Sunday or Saturday
  };

  // Check if we're viewing the current month
  const isViewingCurrentMonth = useMemo(() => {
    if (!selectedMonth) return true; // Default to current month if no selection
    
    const selectedDate = new Date(selectedMonth);
    const currentDate = new Date();
    
    return selectedDate.getMonth() === currentDate.getMonth() && 
           selectedDate.getFullYear() === currentDate.getFullYear();
  }, [selectedMonth]);

  const formatHours = (hours) => {
    const numHours = parseFloat(hours);
    if (numHours < 1) {
      return `${Math.round(numHours * 60)}m`;
    }
    return `${numHours.toFixed(1)}h`;
  };

  return (
    <div>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center bg-gray-50 border-b border-gray-200">
          {days.map((day, index) => (
            <div
              key={index}
              className={cn(
                "py-2.5 font-medium text-sm",
                index >= 5 ? "text-purple-500" : "text-gray-700"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="divide-y divide-gray-200">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 divide-x divide-gray-200"
            >
              {week.map((day, dayIndex) => {
                const isCurrentMonth = day !== null;
                const isToday = day === today && isCurrentMonth && isViewingCurrentMonth;
                const weekend = isWeekend(weekIndex, dayIndex);
                const hasEntry = day && daysWithEntries.has(day);
                const isSelected = selectedDay === day && isCurrentMonth;
                const dayData = day ? timesheetDataMap.get(day) : null;

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      "min-h-28 p-2 transition-colors relative group cursor-pointer",
                      isCurrentMonth
                        ? "bg-white"
                        : "bg-gray-50 text-gray-400",
                      weekend && isCurrentMonth ? "bg-gray-50" : "",
                      isToday ? "bg-purple-50" : "",
                      isSelected ? "ring-2 ring-inset ring-purple-500" : ""
                    )}
                    onClick={() =>
                      isCurrentMonth &&
                      setSelectedDay(day === selectedDay ? null : day)
                    }
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <div
                            className={cn(
                              "flex items-center justify-center h-7 w-7 rounded-full text-sm",
                              isToday
                                ? "bg-purple-600 text-white font-bold"
                                : "font-medium text-gray-700"
                            )}
                          >
                            {day}
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-purple-600">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {hasEntry && dayData && (
                          <div className="mt-2">
                            <div
                              className={cn(
                                "bg-purple-100 text-purple-800 px-2.5 py-1.5 rounded-md text-sm font-medium",
                                "border border-purple-200 shadow-sm hover:bg-purple-200 transition-colors"
                              )}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-purple-600">
                                  Hours
                                </span>
                                <span>{formatHours(dayData.hour)}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-purple-600">
                                  Pay
                                </span>
                                <span>${dayData.payable}</span>
                              </div>
                              {dayData.overtime_hours > 0 && (
                                <div className="flex justify-between items-center text-xs mt-1 pt-1 border-t border-purple-200">
                                  <span className="text-purple-600">
                                    OT
                                  </span>
                                  <span>{formatHours(dayData.overtime_hours)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {!hasEntry && (
                          <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="text-xs text-gray-400">
                              No entries
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyTimesheetTable;