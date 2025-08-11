import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Search, X, Check, ChevronsUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import AddScheduleDrawer from "./AddScheduleDrawer";

const ScheduleFilter = ({ 
  shiftData, 
  users, 
  departmentData, 
  selectedMemberId, 
  selectedDepartmentId, 
  selectedShiftId, 
  setSelectedShiftId, 
  setSelectedMemberId, 
  setSelectedDepartmentId 
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [shiftOpen, setShiftOpen] = useState(false);

  const handleClearFilter = (type) => {
    switch (type) {
      case 'member':
        setSelectedMemberId("");
        break;
      case 'department':
        setSelectedDepartmentId("");
        break;
      case 'shift':
        setSelectedShiftId("");
        break;
      default:
        break;
    }
  };

  const getSelectedMemberName = () => {
    if (!selectedMemberId) return "";
    const member = users?.data?.find(m => m.id.toString() === selectedMemberId);
    return member?.name || "";
  };

  const getSelectedDepartmentName = () => {
    if (!selectedDepartmentId) return "";
    const dept = departmentData?.data?.rows?.find(d => d.id.toString() === selectedDepartmentId);
    return dept?.name || "";
  };

  const getSelectedShiftName = () => {
    if (!selectedShiftId) return "";
    const shift = shiftData?.data?.rows?.find(s => s.id.toString() === selectedShiftId);
    return shift ? `${shift.name} (${shift.from_time} - ${shift.to_time})` : "";
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {/* Member Filter */}
          <div className="relative">
            <Popover open={memberOpen} onOpenChange={setMemberOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={memberOpen}
                  className="w-full justify-between pr-8"
                >
                  {selectedMemberId ? getSelectedMemberName() : "Select member..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search members..." />
                  <CommandEmpty>No member found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {users?.data?.map((member) => (
                      <CommandItem
                        key={member.id}
                        value={member.name}
                        onSelect={() => {
                          setSelectedMemberId(member.id.toString());
                          setMemberOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMemberId === member.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {member.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedMemberId && (
              <button
                onClick={() => handleClearFilter('member')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-400 rounded-full p-1"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="relative">
            <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={departmentOpen}
                  className="w-full justify-between pr-8"
                >
                  {selectedDepartmentId ? getSelectedDepartmentName() : "Select department..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search departments..." />
                  <CommandEmpty>No department found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {departmentData?.data?.rows?.map((dept) => (
                      <CommandItem
                        key={dept.id}
                        value={dept.name}
                        onSelect={() => {
                          setSelectedDepartmentId(dept.id.toString());
                          setDepartmentOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedDepartmentId === dept.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {dept.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedDepartmentId && (
              <button
                onClick={() => handleClearFilter('department')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-400 rounded-full p-1"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            )}
          </div>

          {/* Shift Filter */}
          <div className="relative">
            <Popover open={shiftOpen} onOpenChange={setShiftOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={shiftOpen}
                  className="w-full justify-between pr-8"
                >
                  {selectedShiftId ? getSelectedShiftName() : "Select shift..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search shifts..." />
                  <CommandEmpty>No shift found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {shiftData?.data?.rows?.map((shift) => (
                      <CommandItem
                        key={shift.id}
                        value={`${shift.name} ${shift.from_time} ${shift.to_time}`}
                        onSelect={() => {
                          setSelectedShiftId(shift.id.toString());
                          setShiftOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedShiftId === shift.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {shift.name} ({shift.from_time} - {shift.to_time})
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedShiftId && (
              <button
                onClick={() => handleClearFilter('shift')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-400 rounded-full p-1"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Link to="/orgranization/shift">
            <Button
              variant="outline"
              className="whitespace-nowrap text-violet-600 border-violet-600"
            >
              View Shifts
            </Button>
          </Link>

          <Button 
            size="icon" 
            className="bg-primary_color hover:bg-violet-700"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AddScheduleDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        users={users}
        shiftData={shiftData}
      />
    </div>
  );
};

export default ScheduleFilter;
