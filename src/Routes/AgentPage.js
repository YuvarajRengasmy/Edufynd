import React from "react";
import {  Routes, Route } from "react-router-dom";
import AgentHome from "../Agents/Agents/AgentHome";
import Contact from "../Agents/About/contact";
import About from "../Agents/About/about";
import AgentProgram from "../Agents/About/AgentProgram";
import AgentProfile from "../Agents/Profile/AgentProfile";
import Studentpage from "../Agents/Student/StudentList";
import AddStudent from "../Agents/Student/AddStudent";
import ViewStudent from "../Agents/Student/ViewStudent";
import EditAgentStudent from "../Agents/Student/EditStudent";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';

function RegisterPage() {
  return (
    <div>
     
        <Routes>
          <Route path="/AgentHome" element={<PrivateRoute><AgentHome /></PrivateRoute>} />
          <Route path="/AgentContact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/AgentAbout" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/AgentProgram" element={<PrivateRoute><AgentProgram /></PrivateRoute>} />
          <Route path="/AgentProfile" element={<PrivateRoute><AgentProfile /></PrivateRoute>} />
          <Route path="/Studentpage" element={<PrivateRoute><Studentpage /></PrivateRoute>} />
          <Route path="/AddStudent" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
          <Route path="/ViewAgentStudent" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
          <Route path="/EditAgentStudent" element={<PrivateRoute><EditAgentStudent /></PrivateRoute>} />
        </Routes>
     
    </div>
  );
}
export default RegisterPage;