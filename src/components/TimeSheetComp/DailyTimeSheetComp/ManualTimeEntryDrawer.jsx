import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plus, FileText, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "../../Common/time-picker";
import CommonSearch from "../../Common/filter/Search";
import { useGetProfileQuery } from "../../../redux/features/OrgProfile/OrgProfile";
import { useGetProjectsByMemberQuery } from "../../../redux/features/project/projectApi";
import { useGetSearchMembersQuery } from "../../../redux/features/member/memberApi";
import { faUser, faProjectDiagram } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../Common/DateFormat";
import { useGetAllProjectTaskQuery } from "../../../redux/Task/taskapi";
import CustomDrawer from "@/components/ui/custom-drawer";
import { useAddManualTimeEntryMutation } from "../../../redux/ManualTimeEntry/ManualTimeEntry";
import { toast } from "react-toastify";

const ManualTimeEntryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromTime, setFromTime] = useState("11:30 AM");
  const [toTime, setToTime] = useState("12:30 PM");
  const [reason, setReason] = useState("");
  const today = new Date();
  const [date, setDate] = useState(today);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedValueProject, setSelectedValueProject] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSelectedDate(formatDate(date));
  }, [date]);

  const { data: profile, isLoading, refetch } = useGetProfileQuery();

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

  const { data: projectTaskData, isLoading: isLoadingTask } =
    useGetAllProjectTaskQuery({
      id: selectedValueProject,
      page: 1,
      limit: 1000,
      status: "",
    });

  const [addManualTimeEntry, { isLoading: isLoadingAddManualTimeEntry }] = useAddManualTimeEntryMutation();

  const formatTimeWithDate = (timeStr, date) => {
    // Parse the time string (e.g., "11:30 AM")
    const parsedTime = parse(timeStr, "hh:mm a", new Date());
    
    // Get hours and minutes
    const hours = parsedTime.getHours().toString().padStart(2, '0');
    const minutes = parsedTime.getMinutes().toString().padStart(2, '0');
    
    // Format the date part
    const formattedDate = format(date, "yyyy-MM-dd");
    
    // Combine date and time
    return `${formattedDate} ${hours}:${minutes}:00`;
  };

  const handleSubmit = async () => {
    try {
      // Format the date to YYYY-MM-DD
      const extractedDate = format(date, "yyyy-MM-dd");

      // Validate required fields
      if (!selectedValue) {
        toast.error("Please select a member");
        return;
      }
      if (!selectedValueProject) {
        toast.error("Please select a project");
        return;
      }
      if (!fromTime || !toTime) {
        toast.error("Please select both start and end time");
        return;
      }

      // Format start and end times with date
      const formattedStartTime = formatTimeWithDate(fromTime, date);
      const formattedEndTime = formatTimeWithDate(toTime, date);

      // Prepare the data
      const formData = {
        user_id: selectedValue,
        project_id: selectedValueProject,
        task_id: selectedTask,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        date: extractedDate,
        reason: reason || "",
      };

      console.log("Submitting form data:", formData); // Debug log

      // Submit the data
      const response = await addManualTimeEntry(formData).unwrap();
      console.log("Success response:", response); // Debug log
      toast.success("Timesheet added successfully!");
      
      // Reset form and close drawer on success
      setFromTime("11:30 AM");
      setToTime("12:30 PM");
      setReason("");
      setDate(today);
      setSelectedTask(null);
      setSelectedValueProject(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Error response:", error); // Debug log
      const validationErrors = error?.data?.data;
      let errorMessage = error?.data?.message || "Failed to add timesheet. Please try again.";
      
      if (validationErrors && typeof validationErrors === "object") {
        const firstKey = Object.keys(validationErrors)[0];
        const firstError = validationErrors[firstKey]?.[0];
        if (firstError) {
          errorMessage = firstError;
        }
      }
      
      toast.error(errorMessage);
    }
  };

  // Reset form when drawer closes
  const handleClose = () => {
    setIsOpen(false);
    if (!isLoadingAddManualTimeEntry) {
      setFromTime("11:30 AM");
      setToTime("12:30 PM");
      setReason("");
      setDate(today);
      setSelectedTask(null);
      setSelectedValueProject(null);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-fit h-10 bg-primary_color rounded-md inline-flex justify-center items-center gap-1.5 p-2.5"
      >
        <div className="flex items-center gap-2">
          <h1 className="text-white">Manual Time Entry</h1>
          <Plus className="text-white" />
        </div>
      </button>

      <CustomDrawer
        isOpen={isOpen}
        onClose={handleClose}
        title={
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-purple-500" />
            <h1>Add Timesheet</h1>
          </div>
        }
        footer={
          <div className="flex justify-end gap-2">
            <Button
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoadingAddManualTimeEntry}
            >
              {isLoadingAddManualTimeEntry ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Timesheet"
              )}
            </Button>
            <Button
              className="bg-white text-purple-500 border border-purple-500 px-6 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleClose}
              disabled={isLoadingAddManualTimeEntry}
            >
              Cancel
            </Button>
          </div>
        }
      >
        <div className="p-4">
          <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col items-start gap-2">
                  {/* project */}
                  <Label htmlFor="date" className="text-gray-700">
                    Select Project
                  </Label>
                  <div className="w-full">
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
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-3">
                  <div className="flex flex-col items-start gap-2 w-full lg:w-1/2">
                    <Label htmlFor="date" className="text-gray-700 text-start">
                      Select Member
                    </Label>
                    <div className="w-full">
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

                  <div className="flex flex-col items-start gap-2 w-full lg:w-1/2">
                    <Label htmlFor="date" className="text-gray-700">
                      Select Task
                    </Label>
                    <div className="w-full">
                      <CommonSearch
                        selectItem="name"
                        selectValue="id"
                        data={projectTaskData?.data}
                        placeholderValue="Select Task"
                        selectedValue={selectedTask}
                        setSelectedValue={setSelectedTask}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-700">
                    Assign Date
                  </Label>
                  <div className="flex items-center gap-1 border-[#B129FF] border py-[0px] px-2 rounded-lg">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="text-sm text-gray-600 justify-start text-left font-normal shadow-none border-none"
                        >
                          {format(date, "EEE, LLL dd y")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          format="yyyy-MM-dd"
                          numberOfMonths={1}
                          modifiersStyles={{
                            selected: {
                              backgroundColor: "#B129FF",
                              color: "white",
                            },
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromTime" className="text-gray-700">
                    From Time
                  </Label>
                  <TimePicker value={fromTime} onChange={setFromTime} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toTime" className="text-gray-700">
                    To Time
                  </Label>
                  <TimePicker value={toTime} onChange={setToTime} />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label
                  htmlFor="reason"
                  className="flex items-center gap-2 text-gray-700"
                >
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                  Reason
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Write here..."
                  className="min-h-[100px] border-[#B129FF] border py-[0px] px-2 rounded-lg"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomDrawer>
    </>
  );
};

export default ManualTimeEntryDrawer;
