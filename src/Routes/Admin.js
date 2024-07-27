import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
// import AdminListNotifications from '../Admin/Notifications/AdminListNotifications'

export const Admin = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminDashboard" element={<AdminDashBoard />} />

        <Route path="/AdminAddClient" element={<AdminAddClient />} />
        <Route path="/AdminEditClient" element={<AdminEditCilent />} />
        <Route path="/AdminListClient" element={<AdminListClient />} />
        <Route path="/AdminViewClient" element={<AdminViewClient />} />

        <Route path="/AdminAddUniversity" element={<AdminAddUniversity />} />
        <Route path="/AdminEditUniversity" element={<AdminEditUniversity />} />
        <Route path="/AdminListUniversity" element={<AdminListUniversity />} />
        <Route path="/AdminViewUniversity" element={<AdminViewUniversity />} />

        <Route path="/AdminAddCommission" element={<AdminAddCommission />} />
        <Route path="/AdminEditCommission" element={<AdminEditComission />} />
        <Route path="/AdminListCommission" element={<AdminListCommission />} />
        <Route path="/AdminViewCommission" element={<AdminViewComission />} />

        <Route path="/AdminAddProgram" element={<AdminAddProgram />} />
        <Route path="/AdminEditProgram" element={<AdminEditProgram />} />
        <Route path="/AdminListProgram" element={<AdminListPrograms />} />
        <Route path="/AdminViewProgram" element={<AdminViewProgram />} />

        <Route path="/AdminAddStudent" element={<AdminAddStudent />} />
        <Route path="/AdminEditStudent" element={<AdminEditStudent />} />
        <Route path="/AdminListStudent" element={<AdminListStudent />} />
        <Route path="/AdminViewStudent" element={<AdminViewStudent />} />

        <Route path="/AdminAddStaff" element={<AdminAddStaff />} />
        <Route path="/AdminEditStaff" element={<AdminEditStaff />} />
        <Route path="/AdminListStaff" element={<AdminListStaff />} />
        <Route path="/AdminViewStaff" element={<AdminViewStaff />} />

        <Route path="/AdminAddAgent" element={<AdminAddAgent />} />
        <Route path="/AdminEditAgent" element={<AdminEditAgent />} />
        <Route path="/AdminListAgent" element={<AdminListAgent />} />
        <Route path="/AdminViewAgent" element={<AdminViewAgent />} />

        <Route path="/AdminAddApplication" element={<AdminAddApplication />} />
        <Route
          path="/AdminEditApplication"
          element={<AdminEditApplication />}
        />
        <Route
          path="/AdminListApplication"
          element={<AdminListApplication />}
        />
        <Route
          path="/AdminViewApplication"
          element={<AdminViewApplication />}
        />

        <Route path="/AdminAddFormStudent" element={<AdminAddStudentForm />} />
        <Route
          path="/AdminEditFormStudent"
          element={<AdminEditStudentForm />}
        />
        <Route
          path="/AdminListFormStudent"
          element={<AdminListStudentForm />}
        />
        <Route
          path="/AdminViewFormStudent"
          element={<AdminViewStudentForm />}
        />

        <Route path="/AdminAddForexForm" element={<AdminAddForex />} />
        <Route path="/AdminEditForexForm" element={<AdminEditForex />} />
        <Route path="/AdminListForexForm" element={<AdminListForex />} />
        <Route path="/AdminViewForexForm" element={<AdminViewForex />} />

        <Route
          path="/AdminAddAccommodation"
          element={<AdminAddAccommodation />}
        />
        <Route
          path="/AdminEditAccommodation"
          element={<AdminEditAccommodation />}
        />
        <Route
          path="/AdminListAccommodation"
          element={<AdminListAccommodation />}
        />
        <Route
          path="/AdminViewAccommodation"
          element={<AdminViewAccommodation />}
        />

        <Route
          path="/AdminAddFlightTicket"
          element={<AdminAddFlightTicket />}
        />
        <Route
          path="/AdminEditFlightTicket"
          element={<AdminEditFlightTicket />}
        />
        <Route
          path="/AdminListFlightTicket"
          element={<AdminListFlightTicket />}
        />
        <Route
          path="/AdminViewFlightTicket"
          element={<AdminViewFlightTicket />}
        />

        <Route path="/AdminAddLoanEnquiry" element={<AdminAddLoanEnquiry />} />
        <Route
          path="/AdminEditLoanEnquiry"
          element={<AdminEditLoanEnquiry />}
        />
        <Route
          path="/AdminListLoanEnquiry"
          element={<AdminListLoanEnquiry />}
        />
        <Route
          path="/AdminViewLoanEnquiry"
          element={<AdminViewLoanEnquiry />}
        />

        <Route path="/AdminAddBusinessEnquiry" element={<AdminAddBusiness />} />
        <Route
          path="/AdminEditBusinessEnquiry"
          element={<AdminEditBusiness />}
        />
        <Route
          path="/AdminListBusinessEnquiry"
          element={<AdminListBusiness />}
        />
        <Route
          path="/AdminViewBusinessEnquiry"
          element={<AdminViewBusiness />}
        />

        <Route
          path="/AdminAddGeneralEnquiry"
          element={<AdminAddGeneralEnquiry />}
        />
        <Route
          path="/AdminEditGeneralEnquiry"
          element={<AdminEditGeneralEnquiry />}
        />
        <Route
          path="/AdminListGeneralEnquiry"
          element={<AdminListGeneralEnquiry />}
        />
        <Route
          path="/AdminViewGeneralEnquiry"
          element={<AdminViewGeneralEnquiry />}
        />

        <Route path="/AdminAddIncome" element={<AdminAddIncome />} />
        <Route path="/AdminEditIncome" element={<AdminEditIncome />} />
        <Route path="/AdminListIncome" element={<AdminListIncome />} />
        <Route path="/AdminViewIncome" element={<AdminViewIncome />} />

        <Route path="/AdminAddExpenses" element={<AdminAddExpenses />} />
        <Route path="/AdminEditExpenses" element={<AdminEditExpenses />} />
        <Route path="/AdminListExpenses" element={<AdminListExpenses />} />
        <Route path="/AdminViewExpenses" element={<AdminViewExpenses />} />

        <Route
          path="/AdminAddRaiseQuotations"
          element={<AdminAddQuotation />}
        />
        <Route
          path="/AdminEditRaiseQuotations"
          element={<AdminEditQuotation />}
        />
        <Route
          path="/AdminListRaiseQuotations"
          element={<AdminListQuotations />}
        />
        <Route
          path="/AdminViewRaiseQuotations"
          element={<AdminViewQuotation />}
        />

        <Route
          path="/AdminAddSenderInvoice"
          element={<AdminAddSenderInvoice />}
        />
        <Route
          path="/AdminAddRecieverInvoice"
          element={<AdminAddRecieverInvoice />}
        />
        <Route path="/AdminEditInvoice" element={<AdminEditInvoice />} />
        <Route path="/AdminListInvoice" element={<AdminListInvoice />} />
        <Route path="/AdminViewInvoice" element={<AdminViewInvoice />} />

        <Route
          path="/AdminAddIncomeReport"
          element={<AdminAddIncomeReport />}
        />
        <Route
          path="/AdminEditIncomeReport"
          element={<AdminEditIncomeReport />}
        />
        <Route
          path="/AdminListIncomeReport"
          element={<AdminListIncomeReport />}
        />
        <Route
          path="/AdminViewIncomeReport"
          element={<AdminViewIncomeReport />}
        />

        <Route path="/AdminAddHRMStaff" element={<AdminAddHrmStaff />} />
        <Route path="/AdminEditHRMStaff" element={<AdminEditHrmStaff />} />
        <Route path="/AdminListHRMStaff" element={<AdminListHrmStaff />} />
        <Route path="/AdminViewHRMStaff" element={<AdminViewHrmStaff />} />

        <Route path="/AdminAddAttendance" element={<AdminAddAttendance />} />
        <Route path="/AdminEditAttendance" element={<AdminEditAttendance />} />
        <Route path="/AdminListAttendance" element={<AdminListAttendance />} />
        <Route path="/AdminViewAttendance" element={<AdminViewAttendance />} />

        <Route path="/AdminAddPayroll" element={<AdminAddPayroll />} />
        <Route path="/AdminEditPayroll" element={<AdminEditPayroll />} />
        <Route path="/AdminListPayroll" element={<AdminListPayroll />} />
        <Route path="/AdminViewPayroll" element={<AdminViewPayroll />} />

        <Route path="/AdminAddLeave" element={<AdminAddLeave />} />
        <Route path="/AdminEditLeave" element={<AdminEditLeave />} />
        <Route path="/AdminListLeave" element={<AdminListLeave />} />
        <Route path="/AdminViewLeave" element={<AdminViewLeave />} />

        <Route path="/AdminAddKPI" element={<AdminAddKPI />} />
        <Route path="/AdminEditKPI" element={<AdminEditKPI />} />
        <Route path="/AdminListKPI" element={<AdminListKPI />} />
        <Route path="/AdminViewKPI" element={<AdminViewKPI />} />

        <Route path="/AdminAddPolicies" element={<AdminAddPolicies />} />
        <Route path="/AdminEditPolicies" element={<AdminEditPolicies />} />
        <Route path="/AdminListPolicies" element={<AdminListPolicies />} />
        <Route path="/AdminViewPolicies" element={<AdminViewPolicies />} />

        <Route
          path="/AdminAddPerformanceReport"
          element={<AdminAddPerformanceReport />}
        />
        <Route
          path="/AdminEditPerformanceReport"
          element={<AdminEditPerformanceReports />}
        />
        <Route
          path="/AdminListPerformanceReport"
          element={<AdminListPeformanceReport />}
        />
        <Route
          path="/AdminViewPerformanceReport"
          element={<AdminViewPerformanceReports />}
        />

        <Route path="/AdminAddProject" element={<AdminAddProject />} />
        <Route path="/AdminEditProject" element={<AdminEditProject />} />
        <Route path="/AdminListProject" element={<AdminListProject />} />
        <Route path="/AdminViewProject" element={<AdminViewProject />} />

        <Route path="/AdminAddTask" element={<AdminAddTask />} />
        <Route path="/AdminEditTask" element={<AdminEditTask />} />
        <Route path="/AdminListTask" element={<AdminListTask />} />
        <Route path="/AdminViewTask" element={<AdminViewTask />} />

        <Route path="/AdminAddSocialMedia" element={<AdminAddSocialMedia />} />
        <Route
          path="/AdminEditSocialMedia"
          element={<AdminEditSocialMedia />}
        />
        <Route
          path="/AdminListSocialMedia"
          element={<AdminListSocialMedia />}
        />
        <Route
          path="/AdminViewSocialMedia"
          element={<AdminViewSocialMedia />}
        />

        <Route path="/AdminAddCampaign" element={<AdminAddCampaign />} />
        <Route path="/AdminEditCampaign" element={<AdminEditCampaign />} />
        <Route path="/AdminListCampaign" element={<AdminListCampaign />} />
        <Route path="/AdminViewCampaign" element={<AdminViewCampaign />} />

        <Route path="/AdminAddDailyTask" element={<AdminAddDailyTask />} />
        <Route path="/AdminEditDailyTask" element={<AdminEditDailyTask />} />
        <Route path="/AdminListDailyTask" element={<AdminListDailyTask />} />
        <Route path="/AdminViewDailyTask" element={<AdminViewDailyTask />} />

        <Route
          path="/AdminAddNotifications"
          element={<AdminAddNotifications />}
        />
        <Route
          path="/AdminEditNotifications"
          element={<AdminEditNotifications />}
        />
        <Route
          path="/AdminListNotifications"
          element={<AdminListNotifications />}
        />
        <Route
          path="/AdminViewNotifications"
          element={<AdminViewNotifications />}
        />

        <Route path="/AdminAddMeetings" element={<AdminAddMeetings />} />
        <Route path="/AdminEditMeetings" element={<AdminEditMeetings />} />
        <Route path="/AdminListMeetings" element={<AdminListMeetings />} />
        <Route path="/AdminViewMeetings" element={<AdminViewMeetings />} />

        <Route path="/AdminAddTraining" element={<AdminAddTraining />} />
        <Route path="/AdminEditTraining" element={<AdminEditTraining />} />
        <Route path="/AdminListTraining" element={<AdminListTraining />} />
        <Route path="/AdminViewTraining" element={<AdminViewTraining />} />

        <Route path="/AdminAddChat" element={<AdminAddChat />} />
        <Route path="/AdminEditChat" element={<AdminEditChat />} />
        <Route path="/AdminListChat" element={<AdminListChat />} />
        <Route path="/AdminViewChat" element={<AdminViewChat />} />

        <Route path="/AdminAddEmail" element={<AdminAddEmail />} />
        <Route path="/AdminEditEmail" element={<AdminEditEmail />} />
        <Route path="/AdminListEmail" element={<AdminListEmail />} />
        <Route path="/AdminViewEmail" element={<AdminViewEmail />} />

        <Route path="/AdminAddPromotions" element={<AdminAddPromotions />} />
        <Route path="/AdminEditPromotions" element={<AdminEditPromotions />} />
        <Route path="/AdminListPromotions" element={<AdminListPromotions />} />
        <Route path="/AdminViewPromotions" element={<AdminViewPromotion />} />

        <Route path="/AdminAddEvents" element={<AdminAddEvents />} />
        <Route path="/AdminEditEvents" element={<AdminEditEvents />} />
        <Route path="/AdminListEvents" element={<AdminListEvents />} />
        <Route path="/AdminViewEvents" element={<AdminViewEvents />} />

        <Route path="/AdminAddBlog" element={<AdminAddBlog />} />
        <Route path="/AdminEditBlog" element={<AdminEditBlog />} />
        <Route path="/AdminListBlog" element={<AdminListBlog />} />
        <Route path="/AdminViewBlog" element={<AdminViewBlog />} />

        <Route
          path="/AdminAddTestimonials"
          element={<AdminAddTestimonials />}
        />
        <Route
          path="/AdminEditTestimonials"
          element={<AdminEditTestimonials />}
        />
        <Route
          path="/AdminListTestimonials"
          element={<AdminListTestimonials />}
        />
        <Route
          path="/AdminViewTestimonials"
          element={<AdminViewTestimonials />}
        />

        <Route path="/AdminAddAdmin" element={<AdminAddAdmin />} />
        <Route path="/AdminEditAdmin" element={<AdminEditAdmin />} />
        <Route path="/AdminListAdmin" element={<AdminListAdmin />} />
        <Route path="/AdminViewAdmin" element={<AdminViewAdmin />} />

        <Route path="/AdminAddBookings" element={<AdminAddBookings />} />
        <Route path="/AdminEditBookings" element={<AdminEditBookings />} />
        <Route path="/AdminListBookings" element={<AdminListBookings />} />
        <Route path="/AdminViewBookings" element={<AdminViewBlog />} />

        <Route
          path="/AdminAddClassSchedule"
          element={<AdminAddClassSchedule />}
        />
        <Route
          path="/AdminEditClassSchedule"
          element={<AdminEditClassSchedule />}
        />
        <Route
          path="/AdminListClassSchedule"
          element={<AdminListClassSchedule />}
        />
        <Route
          path="/AdminViewClassSchedule"
          element={<AdminViewClassSchedule />}
        />

        {/* <Route path="/AdminAddReportEmployee" element={<AdminAdd />} />
        <Route path="/AdminEditReportEmployee" element={<AdminEdit />} />
        <Route path="/AdminListReportEmployee" element={<AdminList />} />
        <Route path="/AdminViewReportEmployee" element={<AdminView/>} /> */}

        {/* <Route path="/AdminAddReportAgent" element={<AdminAdd />} />
        <Route path="/AdminEditReportAgent" element={<AdminEdit />} />
        <Route path="/AdminListReportAgent" element={<AdminList />} />
        <Route path="/AdminViewReportAgent" element={<AdminView/>} /> */}

        {/* <Route path="/AdminAddReportStudents" element={<AdminAdd />} />
        <Route path="/AdminEditReportStudents" element={<AdminEdit />} />
        <Route path="/AdminListReportStudents" element={<AdminList />} />
        <Route path="/AdminViewReportStudents" element={<AdminView/>} /> */}

        {/* <Route path="/AdminAddReportBranch" element={<AdminAdd />} />
        <Route path="/AdminEditReportBranch" element={<AdminEdit />} />
        <Route path="/AdminListReportBranch" element={<AdminList />} />
        <Route path="/AdminViewReportBranch" element={<AdminView/>} /> */}

        {/* <Route path="/AdminAddReportAdmin" element={<AdminAdd />} />
        <Route path="/AdminEditReportAdmin" element={<AdminEdit />} />
        <Route path="/AdminListReportAdmin" element={<AdminList />} />
        <Route path="/AdminViewReportAdmin" element={<AdminView/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default Admin;
