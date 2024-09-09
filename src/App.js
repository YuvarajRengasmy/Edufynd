import React from "react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./Routes/Register";
import StudentPage from "./Routes/StudentPage";
import SuperAdmin from "./Routes/SuperAdmin";
import Contact from "./Routes/AgentPage";
import Enquiry from "./Routes/Enquiry";
import Staff  from './Routes/Staff'
import Admin from './Routes/Admin'
function App() {
  return (
    <div>
      <BrowserRouter>
      <RegisterPage />
      <SuperAdmin />
      <StudentPage />
      <Contact />
      <Enquiry/>
      <Staff/>
      <Admin/>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
