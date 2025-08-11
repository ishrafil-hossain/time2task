import { Grip } from "lucide-react";
import React, { useState } from "react";

const AppsLibrary = () => {
  const [isOpen, setIsOpen] = useState(false);

  const appCategories = [
    {
      title: "App Library",
      cols: "grid-cols-3",
      apps: [
        {
          name: "Windows",
          icon: "/windows_Logo.png",
          color: "text-purple-500",
        },
        { name: "Linux", icon: "/Linux_Logo.png", color: "text-green-500" },
        { name: "macOS", icon: "/macos_Logo.png", color: "text-red-500" },
      ],
    },
    {
      title: "Mobile Apps",
      cols: "grid-cols-2",
      apps: [
        { name: "Android", icon: "/android_Logo.png", color: "text-gray-500" },
        { name: "iOS", icon: "/apple_Logo.png", color: "text-gray-500" },
      ],
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-200 bg-primary_color transition-colors"
      >
        <Grip
          className={`w-4 h-4 font-bold text-white transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 bg-white rounded-2xl p-6 w-[400px] shadow-[0_0_20px_0_rgba(0,0,0,0.1)] mt-5 animate-in fade-in zoom-in-95">
          {appCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-base text-gray-800 mb-4">{category.title}</h2>
              <div className={`grid ${category.cols} gap-4`}>
                {category.apps.map((app, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-4 border border-[#D9D9D9] rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center ${app.color} mb-2`}
                    >
                      <img
                        className="w-[22.804px]"
                        src={app.icon}
                        alt={app.name}
                      />
                    </div>
                    <span className="text-xs text-center font-medium text-gray-700">
                      {app.name}
                    </span>
                  </div>
                ))}
              </div>
              {index < appCategories.length - 1 && <div className="mt-2"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppsLibrary;
