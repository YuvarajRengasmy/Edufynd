import React from "react";
import { Routes, Route } from "react-router-dom";
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

      <Routes>
        <Route path="/view_enquiry_student" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        <Route path="/list_enquiry_student" element={<PrivateRoute><ListStudentForm /></PrivateRoute>} />
        <Route path="/edit_enquiry_student" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
        <Route path="/add_enquiry_student" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />

        <Route path="/add_accommodation" element={<PrivateRoute><AddAccomodation /></PrivateRoute>} />
        <Route path="/edit_accommodation" element={<PrivateRoute><EditAccomodation /></PrivateRoute>} />
        <Route path="/list_accommodation" element={<PrivateRoute><ListAccomodation /></PrivateRoute>} />
        <Route path="/view_accommodation" element={<PrivateRoute><ViewAccomodation /></PrivateRoute>} />
        <Route path="/add_business_enquiry" element={<PrivateRoute><AddBusiness /></PrivateRoute>} />
        <Route path="/edit_business_enquiry" element={<PrivateRoute><EditBusiness /></PrivateRoute>} />
        <Route path="/list_business_enquiry" element={<PrivateRoute><ListBusiness /></PrivateRoute>} />
        <Route path="/view_business_enquiry" element={<PrivateRoute><ViewBusiness /></PrivateRoute>} />

        <Route path="/add_flight_ticket" element={<PrivateRoute><AddFlightTicket /></PrivateRoute>} />
        <Route path="/edit_flight_ticket" element={<PrivateRoute><EditFlightTicket /></PrivateRoute>} />
        <Route path="/list_flight_ticket" element={<PrivateRoute><ListFlightTicket /></PrivateRoute>} />
        <Route path="/view_flight_ticket" element={<PrivateRoute><ViewFlightTicket /></PrivateRoute>} />

        <Route path="/add_forex_form" element={<PrivateRoute><AddForex /></PrivateRoute>} />
        <Route path="/view_forex_form" element={<PrivateRoute><ViewForex /></PrivateRoute>} />
        <Route path="/edit_forex_form" element={<PrivateRoute><EditForex /></PrivateRoute>} />
        <Route path="/list_forex_form" element={<PrivateRoute><ListForex /></PrivateRoute>} />

        <Route path="/add_general_enquiry" element={<PrivateRoute><AddGeneralEnquiry /></PrivateRoute>} />
        <Route path="/edit_general_enquiry" element={<PrivateRoute><EditGeneralEnquiry /></PrivateRoute>} />
        <Route path="/list_general_enquiry" element={<PrivateRoute><ListGeneralEnquiry /></PrivateRoute>} />
        <Route path="/view_general_enquiry" element={<PrivateRoute><ViewGeneralEnquiry /></PrivateRoute>} />

        <Route path="/view_loan_enquiry" element={<PrivateRoute><ViewLoanEnquiry /></PrivateRoute>} />
        <Route path="/add_loan_enquiry" element={<PrivateRoute><AddLoanEnquiry /></PrivateRoute>} />
        <Route path="/edit_loan_enquiry" element={<PrivateRoute><EditLoanEnquiry /></PrivateRoute>} />
        <Route path="/list_loan_enquiry" element={<PrivateRoute><ListLoanEnquiry /></PrivateRoute>} />
      </Routes>

    </div>
  );
}
export default Enquiry;
