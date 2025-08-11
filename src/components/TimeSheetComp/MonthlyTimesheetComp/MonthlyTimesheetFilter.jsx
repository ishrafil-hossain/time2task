import React from 'react';
import CommonSearch from '../../Common/filter/Search';
import MonthyCalander from '../../Common/MonthyCalander';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const MonthlyTimesheetFilter = ({selectedValue, setSelectedValue , users, setMonth }) => {
    return ( 
        <div className='flex flex-row justify-start items-center gap-4 '>
            <div className=' mt-2'>
            <MonthyCalander setMonth={setMonth} />
            </div>

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
    );
};

export default MonthlyTimesheetFilter;