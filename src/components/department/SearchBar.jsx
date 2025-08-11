import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-[180px]">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder="Quick search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 py-4 border-gray-200 rounded-xl bg-white hover:bg-gray-50 focus:bg-white transition-colors shadow-sm hover:shadow-md focus:shadow-md"
      />
    </div>
  )
} 