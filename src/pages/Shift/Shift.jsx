import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

import {
  Clock,
  Edit,
  Plus,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Calendar,
  RotateCw,
  Clock4,
  Users,
  Timer,
  Trash2,
} from "lucide-react";
import { AddShiftDrawer } from "@/components/shift/AddShiftDrawer";
import { useAddShiftMutation, useGetShiftQuery, useDeleteShiftMutation, useUpdateShiftMutation } from "../../redux/Shift/shift";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

// Predefined shift types with their properties
const SHIFT_TYPES = {
  Morning: {
    icon: <Sunrise className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  Day: {
    icon: <Sun className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  Afternoon: {
    icon: <Sunset className="w-5 h-5" />,
    color: "bg-red-100 text-red-800 border-red-200",
  },
  Night: {
    icon: <Moon className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  Split: {
    icon: <Clock4 className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  Rotational: {
    icon: <RotateCw className="w-5 h-5" />,
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  Custom: {
    icon: <Calendar className="w-5 h-5" />,
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
};

// Function to get shift properties based on name
const getShiftProperties = (shiftName) => {
  // Check if the shift name matches any predefined type
  const shiftType = Object.keys(SHIFT_TYPES).find((type) =>
    shiftName?.toLowerCase().includes(type.toLowerCase())
  );
  
  // Return the matching type properties or custom properties
  return shiftType ? SHIFT_TYPES[shiftType] : SHIFT_TYPES["Custom"];
};

export default function Shift() {
  const { data: shiftData, isLoading: isShiftLoading, refetch: refetchShifts } = useGetShiftQuery({
    page: 1,
    limit: 1000,
  });
  
  const [shifts, setShifts] = useState([]);
  const [editingShift, setEditingShift] = useState(null); // State to hold shift being edited
  
  // Update local state when data from query changes
  useEffect(() => {
    if (shiftData?.data?.rows) {
      setShifts(shiftData.data.rows);
    }
  }, [shiftData]);

  const [addShift, { isLoading }] = useAddShiftMutation();
  const [deleteShift, { isLoading: isDeleting }] = useDeleteShiftMutation();
  const [updateShift, { isLoading: isUpdating }] = useUpdateShiftMutation();

  const [isAddSidebarOpen, setIsAddSidebarOpen] = useState(false);
  const [newShift, setNewShift] = useState({
    name: "",
    fromTime: "",
    toTime: "",
    working_hour: 0,
    over_time: 0,
    status: "active",
  });

   // Function to toggle shift status (active/inactive)
   const toggleShiftStatus = async (id) => {
    // Find the shift by id
    const shiftToUpdate = shifts.find(shift => shift.id === id);
    if (!shiftToUpdate) return;

    // Determine the new status
    const newStatus = shiftToUpdate.status === "active" ? "inactive" : "active";

    try {
       // Call the update mutation
       await updateShift({ id, data: { ...shiftToUpdate, status: newStatus } }).unwrap();
       // Update the local state
       setShifts(prevShifts =>
         prevShifts.map(shift =>
           shift.id === id ? { ...shift, status: newStatus } : shift
         )
       );
       // Optionally, add a toast notification
       toast.success(`Shift status updated to ${newStatus}`);
    } catch (error) {
       toast.error(error?.data?.message || "Failed to update shift status");
    }
  };

  // Function to toggle overtime status
  const toggleOvertime = async (id) => {
    // Find the shift by id
    const shiftToUpdate = shifts.find(shift => shift.id === id);
    if (!shiftToUpdate) return;

    // Determine the new overtime status (0 or 1)
    const newOvertime = shiftToUpdate.over_time === 1 ? 0 : 1;

    try {
       // Call the update mutation
       await updateShift({ id, data: { ...shiftToUpdate, over_time: newOvertime } }).unwrap();
        // Update the local state
       setShifts(prevShifts =>
         prevShifts.map(shift =>
           shift.id === id ? { ...shift, over_time: newOvertime } : shift
         )
       );
       // Optionally, add a toast notification
       toast.success(`Shift overtime updated`);
    } catch (error) {
       toast.error(error?.data?.message || "Failed to update overtime status");
    }
  };

  const handleDeleteShift = async (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the delete mutation
          await deleteShift(id).unwrap();
          // Remove the shift from local state
          setShifts(prevShifts => prevShifts.filter(shift => shift.id !== id));
          toast.success("Shift deleted successfully!");
        } catch (error) {
          toast.error(error?.data?.message || "Failed to delete shift");
        }
      }
    });
  };

  const handleSubmitShift = async (shiftData) => {
    try {
      let response;
      const payload = {
        name: shiftData.name,
        from_time: shiftData.fromTime,
        to_time: shiftData.toTime,
        working_hour: shiftData.working_hour,
        over_time: shiftData.over_time,
        status: shiftData.status, // Use status from shiftData
      };

      console.log("payload", payload);

      if (editingShift) {
        // Update existing shift
        response = await updateShift({ id: editingShift.id, data: payload }).unwrap();
        setShifts(prevShifts => prevShifts.map(shift => 
          shift.id === editingShift.id ? { ...shift, ...payload, ...getShiftProperties(payload.name) } : shift
        ));
        toast.success("Shift updated successfully!");
      } else {
        // Add new shift
        response = await addShift(payload).unwrap();
        // Get shift properties based on name from the response
        const shiftProperties = getShiftProperties(response.data.name);
        // Add the new shift to the local state with the response data and properties
        const newShiftWithId = {
          ...response.data,
          ...shiftProperties
        };
        setShifts(prevShifts => [...(prevShifts || []), newShiftWithId]);
        toast.success("Shift added successfully!");
      }
      
      // Reset form and close drawer
      setNewShift({
        name: "",
        fromTime: "",
        toTime: "",
        working_hour: 0,
        over_time: 0,
        status: "active",
      });
      setEditingShift(null); // Clear editing shift state
      setIsAddSidebarOpen(false); // Close the drawer

    } catch (error) {
      toast.error(error?.data?.message || (editingShift ? "Failed to update shift" : "Failed to add shift"));
    }
  };

  const handleEditShift = (shift) => {
    console.log("Editing shift data:", shift);
    setEditingShift(shift); // Set the shift to be edited
    // Populate the newShift state with data from the shift being edited
    setNewShift({
      name: shift.name,
      fromTime: shift.from_time, // Use 24 hour format from backend
      toTime: shift.to_time,   // Use 24 hour format from backend
      working_hour: shift.working_hour,
      over_time: shift.over_time,
      status: shift.status,
    });
    setIsAddSidebarOpen(true); // Open the drawer
  };

  // Handle drawer closing
  const handleDrawerClose = (open) => {
    if (!open) {
      setEditingShift(null); // Clear editing state when drawer closes
      setNewShift({
        name: "",
        fromTime: "",
        toTime: "",
        working_hour: 0,
        over_time: 0,
        status: "active",
      });
    }
    setIsAddSidebarOpen(open);
  };


  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-2 py-8 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shift Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your work shifts and schedules
            </p>
          </div>

          <Button
            className="bg-primary_color hover:bg-purple-700 text-white shadow-lg"
            onClick={() => {
              setEditingShift(null); // Clear editing state before adding
              setIsAddSidebarOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Shift
          </Button>
        </div>

        {/* Add/Edit Shift Sidebar */}
        <AddShiftDrawer
          open={isAddSidebarOpen}
          onOpenChange={handleDrawerClose}
          newShift={newShift}
          setNewShift={setNewShift}
          onSubmit={handleSubmitShift}
          isLoading={isLoading || isUpdating}
          editingShift={editingShift}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Shifts
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {shifts?.length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Shifts
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {shifts?.filter((s) => s.status === "active").length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Sun className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Hours
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {shifts?.reduce(
                      (acc, shift) => acc + parseInt(shift.working_hour || 0),
                      0
                    ) || 0}
                    h
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

           {/* Total Employees Card - Placeholder */}
           <Card className="border-0 shadow-sm">
            <CardContent className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Employees
                  </p>
                  {/* Placeholder value - replace with actual data when available */}
                  <p className="text-2xl font-bold text-gray-900">
                    50
                  </p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isShiftLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span>Loading shifts...</span>
              </div>
            </div>
          ) : shifts && shifts.length > 0 ? (
            shifts.map((shift) => {
              const shiftProperties = getShiftProperties(shift.name);
              return (
                <Card
                  key={shift.id}
                  className="group relative overflow-hidden border border-gray-200/60 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Badge
                      variant="secondary"
                      className={`${shiftProperties.color} text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      <span className="mr-2 text-sm">
                        {shiftProperties.icon}
                      </span>
                      {shift.name}
                    </Badge>
                    {/* Status Badge */}
                    <Badge
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        shift.status === "active"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          shift.status === "active"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />
                      {shift.status}
                    </Badge>
                     <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditShift(shift)} disabled={isDeleting || isUpdating || isLoading}>
                          <Edit className="w-4 h-4 text-gray-500" />
                        </Button>
                         <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteShift(shift.id)} disabled={isDeleting || isUpdating || isLoading}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-0">
                    {/* Time Section */}
                    <div className="bg-gray-50/50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-blue-100 rounded-md">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Start
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {shift.from_time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-orange-100 rounded-md">
                            <Clock className="w-3.5 h-3.5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              End
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {shift.to_time}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center pt-2 border-t border-gray-200/60">
                        <div className="flex items-center space-x-2">
                          <Timer className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-600">
                            Total Hours:
                          </span>
                          <span className="text-sm font-bold text-gray-900 bg-white px-2 py-1 rounded-md border">
                            {shift.working_hour}h
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Controls Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              shift.status === "active"
                                ? "bg-emerald-500"
                                : "bg-gray-400"
                            }`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                             Active Status
                          </span>
                        </div>
                        <Switch
                          checked={shift.status === "active"}
                          onCheckedChange={() => toggleShiftStatus(shift.id)}
                          className="data-[state=checked]:bg-emerald-600" disabled={isUpdating}
                        />
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              shift.over_time === 1
                                ? "bg-amber-500"
                                : "bg-gray-400"
                            }`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Overtime Enabled
                          </span>
                        </div>
                        <Switch
                          checked={shift.over_time === 1}
                          onCheckedChange={() => toggleOvertime(shift.id)}
                          className="data-[state=checked]:bg-amber-600" disabled={isUpdating}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No shifts available
              </h3>
              <p className="text-sm text-gray-500 max-w-sm">
                {
                  "There are currently no shifts configured. Create your first shift to get started."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
