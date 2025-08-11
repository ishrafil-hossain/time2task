import React from "react";
import DatePickerSingle from "../../Common/DatePickerSingle";
import { faProjectDiagram, faUser } from "@fortawesome/free-solid-svg-icons";
import { Plus, PlusIcon } from "lucide-react";
import ManualTimeEntryDrawer from "./ManualTimeEntryDrawer";
import CommonSearch from "../../Common/filter/Search";

const DailyTimeSheetFilter = ({
  setSelectedDate,
  selectedDate,
  projectData,
  users,
  selectedValueProject,
  setSelectedValueProject,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <div className="flex justify-between items-start ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <DatePickerSingle
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
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

      <ManualTimeEntryDrawer />
    </div>
  );
};

export default DailyTimeSheetFilter;
