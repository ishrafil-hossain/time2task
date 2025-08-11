import React from "react";
import { Input } from "@/components/ui/input";
import { Search, UserSearch } from "lucide-react";
import DatePickerSingle from "../Common/DatePickerSingle";
import CommonSearch from "../Common/filter/Search";
import { faProjectDiagram, faUser } from "@fortawesome/free-solid-svg-icons";
import { DatePickerWithRange } from "../Common/Multi-DatePicker";
const AppUrlFilter = ({
  setActiveTab,
  projectData,
  users,
  activeTab,
  handleTabChange,
  setSelectedDate,
  selectedDate,
  selectedValue,
  setSelectedValue,
  setSelectedValueProject,
  selectedValueProject,
  startDate,
  endDate
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start  gap-4 mb-4">
        <div className="flex rounded-md overflow-hidden  ">
          <button
            onClick={() => handleTabChange("apps")}
            className={`lg:px-8 px-0 py-2 text-xs lg:text-base font-medium transition-colors w-1/2 ${
              activeTab === "apps"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Apps
          </button>
          <button
            onClick={() => handleTabChange("urls")}
            className={` lg:px-8 px-0 py-2 text-xs lg:text-base font-medium transition-colors w-1/2 ${
              activeTab === "urls"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            URLs
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto mt-0 ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              {/* <DatePickerSingle
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              /> */}

              <DatePickerWithRange startDate={startDate} endDate={endDate} />
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
        </div>
      </div>
    </div>
  );
};

export default AppUrlFilter;
