import { Progress } from "@/components/ui/progress"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-gray-700 font-medium mb-4">Total Worked Time</h3>
        <div className="bg-green-500 text-white rounded-full px-4 py-2 w-fit">
          <span className="text-lg font-semibold">12:27:04</span>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-gray-700 font-medium mb-4">Total Idle Time</h3>
        <div className="bg-orange-400 text-white rounded-full px-4 py-2 w-fit">
          <span className="text-lg font-semibold">1:32:06</span>
        </div>
      </div>

      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-gray-700 font-medium mb-4">Average Activity</h3>
        <div className="flex items-center gap-4">
          <Progress value={78} className="h-2 flex-1 bg-gray-200"  />
          <div className="bg-purple-500 text-white rounded-full px-4 py-2">
            <span className="text-lg font-semibold">78%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
