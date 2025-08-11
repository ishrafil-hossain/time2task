"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabSelector({ activeTab, setActiveTab }) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
      <TabsList>
        <TabsTrigger value="every10" className="px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
          Every 10 Minutes
        </TabsTrigger>
        <TabsTrigger value="all" className="px-4 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
          All Screenshots
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
