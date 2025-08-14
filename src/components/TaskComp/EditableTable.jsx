import { useState } from "react";
import EditableCell from "./EditableCell";

const EditableTable = () => {
  const [data, setData] = useState([
    {
      name: "John Doe",
      role: "Developer",
      project: "Project A",
      dueDate: "2024-08-12",
      joinDate: "2024-08-12",
      spentTime: "09:00",
      impact: "Low",
    },
    {
      name: "Jane Smith",
      role: "Designer",
      project: "Project B",
      dueDate: "2024-09-01",
      joinDate: "2024-09-01",
      spentTime: "10:00",
      impact: "High",
    },
  ]);

  const updateCell = (rowIndex, key, newValue) => {
    const updated = [...data];
    updated[rowIndex][key] = newValue;
    setData(updated);
  };

  return (
    <div className="bg-white border-t overflow-x-auto">
      <table className="table-fixed w-full border-collapse">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
          <tr>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Name</th>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Assignee</th>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Project</th>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Due Date & Time</th>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Spent Time</th>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Impact</th>
            <th className="pl-6 py-2 text-sm text-left text-[#7C7C7C]">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* name  */}
              <EditableCell
                value={row.name}
                onSave={(val) => updateCell(rowIndex, "name", val)}
                type="text"
              />
              {/* assignee  */}
              <EditableCell
                value={row.role}
                onSave={(val) => updateCell(rowIndex, "role", val)}
                type="select"
                options={["Developer", "Designer", "Manager"]}
              />
              {/* project  */}
              <EditableCell
                value={row.project}
                onSave={(val) => updateCell(rowIndex, "project", val)}
                type="select"
                options={["Project A", "Project B", "Project C"]}
              />
              {/* due date & time  */}
              <EditableCell
                value={row.dueDate}
                onSave={(val) => updateCell(rowIndex, "dueDate", val)}
                type="date"
              />
              {/* spent time  */}
              <EditableCell
                value={row.spentTime}
                onSave={(val) => updateCell(rowIndex, "spentTime", val)}
                type="time"
              />
              {/* impact  */}
              <EditableCell
                value={row.impact}
                onSave={(val) => updateCell(rowIndex, "impact", val)}
                type="select"
                options={["Low", "Medium", "High"]}
              />
              <td className="border-b border-[#F0F0F0]">
                <button
                  onClick={() => updateCell(rowIndex, "delete", true)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditableTable;
