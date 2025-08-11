"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import { Search, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import DailyTimeSheetFilter from "../../components/TimeSheetComp/DailyTimeSheetComp/DailyTimeSheetFilter";
import { useGetProjectsByMemberQuery } from "../../redux/features/project/projectApi";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useGetProfileQuery } from "../../redux/features/OrgProfile/OrgProfile";
import { useGetDailyTimesheetTableDataQuery } from "../../redux/Timesheet/DailyTimesheetApi";
import DailyTimeSheetSlots from "../../components/TimeSheetComp/DailyTimeSheetComp/DailyTimeSheetSlots";

export default function DailyTimesheet() {
  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValueProject, setSelectedValueProject] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {

    if (profile) {
      setSelectedValue(profile?.id);
    }else{
      setSelectedValue(null);
    }
  }, [profile]);

  const { data: projectData } = useGetProjectsByMemberQuery({
    page: 1,
    limit: 1000,
    status: "",
    user_id: selectedValue || 0,
  });
  const { data: users } = useGetSearchMembersQuery({
    page: 1,
    limit: 1000,
    project_id: selectedValueProject,
  });

  const { data: timeLineData, refetch: timeLineRefetch } =
    useGetDailyTimesheetTableDataQuery({
      start_date: selectedDate,
      end_date: selectedDate,
      user_id: selectedValue,
    });



  return (
    <div className="w-full h-screen flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium">Daily Timesheet</h1>
      </div>

      <DailyTimeSheetFilter
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        projectData={projectData}
        users={users}
        selectedValueProject={selectedValueProject}
        setSelectedValueProject={setSelectedValueProject}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />

      <DailyTimeSheetSlots timeLineData={timeLineData}/>
    </div>
  );
}
