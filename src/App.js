import React from "react";
import RegisterPage from "./Routes/Register";
import StudentPage from "./Routes/StudentPage";
import SuperAdmin from "./Routes/SuperAdmin";
import Contact from "./Routes/AgentPage";
function App() {
  return (
    <div>
    <RegisterPage />
      <SuperAdmin />
      <StudentPage />
      <Contact />
    </div>
  );
}

export default App;
