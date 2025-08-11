import React from "react";
import { MoreHorizontal, Eye, Trash2, PowerOff, Edit } from "lucide-react";
import Nodata from "../../Common/No-data";
import Pagination from "../../Common/Pagination";

// Simple implementations for UI components
const Avatar = ({ children, className = "" }) => (
  <div
    className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full ${className}`}
  >
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img className="w-10 h-10 rounded-full object-cover" src={src} alt={alt} />
);

const AvatarFallback = ({ children }) => (
  <span className="font-medium text-gray-600 text-sm">{children}</span>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-violet-600 text-white hover:bg-violet-700",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 py-1 px-3 text-sm",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const PopoverTrigger = ({ children, isOpen, setIsOpen }) => (
  <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
);

const PopoverContent = ({
  children,
  className = "",
  align = "start",
  isOpen,
  setIsOpen,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      <div
        className={`absolute right-0 z-50 mt-1 bg-white rounded-md shadow-lg border ${className}`}
      >
        {children}
      </div>
    </>
  );
};

const EmployeeListTable = ({
  members,
  setSearchQuery,
  setCurrentPage,
  setPageSize,
  currentPage,
  pageSize,
  setEditmemberId,
  setIsOpen
}) => {
  const employees = members?.data || [];
  const metadata = members?.metadata || {};
  const totalPages = metadata?.total_pages ? parseInt(metadata.total_pages) : 0;
  const totalRecords = metadata?.total_records
    ? parseInt(metadata.total_records)
    : 0;
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-600";
      case "inactive":
        return "bg-gray-100 text-gray-600";
      case "invited":
        return "bg-violet-100 text-violet-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getOnlineStatus = (isTracking) => {
    return isTracking ? "online" : "offline";
  };

  const formatPayRate = (payRate, billRate, currency = "USD") => {
    const pay = parseFloat(payRate);
    const bill = parseFloat(billRate);

    if (pay > 0 || bill > 0) {
      const rate = pay > 0 ? pay : bill;
      return {
        hasRate: true,
        rate: `${currency === "USD" ? "$" : currency + " "}${rate}`,
        currency,
      };
    }
    return { hasRate: false };
  };

  const handleEditMember = (id) => {
    console.log(id)
    setEditmemberId(id);
    setIsOpen(true)
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 font-medium text-gray-500">Name</th>
              <th className="text-left py-4 font-medium text-gray-500">
                User Role
              </th>
              <th className="text-left py-4 font-medium text-gray-500">
                Company
              </th>
              <th className="text-left py-4 font-medium text-gray-500">
                Projects
              </th>
              <th className="text-left py-4 font-medium text-gray-500">
                Payment Rate
              </th>
              <th className="text-left py-4 font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-4 font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              const paymentInfo = formatPayRate(
                employee.pay_rate_hourly,
                employee.bill_rate_hourly,
                employee.currency
              );
              const onlineStatus = getOnlineStatus(employee.is_tracking);

              return (
                <tr key={employee.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={employee.image}
                            alt={employee.name}
                          />
                          <AvatarFallback>
                            {employee.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                            onlineStatus === "online"
                              ? "bg-green-500"
                              : onlineStatus === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                        ></span>
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <div className="font-medium">{employee.role?.name}</div>
                      {employee.is_owner === 1 && (
                        <div className="text-xs text-violet-600">Owner</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm">
                      {employee.company?.name}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {employee.project_assign?.length > 0 ? (
                        <>
                          <span className="text-sm">Assigned Projects</span>
                          <span className="bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {employee.project_assign.length}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No projects assigned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      {paymentInfo.hasRate ? (
                        <div>
                          <div className="font-medium">
                            {paymentInfo.rate}/hour
                          </div>
                          <div className="text-violet-600 text-sm cursor-pointer hover:underline">
                            Set Rate
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-500">
                            No pay/bill rate set
                          </div>
                          <div className="text-violet-600 text-sm cursor-pointer hover:underline">
                            Set Rate
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-4 py-2 rounded-md text-sm font-medium ${getStatusColor(
                        employee.status
                      )}`}
                    >
                      {employee.status?.charAt(0).toUpperCase() +
                        employee.status?.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-0" align="end">
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start gap-2 px-4 py-2 h-auto hover:bg-gray-50"
                            onClick={() => handleEditMember(employee)}
                          >
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start gap-2 px-4 py-2 h-auto text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </Button>
                          {/* <Button
                            variant="ghost"
                            className="flex items-center justify-start gap-2 px-4 py-2 h-auto text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <PowerOff className="h-4 w-4" />
                            <span>
                              {employee.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </span>
                          </Button> */}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Nodata />
          </div>
        )}
      </div>

      {/* Updated Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default EmployeeListTable;
