import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export function AddShiftDrawer({ open, onOpenChange, newShift, setNewShift, onSubmit, isLoading, editingShift }) {
  const [errors, setErrors] = useState({
    fromTime: "",
    toTime: "",
  });

  // Populate form when editingShift changes
  useEffect(() => {
    if (editingShift) {
      // When editing, populate the form with the shift data
      setNewShift({
        name: editingShift.name,
        fromTime: editingShift.from_time, // Use 24 hour format
        toTime: editingShift.to_time,     // Use 24 hour format
        working_hour: editingShift.working_hour,
        over_time: editingShift.over_time,
        status: editingShift.status,
      });
    } else {
      // When adding (editingShift is null), reset the form
      setNewShift({
        name: "",
        fromTime: "",
        toTime: "",
        working_hour: 0,
        over_time: 0,
        status: "active",
      });
    }
    // Clear errors when editingShift changes
    setErrors({ fromTime: "", toTime: "" });

  }, [editingShift, setNewShift]); // Depend on editingShift and setNewShift

  // Calculate working hours when fromTime or toTime changes
  useEffect(() => {
    // Only calculate if both times are set and it's not initially populating from an existing shift (unless times are actually different)
    if (newShift.fromTime && newShift.toTime) {
      const fromDate = new Date(`2000-01-01T${newShift.fromTime}`);
      const toDate = new Date(`2000-01-01T${newShift.toTime}`);
      
      // Handle overnight shifts (if end time is less than start time, assume it's next day)
      if (toDate < fromDate) {
        toDate.setDate(toDate.getDate() + 1);
      }
      
      const diffInHours = (toDate - fromDate) / (1000 * 60 * 60);
      setNewShift(prev => ({
        ...prev,
        working_hour: Math.round(diffInHours * 10) / 10 // Round to 1 decimal place
      }));
    } else if (!newShift.fromTime || !newShift.toTime) {
       // If one of the times is cleared, reset working hours to 0
       setNewShift(prev => ({ ...prev, working_hour: 0 }));
    }

  }, [newShift.fromTime, newShift.toTime, setNewShift]); // Depend on times and setNewShift


  const validateTime = (fromTime, toTime) => {
    const errors = {
      fromTime: "",
      toTime: "",
    };

    if (!fromTime) {
      errors.fromTime = "Start time is required";
    }

    if (!toTime) {
      errors.toTime = "End time is required";
    } else if (fromTime && toTime) {
      const fromDate = new Date(`2000-01-01T${fromTime}`);
      const toDate = new Date(`2000-01-01T${toTime}`);
      
      // For overnight shifts, we allow end time to be less than start time
      // But if it's not an overnight scenario, end time shouldn't be earlier than start time on the same day
      if (toDate < fromDate && fromDate.toDateString() === toDate.toDateString()) {
         errors.toTime = "End time cannot be earlier than start time on the same day";
      }
    }

    setErrors(errors);
    return !errors.fromTime && !errors.toTime;
  };

  const handleFromTimeChange = (e) => {
    const value = e.target.value;
    setNewShift(prev => ({ ...prev, fromTime: value }));
    validateTime(value, newShift.toTime);
  };

  const handleToTimeChange = (e) => {
    const value = e.target.value;
    setNewShift(prev => ({ ...prev, toTime: value }));
    validateTime(newShift.fromTime, value);
  };

  const handleSubmit = () => {
    if (!validateTime(newShift.fromTime, newShift.toTime)) {
      return;
    }
    
    // Pass the entire newShift object including status and overtime
    onSubmit(newShift);
  };

  const drawerTitle = editingShift ? "Edit Shift" : "Add New Shift";
  const submitButtonText = editingShift ? "Save Changes" : "Add";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-white border-l border-gray-100">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            {drawerTitle}
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="space-y-2">
            <Label htmlFor="shiftName" className="text-sm font-medium">
              Shift Name
            </Label>
            <Input
              id="shiftName"
              placeholder="Add name"
              value={newShift.name}
              onChange={(e) =>
                setNewShift({ ...newShift, name: e.target.value })
              }
              className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromTime" className="text-sm font-medium">
                From Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="fromTime"
                  type="time"
                  value={newShift.fromTime}
                  onChange={handleFromTimeChange}
                  disabled={isLoading}
                  className={`pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                    errors.fromTime ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
              {errors.fromTime && (
                <p className="text-sm text-red-500 mt-1">{errors.fromTime}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="toTime" className="text-sm font-medium">
                To Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="toTime"
                  type="time"
                  value={newShift.toTime}
                  onChange={handleToTimeChange}
                  disabled={!newShift.fromTime || isLoading}
                  className={`pl-10 border-purple-200 focus:border-purple-500 focus:ring-purple-500 ${
                    errors.toTime ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  } ${(!newShift.fromTime || isLoading) ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              </div>
              {errors.toTime && (
                <p className="text-sm text-red-500 mt-1">{errors.toTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workingHours" className="text-sm font-medium">
              Working Hours
            </Label>
            <Input
              id="workingHours"
              type="number"
              value={newShift.working_hour}
              readOnly
              disabled={isLoading}
              className="border-purple-200 bg-gray-50 cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">
              Automatically calculated from start and end time
            </p>
          </div>

          {/* Status and Overtime Toggles - Visible in both Add and Edit mode */}
          <div className="flex items-center justify-between">
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Switch
              id="status"
              checked={newShift.status === "active"}
              onCheckedChange={(checked) =>
                setNewShift({ ...newShift, status: checked ? "active" : "inactive" })
              }
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="overTime" className="text-sm font-medium">
              Overtime Include
            </Label>
            <Switch
              id="overTime"
              checked={newShift.over_time === 1}
              onCheckedChange={(checked) =>
                setNewShift({ ...newShift, over_time: checked ? 1 : 0 })
              }
              disabled={isLoading}
            />
          </div>

        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            disabled={
              isLoading ||
              !newShift.name || 
              !newShift.fromTime || 
              !newShift.toTime || 
              !!errors.fromTime || 
              !!errors.toTime
            }
          >
            {submitButtonText}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
} 