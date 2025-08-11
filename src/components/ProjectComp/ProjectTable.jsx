import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  Copy,
  Download,
  Eye,
  MoreHorizontal,
  Pen,
  Pencil,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import Drawer from "../ui/drawer";
import CreateProject from "./CreateProject";
import EditProject from "./EditProject";

const ProjectTable = ({ 
  projectData, 
  activeDropdown, 
  setActiveDropdown,
  onDeleteProject,
  onArchiveProject,
  onCreateProjectClick 
}) => {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleEditClick = (project) => {
    setSelectedProjectId(project.id);
    setIsEditDrawerOpen(true);
    setActiveDropdown(null);
  };

  const handleCreateClick = () => {
    setIsCreateDrawerOpen(true);
  };

  // Listen for create project click from parent
  useEffect(() => {
    if (onCreateProjectClick) {
      handleCreateClick();
    }
  }, [onCreateProjectClick]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border border-gray-200">
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Project Name
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Progress
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Client
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Start Date
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Deadline
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-4 px-4 font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {projectData?.data?.rows?.map((project) => (
              <tr key={project.id} className="border border-gray-100">
                <td className="py-4 px-4 text-gray-900">{project.name}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-36 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          project.status === "completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: "50%" }}
                      />
                    </div>
                    <span className="text-gray-600 text-sm">50%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {/* <div className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center bg-gray-100">
                        {project?.client?.name.charAt(0)}
                      </div> */}
                    <span className="text-gray-900">
                      {project?.client?.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {new Date(project.start_date).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-gray-600">
                  {new Date(project.deadline).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        project.status === "active"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span className="text-gray-900 capitalize">
                      {project.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 relative">
                  <DropdownMenu
                    open={activeDropdown === project.id}
                    onOpenChange={(open) =>
                      setActiveDropdown(open ? project.id : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => onArchiveProject(project.id, 'archive')}
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        <span>Archive</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => handleEditClick(project)}
                      >
                        <Pen className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600"
                        onClick={() => onDeleteProject(project.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Project Drawer */}
      <EditProject
        isOpen={isEditDrawerOpen}
        onClose={() => {
          setIsEditDrawerOpen(false);
          setSelectedProjectId(null);
        }}
        projectId={selectedProjectId}
      />

      {/* Create Project Drawer */}
      <Drawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
        title="Create Project"
        className="w-full lg:!w-1/2"
      >
        <CreateProject
          onClose={() => setIsCreateDrawerOpen(false)}
        />
      </Drawer>
    </div>
  );
};

export default ProjectTable;
