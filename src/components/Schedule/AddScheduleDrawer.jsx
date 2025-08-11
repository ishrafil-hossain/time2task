import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import AddSchedule from "./AddSchedule";
import CustomDrawer from "@/components/ui/custom-drawer";
import { useAddScheduleMutation } from "@/redux/Schedule/Schedule";
import { toast } from "react-toastify";

const AddScheduleDrawer = ({ open, onOpenChange, users, shiftData }) => {
  console.log(open)
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedShifts, setSelectedShifts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [addSchedule] = useAddScheduleMutation();

  const handleClose = () => {
    onOpenChange(false);
    // Reset states when drawer closes
    setSelectedMembers([]);
    setStartDate(new Date());
    setSelectedShifts({});
  };

  const formatScheduleData = () => {
    // Get user IDs from selected members
    const userIds = selectedMembers.map(member => member.id);

    // Format shifts data
    const shifts = Object.entries(selectedShifts).map(([dayKey, shiftId]) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + parseInt(dayKey));
      return {
        shift_id: parseInt(shiftId),
        date: date.toISOString().split('T')[0] // Format as YYYY-MM-DD
      };
    });

    return {
      user_id: userIds,
      shifts: shifts
    };
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      // Validate required fields
      if (selectedMembers.length === 0) {
        toast.error("Please select at least one member");
        return;
      }

      if (Object.keys(selectedShifts).length === 0) {
        toast.error("Please select at least one shift");
        return;
      }

      const scheduleData = formatScheduleData();
      
      const response = await addSchedule(scheduleData).unwrap();
      
      toast.success("Schedule created successfully");
      handleClose();
    } catch (error) {
      console.error("Schedule creation failed:", error);
      toast.error(error?.data?.message || "Failed to create schedule");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomDrawer
      isOpen={open}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span>Add New Schedule</span>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6">
          <AddSchedule
            users={users}
            shiftData={shiftData}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            startDate={startDate}
            setStartDate={setStartDate}
            selectedShifts={selectedShifts}
            setSelectedShifts={setSelectedShifts}
          />
        </div>

        <div className="border-t p-4 bg-white">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={isLoading || selectedMembers.length === 0 || Object.keys(selectedShifts).length === 0}
            >
              {isLoading ? "Creating..." : "Create Schedule"}
            </Button>
          </div>
        </div>
      </div>
    </CustomDrawer>
  );
};

export default AddScheduleDrawer; 