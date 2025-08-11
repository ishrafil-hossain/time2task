import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Project Information
  projectName: "",
  clientId: null,
  currency: "",
  timezone: "",
  managerId: null,
  
  // Project Assignee
  selectedMembers: [],
  
  // Project Dates
  startDate: null,
  deadline: null,
  
  // Project Settings
  disableIdleTime: false,
  allowShareWithClient: false,
  
  // Project Budget
  budgetEnabled: false,
  budgetType: "fixed", // "fixed" or "hourly"
  budgetAmount: 0,
  
  // Default View
  defaultView: "table", // "table" or "calendar"
  
  // Description
  description: "",
  
  // Files
  uploadedFiles: [],
};

const projectCreationSlice = createSlice({
  name: "projectCreation",
  initialState,
  reducers: {
    // Project Information
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setManagerId: (state, action) => {
      state.managerId = action.payload;
    },
    
    // Project Assignee
    setSelectedMembers: (state, action) => {
      state.selectedMembers = action.payload;
    },
    addMember: (state, action) => {
      state.selectedMembers.push(action.payload);
    },
    removeMember: (state, action) => {
      state.selectedMembers = state.selectedMembers.filter(
        member => member.id !== action.payload
      );
    },
    
    // Project Dates
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setDeadline: (state, action) => {
      state.deadline = action.payload;
    },
    
    // Project Settings
    setDisableIdleTime: (state, action) => {
      state.disableIdleTime = action.payload;
    },
    setAllowShareWithClient: (state, action) => {
      state.allowShareWithClient = action.payload;
    },
    
    // Project Budget
    setBudgetEnabled: (state, action) => {
      state.budgetEnabled = action.payload;
    },
    setBudgetType: (state, action) => {
      state.budgetType = action.payload;
    },
    setBudgetAmount: (state, action) => {
      state.budgetAmount = action.payload;
    },
    
    // Default View
    setDefaultView: (state, action) => {
      state.defaultView = action.payload;
    },
    
    // Description
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    
    // Files
    setUploadedFiles: (state, action) => {
      state.uploadedFiles = action.payload;
    },
    addUploadedFile: (state, action) => {
      state.uploadedFiles.push(action.payload);
    },
    removeUploadedFile: (state, action) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        file => file.id !== action.payload
      );
    },
    
    // Reset form
    resetProjectCreation: (state) => {
      return initialState;
    },
  },
});

export const {
  setProjectName,
  setClientId,
  setCurrency,
  setTimezone,
  setManagerId,
  setSelectedMembers,
  addMember,
  removeMember,
  setStartDate,
  setDeadline,
  setDisableIdleTime,
  setAllowShareWithClient,
  setBudgetEnabled,
  setBudgetType,
  setBudgetAmount,
  setDefaultView,
  setDescription,
  setUploadedFiles,
  addUploadedFile,
  removeUploadedFile,
  resetProjectCreation,
} = projectCreationSlice.actions;

export default projectCreationSlice.reducer; 