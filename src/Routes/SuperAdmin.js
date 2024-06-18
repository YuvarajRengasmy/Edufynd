import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddUniversity from "../SuperAdmin/University/addUniversity";
import ListUniversity from "../SuperAdmin/University/ListUniversity"
import ViewUniversity from "../SuperAdmin/University/viewUniversity";
import EditUniversity from "../SuperAdmin/University/editUniversity";
import ViewProgram from "../SuperAdmin/Program/ViewProgram";
import ListStudent from "../SuperAdmin/Students/listStudent";
import AddStudent from "../SuperAdmin/Students/addStudent";
import ViewStudent from "../SuperAdmin/Students/viewStudent"
import Editstudent from "../SuperAdmin/Students/editStudent";
import AddAgent from "../SuperAdmin/Agnent/addAgent";
import ListAgent from "../SuperAdmin/Agnent/ListAgent";
import Program from "../SuperAdmin/Program/Programs";
import ViewAgent from "../SuperAdmin/Agnent/viewAgent";
import EditAgent from "../SuperAdmin/Agnent/editAgent";
import AdminList from "../SuperAdmin/Admins/AdminList";
import AddAdmin from "../SuperAdmin/Admins/AdminAdd";
import EditAdmin from "../SuperAdmin/Admins/EditAdmin";
import ViewAdmin from "../SuperAdmin/Admins/ViewAdmin";
import CountryList from "../SuperAdmin/Admins/country";
import AddProgram from "../SuperAdmin/Program/addProgram";
import EditProgram from "../SuperAdmin/Program/editProgram";
import DashboardSA from "../SuperAdmin/DashBoard/Home";
// Client
import AddClient from "../SuperAdmin/client/addclient";
import ListClient from "../SuperAdmin/client/ListClient";
// import ViewClient from "../SuperAdmin/client/viewClient";
import EditClient from "../SuperAdmin/client/Edit";
import GlobalSettings from "../SuperAdmin/Settings/GlobalSettings";
import Status from "../SuperAdmin/Settings/Status"
import Intake from "../SuperAdmin/Settings/intake"
import ListApplication from "../SuperAdmin/Application/ListApplication";



import Application from "../SuperAdmin/Application/Application";
import ViewUniversity1 from "../SuperAdmin/University/viewUniversity1";
import ApplyJob from "../Students/Program/ApplyProgram";
function SuperAdmin() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        
          <Route path="/AddUniversity" element={<AddUniversity />} />
          <Route path="/ListUniversity" element={<ListUniversity />} />
          <Route path="/ViewUniversity" element={<ViewUniversity />} />
          <Route path="/EditUniversity" element={<EditUniversity />} />
          <Route path="/ViewProgram" element={<ViewProgram />} />
          <Route path="/ListStudent" element={<ListStudent />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/ViewStudent" element={<ViewStudent />} />
          <Route path="/EditStudent" element={<Editstudent />} />
          <Route path="/AddAgent" element={<AddAgent />} />
          <Route path="/ListAgent" element={<ListAgent />} />
          <Route path="/Programs" element={<Program />} />
          <Route path="/ViewAgent" element={<ViewAgent />} />
          <Route path="/EditAgent" element={<EditAgent />} />
          <Route path="/AdminList" element={<AdminList />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/EditAdmin" element={<EditAdmin />} />
          <Route path="/ViewAdmin" element={<ViewAdmin />} />
          <Route path="/CountryList" element={<CountryList />} />
          <Route path="/AddProgram" element={<AddProgram />} />
          <Route path="/EditProgram" element={<EditProgram />} />
          <Route path="/DashBoard" element={<DashboardSA />} />
          {/* Client */}
          <Route path="/AddClient" element={<AddClient />} />
          <Route path="/client" element={<ListClient />} />
          <Route path="/EditClient" element={<EditClient />} />
          <Route path="/GlobalSettings" element={<GlobalSettings/>}/>
          <Route path="/Status" element={<Status/>}/>
          <Route path="/Intake" element={<Intake/>}/>
          <Route path='/ListApplication' element={<ListApplication/>}/>
          <Route path='/Application' element={<Application/>}/>
       <Route path="/ViewUniversityPage" element={<ViewUniversity1/>}/>
       <Route path="/ApplyJob" element={<ApplyJob/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default SuperAdmin;
