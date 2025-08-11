import { Trash2, ImageOff } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Nodata from "../Common/No-data";

const ScreenshotBody = ({
  activeTab,
  screenShotData
}) => {
  // Get the appropriate data based on activeTab
  const screenshotsAll = screenShotData?.data?.all_screenshot || [];
  const screenshots10Minutes = screenShotData?.data?.screenshot || [];
  const currentData = activeTab === "all" ? screenshotsAll : screenshots10Minutes;

  if (!currentData.length) {
    return (
      <Nodata />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        {currentData.map(
          (screenshot, index) => (
            <div
              key={screenshot.id || index}
              className="flex flex-col border rounded-md overflow-hidden p-3 gap-2 hover:shadow-md transition-shadow duration-200"
            >
              {/* Image Container */}
              <div className="relative group w-full">
                <img
                  src={activeTab === "all" ? screenshot.image : screenshot.details?.[0]?.image || "/Screenshot_288.png"}
                  alt="Screenshot"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-md"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-md"></div>

                {/* Delete Button */}
                <button className="absolute flex justify-center items-center bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 text-white text-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white">
                  <Trash2 className="h-4 w-4 inline-block text-red-500" />
                </button>
              </div>
              <div className="p-2 flex justify-center flex-col items-center gap-2 ">
                <h3 className="text-xs text-center font-medium text-purple-900 bg-purple-50 rounded-2xl py-1 px-2 w-fit">
                  {activeTab === "all" ? screenshot.project?.name : screenshot.time_interval}
                </h3>

                {activeTab === "all" ? (
                  <p className="text-purple-600">{screenshot.formatted_time}</p>
                ) : (
                  <div className="flex justify-between items-center w-full gap-2">
                    <span className="text-xs text-purple-600">
                      {screenshot.time_interval}
                    </span>
                    <span className="text-xs text-purple-500 font-medium">
                      {screenshot.details?.length || 0} screens
                    </span>
                  </div>
                )}

                {activeTab !== "all" && (
                  <div className="w-full h-1.5 bg-purple-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        parseFloat(screenshot.activity) <= 50
                          ? "bg-red-400"
                          : parseFloat(screenshot.activity) <= 75
                          ? "bg-yellow-400"
                          : "bg-purple-500"
                      )}
                      style={{ width: `${Math.min(parseFloat(screenshot.activity), 100)}%` }}
                    ></div>
                  </div>
                )}

                {activeTab !== "all" && screenshot.activity && (
                  <p className="text-sm text-center mt-1 text-purple-700">
                    {Math.min(parseFloat(screenshot.activity), 100).toFixed(2)}% of Active Time{" "}
                    <span className="font-bold">
                      {screenshot.idle_duration ? (10 - (screenshot.idle_duration * 10)).toFixed(1) : 10} minutes
                    </span>
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ScreenshotBody;
