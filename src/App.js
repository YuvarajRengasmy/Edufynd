import React from "react";
import RegisterPage from "./Routes/Register";
import StudentPage from "./Routes/StudentPage";
import SuperAdmin from "./Routes/SuperAdmin";
import Contact from "./Routes/AgentPage";
import Enquiry from "./Routes/Enquiry";
import Staff  from './Routes/Staff'
function App() {
  return (
    <div>
    <RegisterPage />
      <SuperAdmin />
      <StudentPage />
      <Contact />
      <Enquiry/>
      <Staff/>
    </div>
  );
}

export default App;
