import React, { useState } from "react";
import UserRolesTable from "./components/UserRolesTable";
import AddRoleForm from "./components/AddRoleForm";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const initialRoles = [
  { id: 1, name: "Manager", status: "ACTIVE" },
  { id: 2, name: "HR", status: "ACTIVE" },
  { id: 3, name: "Admin", status: "ACTIVE" },
  { id: 4, name: "User", status: "ACTIVE" },
  { id: 5, name: "Employee", status: "ACTIVE" },
];

const UserRoles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [open, setOpen] = useState(false);

  const handleAddRole = (newRole) => {
    setRoles([
      ...roles,
      { id: roles.length + 1, name: newRole.role, status: newRole.status },
    ]);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold">User Role</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="ml-2 bg-primary_color">+ Add Role</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Add New Role</SheetTitle>
            </SheetHeader>
            <AddRoleForm onSubmit={handleAddRole} onCancel={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <UserRolesTable roles={roles} />
    </div>
  );
};

export default UserRoles;
