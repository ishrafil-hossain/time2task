import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
const SearchMember = () => {
  return (
    <div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Member</label>
        <Select defaultValue="tasfia">
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center gap-2">
                <div className="bg-purple-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                  T
                </div>
                <span>Tashfia Barshat</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tasfia">Tashfia Barshat</SelectItem>
            <SelectItem value="ishrafil">Ishrafil Hossain</SelectItem>
            <SelectItem value="sofiqul">Sofiqul Islam</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchMember;
