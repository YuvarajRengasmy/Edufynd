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
import { ListChat } from "../SuperAdmin/Chat/ListChat";
import ListBookings from "../SuperAdmin/ELT/Bookings/ListBookings";
import ListClassSchedule from "../SuperAdmin/ELT/Class Schedule/ListClassSchedule";
import ListEmail from "../SuperAdmin/Email/ListEmail";
import ListExpenses from "../SuperAdmin/Finance/Expenses/ListExpenses";
import ListIncome from "../SuperAdmin/Finance/Income/ListIncome";
import ListIncomeReport from "../SuperAdmin/Finance/Income Report/ListIncomereport";
import ListQuotations from "../SuperAdmin/Finance/Raise Quotations/ListQuottions";
import ListAttendance from "../SuperAdmin/HRMS/Attendance/ListAttendance";
import ListKPI from "../SuperAdmin/HRMS/KPI/ListKPI";
import ListLeave from "../SuperAdmin/HRMS/Leave/ListLeave";
import ListPayroll from "../SuperAdmin/HRMS/Payroll/ListPayroll";
import ListPeformanceReport from "../SuperAdmin/HRMS/Performance Report/ListPerformanceReport";
import ListPolicies from "../SuperAdmin/HRMS/Policies/ListPolicies";
import ListHrmStaff from "../SuperAdmin/HRMS/Staff/ListHrmStaff";
import ListProject from "../SuperAdmin/Project & Task/Project/ListProject";
import ListTask from "../SuperAdmin/Project & Task/Task/ListTask";
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
          <Route path="/client" element={<PrivateRoute><ListClient /></PrivateRoute>} />
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
          <Route path="/ViewPromotion" element={<PrivateRoute><ViewPromotion /></PrivateRoute>} />

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

          {/* Bookings */}
          <Route path="/ListBookings" element={<PrivateRoute><ListBookings/></PrivateRoute>}/>

          {/* Class Schedule */}
          <Route path="/ListClassSchedule" element={<PrivateRoute><ListClassSchedule/></PrivateRoute>}/>

          {/* Email */}
          <Route path="/ListEmail" element={<PrivateRoute><ListEmail/></PrivateRoute>}/>

          {/* Expenses */}
          <Route path="/ListExpenses" element={<PrivateRoute><ListExpenses/></PrivateRoute>}/>

          {/* Income */}
          <Route path="/ListIncome" element={<PrivateRoute><ListIncome/></PrivateRoute>}/>

          {/* Income Report */}
          <Route path="/ListIncomeReport" element={<PrivateRoute><ListIncomeReport/></PrivateRoute>}/>

          {/* Raise Quotations */}
          <Route path="/ListRaiseQuotations" element={<PrivateRoute><ListQuotations/></PrivateRoute>}/>

          {/* Attendance */}
          <Route path="/ListAttendance" element={<PrivateRoute><ListAttendance/></PrivateRoute>}/>

          {/* KPI */}
          <Route path="/ListKPI" element={<PrivateRoute><ListKPI/></PrivateRoute>}/>

          {/* Leave */}
          <Route path="/ListLeave" element={<PrivateRoute><ListLeave/></PrivateRoute>}/>

          {/* Payroll */}
          <Route path="/ListPayroll" element={<PrivateRoute><ListPayroll/></PrivateRoute>}/>

          {/* Performance Report */}
          <Route path="/ListPerformanceReport" element={<PrivateRoute><ListPeformanceReport/></PrivateRoute>}/>
          {/* Policies */}
          <Route path="/ListPolicies" element={<PrivateRoute><ListPolicies/></PrivateRoute>}/>

          {/* Staff Hrm */}
          <Route path="/ListStaffHRM" element={<PrivateRoute><ListHrmStaff/></PrivateRoute>}/>
          {/* Project */}
          <Route path="/ListProject" element={<PrivateRoute><ListProject/></PrivateRoute>}/>

          {/* Task */}
          <Route path="/ListTask" element={<PrivateRoute><ListTask/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default SuperAdmin;
