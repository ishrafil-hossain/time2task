import { Clock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const employeeData = [
  {
    id: 1,
    avatar: "https://i.ibb.co.com/jkfKWnzX/484961028-2104732713302109-495044319454495915-n.jpg",
    name: "JUNAIED",
    progress: 99,
    color: "#c084fc",
    time: "39:12:26",
  },
  {
    id: 2,
    avatar: "https://i.ibb.co.com/jkfKWnzX/484961028-2104732713302109-495044319454495915-n.jpg",
    name: "Jane Smith",
    progress: 80,
    color: "#f472b6",
    time: "37:06:19",
  },
  {
    id: 3,
    avatar: "https://i.ibb.co.com/jkfKWnzX/484961028-2104732713302109-495044319454495915-n.jpg",
    name: "Alice Johnson",
    progress: 70,
    color: "#8b5cf6",
    time: "36:56:09",
  },
  {
    id: 4,
    avatar: "https://i.ibb.co.com/jkfKWnzX/484961028-2104732713302109-495044319454495915-n.jpg",
    name: "Bob Brown",
    progress: 60,
    color: "#818cf8",
    time: "32:00:56",
  },
  {
    id: 5,
    avatar: "https://i.ibb.co.com/jkfKWnzX/484961028-2104732713302109-495044319454495915-n.jpg",
    name: "Charlie Davis",
    progress: 50,
    color: "#67e8f9",
    time: "29:21:35",
  },
];
const groupData = [
  {
    id: 1,
    projectName: "Time2Task",
    progress: 90,
    color: "#c084fc",
    time: "39:12:26",
  },
  {
    id: 2,
    projectName: "LMS",
    progress: 80,
    color: "#f472b6",
    time: "37:06:19",
  },
  {
    id: 3,
    projectName: "Flyte Tender",
    progress: 70,
    color: "#8b5cf6",
    time: "36:56:09",
  },
  {
    id: 4,
    projectName: "Econmart",
    progress: 60,
    color: "#818cf8",
    time: "32:00:56",
  },
  {
    id: 5,
    projectName: "Uber",
    progress: 50,
    color: "#67e8f9",
    time: "29:21:35",
  },
];

export const TopEmployeesChart = () => {
  const [activeTab, setActiveTab] = useState("employee");

  const data = activeTab === "employee" ? employeeData : groupData;

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-800">
            Top 5 Employee and Group
          </h3>
          <p className="text-xs text-gray-500">
            Productive hours logged in app or urls
          </p>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex items-center gap-2 border-[2px] border-purple-500 bg-gray-100 px-2 py-0 rounded-3xl"
        >
          <TabsList className="flex gap-2 bg-transparent p-0">
            <TabsTrigger
              value="employee"
              className={
                "flex items-center gap-1 rounded-full px-3 py-1 " +
                (activeTab === "employee"
                  ? "!bg-purple-500 !text-white"
                  : "text-gray-500")
              }
            >
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <span className="text-xs">Employee</span>
            </TabsTrigger>
            <TabsTrigger
              value="group"
              className={
                "flex items-center gap-1 rounded-full px-3 py-1 " +
                (activeTab === "group"
                  ? "!bg-purple-500 !text-white"
                  : "text-gray-500")
              }
            >
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <span className="text-xs">Group</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-4">
        {data?.map((employee) => (
          <div key={employee.id} className="flex items-center gap-3">
            <div className={`${activeTab === "employee" ? "w-8 object-cover" : "w-24"} rounded-full`}>
            {activeTab === "employee" ? (
  <div className="relative group">
    <img
      src={employee.avatar}
      alt="Employee avatar"
      className="h-8 w-8 rounded-full"
    />
    
    <div className="absolute bottom-full mb-2 hidden w-max rounded bg-black px-2 py-1 text-xs text-white group-hover:block">
      {employee.name}
    </div>
  </div>
) : (
  <h1 className="line-clamp-2">{employee.projectName}</h1>
)}

            </div>

            <div className="relative flex-1">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${employee.progress}%`,
                    backgroundColor: employee.color,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-purple-400" />
              <span>{employee.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
