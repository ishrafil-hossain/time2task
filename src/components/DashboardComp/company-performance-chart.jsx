"use client"

const performanceData = [
  {
    title: "Total Earning",
    value: "$2,722.65",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Budget",
    value: "$1,719.21",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Employee",
    value: "07",
    bgColor: "bg-cyan-50",
  },
]

export const CompanyPerformanceChart = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {performanceData.map((item, index) => (
        <div key={index} className={`rounded-lg ${item.bgColor} px-3 py-3 h-[120px]`}>
          <h3 className="font-medium text-gray-700">{item.title}</h3>
          <div className="mt-2 text-3xl font-semibold">{item.value}</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-green-500">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 12.8L8 3.2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.2 8L8 3.2L12.8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>8.5% Up last week</span>
          </div>
        </div>
      ))}
    </div>
  )
}
