import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from '../../src/Pages/Login/PrivateRoute';

import AddUniversity from "../Agents/University/addUniversity";
import ListUniversity from "../Agents/University/ListUniversity";
import ViewUniversity from "../Agents/University/viewUniversity";
import EditUniversity from "../Agents/University/editUniversity";

import ViewProgram from "../Agents/Program/ViewProgram";

import ListStudent from "../Agents/Students/listStudent";
import AddStudentSA from "../Agents/Students/addStudent";
import ViewStudent from "../Agents/Students/viewStudent";
import Editstudent from "../Agents/Students/editStudent";

import EnquiryStudent from "../Agents/Students/enquiryStudent";
import AddAgent from "../Agents/Agnent/addAgent";
import ListAgent from "../Agents/Agnent/ListAgent";
import Program from "../Agents/Program/Programs";
import ViewAgent from "../Agents/Agnent/viewAgent";
import EditAgent from "../Agents/Agnent/editAgent";

import AddProgram from "../Agents/Program/addProgram";
import EditProgram from "../Agents/Program/editProgram";
import DashboardSA from "../Agents/DashBoard/HeroBox";
// Client


import ListApplication from "../Agents/Application/ListApplication";
import ListStaff from "../Agents/Staff/listStaff";
import AddStaff from "../Agents/Staff/addStaff";
import EditStaff from "../Agents/Staff/editStaff";
import ViewStaff from "../Agents/Staff/viewStaff";



import ViewApplication from "../Agents/Application/ViewAppliaction";


import Listinvoice from "../Agents/Invoices/Listinvoice";
import Editinvoice from "../Agents/Invoices/Editinvoice";
import Viewinvoice from "../Agents/Invoices/Viewinvoice";
import SenderViewinvoice from "../Agents/Invoices/ReciverViewInvoice";
import AddSenderInvoice from "../Agents/Invoices/AddSenderInvoice";
import AddRecieverInvoice from "../Agents/Invoices/AddRecieverInvoice";
import AddApplication from "../Agents/Application/AddApplication";
import EditApplication from "../Agents/Application/EditApplication";
import AddCommission from "../Agents/commission/addCommission";
import EditCommission from "../Agents/commission/EditComission";
import ViewComission from "../Agents/commission/ViewComission";
import ListCommission from "../Agents/commission/ListCommission";
import { ListNotifications } from "../Agents/Notifications/ListNotifications";
import EditNotifications from "../Agents/Notifications/EditNotifications";
import AddNotifications from "../Agents/Notifications/AddNotifications";
import ViewNotifications from "../Agents/Notifications/ViewNotifications";

import ListPromotions from "../Agents/Promotion/ListPromotions";
import ListMeetings from "../Agents/Meetings/ListMeetings";
import ListEvents from "../Agents/Events/ListEvents";
import AddEvents from "../Agents/Events/AddEvents";
import EditEvents from "../Agents/Events/EditEvents";
import AddMeetings from "../Agents/Meetings/AddMeetings";
import EditMeetings from "../Agents/Meetings/EditMeetings";
import AddPromotions from "../Agents/Promotion/AddPromotions";
import EditPromotions from "../Agents/Promotion/EditPromotions";
import ViewEvents from "../Agents/Events/ViewEvents";
import ViewMeetings from "../Agents/Meetings/ViewMeetings";
import ViewPromotion from "../Agents/Promotion/ViewPromotion";





import ListChat from "../Agents/Chat/ListChat";
import AddChat from "../Agents/Chat/AddChat";
import EditChat from "../Agents/Chat/EditChat";
import ViewChat from "../Agents/Chat/ViewChat";



import ListBookings from "../Agents/ELT/Bookings/ListBookings";
import AddBookings from "../Agents/ELT/Bookings/AddBookings";
import EditBookings from "../Agents/ELT/Bookings/EditBookings";
import ViewBookings from "../Agents/ELT/Bookings/ViewBookings";

import ListClassSchedule from "../Agents/ELT/Class Schedule/ListClassSchedule";
import AddClassSchedule from "../Agents/ELT/Class Schedule/AddClassSchedule";
import EditClassSchedule from "../Agents/ELT/Class Schedule/EditClassSchedule";
import ViewClassSchedule from "../Agents/ELT/Class Schedule/ViewClassSchedule";




import ListExpenses from "../Agents/Finance/Expenses/ListExpenses";
import AddExpenses from "../Agents/Finance/Expenses/AddExpenses";
import EditExpenses from "../Agents/Finance/Expenses/EditExpenses";
import ViewExpenses from "../Agents/Finance/Expenses/ViewExpenses";

import ListIncome from "../Agents/Finance/Income/ListIncome";
import AddIncome from "../Agents/Finance/Income/AddIncome";
import EditIncome from "../Agents/Finance/Income/EditIncome";
import ViewIncome from "../Agents/Finance/Income/ViewIncome";

import ListIncomeReport from "../Agents/Finance/Income Report/ListIncomereport";
import AddIncomeReport from "../Agents/Finance/Income Report/AddIncomeReport";
import EditIncomeReport from "../Agents/Finance/Income Report/EditIncomeReport";
import ViewIncomeReport from "../Agents/Finance/Income Report/ViewIncomeReport";

import ListQuotations from "../Agents/Finance/Raise Quotations/ListQuottions";
import AddQuotations from "../Agents/Finance/Raise Quotations/AddQuotation";
import EditQuotations from "../Agents/Finance/Raise Quotations/EditQuotation";
import ViewQuotations from "../Agents/Finance/Raise Quotations/ViewQuotation";



import StudentForm from "../Agents/Enquiry/Studentsenquiry/StudentForm";
import EditStudentForm from "../Agents/Enquiry/Studentsenquiry/EditStudentForm";
import ListStudentForm from "../Agents/Enquiry/Studentsenquiry/ListStudentForm";
import AddStudentForm from "../Agents/Enquiry/Studentsenquiry/AddStudentForm";
import AddAccomodation from "../Agents/Enquiry/Accomodation/AddAccommodation";
import EditAccomodation from "../Agents/Enquiry/Accomodation/EditAccommodation";
import ListAccomodation from "../Agents/Enquiry/Accomodation/ListAccommodation";
import ViewAccomodation from "../Agents/Enquiry/Accomodation/ViewAccommodation";
import AddBusiness from "../Agents/Enquiry/Business/AddBusiness";
import EditBusiness from "../Agents/Enquiry/Business/EditBusiness";
import ListBusiness from "../Agents/Enquiry/Business/ListBusiness";
import ViewBusiness from "../Agents/Enquiry/Business/ViewBusiness";
import AddFlightTicket from "../Agents/Enquiry/FlightTicket/AddFlightTicket";
import EditFlightTicket from "../Agents/Enquiry/FlightTicket/EditFlightTicket";
import ListFlightTicket from "../Agents/Enquiry/FlightTicket/ListFlightTicket";
import ViewFlightTicket from "../Agents/Enquiry/FlightTicket/ViewFlightTicket";
import AddForex from "../Agents/Enquiry/ForexForm/AddForex";
import ViewForex from "../Agents/Enquiry/ForexForm/ViewForex";
import EditForex from "../Agents/Enquiry/ForexForm/editForex";
import ListForex from "../Agents/Enquiry/ForexForm/listForex";
import AddGeneralEnquiry from "../Agents/Enquiry/General/addGeneralEnquiry";
import EditGeneralEnquiry from "../Agents/Enquiry/General/editGeneralEnquiry";
import ListGeneralEnquiry from "../Agents/Enquiry/General/listGeneralEnquiry";
import ViewGeneralEnquiry from "../Agents/Enquiry/General/viewGeneralEnquiry";

import ViewLoanEnquiry from "../Agents/Enquiry/Loans/viewLoanEnquiry";
import AddLoanEnquiry from "../Agents/Enquiry/Loans/addLoanEnquiry";
import EditLoanEnquiry from "../Agents/Enquiry/Loans/editLoanEnquiry";
import ListLoanEnquiry from "../Agents/Enquiry/Loans/listLoanEnquiry";

function SuperAdmin() {
  return (
    <div>

      <Routes>
      


       

        {/* DashBoard */}
        <Route path="/agent_dashboard" element={<PrivateRoute><DashboardSA /></PrivateRoute>} />

        {/* University */}
        <Route path="/agent_add_university" element={<PrivateRoute><AddUniversity /></PrivateRoute>} />
        <Route path="/agent_list_university" element={<PrivateRoute><ListUniversity /></PrivateRoute>} />
        <Route path="/agent_view_university" element={<PrivateRoute><ViewUniversity /></PrivateRoute>} />
        <Route path="/agent_edit_university" element={<PrivateRoute><EditUniversity /></PrivateRoute>} />
      

        {/* Program */}
        <Route path="/agent_view_program" element={<PrivateRoute><ViewProgram /></PrivateRoute>} />
        <Route path="/agent_list_program" element={<PrivateRoute><Program /></PrivateRoute>} />
        <Route path="/agent_add_program" element={<PrivateRoute><AddProgram /></PrivateRoute>} />
        <Route path="/agent_edit_program" element={<PrivateRoute><EditProgram /></PrivateRoute>} />

        {/* Students */}
        <Route path="/agent_list_student" element={<PrivateRoute><ListStudent /></PrivateRoute>} />
        <Route path="/agent_add_student" element={<PrivateRoute><AddStudentSA /></PrivateRoute>} />
        <Route path="/agent_view_student" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
        <Route path="/agent_edit_student" element={<PrivateRoute><Editstudent /></PrivateRoute>} />
        <Route path="/agent_enquiry_student" element={<PrivateRoute><EnquiryStudent /></PrivateRoute>} />

        {/* Agent */}
        <Route path="/agent_add_agent" element={<PrivateRoute><AddAgent /></PrivateRoute>} />
        <Route path="/agent_list_agent" element={<PrivateRoute><ListAgent /></PrivateRoute>} />
        <Route path="/agent_view_agent" element={<PrivateRoute><ViewAgent /></PrivateRoute>} />
        <Route path="/agent_edit_agent" element={<PrivateRoute><EditAgent /></PrivateRoute>} />

      

       

        {/* Application */}
        <Route path="/agent_list_application" element={<PrivateRoute><ListApplication /></PrivateRoute>} />
      
        <Route path="/agent_add_application" element={<PrivateRoute><AddApplication /></PrivateRoute>} />
        <Route path="/agent_edit_application" element={<PrivateRoute><EditApplication /></PrivateRoute>} />
        <Route path="/agent_view_application" element={<PrivateRoute><ViewApplication /></PrivateRoute>} />

        {/* Staff */}
        <Route path="/agent_list_staff" element={<PrivateRoute><ListStaff /></PrivateRoute>} />
        <Route path="/agent_add_staff" element={<PrivateRoute><AddStaff /></PrivateRoute>} />
        <Route path="/agent_edit_staff" element={<PrivateRoute><EditStaff /></PrivateRoute>} />
        <Route path="/agent_view_staff" element={<PrivateRoute><ViewStaff /></PrivateRoute>} />

        {/* Invoices */}
        <Route path="/agent_list_invoice" element={<PrivateRoute><Listinvoice /></PrivateRoute>} />
        <Route path="/agent_add_sender_invoice" element={<PrivateRoute><AddSenderInvoice /></PrivateRoute>} />
        <Route path="/agent_add_reciever_invoice" element={<PrivateRoute><AddRecieverInvoice /></PrivateRoute>} />
        <Route path="/agent_edit_invoice" element={<PrivateRoute><Editinvoice /></PrivateRoute>} />
        <Route path="/agent_view_invoice" element={<PrivateRoute><Viewinvoice /></PrivateRoute>} />
        <Route path="/agent_view_sender_invoice" element={<PrivateRoute><SenderViewinvoice /></PrivateRoute>} />

        {/* Commission */}
        <Route path="/agent_add_commission" element={<PrivateRoute><AddCommission /></PrivateRoute>} />
        <Route path="/agent_edit_commission" element={<PrivateRoute><EditCommission /></PrivateRoute>} />
        <Route path="/agent_view_commission" element={<PrivateRoute><ViewComission /></PrivateRoute>} />
        <Route path="/agent_list_commission" element={<PrivateRoute><ListCommission /></PrivateRoute>} />

        {/* Notifications */}
        <Route path="/agent_list_notifications" element={<PrivateRoute><ListNotifications /></PrivateRoute>} />
        <Route path="/agent_edit_notifications" element={<PrivateRoute><EditNotifications /></PrivateRoute>} />
        <Route path="/agent_add_notifications" element={<PrivateRoute><AddNotifications /></PrivateRoute>} />
        <Route path="/agent_view_notifications" element={<PrivateRoute><ViewNotifications /></PrivateRoute>} />

       
       

        {/* Events */}
        <Route path="/agent_list_events" element={<PrivateRoute><ListEvents /></PrivateRoute>} />
        <Route path="/agent_add_events" element={<PrivateRoute><AddEvents /></PrivateRoute>} />
        <Route path="/agent_edit_events" element={<PrivateRoute><EditEvents /></PrivateRoute>} />
        <Route path="/agent_view_events" element={<PrivateRoute><ViewEvents /></PrivateRoute>} />


       

       
     
        {/* Meetings */}
        <Route path="/agent_list_meetings" element={<PrivateRoute><ListMeetings /></PrivateRoute>} />
        <Route path="/agent_add_meetings" element={<PrivateRoute><AddMeetings /></PrivateRoute>} />
        <Route path="/agent_edit_meetings" element={<PrivateRoute><EditMeetings /></PrivateRoute>} />
        <Route path="/agent_view_meetings" element={<PrivateRoute><ViewMeetings /></PrivateRoute>} />

        {/* Promotion */}

        <Route path="/agent_list_promotions" element={<PrivateRoute><ListPromotions /></PrivateRoute>} />
        <Route path="/agent_add_promotions" element={<PrivateRoute><AddPromotions /></PrivateRoute>} />
        <Route path="/agent_edit_promotions" element={<PrivateRoute><EditPromotions /></PrivateRoute>} />
        <Route path="/agent_view_promotions" element={<PrivateRoute><ViewPromotion /></PrivateRoute>} />

     
      

        {/* Chat */}
        <Route path="/agent_list_chat" element={<PrivateRoute><ListChat /></PrivateRoute>} />
        <Route path="/agent_add_chat" element={<PrivateRoute><AddChat /></PrivateRoute>} />
        <Route path="/agent_add_chat" element={<PrivateRoute><EditChat /></PrivateRoute>} />
        <Route path="/agent_edit_chat" element={<PrivateRoute><ViewChat /></PrivateRoute>} />

        {/* Bookings */}
        <Route path="/agent_list_bookings" element={<PrivateRoute><ListBookings /></PrivateRoute>} />
        <Route path="/agent_add_bookings" element={<PrivateRoute><AddBookings /></PrivateRoute>} />
        <Route path="/agent_edit_bookings" element={<PrivateRoute><EditBookings /></PrivateRoute>} />
        <Route path="/agent_view_bookings" element={<PrivateRoute><ViewBookings /></PrivateRoute>} />

        {/* Class Schedule */}
        <Route path="/agent_list_class_schedule" element={<PrivateRoute><ListClassSchedule /></PrivateRoute>} />
        <Route path="/agent_add_class_schedule" element={<PrivateRoute><AddClassSchedule /></PrivateRoute>} />
        <Route path="/agent_edit_class_schedule" element={<PrivateRoute><EditClassSchedule /></PrivateRoute>} />
        <Route path="/agent_view_class_schedule" element={<PrivateRoute><ViewClassSchedule /></PrivateRoute>} />

       

        {/* Expenses */}
        <Route path="/agent_list_expenses" element={<PrivateRoute><ListExpenses /></PrivateRoute>} />
        <Route path="/agent_add_expenses" element={<PrivateRoute><AddExpenses /></PrivateRoute>} />
        <Route path="/agent_edit_expenses" element={<PrivateRoute><EditExpenses /></PrivateRoute>} />
        <Route path="/agent_view_expenses" element={<PrivateRoute><ViewExpenses /></PrivateRoute>} />

        {/* Income */}
        <Route path="/agent_list_income" element={<PrivateRoute><ListIncome /></PrivateRoute>} />
        <Route path="/agent_add_income" element={<PrivateRoute><AddIncome /></PrivateRoute>} />
        <Route path="/agent_edit_income" element={<PrivateRoute><EditIncome /></PrivateRoute>} />
        <Route path="/agent_view_income" element={<PrivateRoute><ViewIncome /></PrivateRoute>} />


        {/* Income Report */}
        <Route path="/agent_list_income_report" element={<PrivateRoute><ListIncomeReport /></PrivateRoute>} />
        <Route path="/agent_add_income_report" element={<PrivateRoute><AddIncomeReport /></PrivateRoute>} />
        <Route path="/agent_edit_income_report" element={<PrivateRoute><EditIncomeReport /></PrivateRoute>} />
        <Route path="/agent_view_income_report" element={<PrivateRoute><ViewIncomeReport /></PrivateRoute>} />

        {/* Raise Quotations */}
        <Route path="/agent_list_raisequotations" element={<PrivateRoute><ListQuotations /></PrivateRoute>} />
        <Route path="/agent_add_raisequotations" element={<PrivateRoute><AddQuotations /></PrivateRoute>} />
        <Route path="/agent_edit_raisequotations" element={<PrivateRoute><EditQuotations /></PrivateRoute>} />
        <Route path="/agent_view_raisequotations" element={<PrivateRoute><ViewQuotations /></PrivateRoute>} />

        



        <Route path="/agent_view_enquiry_student" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        <Route path="/agent_list_enquiry_student" element={<PrivateRoute><ListStudentForm /></PrivateRoute>} />
        <Route path="/agent_edit_enquiry_student" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
        <Route path="/agent_add_enquiry_student" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />

        <Route path="/agent_add_accommodation" element={<PrivateRoute><AddAccomodation /></PrivateRoute>} />
        <Route path="/agent_edit_accommodation" element={<PrivateRoute><EditAccomodation /></PrivateRoute>} />
        <Route path="/agent_list_accommodation" element={<PrivateRoute><ListAccomodation /></PrivateRoute>} />
        <Route path="/agent_view_accommodation" element={<PrivateRoute><ViewAccomodation /></PrivateRoute>} />
        <Route path="/agent_add_business_enquiry" element={<PrivateRoute><AddBusiness /></PrivateRoute>} />
        <Route path="/agent_edit_business_enquiry" element={<PrivateRoute><EditBusiness /></PrivateRoute>} />
        <Route path="/agent_list_business_enquiry" element={<PrivateRoute><ListBusiness /></PrivateRoute>} />
        <Route path="/agent_view_business_enquiry" element={<PrivateRoute><ViewBusiness /></PrivateRoute>} />

        <Route path="/agent_add_flight_ticket" element={<PrivateRoute><AddFlightTicket /></PrivateRoute>} />
        <Route path="/agent_edit_flight_ticket" element={<PrivateRoute><EditFlightTicket /></PrivateRoute>} />
        <Route path="/agent_list_flight_ticket" element={<PrivateRoute><ListFlightTicket /></PrivateRoute>} />
        <Route path="/agent_view_flight_ticket" element={<PrivateRoute><ViewFlightTicket /></PrivateRoute>} />

        <Route path="/agent_add_forex_form" element={<PrivateRoute><AddForex /></PrivateRoute>} />
        <Route path="/agent_view_forex_form" element={<PrivateRoute><ViewForex /></PrivateRoute>} />
        <Route path="/agent_edit_forex_form" element={<PrivateRoute><EditForex /></PrivateRoute>} />
        <Route path="/agent_list_forex_form" element={<PrivateRoute><ListForex /></PrivateRoute>} />

        <Route path="/agent_add_general_enquiry" element={<PrivateRoute><AddGeneralEnquiry /></PrivateRoute>} />
        <Route path="/agent_edit_general_enquiry" element={<PrivateRoute><EditGeneralEnquiry /></PrivateRoute>} />
        <Route path="/agent_list_general_enquiry" element={<PrivateRoute><ListGeneralEnquiry /></PrivateRoute>} />
        <Route path="/agent_view_general_enquiry" element={<PrivateRoute><ViewGeneralEnquiry /></PrivateRoute>} />

        <Route path="/agent_view_loan_enquiry" element={<PrivateRoute><ViewLoanEnquiry /></PrivateRoute>} />
        <Route path="/agent_add_loan_enquiry" element={<PrivateRoute><AddLoanEnquiry /></PrivateRoute>} />
        <Route path="/agent_edit_loan_enquiry" element={<PrivateRoute><EditLoanEnquiry /></PrivateRoute>} />
        <Route path="/agent_list_loan_enquiry" element={<PrivateRoute><ListLoanEnquiry /></PrivateRoute>} />

        
       
        
      


       
    



      </Routes>

    </div>
  );
}
export default SuperAdmin;
