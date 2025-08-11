"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function TimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState(Number.parseInt(value.split(":")[0]) % 12 || 12)
  const [selectedMinute, setSelectedMinute] = useState(Number.parseInt(value.split(":")[1].split(" ")[0]))
  const [selectedPeriod, setSelectedPeriod] = useState(value.includes("PM") ? "PM" : "AM")

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  useEffect(() => {
    const formattedHour = selectedHour.toString().padStart(2, "0")
    const formattedMinute = selectedMinute.toString().padStart(2, "0")

    onChange(`${formattedHour}:${formattedMinute} ${selectedPeriod}`)
  }, [selectedHour, selectedMinute, selectedPeriod, onChange])

  return (
    <div className="w-full border-[#B129FF] border py-[0px] px-2 rounded-lg">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal !shadow-none !border-none",
            !value && "text-muted-foreground",
          )}
        >
          <Clock className="mr-2 h-4 w-4 text-purple-500" />
          {value || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 shadow-md border border-purple-100" align="start">
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label className="text-gray-700">Hour</Label>
            <div className="h-[200px] overflow-y-auto pr-2 border rounded-md border-gray-100">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1 text-center",
                    selectedHour === hour ? "bg-purple-100 text-purple-500 font-medium" : "hover:bg-purple-50",
                  )}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">Minute</Label>
            <div className="h-[200px] overflow-y-auto pr-2 border rounded-md border-gray-100">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1 text-center",
                    selectedMinute === minute ? "bg-purple-100 text-purple-500 font-medium" : "hover:bg-purple-50",
                  )}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">AM/PM</Label>
            <div className="space-y-2 border rounded-md border-gray-100 p-2">
              <div
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1 text-center",
                  selectedPeriod === "AM" ? "bg-purple-100 text-purple-500 font-medium" : "hover:bg-purple-50",
                )}
                onClick={() => setSelectedPeriod("AM")}
              >
                AM
              </div>
              <div
                className={cn(
                  "cursor-pointer rounded-md px-3 py-1 text-center",
                  selectedPeriod === "PM" ? "bg-purple-100 text-purple-500 font-medium" : "hover:bg-purple-50",
                )}
                onClick={() => setSelectedPeriod("PM")}
              >
                PM
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={() => setOpen(false)} className="bg-purple-500 hover:bg-purple-600">
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  )
}
