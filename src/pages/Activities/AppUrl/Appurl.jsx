import { useState } from "react";

import UrlsTable from "../../../components/App&UrlComp/urls-table";
import AppsTable from "../../../components/App&UrlComp/apps-table";
import usageData from "../../../../public/usage-data.json";
import AppUrlHeader from "../../../components/App&UrlComp/appurl-filter";
import AppUrlFilter from "../../../components/App&UrlComp/appurl-filter";
import { useGetSearchMembersQuery } from "../../../redux/features/member/memberApi";
import { useGetAppsAndUrlQuery, useGetScreenShotDataQuery } from "../../../redux/activities/activitiesAPI";
import { useGetProjectsByMemberQuery } from "../../../redux/features/project/projectApi";
import { useGetProfileQuery } from "../../../redux/features/OrgProfile/OrgProfile";

export default function Appurl() {
  const [activeTab, setActiveTab] = useState("apps");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [selectedValueProject, setSelectedValueProject] = useState(false);
  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [selectedValue, setSelectedValue] = useState(profile?.id);
  const [selectedTimezone, setSelectedTimezone] = useState(false);
  const [searchProject, setSearchProject] = useState(false);
  const [selectedName, setSelectedName] = useState(false);
  const [selectedDate, setSelectedDate] = useState({startDate:'', endDate:''});
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

  const { data } = useGetAppsAndUrlQuery({
    project_id: selectedValueProject || undefined,
    user_id: selectedValue || undefined,
    start_date: selectedDate.startDate || undefined,
    end_date: selectedDate.endDate || undefined,
  });


  console.log(data?.data?.url)
  return (
    <div className="w-full p-2">
      <header className=" border-gray-100 bg-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-[18px] font-normal text-gray-800">
            Apps & URLs
          </h1>
        </div>
      </header>
      <div className="flex flex-col space-y-4 container mx-auto p-4">
        <AppUrlFilter
          handleTabChange={handleTabChange}
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
          startDate={selectedDate.startDate}
          endDate={selectedDate.endDate}
        />

        <div className="w-full">
          {activeTab === "apps" ? (
            <AppsTable data={data?.data?.apps} />
          ) : (
            <UrlsTable data={data?.data?.url} />
          )}
        </div>
      </div>
    </div>
  );
}
