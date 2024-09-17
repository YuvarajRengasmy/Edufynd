import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
import  NotFound from "../../src/Pages/Login/404FoundError";
import ListStaffUniversity from "../Staff/University/ListUniversity";
import ViewStaffProfile from "../Staff/Profile/ViewStaffProfile";

import ViewStaffUniversity from "../Staff/University/viewUniversity";

import ViewStaffApplication from "../Staff/Application/ViewAppliaction";
import AddStaffApplication from "../Staff/Application/AddApplication";
import EditStaffApplication from "../Staff/Application/EditApplication";
import ListStaffApplication from "../Staff/Application/ListApplication";

import ListStaffProgram from "../Staff/Program/Programs";
import ViewStaffProgram from "../Staff/Program/ViewProgram";
import ChatList from "../Staff/Chat/ListChat"

import ListStaffNotifications from "../Staff/Notifications/ListStaffNotifications";
import ViewStaffNotifications from "../Staff/Notifications/ViewStaffNotifications";
import StaffDashBoard from "../Staff/DashBoard/StaffDashBoard";


import StudentForm from "../Staff/Enquiry/Studentsenquiry/StudentForm";
import EditStudentForm from "../Staff/Enquiry/Studentsenquiry/EditStudentForm";
import ListStudentForm from "../Staff/Enquiry/Studentsenquiry/ListStudentForm";
import AddStudentForm from "../Staff/Enquiry/Studentsenquiry/AddStudentForm";



import AddAccomodation from "../Staff/Enquiry/Accomodation/AddAccommodation";
import EditAccomodation from "../Staff/Enquiry/Accomodation/EditAccommodation";
import ListAccomodation from "../Staff/Enquiry/Accomodation/ListAccommodation";
import ViewAccomodation from "../Staff/Enquiry/Accomodation/ViewAccommodation";



import AddBusiness from "../Staff/Enquiry/Business/AddBusiness";
import EditBusiness from "../Staff/Enquiry/Business/EditBusiness";
import ListBusiness from "../Staff/Enquiry/Business/ListBusiness";
import ViewBusiness from "../Staff/Enquiry/Business/ViewBusiness";



import AddFlightTicket from "../Staff/Enquiry/FlightTicket/AddFlightTicket";
import EditFlightTicket from "../Staff/Enquiry/FlightTicket/EditFlightTicket";
import ListFlightTicket from "../Staff/Enquiry/FlightTicket/ListFlightTicket";
import ViewFlightTicket from "../Staff/Enquiry/FlightTicket/ViewFlightTicket";



import AddForex from "../Staff/Enquiry/ForexForm/AddForex";
import ViewForex from "../Staff/Enquiry/ForexForm/ViewForex";
import EditForex from "../Staff/Enquiry/ForexForm/editForex";
import ListForex from "../Staff/Enquiry/ForexForm/listForex";


import AddGeneralEnquiry from "../Staff/Enquiry/General/addGeneralEnquiry";
import EditGeneralEnquiry from "../Staff/Enquiry/General/editGeneralEnquiry";
import ListGeneralEnquiry from "../Staff/Enquiry/General/listGeneralEnquiry";
import ViewGeneralEnquiry from "../Staff/Enquiry/General/viewGeneralEnquiry";

import ViewLoanEnquiry from "../Staff/Enquiry/Loans/viewLoanEnquiry";
import AddLoanEnquiry from "../Staff/Enquiry/Loans/addLoanEnquiry";
import EditLoanEnquiry from "../Staff/Enquiry/Loans/editLoanEnquiry";
import ListLoanEnquiry from "../Staff/Enquiry/Loans/listLoanEnquiry";

import ListStudent from "../Staff/Students/listStudent";
import AddStudentSA from "../Staff/Students/addStudent";
import ViewStudent from "../Staff/Students/viewStudent";
import Editstudent from "../Staff/Students/editStudent";

export const Staff = () => {
  return (
    <div>

      <Routes>
        <Route path='/staff_dashboard' element={<PrivateRoute><StaffDashBoard /></PrivateRoute>} />

        <Route path="/staff_list_university" element={<PrivateRoute><ListStaffUniversity /></PrivateRoute>} />
        <Route path="/staff_view_university" element={<PrivateRoute><ViewStaffUniversity /></PrivateRoute>} />

        <Route path="/view_profile" element={<PrivateRoute><ViewStaffProfile /></PrivateRoute>} />

        <Route path="/staff_list_student" element={<PrivateRoute><ListStudent /></PrivateRoute>} />
        <Route path="/staff_add_student" element={<PrivateRoute><AddStudentSA /></PrivateRoute>} />
        <Route path="/staff_view_student" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
        <Route path="/staff_edit_student" element={<PrivateRoute><Editstudent /></PrivateRoute>} />

        <Route path="/staff_add_application" element={<PrivateRoute><AddStaffApplication /></PrivateRoute>} />
        <Route path="/staff_edit_application" element={<PrivateRoute><EditStaffApplication /></PrivateRoute>} />
        <Route path="/staff_list_application" element={<PrivateRoute><ListStaffApplication /></PrivateRoute>} />
        <Route path="/staff_view_application" element={<PrivateRoute><ViewStaffApplication /></PrivateRoute>} />

        <Route path="/staff_list_program" element={<PrivateRoute><ListStaffProgram /></PrivateRoute>} />
        <Route path="/staff_view_program" element={<PrivateRoute><ViewStaffProgram /></PrivateRoute>} />
        <Route path="/staff_list_notifications" element={<PrivateRoute><ListStaffNotifications /></PrivateRoute>} />
        <Route path="/staff_view_notifications" element={<PrivateRoute><ViewStaffNotifications /></PrivateRoute>} />
        <Route path="/staff_chat" element={<PrivateRoute><ChatList /></PrivateRoute>} />

        <Route path="/staff_view_enquiry_student" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        <Route path="/staff_list_enquiry_student" element={<PrivateRoute><ListStudentForm /></PrivateRoute>} />
        <Route path="/staff_edit_enquiry_student" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
        <Route path="/staff_add_enquiry_student" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />

        <Route path="/staff_add_accommodation" element={<PrivateRoute><AddAccomodation /></PrivateRoute>} />
        <Route path="/staff_edit_accommodation" element={<PrivateRoute><EditAccomodation /></PrivateRoute>} />
        <Route path="/staff_list_accommodation" element={<PrivateRoute><ListAccomodation /></PrivateRoute>} />
        <Route path="/staff_view_accommodation" element={<PrivateRoute><ViewAccomodation /></PrivateRoute>} />

        <Route path="/staff_add_business_enquiry" element={<PrivateRoute><AddBusiness /></PrivateRoute>} />
        <Route path="/staff_edit_business_enquiry" element={<PrivateRoute><EditBusiness /></PrivateRoute>} />
        <Route path="/staff_list_business_enquiry" element={<PrivateRoute><ListBusiness /></PrivateRoute>} />
        <Route path="/staff_view_business_enquiry" element={<PrivateRoute><ViewBusiness /></PrivateRoute>} />

        <Route path="/staff_add_flight_ticket" element={<PrivateRoute><AddFlightTicket /></PrivateRoute>} />
        <Route path="/staff_edit_flight_ticket" element={<PrivateRoute><EditFlightTicket /></PrivateRoute>} />
        <Route path="/staff_list_flight_ticket" element={<PrivateRoute><ListFlightTicket /></PrivateRoute>} />
        <Route path="/staff_view_flight_ticket" element={<PrivateRoute><ViewFlightTicket /></PrivateRoute>} />

        <Route path="/staff_add_forex_form" element={<PrivateRoute><AddForex /></PrivateRoute>} />
        <Route path="/staff_view_forex_form" element={<PrivateRoute><ViewForex /></PrivateRoute>} />
        <Route path="/staff_edit_forex_form" element={<PrivateRoute><EditForex /></PrivateRoute>} />
        <Route path="/staff_list_forex_form" element={<PrivateRoute><ListForex /></PrivateRoute>} />

        <Route path="/staff_add_general_enquiry" element={<PrivateRoute><AddGeneralEnquiry /></PrivateRoute>} />
        <Route path="/staff_edit_general_enquiry" element={<PrivateRoute><EditGeneralEnquiry /></PrivateRoute>} />
        <Route path="/staff_list_general_enquiry" element={<PrivateRoute><ListGeneralEnquiry /></PrivateRoute>} />
        <Route path="/staff_view_general_enquiry" element={<PrivateRoute><ViewGeneralEnquiry /></PrivateRoute>} />

        <Route path="/staff_view_loan_enquiry" element={<PrivateRoute><ViewLoanEnquiry /></PrivateRoute>} />
        <Route path="/staff_add_loan_enquiry" element={<PrivateRoute><AddLoanEnquiry /></PrivateRoute>} />
        <Route path="/staff_edit_loan_enquiry" element={<PrivateRoute><EditLoanEnquiry /></PrivateRoute>} />
        <Route path="/staff_list_loan_enquiry" element={<PrivateRoute><ListLoanEnquiry /></PrivateRoute>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

    </div>
  );
};
export default Staff