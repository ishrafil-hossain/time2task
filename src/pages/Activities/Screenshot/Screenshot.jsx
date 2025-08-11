import React from "react";
import { useState } from "react";

import ScreenshotFilters from "../../../components/Screenshotcomp/ScreenshotFilters";
import ScreenshotBody from "../../../components/Screenshotcomp/ScreenshotBody";
import { useGetProjectsByMemberQuery } from "../../../redux/features/project/projectApi";
import { useGetSearchMembersQuery } from "../../../redux/features/member/memberApi";
import { useGetProfileQuery } from "../../../redux/features/OrgProfile/OrgProfile";
import { useGetScreenShotDataQuery } from "../../../redux/activities/activitiesAPI";
import DatePickerSingle from "../../../components/Common/DatePickerSingle";

export default function Screenshot() {
  const [activeTab, setActiveTab] = useState("every10");
  const [selectedValueProject, setSelectedValueProject] = useState(false);
  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [selectedValue, setSelectedValue] = useState(profile?.id);
  const [selectedTimezone, setSelectedTimezone] = useState(false);
  const [searchProject, setSearchProject] = useState(false);
  const [selectedName, setSelectedName] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
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
  const {
    data: screenShotData,
    isLoading: screenshotLoading,
    refetch: screenshotRefetch,
  } = useGetScreenShotDataQuery({
    user_id: selectedValue || undefined,
    project_id: selectedValueProject || undefined,
    date: selectedDate || undefined,
  });

  // console.log("screenShotData",selectedDate);
  return (
    <div>
      <header className="  py-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-[18px] font-normal text-gray-800">Screenshots</h1>
        </div>
        <DatePickerSingle
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </header>

      <div className="container mx-auto p-4">
        <ScreenshotFilters
          setSelectedTimezone={setSelectedTimezone}
          selectedTimezone={selectedTimezone}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          searchProject={searchProject}
          setSearchProject={setSearchProject}
          selectedValue={selectedValue}
          selectedName={selectedName}
          setSelectedValue={setSelectedValue}
          selectedValueProject={selectedValueProject}
          setSelectedValueProject={setSelectedValueProject}
          userId={profile?.id}
          projectData={projectData}
          users={users}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          screenshotRefetch={screenshotRefetch}
          screenShotData={screenShotData}
        />

        <ScreenshotBody
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showFilterSidebar={showFilterSidebar}
          setShowFilterSidebar={setShowFilterSidebar}
          screenShotData={screenShotData}
        />
      </div>
    </div>
  );
}
