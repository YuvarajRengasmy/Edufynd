import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
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
          <Route path="/Student" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/Contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          <Route path="/About" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/TrackApplication" element={<PrivateRoute><TrackApplication /></PrivateRoute>} />
          <Route path="/Program" element={<PrivateRoute><ListProgram /></PrivateRoute>} />
          <Route path="/ViewApplication" element={<PrivateRoute><ViewApplication /></PrivateRoute>} />
          <Route path="/Faq" element={<PrivateRoute><Faq /></PrivateRoute>} />
          <Route path="/ViewpageUniversity" element={<PrivateRoute><ViewUniversity /></PrivateRoute>} />
          <Route path="/ViewProgramUniversity" element={<PrivateRoute><ViewProgram /></PrivateRoute>} />
          <Route path="/StudentDashBoard" element={<PrivateRoute><StudentDashboard/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default RegisterPage;
