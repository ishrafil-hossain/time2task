import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRoleQuery } from "../../../redux/role/RoleApi";
import {
  useAddMembersMutation,
  useUpdateMemberMutation,
} from "../../../redux/Member/membersApi";
import { toast } from "react-toastify";

const EmployeeListFilterComp = ({
  setSearchQuery,
  editMemberId,
  isOpen,
  setIsOpen,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  const { data: userRole, isLoading } = useGetRoleQuery({
    page: 1,
    limit: 100,
    status: "active",
  });

  // Add this query to fetch member data
  const memberData = editMemberId;

  const [addMembers] = useAddMembersMutation();
  const [updateMember] = useUpdateMemberMutation();

  useEffect(() => {
    if (memberData) {
      setFormData({
        name: memberData.name,
        email: memberData.email,
        password: "", // Keep password empty for edits
        role_id: memberData.role_id.toString(), // Convert to string if needed
      });
    }
  }, [memberData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!formData.name || !formData.email || (!editMemberId && !formData.password) || !formData.role_id) {
        toast.error("Please fill all required fields");
        return;
      }
  
      if (editMemberId) {
        // For UPDATE - send fields directly in body (not nested in users array)
        const updateData = {
          id: editMemberId.id, // This goes in the URL
          email: formData.email,
          name: formData.name,
          role_id: formData.role_id
        };
  
        // Only include password if it was changed
        if (formData.password) {
          updateData.password = formData.password;
        }
  
        await updateMember(updateData).unwrap();
        toast.success("Member updated successfully");
      } else {
        // For CREATE - keep the users array format
        const createData = {
          users: [{
            name: formData.name,
            email: formData.email,
            role_id: formData.role_id,
            password: formData.password
          }]
        };
  
        await addMembers(createData).unwrap();
        toast.success("Member added successfully");
      }
  
      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        role_id: "",
      });
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-6 justify-between items-center">
        <div className="relative w-[280px] border-primary_color border-[1px] outline-none rounded-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            onChange={handleSearch}
            placeholder="Quick search"
            className="pl-10 w-full"
          />
        </div>

        <button
          onClick={() => {
            setIsOpen(true);
            setFormData({
              name: "",
              email: "",
              password: "",
              role_id: "",
            });
          }}
          className="w-fit h-10 bg-primary_color rounded-md inline-flex justify-center items-center gap-1.5 p-2.5"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-white">Add Member</h1>
            <Plus className="text-white" />
          </div>
        </button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="lg:w-[600px] w-full">
          <SheetHeader>
            <SheetTitle>
              {editMemberId ? "Edit Member" : "Add New Member"}
            </SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name*
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter member name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email*
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter member email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password*
                </label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter member password"
                  required={!editMemberId}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role*
                </label>
                <Select
                  value={formData.role_id}
                  onValueChange={(value) => handleChange("role_id", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role">
                      {formData.role_id
                        ? userRole?.data?.rows?.find(
                            (role) => role.id.toString() === formData.role_id
                          )?.name
                        : "Select role"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {userRole?.data?.rows?.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <SheetFooter>
              <Button
                type="submit"
                className="bg-primary_color hover:bg-primary_color/90"
                disabled={isLoading}
              >
                {editMemberId ? "Update Member" : "Add Member"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EmployeeListFilterComp;
