import { Search } from "lucide-react";
import DailyTimeSheetFilter from "../DailyTimeSheetComp/DailyTimeSheetFilter";

const TimeSheetListFilter = ({setSelectedDate,selectedDate,projectData,users,selectedValueProject,setSelectedValueProject,selectedValue,setSelectedValue}) => {
  return (
    <div>
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
    </div>
  );
};

export default TimeSheetListFilter;
