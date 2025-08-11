import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "../../components/Common/Multi-DatePicker";
import { useGetShiftQuery } from "../../redux/Shift/shift";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useGetDepartmentsQuery } from "../../redux/Department/departmentApi";
import ScheduleFilter from "../../components/Schedule/ScheduleFilter";
import { useGetAllMembersQuery } from "../../redux/Member/membersApi";
import { useGetScheduleQuery } from "../../redux/Schedule/Schedule";
import { format, parseISO, eachDayOfInterval } from "date-fns";

export function Schedule() {
  // Filter states
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedShiftId, setSelectedShiftId] = useState("");
  
  // Date range state
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 6)) // Default to next 7 days
  });

  // API Queries
  const {
    data: shiftData,
    isLoading: isShiftLoading,
    refetch: refetchShifts,
  } = useGetShiftQuery({
    page: 1,
    limit: 1000,
  });

  const {
    data: members,
    isLoading: isMembersLoading,
    refetch: refetchMembers,
  } = useGetAllMembersQuery({
    limit: 1000,
  });

  const { 
    data: departmentData,
    isLoading: isDepartmentLoading 
  } = useGetDepartmentsQuery({
    page: 1,
    limit: 1000,
  });

  // Schedule data query with filters
  const {
    data: scheduleData,
    isLoading: isScheduleLoading,
    refetch: refetchSchedule
  } = useGetScheduleQuery({
    start_date: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    end_date: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    shift_id: selectedShiftId || undefined,
    department_id: selectedDepartmentId || undefined,
    status: 'active'
  }, {
    skip: !dateRange.from || !dateRange.to // Skip query if dates are not set
  });

  // Handle date range change
  const handleDateRangeChange = (range) => {
    if (range?.from && range?.to) {
      setDateRange(range);
    }
  };

  // Loading state
  const isLoading = isShiftLoading || isMembersLoading || isDepartmentLoading || isScheduleLoading;

  // Get all dates in the range
  const datesInRange = dateRange.from && dateRange.to 
    ? eachDayOfInterval({ start: dateRange.from, end: dateRange.to })
    : [];

  return (
    <div className="w-full px-6 lg:px-2 mt-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Schedule Overview</h1>
        <DatePickerWithRange 
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <ScheduleFilter 
        shiftData={shiftData} 
        users={members} 
        departmentData={departmentData}
        selectedMemberId={selectedMemberId}
        selectedDepartmentId={selectedDepartmentId}
        selectedShiftId={selectedShiftId}
        setSelectedMemberId={setSelectedMemberId}
        setSelectedDepartmentId={setSelectedDepartmentId}
        setSelectedShiftId={setSelectedShiftId}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-x-scroll">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-4 font-medium text-gray-600 w-[200px]">
                    Member ({scheduleData?.members?.length || 0})
                  </th>
                  {datesInRange.map((date) => (
                    <th
                      key={format(date, 'yyyy-MM-dd')}
                      className="text-left p-4 font-medium text-gray-600 min-w-[150px]"
                    >
                      {format(date, 'EEE')},{" "}
                      <span className="text-violet-600">{format(date, 'MMM dd')}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData?.members?.map((member) => (
                  <tr key={member.name} className="border-b">
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{member.name}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn("w-fit", "bg-purple-100 text-purple-800")}
                        >
                          {member.department || 'No Department'}
                        </Badge>
                      </div>
                    </td>
                    {datesInRange.map((date) => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      const daySchedule = member.schedule[dateStr];
                      
                      return (
                        <td key={dateStr} className="p-4 border-l">
                          {daySchedule?.time && daySchedule?.shift ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>{daySchedule.time}</span>
                              </div>
                              <div className="flex items-center gap-1 pl-3">
                                {daySchedule.shift === "morning" ? (
                                  <>
                                    <Sun className="h-4 w-4 text-amber-400" />
                                    <span className="text-amber-500">Morning</span>
                                  </>
                                ) : (
                                  <>
                                    <Moon className="h-4 w-4 text-blue-400" />
                                    <span className="text-blue-500">Night</span>
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
