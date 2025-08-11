"use client"

import { useState } from "react"
import { Calendar, Eye, FileX, MoreVertical, Plus, Search, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Dummy data for leave requests
const leaveRequestsData = [
  {
    id: 1,
    name: "Tasfia Barshat",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Younger Sister Weeding Ceremony Program...",
    leaveType: "Casual",
    leaveTypeColor: "bg-purple-500",
    leaveDate: "29 Jan 2025 -03 Feb 2025",
    status: "Approved",
    statusColor: "bg-green-500",
  },
  {
    id: 2,
    name: "Sabariya Muzumder",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Younger Sister Weeding Ceremony Program...",
    leaveType: "Sick",
    leaveTypeColor: "bg-red-500",
    leaveDate: "22 Jan 2025",
    status: "Requested",
    statusColor: "bg-blue-500",
  },
  {
    id: 3,
    name: "Ishrafil Hossain",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Younger Sister Weeding Ceremony Program...",
    leaveType: "Casual",
    leaveTypeColor: "bg-purple-500",
    leaveDate: "17 Jan 2025 -21 Jan 2025",
    status: "Denied",
    statusColor: "bg-red-500",
  },
  {
    id: 4,
    name: "Sofiqul Islam",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "Younger Sister Weeding Ceremony Program...",
    leaveType: "Sick",
    leaveTypeColor: "bg-red-500",
    leaveDate: "22 Jan 2025",
    status: "Approved",
    statusColor: "bg-green-500",
  },
]

export function LeaveRequest() {
  const [activeDropdown, setActiveDropdown] = useState(null)

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id)
  }

  return (
    <div className="w-full container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Leave Request</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Quick search" className="pl-9" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Select>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <SelectValue placeholder="Select member" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All members</SelectItem>
              {leaveRequestsData.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Type</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="denied">Denied</SelectItem>
              <SelectItem value="requested">Requested</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="whitespace-nowrap text-violet-600 border-violet-200 bg-violet-50 hover:bg-violet-100"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Calendar View
          </Button>
          <Button size="icon" className="bg-violet-600 hover:bg-violet-700">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-medium text-gray-500">Name</th>
              <th className="text-left p-4 font-medium text-gray-500">Reason</th>
              <th className="text-left p-4 font-medium text-gray-500">Leave Type</th>
              <th className="text-left p-4 font-medium text-gray-500">Leave Date</th>
              <th className="text-left p-4 font-medium text-gray-500">Status</th>
              <th className="text-left p-4 font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequestsData.map((request) => (
              <tr key={request.id} className="border-b border-gray-200">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{request.name}</span>
                  </div>
                </td>
                <td className="p-4">{request.reason}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${request.leaveTypeColor}`}></div>
                    <span>{request.leaveType}</span>
                  </div>
                </td>
                <td className="p-4">{request.leaveDate}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${request.statusColor}`}></div>
                    <span>{request.status}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="relative">
                    <DropdownMenu open={activeDropdown === request.id} onOpenChange={() => toggleDropdown(request.id)}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[150px]">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileX className="h-4 w-4 mr-2" />
                          Denied
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
