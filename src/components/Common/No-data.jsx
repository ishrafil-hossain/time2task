import { ImageOff } from "lucide-react";
import React from "react";

const Nodata = () => {
  return (
    <div>
      <div className="w-full h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-100 shadow-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
            <ImageOff className="w-10 h-10 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold text-purple-900">
            No Data Found
          </h3>
          <p className="text-purple-600 text-center max-w-md">
           "No data available for the selected time period."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nodata;
