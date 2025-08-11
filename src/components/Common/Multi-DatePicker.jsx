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
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameWeek,
  addWeeks,
} from "date-fns";
import { useEffect, useState } from "react";

export function DatePickerWithRange({ startDate, endDate }) {
  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });
  const [dates, setDates] = useState([currentWeek.start, currentWeek.end]);

  useEffect(() => {
    if (startDate && endDate) {
      setCurrentWeek({
        start: startOfWeek(new Date(startDate)),
        end: endOfWeek(new Date(endDate)),
      });
      setDates([
        new Date(startOfWeek(startDate)),
        new Date(endOfWeek(endDate)),
      ]);
    }
  }, [startDate, endDate]);

  const handlePrevWeek = () => {
    const newStart = addWeeks(currentWeek.start, -1);
    const newEnd = addWeeks(currentWeek.end, -1);
    setCurrentWeek({ start: newStart, end: newEnd });
    setDates([newStart, newEnd]);
  };

  const handleNextWeek = () => {
    const newStart = addWeeks(currentWeek.start, 1);
    const newEnd = addWeeks(currentWeek.end, 1);
    setCurrentWeek({ start: newStart, end: newEnd });
    setDates([newStart, newEnd]);
  };

  const handleWeekSelect = (selectedDates) => {
    if (selectedDates && selectedDates.length > 1) {
      const sortedDates = [...selectedDates].sort((a, b) => a - b);
      const weekStart = startOfWeek(sortedDates[0]);
      const weekEnd = endOfWeek(sortedDates[sortedDates.length - 1]);

      setCurrentWeek({ start: weekStart, end: weekEnd });
      setDates([weekStart, weekEnd]);
    }
  };

  return (
    <div className="flex items-center gap-0 border-[#B129FF] border-[1px] px-2 py-[0px] rounded-lg">
      <div className="flex items-center">
        <button
          className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
          onClick={handlePrevWeek}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium cursor-pointer hover:bg-gray-100"
          onClick={() => {
            const now = new Date();
            const weekStart = startOfWeek(now);
            const weekEnd = endOfWeek(now);
            setCurrentWeek({ start: weekStart, end: weekEnd });
            setDates([weekStart, weekEnd]);
          }}
        >
          <p className="text-sm font-medium">This Week</p>
        </div>

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
            {format(dates[0], "EEE, LLL dd y")} -{" "}
            {format(dates[1], "EEE, LLL dd y")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="multiple"
            selected={dates}
            onSelect={handleWeekSelect}
            numberOfMonths={2}
            modifiersStyles={{
              selected: {
                backgroundColor: "#B129FF",
                color: "white",
              },
              range_middle: {
                backgroundColor: "#F7EAFF",
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
