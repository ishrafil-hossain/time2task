"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, UserSearch } from "lucide-react"
import UrlsTable from "./urls-table"
import AppsTable from "./apps-table"


export default function UsageTracker() {
  const [activeTab, setActiveTab] = useState("apps")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Usage Apps & URLs</h1>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex rounded-md overflow-hidden">
            <button
              onClick={() => handleTabChange("apps")}
              className={`px-8 py-3 text-base font-medium transition-colors ${
                activeTab === "apps" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Apps
            </button>
            <button
              onClick={() => handleTabChange("urls")}
              className={`px-8 py-3 text-base font-medium transition-colors ${
                activeTab === "urls" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              URLs
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input placeholder="Search projects" className="pl-10 w-full md:w-[250px] border-gray-200" />
            </div>

            <div className="flex items-center whitespace-nowrap">
              <div className="border rounded-full p-2 border-dashed border-purple-300">
                <UserSearch className="text-purple-500" size={20} />
              </div>
              <span className="text-gray-500 ml-2">Search member</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          {activeTab === "apps" ? <AppsTable data={usageData.apps} /> : <UrlsTable data={usageData.urls} />}
        </div>
      </div>
    </div>
  )
}
