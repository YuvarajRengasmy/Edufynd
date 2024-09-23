import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
import Loading from "../compoents/Loading";
import  NotFound from "../../src/Pages/Login/404FoundError";
import Home from "../Students/Home/Program";
import Profile from "../Students/Profile/Profile";
import Contact from "../Students/Profile/Contact";
import About from "../Students/Home/About";
import TrackApplication from "../Students/Application/TrackApplication";
import ListPrograms from "../Students/Program/ListProgram";
import ViewApplication from "../Students/Application/ViewApplication";
import Faq from "../Students/Profile/Faq";
import ViewUniversity from "../Students/University/ViewUniversity";
import ViewProgram from "../Students/Program/viewProgram";
import StudentDashBoard from "../Students/DashBoard/StudentDashBoard";



function RegisterPage() {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay for data fetching or any initialization logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false); // Set loading to false after the delay
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />; // Show loading component while loading
  }

  return (
    <div>

      <Routes>
        <Route path="/university_list" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/track_application" element={<PrivateRoute><TrackApplication /></PrivateRoute>} />
        <Route path="/program_list" element={<PrivateRoute><ListPrograms /></PrivateRoute>} />
        <Route path="/student_view_application" element={<PrivateRoute><ViewApplication /></PrivateRoute>} />
        <Route path="/Faq" element={<PrivateRoute><Faq /></PrivateRoute>} />
        <Route path="/view_page_university" element={<PrivateRoute><ViewUniversity /></PrivateRoute>} />
        <Route path="/view_program_university" element={<PrivateRoute><ViewProgram /></PrivateRoute>} />
        <Route path="/student_dashboard" element={<PrivateRoute><StudentDashBoard /></PrivateRoute>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </div>
  );
}
export default RegisterPage;
