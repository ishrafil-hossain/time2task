import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Globe, Share } from "lucide-react"
import { DatePickerWithRange } from "../../components/Common/Multi-DatePicker"

export default function AttendanceTracker() {
  const [date, setDate] = useState("Mon, Jan 12 2025")

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Attendance</h1>
          <DatePickerWithRange/>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className=" w-[280px]">
            <div className="relative w-[280px]">
              <Input placeholder="Quick search" className="pl-10" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <Select>
            <SelectTrigger className="w-[280px]">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
                <span>Check In/Out</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="checkin">Check In</SelectItem>
              <SelectItem value="checkout">Check Out</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[280px]">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Select member</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All members</SelectItem>
              <SelectItem value="tasfia">Tasfia Barshat</SelectItem>
              <SelectItem value="sabariya">Sabariya Muzumder</SelectItem>
              <SelectItem value="aminul">Aminul Acter</SelectItem>
              <SelectItem value="ishrafil">Ishrafil Hossain</SelectItem>
              <SelectItem value="forhad">Forhad Anam</SelectItem>
              <SelectItem value="sofiqul">Sofiqul Islam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="overflow-hidden shadow-none border-none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check In</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check Out</th>
                </tr>
              </thead>
              <tbody>
                <AttendanceRow
                  name="Tasfia Barshat"
                  avatar="/placeholder.svg?height=40&width=40"
                  checkIn={{
                    time: "10:32 am",
                    late: "02:00min",
                    ip: "255.255.255.0",
                    reason: "Heavy traffic in the city",
                    status: "Acceptable",
                  }}
                  checkOut={{
                    time: "6:57 am",
                    early: "03:00min",
                    ip: "255.255.255.0",
                    reason: "Go to Hospital",
                    status: "Acceptable",
                  }}
                />
                <AttendanceRow
                  name="Sabariya Muzumder"
                  avatar="/placeholder.svg?height=40&width=40"
                  checkIn={{
                    time: "10:10 am",
                    ip: "255.255.255.0",
                    onTime: true,
                  }}
                  checkOut={{
                    time: "7:00 pm",
                    ip: "255.255.255.0",
                    onTime: true,
                  }}
                />
                <AttendanceRow
                  name="Aminul Acter"
                  avatar="/placeholder.svg?height=40&width=40"
                  checkIn={{
                    time: "10:40 am",
                    late: "10:00min",
                    ip: "255.255.255.0",
                    reason: "Late rise today's morning",
                    status: "Not acceptable",
                  }}
                  checkOut={{
                    time: "7:00 pm",
                    ip: "255.255.255.0",
                    onTime: true,
                  }}
                />
                <AttendanceRow
                  name="Ishrafil Hossain"
                  avatar="/placeholder.svg?height=40&width=40"
                  checkIn={{
                    time: "10:21 am",
                    ip: "255.255.255.0",
                    onTime: true,
                  }}
                  checkOut={{
                    time: "6:49 am",
                    early: "11:00min",
                    ip: "255.255.255.0",
                    reason: "Family hangout",
                    status: "Not acceptable",
                  }}
                />
                <AttendanceRow
                  name="Forhad Anam"
                  avatar="/placeholder.svg?height=40&width=40"
                  checkIn={{
                    time: "10:32 am",
                    late: "02:00min",
                    ip: "255.255.255.0",
                  }}
                  checkOut={{
                    time: "----",
                  }}
                />
                <AttendanceRow
                  name="Sofiqul Islam"
                  avatar="/placeholder.svg?height=40&width=40"
                  checkIn={{
                    time: "10:07 am",
                    ip: "255.255.255.0",
                    onTime: true,
                  }}
                  checkOut={{
                    time: "----",
                  }}
                />
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}



function AttendanceRow({ name, avatar, checkIn, checkOut }) {
  return (
    <tr className="border-b ">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-full">
            <img src={avatar || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
          </Avatar>
          <span>{name}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span>{checkIn.time}</span>
            {checkIn.late && (
              <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200 rounded-full">
                {checkIn.late}
              </Badge>
            )}
            {checkIn.onTime && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
          </div>
          {checkIn.ip && (
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Globe className="h-3 w-3" />
              <span>{checkIn.ip}</span>
            </div>
          )}
          {checkIn.reason && (
            <div className="flex items-center gap-2 text-sm">
              <span>Reason: {checkIn.reason}</span>
              {checkIn.status && (
                <Badge
                  variant={checkIn.status === "Acceptable" ? "outline" : "destructive"}
                  className={`
                    ${
                      checkIn.status === "Acceptable"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                    rounded-md
                  `}
                >
                  {checkIn.status}
                </Badge>
              )}
            </div>
          )}
        </div>
      </td>
      <td className="p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span>{checkOut.time}</span>
            {checkOut.early && (
              <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200 rounded-full">
                {checkOut.early}
              </Badge>
            )}
            {checkOut.onTime && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
          </div>
          {checkOut.ip && (
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Globe className="h-3 w-3" />
              <span>{checkOut.ip}</span>
            </div>
          )}
          {checkOut.reason && (
            <div className="flex items-center gap-2 text-sm">
              <span>Reason: {checkOut.reason}</span>
              {checkOut.status && (
                <Badge
                  variant={checkOut.status === "Acceptable" ? "outline" : "destructive"}
                  className={`
                    ${
                      checkOut.status === "Acceptable"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                    rounded-md
                  `}
                >
                  {checkOut.status}
                </Badge>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}
