import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminAddHrmStaff from "../Admin/HRMS/Staff/AdminAddHrmStaff";
import AdminEditHrmStaff from "../Admin/HRMS/Staff/AdminEditHrmStaff";
import AdminListHrmStaff from "../Admin/HRMS/Staff/AdminListHrmStaff";
import AdminViewHrmStaff from "../Admin/HRMS/Staff/AdminViewHrmStaff";
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

export const Admin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoute>
              <AdminDashBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddClient"
          element={
            <PrivateRoute>
              <AdminAddClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditClient"
          element={
            <PrivateRoute>
              <AdminEditCilent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListClient"
          element={
            <PrivateRoute>
              <AdminListClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewClient"
          element={
            <PrivateRoute>
              <AdminViewClient />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddUniversity"
          element={
            <PrivateRoute>
              <AdminAddUniversity />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditUniversity"
          element={
            <PrivateRoute>
              <AdminEditUniversity />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListUniversity"
          element={
            <PrivateRoute>
              <AdminListUniversity />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewUniversity"
          element={
            <PrivateRoute>
              <AdminViewUniversity />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddCommission"
          element={
            <PrivateRoute>
              <AdminAddCommission />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditCommission"
          element={
            <PrivateRoute>
              <AdminEditComission />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListCommission"
          element={
            <PrivateRoute>
              <AdminListCommission />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewCommission"
          element={
            <PrivateRoute>
              <AdminViewComission />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddProgram"
          element={
            <PrivateRoute>
              <AdminAddProgram />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditProgram"
          element={
            <PrivateRoute>
              <AdminEditProgram />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListProgram"
          element={
            <PrivateRoute>
              <AdminListPrograms />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewProgram"
          element={
            <PrivateRoute>
              <AdminViewProgram />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddStudent"
          element={
            <PrivateRoute>
              <AdminAddStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditStudent"
          element={
            <PrivateRoute>
              <AdminEditStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListStudent"
          element={
            <PrivateRoute>
              <AdminListStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewStudent"
          element={
            <PrivateRoute>
              <AdminViewStudent />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddStaff"
          element={
            <PrivateRoute>
              <AdminAddStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditStaff"
          element={
            <PrivateRoute>
              <AdminEditStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListStaff"
          element={
            <PrivateRoute>
              <AdminListStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewStaff"
          element={
            <PrivateRoute>
              <AdminViewStaff />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddAgent"
          element={
            <PrivateRoute>
              <AdminAddAgent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditAgent"
          element={
            <PrivateRoute>
              <AdminEditAgent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListAgent"
          element={
            <PrivateRoute>
              <AdminListAgent />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewAgent"
          element={
            <PrivateRoute>
              <AdminViewAgent />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddApplication"
          element={
            <PrivateRoute>
              <AdminAddApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditApplication"
          element={
            <PrivateRoute>
              <AdminEditApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListApplication"
          element={
            <PrivateRoute>
              <AdminListApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewApplication"
          element={
            <PrivateRoute>
              <AdminViewApplication />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminAddFormStudent"
          element={
            <PrivateRoute>
              <AdminAddStudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditFormStudent"
          element={
            <PrivateRoute>
              <AdminEditStudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListFormStudent"
          element={
            <PrivateRoute>
              <AdminListStudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewFormStudent"
          element={
            <PrivateRoute>
              <AdminViewStudentForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminAddForexForm"
          element={
            <PrivateRoute>
              <AdminAddForex />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditForexForm"
          element={
            <PrivateRoute>
              <AdminEditForex />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListForexForm"
          element={
            <PrivateRoute>
              <AdminListForex />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewForexForm"
          element={
            <PrivateRoute>
              <AdminViewForex />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminAddAccommodation"
          element={
            <PrivateRoute>
              <AdminAddAccommodation />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditAccommodation"
          element={
            <PrivateRoute>
              <AdminEditAccommodation />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListAccommodation"
          element={
            <PrivateRoute>
              <AdminListAccommodation />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewAccommodation"
          element={
            <PrivateRoute>
              <AdminViewAccommodation />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminAddFlightTicket"
          element={
            <PrivateRoute>
              <AdminAddFlightTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditFlightTicket"
          element={
            <PrivateRoute>
              <AdminEditFlightTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListFlightTicket"
          element={
            <PrivateRoute>
              <AdminListFlightTicket />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewFlightTicket"
          element={
            <PrivateRoute>
              <AdminViewFlightTicket />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddLoanEnquiry"
          element={
            <PrivateRoute>
              <AdminAddLoanEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditLoanEnquiry"
          element={
            <PrivateRoute>
              <AdminEditLoanEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListLoanEnquiry"
          element={
            <PrivateRoute>
              <AdminListLoanEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewLoanEnquiry"
          element={
            <PrivateRoute>
              <AdminViewLoanEnquiry />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddBusinessEnquiry"
          element={
            <PrivateRoute>
              <AdminAddBusiness />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditBusinessEnquiry"
          element={
            <PrivateRoute>
              <AdminEditBusiness />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListBusinessEnquiry"
          element={
            <PrivateRoute>
              <AdminListBusiness />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewBusinessEnquiry"
          element={
            <PrivateRoute>
              <AdminViewBusiness />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddGeneralEnquiry"
          element={
            <PrivateRoute>
              <AdminAddGeneralEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditGeneralEnquiry"
          element={
            <PrivateRoute>
              <AdminEditGeneralEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListGeneralEnquiry"
          element={
            <PrivateRoute>
              <AdminListGeneralEnquiry />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewGeneralEnquiry"
          element={
            <PrivateRoute>
              <AdminViewGeneralEnquiry />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddIncome"
          element={
            <PrivateRoute>
              <AdminAddIncome />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditIncome"
          element={
            <PrivateRoute>
              <AdminEditIncome />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListIncome"
          element={
            <PrivateRoute>
              <AdminListIncome />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewIncome"
          element={
            <PrivateRoute>
              <AdminViewIncome />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddExpenses"
          element={
            <PrivateRoute>
              <AdminAddExpenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditExpenses"
          element={
            <PrivateRoute>
              <AdminEditExpenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListExpenses"
          element={
            <PrivateRoute>
              <AdminListExpenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewExpenses"
          element={
            <PrivateRoute>
              <AdminViewExpenses />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddRaiseQuotations"
          element={
            <PrivateRoute>
              <AdminAddQuotation />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditRaiseQuotations"
          element={
            <PrivateRoute>
              <AdminEditQuotation />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListRaiseQuotations"
          element={
            <PrivateRoute>
              <AdminListQuotations />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewRaiseQuotations"
          element={
            <PrivateRoute>
              <AdminViewQuotation />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddSenderInvoice"
          element={
            <PrivateRoute>
              <AdminAddSenderInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminAddRecieverInvoice"
          element={
            <PrivateRoute>
              <AdminAddRecieverInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditInvoice"
          element={
            <PrivateRoute>
              <AdminEditInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListInvoice"
          element={
            <PrivateRoute>
              <AdminListInvoice />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewInvoice"
          element={
            <PrivateRoute>
              <AdminViewInvoice />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddIncomeReport"
          element={
            <PrivateRoute>
              <AdminAddIncomeReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditIncomeReport"
          element={
            <PrivateRoute>
              <AdminEditIncomeReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListIncomeReport"
          element={
            <PrivateRoute>
              <AdminListIncomeReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewIncomeReport"
          element={
            <PrivateRoute>
              <AdminViewIncomeReport />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddHRMStaff"
          element={
            <PrivateRoute>
              <AdminAddHrmStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditHRMStaff"
          element={
            <PrivateRoute>
              <AdminEditHrmStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListHRMStaff"
          element={
            <PrivateRoute>
              <AdminListHrmStaff />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewHRMStaff"
          element={
            <PrivateRoute>
              <AdminViewHrmStaff />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddAttendance"
          element={
            <PrivateRoute>
              <AdminAddAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditAttendance"
          element={
            <PrivateRoute>
              <AdminEditAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListAttendance"
          element={
            <PrivateRoute>
              <AdminListAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewAttendance"
          element={
            <PrivateRoute>
              <AdminViewAttendance />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddPayroll"
          element={
            <PrivateRoute>
              <AdminAddPayroll />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditPayroll"
          element={
            <PrivateRoute>
              <AdminEditPayroll />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListPayroll"
          element={
            <PrivateRoute>
              <AdminListPayroll />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewPayroll"
          element={
            <PrivateRoute>
              <AdminViewPayroll />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddLeave"
          element={
            <PrivateRoute>
              <AdminAddLeave />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditLeave"
          element={
            <PrivateRoute>
              <AdminEditLeave />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListLeave"
          element={
            <PrivateRoute>
              <AdminListLeave />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewLeave"
          element={
            <PrivateRoute>
              <AdminViewLeave />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddKPI"
          element={
            <PrivateRoute>
              <AdminAddKPI />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditKPI"
          element={
            <PrivateRoute>
              <AdminEditKPI />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListKPI"
          element={
            <PrivateRoute>
              <AdminListKPI />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewKPI"
          element={
            <PrivateRoute>
              <AdminViewKPI />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddPolicies"
          element={
            <PrivateRoute>
              <AdminAddPolicies />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditPolicies"
          element={
            <PrivateRoute>
              <AdminEditPolicies />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListPolicies"
          element={
            <PrivateRoute>
              <AdminListPolicies />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewPolicies"
          element={
            <PrivateRoute>
              <AdminViewPolicies />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddPerformanceReport"
          element={
            <PrivateRoute>
              <AdminAddPerformanceReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditPerformanceReport"
          element={
            <PrivateRoute>
              <AdminEditPerformanceReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListPerformanceReport"
          element={
            <PrivateRoute>
              <AdminListPeformanceReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewPerformanceReport"
          element={
            <PrivateRoute>
              <AdminViewPerformanceReports />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddProject"
          element={
            <PrivateRoute>
              <AdminAddProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditProject"
          element={
            <PrivateRoute>
              <AdminEditProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListProject"
          element={
            <PrivateRoute>
              <AdminListProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewProject"
          element={
            <PrivateRoute>
              <AdminViewProject />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddTask"
          element={
            <PrivateRoute>
              <AdminAddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditTask"
          element={
            <PrivateRoute>
              <AdminEditTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListTask"
          element={
            <PrivateRoute>
              <AdminListTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewTask"
          element={
            <PrivateRoute>
              <AdminViewTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddSocialMedia"
          element={
            <PrivateRoute>
              <AdminAddSocialMedia />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditSocialMedia"
          element={
            <PrivateRoute>
              <AdminEditSocialMedia />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListSocialMedia"
          element={
            <PrivateRoute>
              <AdminListSocialMedia />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewSocialMedia"
          element={
            <PrivateRoute>
              <AdminViewSocialMedia />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddCampaign"
          element={
            <PrivateRoute>
              <AdminAddCampaign />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditCampaign"
          element={
            <PrivateRoute>
              <AdminEditCampaign />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListCampaign"
          element={
            <PrivateRoute>
              <AdminListCampaign />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewCampaign"
          element={
            <PrivateRoute>
              <AdminViewCampaign />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddDailyTask"
          element={
            <PrivateRoute>
              <AdminAddDailyTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditDailyTask"
          element={
            <PrivateRoute>
              <AdminEditDailyTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListDailyTask"
          element={
            <PrivateRoute>
              <AdminListDailyTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewDailyTask"
          element={
            <PrivateRoute>
              <AdminViewDailyTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddNotifications"
          element={
            <PrivateRoute>
              <AdminAddNotifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditNotifications"
          element={
            <PrivateRoute>
              <AdminEditNotifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListNotifications"
          element={
            <PrivateRoute>
              <AdminListNotifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewNotifications"
          element={
            <PrivateRoute>
              <AdminViewNotifications />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddMeetings"
          element={
            <PrivateRoute>
              <AdminAddMeetings />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditMeetings"
          element={
            <PrivateRoute>
              <AdminEditMeetings />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListMeetings"
          element={
            <PrivateRoute>
              <AdminListMeetings />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewMeetings"
          element={
            <PrivateRoute>
              <AdminViewMeetings />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddTraining"
          element={
            <PrivateRoute>
              <AdminAddTraining />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditTraining"
          element={
            <PrivateRoute>
              <AdminEditTraining />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListTraining"
          element={
            <PrivateRoute>
              <AdminListTraining />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewTraining"
          element={
            <PrivateRoute>
              <AdminViewTraining />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddChat"
          element={
            <PrivateRoute>
              <AdminAddChat />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditChat"
          element={
            <PrivateRoute>
              <AdminEditChat />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListChat"
          element={
            <PrivateRoute>
              <AdminListChat />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewChat"
          element={
            <PrivateRoute>
              <AdminViewChat />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddEmail"
          element={
            <PrivateRoute>
              <AdminAddEmail />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditEmail"
          element={
            <PrivateRoute>
              <AdminEditEmail />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListEmail"
          element={
            <PrivateRoute>
              <AdminListEmail />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewEmail"
          element={
            <PrivateRoute>
              <AdminViewEmail />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddPromotions"
          element={
            <PrivateRoute>
              <AdminAddPromotions />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditPromotions"
          element={
            <PrivateRoute>
              <AdminEditPromotions />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListPromotions"
          element={
            <PrivateRoute>
              <AdminListPromotions />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewPromotions"
          element={
            <PrivateRoute>
              <AdminViewPromotion />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddEvents"
          element={
            <PrivateRoute>
              <AdminAddEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditEvents"
          element={
            <PrivateRoute>
              <AdminEditEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListEvents"
          element={
            <PrivateRoute>
              <AdminListEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewEvents"
          element={
            <PrivateRoute>
              <AdminViewEvents />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddBlog"
          element={
            <PrivateRoute>
              <AdminAddBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditBlog"
          element={
            <PrivateRoute>
              <AdminEditBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListBlog"
          element={
            <PrivateRoute>
              <AdminListBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewBlog"
          element={
            <PrivateRoute>
              <AdminViewBlog />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddTestimonials"
          element={
            <PrivateRoute>
              <AdminAddTestimonials />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditTestimonials"
          element={
            <PrivateRoute>
              <AdminEditTestimonials />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListTestimonials"
          element={
            <PrivateRoute>
              <AdminListTestimonials />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewTestimonials"
          element={
            <PrivateRoute>
              <AdminViewTestimonials />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddAdmin"
          element={
            <PrivateRoute>
              <AdminAddAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditAdmin"
          element={
            <PrivateRoute>
              <AdminEditAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListAdmin"
          element={
            <PrivateRoute>
              <AdminListAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewAdmin"
          element={
            <PrivateRoute>
              <AdminViewAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddBookings"
          element={
            <PrivateRoute>
              <AdminAddBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditBookings"
          element={
            <PrivateRoute>
              <AdminEditBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListBookings"
          element={
            <PrivateRoute>
              <AdminListBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewBookings"
          element={
            <PrivateRoute>
              <AdminViewBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/AdminAddClassSchedule"
          element={
            <PrivateRoute>
              <AdminAddClassSchedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminEditClassSchedule"
          element={
            <PrivateRoute>
              <AdminEditClassSchedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminListClassSchedule"
          element={
            <PrivateRoute>
              <AdminListClassSchedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/AdminViewClassSchedule"
          element={
            <PrivateRoute>
              <AdminViewClassSchedule />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Admin;
