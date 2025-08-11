import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DepartmentCard({ department, onDepartmentClick }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card
      className="overflow-hidden bg-gradient-to-br from-white to-gray-50/50 border-gray-100 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      onClick={() => onDepartmentClick(department)}
    >
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
              {department.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Created {new Date(department.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2">
        <p className="text-slate-600 text-sm mb-4 font-medium">
          Total Members: <span className="text-slate-800">{department.department_member?.length || 0}</span>
        </p>
        <div className="flex -space-x-2 overflow-hidden">
          {department.department_member?.slice(0, 5).map((member) => (
            <Avatar
              key={member.id}
              className="border-2 border-white h-9 w-9 hover:scale-110 transition-transform duration-200 hover:z-10 relative"
            >
              <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 text-xs font-semibold">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          ))}
          {department.department_member?.length > 5 && (
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-white text-xs font-semibold text-slate-600 hover:scale-110 transition-transform duration-200">
              +{department.department_member.length - 5}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 