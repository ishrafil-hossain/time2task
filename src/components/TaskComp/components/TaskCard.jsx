import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Edit, Copy, MoreHorizontal, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TaskCard({ task, isTable = false, onDragStart, isDragging }) {
  const formatDuration = (duration) => {
    if (!duration) return '0:00:00';
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      className={`${isTable ? "" : "mb-3 cursor-move hover:shadow-lg transition-all duration-200 ease-out"}`}
      draggable={!isTable}
      onDragStart={(e) => onDragStart && onDragStart(e, task)}
      style={!isTable ? { transform: isDragging ? "rotate(5deg) scale(1.05)" : "none" } : {}}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${task.color || 'bg-blue-500'}`} />
            <span className="font-medium text-sm">{task.name}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.user?.image || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">
              {task.user?.name?.split(' ').map(n => n[0]).join('') || 'UN'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{task.user?.name || 'Unassigned'}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="text-red-500">{task.dueDate || "No due date"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatDuration(task.time_entry?.duration)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 