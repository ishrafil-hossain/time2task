import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { X, User } from "lucide-react";

const ProjectAssignee = ({
  selectedMembers,
  members,
  isPopoverOpen,
  setIsPopoverOpen,
  toggleMemberSelection,
  removeMember 
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-start gap-3">
          <Label className="text-sm font-medium block">Project Assignee:</Label>

          {/* Selected members avatars */}
          {selectedMembers.length > 0 && (
            <div className="flex -space-x-2">
              {selectedMembers.map((member) => (
                <Tooltip key={member.id}>
                  <TooltipTrigger asChild>
                    <div className="relative group">
                      <Avatar className="w-8 h-8 border-2 border-white">
                        {member.image ? (
                          <AvatarImage src={member.image} alt={member.name} />
                        ) : (
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <button
                        onClick={(e) => removeMember(member.id, e)}
                        className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{member.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}

          {/* Main avatar trigger (always visible) */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarFallback className="bg-purple-100 text-purple-600 border-2 border-dashed border-purple-300">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-2" align="start">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Select Team Members</h4>
                <div className="max-h-60 overflow-y-auto">
                  {members?.data.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer ${
                        selectedMembers.some((m) => m.id === member.id)
                          ? "bg-purple-50"
                          : ""
                      }`}
                      onClick={() => toggleMemberSelection(member)}
                    >
                      <Avatar className="w-6 h-6">
                        {member.image ? (
                          <AvatarImage src={member.image} alt={member.name} />
                        ) : (
                          <AvatarFallback className="text-xs">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                      {selectedMembers.some((m) => m.id === member.id) && (
                        <div className="ml-auto w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Hidden input to store selected member IDs (for form submission) */}
        <input
          type="hidden"
          name="assignees"
          value={selectedMembers.map((m) => m.id).join(",")}
        />
      </div>
    </div>
  );
};

export default ProjectAssignee;
