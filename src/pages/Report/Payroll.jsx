import { ChevronLeft, ChevronRight, Download, MoreHorizontal, Plus, Search, User } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function Payroll() {
  return (
    <div className="container mx-auto ">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Payroll Overview</h1>
          <div className="flex items-center bg-purple-50 rounded-md p-1">
            <span className="px-3 text-sm">This Week</span>
            <div className="flex items-center space-x-1">
              <button className="p-1">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <span className="px-3 text-sm text-gray-600">Mon, Jan 12 2025 - Sun, Jan 19 2025</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 flex flex-col">
            <span className="text-sm text-gray-600">Total Payroll Cost</span>
            <div className="mt-2 bg-green-500 text-white rounded-md px-3 py-2 w-fit">
              <span className="font-medium">$6500.00</span>
            </div>
          </Card>

          <Card className="p-4 flex flex-col">
            <span className="text-sm text-gray-600">Employees Paid</span>
            <div className="mt-2 bg-orange-400 text-white rounded-md px-3 py-2 w-fit">
              <span className="font-medium">03%</span>
            </div>
          </Card>

          <Card className="p-4 flex flex-col">
            <span className="text-sm text-gray-600">Total Payments</span>
            <div className="mt-2 bg-purple-500 text-white rounded-md px-3 py-2 w-fit">
              <span className="font-medium">$5000.67</span>
            </div>
          </Card>

          <Card className="p-4 flex flex-col">
            <span className="text-sm text-gray-600">Pending Payments</span>
            <div className="mt-2 bg-orange-500 text-white rounded-md px-3 py-2 w-fit">
              <span className="font-medium">$1499.33</span>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className=" flex flex-col lg:flex-row gap-4">
          <Card className="p-4 w-full lg:w-2/3">
            <div className="flex flex-col h-full">

              <div className="flex-1 flex items-end">
                <PayrollBarChart />
              </div>
            </div>
          </Card>

          <Card className="p-4 w-full lg:w-1/3">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <span className="text-sm text-gray-600">Bonuses vs Overtime vs Deduction</span>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <DonutChart />
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Overview */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Payment Overview</h2>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Quick search" className="pl-8 w-full md:w-60" />
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-full md:w-60">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <SelectValue placeholder="Select member" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All members</SelectItem>
                  <SelectItem value="tasfia">Tasfia Barshat</SelectItem>
                  <SelectItem value="ishrafil">Ishrafil Hossain</SelectItem>
                </SelectContent>
              </Select>

              <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="py-3 px-4 font-normal">Employee</th>
                  <th className="py-3 px-4 font-normal">Department</th>
                  <th className="py-3 px-4 font-normal">Gross Salary</th>
                  <th className="py-3 px-4 font-normal">Bonuses</th>
                  <th className="py-3 px-4 font-normal">Overtime</th>
                  <th className="py-3 px-4 font-normal">Deduction</th>
                  <th className="py-3 px-4 font-normal">Payable Salary</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 font-normal">Payment Date</th>
                  <th className="py-3 px-4 font-normal">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                          <img
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={employee.name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <span>{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${
                          employee.department === "Creative Design" ? "bg-purple-500" : "bg-purple-600"
                        } text-white rounded-full`}
                      >
                        {employee.department}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">${employee.grossSalary}</td>
                    <td className="py-3 px-4">${employee.bonuses}</td>
                    <td className="py-3 px-4">${employee.overtime}</td>
                    <td className="py-3 px-4">${employee.deduction}</td>
                    <td className="py-3 px-4">${employee.payableSalary}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={`${
                          employee.status === "Paid" ? "bg-orange-500" : "bg-red-500"
                        } text-white rounded-full`}
                      >
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{employee.paymentDate}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const employeeData = [
  {
    name: "Tasfia Barshat",
    department: "Creative Design",
    grossSalary: "1524.00",
    bonuses: "24.12",
    overtime: "9.02",
    deduction: "72.67",
    payableSalary: "1447.84",
    status: "Paid",
    paymentDate: "Jan 13 2025",
  },
  {
    name: "Ishrafil Hossain",
    department: "Development",
    grossSalary: "1524.00",
    bonuses: "24.12",
    overtime: "9.02",
    deduction: "72.67",
    payableSalary: "1447.84",
    status: "Pending",
    paymentDate: "---",
  },
  {
    name: "Sabariya Majumder",
    department: "Creative Design",
    grossSalary: "1524.00",
    bonuses: "24.12",
    overtime: "9.02",
    deduction: "72.67",
    payableSalary: "1447.84",
    status: "Paid",
    paymentDate: "Jan 13 2025",
  },
  {
    name: "Sofiqul Islam",
    department: "Development",
    grossSalary: "1524.00",
    bonuses: "24.12",
    overtime: "9.02",
    deduction: "72.67",
    payableSalary: "1447.84",
    status: "Paid",
    paymentDate: "Jan 13 2025",
  },
]


function PayrollBarChart() {
        const [activeTab, setActiveTab] = useState('6M');
        const [hoveredIndex, setHoveredIndex] = useState(null);
        

        const chartData = [
          { month: "Aug 24", value: 100 },
          { month: "Sep 24", value: 400 },
          { month: "Oct 24", value: 1000 },
          { month: "Nov 24", value: 200 },
          { month: "Dec 24", value: 450 },
          { month: "Jan 25", value: 600 },
        ];
        
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm w-full">
            {/* Header with title and time period selector */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Total Payroll Cost</h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === '3M' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setActiveTab('3M')}
                >
                  3M
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === '6M' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setActiveTab('6M')}
                >
                  6M
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${activeTab === '12M' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setActiveTab('12M')}
                >
                  12M
                </button>
              </div>
            </div>
            
            {/* Chart container */}
            <div className="mt-4">
              {/* Y-axis labels */}
              <div className="flex">
                <div className="w-16 flex flex-col justify-between text-sm text-gray-500 h-64">
                  <div>$1000</div>
                  <div>$800</div>
                  <div>$400</div>
                  <div>$200</div>
                  <div>0</div>
                </div>
                
                {/* Chart area */}
                <div className="flex-1 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map((_, i) => (
                      <div key={i} className="border-t border-gray-200 border-dashed w-full h-0" />
                    ))}
                  </div>
                  
                  {/* Chart bars */}
                  <div className="h-64 flex justify-between items-end pt-2 px-2">
                    {chartData.map((item, index) => {
                      // Calculate bar height (make it match the screenshot)
                      const barHeight = (item.value / 1000) * 200;
                      const isHovered = index === hoveredIndex;
                      
                      return (
                        <div 
                          key={index} 
                          className="flex flex-col items-center relative"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {/* Green dot indicator on hover or on the last bar if nothing is hovered */}
                          {(isHovered || (index === chartData.length - 1 && hoveredIndex === null)) && (
                            <div className="absolute -top-2">
                              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm" />
                            </div>
                          )}
                          
                          {/* Bar */}
                          <div 
                            className="w-12 rounded-t-md bg-gradient-to-t from-purple-200 to-purple-600"
                            style={{ height: `${barHeight}px`, minHeight: '10px' }}
                          />
                          
                          {/* Month label */}
                          <div className="mt-2 text-sm text-gray-600">{item.month}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-6 flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-600 mr-2" />
                <span className="text-sm">Monthly Overview</span>
              </div>
            </div>
          </div>
        );
      }

function DonutChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Blue segment (Bonuses) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#4dabf7"
            strokeWidth="20"
            strokeDasharray="167 251"
            strokeDashoffset="0"
          />
          {/* Purple segment (Overtime) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#ae3ec9"
            strokeWidth="20"
            strokeDasharray="42 251"
            strokeDashoffset="-167"
          />
          {/* Green segment (Deduction) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#2b8a3e"
            strokeWidth="20"
            strokeDasharray="42 251"
            strokeDashoffset="-209"
          />
          {/* Inner white circle */}
          <circle cx="50" cy="50" r="30" fill="white" />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-xs">Bonuses</span>
          </div>
          <span className="font-medium">$98.67</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs">Overtime</span>
          </div>
          <span className="font-medium">$32.21</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-xs">Deduction</span>
          </div>
          <span className="font-medium">$128.11</span>
        </div>
      </div>
    </div>
  )
}
