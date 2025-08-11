import React, { useState } from "react";
import {
  Search,
  Users,
  Globe,
  FilterIcon,
  Icon,
  Activity,
  Briefcase,
  AlarmClockOff,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CommonSearch from "../Common/filter/Search";
import { faProjectDiagram, faUser } from "@fortawesome/free-solid-svg-icons";
import DatePickerSingle from "../Common/DatePickerSingle";

const ScreenshotFilters = ({
  activeTab,
  setActiveTab,
  projectData,
  users,
  selectedValueProject,
  setSelectedValueProject,
  selectedValue,
  setSelectedValue,
  setSelectedDate,
  selectedDate,
  screenshotRefetch,
  screenShotData,
}) => {
  // Calculate average activity from screenshot data
  const calculateAverageActivity = () => {
    if (!screenShotData?.data?.screenshot?.length) return 0;
    
    const activities = screenShotData.data.screenshot
      .filter(item => item.activity !== null)
      .map(item => parseFloat(item.activity));
    
    if (activities.length === 0) return 0;
    
    const sum = activities.reduce((acc, val) => acc + val, 0);
    return (sum / activities.length).toFixed(2);
  };

  // Format time from seconds to HH:MM:SS
  const formatTimeFromSeconds = (seconds) => {
    if (!seconds) return "00:00:00";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  // Get time slots for dropdown
  const getTimeSlots = () => {
    if (!screenShotData?.data?.screenshot?.length) return [];
    
    return screenShotData.data.screenshot.map(item => ({
      value: item.time_interval,
      label: item.time_interval
    }));
  };

  // Calculate total work time (activity time - idle time)
  const calculateTotalWorkTime = () => {
    if (!screenShotData?.data?.activity?.work_time) return "00:00:00";
    
    const workTime = screenShotData.data.activity.work_time;
    const totalSeconds = (workTime.duration * 3600) || 0;
    return formatTimeFromSeconds(totalSeconds);
  };

  // Calculate total idle time
  const calculateTotalIdleTime = () => {
    if (!screenShotData?.data?.activity?.work_time) return "00:00:00";
    
    const workTime = screenShotData.data.activity.work_time;
    const totalSeconds = (workTime.idle_duration * 3600) || 0;
    return formatTimeFromSeconds(totalSeconds);
  };

  const averageActivity = calculateAverageActivity();
  const timeSlots = getTimeSlots();
  const totalWorkTime = calculateTotalWorkTime();
  const totalIdleTime = calculateTotalIdleTime();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className=" w-[180px]">
            <CommonSearch
              selectItem="name"
              selectValue="id"
              data={projectData?.data}
              placeholderValue="Projects"
              iconName={faProjectDiagram}
              selectedValue={selectedValueProject}
              setSelectedValue={setSelectedValueProject}
            />
          </div>
          
          {/* search member */}
          <div className=" w-[180px]">
            <CommonSearch
              selectItem="name"
              selectValue="id"
              data={users?.data}
              placeholderValue="Member"
              iconName={faUser}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
        </div>
      </div>

      <div className=" flex flex-col lg:flex-row justify-start items-center gap-5 mb-6">
        <div className="border rounded-md p-4 bg-purple-100 lg:w-1/4 ">
          <div className="flex  items-center gap-4 mb-4">
            <Activity
              className="h-8 w-8 p-2 rounded-full"
              style={{ backgroundColor: "rgba(177, 41, 255, 0.1)" }}
            />
            <h3 className="text-gray-700 font-medium ">Average Activity</h3>
          </div>
          <div className="flex items-center gap-4">
            <Progress
              value={averageActivity}
              className="h-2 flex-1 bg-gray-200"
              indicatorClassName=" !bg-purple-600"
            />
            <div className="bg-purple-600 text-white rounded-full px-3 py-0.5">
              <span className="text-sm font-semibold">{Math.round(averageActivity)}%</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4 bg-purple-200 lg:w-1/4 ">
          <div className="flex  items-center gap-4 mb-4">
            <Briefcase
              className="h-8 w-8 p-2 rounded-full"
              style={{ backgroundColor: "rgba(0, 157, 218, 0.2)" }}
            />
            <h3 className="text-gray-700 font-medium "> Total Work Time</h3>
          </div>
          <div className="bg-none text-white rounded-full px-4 py-0 w-fit">
            <span className="text-lg font-semibold text-black">{totalWorkTime}</span>
          </div>
        </div>

        <div className="border rounded-md p-4 bg-blue-100 lg:w-1/4">
          <div className="flex  items-center gap-4 mb-4">
            <AlarmClockOff
              className="h-8 w-8 p-2 rounded-full"
              style={{ backgroundColor: "rgba(67, 97, 238, 0.1)" }}
            />
            <h3 className="text-gray-700 font-medium "> Total Idle Time</h3>
          </div>
          <div className="bg-none text-white rounded-full px-4 py-0 w-fit">
            <span className="text-lg font-semibold text-black">{totalIdleTime}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <Tabs defaultValue="every10" value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger
              value="every10"
              className="px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              Every 10 Minutes
            </TabsTrigger>
            <TabsTrigger
              value="all"
              className="px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              All Screenshots
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex justify-end items-center mb-0 gap-2">
          <div className="flex items-center border-[1px] rounded-md px-2 py-0">
            <div className="text-sm text-muted-foreground flex items-center gap-1 bg-[#B129FF1A] rounded-md px-2 py-1">
              <Clock className="h-4 w-4" /> 1hr slot
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue={timeSlots[0]?.value || ""}>
                <SelectTrigger className="w-[180px] !border-none !shadow-none focus:ring-0 focus:ring-offset-0">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot, index) => (
                    <SelectItem key={index} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#B129FF1A] rounded-md px-2 py-2 !border-none">
            <span className="font-medium">Total Time: {totalWorkTime} Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotFilters;