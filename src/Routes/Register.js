import React, { useEffect, useState } from "react";
import Loading from "../compoents/Loading";
import { Routes, Route } from 'react-router-dom';

import Register from "../Pages/Register/register";
import Login from "../Pages/Login/login";
import ForgotPassword from "../Pages/Login/forgotPassword";
import ResetPassword from "../Pages/Login/resetPassword";
import Check from "./checkcode"


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
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/Check" element={<Check />} />
      </Routes>


    </div>
  );
}
export default RegisterPage;
