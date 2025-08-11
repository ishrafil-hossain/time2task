import { X, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";
import { useCreateDepartmentMutation } from "../../redux/Department/departmentApi";

export function CreateDepartmentDrawer({
  open,
  onOpenChange,
  newDepartment,
  setNewDepartment,
  onSubmit: onSubmitProp,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const { data: users, isLoading } = useGetSearchMembersQuery({
    page: 1,
    limit: 1000,
  });
  const [createDepartment, { isLoading: isCreating }] = useCreateDepartmentMutation();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (userId) => {
    const currentIds = newDepartment.user_ids || [];
    if (currentIds.includes(userId)) {
      setNewDepartment({
        ...newDepartment,
        user_ids: currentIds.filter((id) => id !== userId),
      });
    } else {
      setNewDepartment({
        ...newDepartment,
        user_ids: [...currentIds, userId],
      });
    }
  };

  const removeUser = (userId) => {
    setNewDepartment({
      ...newDepartment,
      user_ids: (newDepartment.user_ids || []).filter((id) => id !== userId),
    });
  };

  const getSelectedUsers = () => {
    if (!users?.data || !newDepartment.user_ids) return [];
    return users.data.filter((user) => newDepartment.user_ids.includes(user.id));
  };

  const filteredUsers = users?.data?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async () => {
    try {
      if (!newDepartment.name?.trim()) {
        toast.error("Department name is required");
        return;
      }

      if (!newDepartment.user_ids?.length) {
        toast.error("Please select at least one member");
        return;
      }

      const response = await createDepartment(newDepartment).unwrap();
      toast.success("Department created successfully!");
      onOpenChange(false);
      if (onSubmitProp) {
        onSubmitProp(response);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create department");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-white border-l border-gray-100">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-gray-800">
            Create Department
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Department Name
            </label>
            <Input
              placeholder="e.g. HR Department"
              value={newDepartment.name}
              onChange={(e) =>
                setNewDepartment({ ...newDepartment, name: e.target.value })
              }
              className="border-purple-200 focus:border-purple-400 rounded-lg bg-gray-50 hover:bg-white focus:bg-white transition-colors"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Purpose</label>
            <Textarea
              placeholder="Add"
              value={newDepartment.purpose}
              onChange={(e) => setNewDepartment({ ...newDepartment, purpose: e.target.value })}
              className="border-gray-200 focus:border-purple-400 min-h-[80px] rounded-lg bg-gray-50 hover:bg-white focus:bg-white transition-colors"
            />
          </div> */}

          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Members
            </label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full justify-between border-gray-200 focus:border-purple-400 rounded-lg bg-gray-50 hover:bg-white focus:bg-white transition-colors"
              >
                {isLoading ? "Loading..." : "Select members..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2 border-b">
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-gray-200 focus:border-purple-400"
                    />
                  </div>
                  <div className="max-h-64 overflow-auto">
                    {filteredUsers?.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500 text-center">
                        No members found
                      </div>
                    ) : (
                      filteredUsers?.map((user) => (
                        <div
                          key={user.id}
                          onClick={() => handleSelect(user.id)}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-50",
                            newDepartment.user_ids?.includes(user.id) && "bg-purple-50"
                          )}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              newDepartment.user_ids?.includes(user.id)
                                ? "opacity-100 text-purple-600"
                                : "opacity-0"
                            )}
                          />
                          <span>{user.name}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Users Display */}
            <div className="flex flex-wrap gap-2 mt-2">
              {getSelectedUsers().map((user) => (
                <Badge
                  key={user.id}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  {user.name}
                  <button
                    onClick={() => removeUser(user.id)}
                    className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isCreating}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
