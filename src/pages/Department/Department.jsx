"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DepartmentCard } from "@/components/department/DepartmentCard";
import { DepartmentDetailDrawer } from "@/components/department/DepartmentDetailDrawer";
import { CreateDepartmentDrawer } from "@/components/department/CreateDepartmentDrawer";
import { SearchBar } from "@/components/department/SearchBar";
import { useGetDepartmentsQuery } from "../../redux/Department/departmentApi";

export default function Department() {
  const [showDepartmentDetail, setShowDepartmentDetail] = useState(false);
  const [showCreateDepartment, setShowCreateDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    user_ids: [],
  });

  const { data: department, refetch } = useGetDepartmentsQuery({ page: 1, limit: 1000 });
  const departments = department?.data?.rows || [];

  // Filter departments based on search query
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setShowDepartmentDetail(true);
  };

  const handleCreateDepartment = async (response) => {
    // Refetch departments after successful creation
    await refetch();
    setShowCreateDepartment(false);
    setNewDepartment({ name: "", user_ids: [] });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Department</h1>
        <Button
          onClick={() => setShowCreateDepartment(true)}
          className="bg-primary_color hover:to-purple-700 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          size="icon"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDepartments.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            onDepartmentClick={handleDepartmentClick}
          />
        ))}
      </div>

      {/* Department Detail Drawer */}
      <DepartmentDetailDrawer
        department={selectedDepartment}
        open={showDepartmentDetail}
        onOpenChange={setShowDepartmentDetail}
      />

      {/* Create Department Drawer */}
      <CreateDepartmentDrawer
        open={showCreateDepartment}
        onOpenChange={setShowCreateDepartment}
        newDepartment={newDepartment}
        setNewDepartment={setNewDepartment}
        onSubmit={handleCreateDepartment}
      />
    </div>
  );
}
