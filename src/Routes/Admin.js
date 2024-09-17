import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../src/Pages/Login/PrivateRoute";
import  NotFound from "../../src/Pages/Login/404FoundError";
import AdminAddAdmin from "../Admin/Admins/AdminAdd";
import AdminEditAdmin from "../Admin/Admins/EditAdmin";
import AdminListAdmin from "../Admin/Admins/AdminList";
import AdminViewAdmin from "../Admin/Admins/ViewAdmin";

import AdminAddAgent from "../Admin/Agnent/addAgent";
import AdminEditAgent from "../Admin/Agnent/editAgent";
import AdminListAgent from "../Admin/Agnent/AdminListAgent";
import AdminViewAgent from "../Admin/Agnent/viewAgent";

import AdminDashBoard from "../Admin/DashBoard/HeroBox";

import AdminAddClient from "../Admin/client/addclient";
import AdminEditCilent from "../Admin/client/Edit";
import AdminListClient from "../Admin/client/AdminListClient";
import AdminViewClient from "../Admin/client/ViewClient";

import AdminAddUniversity from "../Admin/University/addUniversity";
import AdminEditUniversity from "../Admin/University/editUniversity";
import AdminListUniversity from "../Admin/University/AdminListUniversity";
import AdminViewUniversity from "../Admin/University/viewUniversity";

import AdminAddCommission from "../Admin/commission/addCommission";
import AdminEditComission from "../Admin/commission/EditComission";
import AdminListCommission from "../Admin/commission/AdminListCommission";
import AdminViewComission from "../Admin/commission/ViewComission";

import AdminAddProgram from "../Admin/Program/addProgram";
import AdminEditProgram from "../Admin/Program/editProgram";
import AdminListPrograms from "../Admin/Program/AdminListPrograms";
import AdminViewProgram from "../Admin/Program/ViewProgram";

import AdminAddStudent from "../Admin/Students/addStudent";
import AdminEditStudent from "../Admin/Students/editStudent";
import AdminListStudent from "../Admin/Students/AdminListStudent";
import AdminViewStudent from "../Admin/Students/viewStudent";

import AdminAddStaff from "../Admin/Staff/addStaff";
import AdminEditStaff from "../Admin/Staff/editStaff";
import AdminListStaff from "../Admin/Staff/AdminListStaff";
import AdminViewStaff from "../Admin/Staff/viewStaff";

import AdminAddApplication from "../Admin/Application/AddApplication";
import AdminEditApplication from "../Admin/Application/EditApplication";
import AdminListApplication from "../Admin/Application/AdminListApplication";
import AdminViewApplication from "../Admin/Application/ViewAppliaction";




import AdminAddIncome from "../Admin/Finance/Income/AddIncome";
import AdminEditIncome from "../Admin/Finance/Income/EditIncome";
import AdminListIncome from "../Admin/Finance/Income/ListIncome";
import AdminViewIncome from "../Admin/Finance/Income/ViewIncome";
import AdminAddExpenses from "../Admin/Finance/Expenses/AddExpenses";
import AdminEditExpenses from "../Admin/Finance/Expenses/EditExpenses";
import AdminListExpenses from "../Admin/Finance/Expenses/ListExpenses";
import AdminViewExpenses from "../Admin/Finance/Expenses/ViewExpenses";
import AdminAddQuotation from "../Admin/Finance/Raise Quotations/AddQuotation";
import AdminEditQuotation from "../Admin/Finance/Raise Quotations/EditQuotation";
import AdminListQuotations from "../Admin/Finance/Raise Quotations/ListQuottions";
import AdminViewQuotation from "../Admin/Finance/Raise Quotations/ViewQuotation";
import AdminAddSenderInvoice from "../Admin/Invoices/AddSenderInvoice";
import AdminAddRecieverInvoice from "../Admin/Invoices/AddRecieverInvoice";
import AdminEditInvoice from "../Admin/Invoices/Editinvoice";
import AdminListInvoice from "../Admin/Invoices/AdminListInvoice";
import AdminViewInvoice from "../Admin/Invoices/Viewinvoice";
import AdminAddIncomeReport from "../Admin/Finance/Income Report/AddIncomeReport";
import AdminEditIncomeReport from "../Admin/Finance/Income Report/EditIncomeReport";
import AdminListIncomeReport from "../Admin/Finance/Income Report/ListIncomereport";
import AdminViewIncomeReport from "../Admin/Finance/Income Report/ViewIncomeReport";
import AdminAddHRMStaff from "../Admin/HRMS/Staff/AddHrmStaff";
import AdminEditHRMStaff from "../Admin/HRMS/Staff/EditHrmStaff";
import AdminListHRMStaff from "../Admin/HRMS/Staff/ListHrmStaff";
import AdminViewHRMStaff from "../Admin/HRMS/Staff/ViewHrmStaff";
import AdminAddAttendance from "../Admin/HRMS/Attendance/AddAttendance";
import AdminEditAttendance from "../Admin/HRMS/Attendance/EditAttendance";
import AdminListAttendance from "../Admin/HRMS/Attendance/ListAttendance";
import AdminViewAttendance from "../Admin/HRMS/Attendance/ViewAttendance";
import AdminAddPayroll from "../Admin/HRMS/Payroll/AddPayroll";
import AdminEditPayroll from "../Admin/HRMS/Payroll/EditPayroll";
import AdminListPayroll from "../Admin/HRMS/Payroll/ListPayroll";
import AdminViewPayroll from "../Admin/HRMS/Payroll/ViewPayroll";
import AdminAddLeave from "../Admin/HRMS/Leave/AddLeave";
import AdminEditLeave from "../Admin/HRMS/Leave/EditLeave";
import AdminListLeave from "../Admin/HRMS/Leave/ListLeave";
import AdminViewLeave from "../Admin/HRMS/Leave/ViewLeave";
import AdminAddKPI from "../Admin/HRMS/KPI/AddKPI";
import AdminEditKPI from "../Admin/HRMS/KPI/EditKPI";
import AdminListKPI from "../Admin/HRMS/KPI/ListKPI";
import AdminViewKPI from "../Admin/HRMS/KPI/ViewKPI";
import AdminAddPolicies from "../Admin/HRMS/Policies/AddPolicies";
import AdminEditPolicies from "../Admin/HRMS/Policies/EditPolicies";
import AdminListPolicies from "../Admin/HRMS/Policies/ListPolicies";
import AdminViewPolicies from "../Admin/HRMS/Policies/ViewPolicies";
import AdminAddPerformanceReport from "../Admin/HRMS/Performance Report/AddPerformanceReport";
import AdminEditPerformanceReports from "../Admin/HRMS/Performance Report/EditPerformanceReports";
import AdminListPeformanceReport from "../Admin/HRMS/Performance Report/ListPerformanceReport";
import AdminViewPerformanceReports from "../Admin/HRMS/Performance Report/ViewPerformanceReports";
import AdminAddProject from "../Admin/Project & Task/Project/AddProject";
import AdminEditProject from "../Admin/Project & Task/Project/EditProject";
import AdminListProject from "../Admin/Project & Task/Project/ListProject";
import AdminViewProject from "../Admin/Project & Task/Project/ViewProject";
import AdminAddTask from "../Admin/Project & Task/Task/AddTask";
import AdminEditTask from "../Admin/Project & Task/Task/EditTask";
import AdminListTask from "../Admin/Project & Task/Task/ListTask";
import AdminViewTask from "../Admin/Project & Task/Task/ViewTask";

import AdminAddCampaign from "../Admin/Marketing/Campaign/AddCampaign";
import AdminEditCampaign from "../Admin/Marketing/Campaign/EditCampaign";
import AdminListCampaign from "../Admin/Marketing/Campaign/ListCampaign";
import AdminViewCampaign from "../Admin/Marketing/Campaign/ViewCampaign";
import AdminAddDailyTask from "../Admin/Marketing/DailyTask/AddDailyTask";
import AdminEditDailyTask from "../Admin/Marketing/DailyTask/EditDailyTask";
import AdminListDailyTask from "../Admin/Marketing/DailyTask/ListDailyTask";
import AdminViewDailyTask from "../Admin/Marketing/DailyTask/ViewDailyTask";
import AdminAddNotifications from "../Admin/Notifications/AddNotifications";
import AdminEditNotifications from "../Admin/Notifications/EditNotifications";
import AdminViewNotifications from "../Admin/Notifications/ViewNotifications";

import AdminAddMeetings from "../Admin/Meetings/AddMeetings";
import AdminEditMeetings from "../Admin/Meetings/EditMeetings";

import AdminViewMeetings from "../Admin/Meetings/ViewMeetings";

import AdminAddTraining from "../Admin/Training/AddTraining";
import AdminEditTraining from "../Admin/Training/EditTraining";

import AdminViewTraining from "../Admin/Training/ViewTraining";
import AdminAddPromotions from "../Admin/Promotion/AddPromotions";
import AdminEditPromotions from "../Admin/Promotion/EditPromotions";

import AdminViewPromotion from "../Admin/Promotion/ViewPromotion";
import AdminAddTestimonials from "../Admin/Testimonials/AddTestimonials";
import AdminEditTestimonials from "../Admin/Testimonials/EditTestimonials";

import AdminViewTestimonials from "../Admin/Testimonials/ViewTestimonials";
import AdminAddChat from "../Admin/Chat/AdminAddChat";
import AdminEditChat from "../Admin/Chat/AdminEditChat";
import AdminListChat from "../Admin/Chat/ListChat";
import AdminViewChat from "../Admin/Chat/AdminViewChat";
import AdminAddEvents from "../Admin/Events/AddEvents";
import AdminEditEvents from "../Admin/Events/EditEvents";
// import AdminListEvents from "../Admin/Events/AdminListEvents";
import AdminViewEvents from "../Admin/Events/ViewEvents";
import AdminAddEmail from "../Admin/Email/AddEmail";
import AdminEditEmail from "../Admin/Email/EditEmail";
import AdminListEmail from "../Admin/Email/ListEmail";
import AdminViewEmail from "../Admin/Email/ViewEmail";
import AdminAddBlog from "../Admin/Blog/AddBlog";
import AdminEditBlog from "../Admin/Blog/EditBlog";
import AdminListBlog from "../Admin/Blog/ListBlog";
import AdminViewBlog from "../Admin/Blog/ViewBlog";
import AdminAddBookings from "../Admin/ELT/Bookings/AddBookings";
import AdminEditBookings from "../Admin/ELT/Bookings/EditBookings";
import AdminListBookings from "../Admin/ELT/Bookings/ListBookings";
import AdminViewBookings from "../Admin/ELT/Bookings/ViewBookings";
import AdminAddClassSchedule from "../Admin/ELT/Class Schedule/AddClassSchedule";
import AdminEditClassSchedule from "../Admin/ELT/Class Schedule/EditClassSchedule";
import AdminListClassSchedule from "../Admin/ELT/Class Schedule/ListClassSchedule";
import AdminViewClassSchedule from "../Admin/ELT/Class Schedule/ViewClassSchedule";

import AdminListTraining from "../Admin/Training/ListTraining";
import AdminListTestimonials from "../Admin/Testimonials/ListTestimonials";
import AdminListPromotions from "../Admin/Promotion/ListPromotions";
import AdminListEvents from "../Admin/Events/ListEvents";

import AdminListMeetings from "../Admin/Meetings/ListMeetings";

import AdminListNotifications from "../Admin/Notifications/ListNotifications";


import StudentForm from "../Admin/Enquiry/Studentsenquiry/StudentForm";
import EditStudentForm from "../Admin/Enquiry/Studentsenquiry/EditStudentForm";
import ListStudentForm from "../Admin/Enquiry/Studentsenquiry/AdminListStudentForm";
import AddStudentForm from "../Admin/Enquiry/Studentsenquiry/AddStudentForm";

import AddAccomodation from "../Admin/Enquiry/Accomodation/AddAccommodation";
import EditAccomodation from "../Admin/Enquiry/Accomodation/EditAccommodation";
import ListAccomodation from "../Admin/Enquiry/Accomodation/AdminListAccommodation";
import ViewAccomodation from "../Admin/Enquiry/Accomodation/ViewAccommodation";

import AddBusiness from "../Admin/Enquiry/Business/AddBusiness";
import EditBusiness from "../Admin/Enquiry/Business/EditBusiness";
import ListBusiness from "../Admin/Enquiry/Business/AdminListBusiness";
import ViewBusiness from "../Admin/Enquiry/Business/ViewBusiness";

import AddFlightTicket from "../Admin/Enquiry/FlightTicket/AddFlightTicket";
import EditFlightTicket from "../Admin/Enquiry/FlightTicket/EditFlightTicket";
import ListFlightTicket from "../Admin/Enquiry/FlightTicket/AdminListFlightTicket";
import ViewFlightTicket from "../Admin/Enquiry/FlightTicket/ViewFlightTicket";

import AddForex from "../Admin/Enquiry/ForexForm/AddForex";
import ViewForex from "../Admin/Enquiry/ForexForm/ViewForex";
import EditForex from "../Admin/Enquiry/ForexForm/editForex";
import ListForex from "../Admin/Enquiry/ForexForm/AdminListForex";

import AddGeneralEnquiry from "../Admin/Enquiry/General/addGeneralEnquiry";
import EditGeneralEnquiry from "../Admin/Enquiry/General/editGeneralEnquiry";
import ListGeneralEnquiry from "../Admin/Enquiry/General/AdminListGeneralEnquiry";
import ViewGeneralEnquiry from "../Admin/Enquiry/General/viewGeneralEnquiry";

import ViewLoanEnquiry from "../Admin/Enquiry/Loans/viewLoanEnquiry";
import AddLoanEnquiry from "../Admin/Enquiry/Loans/addLoanEnquiry";
import EditLoanEnquiry from "../Admin/Enquiry/Loans/editLoanEnquiry";
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
        path="/admin_add_client"
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
        <Route path="/admin_view_general_enquiry" element={<PrivateRoute><ViewGeneralEnquiry /></PrivateRoute>} />

        <Route path="/admin_view_loan_enquiry" element={<PrivateRoute><ViewLoanEnquiry /></PrivateRoute>} />
        <Route path="/admin_add_loan_enquiry" element={<PrivateRoute><AddLoanEnquiry /></PrivateRoute>} />
        <Route path="/admin_edit_loan_enquiry" element={<PrivateRoute><EditLoanEnquiry /></PrivateRoute>} />
        <Route path="/admin_list_loan_enquiry" element={<PrivateRoute><ListLoanEnquiry /></PrivateRoute>} />
        {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>

  );
};
export default Admin;
