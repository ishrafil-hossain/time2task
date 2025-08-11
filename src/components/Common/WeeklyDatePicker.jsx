import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
} from "date-fns";
import { useEffect, useState } from "react";
import formatDate from "./DateFormat";

const WeeklyDatePicker = ({ setSelectedDate }) => {
  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });
  const [datePickerDate, setDatePickerDate] = useState(today);
  
  useEffect(() => {
    if (currentWeek) {
      setSelectedDate({
        startDate: formatDate(currentWeek.start),
        endDate: formatDate(currentWeek.end),
      });
    }
  }, [currentWeek, setSelectedDate]);

  const handlePrevWeek = () => {
    const newStart = addWeeks(currentWeek.start, -1);
    const newEnd = endOfWeek(newStart);
    setCurrentWeek({ start: newStart, end: newEnd });
    setDatePickerDate(newStart);
  };

  const handleNextWeek = () => {
    const newStart = addWeeks(currentWeek.start, 1);
    const newEnd = endOfWeek(newStart);
    setCurrentWeek({ start: newStart, end: newEnd });
    setDatePickerDate(newStart);
  };

  const handleDateSelect = (date) => {
    if (date) {
      const weekStart = startOfWeek(date);
      const weekEnd = endOfWeek(date);
      
      setDatePickerDate(date);
      setCurrentWeek({ start: weekStart, end: weekEnd });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-0 border-[#B129FF] border-[1px] px-2 py-[0px] rounded-lg">
        <div
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium cursor-pointer hover:bg-gray-100"
          onClick={() => {
            const now = new Date();
            setDatePickerDate(now);
            setCurrentWeek({
              start: startOfWeek(now),
              end: endOfWeek(now)
            });
          }}
        >
          <p className="text-sm font-medium">This Week</p>
        </div>
        <div className="flex items-center">
          <button
            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
            onClick={handlePrevWeek}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
            onClick={handleNextWeek}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="text-sm text-gray-600 justify-start text-left font-normal shadow-none border-none"
            >
              {format(currentWeek.start, "EEE, LLL dd y")} -{" "}
              {format(currentWeek.end, "EEE, LLL dd y")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={datePickerDate}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              modifiersStyles={{
                selected: {
                  backgroundColor: "#B129FF",
                  color: "white",
                },
                range_start: {
                  backgroundColor: "#B129FF",
                  color: "white",
                },
                range_end: {
                  backgroundColor: "#B129FF", 
                  color: "white",
                },
                range_middle: {
                  backgroundColor: "#F7EAFF",
                  opacity: 0.5,
                },
              }}
              modifiers={{
                selected: (date) => 
                  date.getTime() === datePickerDate.getTime(),
                range_start: (date) => 
                  date.getTime() === currentWeek.start.getTime(),
                range_end: (date) => 
                  date.getTime() === currentWeek.end.getTime(),
                range_middle: (date) => 
                  date > currentWeek.start && date < currentWeek.end
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};



export default WeeklyDatePicker;