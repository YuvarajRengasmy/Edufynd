import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Edufynd from "../Assests/White Logo EduFynd.png";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";
import { Global } from "@emotion/react";


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
        "/AddIncome",
        "/EditIncome",
        "/ViewIncome",
        "/ListExpenses",
        "/AddExpenses",
        "/EditExpenses",
        "/ViewExpenses",
        "/ListRaiseQuotations",
        "/AddRaiseQuotations",
        "/EditRaiseQuotations",
        "/ViewRaiseQuotations",
        "/ListInvoice",
        "/AddInvoice",
        "/EditInvoice",
        "/ViewInvoice",
        "/ListIncomeReport",
        "/AddIncomeReport",
        "/EditIncomeReport",
        "/ViewIncomeReport",
      ],
      hrms: [
        "/ListStaffHRM",
        "/AddStaffHRM",
        "/EditStaffHRM",
        "/ViewStaffHRM",
        "/ListAttendance",
        "/AddAttendance",
        "/EditAttendance",
        "/ViewAttendance",
        "/ListPayroll",
        "/AddPayroll",
        "/EditPayroll",
        "/ViewPayroll",
        "/ListLeave",
        "/AddLeave",
        "/EditLeave",
        "/ViewLeave",
        "/ListKPI",
        "/AddKPI",
        "/EditKPI",
        "/ViewKPI",
        "/ListPolicies",
        "/AddPolicies",
        "/EditPolicies",
        "/ViewPolicies",
        "/ListPerformanceReport",
        "/AddPerformanceReport",
        "/EditPerformanceReport",
        "/ViewPerformanceReport",
      ],
      Projects: [
        "/ListProject",
        "/AddProject",
        "/EditProject",
        "/ViewProject",
        "/ListTask",
        "/AddTask",
        "/EditTask",
        "/ViewTask",
      ],
      Marketing: [
        "/ListSocialMedia",
        "/AddSocialMedia",
        "/EditSocialMedia",
        "/ViewSocialMedia",
        "/ListCampaign",
        "/AddCampaign",
        "/EditCampaign",
        "/ViewCampaign",
        "/ListDailyTask",
        "/AddDailyTask",
        "/EditDailyTask",
        "/ViewDailyTask",
      ],
      elt: [
        "/ListBookings",
        "/AddBookings",
        "/EditBookings",
        "/ViewBookings",
        "/ListClassSchedule",
        "/AddClassSchedule",
        "/EditClassSchedule",
        "/ViewClassSchedule",
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
    <>
      <aside
        className="main-sidebar elevation-10 d-none text-bg-white   d-lg-block"
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
                <Link to="/DashBoard"
                 
                 
                  className="brand-text font-weight-light text-decoration-none"
                >
                  <img
                    src={Edufynd}
                    alt="logo"
                    className="img-fluid "
                    style={{ width: "100%" }}
                  />
                </Link>
              </div>
            </div>
            <nav>
              <ul
                className="nav  nav-sidebar flex-column "
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link to="/DashBoard"
                   
                   
                    className={`nav-link sidebar_link ${activeLink === "/DashBoard" ? "active" : ""
                      }`}
                    onClick={() => handleSetActiveLink("/DashBoard")}
                  >
                    <i class="fa fa-tachometer-alt nav-icon"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ListClient"
                   
                   
                    className={`nav-link sidebar_link ${[
                      "/ListClient",
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListUniversity"
                   
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListCommission"
                   
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/Programs"
                   
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.users ? "show" : ""}`}
                    id="collapse3"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListStudent"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListStaff"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListAgent"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to="/ListApplication"
                   
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.enquiry ? "show" : ""}`}
                    id="collapse1"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListStudentForm"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListForexForm"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListAccommodation"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListFlightTicket"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListLoanEnquiry"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListBusinessEnquiry"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListGeneralEnquiry"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.finance ? "show" : ""}`}
                    id="collapse2"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListIncome"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListExpenses"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListRaiseQuotations"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListInvoice"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListIncomeReport"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.hrms ? "show" : ""}`}
                    id="collapse5"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListStaffHRM"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListAttendance"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListPayroll"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListLeave"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListKPI"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/ListPolicies"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListPerformanceReport"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.Projects ? "show" : ""}`}
                    id="collapse12"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListProject"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListTask"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.Marketing ? "show" : ""}`}
                    id="collapse17"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListSocialMedia"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListCampaign"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListDailyTask"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to="/ListNotifications"
                   
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListMeetings"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListTraining"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListChat"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListEmail"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListPromotions"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListEvents"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListBlog"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ListTestimonials"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/AdminList"
                    
                   
                    className={`nav-link sidebar_link ${[
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
                  </Link>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.elt ? "show" : ""}`}
                    id="collapse4"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="/ListBookings"
                          
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/ListClassSchedule"
                          
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
                    className="nav-link sidebar_link "
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.settings ? "show" : ""}`}
                    id="collapse6"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      {/* Global Settings */}
                      <li className="nav-item">
                        <Link to="#"
                         
                          className="nav-link sidebar_link "
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
                        </Link>
                        <div
                          className={`collapse ${isOpen.globalSettings ? "show" : ""
                            }`}
                          id="collapse7"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListGlobalEmail",
                                  "/AddGlobalEmail",
                                  "/EditGlobalEmail",
                                  "/ViewGlobalEmail",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-envelope nav-icon"></i> Email
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/GlobalSettings"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/GlobalSettings",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-globe nav-icon"></i>  Country
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/CurrencySettings"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListLeave",
                                  "/AddLeave",
                                  "/EditLeave",
                                  "/ViewLeave",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-money-bill-wave nav-icon"></i>
                                Currency
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/Status"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/Status",

                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-clipboard-list nav-icon"></i>   Status
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/Intake"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/Intake",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-calendar-alt nav-icon"></i>  Intake
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/YearSetting"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/YearSetting",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-calendar nav-icon"></i> Year
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListGlobalPrivileges",
                                  "/AddGlobalPrivileges",
                                  "/EditGlobalPrivileges",
                                  "/ViewGlobalPrivileges",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-lock nav-icon"></i>   Privileges
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListGlobalDashBoard",
                                  "/AddGlobalDashBoard",
                                  "/EditGlobalDashBoard",
                                  "/ViewGlobalDashBoard",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-tachometer-alt nav-icon"></i> Dashboard
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Module */}
                      <li className="nav-item">
                        <Link to="#"
                         
                          className="nav-link sidebar_link "
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
                        </Link>
                        <div
                          className={`collapse ${isOpen.modules ? "show" : ""}`}
                          id="collapse8"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <Link to="/UniversitySettings"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/UniversitySettings",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-university nav-icon"></i>  University
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/CourseType"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/CourseType",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-book nav-icon"></i>  Course Type
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListModuleEmail",
                                  "/AddModuleEmail",
                                  "/EditModuleEmail",
                                  "/ViewModuleEmail",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-envelope nav-icon"></i> Email
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListModuleIntake",
                                  "/AddModuleIntake",
                                  "/EditModuleIntake",
                                  "/ViewModuleIntake",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-calendar-alt nav-icon"></i>  Intake
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="/ClientModule"
                                
                               
                                className={`nav-link sidebar_link ${[
                                  "/ClientModule",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-user nav-icon"></i>  Client
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
                                  "/ListCustomModule",
                                  "/AddCustomModule",
                                  "/EditCustomModule",
                                  "/ViewCustomModule",
                                ].includes(currentPath)
                                  ? "active"
                                  : ""
                                  }`}
                              >
                                <i class="fa fa-cogs nav-icon"></i> Custom Module
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Privileges */}
                      <li className="nav-item">
                        <Link to="#"
                         
                          className="nav-link sidebar_link "
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
                        </Link>
                        <div
                          className={`collapse ${isOpen.privileges ? "show" : ""
                            }`}
                          id="collapse9"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
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
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
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
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
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
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link to="#"
                               
                               
                                className={`nav-link sidebar_link ${[
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
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link to="#"
                   
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
                  </Link>
                  <div
                    className={`collapse ${isOpen.Reports ? "show" : ""}`}
                    id="collapse4"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link to="#"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="#"
                         
                         
                          className={`nav-link sidebar_link ${[
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
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to="/" 
                    className="nav-link sidebar_link"
                   
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      
                    />
                    Log Out
                  </Link>
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
export default Sidebar;
