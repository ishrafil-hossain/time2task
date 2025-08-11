import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Globe,
  Check,
  X,
  Trash,
  Eye,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Nodata from "../../Common/No-data";
import { useApproveDailyTimesheetMutation } from "../../../redux/Timesheet/DailyTimesheetApi";
import { toast } from "react-toastify";

const StatusIndicator = ({ status }) => {
  const statusColors = {
    requested: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    denied: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const TimeSheetListTable = ({ timeLineData, timelineDataRefetch, onPageChange }) => {
  
  const [expandedProject, setExpandedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [approveProject] = useApproveDailyTimesheetMutation();

  // Access the data correctly from the API response structure
  const rows = timeLineData?.data?.rows || [];
  const meta = timeLineData?.data?.meta || {};

  // Group entries by project
  const groupedData = rows.reduce((acc, entry) => {
    const projectName = entry.project?.name || "No Project";
    if (!acc[projectName]) {
      acc[projectName] = [];
    }
    acc[projectName].push(entry);
    return acc;
  }, {});

  // Convert to array format for rendering
  const tableData = Object.entries(groupedData).map(([project, items]) => ({
    project,
    items: items.map(item => ({
      id: item.id,
      reason: item.reason || "-",
      user: item.user?.name || "-",
      userAvatar: "", // You might want to add avatar URLs to your user data
      manual: item.is_manual_entry ? "Yes" : "No",
      status: item.status,
      date: new Date(item.start_time).toLocaleDateString(),
      time: `${item.format_start_time} - ${item.format_end_time}`,
      ip: item.ip || "-",
      duration: item.duration,
    })),
  }));

  const toggleProject = (project) => {
    setExpandedProject(expandedProject === project ? null : project);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  if (!timeLineData?.data?.rows || timeLineData.data.rows.length <= 0) {
    return <Nodata />;
  }

  const handleEditTime = (data) => {
    setManualTimeEntryModal(true);
    setUpdateTimeSheet(data);
    refetch();
  };

  const handleApprove = async (id) => {
    console.log("id", id)
    if (id) {
      try {
        const response = await approveProject({
          id,
          type: "approve",
        }).unwrap();
        toast.success(response.message);
        timelineDataRefetch();
      } catch (error) {
        toast.error("Failed to approve project");
      }
    }
  };

  const handleDenyTime = async (id) => {
    if (id) {
      try {
        const response = await approveProject({
          id,
          type: "deny",
        }).unwrap();
        toast.success(response.message);
        timelineDataRefetch();
      } catch (error) {
        toast.error("Failed to approve project");
      }
    }
  };
  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="border-t border-gray-200 !h-12">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration (hrs)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((projectGroup, projectIndex) => (
              <React.Fragment key={`project-${projectIndex}`}>
                {/* Project row (always visible) */}
                <tr
                  className={`hover:bg-gray-50 ${
                    projectGroup.items.length > 1
                      ? "border-l-4 border-purple-500 cursor-pointer"
                      : ""
                  }`}
                >
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={() =>
                      projectGroup.items.length > 1 && toggleProject(projectGroup.project)
                    }
                  >
                    <div className="flex items-center">
                      {projectGroup.items.length > 1 && (
                        <ChevronDown
                          className={`mr-2 h-4 w-4 text-gray-500 transition-transform ${
                            expandedProject === projectGroup.project ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      <span className="font-medium">{projectGroup.project}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectGroup.items[0].reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                        {projectGroup.items[0].user.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-900">
                        {projectGroup.items[0].user}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectGroup.items[0].manual}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <StatusIndicator status={projectGroup.items[0].status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectGroup.items[0].date} {projectGroup.items[0].time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {projectGroup.items[0].duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-gray-400" />
                      {projectGroup.items[0].ip}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="h-4 w-4 mr-2 text-blue-500" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem className="flex items-center" onClick={(handleApprove(projectGroup.items[0].id))} >
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center" onClick={(handleDenyTime(projectGroup.items[0].id))}>
                          <X className="h-4 w-4 mr-2 text-red-500" />
                          Deny
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>

                {/* Additional project items (conditionally visible) */}
                {projectGroup.items.length > 1 &&
                  expandedProject === projectGroup.project &&
                  projectGroup.items.slice(1).map((item, itemIndex) => (
                    <tr
                      key={`${projectIndex}-${itemIndex}`}
                      className="bg-gray-50 border-l-4 border-purple-500"
                    >
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                            {item.user.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-900">{item.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.manual}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <StatusIndicator status={item.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.date} {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-gray-400" />
                          {item.ip}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="h-4 w-4 mr-2 text-blue-500" />
                              View Details
                            </DropdownMenuItem>

                            
                            <DropdownMenuItem className="flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <X className="h-4 w-4 mr-2 text-red-500" />
                              Deny
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Trash className="h-4 w-4 mr-2 text-gray-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta.total_pages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * parseInt(meta.page_size) + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * parseInt(meta.page_size), meta.total_records)}
              </span>{' '}
              of <span className="font-medium">{meta.total_records}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: Math.min(5, meta.total_pages) }).map((_, index) => {
                let pageNumber;
                if (meta.total_pages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= meta.total_pages - 2) {
                  pageNumber = meta.total_pages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.total_pages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
      {/* Pagination */}
      {timeLineData?.meta && (
        <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{timeLineData.meta.total_records > 0 ? 1 : 0}</span> to{" "}
                <span className="font-medium">
                  {Math.min(
                    currentPage * parseInt(timeLineData.meta.page_size),
                    timeLineData.meta.total_records
                  )}
                </span>{" "}
                of <span className="font-medium">{timeLineData.meta.total_records}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 transform rotate-90" />
                </button>
                {Array.from({ length: Math.min(5, timeLineData.meta.total_pages) }, (_, i) => {
                  let pageNum;
                  if (timeLineData.meta.total_pages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= timeLineData.meta.total_pages - 2) {
                    pageNum = timeLineData.meta.total_pages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? "z-10 bg-purple-50 border-purple-500 text-purple-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === timeLineData.meta.total_pages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 transform -rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSheetListTable;