import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  MoreHorizontal,
  CheckCircle,
  Trash2,
  Users,
  Plus,
  Building2,
  Timer,
  Edit,
  Copy,
} from "lucide-react";
import { TaskForm } from "./TaskForm";
import { useDeleteTaskMutation } from "../../../redux/Task/taskapi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export function TableView({
  tasks,
  showTaskForm,
  newTask,
  setNewTask,
  handleAddTask,
  setShowTaskForm,
  getImpactColor,
  setEditTask,
}) {
  const [deleteTask] = useDeleteTaskMutation();

  const formatDuration = (duration) => {
    if (!duration) return '0:00:00';
    // Assuming duration is in seconds
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowTaskForm(true);
  };

  const handleDelete = async (task) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B029FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteTask(task.id).unwrap();
        if (response) {
          toast.success("Task deleted successfully");
          Swal.fire(
            "Deleted!",
            "Task has been deleted.",
            "success"
          );
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete task");
        Swal.fire(
          "Error!",
          "Failed to delete task.",
          "error"
        );
      }
    }
  };

  console.log("tasks", tasks);
  return (
    <div className="bg-white rounded-lg border">
      <div className="grid grid-cols-8 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-600">
        <div>Task Name</div>
        <div>Description</div>
        <div>Project</div>
        <div>Assignee</div>
        <div>Status</div>
        <div>Time Entry</div>
        <div>Created At</div>
        <div>Action</div>
      </div>

      {/* New Task Form Row */}
      {/* {showTaskForm && (
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-purple-300 bg-purple-100 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <Input
              placeholder="New Task"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="border-none bg-transparent p-0  font-medium focus-visible:ring-0 bg-white p-4"
              autoFocus
            />
          </div>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full border-2 border-dashed border-purple-400"
            >
              <Users className="h-4 w-4 text-purple-400" />
            </Button>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500">0:00:00</span>
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <div className="w-4 h-4 rounded-full bg-gray-400" />
            </Button>
          </div>

          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Calendar className="h-4 w-4 text-gray-400" />
            </Button>
          </div>

          <div className="flex items-center">
            <Select value={newTask.impact} onValueChange={(value) => setNewTask({ ...newTask, impact: value })}>
              <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleAddTask}>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowTaskForm(false)}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Plus className="h-4 w-4 text-purple-600 border border-purple-600 rounded-sm" />
            </Button>
          </div>
        </div>
      )} */}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="grid grid-cols-8 gap-4 p-4 border-b hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-medium">{task.name}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 line-clamp-2">
              {task.description || 'No description'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {task.project ? (
              <div className="flex items-center gap-1 text-sm">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span>{task.project.name}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-400">No Project</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.user?.image || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {task.user?.name?.split(' ').map(n => n[0]).join('') || 'UN'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{task.user?.name || 'Unassigned'}</span>
          </div>

          <div>
            <Badge 
              variant="outline" 
              className={
                task.status === 'pending' ? 'text-yellow-600' :
                task.status === 'completed' ? 'text-green-600' :
                task.status === 'in-progress' ? 'text-blue-600' :
                'text-gray-600'
              }
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {task.time_entry ? (
              <div className="flex items-center gap-1 text-sm">
                <Timer className="h-4 w-4 text-gray-400" />
                <span>{formatDuration(task.time_entry.duration)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Timer className="h-4 w-4" />
                <span>No time entry</span>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => handleEdit(task)}
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => handleDelete(task)}
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(task)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={() => handleDelete(task)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
