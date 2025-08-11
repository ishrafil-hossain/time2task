import React from "react";

const Pagination = ({ 
  currentPage, 
  setCurrentPage, 
  pageSize, 
  setPageSize, 
  totalPages, 
  totalRecords 
}) => {
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) { // Fixed: compare with totalPages instead of totalRecords
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="border-t px-2 lg:px-5 bg-tableHeaderColor">
      <div className="mt-4 pb-1 flex justify-between">
        {/* Show selection */}
        <div>
          <label className="text-xs lg:text-sm font-medium text-[#1F1F1F] mr-2">
            Show
          </label>
          <select
            className="text-xs lg:text-sm border outline-gray-300 text-gray-700 py-1 px-1 rounded-md cursor-pointer"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
          </select>
          <span className="text-xs lg:text-sm text-gray-600 ml-2">
            of {totalRecords} records
          </span>
        </div>

        {/* Next and Previous Buttons */}
        <div className="space-x-1">
          {/* previous button */}
          <button
            onClick={handlePrevious}
            className={`text-xs lg:text-sm px-1.5 lg:px-3 py-1 border text-white bg-primary_color rounded-md w-20 ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bgGradientBlueHover"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* next button */}
          <button
            onClick={handleNext}
            className={`text-xs lg:text-sm px-1.5 lg:px-3 py-1 border text-white bg-primary_color rounded-md w-20 ${
              currentPage === totalPages || totalPages === 0
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bgGradientBlueHover"
            }`}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;