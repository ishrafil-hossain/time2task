import React from "react";
import { User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectName,
  setClientId,
  setCurrency,
  setTimezone,
  setManagerId,
} from "../../../redux/features/project/projectCreationSlice";

export default function ProjectInformation({
  clientInfo,
  currencyAndTimezone,
  members,
}) {
  const dispatch = useDispatch();
  const { projectName, clientId, currency, timezone, managerId } = useSelector(
    (state) => state.projectCreation
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Project Information:</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="project-name" className="text-sm font-medium">
            Project Name*
          </Label>
          <div className="relative mt-1">
            <Input
              id="project-name"
              placeholder="Add name"
              className="pl-8"
              value={projectName}
              onChange={(e) => dispatch(setProjectName(e.target.value))}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Select Client</Label>
          <Select
            value={clientId?.toString()}
            onValueChange={(value) => dispatch(setClientId(value))}
          >
            <SelectTrigger className="mt-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Client" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {clientInfo?.data.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Select Manager</Label>
          <Select
            value={managerId?.toString()}
            onValueChange={(value) => dispatch(setManagerId(value))}
          >
            <SelectTrigger className="mt-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Manager" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {members?.data
                .filter(
                  (member) =>
                    member.role.name === "Super Admin" ||
                    member.role.name === "Admin"
                )
                .map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Select Currency</Label>
          <Select
            value={currency}
            onValueChange={(value) => dispatch(setCurrency(value))}
          >
            <SelectTrigger className="mt-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">$</span>
                <SelectValue placeholder="Currency" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {currencyAndTimezone?.data.currency.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
