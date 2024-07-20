import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgentHome from "../Agents/Agents/AgentHome";
import Contact from "../Agents/About/contact";
import About from "../Agents/About/about";
import AgentProgram from "../Agents/About/AgentProgram";
import AgentProfile from "../Agents/Profile/AgentProfile";
import Studentpage from "../Agents/Student/StudentList";
import AddStudent from "../Agents/Student/AddStudent";
import ViewStudent from "../Agents/Student/ViewStudent";
import EditAgentStudent from "../Agents/Student/EditStudent";

function RegisterPage() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/AgentHome" element={<AgentHome />} />
          <Route path="/AgentContact" element={<Contact />} />
          <Route path="/AgentAbout" element={<About />} />
          <Route path="/AgentProgram" element={<AgentProgram />} />
          <Route path="/AgentProfile" element={<AgentProfile />} />
          <Route path="/Studentpage" element={<Studentpage />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/ViewAgentStudent" element={<ViewStudent />} />
          <Route path="/EditAgentStudent" element={<EditAgentStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default RegisterPage;