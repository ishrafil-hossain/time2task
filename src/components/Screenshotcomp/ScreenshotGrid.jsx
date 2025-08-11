import { ScreenshotCard } from "@/components/ScreenshotCard"

export function ScreenshotGrid({ screenshots }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {screenshots.map((screenshot) => (
        <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
      ))}
    </div>
  )
}
