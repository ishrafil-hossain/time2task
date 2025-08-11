import React from 'react';
import WeeklyDatePicker from '../Common/WeeklyDatePicker';
import CommonSearch from '../Common/filter/Search';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const WeeklyTimeSheetFilter = ({selectedValue , setSelectedValue , users, setSelectedDate}) => {
    return (
        <div className=' flex flex-col lg:flex-row justify-start items-center gap-4'>
            <WeeklyDatePicker setSelectedDate={setSelectedDate} />
            <div className=" w-[180px]">
            <CommonSearch
              selectItem="name"
              selectValue="id"
              data={users?.data}
              placeholderValue="Member"
              iconName={faUser}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
          </div>
        </div>
    );
};

export default WeeklyTimeSheetFilter;