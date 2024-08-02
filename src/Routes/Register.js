import React from "react";

import {  Routes, Route } from 'react-router-dom';

import Register from "../Pages/Register/register";
import Login from "../Pages/Login/login";
import ForgotPassword from "../Pages/Login/forgotPassword";
import ResetPassword from "../Pages/Login/resetPassword";
import Check from "./checkcode"

function RegisterPage() {
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
