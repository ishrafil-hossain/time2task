import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function TaskForm({ showTaskForm, newTask, setNewTask, handleAddTask, setShowTaskForm }) {
  return (
    <Card
      className={`mb-3 transition-all duration-300 ease-in-out ${showTaskForm ? "opacity-100 scale-100" : "opacity-0 scale-95 h-0 overflow-hidden"}`}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              placeholder="Enter task name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                placeholder="Assign to"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact</Label>
              <Select value={newTask.impact} onValueChange={(value) => setNewTask({ ...newTask, impact: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddTask} size="sm">
              Add Task
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowTaskForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 