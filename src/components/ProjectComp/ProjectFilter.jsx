import React from "react";
import CommonSearch from "../Common/filter/Search";
import { faProjectDiagram, faUser } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const ProjectFilter = ({
  projectData,
  clientInfo,
  selectedValueProject,
  setSelectedValueProject,
  selectedValue,
  setSelectedValue,
  selectedprojectTabButton,
  setSelectedprojectTabButton,
  setSearchProjectName,
  onCreateProjectClick
}) => {
  return (
    <div className=" flex flex-col lg:flex-row justify-between items-center">
      <div className="flex flex-wrap items-center gap-2">
        <div className=" ">
          <Tabs
            defaultValue={selectedprojectTabButton}
            className="w-full lg:w-[250px] border-[1px] border-primary_color rounded-lg"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="active"
                onClick={() => setSelectedprojectTabButton("active")}
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="archived"
                onClick={() => setSelectedprojectTabButton("completed")}
              >
                Archived
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* Search projects */}
        <div className=" w-[180px]">
        <div className="flex flex-1 lg:items-center   ">
          <div className="relative w-full">
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-primary_color rounded-md w-full"
              placeholder="Search projects"
              onChange={(e) => setSearchProjectName(e.target.value)}
            />
            <span className="absolute left-2 top-2/4 transform -translate-y-2/4 bg-blueColor p-1 rounded-lg ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.4 4.4a1 1 0 01-1.414 1.414l-4.4-4.4zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        </div>

        {/* Search client */}

        <div className=" w-[180px]">
          <CommonSearch
            selectItem="name"
            selectValue="id"
            data={clientInfo?.data}
            placeholderValue="Client"
            iconName={faUser}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </div>

      <div 
        className="bg-primary_color text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#9a24e6] transition-colors"
        onClick={onCreateProjectClick}
      >
        <h1>Create Project</h1>
      </div>
    </div>
  );
};

export default ProjectFilter;
