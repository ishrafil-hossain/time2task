import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, PencilIcon, EyeIcon, Trash2Icon } from "lucide-react";

const mockRoles = [
  { id: 1, name: "Manager", status: "ACTIVE" },
  { id: 2, name: "HR", status: "ACTIVE" },
  { id: 3, name: "Admin", status: "ACTIVE" },
  { id: 4, name: "User", status: "ACTIVE" },
  { id: 5, name: "Employee", status: "ACTIVE" },
];

export default function UserRolesTable({ roles = mockRoles, onEdit, onPermission, onDelete }) {
  return (
    <div className="border-t border-b  overflow-hidden">
      <div className="border-b" />
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center w-1/4">Serial</TableHead>
            <TableHead className="text-center w-1/4">Role Name</TableHead>
            <TableHead className="text-center w-1/4">Status</TableHead>
            <TableHead className="text-center w-1/4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role, idx) => (
            <TableRow key={role.id}>
              <TableCell className="text-center w-1/4">{idx + 1}</TableCell>
              <TableCell className="text-center w-1/4">{role.name}</TableCell>
              <TableCell className="text-center w-1/4">
                <Badge variant="default" className="bg-green-600 hover:bg-green-700">ACTIVE</Badge>
              </TableCell>
              <TableCell className="text-center w-1/4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="min-w-[100px]">Actions <MoreVerticalIcon className="ml-1" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Select Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit?.(role)}>
                      <PencilIcon className="mr-2 w-4 h-4" /> Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onPermission?.(role)}>
                      <EyeIcon className="mr-2 w-4 h-4" /> Edit Permission
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete?.(role)} className="text-red-600">
                      <Trash2Icon className="mr-2 w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t" />
    </div>
  );
} 