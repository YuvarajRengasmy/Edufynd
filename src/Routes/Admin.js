import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminAddAdmin from "../Admin/Admins/AdminAddAdmin";
import AdminEditAdmin from "../Admin/Admins/AdminEditAdmin";
import AdminListAdmin from "../Admin/Admins/AdminListAdmin";
import AdminViewAdmin from "../Admin/Admins/AdminViewAdmin";

import AdminAddAgent from "../Admin/Agnent/AdminAddAgent";
import AdminEditAgent from "../Admin/Agnent/AdminEditAgent";
import AdminListAgent from "../Admin/Agnent/AdminListAgent";
import AdminViewAgent from "../Admin/Agnent/AdminViewAgent";

export const Admin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminAddAdmin" element={<AdminAddAdmin />} />
        <Route path="/AdminEditAdmin" element={<AdminEditAdmin />} />
        <Route path="/AdminListAdmin" element={<AdminListAdmin />} />
        <Route path="/AdminViewAdmin" element={<AdminViewAdmin />} />

        <Route path="/AdminAddAgent" element={<AdminAddAgent />} />
        <Route path="/AdminEditAgent" element={<AdminEditAgent />} />
        <Route path="/AdminListAgent" element={<AdminListAgent />} />
        <Route path="/AdminViewAgent" element={<AdminViewAgent />} />

        <Route path="/AdminAddAgent" element={<AdminAddAgent />} />
        <Route path="/AdminEditAgent" element={<AdminEditAgent />} />
        <Route path="/AdminListAgent" element={<AdminListAgent />} />
        <Route path="/AdminViewAgent" element={<AdminViewAgent />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Admin;
