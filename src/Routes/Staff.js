import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddStaffUniversity from "../Staff/University/AddStaffUniversity";
import EditStaffUniversity from "../Staff/University/EditStaffUniversity";
import ListStaffUniversity from "../Staff/University/ListStaffUniversity";
import ViewStaffProfile from "../Staff/Profile/ViewStaffProfile";
import ViewStaffUniversity from "../Staff/University/ViewStaffUniversity";
import ViewStaffApplication from "../Staff/Application/ViewStaffApplication";
import AddStaffApplication from "../Staff/Application/AddStaffApplication";
import EditStaffApplication from "../Staff/Application/EditStaffApplication";
import ListStaffApplication from "../Staff/Application/ListStaffApplication";
import AddStaffProgram from "../Staff/Program/AddStaffProgram";
import EditStaffProgram from "../Staff/Program/EditStaffProgram";
import ListStaffProgram from "../Staff/Program/ListStaffProgram";
import ViewStaffProgram from "../Staff/Program/ViewStaffProgram";
import AddStaffNotifications from "../Staff/Notifications/AddStaffNotifications";
import EditStaffNotification from "../Staff/Notifications/EditStaffNotification";
import ListStaffNotifications from "../Staff/Notifications/ListStaffNotifications";
import ViewStaffNotifications from "../Staff/Notifications/ViewStaffNotifications";
import StaffDashBoard from "../Staff/DashBoard/StaffDashBoard";

export const Staff = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>


        <Route path='/StaffDashboard' element={<StaffDashBoard/>}/>
         <Route path="/AddStaffUniversity" element={<AddStaffUniversity/>}/>
         <Route path="/EditStaffUniversity" element={<EditStaffUniversity/>}/>
        <Route path="/ListStaffUniversity" element={<ListStaffUniversity/>}/>
        <Route path="/ViewStaffUniversity" element={<ViewStaffUniversity/>}/>

        <Route path="/ViewStaffProfile" element={<ViewStaffProfile/>}/>


         
        <Route path="/AddStaffApplication" element={<AddStaffApplication/>}/>
         <Route path="/EditStaffApplication" element={<EditStaffApplication/>}/>
        <Route path="/ListStaffApplication" element={<ListStaffApplication/>}/>
        <Route path="/ViewStaffApplication" element={<ViewStaffApplication/>}/>

        <Route path="/AddStaffProgram" element={<AddStaffProgram/>}/>
         <Route path="/EditStaffProgram" element={<EditStaffProgram/>}/>
        <Route path="/ListStaffProgram" element={<ListStaffProgram/>}/>
        <Route path="/ViewStaffProgram" element={<ViewStaffProgram/>}/>

        <Route path="/AddStaffNotifications" element={<AddStaffNotifications/>}/>
         <Route path="/EditStaffNotifications" element={<EditStaffNotification/>}/>
        <Route path="/ListStaffNotifications" element={<ListStaffNotifications/>}/>
        <Route path="/ViewStaffNotifications" element={<ViewStaffNotifications/>}/>
      
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Staff