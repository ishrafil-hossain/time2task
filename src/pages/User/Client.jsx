import { useState } from 'react';
import { Search, MoreHorizontal, Eye, Trash } from 'lucide-react';

export default function Client() {
  const [showDropdown, setShowDropdown] = useState(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'John Abraham',
      email: 'mrjohnabra@yahoo.com',
      project: 'Time To Task',
      progress: 25,
      avatar: '🧔🏽'
    },
    {
      id: 2,
      name: 'Nicholas Pooran',
      email: 'info@pooran.com',
      project: 'Time Tracking Application',
      progress: 100,
      avatar: '👨🏽'
    },
    {
      id: 3,
      name: 'Andre Russel',
      email: 'andrerusselworld@gmail.com',
      project: 'Econmart Ecommerce',
      progress: 10,
      avatar: '👩🏽'
    }
  ]);

  const toggleDropdown = (id) => {
    if (showDropdown === id) {
      setShowDropdown(null);
    } else {
      setShowDropdown(id);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-purple-500';
  };

  const deleteClient = (id) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="container mx-auto p-4 bg-white ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Client List</h1>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Quick search"
          />
        </div>
        <button className="p-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700">
          <div className="flex items-center justify-center w-6 h-6">
            <span className="text-xl font-bold">+</span>
          </div>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left text-gray-500 font-normal">Name</th>
              <th className="pb-3 text-left text-gray-500 font-normal">Email</th>
              <th className="pb-3 text-left text-gray-500 font-normal">Current Projects</th>
              <th className="pb-3 text-left text-gray-500 font-normal">Progress</th>
              <th className="pb-3 text-right text-gray-500 font-normal">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg mr-3">
                      {client.avatar}
                    </div>
                    <span className="font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{client.email}</td>
                <td className="py-4">{client.project}</td>
                <td className="py-4">
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(client.progress)}`} 
                      style={{ width: `${client.progress}%` }}
                    ></div>
                  </div>
                </td>
                <td className="py-4 text-right relative">
                  <button 
                    onClick={() => toggleDropdown(client.id)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <MoreHorizontal className="h-6 w-6 text-gray-500" />
                  </button>
                  
                  {showDropdown === client.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border z-10">
                      <div className="p-1">
                        <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 rounded-md">
                          <Eye className="h-5 w-5 text-gray-600" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => deleteClient(client.id)}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-red-50 text-red-500 rounded-md"
                        >
                          <Trash className="h-5 w-5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}