import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../src/Pages/Login/PrivateRoute";

import AdminAddAdmin from "../Admin/Admins/AdminAddAdmin";
import AdminEditAdmin from "../Admin/Admins/AdminEditAdmin";
import AdminListAdmin from "../Admin/Admins/AdminListAdmin";
import AdminViewAdmin from "../Admin/Admins/AdminViewAdmin";

import AdminAddAgent from "../Admin/Agnent/AdminAddAgent";
import AdminEditAgent from "../Admin/Agnent/AdminEditAgent";
import AdminListAgent from "../Admin/Agnent/AdminListAgent";
import AdminViewAgent from "../Admin/Agnent/AdminViewAgent";
import AdminDashBoard from "../Admin/DashBoard/AdminDashBoard";
import AdminAddClient from "../Admin/client/AdminAddClient";
import AdminEditCilent from "../Admin/client/AdminEditCilent";
import AdminListClient from "../Admin/client/AdminListClient";
import AdminViewClient from "../Admin/client/AdminViewClient";
import AdminAddUniversity from "../Admin/University/AdminAddUniversity";
import AdminEditUniversity from "../Admin/University/AdminEditUniversity";
import AdminListUniversity from "../Admin/University/AdminListUniversity";
import AdminViewUniversity from "../Admin/University/AdminViewUniversity";
import AdminAddCommission from "../Admin/commission/AdminAddCommission";
import AdminEditComission from "../Admin/commission/AdminEditComission";
import AdminListCommission from "../Admin/commission/AdminListCommission";
import AdminViewComission from "../Admin/commission/AdminViewComission";
import AdminAddProgram from "../Admin/Program/AdminAddProgram";
import AdminEditProgram from "../Admin/Program/AdminEditProgram";
import AdminListPrograms from "../Admin/Program/AdminListPrograms";
import AdminViewProgram from "../Admin/Program/AdminViewProgram";
import AdminAddStudent from "../Admin/Students/AdminAddStudent";
import AdminEditStudent from "../Admin/Students/AdminEditStudent";
import AdminListStudent from "../Admin/Students/AdminListStudent";
import AdminViewStudent from "../Admin/Students/AdminViewStudent";
import AdminAddStaff from "../Admin/Staff/AdminAddStaff";
import AdminEditStaff from "../Admin/Staff/AdminEditStaff";
import AdminListStaff from "../Admin/Staff/AdminListStaff";
import AdminViewStaff from "../Admin/Staff/AdminViewStaff";
import AdminAddApplication from "../Admin/Application/AdminAddApplication";
import AdminEditApplication from "../Admin/Application/AdminEditApplication";
import AdminListApplication from "../Admin/Application/AdminListApplication";
import AdminViewApplication from "../Admin/Application/AdminViewApplication";
import AdminAddStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminAddStudentForm";
import AdminEditStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminEditStudentForm";
import AdminListStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminListStudentForm";
import AdminViewStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminViewStudentForm";
import AdminAddForex from "../Admin/Enquiry/ForexForm/AdminAddForex";
import AdminEditForex from "../Admin/Enquiry/ForexForm/AdminEditForex";
import AdminListForex from "../Admin/Enquiry/ForexForm/AdminListForex";
import AdminViewForex from "../Admin/Enquiry/ForexForm/AdminViewForex";
import AdminAddAccommodation from "../Admin/Enquiry/Accomodation/AdminAddAccommodation";
import AdminEditAccommodation from "../Admin/Enquiry/Accomodation/AdminEditAccommodation";
import AdminListAccommodation from "../Admin/Enquiry/Accomodation/AdminListAccommodation";
import AdminViewAccommodation from "../Admin/Enquiry/Accomodation/AdminViewAccommodation";
import AdminAddFlightTicket from "../Admin/Enquiry/FlightTicket/AdminAddFlightTicket";
import AdminEditFlightTicket from "../Admin/Enquiry/FlightTicket/AdminEditFlightTicket";
import AdminListFlightTicket from "../Admin/Enquiry/FlightTicket/AdminListFlightTicket";
import AdminViewFlightTicket from "../Admin/Enquiry/FlightTicket/AdminViewFlightTicket";
import AdminAddLoanEnquiry from "../Admin/Enquiry/Loans/AdminAddLoanEnquiry";
import AdminEditLoanEnquiry from "../Admin/Enquiry/Loans/AdminEditLoanEnquiry";
import AdminListLoanEnquiry from "../Admin/Enquiry/Loans/AdminListLoanEnquiry";
import AdminViewLoanEnquiry from "../Admin/Enquiry/Loans/AdminViewLoanEnquiry";
import AdminAddBusiness from "../Admin/Enquiry/Business/AdminAddBusiness";
import AdminEditBusiness from "../Admin/Enquiry/Business/AdminEditBusiness";
import AdminListBusiness from "../Admin/Enquiry/Business/AdminListBusiness";
import AdminViewBusiness from "../Admin/Enquiry/Business/AdminViewBusiness";
import AdminAddGeneralEnquiry from "../Admin/Enquiry/General/AdminAddGeneralEnquiry";
import AdminEditGeneralEnquiry from "../Admin/Enquiry/General/AdminEditGeneralEnquiry";
import AdminListGeneralEnquiry from "../Admin/Enquiry/General/AdminListGeneralEnquiry";
import AdminViewGeneralEnquiry from "../Admin/Enquiry/General/AdminViewGeneralEnquiry";
import AdminAddIncome from "../Admin/Finance/Income/AdminAddIncome";
import AdminEditIncome from "../Admin/Finance/Income/AdminEditIncome";
import AdminListIncome from "../Admin/Finance/Income/AdminListIncome";
import AdminViewIncome from "../Admin/Finance/Income/AdminViewIncome";
import AdminAddExpenses from "../Admin/Finance/Expenses/AdminAddExpenses";
import AdminEditExpenses from "../Admin/Finance/Expenses/AdminEditExpenses";
import AdminListExpenses from "../Admin/Finance/Expenses/AdminListExpenses";
import AdminViewExpenses from "../Admin/Finance/Expenses/AdminViewExpenses";
import AdminAddQuotation from "../Admin/Finance/Raise Quotations/AdminAddQuotation";
import AdminEditQuotation from "../Admin/Finance/Raise Quotations/AdminEditQuotation";
import AdminListQuotations from "../Admin/Finance/Raise Quotations/AdminListQuotation";
import AdminViewQuotation from "../Admin/Finance/Raise Quotations/AdminViewQuotation";
import AdminAddSenderInvoice from "../Admin/Invoices/AdminAddSenderInvoice";
import AdminAddRecieverInvoice from "../Admin/Invoices/AdminAddRecieverInvoice";
import AdminEditInvoice from "../Admin/Invoices/AdminEditInvoice";
import AdminListInvoice from "../Admin/Invoices/AdminListInvoice";
import AdminViewInvoice from "../Admin/Invoices/AdminViewInvoice";
import AdminAddIncomeReport from "../Admin/Finance/Income Report/AdminAddIncomeReport";
import AdminEditIncomeReport from "../Admin/Finance/Income Report/AdminEditIncomeReport";
import AdminListIncomeReport from "../Admin/Finance/Income Report/AdminListIncomereport";
import AdminViewIncomeReport from "../Admin/Finance/Income Report/AdminViewIncomeReport";
import AdminAddHRMStaff from "../Admin/HRMS/Staff/AdminAddHrmStaff";
import AdminEditHRMStaff from "../Admin/HRMS/Staff/AdminEditHrmStaff";
import AdminListHRMStaff from "../Admin/HRMS/Staff/AdminListHrmStaff";
import AdminViewHRMStaff from "../Admin/HRMS/Staff/AdminViewHrmStaff";
import AdminAddAttendance from "../Admin/HRMS/Attendance/AdminAddAttendance";
import AdminEditAttendance from "../Admin/HRMS/Attendance/AdminEditAttendance";
import AdminListAttendance from "../Admin/HRMS/Attendance/AdminListAttendance";
import AdminViewAttendance from "../Admin/HRMS/Attendance/AdminViewAttendance";
import AdminAddPayroll from "../Admin/HRMS/Payroll/AdminAddPayroll";
import AdminEditPayroll from "../Admin/HRMS/Payroll/AdminEditPayroll";
import AdminListPayroll from "../Admin/HRMS/Payroll/AdminListPayroll";
import AdminViewPayroll from "../Admin/HRMS/Payroll/AdminViewPayroll";
import AdminAddLeave from "../Admin/HRMS/Leave/AdminAddLeave";
import AdminEditLeave from "../Admin/HRMS/Leave/AdminEditLeave";
import AdminListLeave from "../Admin/HRMS/Leave/AdminListLeave";
import AdminViewLeave from "../Admin/HRMS/Leave/AdminViewLeave";
import AdminAddKPI from "../Admin/HRMS/KPI/AdminAddKPI";
import AdminEditKPI from "../Admin/HRMS/KPI/AdminEditKPI";
import AdminListKPI from "../Admin/HRMS/KPI/AdminListKPI";
import AdminViewKPI from "../Admin/HRMS/KPI/AdminViewKPI";
import AdminAddPolicies from "../Admin/HRMS/Policies/AdminAddPolicies";
import AdminEditPolicies from "../Admin/HRMS/Policies/AdminEditPolicies";
import AdminListPolicies from "../Admin/HRMS/Policies/AdminListPolicies";
import AdminViewPolicies from "../Admin/HRMS/Policies/AdminViewPolicies";
import AdminAddPerformanceReport from "../Admin/HRMS/Performance Report/AdminAddPerformanceReport";
import AdminEditPerformanceReports from "../Admin/HRMS/Performance Report/AdminEditPerformanceReports";
import AdminListPeformanceReport from "../Admin/HRMS/Performance Report/AdminListPerformanceReport";
import AdminViewPerformanceReports from "../Admin/HRMS/Performance Report/AdminViewPerformanceReports";
import AdminAddProject from "../Admin/Project & Task/Project/AdminAddProject";
import AdminEditProject from "../Admin/Project & Task/Project/AdminEditProject";
import AdminListProject from "../Admin/Project & Task/Project/AdminListProject";
import AdminViewProject from "../Admin/Project & Task/Project/AdminViewProject";
import AdminAddTask from "../Admin/Project & Task/Task/AdminAddTask";
import AdminEditTask from "../Admin/Project & Task/Task/AdminEditTask";
import AdminListTask from "../Admin/Project & Task/Task/AdminListTask";
import AdminViewTask from "../Admin/Project & Task/Task/AdminViewTask";
import AdminAddSocialMedia from "../Admin/Marketing/SocialMedia/AdminAddSocialMedia";
import AdminEditSocialMedia from "../Admin/Marketing/SocialMedia/AdminEditSocialMedia";
import AdminListSocialMedia from "../Admin/Marketing/SocialMedia/AdminListSocialMedia";
import AdminViewSocialMedia from "../Admin/Marketing/SocialMedia/AdminViewSocialMedia";
import AdminAddCampaign from "../Admin/Marketing/Campaign/AdminAddCampaign";
import AdminEditCampaign from "../Admin/Marketing/Campaign/AdminEditCampaign";
import AdminListCampaign from "../Admin/Marketing/Campaign/AdminListCampaign";
import AdminViewCampaign from "../Admin/Marketing/Campaign/AdminViewCampaign";
import AdminAddDailyTask from "../Admin/Marketing/DailyTask/AdminAddDailyTask";
import AdminEditDailyTask from "../Admin/Marketing/DailyTask/AdminEditDailyTask";
import AdminListDailyTask from "../Admin/Marketing/DailyTask/AdminListDailyTask";
import AdminViewDailyTask from "../Admin/Marketing/DailyTask/AdminViewDailyTask";
import AdminAddNotifications from "../Admin/Notifications/AdminAddNotifications";
import AdminEditNotifications from "../Admin/Notifications/AdminEditNotifications";
import AdminViewNotifications from "../Admin/Notifications/AdminViewNotifications";
import AdminAddMeetings from "../Admin/Meetings/AdminAddMeetings";
import AdminEditMeetings from "../Admin/Meetings/AdminEditMeetings";

import AdminViewMeetings from "../Admin/Meetings/AdminViewMeetings";
import AdminAddTraining from "../Admin/Training/AdminAddTraining";
import AdminEditTraining from "../Admin/Training/AdminEditTraining";

import AdminViewTraining from "../Admin/Training/AdminViewTraining";
import AdminAddPromotions from "../Admin/Promotion/AdminAddPromotions";
import AdminEditPromotions from "../Admin/Promotion/AdminEditPromotions";

import AdminViewPromotion from "../Admin/Promotion/AdminViewPromotion";
import AdminAddTestimonials from "../Admin/Testimonials/AdminAddTestimonials";
import AdminEditTestimonials from "../Admin/Testimonials/AdminEditTestimonials";

import AdminViewTestimonials from "../Admin/Testimonials/AdminViewTestimonials";
import AdminAddChat from "../Admin/Chat/AdminAddChat";
import AdminEditChat from "../Admin/Chat/AdminEditChat";
import AdminListChat from "../Admin/Chat/AdminListChat";
import AdminViewChat from "../Admin/Chat/AdminViewChat";
import AdminAddEvents from "../Admin/Events/AdminAddEvents";
import AdminEditEvents from "../Admin/Events/AdminEditEvents";
// import AdminListEvents from "../Admin/Events/AdminListEvents";
import AdminViewEvents from "../Admin/Events/AdminViewEvents";
import AdminAddEmail from "../Admin/Email/AdminAddEmail";
import AdminEditEmail from "../Admin/Email/AdminEditEmail";
import AdminListEmail from "../Admin/Email/AdminListEmail";
import AdminViewEmail from "../Admin/Email/AdminViewEmail";
import AdminAddBlog from "../Admin/Blog/AdminAddBlog";
import AdminEditBlog from "../Admin/Blog/AdminEditBlog";
import AdminListBlog from "../Admin/Blog/AdminListBlog";
import AdminViewBlog from "../Admin/Blog/AdminViewBlog";
import AdminAddBookings from "../Admin/ELT/Bookings/AdminAddBookings";
import AdminEditBookings from "../Admin/ELT/Bookings/AdminEditBookings";
import AdminListBookings from "../Admin/ELT/Bookings/AdminListBookings";
import AdminViewBookings from "../Admin/ELT/Bookings/AdminViewBookings";
import AdminAddClassSchedule from "../Admin/ELT/Class Schedule/AdminAddClassSchedule";
import AdminEditClassSchedule from "../Admin/ELT/Class Schedule/AdminEditClassSchedule";
import AdminListClassSchedule from "../Admin/ELT/Class Schedule/AdminListClassSchedule";
import AdminViewClassSchedule from "../Admin/ELT/Class Schedule/AdminViewClassSchedule";
import AdminListTraining from "../Admin/Training/AdminListTraining";
import AdminListTestimonials from "../Admin/Testimonials/AdminListTestimonials";
import AdminListPromotions from "../Admin/Promotion/AdminListPromotions";
import AdminListEvents from "../Admin/Events/AdminListEvents";
import AdminListMeetings from "../Admin/Meetings/AdminListMeetings";
import AdminListNotifications from "../Admin/Notifications/AdminListNotifications";


import StudentForm from "../Admin/Enquiry/Studentsenquiry/AdminViewStudentForm";
import EditStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminEditStudentForm";
import ListStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminListStudentForm";
import AddStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminAddStudentForm";
import AddAccomodation from "../Admin/Enquiry/Accomodation/AdminAddAccommodation";
import EditAccomodation from "../Admin/Enquiry/Accomodation/AdminEditAccommodation";
import ListAccomodation from "../Admin/Enquiry/Accomodation/AdminListAccommodation";
import ViewAccomodation from "../Admin/Enquiry/Accomodation/AdminViewAccommodation";
import AddBusiness from "../Admin/Enquiry/Business/AdminAddBusiness";
import EditBusiness from "../Admin/Enquiry/Business/AdminEditBusiness";
import ListBusiness from "../Admin/Enquiry/Business/AdminListBusiness";
import ViewBusiness from "../Admin/Enquiry/Business/AdminViewBusiness";
import AddFlightTicket from "../Admin/Enquiry/FlightTicket/AdminAddFlightTicket";
import EditFlightTicket from "../Admin/Enquiry/FlightTicket/AdminEditFlightTicket";
import ListFlightTicket from "../Admin/Enquiry/FlightTicket/AdminListFlightTicket";
import ViewFlightTicket from "../Admin/Enquiry/FlightTicket/AdminViewFlightTicket";
import AddForex from "../Admin/Enquiry/ForexForm/AdminAddForex";
import ViewForex from "../Admin/Enquiry/ForexForm/AdminViewForex";
import EditForex from "../Admin/Enquiry/ForexForm/AdminEditForex";
import ListForex from "../Admin/Enquiry/ForexForm/AdminListForex";
import AddGeneralEnquiry from "../Admin/Enquiry/General/AdminAddGeneralEnquiry";
import EditGeneralEnquiry from "../Admin/Enquiry/General/AdminEditGeneralEnquiry";
import ListGeneralEnquiry from "../Admin/Enquiry/General/AdminListGeneralEnquiry";
import ViewGeneralEnquiry from "../Admin/Enquiry/General/AdminViewGeneralEnquiry";

import ViewLoanEnquiry from "../Admin/Enquiry/Loans/AdminViewLoanEnquiry";
import AddLoanEnquiry from "../Admin/Enquiry/Loans/AdminAddLoanEnquiry";
import EditLoanEnquiry from "../Admin/Enquiry/Loans/AdminEditLoanEnquiry";
import ListLoanEnquiry from "../Admin/Enquiry/Loans/AdminListLoanEnquiry";

export const Admin = () => {
  return (

    <Routes>
      <Route
        path="/admin_dashboard"
        element={
          <PrivateRoute>
            <AdminDashBoard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add__client"
        element={
          <PrivateRoute>
            <AdminAddClient />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_client"
        element={
          <PrivateRoute>
            <AdminEditCilent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_client"
        element={
          <PrivateRoute>
            <AdminListClient />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_client"
        element={
          <PrivateRoute>
            <AdminViewClient />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_university"
        element={
          <PrivateRoute>
            <AdminAddUniversity />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_university"
        element={
          <PrivateRoute>
            <AdminEditUniversity />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_university"
        element={
          <PrivateRoute>
            <AdminListUniversity />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_university"
        element={
          <PrivateRoute>
            <AdminViewUniversity />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_commission"
        element={
          <PrivateRoute>
            <AdminAddCommission />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_commission"
        element={
          <PrivateRoute>
            <AdminEditComission />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_commission"
        element={
          <PrivateRoute>
            <AdminListCommission />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_commission"
        element={
          <PrivateRoute>
            <AdminViewComission />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_program"
        element={
          <PrivateRoute>
            <AdminAddProgram />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_program"
        element={
          <PrivateRoute>
            <AdminEditProgram />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_program"
        element={
          <PrivateRoute>
            <AdminListPrograms />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_program"
        element={
          <PrivateRoute>
            <AdminViewProgram />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_student"
        element={
          <PrivateRoute>
            <AdminAddStudent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_student"
        element={
          <PrivateRoute>
            <AdminEditStudent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_student"
        element={
          <PrivateRoute>
            <AdminListStudent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_student"
        element={
          <PrivateRoute>
            <AdminViewStudent />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_staff"
        element={
          <PrivateRoute>
            <AdminAddStaff />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_staff"
        element={
          <PrivateRoute>
            <AdminEditStaff />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_staff"
        element={
          <PrivateRoute>
            <AdminListStaff />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_staff"
        element={
          <PrivateRoute>
            <AdminViewStaff />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_agent"
        element={
          <PrivateRoute>
            <AdminAddAgent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_agent"
        element={
          <PrivateRoute>
            <AdminEditAgent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_agent"
        element={
          <PrivateRoute>
            <AdminListAgent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_agent"
        element={
          <PrivateRoute>
            <AdminViewAgent />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_application"
        element={
          <PrivateRoute>
            <AdminAddApplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_application"
        element={
          <PrivateRoute>
            <AdminEditApplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_application"
        element={
          <PrivateRoute>
            <AdminListApplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_application"
        element={
          <PrivateRoute>
            <AdminViewApplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_add_form_student"
        element={
          <PrivateRoute>
            <AdminAddStudentForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_form_student"
        element={
          <PrivateRoute>
            <AdminEditStudentForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_form_student"
        element={
          <PrivateRoute>
            <AdminListStudentForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_form_student"
        element={
          <PrivateRoute>
            <AdminViewStudentForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_add_forex_form"
        element={
          <PrivateRoute>
            <AdminAddForex />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_forex_form"
        element={
          <PrivateRoute>
            <AdminEditForex />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_forex_form"
        element={
          <PrivateRoute>
            <AdminListForex />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_forex_form"
        element={
          <PrivateRoute>
            <AdminViewForex />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_add_accommodation"
        element={
          <PrivateRoute>
            <AdminAddAccommodation />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_accommodation"
        element={
          <PrivateRoute>
            <AdminEditAccommodation />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_accommodation"
        element={
          <PrivateRoute>
            <AdminListAccommodation />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_accommodation"
        element={
          <PrivateRoute>
            <AdminViewAccommodation />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_add_flight_ticket"
        element={
          <PrivateRoute>
            <AdminAddFlightTicket />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_flight_ticket"
        element={
          <PrivateRoute>
            <AdminEditFlightTicket />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_flight_ticket"
        element={
          <PrivateRoute>
            <AdminListFlightTicket />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_flight_ticket"
        element={
          <PrivateRoute>
            <AdminViewFlightTicket />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_loan_enquiry"
        element={
          <PrivateRoute>
            <AdminAddLoanEnquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_loan_enquiry"
        element={
          <PrivateRoute>
            <AdminEditLoanEnquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_loan_enquiry"
        element={
          <PrivateRoute>
            <AdminListLoanEnquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_loan_enquiry"
        element={
          <PrivateRoute>
            <AdminViewLoanEnquiry />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_business_enquiry"
        element={
          <PrivateRoute>
            <AdminAddBusiness />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_business_enquiry"
        element={
          <PrivateRoute>
            <AdminEditBusiness />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_business_enquiry"
        element={
          <PrivateRoute>
            <AdminListBusiness />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_business_enquiry"
        element={
          <PrivateRoute>
            <AdminViewBusiness />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_general_enquiry"
        element={
          <PrivateRoute>
            <AdminAddGeneralEnquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_general_enquiry"
        element={
          <PrivateRoute>
            <AdminEditGeneralEnquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_general_enquiry"
        element={
          <PrivateRoute>
            <AdminListGeneralEnquiry />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_general_enquiry"
        element={
          <PrivateRoute>
            <AdminViewGeneralEnquiry />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_income"
        element={
          <PrivateRoute>
            <AdminAddIncome />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_income"
        element={
          <PrivateRoute>
            <AdminEditIncome />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_income"
        element={
          <PrivateRoute>
            <AdminListIncome />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_income"
        element={
          <PrivateRoute>
            <AdminViewIncome />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_expenses"
        element={
          <PrivateRoute>
            <AdminAddExpenses />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_expenses"
        element={
          <PrivateRoute>
            <AdminEditExpenses />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_expenses"
        element={
          <PrivateRoute>
            <AdminListExpenses />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_expenses"
        element={
          <PrivateRoute>
            <AdminViewExpenses />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_raisequotations"
        element={
          <PrivateRoute>
            <AdminAddQuotation />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_raisequotations"
        element={
          <PrivateRoute>
            <AdminEditQuotation />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_raisequotations"
        element={
          <PrivateRoute>
            <AdminListQuotations />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_raisequotations"
        element={
          <PrivateRoute>
            <AdminViewQuotation />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_sender_invoice"
        element={
          <PrivateRoute>
            <AdminAddSenderInvoice />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_add_reciever_invoice"
        element={
          <PrivateRoute>
            <AdminAddRecieverInvoice />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_invoice"
        element={
          <PrivateRoute>
            <AdminEditInvoice />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_invoice"
        element={
          <PrivateRoute>
            <AdminListInvoice />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_invoice"
        element={
          <PrivateRoute>
            <AdminViewInvoice />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_income_report"
        element={
          <PrivateRoute>
            <AdminAddIncomeReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_income_report"
        element={
          <PrivateRoute>
            <AdminEditIncomeReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_income_report"
        element={
          <PrivateRoute>
            <AdminListIncomeReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_income_report"
        element={
          <PrivateRoute>
            <AdminViewIncomeReport />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_hrm_staff"
        element={
          <PrivateRoute>
            <AdminAddHRMStaff />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_hrm_staff"
        element={
          <PrivateRoute>
            <AdminEditHRMStaff />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_hrm_staff"
        element={
          <PrivateRoute>
            <AdminListHRMStaff />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_hrm_staff"
        element={
          <PrivateRoute>
            <AdminViewHRMStaff />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_attendance"
        element={
          <PrivateRoute>
            <AdminAddAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_attendance"
        element={
          <PrivateRoute>
            <AdminEditAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_attendance"
        element={
          <PrivateRoute>
            <AdminListAttendance />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_attendance"
        element={
          <PrivateRoute>
            <AdminViewAttendance />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_payroll"
        element={
          <PrivateRoute>
            <AdminAddPayroll />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_payroll"
        element={
          <PrivateRoute>
            <AdminEditPayroll />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_payroll"
        element={
          <PrivateRoute>
            <AdminListPayroll />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_payroll"
        element={
          <PrivateRoute>
            <AdminViewPayroll />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_leave"
        element={
          <PrivateRoute>
            <AdminAddLeave />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_leave"
        element={
          <PrivateRoute>
            <AdminEditLeave />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_leave"
        element={
          <PrivateRoute>
            <AdminListLeave />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_leave"
        element={
          <PrivateRoute>
            <AdminViewLeave />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_kpi"
        element={
          <PrivateRoute>
            <AdminAddKPI />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_kpi"
        element={
          <PrivateRoute>
            <AdminEditKPI />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_kpi"
        element={
          <PrivateRoute>
            <AdminListKPI />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_kpi"
        element={
          <PrivateRoute>
            <AdminViewKPI />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_policies"
        element={
          <PrivateRoute>
            <AdminAddPolicies />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_policies"
        element={
          <PrivateRoute>
            <AdminEditPolicies />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_policies"
        element={
          <PrivateRoute>
            <AdminListPolicies />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_policies"
        element={
          <PrivateRoute>
            <AdminViewPolicies />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_performance_report"
        element={
          <PrivateRoute>
            <AdminAddPerformanceReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_performance_report"
        element={
          <PrivateRoute>
            <AdminEditPerformanceReports />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_performance_report"
        element={
          <PrivateRoute>
            <AdminListPeformanceReport />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_performance_report"
        element={
          <PrivateRoute>
            <AdminViewPerformanceReports />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_project"
        element={
          <PrivateRoute>
            <AdminAddProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_project"
        element={
          <PrivateRoute>
            <AdminEditProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_project"
        element={
          <PrivateRoute>
            <AdminListProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_project"
        element={
          <PrivateRoute>
            <AdminViewProject />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_task"
        element={
          <PrivateRoute>
            <AdminAddTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_task"
        element={
          <PrivateRoute>
            <AdminEditTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_task"
        element={
          <PrivateRoute>
            <AdminListTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_task"
        element={
          <PrivateRoute>
            <AdminViewTask />
          </PrivateRoute>
        }
      />

     

      <Route
        path="/admin_add_campaign"
        element={
          <PrivateRoute>
            <AdminAddCampaign />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_campaign"
        element={
          <PrivateRoute>
            <AdminEditCampaign />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_campaign"
        element={
          <PrivateRoute>
            <AdminListCampaign />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_campaign"
        element={
          <PrivateRoute>
            <AdminViewCampaign />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_daily_task"
        element={
          <PrivateRoute>
            <AdminAddDailyTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_daily_task"
        element={
          <PrivateRoute>
            <AdminEditDailyTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_daily_task"
        element={
          <PrivateRoute>
            <AdminListDailyTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_daily_task"
        element={
          <PrivateRoute>
            <AdminViewDailyTask />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_notifications"
        element={
          <PrivateRoute>
            <AdminAddNotifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_notifications"
        element={
          <PrivateRoute>
            <AdminEditNotifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_notifications"
        element={
          <PrivateRoute>
            <AdminListNotifications />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_notifications"
        element={
          <PrivateRoute>
            <AdminViewNotifications />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_meetings"
        element={
          <PrivateRoute>
            <AdminAddMeetings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_meetings"
        element={
          <PrivateRoute>
            <AdminEditMeetings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_meetings"
        element={
          <PrivateRoute>
            <AdminListMeetings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_meetings"
        element={
          <PrivateRoute>
            <AdminViewMeetings />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_training"
        element={
          <PrivateRoute>
            <AdminAddTraining />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_training"
        element={
          <PrivateRoute>
            <AdminEditTraining />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_training"
        element={
          <PrivateRoute>
            <AdminListTraining />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_training"
        element={
          <PrivateRoute>
            <AdminViewTraining />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_chat"
        element={
          <PrivateRoute>
            <AdminAddChat />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_chat"
        element={
          <PrivateRoute>
            <AdminEditChat />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_chat"
        element={
          <PrivateRoute>
            <AdminListChat />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_chat"
        element={
          <PrivateRoute>
            <AdminViewChat />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_email"
        element={
          <PrivateRoute>
            <AdminAddEmail />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_email"
        element={
          <PrivateRoute>
            <AdminEditEmail />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_email"
        element={
          <PrivateRoute>
            <AdminListEmail />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_email"
        element={
          <PrivateRoute>
            <AdminViewEmail />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_promotions"
        element={
          <PrivateRoute>
            <AdminAddPromotions />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_promotions"
        element={
          <PrivateRoute>
            <AdminEditPromotions />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_promotions"
        element={
          <PrivateRoute>
            <AdminListPromotions />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_promotions"
        element={
          <PrivateRoute>
            <AdminViewPromotion />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_events"
        element={
          <PrivateRoute>
            <AdminAddEvents />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_events"
        element={
          <PrivateRoute>
            <AdminEditEvents />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_events"
        element={
          <PrivateRoute>
            <AdminListEvents />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_events"
        element={
          <PrivateRoute>
            <AdminViewEvents />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_blog"
        element={
          <PrivateRoute>
            <AdminAddBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_blog"
        element={
          <PrivateRoute>
            <AdminEditBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_blog"
        element={
          <PrivateRoute>
            <AdminListBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_blog"
        element={
          <PrivateRoute>
            <AdminViewBlog />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_testimonials"
        element={
          <PrivateRoute>
            <AdminAddTestimonials />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_testimonials"
        element={
          <PrivateRoute>
            <AdminEditTestimonials />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_testimonials"
        element={
          <PrivateRoute>
            <AdminListTestimonials />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_testimonials"
        element={
          <PrivateRoute>
            <AdminViewTestimonials />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_admin"
        element={
          <PrivateRoute>
            <AdminAddAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_admin"
        element={
          <PrivateRoute>
            <AdminEditAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_admin"
        element={
          <PrivateRoute>
            <AdminListAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_admin"
        element={
          <PrivateRoute>
            <AdminViewAdmin />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_bookings"
        element={
          <PrivateRoute>
            <AdminAddBookings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_bookings"
        element={
          <PrivateRoute>
            <AdminEditBookings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_bookings"
        element={
          <PrivateRoute>
            <AdminListBookings />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_bookings"
        element={
          <PrivateRoute>
            <AdminViewBookings />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin_add_class_schedule"
        element={
          <PrivateRoute>
            <AdminAddClassSchedule />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_edit_class_schedule"
        element={
          <PrivateRoute>
            <AdminEditClassSchedule />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_list_class_schedule"
        element={
          <PrivateRoute>
            <AdminListClassSchedule />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin_view_class_schedule"
        element={
          <PrivateRoute>
            <AdminViewClassSchedule />
          </PrivateRoute>
        }
      />


<Route path="/admin_view_enquiry_student" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        <Route path="/admin_list_enquiry_student" element={<PrivateRoute><ListStudentForm /></PrivateRoute>} />
        <Route path="/admin_edit_enquiry_student" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
        <Route path="/admin_add_enquiry_student" element={<PrivateRoute><AddStudentForm /></PrivateRoute>} />

        <Route path="/admin_add_accommodation" element={<PrivateRoute><AddAccomodation /></PrivateRoute>} />
        <Route path="/admin_edit_accommodation" element={<PrivateRoute><EditAccomodation /></PrivateRoute>} />
        <Route path="/admin_list_accommodation" element={<PrivateRoute><ListAccomodation /></PrivateRoute>} />
        <Route path="/admin_view_accommodation" element={<PrivateRoute><ViewAccomodation /></PrivateRoute>} />
        <Route path="/admin_add_business_enquiry" element={<PrivateRoute><AddBusiness /></PrivateRoute>} />
        <Route path="/admin_edit_business_enquiry" element={<PrivateRoute><EditBusiness /></PrivateRoute>} />
        <Route path="/admin_list_business_enquiry" element={<PrivateRoute><ListBusiness /></PrivateRoute>} />
        <Route path="/admin_view_business_enquiry" element={<PrivateRoute><ViewBusiness /></PrivateRoute>} />

        <Route path="/admin_add_flight_ticket" element={<PrivateRoute><AddFlightTicket /></PrivateRoute>} />
        <Route path="/admin_edit_flight_ticket" element={<PrivateRoute><EditFlightTicket /></PrivateRoute>} />
        <Route path="/admin_list_flight_ticket" element={<PrivateRoute><ListFlightTicket /></PrivateRoute>} />
        <Route path="/admin_view_flight_ticket" element={<PrivateRoute><ViewFlightTicket /></PrivateRoute>} />

        <Route path="/admin_add_forex_form" element={<PrivateRoute><AddForex /></PrivateRoute>} />
        <Route path="/admin_view_forex_form" element={<PrivateRoute><ViewForex /></PrivateRoute>} />
        <Route path="/admin_edit_forex_form" element={<PrivateRoute><EditForex /></PrivateRoute>} />
        <Route path="/admin_list_forex_form" element={<PrivateRoute><ListForex /></PrivateRoute>} />

        <Route path="/admin_add_general_enquiry" element={<PrivateRoute><AddGeneralEnquiry /></PrivateRoute>} />
        <Route path="/admin_edit_general_enquiry" element={<PrivateRoute><EditGeneralEnquiry /></PrivateRoute>} />
        <Route path="/admin_list_general_enquiry" element={<PrivateRoute><ListGeneralEnquiry /></PrivateRoute>} />
        <Route path="/view_general_enquiry" element={<PrivateRoute><ViewGeneralEnquiry /></PrivateRoute>} />

        <Route path="/admin_view_loan_enquiry" element={<PrivateRoute><ViewLoanEnquiry /></PrivateRoute>} />
        <Route path="/admin_add_loan_enquiry" element={<PrivateRoute><AddLoanEnquiry /></PrivateRoute>} />
        <Route path="/admin_edit_loan_enquiry" element={<PrivateRoute><EditLoanEnquiry /></PrivateRoute>} />
        <Route path="/admin_list_loan_enquiry" element={<PrivateRoute><ListLoanEnquiry /></PrivateRoute>} />
    </Routes>

  );
};
export default Admin;
