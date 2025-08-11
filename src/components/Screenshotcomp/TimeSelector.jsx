import { Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TimeSelector() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Select defaultValue="11:00-12:00">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11:00-12:00">11:00 am - 12:00 pm</SelectItem>
            <SelectItem value="12:00-13:00">12:00 pm - 1:00 pm</SelectItem>
            <SelectItem value="13:00-14:00">1:00 pm - 2:00 pm</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-4 w-4" /> 1hr slot
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium">Total Time: 12:27:04 Hours</span>
      </div>
    </div>
  )
}
