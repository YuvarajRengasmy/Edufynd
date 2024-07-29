import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
import StudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/StudentForm";
import EditStudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/EditStudentForm";
import ListStudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/ListStudentForm";
import AddStudentForm from "../SuperAdmin/Enquiry/Studentsenquiry/AddStudentForm";
import AddAccomodation from "../SuperAdmin/Enquiry/Accomodation/AddAccommodation";
import EditAccomodation from "../SuperAdmin/Enquiry/Accomodation/EditAccommodation";
import ListAccomodation from "../SuperAdmin/Enquiry/Accomodation/ListAccommodation";
import ViewAccomodation from "../SuperAdmin/Enquiry/Accomodation/ViewAccommodation";
import AddBusiness from "../SuperAdmin/Enquiry/Business/AddBusiness";
import EditBusiness from "../SuperAdmin/Enquiry/Business/EditBusiness";
import ListBusiness from "../SuperAdmin/Enquiry/Business/ListBusiness";
import ViewBusiness from "../SuperAdmin/Enquiry/Business/ViewBusiness";
import AddFlightTicket from "../SuperAdmin/Enquiry/FlightTicket/AddFlightTicket";
import EditFlightTicket from "../SuperAdmin/Enquiry/FlightTicket/EditFlightTicket";
import ListFlightTicket from "../SuperAdmin/Enquiry/FlightTicket/ListFlightTicket";
import ViewFlightTicket from "../SuperAdmin/Enquiry/FlightTicket/ViewFlightTicket";
import AddForex from "../SuperAdmin/Enquiry/ForexForm/AddForex";
import ViewForex from "../SuperAdmin/Enquiry/ForexForm/ViewForex";
import EditForex from "../SuperAdmin/Enquiry/ForexForm/editForex";
import ListForex from "../SuperAdmin/Enquiry/ForexForm/listForex";
import AddGeneralEnquiry from "../SuperAdmin/Enquiry/General/addGeneralEnquiry";
import EditGeneralEnquiry from "../SuperAdmin/Enquiry/General/editGeneralEnquiry";
import ListGeneralEnquiry from "../SuperAdmin/Enquiry/General/listGeneralEnquiry";
import ViewGeneralEnquiry from "../SuperAdmin/Enquiry/General/viewGeneralEnquiry";

import ViewLoanEnquiry from "../SuperAdmin/Enquiry/Loans/viewLoanEnquiry";
import AddLoanEnquiry from "../SuperAdmin/Enquiry/Loans/addLoanEnquiry";
import EditLoanEnquiry from "../SuperAdmin/Enquiry/Loans/editLoanEnquiry";
import ListLoanEnquiry from "../SuperAdmin/Enquiry/Loans/listLoanEnquiry";

function Enquiry() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/ViewStudentForm" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
          <Route path="/ListStudentForm" element={<PrivateRoute><ListStudentForm /></PrivateRoute>} />
          <Route path="/EditStudentForm" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
          <Route path="/AddStudentForm" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />
          <Route path="/AddAccommodation" element={<PrivateRoute><AddAccomodation /></PrivateRoute>} />
          <Route path="/EditAccommodation" element={<PrivateRoute><EditAccomodation /></PrivateRoute>} />
          <Route path="/ListAccommodation" element={<PrivateRoute><ListAccomodation /></PrivateRoute>} />
          <Route path="/ViewAccommodation" element={<PrivateRoute><ViewAccomodation /></PrivateRoute>} />
          <Route path="/AddBusinessEnquiry" element={<PrivateRoute><AddBusiness /></PrivateRoute>} />
          <Route path="/EditBusinessEnquiry" element={<PrivateRoute><EditBusiness /></PrivateRoute>} />
          <Route path="/ListBusinessEnquiry" element={<PrivateRoute><ListBusiness /></PrivateRoute>} />
          <Route path="/ViewBusinessEnquiry" element={<PrivateRoute><ViewBusiness /></PrivateRoute>} />
          <Route path="/AddFlightTicket" element={<PrivateRoute><AddFlightTicket /></PrivateRoute>} />
          <Route path="/EditFlightTicket" element={<PrivateRoute><EditFlightTicket /></PrivateRoute>} />
          <Route path="/ListFlightTicket" element={<PrivateRoute><ListFlightTicket /></PrivateRoute>} />
          <Route path="/ViewFlightTicket" element={<PrivateRoute><ViewFlightTicket /></PrivateRoute>} />
          <Route path="/AddForexForm" element={<PrivateRoute><AddForex /></PrivateRoute>} />
          <Route path="/ViewForexForm" element={<PrivateRoute><ViewForex /></PrivateRoute>} />
          <Route path="/EditForexForm" element={<PrivateRoute><EditForex /></PrivateRoute>} />
          <Route path="/ListForexForm" element={<PrivateRoute><ListForex /></PrivateRoute>} />
          <Route path="/AddGeneralEnquiry" element={<PrivateRoute><AddGeneralEnquiry /></PrivateRoute>} />
          <Route path="/EditGeneralEnquiry" element={<PrivateRoute><EditGeneralEnquiry /></PrivateRoute>} />
          <Route path="/ListGeneralEnquiry" element={<PrivateRoute><ListGeneralEnquiry /></PrivateRoute>} />
          <Route path="/ViewGeneralEnquiry" element={<PrivateRoute><ViewGeneralEnquiry /></PrivateRoute>} />
          <Route path="/ViewLoanEnquiry" element={<PrivateRoute><ViewLoanEnquiry /></PrivateRoute>} />
          <Route path="/AddLoanEnquiry" element={<PrivateRoute><AddLoanEnquiry /></PrivateRoute>} />
          <Route path="/EditLoanEnquiry" element={<PrivateRoute><EditLoanEnquiry /></PrivateRoute>} />
          <Route path="/ListLoanEnquiry" element={<PrivateRoute><ListLoanEnquiry /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Enquiry;
