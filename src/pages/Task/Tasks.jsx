import React, { useEffect, useState } from "react";
import TaskTable from "../../components/TaskComp/TaskTable";
import { useGetProfileQuery } from "../../redux/features/OrgProfile/OrgProfile";
import { useGetAllTaskQuery } from "../../redux/Task/taskapi";
import { useGetProjectsByMemberQuery } from "../../redux/features/project/projectApi";
import TaskFIlter from "../../components/TaskComp/TaskFIlter";
import { Header } from "../../components/TaskComp/components/Header";
import { useGetSearchMembersQuery } from "../../redux/features/member/memberApi";

const Tasks = () => {
  const { data: profile } = useGetProfileQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTask, setSearchTask] = useState("");
  const [selectedTodo, setSelectedTodo] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const todoList = [
    { name: "Todo", value: "pending" },
    { name: "Complete", value: "completed" },
    { name: "In Progress", value: "in_progress" },
  ];
  const {
    data: Alltasks,
    isLoading,
    refetch,
  } = useGetAllTaskQuery({
    page: currentPage,
    limit: pageSize,
    query: searchTask,
    user_id: selectedUser,
    project_id: selectedProject,
    status: selectedTodo,
  });
  const { data: projectData } = useGetProjectsByMemberQuery({
    page: 1,
    limit: 1000,
    status: "",
    user_id: 0,
  });

  const { data: users } = useGetSearchMembersQuery({
    page: 1,
    limit: 1000,
    project_id: selectedProject,
  });



  useEffect(() => {
    if (profile?.id) {
      setSelectedUser(profile.id);
    } else {
      setSelectedUser("");
    }
  }, [profile]);

  const handleTaskUpdate = (taskId, updates, action = 'update') => {
    if (action === 'update') {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
    } else if (action === 'add') {
      setTasks(prevTasks => [...prevTasks, updates]);
    }
    // Refetch to ensure data consistency
    refetch();
  };

  useEffect(() => {
    if (Alltasks) {
      setTasks(Alltasks.data?.rows || []);
    }
  }, [Alltasks]);

  const taskData = tasks || [];
  const { total_pages, total_records } = Alltasks?.data?.meta || {};

  return (
    <div className="container mx-auto p-4 bg-white ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task</h1>

        <div className=" flex flex-col gap-5 ">

          <TaskTable
            setSearchTask={setSearchTask}
            setSelectedTodo={setSelectedTodo}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
            selectedTodo={selectedTodo}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            projectData={projectData}
            todoList={todoList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={total_pages}
            totalRecords={total_records}
            pageSize={pageSize}
            setPageSize={setPageSize}
            tasks={taskData}
            members={users}
            onTaskUpdate={handleTaskUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
