"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";

// Import components
import ProjectInformation from "./CreateProject/ProjectInformation";
import FileUpload from "./CreateProject/FileUpload";
import ProjectDates from "./CreateProject/ProjectDates";
import ProjectBudget from "./CreateProject/ProjectBudget";
import DefaultView from "./CreateProject/DefaultView";
import { useGetClientQuery } from "../../redux/Client/clientApi";
import {
  useGetAllMembersQuery,
  useGetTimezoneCurrencyQuery,
} from "../../redux/Member/membersApi";

import ProjectAssignee from "./CreateProject/ProjectAssignee";
import { useGetInitPermissionQuery } from "../../redux/initSystemPermission/initSystemPermission";

// Import Redux actions
import {
  setStartDate,
  setDeadline,
  setDefaultView,
  setBudgetEnabled,
  setBudgetType,
  setDisableIdleTime,
  setAllowShareWithClient,
  setDescription,
  setSelectedMembers,
  addMember,
  removeMember,
} from "../../redux/features/project/projectCreationSlice";
import { toast } from "react-toastify";

import { useAddProjectMutation, useUpdateProjectMutation } from "../../redux/features/project/projectApi";


export default function CreateProject() {
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const projectCreationData = useSelector((state) => state.projectCreation);

  const {
    data: clientInfo,
    isError: clientError,
    isLoading: clientLoading,
  } = useGetClientQuery({
    limit: 1000,
  });

  const {
    data: members,
    isLoading,
    refetch,
  } = useGetAllMembersQuery({
    limit: 1000,
  });

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const toggleMemberSelection = (member) => {
    const isSelected = projectCreationData.selectedMembers.some((m) => m.id === member.id);
    if (isSelected) {
      dispatch(removeMember(member.id));
    } else {
      dispatch(addMember(member));
    }
  };

  const removeMemberHandler = (memberId, e) => {
    e.stopPropagation();
    dispatch(removeMember(memberId));
  };

  const { data: currencyAndTimezone } = useGetTimezoneCurrencyQuery();
  const { data: ProjectData } = useGetInitPermissionQuery();
  const [addProject] = useAddProjectMutation();

  const [updateProject] = useUpdateProjectMutation();
  const handleSaveAndProceed = async () => {
    // Transform data into required format
    const projectData = {
      name: projectCreationData.projectName,
      status: "active", // Default status
      description: projectCreationData.description,
      client_id: projectCreationData.clientId ? parseInt(projectCreationData.clientId) : null,
      manager_id: projectCreationData.managerId ? parseInt(projectCreationData.managerId) : null, // Use selected manager ID
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
      tasks:[]
    };

    try {
      // Send data to API
      const response = await addProject(projectData).unwrap();
      console.log('Project created successfully:', response);
      toast.success("Project created successfully");
      
      // Keep logging all data for future reference
      console.log('Full Project Creation Data:', {
        // Project Information
        projectName: projectCreationData.projectName,
        clientId: projectCreationData.clientId,
        managerId: projectCreationData.managerId, // Add manager ID to logs
        currency: projectCreationData.currency,
        timezone: projectCreationData.timezone,
        
        // Project Assignee
        selectedMembers: projectCreationData.selectedMembers,
        
        // Project Dates
        startDate: projectCreationData.startDate,
        deadline: projectCreationData.deadline,
        
        // Project Settings
        disableIdleTime: projectCreationData.disableIdleTime,
        allowShareWithClient: projectCreationData.allowShareWithClient,
        
        // Project Budget
        budgetEnabled: projectCreationData.budgetEnabled,
        budgetType: projectCreationData.budgetType,
        budgetAmount: projectCreationData.budgetAmount,
        
        // Default View
        defaultView: projectCreationData.defaultView,
        
        // Description
        description: projectCreationData.description,
        
        // Files
        uploadedFiles: projectCreationData.uploadedFiles,
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Left Panel - Create Project */}
      <div className="w-full lg:w-80 bg-white p-4 lg:p-6 border-b lg:border-b-0 lg:border-r">
        {/* <h2 className="text-xl font-semibold mb-6">Create Project</h2> */}

        <div className="space-y-6">
          <ProjectInformation
            clientInfo={clientInfo}
            currencyAndTimezone={currencyAndTimezone}
            members={members}
          />
          <FileUpload />
        </div>
      </div>

      {/* Right Panel - Others Settings */}
      <div className="flex-1 bg-white p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Others Settings</h2>
        </div>

        <div className="space-y-6 max-w-2xl">
          {/* Project Assignee */}
          <ProjectAssignee
            selectedMembers={projectCreationData.selectedMembers}
            members={members}
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
            toggleMemberSelection={toggleMemberSelection}
            removeMember={removeMemberHandler}
          />

          {/* Dates */}
          <ProjectDates
            startDate={projectCreationData.startDate}
            setStartDate={(date) => dispatch(setStartDate(date))}
            deadline={projectCreationData.deadline}
            setDeadline={(date) => dispatch(setDeadline(date))}
          />

          {/* Disable idle time */}
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

          {/* Project Budget & Hours */}
          <ProjectBudget
            projectData={ProjectData?.data?.project_data}
            budgetEnabled={projectCreationData.budgetEnabled}
            setBudgetEnabled={(enabled) => dispatch(setBudgetEnabled(enabled))}
            budgetType={projectCreationData.budgetType}
            setBudgetType={(type) => dispatch(setBudgetType(type))}
          />

          {/* Choose Default View */}
          <DefaultView
            selectedView={projectCreationData.defaultView}
            setSelectedView={(view) => dispatch(setDefaultView(view))}
          />

          {/* Allow to share with client */}
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

          {/* Description */}
          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium mb-2 block"
            >
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
              onClick={handleSaveAndProceed}
            >
              Save & Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
