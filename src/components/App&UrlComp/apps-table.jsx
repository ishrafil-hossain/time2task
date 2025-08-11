import Nodata from "../Common/No-data";

export default function AppsTable({ data }) {
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
            <th className="text-left py-4 px-6 font-normal text-gray-500">Project Name</th>
            <th className="text-left py-4 px-6 font-normal text-gray-500">App Name</th>
            <th className="text-right py-4 px-6 font-normal text-gray-500">Time Spent</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((app) => (
            <tr key={app.id} className="border-b">
              <td className="py-4 px-6">
                {app.project?.name || 'No project'}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {app.app_name === "figma" ? (
                      <div className="w-5 h-5 rounded-full bg-red-500"></div>
                    ) : (
                      <div className="w-5 h-5 text-blue-500">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 0h24v24H0z" fill="#2C2C32" />
                          <path d="M23 9.31v5.38L16.5 12 23 9.31z" fill="#007ACC" />
                          <path d="M23 9.31L16.5 12 9 3.69 11.5 3l11.5 6.31z" fill="#007ACC" />
                          <path d="M23 14.69L11.5 21 9 20.31 16.5 12l6.5 2.69z" fill="#007ACC" />
                          <path d="M9 3.69v16.62L1 12 9 3.69z" fill="#007ACC" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span>{app.app_name}</span>
                </div>
              </td>
              <td className="py-4 px-6 text-right">{app.format_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}