import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
import ListStaffUniversity from "../Staff/University/ListStaffUniversity";
import ViewStaffProfile from "../Staff/Profile/ViewStaffProfile";

import ViewStaffUniversity from "../Staff/University/ViewStaffUniversity";
import ViewStaffApplication from "../Staff/Application/ViewStaffApplication";
import AddStaffApplication from "../Staff/Application/AddStaffApplication";
import EditStaffApplication from "../Staff/Application/EditStaffApplication";
import ListStaffApplication from "../Staff/Application/ListStaffApplication";

import ListStaffProgram from "../Staff/Program/ListStaffProgram";
import ViewStaffProgram from "../Staff/Program/ViewStaffProgram";
import ChatList from "../Staff/Chat/ListChat"

import ListStaffNotifications from "../Staff/Notifications/ListStaffNotifications";
import ViewStaffNotifications from "../Staff/Notifications/ViewStaffNotifications";
import StaffDashBoard from "../Staff/DashBoard/StaffDashBoard";

export const Staff = () => {
  return (
    <div>
     
        <Routes>
        <Route path='/StaffDashboard' element={<PrivateRoute><StaffDashBoard/></PrivateRoute>}/>
        <Route path="/ListStaffUniversity" element={<PrivateRoute><ListStaffUniversity/></PrivateRoute>}/>
        <Route path="/ViewStaffUniversity" element={<PrivateRoute><ViewStaffUniversity/></PrivateRoute>}/>
        <Route path="/ViewProfile" element={<PrivateRoute><ViewStaffProfile/></PrivateRoute>}/>   
        <Route path="/AddStaffApplication" element={<PrivateRoute><AddStaffApplication/></PrivateRoute>}/>
        <Route path="/EditStaffApplication" element={<PrivateRoute><EditStaffApplication/></PrivateRoute>}/>
        <Route path="/ListStaffApplication" element={<PrivateRoute><ListStaffApplication/></PrivateRoute>}/>
        <Route path="/ViewStaffApplication" element={<PrivateRoute><ViewStaffApplication/></PrivateRoute>}/>
        <Route path="/ListStaffProgram" element={<PrivateRoute><ListStaffProgram/></PrivateRoute>}/>
        <Route path="/ViewStaffProgram" element={<PrivateRoute><ViewStaffProgram/></PrivateRoute>}/>
        <Route path="/ListStaffNotifications" element={<PrivateRoute><ListStaffNotifications/></PrivateRoute>}/>
        <Route path="/ViewStaffNotifications" element={<PrivateRoute><ViewStaffNotifications/></PrivateRoute>}/> 
        <Route path="/chat" element={<PrivateRoute><ChatList/></PrivateRoute>}/>
        </Routes>
     
    </div>
  );
};
export default Staff