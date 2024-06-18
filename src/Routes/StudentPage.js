import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Students/Home/Program";
import Profile from "../Students/Profile/Profile";
import Contact from "../Students/Profile/Contact";
import About from "../Students/Home/About";
import TrackApplication from "../Students/Application/TrackApplication";
import ListProgram from "../Students/Program/ListProgram";
import ViewApplication from "../Students/Application/ViewApplication";
import Faq from "../Students/Profile/Faq";
import ViewUniversity from "../Students/University/ViewUniversity";
import ViewProgram from "../Students/Program/viewProgram";
import StudentDashboard from "../Students/DashBoard/StudentDashboard";


function RegisterPage() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Student" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/TrackApplication" element={<TrackApplication />} />
          <Route path="/Program" element={<ListProgram />} />
          <Route path="/ViewApplication" element={<ViewApplication />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/ViewpageUniversity" element={<ViewUniversity />} />
          <Route path="/ViewProgramUniversity" element={<ViewProgram />} />
          <Route path="/StudentDashBoard" element={<StudentDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default RegisterPage;
