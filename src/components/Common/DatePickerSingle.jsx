import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import formatDate from "./DateFormat";

export default function DatePickerSingle({ setSelectedDate, selectedDate }) {
  const today = new Date();
  const [date, setDate] = useState(today);

  useEffect(() => {
    setSelectedDate(formatDate(date));
  }, [date]);

  const handlePrevDay = () => {
    setDate((prevDate) => addDays(prevDate, -1));
  };

  const handleNextDay = () => {
    setDate((prevDate) => addDays(prevDate, 1));
  };

  return (
    <div className="p-[0.5px] rounded-[6px] bg-gradient-to-b from-[#009DDA] to-[#294DFF] relative">
      <div className="flex items-center gap-0 py-0 px-0 rounded-[6px] bg-white">
        <div className="flex items-center">
          <button
            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
            onClick={handlePrevDay}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium cursor-pointer hover:bg-gray-100"
            onClick={() => setDate(new Date())}
          >
            <p className="text-sm font-medium">Today</p>
          </div>
          <button
            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100 rounded"
            onClick={handleNextDay}
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
              {format(date, "EEE, LLL dd y")}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
            side="bottom"
            avoidCollisions={true}
            collisionPadding={16}
            style={{
              transform: "translateX(0)",
              left: "0 !important",
              maxWidth: "calc(100vw - 32px)",
            }}
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
              modifiersStyles={{
                selected: {
                  backgroundColor: "#B129FF",
                  color: "white",
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
