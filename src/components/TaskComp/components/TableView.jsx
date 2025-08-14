import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, MoreHorizontal, Trash2, Building2, Timer, Edit, Copy } from "lucide-react";
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
    if (!duration) return "0:00:00";
    // Assuming duration is in seconds
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteTask(task.id).unwrap();
        if (response) {
          toast.success("Task deleted successfully");
          Swal.fire("Deleted!", "Task has been deleted.", "success");
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete task");
        Swal.fire("Error!", "Failed to delete task.", "error");
      }
    }
  };

  console.log("tasks", tasks);
  return (
    <div className="bg-white rounded-lg border overflow-x-auto">
      <table className="min-w-full text-sm">
        {/* Table Head */}
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="p-3 text-left">Task Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Assignee</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Time Entry</th>
            <th className="p-3 text-left">Created At</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50">
              {/* Task Name */}
              <td className="p-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="font-medium">{task.name}</span>
              </td>

              {/* Description */}
              <td className="p-3 text-gray-500 line-clamp-2">{task.description || "No description"}</td>

              {/* Project */}
              <td className="p-3">
                {task.project ? (
                  <div className="flex items-center gap-1 text-sm">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span>{task.project.name}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">No Project</span>
                )}
              </td>

              {/* Assignee */}
              <td className="p-3 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.user?.image || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {task.user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "UN"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.user?.name || "Unassigned"}</span>
              </td>

              {/* Status */}
              <td className="p-3">
                <Badge
                  variant="outline"
                  className={
                    task.status === "pending"
                      ? "text-yellow-600"
                      : task.status === "completed"
                      ? "text-green-600"
                      : task.status === "in-progress"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </Badge>
              </td>

              {/* Time Entry */}
              <td className="p-3">
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
              </td>

              {/* Created At */}
              <td className="p-3 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </td>

              {/* Action */}
              <td className="p-3 flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleEdit(task)}>
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleDelete(task)}>
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
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(task)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
