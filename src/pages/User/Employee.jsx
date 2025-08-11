import { useState } from "react";
import EmployeeListFilterComp from "../../components/Users/Employee/EmployeeListFilterComp";
import EmployeeListTable from "../../components/Users/Employee/EmployeeListTable";
import { useGetAllMembersQuery } from "../../redux/Member/membersApi";

export default function Employee() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [buttonTab, setButtonTab] = useState("buttonTab");
  const [editMemberId, setEditmemberId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: members,
    isLoading,
    refetch,
  } = useGetAllMembersQuery({
    page: currentPage,
    limit: pageSize,
    query: searchQuery,
  });


  return (
    <div className="container mx-auto py-6 px-2">
      <h1 className="text-2xl font-bold mb-6">Employee List</h1>

      <EmployeeListFilterComp
        setSearchQuery={setSearchQuery}
        setEditmemberId={setEditmemberId}
        editMemberId={editMemberId}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      <EmployeeListTable
        members={members}
        setEditmemberId={setEditmemberId}
        editMemberId={editMemberId}
        setIsOpen={setIsOpen}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
}
