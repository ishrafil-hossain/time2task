import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus, Search, Users } from "lucide-react";
import TaskFIlter from "../TaskFIlter";

export function Header({
  activeTab,
  setSearchTask,
  setActiveTab,
  setShowTaskForm,
  showTaskForm,
  setSelectedTodo,
  setSelectedUser,
  selectedUser,
  selectedTodo,
  selectedProject,
  setSelectedProject,
  projectData,
  todoList,
  members,
}) {
  return (
    <div className="flex items-center justify-between my-6">
      <div className=" flex flex-col lg:flex-row justify-start items-center gap-3">
        <div className="flex items-center gap-4">
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg py-1.5 px-3">
            <Button
              variant={activeTab === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("table")}
              className={
                activeTab === "table" ? "bg-purple-600 text-white" : ""
              }
            >
              Table
            </Button>
            <Button
              variant={activeTab === "board" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("board")}
              className={
                activeTab === "board" ? "bg-purple-600 text-white" : ""
              }
            >
              Board
            </Button>
          </div>
        </div>

        <TaskFIlter
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
      </div>
      <Button
        className="bg-purple-600 hover:bg-purple-700"
        onClick={() => activeTab === "table" && setShowTaskForm(!showTaskForm)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
