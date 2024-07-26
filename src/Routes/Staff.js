import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListStaffUniversity from "../Staff/University/ListStaffUniversity";
import ViewStaffProfile from "../Staff/Profile/ViewStaffProfile";

import ViewStaffUniversity from "../Staff/University/ViewStaffUniversity";
import ViewStaffApplication from "../Staff/Application/ViewStaffApplication";
import AddStaffApplication from "../Staff/Application/AddStaffApplication";
import EditStaffApplication from "../Staff/Application/EditStaffApplication";
import ListStaffApplication from "../Staff/Application/ListStaffApplication";

import ListStaffProgram from "../Staff/Program/ListStaffProgram";
import ViewStaffProgram from "../Staff/Program/ViewStaffProgram";

import ListStaffNotifications from "../Staff/Notifications/ListStaffNotifications";
import ViewStaffNotifications from "../Staff/Notifications/ViewStaffNotifications";
import StaffDashBoard from "../Staff/DashBoard/StaffDashBoard";

export const Staff = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/StaffDashboard' element={<StaffDashBoard/>}/>
        <Route path="/ListStaffUniversity" element={<ListStaffUniversity/>}/>
        <Route path="/ViewStaffUniversity" element={<ViewStaffUniversity/>}/>
        <Route path="/ViewProfile" element={<ViewStaffProfile/>}/>   
        <Route path="/AddStaffApplication" element={<AddStaffApplication/>}/>
        <Route path="/EditStaffApplication" element={<EditStaffApplication/>}/>
        <Route path="/ListStaffApplication" element={<ListStaffApplication/>}/>
        <Route path="/ViewStaffApplication" element={<ViewStaffApplication/>}/>
        <Route path="/ListStaffProgram" element={<ListStaffProgram/>}/>
        <Route path="/ViewStaffProgram" element={<ViewStaffProgram/>}/>
        <Route path="/ListStaffNotifications" element={<ListStaffNotifications/>}/>
        <Route path="/ViewStaffNotifications" element={<ViewStaffNotifications/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Staff