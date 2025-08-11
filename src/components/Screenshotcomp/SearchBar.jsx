"use client"

import { useState } from "react"
import { Search, Users, Globe, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export function SearchBarSection({ onFilterClick }) {
  const [showProjectSearch, setShowProjectSearch] = useState(false)
  const [showMemberSearch, setShowMemberSearch] = useState(false)
  const [showTimezoneSearch, setShowTimezoneSearch] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ProjectSearchPopover open={showProjectSearch} onOpenChange={setShowProjectSearch} />
      <MemberSearchPopover open={showMemberSearch} onOpenChange={setShowMemberSearch} />
      <TimezoneSearchPopover open={showTimezoneSearch} onOpenChange={setShowTimezoneSearch} />

      <Button
        variant="outline"
        onClick={onFilterClick}
        className="flex items-center gap-2 rounded-md border border-gray-200"
      >
        <FilterIcon className="h-4 w-4" />
        <span>Filter</span>
      </Button>
    </div>
  )
}

function ProjectSearchPopover({ open, onOpenChange }) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-[220px] justify-start">
          <Search className="h-4 w-4 text-purple-500" />
          <span className="text-muted-foreground">Search projects</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="start">
        <div className="p-4">
          <div className="flex items-center border rounded-md px-3 py-2 mb-4">
            <Search className="h-5 w-5 text-purple-500 mr-2" />
            <input className="flex-1 bg-transparent outline-none" placeholder="Search project" />
          </div>
          <div className="space-y-3">
            <div className="px-1 py-2 hover:bg-slate-100 cursor-pointer">
              <p className="font-medium">Time To Task</p>
            </div>
            <div className="px-1 py-2 hover:bg-slate-100 cursor-pointer">
              <p className="font-medium">Time Tracking Application</p>
            </div>
            <div className="px-1 py-2 hover:bg-slate-100 cursor-pointer">
              <p className="font-medium">Econmart Ecommerce</p>
            </div>
            <div className="px-1 py-2 hover:bg-slate-100 cursor-pointer">
              <p className="font-medium">Tender Web Application</p>
            </div>
            <div className="px-1 py-2 text-purple-500 hover:bg-slate-100 cursor-pointer">
              <p className="font-medium">+ Add Project</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MemberSearchPopover({ open, onOpenChange }) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-[220px] justify-start">
          <Users className="h-4 w-4 text-purple-500" />
          <span className="text-muted-foreground">Search member</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="start">
        <div className="p-4">
          <div className="flex items-center border rounded-md px-3 py-2 mb-4">
            <Search className="h-5 w-5 text-purple-500 mr-2" />
            <input className="flex-1 bg-transparent outline-none" placeholder="Search member" />
          </div>
          <div className="border-b mb-2">
            <div className="flex">
              <div className="px-4 py-2 text-purple-500 border-b-2 border-purple-500 font-medium">Person</div>
              <div className="px-4 py-2 text-gray-500">Group</div>
              <div className="px-4 py-2 text-gray-500">Department</div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: "Tasfia Barshat", avatar: "/placeholder.svg?height=40&width=40" },
              { name: "Ishrafil Hossain", avatar: "/placeholder.svg?height=40&width=40" },
              { name: "Sofiqul Islam", avatar: "/placeholder.svg?height=40&width=40" },
              { name: "Sabariya Muzumder", avatar: "/placeholder.svg?height=40&width=40" },
              { name: "Aminul Acter", avatar: "/placeholder.svg?height=40&width=40" },
            ].map((person, index) => (
              <div key={index} className="flex items-center gap-3 px-1 py-2 hover:bg-slate-100 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <img src={person.avatar || "/placeholder.svg"} alt={person.name} width={32} height={32} />
                </Avatar>
                <p className="font-medium">{person.name}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function TimezoneSearchPopover({ open, onOpenChange }) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>Asia/Dhaka</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0" align="start">
        <div className="p-4">
          <div className="flex items-center border rounded-md px-3 py-2 mb-4">
            <Search className="h-5 w-5 text-purple-500 mr-2" />
            <input className="flex-1 bg-transparent outline-none" placeholder="Search timezone" />
          </div>
          <div className="space-y-3">
            {[
              { name: "(GMT-06) Asia/Dhaka", selected: true },
              { name: "(UTC-06) Asia/Dhaka", selected: false },
              { name: "(UTC+12:00) Asia/Dhaka", selected: false },
              { name: "(GMT-06) Asia/Dhaka", selected: false },
              { name: "(UTC+12:00) Asia/Dhaka", selected: false },
            ].map((timezone, index) => (
              <div key={index} className="flex items-center gap-3 px-1 py-2 hover:bg-slate-100 cursor-pointer">
                {timezone.selected && <Checkbox checked className="text-purple-500" />}
                <p className="font-medium">{timezone.name}</p>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
