import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetProjectsByMemberQuery } from "../../../redux/features/project/projectApi";
import { useGetSearchMembersQuery } from "../../../redux/features/member/memberApi";
import { toast } from "react-toastify";
import { useAddTaskMutation, useUpdateTaskMutation } from "../../../redux/Task/taskapi";

export function TaskDrawer({
  isOpen,
  onClose,
  newTask,
  setNewTask,
  editTask,
  setEditTask,
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { data: projectData } = useGetProjectsByMemberQuery({
    page: 1,
    limit: 1000,
    status: "",
    user_id: selectedMemberId || 0,
  });

  const { data: members } = useGetSearchMembersQuery({
    page: 1,
    limit: 1000,
    project_id: selectedProjectId || 0,
  });

  // Set initial values when editTask changes
  useEffect(() => {
    if (editTask) {
      setNewTask({
        name: editTask.name || "",
        description: editTask.description || "",
      });
      setSelectedProjectId(editTask.project_id || null);
      setSelectedMemberId(editTask.user_id || null);
    }
  }, [editTask]);

  // Reset form when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setNewTask({
        name: "",
        description: "",
      });
      setSelectedProjectId(null);
      setSelectedMemberId(null);
      setEditTask(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validateForm = () => {
    if (!newTask.name.trim()) {
      toast.error("Task name is required");
      return false;
    }
    if (!newTask.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!selectedProjectId) {
      toast.error("Please select a project");
      return false;
    }
    if (!selectedMemberId) {
      toast.error("Please select an assignee");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const taskData = {
      name: newTask.name.trim(),
      description: newTask.description.trim(),
      project_id: selectedProjectId,
      user_id: selectedMemberId
    };

    try {
      if (editTask) {
        // Update existing task
        const response = await updateTask({
          id: editTask.id,
          ...taskData
        }).unwrap();
        
        if (response) {
          toast.success("Task updated successfully");
          onClose();
        }
      } else {
        // Create new task
        const response = await addTask(taskData).unwrap();
        
        if (response) {
          toast.success("Task created successfully");
          onClose();
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || (editTask ? "Failed to update task" : "Failed to create task"));
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{editTask ? "Edit Task" : "Add Task"}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskName">Task Name*</Label>
                <Input
                  id="taskName"
                  placeholder="Enter task name"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="project">Project*</Label>
                <Select
                  value={selectedProjectId?.toString()}
                  onValueChange={(value) => setSelectedProjectId(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectData?.data?.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id.toString()}
                      >
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="assignee">Assignee*</Label>
                <Select
                  value={selectedMemberId?.toString()}
                  onValueChange={(value) => setSelectedMemberId(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {members?.data?.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className=" !bg-primary_color" onClick={handleSubmit}>
                {editTask ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
