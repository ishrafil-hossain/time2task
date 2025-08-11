"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

// Import components
import ProjectInformation from "./CreateProject/ProjectInformation";
import FileUpload from "./CreateProject/FileUpload";
import ProjectDates from "./CreateProject/ProjectDates";
import ProjectBudget from "./CreateProject/ProjectBudget";
import DefaultView from "./CreateProject/DefaultView";
import ProjectAssignee from "./CreateProject/ProjectAssignee";

// Import Redux actions
import {
  setProjectName,
  setClientId,
  setCurrency,
  setTimezone,
  setManagerId,
  setStartDate,
  setDeadline,
  setDefaultView,
  setBudgetEnabled,
  setBudgetType,
  setDisableIdleTime,
  setAllowShareWithClient,
  setDescription,
  setSelectedMembers,
  resetProjectCreation,
} from "../../redux/features/project/projectCreationSlice";

import { useGetClientQuery } from "../../redux/Client/clientApi";
import {
  useGetAllMembersQuery,
  useGetTimezoneCurrencyQuery,
} from "../../redux/Member/membersApi";
import { useGetInitPermissionQuery } from "../../redux/initSystemPermission/initSystemPermission";
import { useGetProjectByIdQuery, useUpdateProjectMutation } from "../../redux/features/project/projectApi";
import { toast } from "react-toastify";

export default function EditProject({ isOpen, onClose, projectId }) {
  const dispatch = useDispatch();
  const projectCreationData = useSelector((state) => state.projectCreation);
  
  // Fetch project data
  const { data: projectData, isLoading: isProjectLoading } = useGetProjectByIdQuery(
    { id: projectId },
    { skip: !projectId }
  );

  // Fetch other required data
  const { data: clientInfo } = useGetClientQuery({ limit: 1000 });
  const { data: members } = useGetAllMembersQuery({ limit: 1000 });
  const { data: currencyAndTimezone } = useGetTimezoneCurrencyQuery();
  const { data: ProjectData } = useGetInitPermissionQuery();
  
  const [updateProject] = useUpdateProjectMutation();

  // Pre-fill form when project data is loaded
  useEffect(() => {
    if (projectData?.data) {
      const data = projectData.data;
      dispatch(setProjectName(data.name || ""));
      dispatch(setClientId(data.client_id?.toString() || null));
      dispatch(setCurrency(data.currency || ""));
      dispatch(setTimezone(data.timezone || ""));
      dispatch(setManagerId(data.manager_id?.toString() || null));
      dispatch(setStartDate(data.start_date || null));
      dispatch(setDeadline(data.deadline || null));
      dispatch(setDisableIdleTime(data.is_ideal_time || false));
      dispatch(setAllowShareWithClient(data.allow_share_with_client || false));
      dispatch(setBudgetEnabled(!!data.budget_type));
      dispatch(setBudgetType(data.budget_type || "fixed"));
      dispatch(setDefaultView(data.default_view || "table"));
      dispatch(setDescription(data.description || ""));
      
      // Set selected members if available
      if (data.assign_users) {
        const selectedMembers = members?.data.filter(member => 
          data.assign_users.includes(member.id)
        ) || [];
        dispatch(setSelectedMembers(selectedMembers));
      }
    }
  }, [projectData, dispatch, members]);

  const handleUpdate = async () => {
    const projectData = {
      id: projectId,
      name: projectCreationData.projectName,
      status: "active",
      description: projectCreationData.description,
      client_id: projectCreationData.clientId ? parseInt(projectCreationData.clientId) : null,
      manager_id: projectCreationData.managerId ? parseInt(projectCreationData.managerId) : null,
      start_date: projectCreationData.startDate ? new Date(projectCreationData.startDate).toISOString().split('T')[0] : "",
      deadline: projectCreationData.deadline ? new Date(projectCreationData.deadline).toISOString().split('T')[0] : "",
      assign_users: projectCreationData.selectedMembers.map(member => member.id),
      is_ideal_time: projectCreationData.disableIdleTime,
      hourly_rate_type: projectCreationData.budgetType === "hourly" ? "hourly" : "",
      hourly_fee: projectCreationData.budgetType === "hourly" ? projectCreationData.budgetAmount : 0,
      fixed_project_fee: projectCreationData.budgetType === "fixed" ? projectCreationData.budgetAmount : null,
      budget_type: projectCreationData.budgetEnabled ? projectCreationData.budgetType : "",
      budget_cost: projectCreationData.budgetAmount,
      based_on: "bill_rate",
      currency: projectCreationData.currency,
      tasks: []
    };

    try {
      await updateProject(projectData).unwrap();
      toast.success("Project updated successfully");
      onClose();
      dispatch(resetProjectCreation());
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error("Failed to update project");
    }
  };

  const handleClose = () => {
    dispatch(resetProjectCreation());
    onClose();
  };

  if (isProjectLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-full sm:max-w-[800px] overflow-y-auto">
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 mt-4">
          {/* Left Panel - Project Information */}
          <div className="w-full lg:w-80 bg-white p-4 lg:p-6 border-b lg:border-b-0 lg:border-r">
            <div className="space-y-6">
              <ProjectInformation
                clientInfo={clientInfo}
                currencyAndTimezone={currencyAndTimezone}
                members={members}
              />
              <FileUpload />
            </div>
          </div>

          {/* Right Panel - Other Settings */}
          <div className="flex-1 bg-white p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Other Settings</h2>
            </div>

            <div className="space-y-6 max-w-2xl">
              <ProjectAssignee
                selectedMembers={projectCreationData.selectedMembers}
                members={members}
              />

              <ProjectDates
                startDate={projectCreationData.startDate}
                setStartDate={(date) => dispatch(setStartDate(date))}
                deadline={projectCreationData.deadline}
                setDeadline={(date) => dispatch(setDeadline(date))}
              />

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="disable-idle" 
                  checked={projectCreationData.disableIdleTime}
                  onCheckedChange={(checked) => dispatch(setDisableIdleTime(checked))}
                />
                <Label htmlFor="disable-idle" className="text-sm">
                  Disable idle time
                </Label>
              </div>

              <ProjectBudget
                projectData={ProjectData?.data?.project_data}
                budgetEnabled={projectCreationData.budgetEnabled}
                setBudgetEnabled={(enabled) => dispatch(setBudgetEnabled(enabled))}
                budgetType={projectCreationData.budgetType}
                setBudgetType={(type) => dispatch(setBudgetType(type))}
              />

              <DefaultView
                selectedView={projectCreationData.defaultView}
                setSelectedView={(view) => dispatch(setDefaultView(view))}
              />

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="share-client" 
                  checked={projectCreationData.allowShareWithClient}
                  onCheckedChange={(checked) => dispatch(setAllowShareWithClient(checked))}
                />
                <Label htmlFor="share-client" className="text-sm">
                  Allow to share with client
                </Label>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                  Description:
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter project description..."
                  className="min-h-[100px]"
                  value={projectCreationData.description}
                  onChange={(e) => dispatch(setDescription(e.target.value))}
                />
              </div>

              <SheetFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                  onClick={handleUpdate}
                >
                  Update Project
                </Button>
              </SheetFooter>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 