"use client";

import { useEffect, useState } from "react";

import ProjectFilter from "../../components/ProjectComp/ProjectFilter";
import {
  useAddArchiveMutation,
  useDeleteProjectMutation,
  useGetProjectsByMemberQuery,
  useGetProjectsQuery,
} from "../../redux/features/project/projectApi";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useGetProfileQuery } from "../../redux/features/OrgProfile/OrgProfile";
import { useGetClientQuery } from "../../redux/Client/clientApi";
import ProjectTable from "../../components/ProjectComp/ProjectTable";
import Nodata from "../../components/Common/No-data";
import Swal from "sweetalert2";
import { useGetAllProjectsQuery } from "../../redux/projects/projectApi";
import Pagination from "../../components/Common/Pagination";
import { toast } from "react-toastify";

export default function Project() {
  const [selectedprojectTabButton, setSelectedprojectTabButton] =
    useState("active");
  const [activeDropdown, setActiveDropdown] = useState("");
  const { data: profile, isLoading, refetch } = useGetProfileQuery();
  const [pageSize, setPageSize] = useState(parseInt(10));
  const [currentPage, setCurrentPage] = useState(parseInt(1));
  const [selectedValueProject, setSelectedValueProject] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchProjectName, setSearchProjectName] = useState("");
  const [createProjectClick, setCreateProjectClick] = useState(0);

  const {
    data: clientInfo,
    isError: clientError,
    isLoading: clientLoading,
  } = useGetClientQuery({
    limit: 1000,
  });

  const {
    data: projectData,
    isError,
    isLoading: projectLoading,
  } = useGetProjectsQuery({
    page: currentPage,
    limit: pageSize,
    status: selectedprojectTabButton,
    query: searchProjectName,
    client_id: selectedValue,
  });

  const totalItems = projectData?.data?.meta?.total_records || 0;

  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProjectRole = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Archive The Project!",
      });
  
      if (result.isConfirmed) {
        const response = await deleteProject(id).unwrap();
        toast.success(response?.message || "Operation successful!");
      }
    } catch (error) {
      const errorMessage =
        error?.status === 404
          ? "Project role not found."
          : error?.data?.message || "An error occurred. Please try again.";
  
      toast.error(errorMessage);
    }
  };
  

  const [addArchive] = useAddArchiveMutation();

  const handleArchiveProject = async (project_id, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Archive The Project!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await addArchive({ project_id, type }).unwrap();

          if (response) {
            toast.success("Project archived successfully!");

            // Refetch the projects list
            refetch();
          }

          Swal.fire({
            title: "Archived!",
            text: "Project archived successfully!",
            icon: "success",
          });
        } catch (error) {
          toast.error("Failed to archive the project.");
        }
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <div>
          <ProjectFilter
            projectData={projectData}
            clientInfo={clientInfo}
            selectedValueProject={selectedValueProject}
            setSelectedValueProject={setSelectedValueProject}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            setSelectedprojectTabButton={setSelectedprojectTabButton}
            selectedprojectTabButton={selectedprojectTabButton}
            setSearchProjectName={setSearchProjectName}
            onCreateProjectClick={() => setCreateProjectClick(prev => prev + 1)}
          />
        </div>

        <div className=" mt-5">
          {projectData?.data?.rows.length === 0 ? (
            <Nodata />
          ) : (
            <div className=" mt-4">
              <ProjectTable
                projectData={projectData}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                onDeleteProject={handleDeleteProjectRole}
                onArchiveProject={handleArchiveProject}
                onCreateProjectClick={createProjectClick}
              />
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPages={projectData?.data?.meta?.total_pages}
                totalRecords={totalItems}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
