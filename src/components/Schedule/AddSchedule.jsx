"use client"

import { useState } from "react"
import { CalendarIcon, Clock, Plus, User, X, ChevronDown, Check, ChevronsUpDown } from "lucide-react"
import { format, addDays } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"

const AddSchedule = ({ 
  users, 
  shiftData, 
  selectedMembers, 
  setSelectedMembers, 
  startDate, 
  setStartDate, 
  selectedShifts, 
  setSelectedShifts 
}) => {
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Generate 7 days starting from selected date
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i)
    return {
      date,
      dayName: format(date, "EEE"),
      dayDate: format(date, "dd MMM"),
      key: i.toString(),
    }
  })

  const handleShiftToggle = (dayKey, checked) => {
    if (checked) {
      setSelectedShifts((prev) => ({ ...prev, [dayKey]: shiftData?.data?.rows[0]?.id?.toString() }))
    } else {
      setSelectedShifts((prev) => {
        const newShifts = { ...prev }
        delete newShifts[dayKey]
        return newShifts
      })
    }
  }

  const handleShiftChange = (dayKey, shiftId) => {
    setSelectedShifts((prev) => ({ ...prev, [dayKey]: shiftId }))
  }

  const toggleMember = (member) => {
    setSelectedMembers((prev) => {
      const isSelected = prev.some((m) => m.id === member.id)
      if (isSelected) {
        return prev.filter((m) => m.id !== member.id)
      } else {
        return [...prev, member]
      }
    })
  }

  const removeMember = (memberId, e) => {
    e?.stopPropagation()
    setSelectedMembers((prev) => prev.filter((m) => m.id !== memberId))
  }

  // Filter members based on search query
  const filteredMembers = users?.data?.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  console.log(users)
  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-[400px]">
        {/* Assignee Section */}
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-start gap-3">
              <Label className="text-sm font-medium block">Schedule Assignee:</Label>

              {/* Selected members avatars */}
              {selectedMembers.length > 0 && (
                <div className="flex -space-x-2">
                  {selectedMembers.map((member) => (
                    <Tooltip key={member.id}>
                      <TooltipTrigger asChild>
                        <div className="relative group">
                          <Avatar className="w-8 h-8 border-2 border-white">
                            <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <button
                            onClick={(e) => removeMember(member.id, e)}
                            className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{member.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}

              {/* Assignee Combobox */}
              <Popover open={isAssigneeOpen} onOpenChange={setIsAssigneeOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isAssigneeOpen}
                    className="h-8 w-8 p-0 rounded-full border-0 hover:bg-gray-100"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600 border-2 border-dashed border-purple-300">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-0" align="start">
                  <Command shouldFilter={false}>
                    <CommandInput 
                      placeholder="Search members..." 
                      value={searchQuery}
                      onValueChange={(value) => {
                        setSearchQuery(value)
                      }}
                      className="h-9"
                    />
                    <CommandEmpty>No members found.</CommandEmpty>
                    <CommandGroup className="max-h-[300px] overflow-auto">
                      {filteredMembers.map((member) => (
                        <CommandItem
                          key={member.id}
                          onSelect={() => {
                            toggleMember(member)
                            setSearchQuery("")
                          }}
                          className="flex items-center gap-2 px-2 py-1.5 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                                {member.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                            {selectedMembers.some((m) => m.id === member.id) && (
                              <Check className="ml-auto h-4 w-4 text-purple-500" />
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Start Date Section */}
        <div className="flex items-center gap-4">
          <Label className="text-sm font-medium w-20">Start Date:</Label>
          <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "MMM dd, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date)
                  setIsDateOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Shift Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Shift:</Label>
          </div>

          <div className="space-y-3">
            {weekDays.map((day) => {
              const isSelected = selectedShifts[day.key]
              const selectedShift = isSelected ? shiftData?.data?.rows?.find((s) => s.id.toString() === selectedShifts[day.key]) : null

              return (
                <div key={day.key} className="flex items-center gap-4">
                  <Checkbox
                    id={`day-${day.key}`}
                    checked={!!isSelected}
                    onCheckedChange={(checked) => handleShiftToggle(day.key, checked)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <div className="flex items-center gap-4 flex-1">
                    <span className={cn("text-sm font-medium w-24", !isSelected && "text-gray-400")}>
                      {day.dayName}, {day.dayDate}
                    </span>
                    <div className="flex items-center gap-2 flex-1">
                      <Clock className={cn("h-4 w-4", !isSelected && "text-gray-400")} />
                      <Select
                        value={selectedShifts[day.key] || ""}
                        onValueChange={(value) => handleShiftChange(day.key, value)}
                        disabled={!isSelected}
                      >
                        <SelectTrigger className={cn("w-[200px]", !isSelected && "text-gray-400 bg-gray-50")}>
                          <SelectValue placeholder="Select shift">
                            {selectedShift && `${selectedShift.name} (${selectedShift.from_time} - ${selectedShift.to_time})`}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {shiftData?.data?.rows?.map((shift) => (
                            <SelectItem key={shift.id} value={shift.id.toString()}>
                              {shift.name} ({shift.from_time} - {shift.to_time})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default AddSchedule 