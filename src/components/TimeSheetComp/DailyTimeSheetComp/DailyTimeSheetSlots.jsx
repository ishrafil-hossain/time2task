import React, { useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useDeleteDailyTimesheetMutation } from "../../../redux/Timesheet/DailyTimesheetApi";

const timesheetData = {
  timeSlots: [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ],
};

const convertToAmPm = (time) => {
  if (!time) {
    return "";
  }

  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

const DailyTimeSheetSlots = ({ timeLineData }) => {
  const { timeSlots } = timesheetData;
  const slotHeight = 50; // Height of each hour slot in pixels
  const timeColumnRef = useRef(null);
  const taskContainerRef = useRef(null);
  
  // Get tasks from the timeline data
  const dailyTask = timeLineData?.data?.flatMap((day) => day.tasks) || [];

  // Color pairs for tasks
  const colorPairs = [
    { border: "#B129FF", background: "#F7EAFF" }
  ];

  // Function to precisely calculate task position based on time
  const calculateTaskPosition = (startTime, endTime) => {
    if (!startTime) return { top: 0, height: 0 };
    
    // Parse the time strings
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const endTimeArray = endTime ? endTime.split(":").map(Number) : [startHour, startMinute + 30];
    const [endHour, endMinute] = endTimeArray;
    
    // Calculate exact position in the grid
    // For exact positioning: Each hour is slotHeight pixels, so each minute is slotHeight/60 pixels
    const startPosition = (startHour * slotHeight) + ((startMinute / 60) * slotHeight);
    let endPosition = (endHour * slotHeight) + ((endMinute / 60) * slotHeight);
    
    // Ensure minimum height for visibility
    const taskHeight = Math.max(endPosition - startPosition, 25);
    
    return { 
      top: startPosition,
      height: taskHeight
    };
  };

  // Group overlapping tasks
  const getOverlappingGroups = () => {
    const groups = [];

    dailyTask.forEach((task) => {
      let foundGroup = false;
      
      // Parse times for comparison
      const [startHour, startMinute] = task.start_time.split(":").map(Number);
      const taskStart = startHour * 60 + startMinute;
      
      let taskEnd;
      if (task.endTime) {
        const [endHour, endMinute] = task.endTime.split(":").map(Number);
        taskEnd = endHour * 60 + endMinute;
      } else {
        taskEnd = taskStart + 30; // Default duration of 30 minutes
      }

      for (let group of groups) {
        const isOverlapping = group.some((existingTask) => {
          const [existingStartHour, existingStartMinute] = existingTask.start_time.split(":").map(Number);
          const existingStart = existingStartHour * 60 + existingStartMinute;
          
          let existingEnd;
          if (existingTask.endTime) {
            const [existingEndHour, existingEndMinute] = existingTask.endTime.split(":").map(Number);
            existingEnd = existingEndHour * 60 + existingEndMinute;
          } else {
            existingEnd = existingStart + 30;
          }

          return taskStart < existingEnd && taskEnd > existingStart;
        });

        if (isOverlapping) {
          group.push(task);
          foundGroup = true;
          break;
        }
      }

      if (!foundGroup) {
        groups.push([task]);
      }
    });

    return groups;
  };

  const overlappingGroups = getOverlappingGroups();
  const taskWidth = 400;

  // Hook for deleting tasks
  const [deleteDailyTimesheet] = useDeleteDailyTimesheetMutation();

  // Delete task handler
  const handleRemoveTask = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDailyTimesheet({
          id: task.id,
        });
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  // Function to get consistent color for a task
  const getTaskColor = (taskName) => {
    if (!taskName) return colorPairs[0];
    // Simple hash function to get consistent index
    const hash = taskName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorPairs[hash % colorPairs.length];
  };

  // Total content height calculation
  const totalHeight = timeSlots.length * slotHeight;

  // Sync scroll between time column and task container
  useEffect(() => {
    const taskContainer = taskContainerRef.current;
    const timeColumn = timeColumnRef.current;

    if (!taskContainer || !timeColumn) return;

    const handleScroll = () => {
      timeColumn.scrollTop = taskContainer.scrollTop;
    };

    taskContainer.addEventListener('scroll', handleScroll);
    return () => {
      taskContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full border border-gray-300" style={{ height: "calc(100vh - 250px)" }}>
      {/* Fixed grid structure with time slots on left and content on right */}
      <div className="grid grid-cols-[60px_1fr] h-full overflow-hidden">
        {/* Time slots column - fixed left */}
        <div className="bg-white border-r border-gray-300 overflow-hidden">
          <div 
            ref={timeColumnRef}
            className="h-full overflow-y-auto scrollbar-hide" 
            style={{ scrollbarWidth: 'none' }}
          >
            <div style={{ height: `${totalHeight}px` }}>
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className={`h-[50px] flex items-center justify-center text-xs text-gray-600 ${
                    index > 0 && "border-t border-gray-300"
                  }`}
                >
                  {convertToAmPm(time)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks and grid lines area - scrollable */}
        <div className="relative overflow-hidden">
          <div 
            ref={taskContainerRef}
            className="h-full overflow-y-auto" 
            id="task-scroll-container"
          >
            <div className="relative" style={{ height: `${totalHeight}px` }}>
              {/* Time Slot Lines (Background) */}
              <div className="absolute inset-0 z-0">
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className={`w-full h-[50px] ${
                      index > 0 && "border-t border-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Tasks */}
              <div className="absolute inset-0 z-20">
                {overlappingGroups.map((group, groupIndex) => {
                  return group.map((task, taskIndex) => {
                    // Get exact position based on time
                    const { top, height } = calculateTaskPosition(
                      task.start_time,
                      task.endTime
                    );
                    
                    // Get consistent color based on task name
                    const taskColor = getTaskColor(task.task);

                    return (
                      <div
                        key={`${task.task || 'unnamed'}-${groupIndex}-${taskIndex}`}
                        className="absolute px-3 py-2 text-sm flex flex-col justify-between text-gray-700 z-50"
                        style={{
                          top: `${top}px`, // Exact positioning based on time
                          height: `${height}px`,
                          left: `${taskIndex * (Math.min(taskWidth, 300) + 10)}px`,
                          width: `${Math.min(taskWidth, 300)}px`, // Responsive width
                          maxWidth: "calc(100% - 20px)", // Ensure it doesn't overflow container
                          backgroundColor: taskColor.background,
                          borderLeft: `4px solid ${taskColor.border}`,
                          borderBottom: `2px solid #FFD644`,
                          zIndex: 30,
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                        }}
                      >
                        {/* Close (X) Button */}
                        <button
                          className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-white text-gray-700 rounded-full text-xs shadow hover:bg-red-400"
                          onClick={() => handleRemoveTask(task)}
                        >
                          ×
                        </button>

                        <div className="font-bold text-black truncate">{task.task}</div>
                        {task.reason && (
                          <div className="text-xs text-gray-600 truncate">{task.reason}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-auto">
                          {convertToAmPm(task.start_time)} -{" "}
                          {convertToAmPm(task.endTime) || "Ongoing"}
                        </div>
                        {task.totalTime && (
                          <div className="text-xs text-gray-500">
                            Total: {task.totalTime}
                          </div>
                        )}
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTimeSheetSlots;