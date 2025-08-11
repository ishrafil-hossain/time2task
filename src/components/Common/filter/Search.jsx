import * as React from "react";
import { Check, Search, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const CommonSearch = ({
  selectItem,
  selectValue,
  placeholderValue = "Select an option...",
  data = [],
  iconName,
  setSelectedValue,
  selectedValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    if (selectedValue) {
      setValue(selectedValue);
    }
  }, [selectedValue]);

  React.useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue(null);
    }
  }, [value, setSelectedValue]);

  const handleClearSelection = (e) => {
    e.stopPropagation();
    setValue("");
    // The useEffect above will handle updating the parent
  };

  const filteredData = data?.filter(
    (item) =>
      item[selectItem]?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item[selectValue] !== value
  );

  const selectedItem = data.find((item) => item[selectValue] === value);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen} className="searchDropdown">
        <PopoverTrigger asChild className="searchDropdown">
          {value && selectedItem ? (
            // Selected state with blue background design
            <div className="p-[1px] rounded-[8px] bg-gradient-to-r from-[#009DDA] to-[#294DFF] cursor-pointer">
              <div className="flex items-center justify-between w-full h-8 px-3 bg-white rounded-[7px] hover:bg-gray-50">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {iconName ? (
                    <FontAwesomeIcon icon={iconName} className="text-[#7C7C7C] flex-shrink-0" />
                  ) : (
                    <Search className="h-3 w-3 text-[#7C7C7C] flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {selectedItem[selectItem]}
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <div 
                    onClick={handleClearSelection}
                    className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-[#009DDA] to-[#294DFF] hover:bg-blue-600 rounded-full cursor-pointer transition-colors"
                  >
                    <X className="h-3 w-3 text-white" />
                  </div>
                  {!value && (
                    <div className="flex items-center justify-center w-5 h-5">
                      <svg 
                        width="12" 
                        height="7" 
                        viewBox="0 0 12 7" 
                        fill="none" 
                        className="text-gray-500"
                      >
                        <path 
                          d="M1 1L6 6L11 1" 
                          stroke="currentColor" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
          ) : (
            // Default state
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex items-center gap-2 w-full justify-between h-9 border-[1px] border-[#D9D9D9] rounded-md searchDropdown"
            >
              <div className="flex items-center gap-2">
                {iconName ? (
                  <FontAwesomeIcon icon={iconName} className="text-[#7C7C7C]" />
                ) : (
                  <Search className="h-3 w-3 text-[#7C7C7C]" />
                )}
                <span className="text-muted-foreground truncate">
                  {placeholderValue}
                </span>
              </div>
              <FontAwesomeIcon icon={faAngleDown} className="text-[#7C7C7C]" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent 
          className="w-[180px] p-0 z-[1000]" 
          style={{ zIndex: 100000 }} 
          align="start"
          avoidCollisions={true}
          collisionPadding={20}
        >
          <div className="p-4 searchDropdown" style={{ zIndex: 100000 }}>
            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
              <Search className="h-5 w-5 text-[#7C7C7C] mr-2" />
              <input
                className="flex-1 bg-transparent outline-none"
                placeholder={`Search ${placeholderValue.toLowerCase()}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-1 searchDropdown">
              {filteredData.length === 0 ? (
                <div className="px-1 py-2 text-sm text-gray-500">
                  No items found.
                </div>
              ) : (
                filteredData?.map((item) => (
                  <div
                    key={item[selectValue]}
                    className="px-1 py-2 hover:bg-slate-100 cursor-pointer rounded-sm flex items-center justify-between"
                    onClick={() => {
                      setValue(item[selectValue]);
                      setSearchTerm("");
                      setOpen(false);
                    }}
                  >
                    <p className="font-medium">{item[selectItem]}</p>
                    {value === item[selectValue] && (
                      <Check className="h-3 w-3 text-[#7C7C7C]" />
                    )}
                  </div>
                ))
              )}
              {/* Optional: Add Project Button like the example */}
              <div className="px-1 py-2 text-[#7C7C7C] hover:bg-slate-100 cursor-pointer rounded-sm mt-2">
                <p className="font-medium">+ Add New</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CommonSearch;