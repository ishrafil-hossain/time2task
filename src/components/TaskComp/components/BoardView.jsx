import { Badge } from "@/components/ui/badge"
import { TaskCard } from "./TaskCard"
import { useState } from "react"

const statusColumns = [
  { id: "pending", title: "Pending", color: "bg-yellow-500" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-500" },
  { id: "completed", title: "Completed", color: "bg-green-500" },
  { id: "feedback", title: "Feedback", color: "bg-orange-500" },
];

export function BoardView({ 
  tasks, 
  draggedTask, 
  handleDragOver, 
  handleDrop, 
  getTasksByStatus,
  handleDragStart 
}) {
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragEnter = (status) => {
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {statusColumns.map((status) => (
        <div
          key={status.id}
          className={`flex flex-col gap-4 rounded-lg border bg-gray-50 p-4 transition-colors duration-200 ${
            dragOverColumn === status.id ? "bg-purple-100 border-purple-300" : ""
          }`}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter(status.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => {
            handleDrop(e, status.id);
            setDragOverColumn(null);
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium capitalize">{status.title}</h3>
            <Badge variant="outline" className="bg-white">
              {getTasksByStatus(status.id).length}
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            {getTasksByStatus(status.id).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={(e) => handleDragStart(e, task)}
                isDragging={draggedTask?.id === task.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

