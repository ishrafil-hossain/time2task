import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Pencil } from "lucide-react";

const EditableCell = ({ value: initialValue, onSave, type = "text", options = [] }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [dateValue, setDateValue] = useState(initialValue ? new Date(initialValue) : null);

  const formatDate = (date) => {
  if (!date) return "—";
  return format(new Date(date), "dd MMM yyyy"); // e.g., 11 Jan 2025
};

  const handleSave = (val) => {
    setIsEditing(false);
    if (type === "date" && val instanceof Date) {
      onSave(formatDate(val));
    } else {
      onSave(val ?? value);
    }
  };

  return (
    <td className="relative px-4 py-2 text-sm group border-b border-[#F0F0F0] min-w-[120px]">
      {/* Display Mode */}
      {!isEditing && (
        <div className="relative">
          <span className="px-2 py-2 block border border-gray-400 border-opacity-0 group-hover:border-opacity-100 transition-all duration-300 rounded w-full truncate">
            {type === "date" && value ? formatDate(value) : value || "—"}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 flex items-center justify-center w-6 h-6 rounded hover:bg-gray-200"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing && (
        <div className="text-sm">
          {type === "text" && (
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => handleSave(value)}
              autoFocus
            />
          )}

          {type === "select" && (
            <Select
              defaultValue={value}
              onValueChange={(val) => handleSave(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {type === "date" && (
            <Popover>
              <PopoverTrigger asChild>
                <Input
                  readOnly
                  value={dateValue ? format(dateValue, "yyyy-MM-dd") : ""}
                  autoFocus
                />
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto">
                <Calendar
                  mode="single"
                  selected={dateValue}
                  onSelect={(date) => {
                    setDateValue(date);
                    setTimeout(() => handleSave(date), 100);
                  }}
                />
              </PopoverContent>
            </Popover>
          )}

          {type === "time" && (
            <Select
              defaultValue={value}
              onValueChange={(val) => handleSave(val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, hour) => {
                  const h = hour.toString().padStart(2, "0");
                  return (
                    <SelectItem key={h} value={`${h}:00`}>
                      {h}:00
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </td>
  );
};

export default EditableCell;
