"use client";

import { useState } from "react";
import { Header } from "./components/Header";
import { TableView } from "./components/TableView";
import { BoardView } from "./components/BoardView";
import { TaskDrawer } from "./components/TaskDrawer";
import Pagination from "../Common/Pagination";
import { toast } from "react-toastify";
import { useUpdateTaskMutation } from "../../redux/Task/taskapi";

const statusColumns = [
  { id: "assigned", title: "Assigned", count: 2, color: "bg-cyan-500" },
  { id: "in-progress", title: "In progress", count: 1, color: "bg-purple-500" },
  { id: "completed", title: "Completed", count: 1, color: "bg-green-500" },
  { id: "feedback", title: "Feedback", count: 0, color: "bg-orange-500" },
];

export default function TaskTable({
  tasks,
  members,
  setSearchTask,
  setSelectedTodo,
  setSelectedUser,
  selectedUser,
  selectedTodo,
  selectedProject,
  setSelectedProject,
  projectData,
  todoList,
  currentPage,
  setCurrentPage,
  totalPages,
  totalRecords,
  pageSize,
  setPageSize,
  onTaskUpdate
}) {
  const [activeTab, setActiveTab] = useState("table");
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [updateTask] = useUpdateTaskMutation();
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignee: "",
    impact: "Medium",
    dueDate: "",
  });

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (!draggedTask) return;

    try {
      // Call the API to update the status
      const response = await updateTask({
        id: draggedTask.id,
        data: { status: newStatus } // Wrap the status in a data object
      }).unwrap();

      if (response) {
        // Notify parent component about the update
        if (onTaskUpdate) {
          onTaskUpdate(draggedTask.id, { status: newStatus });
        }
        
        // Show a subtle success toast
        toast.success("Status updated", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } catch (error) {
      // If the update fails, show an error toast with more details
      const errorMessage = error?.data?.message || "Failed to update status";
      toast.error(errorMessage);
      console.error("Task update error:", error);
    } finally {
      // Clear the dragged task state
      setDraggedTask(null);
      
      // Safely remove drag styling if the element exists
      if (e?.currentTarget?.classList) {
        e.currentTarget.classList.remove("bg-purple-100");
      }
    }
  };

  const handleAddTask = () => {
    if (newTask.name.trim()) {
      const task = {
        id: Date.now(),
        name: newTask.name,
        assignee: {
          name: newTask.assignee || "Unassigned",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "UN",
        },
        spentTime: "0:00:00",
        progress: 0,
        dueDate: newTask.dueDate,
        impact: newTask.impact,
        status: "assigned",
        color: "bg-blue-500",
      };
      
      // Notify parent component about the new task
      if (onTaskUpdate) {
        onTaskUpdate(null, task, 'add');
      }

      setNewTask({
        name: "",
        description: "",
        assignee: "",
        impact: "Medium",
        dueDate: "",
      });
      setShowTaskForm(false);
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "High":
        return "text-purple-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="overflow-y-scroll scrollbar-gutter-stable">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowTaskForm={setShowTaskForm}
        showTaskForm={showTaskForm}
        setSearchTask={setSearchTask}
        setSelectedTodo={setSelectedTodo}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        selectedTodo={selectedTodo}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        projectData={projectData}
        todoList={todoList}
        members={members}
      />

      <TaskDrawer
        isOpen={showTaskForm}
        onClose={() => {
          setShowTaskForm(false);
          setEditTask(null);
        }}
        newTask={newTask}
        setNewTask={setNewTask}
        editTask={editTask}
        setEditTask={setEditTask}
      />

      {activeTab === "table" ? (
        <>
          <TableView
            tasks={tasks}
            showTaskForm={showTaskForm}
            newTask={newTask}
            setNewTask={setNewTask}
            setShowTaskForm={setShowTaskForm}
            getImpactColor={getImpactColor}
            setEditTask={setEditTask}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </>
      ) : (
        <BoardView
          statusColumns={statusColumns}
          tasks={tasks}
          draggedTask={draggedTask}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          getTasksByStatus={getTasksByStatus}
          handleDragStart={handleDragStart}
        />
      )}
    </div>
  );
}
