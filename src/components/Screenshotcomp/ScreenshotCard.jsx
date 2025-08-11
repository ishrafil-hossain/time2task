
export function ScreenshotCard({ screenshot }) {
  return (
    <div className="flex flex-col border rounded-md overflow-hidden bg-white">
      <div className="p-2">
        <img
          src="/placeholder.svg?height=200&width=300"
          alt="Screenshot"
          width={300}
          height={200}
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="p-2 text-center">
        <h3 className="text-sm font-medium text-purple-900">{screenshot.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{screenshot.time}</p>
      </div>
    </div>
  )
}
