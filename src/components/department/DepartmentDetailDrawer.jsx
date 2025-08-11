import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDeleteDepartmentMutation } from "@/redux/Department/departmentApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function DepartmentDetailDrawer({ department, open, onOpenChange }) {
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDeleteDepartment = async () => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
  
      if (confirmation.isConfirmed) {
        const response = await deleteDepartment(department.id).unwrap();
        if (response.success === true) {
          toast.success("Department deleted successfully!");
          onOpenChange(false);
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete department");
    }
  };

  if (!department) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-white border-l border-gray-100">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-xl font-bold text-gray-800">
              {department.name}
            </SheetTitle>
            <p className="text-gray-500 text-sm mt-1">
              Created {new Date(department.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button
            variant="outline"
            className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
            onClick={handleDeleteDepartment}
          >
            Delete Department
          </Button>
        </SheetHeader>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">
              Members ({department.department_member?.length || 0})
            </h4>
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-200"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-1">
            {department.department_member?.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3  rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Avatar className="h-10 w-10 border-2 border-gray-100">
                  <AvatarImage
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800">{member.name}</span>
              </div>
            ))}
            {(!department.department_member ||
              department.department_member.length === 0) && (
              <div className="text-center py-4 text-gray-500">
                No members in this department yet
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
