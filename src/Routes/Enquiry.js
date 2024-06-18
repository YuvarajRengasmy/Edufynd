import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentForm from "../Enquiry/StudentForm";


function Enquiry() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
         <Route path="/StudentForm" element={<StudentForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Enquiry;