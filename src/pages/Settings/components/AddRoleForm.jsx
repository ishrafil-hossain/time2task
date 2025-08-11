import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const roleTypes = ["Admin", "Manager", "Employee", "HR"];
const statusOptions = ["ACTIVE", "INACTIVE"];

export default function AddRoleForm({ onSubmit, onCancel }) {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [roleType, setRoleType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && status && roleType) {
      onSubmit?.({ role, status, roleType });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
          <Input id="role" placeholder="As a role" value={role} onChange={e => setRole(e.target.value)} required />
        </div>
        <div className="flex-1">
          <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
          <Select value={status} onValueChange={setStatus} required>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Role Type</Label>
        <div className="flex gap-4 mt-2">
          <RadioGroup value={roleType} onValueChange={setRoleType} className="flex flex-row gap-6">
            {roleTypes.map(type => (
              <div key={type} className="flex items-center gap-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
} 