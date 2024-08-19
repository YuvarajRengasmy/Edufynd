import React from "react";
import { Routes, Route } from "react-router-dom";
import Just from "../SuperAdmin/University/just";
// import PrivateRoute from '../../src/Pages/Login/PrivateRoute';
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
        <Route path="/Demo" element={<Country />} />
        <Route path="/ApplyJob" element={<ApplyJob />} />
        <Route path="/Just" element={<Just />} />
        <Route path="/Search" element={<GlobalSearch />} />
        {/* Settings */}
        <Route path="/CountryList" element={<CountryList />} />
        <Route path="/GlobalSettings" element={<GlobalSettings />} />
        <Route path="/CurrencySettings" element={<CurrencySettings />} />
        <Route path="/UniversitySettings" element={<UniversitySettings />} />
        <Route path="/CourseType" element={<ProgramModule />} />
        <Route path="/ClientModule" element={<ClientModule />} />
        <Route path="/Status" element={<Status />} />
        <Route path="/Intake" element={<Intake />} />
        <Route path="/YearSetting" element={<Year />} />
        <Route path="/ApplicationStatus" element={<StatusModule/>} />

        {/* DashBoard */}
        <Route path="/DashBoard" element={<DashboardSA />} />

        {/* University */}
        <Route path="/AddUniversity" element={<AddUniversity />} />
        <Route path="/ListUniversity" element={<ListUniversity />} />
        <Route path="/ViewUniversity" element={<ViewUniversity />} />
        <Route path="/EditUniversity" element={<EditUniversity />} />
        <Route path="/ViewUniversityPage" element={<ViewUniversity1 />} />

        {/* Program */}
        <Route path="/ViewProgram" element={<ViewProgram />} />
        <Route path="/Programs" element={<Program />} />
        <Route path="/AddProgram" element={<AddProgram />} />
        <Route path="/EditProgram" element={<EditProgram />} />

        {/* Students */}
        <Route path="/ListStudent" element={<ListStudent />} />
        <Route path="/AddStudentSA" element={<AddStudentSA />} />
        <Route path="/ViewStudent" element={<ViewStudent />} />
        <Route path="/EditStudent" element={<Editstudent />} />
        <Route path="/EnquiryStudent" element={<EnquiryStudent />} />

        {/* Agent */}
        <Route path="/AddAgent" element={<AddAgent />} />
        <Route path="/ListAgent" element={<ListAgent />} />
        <Route path="/ViewAgent" element={<ViewAgent />} />
        <Route path="/EditAgent" element={<EditAgent />} />

        {/* Admin */}
        <Route path="/AdminList" element={<AdminList />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/EditAdmin" element={<EditAdmin />} />
        <Route path="/ViewAdmin" element={<ViewAdmin />} />

        {/* Client */}
        <Route path="/AddClient" element={<AddClient />} />
        <Route path="/ListClient" element={<ListClient />} />
        <Route path="/EditClient" element={<EditClient />} />
        <Route path="/viewClient" element={<ViewClient />} />

        {/* Application */}
        <Route path="/ListApplication" element={<ListApplication />} />
        <Route path="/Application" element={<Application />} />
        <Route path="/AddApplication" element={<AddApplication />} />
        <Route path="/EditApplication" element={<EditApplication />} />
        <Route path="/ApplicationView" element={<ViewApplication />} />

        {/* Staff */}
        <Route path="/ListStaff" element={<ListStaff />} />
        <Route path="/AddStaff" element={<AddStaff />} />
        <Route path="/EditStaff" element={<EditStaff />} />
        <Route path="/ViewStaff" element={<ViewStaff />} />

        {/* Invoices */}
        <Route path="/ListInvoice" element={<Listinvoice />} />
        <Route path="/AddSenderInvoice" element={<AddSenderInvoice />} />
        <Route path="/AddRecieverInvoice" element={<AddRecieverInvoice />} />
        <Route path="/EditInvoice" element={<Editinvoice />} />
        <Route path="/ViewInvoice" element={<Viewinvoice />} />
        <Route path="/SenderViewInvoice" element={<SenderViewinvoice />} />

        {/* Commission */}
        <Route path="/AddCommission" element={<AddCommission />} />
        <Route path="/EditCommission" element={<EditCommission />} />
        <Route path="/ViewCommission" element={<ViewComission />} />
        <Route path="/ListCommission" element={<ListCommission />} />

        {/* Notifications */}
        <Route path="/ListNotifications" element={<ListNotifications />} />
        <Route path="/EditNotifications" element={<EditNotifications />} />
        <Route path="/AddNotifications" element={<AddNotifications />} />
        <Route path="/ViewNotifications" element={<ViewNotifications />} />

        {/* Training */}
        <Route path="/ListTraining" element={<ListTraining />} />
        <Route path="/AddTraining" element={<AddTraining />} />
        <Route path="/EditTraining" element={<EditTraining />} />
        <Route path="/ViewTraining" element={<ViewTraining />} />

        {/* Events */}
        <Route path="/ListEvents" element={<ListEvents />} />
        <Route path="/AddEvents" element={<AddEvents />} />
        <Route path="/EditEvents" element={<EditEvents />} />
        <Route path="/ViewEvents" element={<ViewEvents />} />

        {/* SocialMedia */}
        <Route path="/AddSocialMedia" element={<AddSocialMedia />} />
        <Route path="/EditSocialMedia" element={<EditSocialMedia />} />
        <Route path="/ListSocialMedia" element={<ListSocialMedia />} />
        <Route path="/ViewSocialMedia" element={<ViewSocialMedia />} />

       

        {/* Campaign */}
        <Route path="/ListCampaign" element={<ListCampaign />} />
        <Route path="/AddCampaign" element={<AddCampaign />} />
        <Route path="/EditCampaign" element={<EditCampaign />} />
        <Route path="/ViewCampaign" element={<ViewCampaign />} />

        {/* DailyTask */}
        <Route path="/ListDailyTask" element={<ListDailyTask />} />
        <Route path="/EditDailyTask" element={<EditDailyTask />} />
        <Route path="/AddDailyTask" element={<AddDailyTask />} />
        <Route path="/ViewDailyTask" element={<ViewDailyTask />} />

        {/* Meetings */}
        <Route path="/ListMeetings" element={<ListMeetings />} />
        <Route path="/AddMeetings" element={<AddMeetings />} />
        <Route path="/EditMeetings" element={<EditMeetings />} />
        <Route path="/ViewMeetings" element={<ViewMeetings />} />

        {/* Promotion */}

        <Route path="/ListPromotions" element={<ListPromotions />} />
        <Route path="/AddPromotions" element={<AddPromotions />} />
        <Route path="/EditPromotions" element={<EditPromotions />} />
        <Route path="/ViewPromotions" element={<ViewPromotion />} />

        {/* Testimonials */}
        <Route path="/ListTestimonials" element={<ListTestimonials />} />
        <Route path="/AddTestimonials" element={<AddTestimonials />} />
        <Route path="/EditTestimonials" element={<EditTestimonials />} />
        <Route path="/ViewTestimonials" element={<ViewTestimonials />} />

        {/* Blog    */}
        <Route path="/ListBlog" element={<ListBlog />} />
        <Route path="/AddBlog" element={<AddBlog />} />
        <Route path="/EditBlog" element={<EditBlog />} />
        <Route path="/ViewBlog" element={<ViewBlog />} />

        {/* Chat */}
        <Route path="/ListChat" element={<ListChat />} />
        <Route path="/AddChat" element={<AddChat />} />
        <Route path="/AddChat" element={<EditChat />} />
        <Route path="/EditChat" element={<ViewChat />} />

        {/* Bookings */}
        <Route path="/ListBookings" element={<ListBookings />} />
        <Route path="/AddBookings" element={<AddBookings />} />
        <Route path="/EditBookings" element={<EditBookings />} />
        <Route path="/ViewBookings" element={<ViewBookings />} />

        {/* Class Schedule */}
        <Route path="/ListClassSchedule" element={<ListClassSchedule />} />
        <Route path="/AddClassSchedule" element={<AddClassSchedule />} />
        <Route path="/EditClassSchedule" element={<EditClassSchedule />} />
        <Route path="/ViewClassSchedule" element={<ViewClassSchedule />} />

        {/* Email */}
        <Route path="/ListEmail" element={<ListEmail />} />
        <Route path="/AddEmail" element={<AddEmail />} />
        <Route path="/EditEmail" element={<EditEmail />} />
        <Route path="/ViewEmail" element={<ViewEmail />} />

        {/* Expenses */}
        <Route path="/ListExpenses" element={<ListExpenses />} />
        <Route path="/AddExpenses" element={<AddExpenses />} />
        <Route path="/EditExpenses" element={<EditExpenses />} />
        <Route path="/ViewExpenses" element={<ViewExpenses />} />

        {/* Income */}
        <Route path="/ListIncome" element={<ListIncome />} />
        <Route path="/AddIncome" element={<AddIncome />} />
        <Route path="/EditIncome" element={<EditIncome />} />
        <Route path="/ViewIncome" element={<ViewIncome />} />


        {/* Income Report */}
        <Route path="/ListIncomeReport" element={<ListIncomeReport />} />
        <Route path="/AddIncomeReport" element={<AddIncomeReport />} />
        <Route path="/EditIncomeReport" element={<EditIncomeReport />} />
        <Route path="/ViewIncomeReport" element={<ViewIncomeReport />} />

        {/* Raise Quotations */}
        <Route path="/ListRaiseQuotations" element={<ListQuotations />} />
        <Route path="/AddRaiseQuotations" element={<AddQuotations />} />
        <Route path="/EditRaiseQuotations" element={<EditQuotations />} />
        <Route path="/ViewRaiseQuotations" element={<ViewQuotations />} />

        {/* Attendance */}
        <Route path="/ListAttendance" element={<ListAttendance />} />
        <Route path="/AddAttendance" element={<AddAttendance />} />
        <Route path="/EditAttendance" element={<EditAttendance />} />
        <Route path="/ViewAttendance" element={<ViewAttendance />} />

        {/* KPI */}
        <Route path="/ListKPI" element={<ListKPI />} />
        <Route path="/AddKPI" element={<AddKPI />} />
        <Route path="/EditKPI" element={<EditKPI />} />
        <Route path="/ViewKPI" element={<ViewKPI />} />

        {/* Leave */}
        <Route path="/ListLeave" element={<ListLeave />} />
        <Route path="/AddLeave" element={<AddLeave />} />
        <Route path="/EditLeave" element={<EditLeave />} />
        <Route path="/ViewLeave" element={<ViewLeave />} />





        {/* Payroll */}
        <Route path="/ListPayroll" element={<ListPayroll />} />
        <Route path="/AddPayroll" element={<AddPayroll />} />
        <Route path="/EditPayroll" element={<EditPayroll />} />
        <Route path="/ViewPayroll" element={<ViewPayroll />} />

        {/* Performance Report */}
        <Route path="/ListPerformanceReport" element={<ListPeformanceReport />} />
        <Route path="/AddPerformanceReport" element={<AddPeformanceReport />} />
        <Route path="/EditPerformanceReport" element={<EditPeformanceReport />} />
        <Route path="/ViewPerformanceReport" element={<ViewPeformanceReport />} />


        {/* Policies */}
        <Route path="/ListPolicies" element={<ListPolicies />} />
        <Route path="/AddPolicies" element={<Add />} />
        <Route path="/EditPolicies" element={<EditPolicies />} />
        <Route path="/ViewPolicies" element={<ViewPolicies />} />

        {/* Staff Hrm */}
        <Route path="/ListStaffHRM" element={<ListHrmStaff />} />
        <Route path="/AddStaffHRM" element={<AddHrmStaff />} />
        <Route path="/EditStaffHRM" element={<EditHrmStaff />} />
        <Route path="/ViewStaffHRM" element={<ViewHrmStaff />} />
        {/* Project */}
        <Route path="/ListProject" element={<ListProject />} />
        <Route path="/AddProject" element={<AddProject />} />

        <Route path="/EditProject" element={<EditProject />} />

        <Route path="/ViewProject" element={<ViewProject />} />


        {/* Task */}
        <Route path="/ListTask" element={<ListTask />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/EditTask" element={<EditTask />} />
        <Route path="/ViewTask" element={<ViewTask />} />


        {/* facebook */}

        <Route path="/ListFacebook" element={<ListFacebook/>}/>
        <Route path="/AddFacebook" element={<AddFacebook/>}/>
        <Route path="/EditFacebook" element={<EditFacebook/>}/>
        <Route path="/ViewFacebook" element={<ViewFacebook/>}/>

        {/* LinkedIn */}

        <Route path="/ListLinkedIn" element={<ListLinkedIn/>}/>
        <Route path="/AddLinkedIn" element={<AddLinkedIn/>}/>
        <Route path="/EditLinkedIn" element={<EditLinkedIn/>}/>
        <Route path="/ViewLinkedIn" element={<ViewLinkedIn/>}/>

      {/* Instagram */}
        <Route path="/ListInstagram" element={<ListInstagram/>}/>
        <Route path="/AddInstagram" element={<AddInstagram/>}/>
        <Route path="/EditInstagram" element={<EditInstagram/>}/>
        <Route path="/ViewInstagram" element={<ViewInstagram/>}/>

      </Routes>

    </div>
  );
}
export default SuperAdmin;
