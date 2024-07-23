import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = () => {

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
    settings: false,
    globalSettings: false,
    modules: false,
    privileges: false,
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
        "/ListStudent",
        "/AddStudentSA",
        "/ViewStudent",
        "/EditStudent",
        "/ListStaff",
        "/AddStaff",
        "/EditStaff",
        "/ViewStaff",
        "/ViewAgent",
        "/EditAgent",
        "/ListAgent",
        "/AddAgent",
      ],
      enquiry: [
        "/ListStudentForm",
        "/AddStudentForm",
        "/EditStudentForm",
        "/ViewStudentForm",
        "/ListForexForm",
        "/AddForexForm",
        "/EditForexForm",
        "/ViewForexForm",
        "/ListAccommodation",
        "/AddAccommodation",
        "/EditAccommodation",
        "/ViewAccommodation",
        "/ListFlightTicket",
        "/AddFlightTicket",
        "/EditFlightTicket",
        "/ViewFlightTicket",
        "/ListLoanEnquiry",
        "/AddLoanEnquiry",
        "/EditLoanEnquiry",
        "/ViewLoanEnquiry",
        "/ListBusinessEnquiry",
        "/AddBusinessEnquiry",
        "/EditBusinessEnquiry",
        "/ViewBusinessEnquiry",
        "/ListGeneralEnquiry",
        "/AddGeneralEnquiry",
        "/EditGeneralEnquiry",
        "/ViewGeneralEnquiry",
      ],
      finance: [
        "/ListIncome",
        "/ListExpenses",
        "/ListRaiseQuotations",
        "/ListInvoice",
        "/ListIncomeReport",
      ],
      hrms: [
        "/ListStaffHRM",
        "/ListAttendance",
        "/ListPayroll",
        "/ListLeave",
        "/ListKPI",
        "/ListPolicies",
        "/ListPerformanceReport",
      ],
      Projects: [
        "/ListProject",
        "/ListTask",
      ],
      Marketing: [
        "/ListSocialMedia",
        "/ListCampaign",
        "/ListDailyTask",
      ],
      elt: [
        "/ListBookings",
        "/ListClassSchedule",
      ],
      settings: [
        "/GlobalSettings",
        "/CurrencySettings",
        "/Status",
        "/Intake",
        "/YearSetting",
        "/ClientModule",
        // Add more paths as needed
      ],
      Reports: [
        "/EmployeeReports",
        "/AgentReports",
        "/StudentReports",
        "/BranchReports",
        "/AdminReports",
      ],
    };

    const newIsOpen = Object.keys(dropdownPaths).reduce((acc, key) => {
      acc[key] = dropdownPaths[key].some(path => currentPath.includes(path));
      return acc;
    }, {});

    setIsOpen(prevState => ({ ...prevState, ...newIsOpen }));
  }, [currentPath]);

  return (
    <div
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: "Plus Jakarta Sans",
        fontVariant:"all-small-caps"
      }}
    >
      <aside
        className="main-sidebar elevation-10 d-none text-bg-white   d-lg-block"
        style={{
          position: "fixed",
          width: "240px",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div className="  shadow-none   ">
          <div className="sidebar">
            <div className="user-panel mt-2  d-flex">
              <div className="info  mt-1">
                <a
                  href="/DashBoard"
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
                    href="/DashBoard"
                    target="_self"
                    className={`nav-link ${activeLink === "/DashBoard" ? "active" : ""
                      }`}
                    onClick={() => handleSetActiveLink("/DashBoard")}
                  >
                    <i
                      className="nav-icon fas fa-tachometer-alt"
                      style={{ fontSize: "12px" }}
                    />
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/client"
                    target="_self"
                    className={`nav-link ${[
                        "/client",
                        "/AddClient",
                        "/ViewClient",
                        "/EditClient",
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
                    href="/ListUniversity"
                    target="_self"
                    className={`nav-link ${[
                        "/ListUniversity",
                        "/AddUniversity",
                        "/ViewUniversity",
                        "/EditUniversity",
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
                    href="/ListCommission"
                    target="_self"
                    className={`nav-link ${[
                        "/ListCommission",
                        "/AddCommission",
                        "/ViewCommission",
                        "/EditCommission",
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
                    href="/Programs"
                    target="_self"
                    className={`nav-link ${[
                        "/Programs",
                        "/AddProgram",
                        "/EditProgram",
                        "/ViewProgram",
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
                    className="nav-link "
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
                          href="/ListStudent"
                          target="_self"
                          className={`nav-link ${[
                              "/ListStudent",
                              "/AddStudentSA",
                              "/ViewStudent",
                              "/EditStudent",
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
                          href="/ListStaff"
                          target="_self"
                          className={`nav-link ${[
                              "/ListStaff",
                              "/AddStaff",
                              "/EditStaff",
                              "/ViewStaff",
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
                          href="/ListAgent"
                          target="_self"
                          className={`nav-link ${[
                              "/ViewAgent",
                              "/EditAgent",
                              "/ListAgent",
                              "/AddAgent",
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
                    href="/ListApplication"
                    target="_self"
                    className={`nav-link ${[
                        "/ListApplication",
                        "/AddApplication",
                        "/EditApplication",
                        "/Application",
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
                    className="nav-link"
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
                          href="/ListStudentForm"
                          target="_self"
                          className={`nav-link ${[
                              "/ListStudentForm",
                              "/AddStudentForm",
                              "/EditStudentForm",
                              "/ViewStudentForm",
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
                          href="/ListForexForm"
                          target="_self"
                          className={`nav-link ${[
                              "/ListForexForm",
                              "/AddForexForm",
                              "/EditForexForm",
                              "/ViewForexForm",
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
                          href="/ListAccommodation"
                          target="_self"
                          className={`nav-link ${[
                            "/ListAccommodation",
                            "/AddAccommodation",
                            "/EditAccommodation",
                            "/ViewAccommodation",
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
                          href="/ListFlightTicket"
                          target="_self"
                          className={`nav-link ${[
                            "/ListFlightTicket",
                            "/AddFlightTicket",
                            "/EditFlightTicket",
                            "/ViewFlightTicket",
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
                          href="/ListLoanEnquiry"
                          target="_self"
                          className={`nav-link ${[
                            "/ListLoanEnquiry",
                            "/AddLoanEnquiry",
                            "/EditLoanEnquiry",
                            "/ViewLoanEnquiry",
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
                          href="/ListBusinessEnquiry"
                          target="_self"
                          className={`nav-link ${[
                            "/ListBusinessEnquiry",
                            "/AddBusinessEnquiry",
                            "/EditBusinessEnquiry",
                            "/ViewBusinessEnquiry",
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
                          href="/ListGeneralEnquiry"
                          target="_self"
                          className={`nav-link ${[
                            "/ListGeneralEnquiry",
                            "/AddGeneralEnquiry",
                            "/EditGeneralEnquiry",
                            "/ViewGeneralEnquiry",
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
                    className="nav-link "
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
                          href="/ListIncome"
                          target="_self"
                          className={`nav-link ${[
                            "/ListIncome",
                            "/AddIncome",
                            "/EditIncome",
                            "/ViewIncome",
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
                          href="/ListExpenses"
                          target="_self"
                          className={`nav-link ${[
                            "/ListExpenses",
                            "/AddExpenses",
                            "/EditExpenses",
                            "/ViewExpenses",
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
                          href="/ListRaiseQuotations"
                          target="_self"
                          className={`nav-link ${[
                            "/ListRaiseQuotations",
                            "/AddRaiseQuotations",
                            "/EditRaiseQuotations",
                            "/ViewRaiseQuotations",
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
                          href="/ListInvoice"
                          target="_self"
                          className={`nav-link ${[
                            "/ListInvoice",
                            "/AddSenderInvoice",
                            "/AddRecieverInvoice",
                            "/EditInvoice",
                            "/ViewInvoice",
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
                          href="/ListIncomeReport"
                          target="_self"
                          className={`nav-link ${[
                            "/ListIncomeReport",
                            "/AddIncomeReport",
                            "/EditIncomeReport",
                            "/ViewIncomeReport",
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
                    className="nav-link "
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
                          href="/ListStaffHRM"
                          target="_self"
                          className={`nav-link ${[
                            "/ListStaffHRM",
                            "/AddStaffHRM",
                            "/EditStaffHRM",
                            "/ViewStaffHRM",
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
                          href="/ListAttendance"
                          target="_self"
                          className={`nav-link ${[
                            "/ListAttendance",
                            "/AddAttendance",
                            "/EditAttendance",
                            "/ViewAttendance",
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
                          className={`nav-link ${[
                            "/ListPayroll",
                            "/AddPayroll",
                            "/EditPayroll",
                            "/ViewPayroll",
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
                          href="/ListLeave"
                          target="_self"
                          className={`nav-link ${[
                            "/ListLeave",
                            "/AddLeave",
                            "/EditLeave",
                            "/ViewLeave",
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
                          href="/ListKPI"
                          target="_self"
                          className={`nav-link ${[
                            "/ListKPI",
                            "/AddKPI",
                            "/EditKPI",
                            "/ViewKPI",
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
                          href="/ListPolicies"
                          target="_self"
                          className={`nav-link ${[
                            "/ListPolicies",
                            "/AddPolicies",
                            "/EditPolicies",
                            "/ViewPolicies",
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
                          href="/ListPerformanceReport"
                          target="_self"
                          className={`nav-link ${[
                            "/ListPerformanceReport",
                            "/AddPerformanceReport",
                            "/EditPerformanceReport",
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
                    className="nav-link "
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
                          href="/ListProject"
                          target="_self"
                          className={`nav-link ${[
                            "/ListProject",
                            "/AddProject",
                            "/EditProject",
                            "/ViewProject",
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
                          href="/ListTask"
                          target="_self"
                          className={`nav-link ${[
                            "/ListTask",
                            "/AddTask",
                            "/EditTask",
                            "/ViewTask",
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
                    className="nav-link "
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
                          href="/ListSocialMedia"
                          target="_self"
                           className={`nav-link ${[
                            "/ListSocialMedia",
                            "/AddSocialMedia",
                            "/EditSocialMedia",
                            "/ViewSocialMedia",
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
                          href="/ListCampaign"
                          target="_self"
                          className={`nav-link ${[
                            "/ListCampaign",
                            "/AddCampaign",
                            "/EditCampaign",
                            "/ViewCampaign",
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
                          href="/ListDailyTask"
                          target="_self"
                          className={`nav-link ${[
                            "/ListDailyTask",
                            "/AddDailyTask",
                            "/EditDailyTask",
                            "/ViewDailyTask",
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
                    href="/ListNotifications"
                    target="_self"
                    className={`nav-link ${[
                      "/ListNotifications",
                      "/AddNotifications",
                      "/EditNotifications",
                      "/ViewNotifications",
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
                    href="/ListMeetings"
                    target="_self"
                    className={`nav-link ${[
                      "/ListMeetings",
                      "/AddMeetings",
                      "/EditMeetings",
                      "/ViewMeetings",
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
                    href="/ListTraining"
                    target="_self"
                    className={`nav-link ${[
                      "/ListTraining",
                      "/AddTraining",
                      "/EditTraining",
                      "/ViewTraining",
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
                    href="/ListChat"
                    target="_self"
                    className={`nav-link ${[
                      "/ListChat",
                      "/AddChat",
                      "/EditChat",
                      "/ViewChat",
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
                    href="/ListEmail"
                    target="_self"
                    className={`nav-link ${[
                      "/ListEmail",
                      "/AddEmail",
                      "/EditEmail",
                      "/ViewEmail",
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
                    href="/ListPromotions"
                    target="_self"
                    className={`nav-link ${[
                      "/ListPromotions",
                      "/AddPromotions",
                      "/EditPromotions",
                      "/ViewPromotions",
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
                    href="/ListEvents"
                    target="_self"
                    className={`nav-link ${[
                      "/ListEvents",
                      "/AddEvents",
                      "/EditEvents",
                      "/ViewEvents",
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
                    href="/ListBlog"
                    target="_self"
                    className={`nav-link ${[
                      "/ListBlog",
                      "/AddBlog",
                      "/EditBlog",
                      "/ViewBlog",
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
                    href="/ListTestimonials"
                    target="_self"
                    className={`nav-link ${[
                      "/ListTestimonials",
                      "/AddTestimonials",
                      "/EditTestimonials",
                      "/ViewTestimonials",
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
                    href="/AdminList"
                    target="_self"
                    className={`nav-link ${[
                      "/AdminList",
                      "/AddAdmin",
                      "/EditAdmin",
                      "/ViewAdmin",
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
                    className="nav-link"
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
                          href="/ListBookings"
                          target="_self"
                          className={`nav-link ${[
                            "/ListBookings",
                            "/AddBookings",
                            "/EditBookings",
                            "/ViewBookings",
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
                          href="/ListClassSchedule"
                          target="_self"
                          className={`nav-link ${[
                            "/ListClassSchedule",
                            "/AddClassSchedule",
                            "/EditClassSchedule",
                            "/ViewClassSchedule",
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
                    className="nav-link "
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.settings}
                    aria-controls="collapse6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("settings")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                     <i class="fa fa-cog fa-spin nav-icon"></i>
                      Settings
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.settings ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                    />
                  </a>
                  <div
                    className={`collapse ${isOpen.settings ? "show" : ""}`}
                    id="collapse6"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      {/* Global Settings */}
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link "
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.globalSettings}
                          aria-controls="collapse7"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("globalSettings")}
                        >
                          <div>
                          <i class="fa fa-globe nav-icon"></i>   Global Settings
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.globalSettings ? "rotate-icon" : ""
                              }`}
                            aria-hidden="true"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </a>
                        <div
                          className={`collapse ${isOpen.globalSettings ? "show" : ""
                            }`}
                          id="collapse7"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListGlobalEmail",
                                  "/AddGlobalEmail",
                                  "/EditGlobalEmail",
                                  "/ViewGlobalEmail",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Email
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/GlobalSettings"
                                target="_self"
                                className={`nav-link ${[
                                  "/GlobalSettings",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Country
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/CurrencySettings"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListLeave",
                                  "/AddLeave",
                                  "/EditLeave",
                                  "/ViewLeave",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Currency
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/Status"
                                target="_self"
                                className={`nav-link ${[
                                  "/Status",
                                  
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Status
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/Intake"
                                target="_self"
                                className={`nav-link ${[
                                  "/Intake",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Intake
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/YearSetting"
                                target="_self"
                                className={`nav-link ${[
                                  "/YearSetting",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Year
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListGlobalPrivileges",
                                  "/AddGlobalPrivileges",
                                  "/EditGlobalPrivileges",
                                  "/ViewGlobalPrivileges",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Privileges
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListGlobalDashBoard",
                                  "/AddGlobalDashBoard",
                                  "/EditGlobalDashBoard",
                                  "/ViewGlobalDashBoard",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Dashboard
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Module */}
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link "
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.modules}
                          aria-controls="collapse8"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("modules")}
                        >
                          <div>
                          <i class="fa fa-cogs nav-icon"></i> Module
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.modules ? "rotate-icon" : ""
                              }`}
                            aria-hidden="true"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </a>
                        <div
                          className={`collapse ${isOpen.modules ? "show" : ""}`}
                          id="collapse8"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <a
                                href="/UniversitySettings"
                                target="_self"
                                className={`nav-link ${[
                                  "/UniversitySettings",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                University
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/CourseType"
                                target="_self"
                                className={`nav-link ${[
                                  "/CourseType",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Course Type
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListModuleEmail",
                                  "/AddModuleEmail",
                                  "/EditModuleEmail",
                                  "/ViewModuleEmail",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Email
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListModuleIntake",
                                  "/AddModuleIntake",
                                  "/EditModuleIntake",
                                  "/ViewModuleIntake",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Intake
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="/ClientModule"
                                target="_self"
                                className={`nav-link ${[
                                  "/ClientModule",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Client
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListCustomModule",
                                  "/AddCustomModule",
                                  "/EditCustomModule",
                                  "/ViewCustomModule",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                Custom Module
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Privileges */}
                      <li className="nav-item">
                        <a
                          href="#"
                          className="nav-link "
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.privileges}
                          aria-controls="collapse9"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("privileges")}
                        >
                          <div>
                          <i class="fa fa-lock nav-icon"></i> Privileges
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.privileges ? "rotate-icon" : ""
                              }`}
                            aria-hidden="true"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </a>
                        <div
                          className={`collapse ${isOpen.privileges ? "show" : ""
                            }`}
                          id="collapse9"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListPrivilegesProgram",
                                  "/AddPrivilegesProgram",
                                  "/EditPrivilegesProgram",
                                  "/ViewPrivilegesProgram",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                              <i class="fa fa-cogs nav-icon"></i> Program
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListPrivilegesHRM",
                                  "/AddPrivilegesHRM",
                                  "/EditPrivilegesHRM",
                                  "/ViewPrivilegesHRM",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                              <i class="fa fa-people-carry nav-icon"></i>  HRM
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListPrivilegesAttendance",
                                  "/AddPrivilegesAttendance",
                                  "/EditPrivilegesAttendance",
                                  "/ViewPrivilegesAttendance",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                               <i class="fa fa-calendar-check nav-icon"></i>  Attendance
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                href="#"
                                target="_self"
                                className={`nav-link ${[
                                  "/ListPrivilegesPayroll",
                                  "/AddPrivilegesPayroll",
                                  "/EditPrivilegesPayroll",
                                  "/ViewPrivilegesPayroll",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                }`}
                              >
                                 <i class="fa fa-dollar-sign nav-icon"></i> Payroll
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a
                    href="#"
                    className="nav-link "
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
                          className={`nav-link ${[
                            "/ListReportEmployee",
                            "/AddReportEmployee",
                            "/EditReportEmployee",
                            "/ViewReportEmployee",
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
                          className={`nav-link ${[
                            "/ListReportAgent",
                            "/AddReportAgent",
                            "/EditReportAgent",
                            "/ViewReportAgent",
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
                          className={`nav-link ${[
                            "/ListReportStudents",
                            "/AddReportStudents",
                            "/EditReportStudents",
                            "/ViewReportStudents",
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
                          className={`nav-link ${[
                            "/ListReportBranch",
                            "/AddReportBranch",
                            "/EditReportBranch",
                            "/ViewReportBranch",
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
                          className={`nav-link ${[
                            "/ListReportAdmin",
                            "/AddReportAdmin",
                            "/EditReportAdmin",
                            "/ViewReportAdmin",
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
                  <div
                    className="nav-link"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      style={{ fontSize: "12px" }}
                    />
                    Log Out
                  </div>
                </li>
              </ul>
              <br />
            </nav>
          </div>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
