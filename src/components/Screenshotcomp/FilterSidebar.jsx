"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function FilterSidebar({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} side="right">
      <SheetContent className="w-[350px] sm:w-[400px] p-6">
        <SheetHeader className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 bg-purple-500"></div>
            <SheetTitle className="text-lg font-medium">Filter</SheetTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Member</label>
            <Select defaultValue="tasfia">
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      T
                    </div>
                    <span>Tashfia Barshat</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tasfia">Tashfia Barshat</SelectItem>
                <SelectItem value="ishrafil">Ishrafil Hossain</SelectItem>
                <SelectItem value="sofiqul">Sofiqul Islam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Timezone</label>
            <Select defaultValue="asia-dhaka">
              <SelectTrigger className="w-full">
                <SelectValue>Asia/Dhaka</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asia-dhaka">Asia/Dhaka</SelectItem>
                <SelectItem value="america-new_york">America/New_York</SelectItem>
                <SelectItem value="europe-london">Europe/London</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Project</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue>All project</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All project</SelectItem>
                <SelectItem value="time-tracking">Time Tracking Application</SelectItem>
                <SelectItem value="econmart">Econmart Ecommerce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Time Type</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue>All type</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All type</SelectItem>
                <SelectItem value="worked">Worked</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
