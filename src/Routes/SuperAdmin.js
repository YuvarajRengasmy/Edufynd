import React from "react";
import { Routes, Route } from "react-router-dom";
import Just from "../SuperAdmin/University/just";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
import Country from "../SuperAdmin/University/Country";
import AddUniversity from "../SuperAdmin/University/addUniversity";
import ListUniversity from "../SuperAdmin/University/ListUniversity";
import ViewUniversity from "../SuperAdmin/University/viewUniversity";
import EditUniversity from "../SuperAdmin/University/editUniversity";
import ViewProgram from "../SuperAdmin/Program/ViewProgram";
import ListStudent from "../SuperAdmin/Students/listStudent";
import AddStudentSA from "../SuperAdmin/Students/addStudent";
import ViewStudent from "../SuperAdmin/Students/viewStudent";
import Editstudent from "../SuperAdmin/Students/editStudent";
import EnquiryStudent from "../SuperAdmin/Students/enquiryStudent";
import AddAgent from "../SuperAdmin/Agnent/addAgent";
import ListAgent from "../SuperAdmin/Agnent/ListAgent";
import Program from "../SuperAdmin/Program/Programs";
import ViewAgent from "../SuperAdmin/Agnent/viewAgent";
import EditAgent from "../SuperAdmin/Agnent/editAgent";
import AdminList from "../SuperAdmin/Admins/AdminList";
import AddAdmin from "../SuperAdmin/Admins/AdminAdd";
import EditAdmin from "../SuperAdmin/Admins/EditAdmin";
import ViewAdmin from "../SuperAdmin/Admins/ViewAdmin";
import CountryList from "../SuperAdmin/Admins/country";
import AddProgram from "../SuperAdmin/Program/addProgram";
import EditProgram from "../SuperAdmin/Program/editProgram";
import DashboardSA from "../SuperAdmin/DashBoard/HeroBox";
// Client
import AddClient from "../SuperAdmin/client/addclient";
import ListClient from "../SuperAdmin/client/ListClient";
import ViewClient from "../SuperAdmin/client/ViewClient";
import EditClient from "../SuperAdmin/client/Edit";
import GlobalSettings from "../SuperAdmin/Settings/GlobalSettings";
import CurrencySettings from "../SuperAdmin/Settings/currencySetting";
import UniversitySettings from "../SuperAdmin/Settings/universityModule";
import SourseSettings from "../SuperAdmin/Settings/source";
import ProgramModule from "../SuperAdmin/Settings/programModule";
import ClientModule from "../SuperAdmin/Settings/clientModule";
import Status from "../SuperAdmin/Settings/Status";
import Intake from "../SuperAdmin/Settings/intake";
import Year from "../SuperAdmin/Settings/Year";

import ListApplication from "../SuperAdmin/Application/ListApplication";
import ListStaff from "../SuperAdmin/Staff/listStaff";
import AddStaff from "../SuperAdmin/Staff/addStaff";
import EditStaff from "../SuperAdmin/Staff/editStaff";
import ViewStaff from "../SuperAdmin/Staff/viewStaff";

import Application from "../SuperAdmin/Application/Application";

import ViewApplication from "../SuperAdmin/Application/ViewAppliaction";

import ApplyJob from "../Students/Program/ApplyProgram";
import Listinvoice from "../SuperAdmin/Invoices/Listinvoice";
import Editinvoice from "../SuperAdmin/Invoices/Editinvoice";
import Viewinvoice from "../SuperAdmin/Invoices/Viewinvoice";
import SenderViewinvoice from "../SuperAdmin/Invoices/ReciverViewInvoice";
import AddSenderInvoice from "../SuperAdmin/Invoices/AddSenderInvoice";
import AddRecieverInvoice from "../SuperAdmin/Invoices/AddRecieverInvoice";
import AddApplication from "../SuperAdmin/Application/AddApplication";
import EditApplication from "../SuperAdmin/Application/EditApplication";
import AddCommission from "../SuperAdmin/commission/addCommission";
import EditCommission from "../SuperAdmin/commission/EditComission";
import ViewComission from "../SuperAdmin/commission/ViewComission";
import ListCommission from "../SuperAdmin/commission/ListCommission";
import { ListNotifications } from "../SuperAdmin/Notifications/ListNotifications";
import EditNotifications from "../SuperAdmin/Notifications/EditNotifications";
import AddNotifications from "../SuperAdmin/Notifications/AddNotifications";
import ViewNotifications from "../SuperAdmin/Notifications/ViewNotifications";
import ListTraining from "../SuperAdmin/Training/ListTraining";
import ListTestimonials from "../SuperAdmin/Testimonials/ListTestimonials";
import ListPromotions from "../SuperAdmin/Promotion/ListPromotions";
import ListMeetings from "../SuperAdmin/Meetings/ListMeetings";
import ListEvents from "../SuperAdmin/Events/ListEvents";
import AddEvents from "../SuperAdmin/Events/AddEvents";
import EditEvents from "../SuperAdmin/Events/EditEvents";
import AddMeetings from "../SuperAdmin/Meetings/AddMeetings";
import EditMeetings from "../SuperAdmin/Meetings/EditMeetings";
import AddPromotions from "../SuperAdmin/Promotion/AddPromotions";
import EditPromotions from "../SuperAdmin/Promotion/EditPromotions";
import AddTestimonials from "../SuperAdmin/Testimonials/AddTestimonials";
import EditTestimonials from "../SuperAdmin/Testimonials/EditTestimonials";
import AddTraining from "../SuperAdmin/Training/AddTraining";
import EditTraining from "../SuperAdmin/Training/EditTraining";
import ViewTraining from "../SuperAdmin/Training/ViewTraining";
import ViewEvents from "../SuperAdmin/Events/ViewEvents";
import ViewMeetings from "../SuperAdmin/Meetings/ViewMeetings";
import ViewPromotion from "../SuperAdmin/Promotion/ViewPromotion";
import ViewTestimonials from "../SuperAdmin/Testimonials/ViewTestimonials";

import AddSocialMedia from "../SuperAdmin/Marketing/SocialMedia/AddSocialMedia";
import EditSocialMedia from "../SuperAdmin/Marketing/SocialMedia/EditSocialMedia";
import ListSocialMedia from "../SuperAdmin/Marketing/SocialMedia/ListSocialMedia";
import ViewSocialMedia from "../SuperAdmin/Marketing/SocialMedia/ViewSocialMedia";

import AddFacebook from "../SuperAdmin/Marketing/SocialMedia/Facebook/AddFaceBook";
import EditFacebook from "../SuperAdmin/Marketing/SocialMedia/Facebook/EditFaceBook";
import ListFacebook from "../SuperAdmin/Marketing/SocialMedia/Facebook/ListFacebook";
import ViewFacebook from "../SuperAdmin/Marketing/SocialMedia/Facebook/ViewFaceBook";

import AddLinkedIn from "../SuperAdmin/Marketing/SocialMedia/Linkedin/AddLinkedin";
import EditLinkedIn from "../SuperAdmin/Marketing/SocialMedia/Linkedin/EditLinkedin";
import ListLinkedIn from "../SuperAdmin/Marketing/SocialMedia/Linkedin/ListLinkedin";
import ViewLinkedIn from "../SuperAdmin/Marketing/SocialMedia/Linkedin/ViewLinkedin";

import AddInstagram from "../SuperAdmin/Marketing/SocialMedia/Instagram/AddInstagram";
import EditInstagram from "../SuperAdmin/Marketing/SocialMedia/Instagram/EditInstagram";
import ListInstagram from "../SuperAdmin/Marketing/SocialMedia/Instagram/ListInstagram";
import ViewInstagram from "../SuperAdmin/Marketing/SocialMedia/Instagram/ViewInstagram";


import ListCampaign from "../SuperAdmin/Marketing/Campaign/ListCampaign";
import AddCampaign from "../SuperAdmin/Marketing/Campaign/AddCampaign";
import EditCampaign from "../SuperAdmin/Marketing/Campaign/EditCampaign";
import ViewCampaign from "../SuperAdmin/Marketing/Campaign/ViewCampaign";

import ListDailyTask from "../SuperAdmin/Marketing/DailyTask/ListDailyTask";
import EditDailyTask from "../SuperAdmin/Marketing/DailyTask/EditDailyTask";
import AddDailyTask from "../SuperAdmin/Marketing/DailyTask/AddDailyTask";
import ViewDailyTask from "../SuperAdmin/Marketing/DailyTask/ViewDailyTask";


import ListBlog from "../SuperAdmin/Blog/ListBlog";
import AddBlog from "../SuperAdmin/Blog/AddBlog";
import ViewBlog from "../SuperAdmin/Blog/ViewBlog";
import EditBlog from "../SuperAdmin/Blog/EditBlog";


import ListChat from "../SuperAdmin/Chat/ListChat";
import AddChat from "../SuperAdmin/Chat/AddChat";
import EditChat from "../SuperAdmin/Chat/EditChat";
import ViewChat from "../SuperAdmin/Chat/ViewChat";
import StatusModule from "../SuperAdmin/Settings/University/ApplicationStatus";


import ListBookings from "../SuperAdmin/ELT/Bookings/ListBookings";
import AddBookings from "../SuperAdmin/ELT/Bookings/AddBookings";
import EditBookings from "../SuperAdmin/ELT/Bookings/EditBookings";
import ViewBookings from "../SuperAdmin/ELT/Bookings/ViewBookings";

import ListClassSchedule from "../SuperAdmin/ELT/Class Schedule/ListClassSchedule";
import AddClassSchedule from "../SuperAdmin/ELT/Class Schedule/AddClassSchedule";
import EditClassSchedule from "../SuperAdmin/ELT/Class Schedule/EditClassSchedule";
import ViewClassSchedule from "../SuperAdmin/ELT/Class Schedule/ViewClassSchedule";

import ListEmail from "../SuperAdmin/Email/ListEmail";
import ViewEmail from "../SuperAdmin/Email/ViewEmail";
import AddEmail from "../SuperAdmin/Email/AddEmail";
import EditEmail from "../SuperAdmin/Email/EditEmail";


import ListExpenses from "../SuperAdmin/Finance/Expenses/ListExpenses";
import AddExpenses from "../SuperAdmin/Finance/Expenses/AddExpenses";
import EditExpenses from "../SuperAdmin/Finance/Expenses/EditExpenses";
import ViewExpenses from "../SuperAdmin/Finance/Expenses/ViewExpenses";

import ListIncome from "../SuperAdmin/Finance/Income/ListIncome";
import AddIncome from "../SuperAdmin/Finance/Income/AddIncome";
import EditIncome from "../SuperAdmin/Finance/Income/EditIncome";
import ViewIncome from "../SuperAdmin/Finance/Income/ViewIncome";

import ListIncomeReport from "../SuperAdmin/Finance/Income Report/ListIncomereport";
import AddIncomeReport from "../SuperAdmin/Finance/Income Report/AddIncomeReport";
import EditIncomeReport from "../SuperAdmin/Finance/Income Report/EditIncomeReport";
import ViewIncomeReport from "../SuperAdmin/Finance/Income Report/ViewIncomeReport";

import ListQuotations from "../SuperAdmin/Finance/Raise Quotations/ListQuottions";
import AddQuotations from "../SuperAdmin/Finance/Raise Quotations/AddQuotation";
import EditQuotations from "../SuperAdmin/Finance/Raise Quotations/EditQuotation";
import ViewQuotations from "../SuperAdmin/Finance/Raise Quotations/ViewQuotation";

import ListAttendance from "../SuperAdmin/HRMS/Attendance/ListAttendance";
import AddAttendance from "../SuperAdmin/HRMS/Attendance/AddAttendance";
import EditAttendance from "../SuperAdmin/HRMS/Attendance/EditAttendance";
import ViewAttendance from "../SuperAdmin/HRMS/Attendance/ViewAttendance";

import ListKPI from "../SuperAdmin/HRMS/KPI/ListKPI";
import AddKPI from "../SuperAdmin/HRMS/KPI/AddKPI";
import EditKPI from "../SuperAdmin/HRMS/KPI/EditKPI";
import ViewKPI from "../SuperAdmin/HRMS/KPI/ViewKPI";

import ListLeave from "../SuperAdmin/HRMS/Leave/ListLeave";
import AddLeave from "../SuperAdmin/HRMS/Leave/AddLeave";
import EditLeave from "../SuperAdmin/HRMS/Leave/EditLeave";
import ViewLeave from "../SuperAdmin/HRMS/Leave/ViewLeave";

import ListPayroll from "../SuperAdmin/HRMS/Payroll/ListPayroll";
import AddPayroll from "../SuperAdmin/HRMS/Payroll/AddPayroll";
import EditPayroll from "../SuperAdmin/HRMS/Payroll/EditPayroll";
import ViewPayroll from "../SuperAdmin/HRMS/Payroll/ViewPayroll";

import ListPeformanceReport from "../SuperAdmin/HRMS/Performance Report/ListPerformanceReport";
import AddPeformanceReport from "../SuperAdmin/HRMS/Performance Report/AddPerformanceReport";
import EditPeformanceReport from "../SuperAdmin/HRMS/Performance Report/EditPerformanceReports";
import ViewPeformanceReport from "../SuperAdmin/HRMS/Performance Report/ViewPerformanceReports";

import ListPolicies from "../SuperAdmin/HRMS/Policies/ListPolicies";
import Add from "../SuperAdmin/HRMS/Policies/AddPolicies";
import EditPolicies from "../SuperAdmin/HRMS/Policies/EditPolicies";
import ViewPolicies from "../SuperAdmin/HRMS/Policies/ViewPolicies";

import ListHrmStaff from "../SuperAdmin/HRMS/Staff/ListHrmStaff";
import AddHrmStaff from "../SuperAdmin/HRMS/Staff/ListHrmStaff";
import EditHrmStaff from "../SuperAdmin/HRMS/Staff/ListHrmStaff";
import ViewHrmStaff from "../SuperAdmin/HRMS/Staff/ListHrmStaff";


import ListProject from "../SuperAdmin/Project & Task/Project/ListProject";
import AddProject from "../SuperAdmin/Project & Task/Project/AddProject";
import EditProject from "../SuperAdmin/Project & Task/Project/EditProject";
import ViewProject from "../SuperAdmin/Project & Task/Project/ViewProject";

import ListTask from "../SuperAdmin/Project & Task/Task/ListTask";
import AddTask from "../SuperAdmin/Project & Task/Task/AddTask";
import EditTask from "../SuperAdmin/Project & Task/Task/EditTask";
import ViewTask from "../SuperAdmin/Project & Task/Task/ViewTask";


import GlobalSearch from "../SuperAdmin/Search/GlobalSearch";



function SuperAdmin() {
  return (
    <div>

      <Routes>
        <Route path="/Demo" element={<PrivateRoute><Country /></PrivateRoute>} />
        <Route path="/ApplyJob" element={<PrivateRoute><ApplyJob /></PrivateRoute>} />
        <Route path="/Just" element={<PrivateRoute><Just /></PrivateRoute>} />
        <Route path="/Search" element={<PrivateRoute><GlobalSearch /></PrivateRoute>} />
        {/* Settings */}
        <Route path="/country_list" element={<PrivateRoute><CountryList /></PrivateRoute>} />
        <Route path="/global_settings" element={<PrivateRoute><GlobalSettings /></PrivateRoute>} />
        <Route path="/currency_settings" element={<PrivateRoute><CurrencySettings /></PrivateRoute>} />
        <Route path="/university_settings" element={<PrivateRoute><UniversitySettings /></PrivateRoute>} />
        <Route path="/course_type" element={<PrivateRoute><ProgramModule /></PrivateRoute>} />
        <Route path="/client_module" element={<PrivateRoute><ClientModule /></PrivateRoute>} />
        <Route path="/status" element={<PrivateRoute><Status /></PrivateRoute>} />
        <Route path="/intake" element={<PrivateRoute><Intake /></PrivateRoute>} />
        <Route path="/year_setting" element={<PrivateRoute><Year /></PrivateRoute>} />
        <Route path="/application_status" element={<PrivateRoute><StatusModule/></PrivateRoute>} />
        <Route path="/source" element={<PrivateRoute><SourseSettings /></PrivateRoute>} />

        {/* DashBoard */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardSA /></PrivateRoute>} />

        {/* University */}
        <Route path="/add_university" element={<PrivateRoute><AddUniversity /></PrivateRoute>} />
        <Route path="/list_university" element={<PrivateRoute><ListUniversity /></PrivateRoute>} />
        <Route path="/view_university" element={<PrivateRoute><ViewUniversity /></PrivateRoute>} />
        <Route path="/edit_university" element={<PrivateRoute><EditUniversity /></PrivateRoute>} />
      

        {/* Program */}
        <Route path="/view_program" element={<PrivateRoute><ViewProgram /></PrivateRoute>} />
        <Route path="/list_program" element={<PrivateRoute><Program /></PrivateRoute>} />
        <Route path="/add_program" element={<PrivateRoute><AddProgram /></PrivateRoute>} />
        <Route path="/edit_program" element={<PrivateRoute><EditProgram /></PrivateRoute>} />

        {/* Students */}
        <Route path="/list_student" element={<PrivateRoute><ListStudent /></PrivateRoute>} />
        <Route path="/add_student" element={<PrivateRoute><AddStudentSA /></PrivateRoute>} />
        <Route path="/view_student" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
        <Route path="/edit_student" element={<PrivateRoute><Editstudent /></PrivateRoute>} />
        <Route path="/enquiry_student" element={<PrivateRoute><EnquiryStudent /></PrivateRoute>} />

        {/* Agent */}
        <Route path="/add_agent" element={<PrivateRoute><AddAgent /></PrivateRoute>} />
        <Route path="/list_agent" element={<PrivateRoute><ListAgent /></PrivateRoute>} />
        <Route path="/view_agent" element={<PrivateRoute><ViewAgent /></PrivateRoute>} />
        <Route path="/edit_agent" element={<PrivateRoute><EditAgent /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/list_admin" element={<PrivateRoute><AdminList /></PrivateRoute>} />
        <Route path="/add_admin" element={<PrivateRoute><AddAdmin /></PrivateRoute>} />
        <Route path="/edit_admin" element={<PrivateRoute><EditAdmin /></PrivateRoute>} />
        <Route path="/view_admin" element={<PrivateRoute><ViewAdmin /></PrivateRoute>} />

        {/* Client */}
        <Route path="/add_client" element={<PrivateRoute><AddClient /></PrivateRoute>} />
        <Route path="/list_client" element={<PrivateRoute><ListClient /></PrivateRoute>} />
        <Route path="/edit_client" element={<PrivateRoute><EditClient /></PrivateRoute>} />
        <Route path="/view_client" element={<PrivateRoute><ViewClient /></PrivateRoute>} />

        {/* Application */}
        <Route path="/list_application" element={<PrivateRoute><ListApplication /></PrivateRoute>} />
        <Route path="/application" element={<PrivateRoute><Application /></PrivateRoute>} />
        <Route path="/add_application" element={<PrivateRoute><AddApplication /></PrivateRoute>} />
        <Route path="/edit_application" element={<PrivateRoute><EditApplication /></PrivateRoute>} />
        <Route path="/view_application" element={<PrivateRoute><ViewApplication /></PrivateRoute>} />

        {/* Staff */}
        <Route path="/list_staff" element={<PrivateRoute><ListStaff /></PrivateRoute>} />
        <Route path="/add_staff" element={<PrivateRoute><AddStaff /></PrivateRoute>} />
        <Route path="/edit_staff" element={<PrivateRoute><EditStaff /></PrivateRoute>} />
        <Route path="/view_staff" element={<PrivateRoute><ViewStaff /></PrivateRoute>} />

        {/* Invoices */}
        <Route path="/list_invoice" element={<PrivateRoute><Listinvoice /></PrivateRoute>} />
        <Route path="/add_sender_invoice" element={<PrivateRoute><AddSenderInvoice /></PrivateRoute>} />
        <Route path="/add_reciever_invoice" element={<PrivateRoute><AddRecieverInvoice /></PrivateRoute>} />
        <Route path="/edit_invoice" element={<PrivateRoute><Editinvoice /></PrivateRoute>} />
        <Route path="/view_invoice" element={<PrivateRoute><Viewinvoice /></PrivateRoute>} />
        <Route path="/view_sender_invoice" element={<PrivateRoute><SenderViewinvoice /></PrivateRoute>} />

        {/* Commission */}
        <Route path="/add_commission" element={<PrivateRoute><AddCommission /></PrivateRoute>} />
        <Route path="/edit_commission" element={<PrivateRoute><EditCommission /></PrivateRoute>} />
        <Route path="/view_commission" element={<PrivateRoute><ViewComission /></PrivateRoute>} />
        <Route path="/list_commission" element={<PrivateRoute><ListCommission /></PrivateRoute>} />

        {/* Notifications */}
        <Route path="/list_notifications" element={<PrivateRoute><ListNotifications /></PrivateRoute>} />
        <Route path="/edit_notifications" element={<PrivateRoute><EditNotifications /></PrivateRoute>} />
        <Route path="/add_notifications" element={<PrivateRoute><AddNotifications /></PrivateRoute>} />
        <Route path="/view_notifications" element={<PrivateRoute><ViewNotifications /></PrivateRoute>} />

        {/* Training */}
        <Route path="/list_training" element={<PrivateRoute><ListTraining /></PrivateRoute>} />
        <Route path="/add_training" element={<PrivateRoute><AddTraining /></PrivateRoute>} />
        <Route path="/edit_training" element={<PrivateRoute><EditTraining /></PrivateRoute>} />
        <Route path="/view_training" element={<PrivateRoute><ViewTraining /></PrivateRoute>} />

        {/* Events */}
        <Route path="/list_events" element={<PrivateRoute><ListEvents /></PrivateRoute>} />
        <Route path="/add_events" element={<PrivateRoute><AddEvents /></PrivateRoute>} />
        <Route path="/edit_events" element={<PrivateRoute><EditEvents /></PrivateRoute>} />
        <Route path="/view_events" element={<PrivateRoute><ViewEvents /></PrivateRoute>} />

        {/* SocialMedia */}
        <Route path="/add_social_media" element={<PrivateRoute><AddSocialMedia /></PrivateRoute>} />
        <Route path="/edit_social_media" element={<PrivateRoute><EditSocialMedia /></PrivateRoute>} />
        <Route path="/list_social_media" element={<PrivateRoute><ListSocialMedia /></PrivateRoute>} />
        <Route path="/view_social_media" element={<PrivateRoute><ViewSocialMedia /></PrivateRoute>} />

       

        {/* Campaign */}
        <Route path="/list_campaign" element={<PrivateRoute><ListCampaign /></PrivateRoute>} />
        <Route path="/add_campaign" element={<PrivateRoute><AddCampaign /></PrivateRoute>} />
        <Route path="/edit_campaign" element={<PrivateRoute><EditCampaign /></PrivateRoute>} />
        <Route path="/view_campaign" element={<PrivateRoute><ViewCampaign /></PrivateRoute>} />

        {/* DailyTask */}
        <Route path="/list_daily_task" element={<PrivateRoute><ListDailyTask /></PrivateRoute>} />
        <Route path="/edit_daily_task" element={<PrivateRoute><EditDailyTask /></PrivateRoute>} />
        <Route path="/add_daily_task" element={<PrivateRoute><AddDailyTask /></PrivateRoute>} />
        <Route path="/view_daily_task" element={<PrivateRoute><ViewDailyTask /></PrivateRoute>} />

        {/* Meetings */}
        <Route path="/list_meetings" element={<PrivateRoute><ListMeetings /></PrivateRoute>} />
        <Route path="/add_meetings" element={<PrivateRoute><AddMeetings /></PrivateRoute>} />
        <Route path="/edit_meetings" element={<PrivateRoute><EditMeetings /></PrivateRoute>} />
        <Route path="/view_meetings" element={<PrivateRoute><ViewMeetings /></PrivateRoute>} />

        {/* Promotion */}

        <Route path="/list_promotions" element={<PrivateRoute><ListPromotions /></PrivateRoute>} />
        <Route path="/add_promotions" element={<PrivateRoute><AddPromotions /></PrivateRoute>} />
        <Route path="/edit_promotions" element={<PrivateRoute><EditPromotions /></PrivateRoute>} />
        <Route path="/view_promotions" element={<PrivateRoute><ViewPromotion /></PrivateRoute>} />

        {/* Testimonials */}
        <Route path="/list_testimonials" element={<PrivateRoute><ListTestimonials /></PrivateRoute>} />
        <Route path="/add_testimonials" element={<PrivateRoute><AddTestimonials /></PrivateRoute>} />
        <Route path="/edit_testimonials" element={<PrivateRoute><EditTestimonials /></PrivateRoute>} />
        <Route path="/view_testimonials" element={<PrivateRoute><ViewTestimonials /></PrivateRoute>} />

        {/* Blog    */}
        <Route path="/list_blog" element={<PrivateRoute><ListBlog /></PrivateRoute>} />
        <Route path="/add_blog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
        <Route path="/edit_blog" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
        <Route path="/view_blog" element={<PrivateRoute><ViewBlog /></PrivateRoute>} />

        {/* Chat */}
        <Route path="/list_chat" element={<PrivateRoute><ListChat /></PrivateRoute>} />
        <Route path="/add_chat" element={<PrivateRoute><AddChat /></PrivateRoute>} />
        <Route path="/add_chat" element={<PrivateRoute><EditChat /></PrivateRoute>} />
        <Route path="/edit_chat" element={<PrivateRoute><ViewChat /></PrivateRoute>} />

        {/* Bookings */}
        <Route path="/list_bookings" element={<PrivateRoute><ListBookings /></PrivateRoute>} />
        <Route path="/add_bookings" element={<PrivateRoute><AddBookings /></PrivateRoute>} />
        <Route path="/edit_bookings" element={<PrivateRoute><EditBookings /></PrivateRoute>} />
        <Route path="/view_bookings" element={<PrivateRoute><ViewBookings /></PrivateRoute>} />

        {/* Class Schedule */}
        <Route path="/list_class_schedule" element={<PrivateRoute><ListClassSchedule /></PrivateRoute>} />
        <Route path="/add_class_schedule" element={<PrivateRoute><AddClassSchedule /></PrivateRoute>} />
        <Route path="/edit_class_schedule" element={<PrivateRoute><EditClassSchedule /></PrivateRoute>} />
        <Route path="/view_class_schedule" element={<PrivateRoute><ViewClassSchedule /></PrivateRoute>} />

        {/* Email */}
        <Route path="/list_email" element={<PrivateRoute><ListEmail /></PrivateRoute>} />
        <Route path="/add_email" element={<PrivateRoute><AddEmail /></PrivateRoute>} />
        <Route path="/edit_email" element={<PrivateRoute><EditEmail /></PrivateRoute>} />
        <Route path="/view_email" element={<PrivateRoute><ViewEmail /></PrivateRoute>} />

        {/* Expenses */}
        <Route path="/list_expenses" element={<PrivateRoute><ListExpenses /></PrivateRoute>} />
        <Route path="/add_expenses" element={<PrivateRoute><AddExpenses /></PrivateRoute>} />
        <Route path="/edit_expenses" element={<PrivateRoute><EditExpenses /></PrivateRoute>} />
        <Route path="/view_expenses" element={<PrivateRoute><ViewExpenses /></PrivateRoute>} />

        {/* Income */}
        <Route path="/list_income" element={<PrivateRoute><ListIncome /></PrivateRoute>} />
        <Route path="/add_income" element={<PrivateRoute><AddIncome /></PrivateRoute>} />
        <Route path="/edit_income" element={<PrivateRoute><EditIncome /></PrivateRoute>} />
        <Route path="/view_income" element={<PrivateRoute><ViewIncome /></PrivateRoute>} />


        {/* Income Report */}
        <Route path="/list_income_report" element={<PrivateRoute><ListIncomeReport /></PrivateRoute>} />
        <Route path="/add_income_report" element={<PrivateRoute><AddIncomeReport /></PrivateRoute>} />
        <Route path="/edit_income_report" element={<PrivateRoute><EditIncomeReport /></PrivateRoute>} />
        <Route path="/view_income_report" element={<PrivateRoute><ViewIncomeReport /></PrivateRoute>} />

        {/* Raise Quotations */}
        <Route path="/list_raisequotations" element={<PrivateRoute><ListQuotations /></PrivateRoute>} />
        <Route path="/add_raisequotations" element={<PrivateRoute><AddQuotations /></PrivateRoute>} />
        <Route path="/edit_raisequotations" element={<PrivateRoute><EditQuotations /></PrivateRoute>} />
        <Route path="/view_raisequotations" element={<PrivateRoute><ViewQuotations /></PrivateRoute>} />

        {/* Attendance */}
        <Route path="/list_attendance" element={<PrivateRoute><ListAttendance /></PrivateRoute>} />
        <Route path="/add_attendance" element={<PrivateRoute><AddAttendance /></PrivateRoute>} />
        <Route path="/edit_attendance" element={<PrivateRoute><EditAttendance /></PrivateRoute>} />
        <Route path="/view_attendance" element={<PrivateRoute><ViewAttendance /></PrivateRoute>} />

        {/* KPI */}
        <Route path="/list_kpi" element={<PrivateRoute><ListKPI /></PrivateRoute>} />
        <Route path="/add_kpi" element={<PrivateRoute><AddKPI /></PrivateRoute>} />
        <Route path="/edit_kpi" element={<PrivateRoute><EditKPI /></PrivateRoute>} />
        <Route path="/view_kpi" element={<PrivateRoute><ViewKPI /></PrivateRoute>} />

        {/* Leave */}
        <Route path="/list_leave" element={<PrivateRoute><ListLeave /></PrivateRoute>} />
        <Route path="/add_leave" element={<PrivateRoute><AddLeave /></PrivateRoute>} />
        <Route path="/edit_leave" element={<PrivateRoute><EditLeave /></PrivateRoute>} />
        <Route path="/view_leave" element={<PrivateRoute><ViewLeave /></PrivateRoute>} />





        {/* Payroll */}
        <Route path="/list_payroll" element={<PrivateRoute><ListPayroll /></PrivateRoute>} />
        <Route path="/add_payroll" element={<PrivateRoute><AddPayroll /></PrivateRoute>} />
        <Route path="/edit_payroll" element={<PrivateRoute><EditPayroll /></PrivateRoute>} />
        <Route path="/view_payroll" element={<PrivateRoute><ViewPayroll /></PrivateRoute>} />

        {/* Performance Report */}
        <Route path="/list_performance_report" element={<PrivateRoute><ListPeformanceReport /></PrivateRoute>} />
        <Route path="/add_performance_report" element={<PrivateRoute><AddPeformanceReport /></PrivateRoute>} />
        <Route path="/edit_performance_report" element={<PrivateRoute><EditPeformanceReport /></PrivateRoute>} />
        <Route path="/view_performance_report" element={<PrivateRoute><ViewPeformanceReport /></PrivateRoute>} />


        {/* Policies */}
        <Route path="/list_policies" element={<PrivateRoute><ListPolicies /></PrivateRoute>} />
        <Route path="/add_policies" element={<PrivateRoute><Add /></PrivateRoute>} />
        <Route path="/edit_policies" element={<PrivateRoute><EditPolicies /></PrivateRoute>} />
        <Route path="/view_policies" element={<PrivateRoute><ViewPolicies /></PrivateRoute>} />

        {/* Staff Hrm */}
        <Route path="/list_hrms_staff" element={<PrivateRoute><ListHrmStaff /></PrivateRoute>} />
        <Route path="/add_hrms_staff" element={<PrivateRoute><AddHrmStaff /></PrivateRoute>} />
        <Route path="/edit_hrms_staff" element={<PrivateRoute><EditHrmStaff /></PrivateRoute>} />
        <Route path="/view_hrms_staff" element={<PrivateRoute><ViewHrmStaff /></PrivateRoute>} />


        {/* Project */}
        <Route path="/list_project" element={<PrivateRoute><ListProject /></PrivateRoute>} />
        <Route path="/add_project" element={<PrivateRoute><AddProject /></PrivateRoute>} />

        <Route path="/edit_project" element={<PrivateRoute><EditProject /></PrivateRoute>} />

        <Route path="/view_project" element={<PrivateRoute><ViewProject /></PrivateRoute>} />


        {/* Task */}
        <Route path="/list_task" element={<PrivateRoute><ListTask /></PrivateRoute>} />
        <Route path="/add_task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/edit_task" element={<PrivateRoute><EditTask /></PrivateRoute>} />
        <Route path="/view_task" element={<PrivateRoute><ViewTask /></PrivateRoute>} />


        {/* facebook */}

        <Route path="/list_facebook" element={<PrivateRoute><ListFacebook/></PrivateRoute>}/>
        <Route path="/add_facebook" element={<PrivateRoute><AddFacebook/></PrivateRoute>}/>
        <Route path="/edit_facebook" element={<PrivateRoute><EditFacebook/></PrivateRoute>}/>
        <Route path="/view_facebook" element={<PrivateRoute><ViewFacebook/></PrivateRoute>}/>

        {/* LinkedIn */}

        <Route path="/list_linkedin" element={<PrivateRoute><ListLinkedIn/></PrivateRoute>}/>
        <Route path="/add_linkedin" element={<PrivateRoute><AddLinkedIn/></PrivateRoute>}/>
        <Route path="/edit_llinkedin" element={<PrivateRoute><EditLinkedIn/></PrivateRoute>}/>
        <Route path="/view_linkedin" element={<PrivateRoute><ViewLinkedIn/></PrivateRoute>}/>

      {/* Instagram */}
        <Route path="/list_instagram" element={<PrivateRoute><ListInstagram/></PrivateRoute>}/>
        <Route path="/add_instagram" element={<PrivateRoute><AddInstagram/></PrivateRoute>}/>
        <Route path="/edit_instagram" element={<PrivateRoute><EditInstagram/></PrivateRoute>}/>
        <Route path="/view_instagram" element={<PrivateRoute><ViewInstagram/></PrivateRoute>}/>



      </Routes>

    </div>
  );
}
export default SuperAdmin;
