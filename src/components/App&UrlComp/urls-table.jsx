import { ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import Nodata from "../Common/No-data";

export default function UrlsTable({ data }) {
  if (!data?.length) {
    return (
      <Nodata />
    );
  }
  return (
    <div className="border rounded-md overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-6 font-normal text-gray-500 w-1/4">URL Name</th>
            <th className="text-left py-4 px-6 font-normal text-gray-500 w-1/4">Project Name</th>
            <th className="text-left py-4 px-6 font-normal text-gray-500 w-1/4">Assignee</th>
            <th className="text-right py-4 px-6 font-normal text-gray-500 w-1/4">Time Spent</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.url.includes('figma') ? (
                      <div className="w-5 h-5 rounded-full bg-red-500"></div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                        W3
                      </div>
                    )}
                  </div>
                  <Link
                    to={`https://${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-[200px] sm:max-w-[180px] md:max-w-[400px]"
                    title={item.url}
                  >
                    {item.url}
                  </Link>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center">
                  <span>{item.project.name}</span>
                  <div className="flex ml-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mx-0.5"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 mx-0.5"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 mx-0.5"></div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-white w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {item.user.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </td>
              <td className="py-4 px-6 text-right">{item.format_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}