import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/dashboard";
import AddUniversity from "../SuperAdmin/University/addUniversity";
import ListUniversity from "../SuperAdmin/University/ListUniversity"
import ViewUniversity from "../SuperAdmin/University/viewUniversity";
import EditUniversity from "../SuperAdmin/University/editUniversity";
import ViewProgram from "../SuperAdmin/University/ProgramDetails";
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
function SuperAdmin() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default SuperAdmin;
