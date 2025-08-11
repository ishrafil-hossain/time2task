import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const MonthyCalander = ({ setMonth }) => {
  const today = dayjs();
  const [selectedMonth, setSelectedMonth] = useState(today.month());
  const [selectedYear, setSelectedYear] = useState(today.year());
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (selectedMonth !== null && selectedYear !== null) {
      const formatted = dayjs(`${selectedYear}-${selectedMonth + 1}-01`).format("YYYY-MM");
      setMonth(formatted);
    }
  }, [selectedMonth, selectedYear]);
  

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleMonthSelect = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setShowDropdown(false);
  };

  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));

  const handleThisMonth = () => {
    setSelectedMonth(today.month());
    setSelectedYear(today.year());
    setShowDropdown(false);
  };

  const handleClear = () => {
    setSelectedMonth(null);
    setSelectedYear(null);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-fit mx-auto ">
      {/* Header with navigation & selected month */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() =>
            setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))
          }
          className="px-2 py-1 rounded bg-purple-100 text-purple-800 hover:bg-purple-200"
        >
          &#8249;
        </button>

        <button
          onClick={toggleDropdown}
          className="px-8 py-2 rounded bg-white border-[1px] border-[#B129FF]  text-black font-semibold hover:bg-purple-100"
        >
          {selectedMonth !== null && selectedYear
            ? `${months[selectedMonth]} ${selectedYear}`
            : "Select Month"}
        </button>

        <button
          onClick={() =>
            setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))
          }
          className="px-2 py-1 rounded bg-purple-100 text-purple-800 hover:bg-purple-200"
        >
          &#8250;
        </button>
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute top-14 z-10 bg-white border rounded shadow-lg p-4 w-64">
          {/* Year input */}
          <input
            type="number"
            value={selectedYear}
            onChange={handleYearChange}
            className="mb-3 w-full p-2 border rounded bg-purple-50 text-purple-800"
          />

          {/* Month grid */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {months.map((month, index) => (
              <button
                key={index}
                onClick={() => handleMonthSelect(index)}
                className={`p-2 rounded ${
                  selectedMonth === index
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Footer buttons */}
          <div className="flex justify-between text-sm text-purple-700">
            {/* <button onClick={handleClear} className="hover:underline">
              Clear
            </button> */}
            <button onClick={handleThisMonth} className="hover:underline">
              This month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthyCalander;
