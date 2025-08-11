import { ChevronRight, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tasks = [
  {
    id: 1,
    title: "User Authentication Development",
    assignee: "Sabariya Muzumder",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SM",
    duration: "0:12:26",
  },
  {
    id: 2,
    title: "Nav Menu FR UI Design",
    assignee: "Tasfia Barshat",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TB",
    duration: "1:02:12",
  },
  {
    id: 3,
    title: "Nav Menu FR UI Development",
    assignee: "Ishrafil Hossain",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "IH",
    duration: "03:12:01",
  },
  {
    id: 4,
    title: "Nav Menu API BR Development",
    assignee: "Ahmed Shofik",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AS",
    duration: "0:27:34",
  },
];

export default function RecentTaskList() {
  return (
    <Card className="p-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Recent Task</h2>
          <p className="text-gray-500 text-sm">
            Productive hours logged in app or urls
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-gray-500 flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
        >
          See All <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between px-5 py-3 border border-gray-100 last:border-0 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium text-gray-800">{task.title}</h3>

                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={task.avatar || "/placeholder.svg"}
                      alt={task.assignee}
                    />
                    <AvatarFallback>{task.initials}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-500 text-sm">{task.assignee}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1 opacity-70" />
              <span>{task.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
