import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../Pages/Register/register";
import Login from "../Pages/Login/login";
import ForgotPassword from "../Pages/Login/forgotPassword";
import Check from "./checkcode"

function RegisterPage() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Check" element={<Check />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default RegisterPage;
