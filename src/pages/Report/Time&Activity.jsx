import { useState } from 'react';
import { Search, User, Share2, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DatePickerWithRange } from '../../components/Common/Multi-DatePicker';

export default function TimeActivity() {
  const chartData = [
    { date: 'Jan 06', value: 12 },
    { date: 'Jan 07', value: 30 },
    { date: 'Jan 08', value: 95 },
    { date: 'Jan 09', value: 25 },
    { date: 'Jan 10', value: 75 },
    { date: 'Jan 11', value: 35 },
    { date: 'Jan 12', value: 18 },
  ];

  const day12Data = [
    {
      id: 1,
      employee: 'Taufiq Barahat',
      avatar: '👨🏻',
      projects: ['Time To Task', 'Time Tracking Application'],
      activity: 89,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$76.2'
    },
    {
      id: 2,
      employee: 'Sabariya Muzumder',
      avatar: '👩🏻',
      projects: ['Time To Task'],
      activity: 88,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$60.96'
    },
    {
      id: 3,
      employee: 'Ishrafil Hossan',
      avatar: '👨🏽',
      projects: ['Time Tracking Application'],
      activity: 92,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$60.96'
    },
    {
      id: 4,
      employee: 'Sofiqul Islam',
      avatar: '👨🏿',
      projects: ['Time Tracking Application'],
      activity: 88,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$76.2'
    }
  ];

  const day11Data = [
    {
      id: 1,
      employee: 'Taufiq Barahat',
      avatar: '👨🏻',
      projects: ['Time To Task', 'Time Tracking Application'],
      activity: 90,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$76.2'
    },
    {
      id: 2,
      employee: 'Sabariya Muzumder',
      avatar: '👩🏻',
      projects: ['Time To Task'],
      activity: 90,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$60.96'
    },
    {
      id: 3,
      employee: 'Ishrafil Hossan',
      avatar: '👨🏽',
      projects: ['Time Tracking Application'],
      activity: 90,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$60.96'
    },
    {
      id: 4,
      employee: 'Sofiqul Islam',
      avatar: '👨🏿',
      projects: ['Time Tracking Application'],
      activity: 90,
      spentTime: '7:42:00',
      breakTime: '0:10:00',
      totalTime: '7:52:00',
      totalSpent: '$76.2'
    }
  ];

  return (
    <div className=" container mx-auto p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-gray-800">Time & Activity Reports</h1>
        
        <DatePickerWithRange/>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            placeholder="Search projects"
          />
        </div>
        
        <div className="relative w-64">
          <div className="border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Select member</span>
            </div>
            <span className="text-gray-400">▼</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <LineChart className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total Worked Time</span>
          </div>
          <div className="text-xl font-semibold">190:46:27</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              <LineChart className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-sm text-gray-500">Total Idle Time</span>
          </div>
          <div className="text-xl font-semibold">0:46:21</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
              <LineChart className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Average Activity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-purple-100 rounded-full h-2">
              <div className="h-2 rounded-full bg-purple-500" style={{ width: '94%' }}></div>
            </div>
            <span className="text-sm font-medium bg-purple-500 text-white px-2 py-0.5 rounded-full">94%</span>
          </div>
        </div>
        
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
              <LineChart className="h-4 w-4 text-pink-600" />
            </div>
            <span className="text-sm text-gray-500">Spent Amount</span>
          </div>
          <div className="inline-block bg-pink-500 text-white px-3 py-0.5 rounded-full font-medium">$96.21</div>
        </div>
      </div>
      
      <div className="mb-8 h-64 bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#888' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#888' }}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#D946EF" 
              strokeWidth={2}
              dot={{ stroke: '#D946EF', strokeWidth: 2, r: 4, fill: 'white' }}
              activeDot={{ r: 6, stroke: '#D946EF', strokeWidth: 2, fill: 'white' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
      
      {/* January 12 Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">Jan 12 2025</h2>
          <Share2 className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto bg-purple-50 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm bg-purple-50">
                <th className="p-4 pb-2 text-left font-normal">Employee</th>
                <th className="p-4 pb-2 text-left font-normal">Project</th>
                <th className="p-4 pb-2 text-left font-normal">Activity</th>
                <th className="p-4 pb-2 text-left font-normal">Spent Time</th>
                <th className="p-4 pb-2 text-left font-normal">Break Time</th>
                <th className="p-4 pb-2 text-left font-normal">Total Time</th>
                <th className="p-4 pb-2 text-left font-normal">Total Spent ($)</th>
              </tr>
            </thead>
            <tbody className="bg-purple-50">
              {day12Data.map((item) => (
                <tr key={item.id} className="border-t border-purple-100">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg mr-2">
                        {item.avatar}
                      </div>
                      <span className="text-sm">{item.employee}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {item.projects.map((project, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs px-2 py-1 rounded ${
                            project === 'Time To Task' 
                              ? 'bg-purple-200 text-purple-700' 
                              : 'bg-pink-200 text-pink-700'
                          }`}
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-1 bg-purple-200 rounded-full">
                        <div className="h-1 rounded-full bg-purple-500" style={{ width: `${item.activity}%` }}></div>
                      </div>
                      <span className="text-xs font-medium bg-purple-500 text-white px-2 py-0.5 rounded-full">{item.activity}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{item.spentTime}</td>
                  <td className="p-4 text-sm">{item.breakTime}</td>
                  <td className="p-4 text-sm">{item.totalTime}</td>
                  <td className="p-4 text-sm">{item.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* January 11 Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">Jan 11 2025</h2>
          <Share2 className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto bg-green-50 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm bg-green-50">
                <th className="p-4 pb-2 text-left font-normal">Employee</th>
                <th className="p-4 pb-2 text-left font-normal">Project</th>
                <th className="p-4 pb-2 text-left font-normal">Activity</th>
                <th className="p-4 pb-2 text-left font-normal">Spent Time</th>
                <th className="p-4 pb-2 text-left font-normal">Break Time</th>
                <th className="p-4 pb-2 text-left font-normal">Total Time</th>
                <th className="p-4 pb-2 text-left font-normal">Total Spent ($)</th>
              </tr>
            </thead>
            <tbody className="bg-green-50">
              {day11Data.map((item) => (
                <tr key={item.id} className="border-t border-green-100">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg mr-2">
                        {item.avatar}
                      </div>
                      <span className="text-sm">{item.employee}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {item.projects.map((project, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs px-2 py-1 rounded ${
                            project === 'Time To Task' 
                              ? 'bg-green-200 text-green-700' 
                              : 'bg-green-200 text-green-700'
                          }`}
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-1 bg-green-200 rounded-full">
                        <div className="h-1 rounded-full bg-green-500" style={{ width: `${item.activity}%` }}></div>
                      </div>
                      <span className="text-xs font-medium bg-green-500 text-white px-2 py-0.5 rounded-full">{item.activity}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{item.spentTime}</td>
                  <td className="p-4 text-sm">{item.breakTime}</td>
                  <td className="p-4 text-sm">{item.totalTime}</td>
                  <td className="p-4 text-sm">{item.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}