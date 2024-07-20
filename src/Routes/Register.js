import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from "../Pages/Register/register";
import Login from "../Pages/Login/login";
import ForgotPassword from "../Pages/Login/forgotPassword";
import Check from "./checkcode"

function RegisterPage() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Check" element={<Check />} />
        </Routes>
      
      </Router>
    </div>
  );
}
export default RegisterPage;
