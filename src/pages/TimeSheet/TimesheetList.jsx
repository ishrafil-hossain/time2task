import React, { useEffect, useState } from "react";

import TimeSheetListFilter from "../../components/TimeSheetComp/TimeSheetListComp/TimeSheetListFilter";
import TimeSheetListTable from "../../components/TimeSheetComp/TimeSheetListComp/TimeSheetListTable";
import { useGetProfileQuery } from "../../redux/features/OrgProfile/OrgProfile";
import { useGetProjectsByMemberQuery } from "../../redux/features/project/projectApi";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useGetDailyTimesheetApiQuery } from "../../redux/Timesheet/DailyTimesheetApi";

export default function TimesheetList() {
  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValueProject, setSelectedValueProject] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const timeZone = selectedTimezone || "";

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: timeLineData,
    isLoading: timeLineDataLoading,
    refetch: timelineDataRefetch,
  } = useGetDailyTimesheetApiQuery({
    start_date: selectedDate,
    end_date: selectedDate,
    user_id: selectedValue,
    time_zone: timeZone,
    page: currentPage,
    limit: pageSize,
  });


  useEffect(() => {
    if (profile) {
      setSelectedValue(profile?.id);
    } else {
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

  return (
    <div className="w-full container mx-auto p-4">
      <header className=" border-gray-100 bg-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-[18px] font-normal text-gray-800">
            Timesheet List
          </h1>
        </div>
      </header>

      {/* Search and filter area */}

      <TimeSheetListFilter
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        projectData={projectData}
        users={users}
        selectedValueProject={selectedValueProject}
        setSelectedValueProject={setSelectedValueProject}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
      />

      {/* Timesheet table */}

      <TimeSheetListTable timeLineData={timeLineData} timelineDataRefetch={timelineDataRefetch} />
    </div>
  );
}
