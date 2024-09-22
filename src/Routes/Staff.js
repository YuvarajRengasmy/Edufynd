import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
import Country from "../Staff/University/Country";
import AddUniversity from "../Staff/University/addUniversity";
import ListUniversity from "../Staff/University/ListUniversity";
import ViewUniversity from "../Staff/University/viewUniversity";
import EditUniversity from "../Staff/University/editUniversity";
import ViewProgram from "../Staff/Program/ViewProgram";
import Privilages from "../Staff/Settings/privilehes";
import ListStudent from "../Staff/Students/listStudent";
import AddStudentSA from "../Staff/Students/addStudent";
import ViewStudent from "../Staff/Students/viewStudent";
import Editstudent from "../Staff/Students/editStudent";

import EnquiryStudent from "../Staff/Students/enquiryStudent";
import AddAgent from "../Staff/Agnent/addAgent";
import ListAgent from "../Staff/Agnent/ListAgent";
import Program from "../Staff/Program/Programs";
import ViewAgent from "../Staff/Agnent/viewAgent";
import EditAgent from "../Staff/Agnent/editAgent";


import AddProgram from "../Staff/Program/addProgram";
import EditProgram from "../Staff/Program/editProgram";
import DashboardSA from "../Staff/DashBoard/HeroBox";
// Client
import AddClient from "../Staff/client/addclient";
import ListClient from "../Staff/client/ListClient";
import ViewClient from "../Staff/client/ViewClient";
import EditClient from "../Staff/client/Edit";
import GlobalSettings from "../Staff/Settings/GlobalSettings";
import CurrencySettings from "../Staff/Settings/currencySetting";
import UniversitySettings from "../Staff/Settings/universityModule";
import BlogSetting from "../Staff/Settings/blogSettings";
import SourseSettings from "../Staff/Settings/source";
import ProgramModule from "../Staff/Settings/programModule";
import ClientModule from "../Staff/Settings/clientModule";
import Status from "../Staff/Settings/Status";
import Intake from "../Staff/Settings/intake";
import Year from "../Staff/Settings/Year";

import ListApplication from "../Staff/Application/ListApplication";
import ListStaff from "../Staff/Staff/listStaff";
import AddStaff from "../Staff/Staff/addStaff";
import EditStaff from "../Staff/Staff/editStaff";
import ViewStaff from "../Staff/Staff/viewStaff";



import ViewApplication from "../Staff/Application/ViewAppliaction";

import ApplyJob from "../Students/Program/ApplyProgram";
import Listinvoice from "../Staff/Invoices/Listinvoice";
import Editinvoice from "../Staff/Invoices/Editinvoice";
import Viewinvoice from "../Staff/Invoices/Viewinvoice";
import SenderViewinvoice from "../Staff/Invoices/ReciverViewInvoice";
import AddSenderInvoice from "../Staff/Invoices/AddSenderInvoice";
import AddRecieverInvoice from "../Staff/Invoices/AddRecieverInvoice";
import AddApplication from "../Staff/Application/AddApplication";
import EditApplication from "../Staff/Application/EditApplication";
import AddCommission from "../Staff/commission/addCommission";
import EditCommission from "../Staff/commission/EditComission";
import ViewComission from "../Staff/commission/ViewComission";
import ListCommission from "../Staff/commission/ListCommission";
import { ListNotifications } from "../Staff/Notifications/ListNotifications";
import EditNotifications from "../Staff/Notifications/EditNotifications";
import AddNotifications from "../Staff/Notifications/AddNotifications";
import ViewNotifications from "../Staff/Notifications/ViewNotifications";
import ListTraining from "../Staff/Training/ListTraining";
import ListTestimonials from "../Staff/Testimonials/ListTestimonials";
import ListPromotions from "../Staff/Promotion/ListPromotions";
import ListMeetings from "../Staff/Meetings/ListMeetings";
import ListEvents from "../Staff/Events/ListEvents";
import AddEvents from "../Staff/Events/AddEvents";
import EditEvents from "../Staff/Events/EditEvents";
import AddMeetings from "../Staff/Meetings/AddMeetings";
import EditMeetings from "../Staff/Meetings/EditMeetings";
import AddPromotions from "../Staff/Promotion/AddPromotions";
import EditPromotions from "../Staff/Promotion/EditPromotions";
import AddTestimonials from "../Staff/Testimonials/AddTestimonials";
import EditTestimonials from "../Staff/Testimonials/EditTestimonials";
import AddTraining from "../Staff/Training/AddTraining";
import EditTraining from "../Staff/Training/EditTraining";
import ViewTraining from "../Staff/Training/ViewTraining";
import ViewEvents from "../Staff/Events/ViewEvents";
import ViewMeetings from "../Staff/Meetings/ViewMeetings";
import ViewPromotion from "../Staff/Promotion/ViewPromotion";
import ViewTestimonials from "../Staff/Testimonials/ViewTestimonials";

import AddSocialMedia from "../Staff/Marketing/SocialMedia/AddSocialMedia";
import EditSocialMedia from "../Staff/Marketing/SocialMedia/EditSocialMedia";
import ListSocialMedia from "../Staff/Marketing/SocialMedia/ListSocialMedia";
import ViewSocialMedia from "../Staff/Marketing/SocialMedia/ViewSocialMedia";

import AddFacebook from "../Staff/Marketing/SocialMedia/Facebook/AddFaceBook";
import EditFacebook from "../Staff/Marketing/SocialMedia/Facebook/EditFaceBook";
import ListFacebook from "../Staff/Marketing/SocialMedia/Facebook/ListFacebook";
import ViewFacebook from "../Staff/Marketing/SocialMedia/Facebook/ViewFaceBook";

import AddLinkedIn from "../Staff/Marketing/SocialMedia/Linkedin/AddLinkedin";
import EditLinkedIn from "../Staff/Marketing/SocialMedia/Linkedin/EditLinkedin";
import ListLinkedIn from "../Staff/Marketing/SocialMedia/Linkedin/ListLinkedin";
import ViewLinkedIn from "../Staff/Marketing/SocialMedia/Linkedin/ViewLinkedin";

import AddInstagram from "../Staff/Marketing/SocialMedia/Instagram/AddInstagram";
import EditInstagram from "../Staff/Marketing/SocialMedia/Instagram/EditInstagram";
import ListInstagram from "../Staff/Marketing/SocialMedia/Instagram/ListInstagram";
import ViewInstagram from "../Staff/Marketing/SocialMedia/Instagram/ViewInstagram";


import ListCampaign from "../Staff/Marketing/Campaign/ListCampaign";
import AddCampaign from "../Staff/Marketing/Campaign/AddCampaign";
import EditCampaign from "../Staff/Marketing/Campaign/EditCampaign";
import ViewCampaign from "../Staff/Marketing/Campaign/ViewCampaign";

import ListDailyTask from "../Staff/Marketing/DailyTask/ListDailyTask";
import EditDailyTask from "../Staff/Marketing/DailyTask/EditDailyTask";
import AddDailyTask from "../Staff/Marketing/DailyTask/AddDailyTask";
import ViewDailyTask from "../Staff/Marketing/DailyTask/ViewDailyTask";


import ListBlog from "../Staff/Blog/ListBlog";
import AddBlog from "../Staff/Blog/AddBlog";
import ViewBlog from "../Staff/Blog/ViewBlog";
import EditBlog from "../Staff/Blog/EditBlog";


import ListChat from "../Staff/Chat/ListChat";
import AddChat from "../Staff/Chat/AddChat";
import EditChat from "../Staff/Chat/EditChat";
import ViewChat from "../Staff/Chat/ViewChat";
import StatusModule from "../Staff/Settings/University/ApplicationStatus";


import ListBookings from "../Staff/ELT/Bookings/ListBookings";
import AddBookings from "../Staff/ELT/Bookings/AddBookings";
import EditBookings from "../Staff/ELT/Bookings/EditBookings";
import ViewBookings from "../Staff/ELT/Bookings/ViewBookings";

import ListClassSchedule from "../Staff/ELT/Class Schedule/ListClassSchedule";
import AddClassSchedule from "../Staff/ELT/Class Schedule/AddClassSchedule";
import EditClassSchedule from "../Staff/ELT/Class Schedule/EditClassSchedule";
import ViewClassSchedule from "../Staff/ELT/Class Schedule/ViewClassSchedule";

import ListEmail from "../Staff/Email/ListEmail";
import ViewEmail from "../Staff/Email/ViewEmail";
import AddEmail from "../Staff/Email/AddEmail";
import EditEmail from "../Staff/Email/EditEmail";


import ListExpenses from "../Staff/Finance/Expenses/ListExpenses";
import AddExpenses from "../Staff/Finance/Expenses/AddExpenses";
import EditExpenses from "../Staff/Finance/Expenses/EditExpenses";
import ViewExpenses from "../Staff/Finance/Expenses/ViewExpenses";

import ListIncome from "../Staff/Finance/Income/ListIncome";
import AddIncome from "../Staff/Finance/Income/AddIncome";
import EditIncome from "../Staff/Finance/Income/EditIncome";
import ViewIncome from "../Staff/Finance/Income/ViewIncome";

import ListIncomeReport from "../Staff/Finance/Income Report/ListIncomereport";
import AddIncomeReport from "../Staff/Finance/Income Report/AddIncomeReport";
import EditIncomeReport from "../Staff/Finance/Income Report/EditIncomeReport";
import ViewIncomeReport from "../Staff/Finance/Income Report/ViewIncomeReport";

import ListQuotations from "../Staff/Finance/Raise Quotations/ListQuottions";
import AddQuotations from "../Staff/Finance/Raise Quotations/AddQuotation";
import EditQuotations from "../Staff/Finance/Raise Quotations/EditQuotation";
import ViewQuotations from "../Staff/Finance/Raise Quotations/ViewQuotation";

import ListAttendance from "../Staff/HRMS/Attendance/ListAttendance";
import AddAttendance from "../Staff/HRMS/Attendance/AddAttendance";
import EditAttendance from "../Staff/HRMS/Attendance/EditAttendance";
import ViewAttendance from "../Staff/HRMS/Attendance/ViewAttendance";

import ListKPI from "../Staff/HRMS/KPI/ListKPI";
import AddKPI from "../Staff/HRMS/KPI/AddKPI";
import EditKPI from "../Staff/HRMS/KPI/EditKPI";
import ViewKPI from "../Staff/HRMS/KPI/ViewKPI";

import ListLeave from "../Staff/HRMS/Leave/ListLeave";
import AddLeave from "../Staff/HRMS/Leave/AddLeave";
import EditLeave from "../Staff/HRMS/Leave/EditLeave";
import ViewLeave from "../Staff/HRMS/Leave/ViewLeave";

import ListPayroll from "../Staff/HRMS/Payroll/ListPayroll";
import AddPayroll from "../Staff/HRMS/Payroll/AddPayroll";
import EditPayroll from "../Staff/HRMS/Payroll/EditPayroll";
import ViewPayroll from "../Staff/HRMS/Payroll/ViewPayroll";

import ListPeformanceReport from "../Staff/HRMS/Performance Report/ListPerformanceReport";
import AddPeformanceReport from "../Staff/HRMS/Performance Report/AddPerformanceReport";
import EditPeformanceReport from "../Staff/HRMS/Performance Report/EditPerformanceReports";
import ViewPeformanceReport from "../Staff/HRMS/Performance Report/ViewPerformanceReports";

import ListPolicies from "../Staff/HRMS/Policies/ListPolicies";
import Add from "../Staff/HRMS/Policies/AddPolicies";
import EditPolicies from "../Staff/HRMS/Policies/EditPolicies";
import ViewPolicies from "../Staff/HRMS/Policies/ViewPolicies";

import ListHrmStaff from "../Staff/HRMS/Staff/ListHrmStaff";
import AddHrmStaff from "../Staff/HRMS/Staff/ListHrmStaff";
import EditHrmStaff from "../Staff/HRMS/Staff/ListHrmStaff";
import ViewHrmStaff from "../Staff/HRMS/Staff/ListHrmStaff";


import ListProject from "../Staff/Project & Task/Project/ListProject";
import AddProject from "../Staff/Project & Task/Project/AddProject";
import EditProject from "../Staff/Project & Task/Project/EditProject";
import ViewProject from "../Staff/Project & Task/Project/ViewProject";

import ListTask from "../Staff/Project & Task/Task/ListTask";
import AddTask from "../Staff/Project & Task/Task/AddTask";
import EditTask from "../Staff/Project & Task/Task/EditTask";
import ViewTask from "../Staff/Project & Task/Task/ViewTask";


import GlobalSearch from "../Staff/Search/GlobalSearch";

import Countrys from '../Staff/Settings/GlobalSetting/country'

function SuperAdmin() {
  return (
    <div>

      <Routes>
        <Route path="/staff_Demo" element={<PrivateRoute><Country /></PrivateRoute>} />
        <Route path="/staff_ApplyJob" element={<PrivateRoute><ApplyJob /></PrivateRoute>} />
        <Route path="/staff_Search" element={<PrivateRoute><GlobalSearch /></PrivateRoute>} />
        
        {/* Settings */}
       
        <Route path="/staff_global_settings" element={<PrivateRoute><GlobalSettings /></PrivateRoute>} />
        <Route path="/staff_currency_settings" element={<PrivateRoute><CurrencySettings /></PrivateRoute>} />
        <Route path="/staff_university_settings" element={<PrivateRoute><UniversitySettings /></PrivateRoute>} />
        <Route path="/staff_blog_setting" element={<PrivateRoute><BlogSetting/></PrivateRoute>} />


        <Route path="/staff_course_type" element={<PrivateRoute><ProgramModule /></PrivateRoute>} />
        <Route path="/staff_client_module" element={<PrivateRoute><ClientModule /></PrivateRoute>} />
        <Route path="/staff_status" element={<PrivateRoute><Status /></PrivateRoute>} />
        <Route path="/staff_intake" element={<PrivateRoute><Intake /></PrivateRoute>} />
        <Route path="/staff_year_setting" element={<PrivateRoute><Year /></PrivateRoute>} />
        <Route path="/staff_application_status" element={<PrivateRoute><StatusModule/></PrivateRoute>} />
        <Route path="/staff_source" element={<PrivateRoute><SourseSettings /></PrivateRoute>} />

        {/* DashBoard */}
        <Route path="/staff_dashboard" element={<PrivateRoute><DashboardSA /></PrivateRoute>} />

        {/* University */}
        <Route path="/staff_add_university" element={<PrivateRoute><AddUniversity /></PrivateRoute>} />
        <Route path="/staff_list_university" element={<PrivateRoute><ListUniversity /></PrivateRoute>} />
        <Route path="/staff_view_university" element={<PrivateRoute><ViewUniversity /></PrivateRoute>} />
        <Route path="/staff_edit_university" element={<PrivateRoute><EditUniversity /></PrivateRoute>} />
      

        {/* Program */}
        <Route path="/staff_view_program" element={<PrivateRoute><ViewProgram /></PrivateRoute>} />
        <Route path="/staff_list_program" element={<PrivateRoute><Program /></PrivateRoute>} />
        <Route path="/staff_add_program" element={<PrivateRoute><AddProgram /></PrivateRoute>} />
        <Route path="/staff_edit_program" element={<PrivateRoute><EditProgram /></PrivateRoute>} />

        {/* Students */}
        <Route path="/staff_list_student" element={<PrivateRoute><ListStudent /></PrivateRoute>} />
        <Route path="/staff_add_student" element={<PrivateRoute><AddStudentSA /></PrivateRoute>} />
        <Route path="/staff_view_student" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
        <Route path="/staff_edit_student" element={<PrivateRoute><Editstudent /></PrivateRoute>} />
        <Route path="/staff_enquiry_student" element={<PrivateRoute><EnquiryStudent /></PrivateRoute>} />

        {/* Agent */}
        <Route path="/staff_add_agent" element={<PrivateRoute><AddAgent /></PrivateRoute>} />
        <Route path="/staff_list_agent" element={<PrivateRoute><ListAgent /></PrivateRoute>} />
        <Route path="/staff_view_agent" element={<PrivateRoute><ViewAgent /></PrivateRoute>} />
        <Route path="/staff_edit_agent" element={<PrivateRoute><EditAgent /></PrivateRoute>} />

       

        {/* Client */}
        <Route path="/staff_add_client" element={<PrivateRoute><AddClient /></PrivateRoute>} />
        <Route path="/staff_list_client" element={<PrivateRoute><ListClient /></PrivateRoute>} />
        <Route path="/staff_edit_client" element={<PrivateRoute><EditClient /></PrivateRoute>} />
        <Route path="/staff_view_client" element={<PrivateRoute><ViewClient /></PrivateRoute>} />

        {/* Application */}
        <Route path="/staff_list_application" element={<PrivateRoute><ListApplication /></PrivateRoute>} />
      
        <Route path="/staff_add_application" element={<PrivateRoute><AddApplication /></PrivateRoute>} />
        <Route path="/staff_edit_application" element={<PrivateRoute><EditApplication /></PrivateRoute>} />
        <Route path="/staff_view_application" element={<PrivateRoute><ViewApplication /></PrivateRoute>} />

        {/* Staff */}
        <Route path="/staff_list_staff" element={<PrivateRoute><ListStaff /></PrivateRoute>} />
        <Route path="/staff_add_staff" element={<PrivateRoute><AddStaff /></PrivateRoute>} />
        <Route path="/staff_edit_staff" element={<PrivateRoute><EditStaff /></PrivateRoute>} />
        <Route path="/staff_view_staff" element={<PrivateRoute><ViewStaff /></PrivateRoute>} />

        {/* Invoices */}
        <Route path="/staff_list_invoice" element={<PrivateRoute><Listinvoice /></PrivateRoute>} />
        <Route path="/staff_add_sender_invoice" element={<PrivateRoute><AddSenderInvoice /></PrivateRoute>} />
        <Route path="/staff_add_reciever_invoice" element={<PrivateRoute><AddRecieverInvoice /></PrivateRoute>} />
        <Route path="/staff_edit_invoice" element={<PrivateRoute><Editinvoice /></PrivateRoute>} />
        <Route path="/staff_view_invoice" element={<PrivateRoute><Viewinvoice /></PrivateRoute>} />
        <Route path="/staff_view_sender_invoice" element={<PrivateRoute><SenderViewinvoice /></PrivateRoute>} />

        {/* Commission */}
        <Route path="/staff_add_commission" element={<PrivateRoute><AddCommission /></PrivateRoute>} />
        <Route path="/staff_edit_commission" element={<PrivateRoute><EditCommission /></PrivateRoute>} />
        <Route path="/staff_view_commission" element={<PrivateRoute><ViewComission /></PrivateRoute>} />
        <Route path="/staff_list_commission" element={<PrivateRoute><ListCommission /></PrivateRoute>} />

        {/* Notifications */}
        <Route path="/staff_list_notifications" element={<PrivateRoute><ListNotifications /></PrivateRoute>} />
        <Route path="/staff_edit_notifications" element={<PrivateRoute><EditNotifications /></PrivateRoute>} />
        <Route path="/staff_add_notifications" element={<PrivateRoute><AddNotifications /></PrivateRoute>} />
        <Route path="/staff_view_notifications" element={<PrivateRoute><ViewNotifications /></PrivateRoute>} />

        {/* Training */}
        <Route path="/staff_list_training" element={<PrivateRoute><ListTraining /></PrivateRoute>} />
        <Route path="/staff_add_training" element={<PrivateRoute><AddTraining /></PrivateRoute>} />
        <Route path="/staff_edit_training" element={<PrivateRoute><EditTraining /></PrivateRoute>} />
        <Route path="/staff_view_training" element={<PrivateRoute><ViewTraining /></PrivateRoute>} />

        {/* Events */}
        <Route path="/staff_list_events" element={<PrivateRoute><ListEvents /></PrivateRoute>} />
        <Route path="/staff_add_events" element={<PrivateRoute><AddEvents /></PrivateRoute>} />
        <Route path="/staff_edit_events" element={<PrivateRoute><EditEvents /></PrivateRoute>} />
        <Route path="/staff_view_events" element={<PrivateRoute><ViewEvents /></PrivateRoute>} />

        {/* SocialMedia */}
        <Route path="/staff_add_social_media" element={<PrivateRoute><AddSocialMedia /></PrivateRoute>} />
        <Route path="/staff_edit_social_media" element={<PrivateRoute><EditSocialMedia /></PrivateRoute>} />
        <Route path="/staff_list_social_media" element={<PrivateRoute><ListSocialMedia /></PrivateRoute>} />
        <Route path="/staff_view_social_media" element={<PrivateRoute><ViewSocialMedia /></PrivateRoute>} />

       

        {/* Campaign */}
        <Route path="/staff_list_campaign" element={<PrivateRoute><ListCampaign /></PrivateRoute>} />
        <Route path="/staff_add_campaign" element={<PrivateRoute><AddCampaign /></PrivateRoute>} />
        <Route path="/staff_edit_campaign" element={<PrivateRoute><EditCampaign /></PrivateRoute>} />
        <Route path="/staff_view_campaign" element={<PrivateRoute><ViewCampaign /></PrivateRoute>} />

        {/* DailyTask */}
        <Route path="/staff_list_daily_task" element={<PrivateRoute><ListDailyTask /></PrivateRoute>} />
        <Route path="/staff_edit_daily_task" element={<PrivateRoute><EditDailyTask /></PrivateRoute>} />
        <Route path="/staff_add_daily_task" element={<PrivateRoute><AddDailyTask /></PrivateRoute>} />
        <Route path="/staff_view_daily_task" element={<PrivateRoute><ViewDailyTask /></PrivateRoute>} />

        {/* Meetings */}
        <Route path="/staff_list_meetings" element={<PrivateRoute><ListMeetings /></PrivateRoute>} />
        <Route path="/staff_add_meetings" element={<PrivateRoute><AddMeetings /></PrivateRoute>} />
        <Route path="/staff_edit_meetings" element={<PrivateRoute><EditMeetings /></PrivateRoute>} />
        <Route path="/staff_view_meetings" element={<PrivateRoute><ViewMeetings /></PrivateRoute>} />

        {/* Promotion */}

        <Route path="/staff_list_promotions" element={<PrivateRoute><ListPromotions /></PrivateRoute>} />
        <Route path="/staff_add_promotions" element={<PrivateRoute><AddPromotions /></PrivateRoute>} />
        <Route path="/staff_edit_promotions" element={<PrivateRoute><EditPromotions /></PrivateRoute>} />
        <Route path="/staff_view_promotions" element={<PrivateRoute><ViewPromotion /></PrivateRoute>} />

        {/* Testimonials */}
        <Route path="/staff_list_testimonials" element={<PrivateRoute><ListTestimonials /></PrivateRoute>} />
        <Route path="/staff_add_testimonials" element={<PrivateRoute><AddTestimonials /></PrivateRoute>} />
        <Route path="/staff_edit_testimonials" element={<PrivateRoute><EditTestimonials /></PrivateRoute>} />
        <Route path="/staff_view_testimonials" element={<PrivateRoute><ViewTestimonials /></PrivateRoute>} />

        {/* Blog    */}
        <Route path="/staff_list_blog" element={<PrivateRoute><ListBlog /></PrivateRoute>} />
        <Route path="/staff_add_blog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
        <Route path="/staff_edit_blog" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
        <Route path="/staff_view_blog" element={<PrivateRoute><ViewBlog /></PrivateRoute>} />

        {/* Chat */}
        <Route path="/staff_list_chat" element={<PrivateRoute><ListChat /></PrivateRoute>} />
        <Route path="/staff_add_chat" element={<PrivateRoute><AddChat /></PrivateRoute>} />
        <Route path="/staff_add_chat" element={<PrivateRoute><EditChat /></PrivateRoute>} />
        <Route path="/staff_edit_chat" element={<PrivateRoute><ViewChat /></PrivateRoute>} />

        {/* Bookings */}
        <Route path="/staff_list_bookings" element={<PrivateRoute><ListBookings /></PrivateRoute>} />
        <Route path="/staff_add_bookings" element={<PrivateRoute><AddBookings /></PrivateRoute>} />
        <Route path="/staff_edit_bookings" element={<PrivateRoute><EditBookings /></PrivateRoute>} />
        <Route path="/staff_view_bookings" element={<PrivateRoute><ViewBookings /></PrivateRoute>} />

        {/* Class Schedule */}
        <Route path="/staff_list_class_schedule" element={<PrivateRoute><ListClassSchedule /></PrivateRoute>} />
        <Route path="/staff_add_class_schedule" element={<PrivateRoute><AddClassSchedule /></PrivateRoute>} />
        <Route path="/staff_edit_class_schedule" element={<PrivateRoute><EditClassSchedule /></PrivateRoute>} />
        <Route path="/staff_view_class_schedule" element={<PrivateRoute><ViewClassSchedule /></PrivateRoute>} />

        {/* Email */}
        <Route path="/staff_list_email" element={<PrivateRoute><ListEmail /></PrivateRoute>} />
        <Route path="/staff_add_email" element={<PrivateRoute><AddEmail /></PrivateRoute>} />
        <Route path="/staff_edit_email" element={<PrivateRoute><EditEmail /></PrivateRoute>} />
        <Route path="/staff_view_email" element={<PrivateRoute><ViewEmail /></PrivateRoute>} />

        {/* Expenses */}
        <Route path="/staff_list_expenses" element={<PrivateRoute><ListExpenses /></PrivateRoute>} />
        <Route path="/staff_add_expenses" element={<PrivateRoute><AddExpenses /></PrivateRoute>} />
        <Route path="/staff_edit_expenses" element={<PrivateRoute><EditExpenses /></PrivateRoute>} />
        <Route path="/staff_view_expenses" element={<PrivateRoute><ViewExpenses /></PrivateRoute>} />

        {/* Income */}
        <Route path="/staff_list_income" element={<PrivateRoute><ListIncome /></PrivateRoute>} />
        <Route path="/staff_add_income" element={<PrivateRoute><AddIncome /></PrivateRoute>} />
        <Route path="/staff_edit_income" element={<PrivateRoute><EditIncome /></PrivateRoute>} />
        <Route path="/staff_view_income" element={<PrivateRoute><ViewIncome /></PrivateRoute>} />


        {/* Income Report */}
        <Route path="/staff_list_income_report" element={<PrivateRoute><ListIncomeReport /></PrivateRoute>} />
        <Route path="/staff_add_income_report" element={<PrivateRoute><AddIncomeReport /></PrivateRoute>} />
        <Route path="/staff_edit_income_report" element={<PrivateRoute><EditIncomeReport /></PrivateRoute>} />
        <Route path="/staff_view_income_report" element={<PrivateRoute><ViewIncomeReport /></PrivateRoute>} />

        {/* Raise Quotations */}
        <Route path="/staff_list_raisequotations" element={<PrivateRoute><ListQuotations /></PrivateRoute>} />
        <Route path="/staff_add_raisequotations" element={<PrivateRoute><AddQuotations /></PrivateRoute>} />
        <Route path="/staff_edit_raisequotations" element={<PrivateRoute><EditQuotations /></PrivateRoute>} />
        <Route path="/staff_view_raisequotations" element={<PrivateRoute><ViewQuotations /></PrivateRoute>} />

        {/* Attendance */}
        <Route path="/staff_list_attendance" element={<PrivateRoute><ListAttendance /></PrivateRoute>} />
        <Route path="/staff_add_attendance" element={<PrivateRoute><AddAttendance /></PrivateRoute>} />
        <Route path="/staff_edit_attendance" element={<PrivateRoute><EditAttendance /></PrivateRoute>} />
        <Route path="/staff_view_attendance" element={<PrivateRoute><ViewAttendance /></PrivateRoute>} />

        {/* KPI */}
        <Route path="/staff_list_kpi" element={<PrivateRoute><ListKPI /></PrivateRoute>} />
        <Route path="/staff_add_kpi" element={<PrivateRoute><AddKPI /></PrivateRoute>} />
        <Route path="/staff_edit_kpi" element={<PrivateRoute><EditKPI /></PrivateRoute>} />
        <Route path="/staff_view_kpi" element={<PrivateRoute><ViewKPI /></PrivateRoute>} />

        {/* Leave */}
        <Route path="/staff_list_leave" element={<PrivateRoute><ListLeave /></PrivateRoute>} />
        <Route path="/staff_add_leave" element={<PrivateRoute><AddLeave /></PrivateRoute>} />
        <Route path="/staff_edit_leave" element={<PrivateRoute><EditLeave /></PrivateRoute>} />
        <Route path="/staff_view_leave" element={<PrivateRoute><ViewLeave /></PrivateRoute>} />





        {/* Payroll */}
        <Route path="/staff_list_payroll" element={<PrivateRoute><ListPayroll /></PrivateRoute>} />
        <Route path="/staff_add_payroll" element={<PrivateRoute><AddPayroll /></PrivateRoute>} />
        <Route path="/staff_edit_payroll" element={<PrivateRoute><EditPayroll /></PrivateRoute>} />
        <Route path="/staff_view_payroll" element={<PrivateRoute><ViewPayroll /></PrivateRoute>} />

        {/* Performance Report */}
        <Route path="/staff_list_performance_report" element={<PrivateRoute><ListPeformanceReport /></PrivateRoute>} />
        <Route path="/staff_add_performance_report" element={<PrivateRoute><AddPeformanceReport /></PrivateRoute>} />
        <Route path="/staff_edit_performance_report" element={<PrivateRoute><EditPeformanceReport /></PrivateRoute>} />
        <Route path="/staff_view_performance_report" element={<PrivateRoute><ViewPeformanceReport /></PrivateRoute>} />


        {/* Policies */}
        <Route path="/staff_list_policies" element={<PrivateRoute><ListPolicies /></PrivateRoute>} />
        <Route path="/staff_add_policies" element={<PrivateRoute><Add /></PrivateRoute>} />
        <Route path="/staff_edit_policies" element={<PrivateRoute><EditPolicies /></PrivateRoute>} />
        <Route path="/staff_view_policies" element={<PrivateRoute><ViewPolicies /></PrivateRoute>} />

        {/* Staff Hrm */}
        <Route path="/staff_list_hrms_staff" element={<PrivateRoute><ListHrmStaff /></PrivateRoute>} />
        <Route path="/staff_add_hrms_staff" element={<PrivateRoute><AddHrmStaff /></PrivateRoute>} />
        <Route path="/staff_edit_hrms_staff" element={<PrivateRoute><EditHrmStaff /></PrivateRoute>} />
        <Route path="/staff_view_hrms_staff" element={<PrivateRoute><ViewHrmStaff /></PrivateRoute>} />


        {/* Project */}
        <Route path="/staff_list_project" element={<PrivateRoute><ListProject /></PrivateRoute>} />
        <Route path="/staff_add_project" element={<PrivateRoute><AddProject /></PrivateRoute>} />

        <Route path="/staff_edit_project" element={<PrivateRoute><EditProject /></PrivateRoute>} />

        <Route path="/staff_view_project" element={<PrivateRoute><ViewProject /></PrivateRoute>} />


        {/* Task */}
        <Route path="/staff_list_task" element={<PrivateRoute><ListTask /></PrivateRoute>} />
        <Route path="/staff_add_task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
        <Route path="/staff_edit_task" element={<PrivateRoute><EditTask /></PrivateRoute>} />
        <Route path="/staff_view_task" element={<PrivateRoute><ViewTask /></PrivateRoute>} />


        {/* facebook */}

        <Route path="/staff_list_facebook" element={<PrivateRoute><ListFacebook/></PrivateRoute>}/>
        <Route path="/staff_add_facebook" element={<PrivateRoute><AddFacebook/></PrivateRoute>}/>
        <Route path="/staff_edit_facebook" element={<PrivateRoute><EditFacebook/></PrivateRoute>}/>
        <Route path="/staff_view_facebook" element={<PrivateRoute><ViewFacebook/></PrivateRoute>}/>

        {/* LinkedIn */}

        <Route path="/staff_list_linkedin" element={<PrivateRoute><ListLinkedIn/></PrivateRoute>}/>
        <Route path="/staff_add_linkedin" element={<PrivateRoute><AddLinkedIn/></PrivateRoute>}/>
        <Route path="/staff_edit_llinkedin" element={<PrivateRoute><EditLinkedIn/></PrivateRoute>}/>
        <Route path="/staff_view_linkedin" element={<PrivateRoute><ViewLinkedIn/></PrivateRoute>}/>

      {/* Instagram */}
        <Route path="/staff_list_instagram" element={<PrivateRoute><ListInstagram/></PrivateRoute>}/>
        <Route path="/staff_add_instagram" element={<PrivateRoute><AddInstagram/></PrivateRoute>}/>
        <Route path="/staff_edit_instagram" element={<PrivateRoute><EditInstagram/></PrivateRoute>}/>
        <Route path="/staff_view_instagram" element={<PrivateRoute><ViewInstagram/></PrivateRoute>}/>
        <Route path="/staff_Privilages" element={<PrivateRoute><Privilages/></PrivateRoute>}/>

<Route path="/staff_countrys" element={<PrivateRoute><Countrys/></PrivateRoute>}/>
{/* <Route path="*" element={<NotFound />} /> */}

      </Routes>

    </div>
  );
}
export default SuperAdmin;
