import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import DashboardSA from "../SuperAdmin/DashBoard/Home";
// Client
import AddClient from "../SuperAdmin/client/addclient";
import ListClient from "../SuperAdmin/client/ListClient";
import ViewClient from "../SuperAdmin/client/ViewClient";
import EditClient from "../SuperAdmin/client/Edit";
import GlobalSettings from "../SuperAdmin/Settings/GlobalSettings";
import CurrencySettings from "../SuperAdmin/Settings/currencySetting";
import UniversitySettings from "../SuperAdmin/Settings/universityModule";
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
import ViewUniversity1 from "../SuperAdmin/University/viewUniversity1";
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
import {ListChat}  from "../SuperAdmin/Chat/ListChat";
import AddChat  from "../SuperAdmin/Chat/AddChat";
import EditChat  from "../SuperAdmin/Chat/EditChat";
import ViewChat  from "../SuperAdmin/Chat/ViewChat";

import ListBookings from "../SuperAdmin/ELT/Bookings/ListBookings";
import AddBookings from "../SuperAdmin/ELT/Bookings/AddBookings";
import EditBookings from "../SuperAdmin/ELT/Bookings/EditBookings";
import ViewBookings from "../SuperAdmin/ELT/Bookings/ViewBookings";

import ListClassSchedule from "../SuperAdmin/ELT/Class Schedule/ListClassSchedule";
import AddClassSchedule from "../SuperAdmin/ELT/Class Schedule/AddClassSchedule";
import EditClassSchedule from "../SuperAdmin/ELT/Class Schedule/EditClassSchedule";
import  ViewClassSchedule from "../SuperAdmin/ELT/Class Schedule/ViewClassSchedule";

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
      <BrowserRouter>
        <Routes>
          <Route path="/Demo" element={<PrivateRoute><Country /></PrivateRoute>} />
          <Route path="/ApplyJob" element={<PrivateRoute><ApplyJob /></PrivateRoute>} />
          <Route path="/Just" element={<Just/>} />
          <Route path="/Search" element={<GlobalSearch />} />
          {/* Settings */}
          <Route path="/CountryList" element={<PrivateRoute><CountryList /></PrivateRoute>} />
          <Route path="/GlobalSettings" element={<PrivateRoute><GlobalSettings /></PrivateRoute>} />
          <Route path="/CurrencySettings" element={<PrivateRoute><CurrencySettings /></PrivateRoute>} />
          <Route path="/UniversitySettings" element={<PrivateRoute><UniversitySettings /></PrivateRoute>} />
          <Route path="/CourseType" element={<PrivateRoute><ProgramModule /></PrivateRoute>} />
          <Route path="/ClientModule" element={<PrivateRoute><ClientModule /></PrivateRoute>} />
          <Route path="/Status" element={<PrivateRoute><Status /></PrivateRoute>} />
          <Route path="/Intake" element={<PrivateRoute><Intake /></PrivateRoute>} />
          <Route path="/YearSetting" element={<PrivateRoute><Year /></PrivateRoute>} />

          {/* DashBoard */}
          <Route path="/DashBoard" element={<PrivateRoute><DashboardSA /></PrivateRoute>} />

          {/* University */}
          <Route path="/AddUniversity" element={<PrivateRoute><AddUniversity /></PrivateRoute>} />
          <Route path="/ListUniversity" element={<PrivateRoute><ListUniversity /></PrivateRoute>} />
          <Route path="/ViewUniversity" element={<PrivateRoute><ViewUniversity /></PrivateRoute>} />
          <Route path="/EditUniversity" element={<PrivateRoute><EditUniversity /></PrivateRoute>} />
          <Route path="/ViewUniversityPage" element={<PrivateRoute><ViewUniversity1 /></PrivateRoute>} />

          {/* Program */}
          <Route path="/ViewProgram" element={<PrivateRoute><ViewProgram /></PrivateRoute>} />
          <Route path="/Programs" element={<PrivateRoute><Program /></PrivateRoute>} />
          <Route path="/AddProgram" element={<PrivateRoute><AddProgram /></PrivateRoute>} />
          <Route path="/EditProgram" element={<PrivateRoute><EditProgram /></PrivateRoute>} />

          {/* Students */}
          <Route path="/ListStudent" element={<PrivateRoute><ListStudent /></PrivateRoute>} />
          <Route path="/AddStudentSA" element={<PrivateRoute><AddStudentSA /></PrivateRoute>} />
          <Route path="/ViewStudent" element={<PrivateRoute><ViewStudent /></PrivateRoute>} />
          <Route path="/EditStudent" element={<PrivateRoute><Editstudent /></PrivateRoute>} />

          {/* Agent */}
          <Route path="/AddAgent" element={<PrivateRoute><AddAgent /></PrivateRoute>} />
          <Route path="/ListAgent" element={<PrivateRoute><ListAgent /></PrivateRoute>} />
          <Route path="/ViewAgent" element={<PrivateRoute><ViewAgent /></PrivateRoute>} />
          <Route path="/EditAgent" element={<PrivateRoute><EditAgent /></PrivateRoute>} />

          {/* Admin */}
          <Route path="/AdminList" element={<PrivateRoute><AdminList /></PrivateRoute>} />
          <Route path="/AddAdmin" element={<PrivateRoute><AddAdmin /></PrivateRoute>} />
          <Route path="/EditAdmin" element={<PrivateRoute><EditAdmin /></PrivateRoute>} />
          <Route path="/ViewAdmin" element={<PrivateRoute><ViewAdmin /></PrivateRoute>} />

          {/* Client */}
          <Route path="/AddClient" element={<PrivateRoute><AddClient /></PrivateRoute>} />
          <Route path="/ListClient" element={<PrivateRoute><ListClient /></PrivateRoute>} />
          <Route path="/EditClient" element={<PrivateRoute><EditClient /></PrivateRoute>} />
          <Route path="/viewClient" element={<PrivateRoute><ViewClient /></PrivateRoute>} />

          {/* Application */}
          <Route path="/ListApplication" element={<PrivateRoute><ListApplication /></PrivateRoute>} />
          <Route path="/Application" element={<PrivateRoute><Application /></PrivateRoute>} />
          <Route path="/AddApplication" element={<PrivateRoute><AddApplication /></PrivateRoute>} />
          <Route path="/EditApplication" element={<PrivateRoute><EditApplication /></PrivateRoute>} />

          {/* Staff */}
          <Route path="/ListStaff" element={<PrivateRoute><ListStaff /></PrivateRoute>} />
          <Route path="/AddStaff" element={<PrivateRoute><AddStaff /></PrivateRoute>} />
          <Route path="/EditStaff" element={<PrivateRoute><EditStaff /></PrivateRoute>} />
          <Route path="/ViewStaff" element={<PrivateRoute><ViewStaff /></PrivateRoute>} />

          {/* Invoices */}
          <Route path="/ListInvoice" element={<PrivateRoute><Listinvoice /></PrivateRoute>} />
          <Route path="/AddSenderInvoice" element={<PrivateRoute><AddSenderInvoice /></PrivateRoute>} />
          <Route path="/AddRecieverInvoice" element={<PrivateRoute><AddRecieverInvoice /></PrivateRoute>} />
          <Route path="/EditInvoice" element={<PrivateRoute><Editinvoice /></PrivateRoute>} />
          <Route path="/ViewInvoice" element={<PrivateRoute><Viewinvoice /></PrivateRoute>} />
          <Route path="/SenderViewInvoice" element={<PrivateRoute><SenderViewinvoice /></PrivateRoute>} />

          {/* Commission */}
          <Route path="/AddCommission" element={<PrivateRoute><AddCommission /></PrivateRoute>} />
          <Route path="/EditCommission" element={<PrivateRoute><EditCommission /></PrivateRoute>} />
          <Route path="/ViewCommission" element={<PrivateRoute><ViewComission /></PrivateRoute>} />
          <Route path="/ListCommission" element={<PrivateRoute><ListCommission /></PrivateRoute>} />

          {/* Notifications */}
          <Route path="/ListNotifications" element={<PrivateRoute><ListNotifications /></PrivateRoute>} />
          <Route path="/EditNotifications" element={<PrivateRoute><EditNotifications /></PrivateRoute>} />
          <Route path="/AddNotifications" element={<PrivateRoute><AddNotifications /></PrivateRoute>} />
          <Route path="/ViewNotifications" element={<PrivateRoute><ViewNotifications /></PrivateRoute>} />

          {/* Training */}
          <Route path="/ListTraining" element={<PrivateRoute><ListTraining /></PrivateRoute>} />
          <Route path="/AddTraining" element={<PrivateRoute><AddTraining /></PrivateRoute>} />
          <Route path="/EditTraining" element={<PrivateRoute><EditTraining /></PrivateRoute>} />
          <Route path="/ViewTraining" element={<PrivateRoute><ViewTraining /></PrivateRoute>} />

          {/* Events */}
          <Route path="/ListEvents" element={<PrivateRoute><ListEvents /></PrivateRoute>} />
          <Route path="/AddEvents" element={<PrivateRoute><AddEvents /></PrivateRoute>} />
          <Route path="/EditEvents" element={<PrivateRoute><EditEvents /></PrivateRoute>} />
          <Route path="/ViewEvents" element={<PrivateRoute><ViewEvents /></PrivateRoute>} />

          {/* SocialMedia */}
          <Route path="/AddSocialMedia" element={<PrivateRoute><AddSocialMedia /></PrivateRoute>} />
          <Route path="/EditSocialMedia" element={<PrivateRoute><EditSocialMedia /></PrivateRoute>} />
          <Route path="/ListSocialMedia" element={<PrivateRoute><ListSocialMedia /></PrivateRoute>} />
          <Route path="/ViewSocialMedia" element={<PrivateRoute><ViewSocialMedia /></PrivateRoute>} />

          {/* Campaign */}
          <Route path="/ListCampaign" element={<PrivateRoute><ListCampaign /></PrivateRoute>} />
          <Route path="/AddCampaign" element={<PrivateRoute><AddCampaign /></PrivateRoute>} />
          <Route path="/EditCampaign" element={<PrivateRoute><EditCampaign /></PrivateRoute>} />
          <Route path="/ViewCampaign" element={<PrivateRoute><ViewCampaign /></PrivateRoute>} />

          {/* DailyTask */}
          <Route path="/ListDailyTask" element={<PrivateRoute><ListDailyTask /></PrivateRoute>} />
          <Route path="/EditDailyTask" element={<PrivateRoute><EditDailyTask /></PrivateRoute>} />
          <Route path="/AddDailyTask" element={<PrivateRoute><AddDailyTask /></PrivateRoute>} />
          <Route path="/ViewDailyTask" element={<PrivateRoute><ViewDailyTask /></PrivateRoute>} />

          {/* Meetings */}
          <Route path="/ListMeetings" element={<PrivateRoute><ListMeetings /></PrivateRoute>} />
          <Route path="/AddMeetings" element={<PrivateRoute><AddMeetings /></PrivateRoute>} />
          <Route path="/EditMeetings" element={<PrivateRoute><EditMeetings /></PrivateRoute>} />
          <Route path="/ViewMeetings" element={<PrivateRoute><ViewMeetings /></PrivateRoute>} />

          {/* Promotion */}

          <Route path="/ListPromotions" element={<PrivateRoute><ListPromotions /></PrivateRoute>} />
          <Route path="/AddPromotions" element={<PrivateRoute><AddPromotions /></PrivateRoute>} />
          <Route path="/EditPromotions" element={<PrivateRoute><EditPromotions /></PrivateRoute>} />
          <Route path="/ViewPromotions" element={<PrivateRoute><ViewPromotion /></PrivateRoute>} />

          {/* Testimonials */}
          <Route path="/ListTestimonials" element={<PrivateRoute><ListTestimonials /></PrivateRoute>} />
          <Route path="/AddTestimonials" element={<PrivateRoute><AddTestimonials /></PrivateRoute>} />
          <Route path="/EditTestimonials" element={<PrivateRoute><EditTestimonials /></PrivateRoute>} />
          <Route path="/ViewTestimonials" element={<PrivateRoute><ViewTestimonials /></PrivateRoute>} />

          {/* Blog    */}
          <Route path="/ListBlog" element={<PrivateRoute><ListBlog /></PrivateRoute>} />
          <Route path="/AddBlog" element={<PrivateRoute><AddBlog /></PrivateRoute>} />
          <Route path="/EditBlog" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
          <Route path="/ViewBlog" element={<PrivateRoute><ViewBlog /></PrivateRoute>} />

          {/* Chat */}
          <Route path="/ListChat" element={<PrivateRoute><ListChat/></PrivateRoute>}/>
          <Route path="/AddChat" element={<PrivateRoute><AddChat/></PrivateRoute>}/>
          <Route path="/AddChat" element={<PrivateRoute><EditChat/></PrivateRoute>}/>
          <Route path="/EditChat" element={<PrivateRoute><ViewChat/></PrivateRoute>}/>

          {/* Bookings */}
          <Route path="/ListBookings" element={<PrivateRoute><ListBookings/></PrivateRoute>}/>
          <Route path="/AddBookings" element={<PrivateRoute><AddBookings/></PrivateRoute>}/>
          <Route path="/EditBookings" element={<PrivateRoute><EditBookings/></PrivateRoute>}/>
          <Route path="/ViewBookings" element={<PrivateRoute><ViewBookings/></PrivateRoute>}/>

          {/* Class Schedule */}
          <Route path="/ListClassSchedule" element={<PrivateRoute><ListClassSchedule/></PrivateRoute>}/>
          <Route path="/AddClassSchedule" element={<PrivateRoute><AddClassSchedule/></PrivateRoute>}/>
          <Route path="/EditClassSchedule" element={<PrivateRoute><EditClassSchedule/></PrivateRoute>}/>
          <Route path="/ViewClassSchedule" element={<PrivateRoute><ViewClassSchedule/></PrivateRoute>}/>

          {/* Email */}
          <Route path="/ListEmail" element={<PrivateRoute><ListEmail/></PrivateRoute>}/>
          <Route path="/AddEmail" element={<PrivateRoute><AddEmail/></PrivateRoute>}/>
          <Route path="/EditEmail" element={<PrivateRoute><EditEmail/></PrivateRoute>}/>
          <Route path="/ViewEmail" element={<PrivateRoute><ViewEmail/></PrivateRoute>}/>

          {/* Expenses */}
          <Route path="/ListExpenses" element={<PrivateRoute><ListExpenses/></PrivateRoute>}/>
          <Route path="/AddExpenses" element={<PrivateRoute><AddExpenses/></PrivateRoute>}/>
          <Route path="/EditExpenses" element={<PrivateRoute><EditExpenses/></PrivateRoute>}/>
          <Route path="/ViewExpenses" element={<PrivateRoute><ViewExpenses/></PrivateRoute>}/>

          {/* Income */}
          <Route path="/ListIncome" element={<PrivateRoute><ListIncome/></PrivateRoute>}/>
          <Route path="/AddIncome" element={<PrivateRoute><AddIncome/></PrivateRoute>}/>
          <Route path="/EditIncome" element={<PrivateRoute><EditIncome/></PrivateRoute>}/>
          <Route path="/ViewIncome" element={<PrivateRoute><ViewIncome/></PrivateRoute>}/>


          {/* Income Report */}
          <Route path="/ListIncomeReport" element={<PrivateRoute><ListIncomeReport/></PrivateRoute>}/>
          <Route path="/AddIncomeReport" element={<PrivateRoute><AddIncomeReport/></PrivateRoute>}/>
          <Route path="/EditIncomeReport" element={<PrivateRoute><EditIncomeReport/></PrivateRoute>}/>
          <Route path="/ViewIncomeReport" element={<PrivateRoute><ViewIncomeReport/></PrivateRoute>}/>

          {/* Raise Quotations */}
          <Route path="/ListRaiseQuotations" element={<PrivateRoute><ListQuotations/></PrivateRoute>}/>
          <Route path="/AddRaiseQuotations" element={<PrivateRoute><AddQuotations/></PrivateRoute>}/>
          <Route path="/EditRaiseQuotations" element={<PrivateRoute><EditQuotations/></PrivateRoute>}/>
          <Route path="/ViewRaiseQuotations" element={<PrivateRoute><ViewQuotations/></PrivateRoute>}/>

          {/* Attendance */}
          <Route path="/ListAttendance" element={<PrivateRoute><ListAttendance/></PrivateRoute>}/>
          <Route path="/AddAttendance" element={<PrivateRoute><AddAttendance/></PrivateRoute>}/>
          <Route path="/EditAttendance" element={<PrivateRoute><EditAttendance/></PrivateRoute>}/>
          <Route path="/ViewAttendance" element={<PrivateRoute><ViewAttendance/></PrivateRoute>}/>

          {/* KPI */}
          <Route path="/ListKPI" element={<PrivateRoute><ListKPI/></PrivateRoute>}/>
          <Route path="/AddKPI" element={<PrivateRoute><AddKPI/></PrivateRoute>}/>
          <Route path="/EditKPI" element={<PrivateRoute><EditKPI/></PrivateRoute>}/>
          <Route path="/ViewKPI" element={<PrivateRoute><ViewKPI/></PrivateRoute>}/>

          {/* Leave */}
          <Route path="/ListLeave" element={<PrivateRoute><ListLeave/></PrivateRoute>}/>
          <Route path="/AddLeave" element={<PrivateRoute><AddLeave/></PrivateRoute>}/>
          <Route path="/EditLeave" element={<PrivateRoute><EditLeave/></PrivateRoute>}/>
          <Route path="/ViewLeave" element={<PrivateRoute><ViewLeave/></PrivateRoute>}/>





          {/* Payroll */}
          <Route path="/ListPayroll" element={<PrivateRoute><ListPayroll/></PrivateRoute>}/>
          <Route path="/AddPayroll" element={<PrivateRoute><AddPayroll/></PrivateRoute>}/>
          <Route path="/EditPayroll" element={<PrivateRoute><EditPayroll/></PrivateRoute>}/>
          <Route path="/ViewPayroll" element={<PrivateRoute><ViewPayroll/></PrivateRoute>}/>

          {/* Performance Report */}
          <Route path="/ListPerformanceReport" element={<PrivateRoute><ListPeformanceReport/></PrivateRoute>}/>
          <Route path="/AddPerformanceReport" element={<PrivateRoute><AddPeformanceReport/></PrivateRoute>}/>
          <Route path="/EditPerformanceReport" element={<PrivateRoute><EditPeformanceReport/></PrivateRoute>}/>
          <Route path="/ViewPerformanceReport" element={<PrivateRoute><ViewPeformanceReport/></PrivateRoute>}/>


          {/* Policies */}
          <Route path="/ListPolicies" element={<PrivateRoute><ListPolicies/></PrivateRoute>}/>
          <Route path="/AddPolicies" element={<PrivateRoute><Add/></PrivateRoute>}/>
          <Route path="/EditPolicies" element={<PrivateRoute><EditPolicies/></PrivateRoute>}/>
          <Route path="/ViewPolicies" element={<PrivateRoute><ViewPolicies/></PrivateRoute>}/>

          {/* Staff Hrm */}
          <Route path="/ListStaffHRM" element={<PrivateRoute><ListHrmStaff/></PrivateRoute>}/>
          <Route path="/AddStaffHRM" element={<PrivateRoute><AddHrmStaff/></PrivateRoute>}/>
          <Route path="/EditStaffHRM" element={<PrivateRoute><EditHrmStaff/></PrivateRoute>}/>
          <Route path="/ViewStaffHRM" element={<PrivateRoute><ViewHrmStaff/></PrivateRoute>}/>
          {/* Project */}
          <Route path="/ListProject" element={<PrivateRoute><ListProject/></PrivateRoute>}/>
          <Route path="/AddProject" element={<PrivateRoute><AddProject/></PrivateRoute>}/>

          <Route path="/EditProject" element={<PrivateRoute><EditProject/></PrivateRoute>}/>

          <Route path="/ViewProject" element={<PrivateRoute><ViewProject/></PrivateRoute>}/>


          {/* Task */}
          <Route path="/ListTask" element={<PrivateRoute><ListTask/></PrivateRoute>}/>
          <Route path="/AddTask" element={<PrivateRoute><AddTask/></PrivateRoute>}/>
          <Route path="/EditTask" element={<PrivateRoute><EditTask/></PrivateRoute>}/>
          <Route path="/ViewTask" element={<PrivateRoute><ViewTask/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default SuperAdmin;
