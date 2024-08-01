import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate } from "react-router-dom";
import Edufynd from "../Assests/White Logo EduFynd.png";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";

export const AdminSidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [activeLink, setActiveLink] = useState(currentPath);
  const [isOpen, setIsOpen] = useState({
    enquiry: false,
    finance: false,
    hrms: false,
    projects: false,
    marketing: false,
    elt: false,
    reports: false,
    users: false,
  });

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

  const toggleDropdown = (key) => {
    setIsOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
  };

  const logout = () => {
    clearStorage(); // Assuming clearStorage is defined elsewhere
    toast.success("You have been logged out successfully.");
    navigate("/");
  };

  useEffect(() => {
    const dropdownPaths = {
      users: [
        "/AdminListStudent",
        "/AdminAddStudent",
        "/AdminViewStudent",
        "/AdminEditStudent",
        "/AdminListStaff",
        "/AdminAddStaff",
        "/AdminEditStaff",
        "/AdminViewStaff",
        "/AdminViewAgent",
        "/AdminEditAgent",
        "/AdminListAgent",
        "/AdminAddAgent",
      ],
      enquiry: [
        "/AdminListFormStudent",
        "/AdminAddFormStudent",
        "/AdminEditFormStudent",
        "/AdminViewFormStudent",
        "/AdminListForexForm",
        "/AdminAddForexForm",
        "/AdminEditForexForm",
        "/AdminViewForexForm",
        "/AdminListAccommodation",
        "/AdminAddAccommodation",
        "/AdminEditAccommodation",
        "/AdminViewAccommodation",
        "/AdminListFlightTicket",
        "/AdminAddFlightTicket",
        "/AdminEditFlightTicket",
        "/AdminViewFlightTicket",
        "/AdminListLoanEnquiry",
        "/AdminAddLoanEnquiry",
        "/AdminEditLoanEnquiry",
        "/AdminViewLoanEnquiry",
        "/AdminListBusinessEnquiry",
        "/AdminAddBusinessEnquiry",
        "/AdminEditBusinessEnquiry",
        "/AdminViewBusinessEnquiry",
        "/AdminListGeneralEnquiry",
        "/AdminAddGeneralEnquiry",
        "/AdminEditGeneralEnquiry",
        "/AdminViewGeneralEnquiry",
      ],
      finance: [
        "/AdminListIncome",
        "/AdminListExpenses",
        "/AdminListRaiseQuotations",
        "/AdminListInvoice",
        "/AdminListIncomeReport",
      ],
      hrms: [
        "/AdminListHRMStaff",
        "/AdminListAttendance",
        "/AdminListPayroll",
        "/AdminListLeave",
        "/AdminListKPI",
        "/AdminListPolicies",
        "/AdminListPerformanceReport",
      ],
      Projects: [
        "/AdminListProject",
        "/AdminListTask",
      ],
      Marketing: [
        "/AdminListSocialMedia",
        "/AdminListCampaign",
        "/AdminListDailyTask",
      ],
      elt: [
        "/AdminListBookings",
        "/AdminListClassSchedule",
      ],
     
      Reports: [
        "/AdminEmployeeReports",
        "/AdminAgentReports",
        "/AdminStudentReports",
        "/AdminBranchReports",
        "/AdminAdminReports",
      ],
    };

    const newIsOpen = Object.keys(dropdownPaths).reduce((acc, key) => {
      acc[key] = dropdownPaths[key].some(path => currentPath.includes(path));
      return acc;
    }, {});

    setIsOpen(prevState => ({ ...prevState, ...newIsOpen }));
  }, [currentPath]);

  return (
    <>
      <aside
        className="main-sidebar elevation-10 d-none   d-lg-block"
        style={{
          position: "fixed",
          width: "250px",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          fontSize:'14px',
          fontWeight:'bold',
          fontFamily: "Plus Jakarta Sans",
        fontVariant: "all-small-caps"

        }}
      >
        <div className="  shadow-none   ">
          <div className="sidebar">
            <div className="user-panel  d-flex">
              <div className="info  ">
                <a
                  href="/AdminDashboard"
                  target="_self"
                  className="brand-text font-weight-light text-decoration-none"
                >
                  <img
                    src={Edufynd}
                    alt="logo"
                    className="img-fluid "
                    style={{ width: "100%" }}
                  />
                </a>
              </div>
            </div>
            <nav>
              <ul
                className="nav nav-pills nav-sidebar flex-column "
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <a
                    href="/AdminDashboard"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminDashboard",
                     
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-tachometer-alt nav-icon"></i>
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/AdminListClient"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListClient",
                      "/AdminAddClient",
                      "/AdminEditClient",
                      "/AdminViewClient",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-user nav-icon"></i>
                    Client
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListUniversity"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListUniversity",
                      "/AdminAddUniversity",
                      "/AdminViewUniversity",
                      "/AdminEditUniversity",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-graduation-cap nav-icon"></i>
                    University
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListCommission"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListCommission",
                      "/AdminAddCommission",
                      "/AdminViewCommission",
                      "/AdminEditCommission",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-dollar-sign nav-icon"></i>
                    Commission
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListProgram"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListProgram",
                      "/AdminAddProgram",
                      "/AdminEditProgram",
                      "/AdminViewProgram",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-cogs nav-icon"></i>
                    Program
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link "
                    data-bs-toggle="collapse"

                    aria-expanded={isOpen.users}
                    aria-controls="collapse3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("users")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i class="fa fa-users nav-icon"></i>
                      Users
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.users ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.users ? "show" : ""}`}
                    id="collapse3"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListStudent"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListStudent",
                            "/AdminAddStudent",
                            "/AdminViewStudent",
                            "/AdminEditStudent",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-graduate nav-icon"></i>  Students
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListStaff"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListStaff",
                            "/AdminAddStaff",
                            "/AdminEditStaff",
                            "/AdminViewStaff",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-tie nav-icon"></i>  Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListAgent"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminViewAgent",
                            "/AdminEditAgent",
                            "/AdminListAgent",
                            "/AdminAddAgent",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-secret nav-icon"></i>  Agents
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListApplication"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListApplication",
                      "/AdminAddApplication",
                      "/AdminEditApplication",
                      "/AdminApplication",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-archive nav-icon"></i>
                    Application
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.enquiry}
                    aria-controls="collapse1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("enquiry")}
                  >
                    <div>
                      <i class="fa fa-question-circle nav-icon"></i>
                      Enquiry
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.enquiry ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.enquiry ? "show" : ""}`}
                    id="collapse1"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListFormStudent"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListFormStudent",
                            "/AdminAddFormStudent",
                            "/AdminEditFormStudent",
                            "/AdminViewFormStudent",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-graduate nav-icon"></i>Student
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListForexForm"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListForexForm",
                            "/AdminAddForexForm",
                            "/AdminEditForexForm",
                            "/AdminViewForexForm",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-money-bill-wave nav-icon"></i>  FOREX
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListAccommodation"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListAccommodation",
                            "/AdminAddAccommodation",
                            "/AdminEditAccommodation",
                            "/AdminViewAccommodation",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-bed nav-icon"></i> Accommodation
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListFlightTicket"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListFlightTicket",
                            "/AdminAddFlightTicket",
                            "/AdminEditFlightTicket",
                            "/AdminViewFlightTicket",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-plane nav-icon"></i>  Flight
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListLoanEnquiry"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListLoanEnquiry",
                            "/AdminAddLoanEnquiry",
                            "/AdminEditLoanEnquiry",
                            "/AdminViewLoanEnquiry",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-credit-card nav-icon"></i>   Loan
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListBusinessEnquiry"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListBusinessEnquiry",
                            "/AdminAddBusinessEnquiry",
                            "/AdminEditBusinessEnquiry",
                            "/AdminViewBusinessEnquiry",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-briefcase nav-icon"></i>  Business Enquiry
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListGeneralEnquiry"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListGeneralEnquiry",
                            "/AdminAddGeneralEnquiry",
                            "/AdminEditGeneralEnquiry",
                            "/AdminViewGeneralEnquiry",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-info-circle nav-icon"></i>  General Enquiry
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link "
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.finance}
                    aria-controls="collapse2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("finance")}
                  >
                    <div>
                      <i class="fa fa-wallet nav-icon"></i>
                      Finance
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.finance ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.finance ? "show" : ""}`}
                    id="collapse2"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListIncome"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListIncome",
                            "/AdminAddIncome",
                            "/AdminEditIncome",
                            "/AdminViewIncome",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-arrow-up nav-icon"></i>  Income
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListExpenses"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListExpenses",
                            "/AdminAddExpenses",
                            "/AdminEditExpenses",
                            "/AdminViewExpenses",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-arrow-down nav-icon"></i> Expense
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListRaiseQuotations"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListRaiseQuotations",
                            "/AdminAddRaiseQuotations",
                            "/AdminEditRaiseQuotations",
                            "/AdminViewRaiseQuotations",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-file-invoice nav-icon"></i> Raise Quotations
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListInvoice"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListInvoice",
                            "/AdminAddSenderInvoice",
                            "/AdminAddRecieverInvoice",
                            "/AdminEditInvoice",
                            "/AdminViewInvoice",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-file-invoice-dollar nav-icon"></i>  Raise Invoice
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListIncomeReport"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListIncomeReport",
                            "/AdminAddIncomeReport",
                            "/AdminEditIncomeReport",
                            "/AdminViewIncomeReport",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-chart-line nav-icon"></i>  Income Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link "
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.hrms}
                    aria-controls="collapse5"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("hrms")}
                  >
                    <div>
                      <i class="fa fa-people-carry nav-icon"></i>
                      HRMS
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.hrms ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.hrms ? "show" : ""}`}
                    id="collapse5"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListHRMStaff"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListHRMStaff",
                            "/AdminAddHRMStaff",
                            "/AdminEditHRMStaff",
                            "/AdminViewHRMStaff",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-tie nav-icon"></i> Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListAttendance"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListAttendance",
                            "/AdminAddAttendance",
                            "/AdminEditAttendance",
                            "/AdminViewAttendance",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-calendar-check nav-icon"></i> Attendance
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/ListPayroll"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListPayroll",
                            "/AdminAddPayroll",
                            "/AdminEditPayroll",
                            "/AdminViewPayroll",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-dollar-sign nav-icon"></i> Payroll
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListLeave"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListLeave",
                            "/AdminAddLeave",
                            "/AdminEditLeave",
                            "/AdminViewLeave",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-calendar-times nav-icon"></i> Leave
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListKPI"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListKPI",
                            "/AdminAddKPI",
                            "/AdminEditKPI",
                            "/AdminViewKPI",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-chart-bar nav-icon"></i>  KPI
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          href="/AdminListPolicies"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListPolicies",
                            "/AdminAddPolicies",
                            "/AdminEditPolicies",
                            "/AdminViewPolicies",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-file-alt nav-icon"></i> Policies
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListPerformanceReport"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListPerformanceReport",
                            "/AdminAddPerformanceReport",
                            "/AdminEditPerformanceReport",
                            "/ViewPerformanceReport",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-chart-line nav-icon"></i> Performance Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link "
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.Projects}
                    aria-controls="collapse12"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Projects")}
                  >
                    <div>
                      <i class="fa fa-project-diagram nav-icon"></i>
                      Project & Task
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Projects ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.Projects ? "show" : ""}`}
                    id="collapse12"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListProject"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListProject",
                            "/AdminAddProject",
                            "/AdminEditProject",
                            "/AdminViewProject",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-briefcase nav-icon"></i>  Project
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListTask"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListTask",
                            "/AdminAddTask",
                            "/AdminEditTask",
                            "/AdminViewTask",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-tasks nav-icon"></i>  Task
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link "
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.Marketing}
                    aria-controls="collapse17"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Marketing")}
                  >
                    <div>

                      <i class="fa fa-bullhorn nav-icon"></i>  Marketing
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Marketing ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.Marketing ? "show" : ""}`}
                    id="collapse17"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListSocialMedia"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListSocialMedia",
                            "/AdminAddSocialMedia",
                            "/AdminEditSocialMedia",
                            "/AdminViewSocialMedia",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-share-alt nav-icon"></i> Social Media
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListCampaign"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListCampaign",
                            "/AdminAddCampaign",
                            "/AdminEditCampaign",
                            "/AdminViewCampaign",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-bullhorn nav-icon"></i> Campaigns
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListDailyTask"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListDailyTask",
                            "/AdminAddDailyTask",
                            "/AdminEditDailyTask",
                            "/AdminViewDailyTask",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-tasks nav-icon"></i> Daily Task
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListNotifications"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListNotifications",
                      "/AdminAddNotifications",
                      "/AdminEditNotifications",
                      "/AdminViewNotifications",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-bell nav-icon"></i>
                    Notifications
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListMeetings"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListMeetings",
                      "/AdminAddMeetings",
                      "/AdminEditMeetings",
                      "/AdminViewMeetings",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >

                    <i class="fa fa-video nav-icon"></i>  Meetings
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListTraining"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListTraining",
                      "/AdminAddTraining",
                      "/AdminEditTraining",
                      "/AdminViewTraining",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >

                    <i class="fa fa-book nav-icon"></i> Training Material
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListChat"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListChat",
                      "/AdminAddChat",
                      "/AdminEditChat",
                      "/AdminViewChat",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >

                    <i class="fa fa-comments nav-icon"></i> Chat
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListEmail"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListEmail",
                      "/AdminAddEmail",
                      "/AdminEditEmail",
                      "/AdminViewEmail",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-envelope nav-icon"></i>
                    Email
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListPromotions"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListPromotions",
                      "/AdminAddPromotions",
                      "/AdminEditPromotions",
                      "/AdminViewPromotions",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-bullhorn nav-icon"></i>
                    Promotions
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListEvents"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListEvents",
                      "/AdminAddEvents",
                      "/AdminEditEvents",
                      "/AdminViewEvents",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-calendar nav-icon"></i>
                    Events
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListBlog"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListBlog",
                      "/AdminAddBlog",
                      "/AdminEditBlog",
                      "/AdminViewBlog",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >

                    <i class="fa fa-blog nav-icon"></i> Blogs
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminListTestimonials"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminListTestimonials",
                      "/AdminAddTestimonials",
                      "/AdminEditTestimonials",
                      "/AdminViewTestimonials",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >

                    <i class="fa fa-quote-right nav-icon"></i>  Testimonials
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/AdminAdminList"
                    target="_self"
                    className={`nav-link sidebar_link ${[
                      "/AdminAdminList",
                      "/AdminAddAdmin",
                      "/AdminEditAdmin",
                      "/AdminViewAdmin",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-user-shield nav-icon"></i>
                    Admin
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.elt}
                    aria-controls="collapse4"
                    style={{

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("elt")}
                  >
                    <div >
                      <i class="fa fa-book nav-icon"></i>
                      ELT
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.elt ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.elt ? "show" : ""}`}
                    id="collapse4"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="/AdminListBookings"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListBookings",
                            "/AdminAddBookings",
                            "/AdminEditBookings",
                            "/AdminViewBookings",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-calendar-check nav-icon"></i>  Booking
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="/AdminListClassSchedule"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListClassSchedule",
                            "/AdminAddClassSchedule",
                            "/AdminEditClassSchedule",
                            "/AdminViewClassSchedule",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-calendar nav-icon"></i> Class Schedule
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

              

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link sidebar_link "
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.Reports}
                    aria-controls="collapse4"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Reports")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i class="fa fa-file-alt nav-icon"></i>
                      Reports
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Reports ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.Reports ? "show" : ""}`}
                    id="collapse4"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a
                          href="#"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListReportEmployee",
                            "/AdminAddReportEmployee",
                            "/AdminEditReportEmployee",
                            "/AdminViewReportEmployee",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-tie nav-icon"></i>  Employee
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListReportAgent",
                            "/AdminAddReportAgent",
                            "/AdminEditReportAgent",
                            "/AdminViewReportAgent",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-secret nav-icon"></i> Agent
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminList",
                            "/AdminAddReportStudents",
                            "/AdminEditReportStudents",
                            "/AdminViewReportStudents",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-graduate nav-icon"></i> Students
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListReportBranch",
                            "/AdminAddReportBranch",
                            "/AdminEditReportBranch",
                            "/AdminViewReportBranch",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >

                          <i class="fa fa-sitemap nav-icon"></i>
                          Branch
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#"
                          target="_self"
                          className={`nav-link sidebar_link ${[
                            "/AdminListReportAdmin",
                            "/AdminAddReportAdmin",
                            "/AdminEditReportAdmin",
                            "/AdminViewReportAdmin",
                          ].includes(currentPath)
                            ? "active"
                            : ""
                            }`}
                        >
                          <i class="fa fa-user-shield nav-icon"></i>  Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <a href="/"
                    className="nav-link sidebar_link"
                    target="_self"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      
                    />
                    Log Out
                  </a>
                </li>
              </ul>
              <br />
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};


export default AdminSidebar