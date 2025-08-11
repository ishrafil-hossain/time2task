import {
  PlusIcon,
  FolderPlus,
  FileCheck,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import React, { useState } from "react";

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      name: "Add Projects",
      icon: <FolderPlus size={24} />,
      color: "text-purple-500",
    },
    {
      name: "Add Task",
      icon: <FileCheck size={24} />,
      color: "text-green-500",
    },
    {
      name: "Add Timesheet",
      icon: <FileSpreadsheet size={24} />,
      color: "text-red-500",
    },
    {
      name: "New Note",
      icon: <FileText size={24} />,
      color: "text-gray-500",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-200 bg-primary_color transition-colors"
      >
        <PlusIcon
          className={`w-4 h-4 font-bold text-white transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 bg-white rounded-2xl p-6 w-[400px] shadow-[0_0_20px_0_rgba(0,0,0,0.1)] mt-5 animate-in fade-in zoom-in-95">
          <h2 className="text-base text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 border border-[#D9D9D9] rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center ${action.color} mb-2`}
                >
                  {action.icon}
                </div>
                <span className="text-xs text-center font-medium text-gray-700">
                  {action.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
