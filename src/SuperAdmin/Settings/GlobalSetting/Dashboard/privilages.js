// SuperAdmin.js
import React from 'react';
import DynamicChart from './DynamicChart';  // Adjust path if necessary
import Sidebar from '../../../../compoents/sidebar';

const SuperAdmin = () => {
  const userPrivileges = {
    canViewBarChart: true,
    canViewLineChart: false,
    canViewPieChart: true,
  };

  return (
    <div>
    
      <Sidebar/>
      <div className='content-wrapper'>
      <h1>Super Admin Dashboard</h1>
      {userPrivileges.canViewBarChart && <DynamicChart chartType="bar" />}
      {userPrivileges.canViewLineChart && <DynamicChart chartType="line" />}
      {userPrivileges.canViewPieChart && <DynamicChart chartType="pie" />}
      </div>
     
    </div>
  );
};

export default SuperAdmin;
