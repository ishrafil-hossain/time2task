import React from "react";
import CommonSearch from "../Common/filter/Search";
import {
  faMagnifyingGlass,
  faProjectDiagram,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskFIlter = ({
  projectData,
  setSearchTask,
  setSelectedTodo,
  setSelectedUser,
  selectedUser,
  selectedTodo,
  selectedProject,
  setSelectedProject,
  todoList,
  members,
}) => {
  return (
    <div className=" flex flex-col lg:flex-row justify-start gap-3 ">
      <div className="relative">
        <input
          type="text"
          className="pl-10 pr-4 py-2 border border-primary_color rounded-md w-full "
          placeholder="Search task"
          onChange={(e) => setSearchTask(e.target.value)}
        />
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 mt-0.5">
          <FontAwesomeIcon
            className="h-4 w-4 text-white bg-primary_color p-1 rounded-md"
            icon={faMagnifyingGlass}
          />
        </div>
      </div>

      <div className=" w-[180px]">
        <CommonSearch
          selectItem="name"
          selectValue="value"
          data={todoList}
          placeholderValue="Todo"
          iconName={faTasks}
          selectedValue={selectedTodo}
          setSelectedValue={setSelectedTodo}
        />
      </div>
      <div className=" w-[180px]">
        <CommonSearch
          selectItem="name"
          selectValue="id"
          data={projectData?.data}
          placeholderValue="Projects"
          iconName={faProjectDiagram}
          selectedValue={selectedProject}
          setSelectedValue={setSelectedProject}
        />
      </div>
      <div className=" w-[180px]">
        <CommonSearch
          selectItem="name"
          selectValue="id"
          data={members?.data}
          placeholderValue="Member"
          iconName={faUser}
          selectedValue={selectedUser}
          setSelectedValue={setSelectedUser}
        />
      </div>
    </div>
  );
};

export default TaskFIlter;
