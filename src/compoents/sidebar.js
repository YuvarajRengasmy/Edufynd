import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Edufynd from "../Assests/White Logo EduFynd.png";
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
    socialmedia: false,
  });

  const sidebarRefs = useRef({});

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
      Marketing: {
        socialMedia: {
          facebook: ["/ListFacebook", "/AddFacebook", "/EditFacebook", "/ViewFacebook"],
          linkedIn: ["/ListLinkedIn", "/AddLinkedIn", "/EditLinkedIn", "/ViewLinkedIn"],
          instagram: ["/ListInstagram", "/AddInstagram", "/EditInstagram", "/ViewInstagram"],
        },
        campaigns: ["/ListCampaign", "/AddCampaign", "/EditCampaign", "/ViewCampaign"],
        dailyTasks: ["/ListDailyTask", "/AddDailyTask", "/EditDailyTask", "/ViewDailyTask"],
      },
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
      settings: {
        globalSettings: [
          "/GlobalSettings",
          "/CurrencySettings",
          "/Status",
          "/Intake",
          "/YearSetting",
        ],
        modules: [
          "/ClientModule",
          "/UniversitySettings",
          "/ApplicationStatus",
          "/CourseType",
        ],
        privileges: [
          "/AdminPrivileges",
          "/UserPrivileges",
          "/RoleManagement",
        ],
      },
      Reports: [
        "/EmployeeReports",
        "/AgentReports",
        "/StudentReports",
        "/BranchReports",
        "/AdminReports",
      ],
      Socialmedia: [
        "/ListFacebook",
        "/AddFacebook",
        "/EditFacebook",
        "/ViewFacebook",
        "/ListLinkedIn",
        "/AddLinkedIn",
        "/EditLinkedIn",
        "/ViewLinkedIn",
        "/ListInstagram",
        "/AddInstagram",
        "/EditInstagram",
        "/ViewInstagram",
      ],
      globalSettings: [
        "/GlobalSettings",
        "/CurrencySettings",
        "/Status",
        "/Intake",
        "/YearSetting",
      ],
      modules: [
        "/ClientModule",
        "/UniversitySettings",
        "/ApplicationStatus",
        "/CourseType",
      ],
    };

    const checkNestedPaths = (paths, currentPath) => {
      if (Array.isArray(paths)) {
        return paths.some(path => currentPath.includes(path));
      }
      return Object.keys(paths).some(key => checkNestedPaths(paths[key], currentPath));
    };

    const newIsOpen = Object.keys(dropdownPaths).reduce((acc, key) => {
      acc[key] = checkNestedPaths(dropdownPaths[key], currentPath);
      return acc;
    }, {});

    setIsOpen(prevState => ({ ...prevState, ...newIsOpen }));
  }, [currentPath]);

  useEffect(() => {
    const activeRef = Object.values(sidebarRefs.current).find(ref => 
      ref && currentPath.includes(ref.dataset.path)
    );
  
    if (activeRef) {
      setTimeout(() => {
        activeRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100); // Adjust delay as necessary
    }
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
          fontSize:'16px',
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
  <Link 
    to="/DashBoard"
    ref={el => (sidebarRefs.current['/DashBoard'] = el)}
    className={`nav-link sidebar_link ${activeLink === "/DashBoard" ? "active" : ""}`}
    onClick={() => handleSetActiveLink("/DashBoard")}
      data-path="/DashBoard"
  >
    <i className="fa fa-tachometer-alt nav-icon"></i>
    Dashboard
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListClient"
    ref={el => (sidebarRefs.current['/ListClient'] = el)}
    className={`nav-link sidebar_link ${
      ["/ListClient", "/AddClient", "/ViewClient", "/EditClient"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/ListClient")}
     data-path="/ListClient"
  >
    <i className="fa fa-user nav-icon"></i>
    Client
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListUniversity"
    ref={el => (sidebarRefs.current['/ListUniversity'] = el)}
    className={`nav-link sidebar_link ${
      ["/ListUniversity", "/AddUniversity", "/ViewUniversity", "/EditUniversity"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/ListUniversity")}
     data-path="/ListUniversity"
  >
    <i className="fa fa-graduation-cap nav-icon"></i>
    University
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListCommission"
    ref={el => (sidebarRefs.current['/ListCommission'] = el)}
    className={`nav-link sidebar_link ${
      ["/ListCommission", "/AddCommission", "/ViewCommission", "/EditCommission"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/ListCommission")}
     data-path="/ListCommission"
  >
    <i className="fa fa-dollar-sign nav-icon"></i>
    Commission
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/Programs" 
    ref={el => (sidebarRefs.current['/Programs'] = el)} 
    className={`nav-link sidebar_link ${
      ["/Programs", "/AddProgram", "/EditProgram", "/ViewProgram"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/Programs")}
     data-path="/Programs"
  >
    <i className="fa fa-cogs nav-icon"></i>
    Program
  </Link>
</li>

<li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
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
      <i className="fa fa-users nav-icon"></i>
      Users
    </div>
    <i
      className={`fa fa-angle-right ${isOpen.users ? "rotate-icon" : ""}`}
      aria-hidden="true"
    />
  </Link>
  <div
    className={`collapse ${isOpen.users ? "show" : ""}`}
    id="collapse3"
  >
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item">
        <Link 
          to="/ListStudent"
          ref={el => (sidebarRefs.current['/ListStudent'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListStudent", "/AddStudentSA", "/ViewStudent", "/EditStudent"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListStudent")}
           data-path="/ListStudent"
        >
          <i className="fa fa-user-graduate nav-icon"></i> Students
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListStaff"
          ref={el => (sidebarRefs.current['/ListStaff'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListStaff", "/AddStaff", "/EditStaff", "/ViewStaff"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListStaff")}
           data-path="/ListStaff"
        >
          <i className="fa fa-user-tie nav-icon"></i> Staffs
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListAgent"
          ref={el => (sidebarRefs.current['/ListAgent'] = el)}
          className={`nav-link sidebar_link ${
            ["/ViewAgent", "/EditAgent", "/ListAgent", "/AddAgent"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListAgent")}
           data-path="/ListAgent"
        >
          <i className="fa fa-user-secret nav-icon"></i> Agents
        </Link>
      </li>
    </ul>
  </div>
</li>




<li className="nav-item">
  <Link 
    to="/ListApplication"
    ref={el => (sidebarRefs.current['/ListApplication'] = el)}
    className={`nav-link sidebar_link ${
      ["/ListApplication", "/AddApplication", "/EditApplication", "/Application"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/ListApplication")}
     data-path="/ListApplication"
  >
    <i className="fa fa-archive nav-icon"></i> Application
  </Link>
</li>

<li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
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
      <i className="fa fa-question-circle nav-icon"></i> Enquiry
    </div>
    <i
      className={`fa fa-angle-right ${isOpen.enquiry ? "rotate-icon" : ""}`}
      aria-hidden="true"
    />
  </Link>
  <div
    className={`collapse ${isOpen.enquiry ? "show" : ""}`}
    id="collapse1"
  >
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item">
        <Link 
          to="/ListStudentForm"
          ref={el => (sidebarRefs.current['/ListStudentForm'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListStudentForm", "/AddStudentForm", "/EditStudentForm", "/ViewStudentForm"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListStudentForm")}
           data-path="/ListStudentForm"
        >
          <i className="fa fa-user-graduate nav-icon"></i> Student
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListForexForm"
          ref={el => (sidebarRefs.current['/ListForexForm'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListForexForm", "/AddForexForm", "/EditForexForm", "/ViewForexForm"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListForexForm")}
           data-path="/ListForexForm"
        >
          <i className="fa fa-money-bill-wave nav-icon"></i> FOREX
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListAccommodation"
          ref={el => (sidebarRefs.current['/ListAccommodation'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListAccommodation", "/AddAccommodation", "/EditAccommodation", "/ViewAccommodation"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListAccommodation")}
           data-path="/ListAccommodation"
        >
          <i className="fa fa-bed nav-icon"></i> Accommodation
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListFlightTicket"
          ref={el => (sidebarRefs.current['/ListFlightTicket'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListFlightTicket", "/AddFlightTicket", "/EditFlightTicket", "/ViewFlightTicket"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListFlightTicket")}
           data-path="/ListFlightTicket"
        >
          <i className="fa fa-plane nav-icon"></i> Flight
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListLoanEnquiry"
          ref={el => (sidebarRefs.current['/ListLoanEnquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListLoanEnquiry", "/AddLoanEnquiry", "/EditLoanEnquiry", "/ViewLoanEnquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListLoanEnquiry")}
           data-path="/ListLoanEnquiry"
        >
          <i className="fa fa-credit-card nav-icon"></i> Loan
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListBusinessEnquiry"
          ref={el => (sidebarRefs.current['/ListBusinessEnquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListBusinessEnquiry", "/AddBusinessEnquiry", "/EditBusinessEnquiry", "/ViewBusinessEnquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListBusinessEnquiry")}
           data-path="/ListBusinessEnquiry"
        >
          <i className="fa fa-briefcase nav-icon"></i> Business Enquiry
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListGeneralEnquiry"
          ref={el => (sidebarRefs.current['/ListGeneralEnquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListGeneralEnquiry", "/AddGeneralEnquiry", "/EditGeneralEnquiry", "/ViewGeneralEnquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListGeneralEnquiry")}
           data-path="/ListGeneralEnquiry"
        >
          <i className="fa fa-info-circle nav-icon"></i> General Enquiry
        </Link>
      </li>
    </ul>
  </div>
</li>

<li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
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
      <i className="fa fa-wallet nav-icon"></i> Finance
    </div>
    <i
      className={`fa fa-angle-right ${isOpen.finance ? "rotate-icon" : ""}`}
      aria-hidden="true"
    />
  </Link>
  <div
    className={`collapse ${isOpen.finance ? "show" : ""}`}
    id="collapse2"
  >
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item">
        <Link 
          to="/ListIncome"
          ref={el => (sidebarRefs.current['/ListIncome'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListIncome", "/AddIncome", "/EditIncome", "/ViewIncome"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListIncome")}
           data-path="/ListIncome"
        >
          <i className="fa fa-arrow-up nav-icon"></i> Income
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListExpenses"
          ref={el => (sidebarRefs.current['/ListExpenses'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListExpenses", "/AddExpenses", "/EditExpenses", "/ViewExpenses"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListExpenses")}
           data-path="/ListExpenses"
        >
          <i className="fa fa-arrow-down nav-icon"></i> Expense
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListRaiseQuotations"
          ref={el => (sidebarRefs.current['/ListRaiseQuotations'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListRaiseQuotations", "/AddRaiseQuotations", "/EditRaiseQuotations", "/ViewRaiseQuotations"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListRaiseQuotations")}
           data-path="/ListRaiseQuotations"
        >
          <i className="fa fa-file-invoice nav-icon"></i> Raise Quotations
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListInvoice"
          ref={el => (sidebarRefs.current['/ListInvoice'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListInvoice", "/AddSenderInvoice", "/AddRecieverInvoice", "/EditInvoice", "/ViewInvoice"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListInvoice")}
           data-path="/ListInvoice"
        >
          <i className="fa fa-file-invoice-dollar nav-icon"></i> Raise Invoice
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListIncomeReport"
          ref={el => (sidebarRefs.current['/ListIncomeReport'] = el)}
          className={`nav-link sidebar_link ${
            ["/ListIncomeReport", "/AddIncomeReport", "/EditIncomeReport", "/ViewIncomeReport"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/ListIncomeReport")}
           data-path="/ListIncomeReport"
        >
          <i className="fa fa-chart-line nav-icon"></i> Income Report
        </Link>
      </li>
    </ul>
  </div>
</li>


<li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.Projects}
    aria-controls="collapse12"
    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    onClick={() => toggleDropdown("Projects")}
    ref={el => (sidebarRefs.current['/Projects'] = el)}
  >
    <div>
      <i className="fa fa-project-diagram nav-icon"></i> Project & Task
    </div>
    <i className={`fa fa-angle-right ${isOpen.Projects ? "rotate-icon" : ""}`} aria-hidden="true" />
  </Link>
  <div className={`collapse ${isOpen.Projects ? "show" : ""}`} id="collapse12">
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item">
        <Link 
          to="/ListProject"
          className={`nav-link sidebar_link ${
            ["/ListProject", "/AddProject", "/EditProject", "/ViewProject"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/ListProject'] = el)}
           data-path="/ListProject"
        >
          <i className="fa fa-briefcase nav-icon"></i> Project
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListTask"
          className={`nav-link sidebar_link ${
            ["/ListTask", "/AddTask", "/EditTask", "/ViewTask"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/ListTask'] = el)}
           data-path="/ListTask"
        >
          <i className="fa fa-tasks nav-icon"></i> Task
        </Link>
      </li>
    </ul>
  </div>
</li>

<li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.Marketing}
    aria-controls="collapse17"
    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    onClick={() => toggleDropdown("Marketing")}
    ref={el => (sidebarRefs.current['/Marketing'] = el)}
  >
    <div>
      <i className="fa fa-bullhorn nav-icon"></i> Marketing
    </div>
    <i className={`fa fa-angle-right ${isOpen.Marketing ? "rotate-icon" : ""}`} aria-hidden="true" />
  </Link>
  <div className={`collapse ${isOpen.Marketing ? "show" : ""}`} id="collapse17">
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item" style={{ position: "relative" }}>
        <Link 
          to="#" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.Socialmedia}
          aria-controls="collapse30"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          onClick={() => toggleDropdown("Socialmedia")}
          ref={el => (sidebarRefs.current['/Socialmedia'] = el)}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="fa fa-users nav-icon"></i> Social Media
          </div>
          <i className={`fa fa-angle-right ${isOpen.Socialmedia ? "rotate-icon" : ""}`} aria-hidden="true" />
        </Link>
        <div className={`collapse ${isOpen.Socialmedia ? "show" : ""}`} id="collapse30">
          <ul className="nav d-flex flex-column border-0 ps-4">
            <li className="nav-item">
              <Link 
                to="/ListFacebook"
                className={`nav-link sidebar_link ${
                  ["/ListFacebook", "/AddFacebook", "/ViewFacebook", "/EditFacebook"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/ListFacebook'] = el)}
                  data-path="/ListFacebook"
              >
                <i className="fa fa-user-graduate nav-icon"></i> Facebook
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/ListInstagram"
                className={`nav-link sidebar_link ${
                  ["/ListInstagram", "/AddInstagram", "/EditInstagram", "/ViewInstagram"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/ListInstagram'] = el)}
                  data-path="/ListInstagram"
              >
                <i className="fa fa-user-tie nav-icon"></i> Instagram
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/ListLinkedIn"
                className={`nav-link sidebar_link ${
                  ["/ViewLinkedIn", "/EditLinkedIn", "/ListLinkedIn", "/AddLinkedIn"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/ListLinkedIn'] = el)}
                  data-path="/ListLinkedIn"
              >
                <i className="fa fa-user-secret nav-icon"></i> LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListCampaign"
          className={`nav-link sidebar_link ${
            ["/ListCampaign", "/AddCampaign", "/EditCampaign", "/ViewCampaign"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/ListCampaign'] = el)}
            data-path="/ListCampaign"
        >
          <i className="fa fa-bullhorn nav-icon"></i> Campaigns
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/ListDailyTask"
          className={`nav-link sidebar_link ${
            ["/ListDailyTask", "/AddDailyTask", "/EditDailyTask", "/ViewDailyTask"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/ListDailyTask'] = el)}
           data-path="/ListDailyTask"
        >
          <i className="fa fa-tasks nav-icon"></i> Daily Task
        </Link>
      </li>
    </ul>
  </div>
</li>

<li className="nav-item">
  <Link 
    to="/ListNotifications"
    className={`nav-link sidebar_link ${
      ["/ListNotifications", "/AddNotifications", "/EditNotifications", "/ViewNotifications"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/ListNotifications'] = el)}
     data-path="/ListNotifications"
  >
    <i className="fa fa-bell nav-icon"></i> Notifications
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListMeetings"
    className={`nav-link sidebar_link ${
      ["/ListMeetings", "/AddMeetings", "/EditMeetings", "/ViewMeetings"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/ListMeetings'] = el)}
     data-path="/ListMeetings"
  >
    <i className="fa fa-video nav-icon"></i> Meetings
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListTraining"
    className={`nav-link sidebar_link ${
      ["/ListTraining", "/AddTraining", "/EditTraining", "/ViewTraining"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/ListTraining"
    ref={el => (sidebarRefs.current['/ListTraining'] = el)}
  >
    <i className="fa fa-book nav-icon"></i> Training Material
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListChat"
    className={`nav-link sidebar_link ${
      ["/ListChat", "/AddChat", "/EditChat", "/ViewChat"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/ListChat"
    ref={el => (sidebarRefs.current['/ListChat'] = el)}
  >
    <i className="fa fa-comments nav-icon"></i> Chat
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/ListEmail"
    className={`nav-link sidebar_link ${
      ["/ListEmail", "/AddEmail", "/EditEmail", "/ViewEmail"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/ListEmail"
    ref={el => (sidebarRefs.current['/ListEmail'] = el)}
  >
    <i className="fa fa-envelope nav-icon"></i> Email
  </Link>
</li>



<li className="nav-item">
  <Link to="/ListPromotions"
    className={`nav-link sidebar_link ${[
      "/ListPromotions",
      "/AddPromotions",
      "/EditPromotions",
      "/ViewPromotions",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/ListPromotions"
     ref={el => (sidebarRefs.current['/ListPromotions'] = el)}
  >
    <i className="fa fa-bullhorn nav-icon"></i>
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
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/ListEvents"
     ref={el => (sidebarRefs.current['/ListEvents'] = el)}
  >
    <i className="fa fa-calendar nav-icon"></i>
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
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/ListBlog"
     ref={el => (sidebarRefs.current['/ListBlog'] = el)}
  >
    <i className="fa fa-blog nav-icon"></i> Blogs
  </Link>
</li>

<li className="nav-item">
  <Link to="/ListTestimonials"
    className={`nav-link sidebar_link ${[
      "/ListTestimonials",
      "/AddTestimonials",
      "/EditTestimonials",
      "/ViewTestimonials",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/ListTestimonials"
     ref={el => (sidebarRefs.current['/ListTestimonials'] = el)}
  >
    <i className="fa fa-quote-right nav-icon"></i> Testimonials
  </Link>
</li>

<li className="nav-item">
  <Link to="/AdminList"
    className={`nav-link sidebar_link ${[
      "/AdminList",
      "/AddAdmin",
      "/EditAdmin",
      "/ViewAdmin",
    ].includes(currentPath) ? "active" : ""}`}
    data-path="/AdminList"
    ref={el => (sidebarRefs.current['/AdminList'] = el)}
  >
    <i className="fa fa-user-shield nav-icon"></i>
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
    <div>
      <i className="fa fa-book nav-icon"></i>
      ELT
    </div>
    <i
      className={`fa fa-angle-right ${isOpen.elt ? "rotate-icon" : ""}`}
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
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/ListBookings"
          ref={el => (sidebarRefs.current['/ListBookings'] = el)}
        >
          <i className="fa fa-calendar-check nav-icon"></i> Booking
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/ListClassSchedule"
          className={`nav-link sidebar_link ${[
            "/ListClassSchedule",
            "/AddClassSchedule",
            "/EditClassSchedule",
            "/ViewClassSchedule",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/ListClassSchedule"
          ref={el => (sidebarRefs.current['/ListClassSchedule'] = el)}
        >
          <i className="fa fa-calendar nav-icon"></i> Class Schedule
        </Link>
      </li>
    </ul>
  </div>
</li>


<li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.settings}
    aria-controls="collapse6"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
    onClick={() => toggleDropdown("settings")}
    role="button"
    aria-label="Settings"
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      <i className="fa fa-cog fa-spin nav-icon"></i>
      Settings
    </div>
    <i
      className={`fa fa-angle-right ${isOpen.settings ? "rotate-icon" : ""}`}
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
        <Link 
          to="#" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.globalSettings}
          aria-controls="collapse7"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => toggleDropdown("globalSettings")}
          role="button"
          aria-label="Global Settings"
        >
          <div>
            <i className="fa fa-globe nav-icon"></i> Global Settings
          </div>
          <i
            className={`fa fa-angle-right ${isOpen.globalSettings ? "rotate-icon" : ""}`}
            aria-hidden="true"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        </Link>
        <div
          className={`collapse ${isOpen.globalSettings ? "show" : ""}`}
          id="collapse7"
        >
          <ul className="nav d-flex flex-column border-0 ps-4">
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/ListGlobalEmail",
                  "/AddGlobalEmail",
                  "/EditGlobalEmail",
                  "/ViewGlobalEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ListGlobalEmail"
                ref={el => (sidebarRefs.current['/ListGlobalEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i> Email
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/GlobalSettings" 
                className={`nav-link sidebar_link ${[
                  "/GlobalSettings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/GlobalSettings"
                ref={el => (sidebarRefs.current['/GlobalSettings'] = el)}
              >
                <i className="fa fa-globe nav-icon"></i> Country
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/CurrencySettings" 
                className={`nav-link sidebar_link ${[
                  "/CurrencySettings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/CurrencySettings"
                ref={el => (sidebarRefs.current['/CurrencySettings'] = el)}
              >
                <i className="fa fa-money-bill-wave nav-icon"></i> Currency
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/Status" 
                className={`nav-link sidebar_link ${[
                  "/Status",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/Status"
                ref={el => (sidebarRefs.current['/Status'] = el)}
              >
                <i className="fa fa-clipboard-list nav-icon"></i> Status
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/Intake" 
                className={`nav-link sidebar_link ${[
                  "/Intake",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/Intake"
                ref={el => (sidebarRefs.current['/Intake'] = el)}
              >
                <i className="fa fa-calendar-alt nav-icon"></i> Intake
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/YearSetting" 
                className={`nav-link sidebar_link ${[
                  "/YearSetting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/YearSetting"
                ref={el => (sidebarRefs.current['/YearSetting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i> Year
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/ListGlobalPrivileges",
                  "/AddGlobalPrivileges",
                  "/EditGlobalPrivileges",
                  "/ViewGlobalPrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ListGlobalPrivileges"
                ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i> Privileges
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/GlobalSettingsDashboard" 
                className={`nav-link sidebar_link ${[
                  "/GlobalSettingsDashboard",
                 
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/GlobalSettingsDashboard"
                ref={el => (sidebarRefs.current['/GlobalSettingsDashboard'] = el)}
              >
                <i className="fa fa-tachometer-alt nav-icon"></i> Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Module */}
      <li className="nav-item">
        <Link 
          to="#" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.modules}
          aria-controls="collapse8"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => toggleDropdown("modules")}
          role="button"
          aria-label="Module"
        >
          <div>
            <i className="fa fa-cogs nav-icon"></i> Module
          </div>
          <i
            className={`fa fa-angle-right ${isOpen.modules ? "rotate-icon" : ""}`}
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
              <Link 
                to="/UniversitySettings" 
                className={`nav-link sidebar_link ${[
                  "/UniversitySettings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/UniversitySettings"
                ref={el => (sidebarRefs.current['/UniversitySettings'] = el)}
              >
                <i className="fa fa-university nav-icon"></i> University
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/CourseType" 
                className={`nav-link sidebar_link ${[
                  "/CourseType",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/CourseType"
                ref={el => (sidebarRefs.current['/CourseType'] = el)}
              >
                <i className="fa fa-book nav-icon"></i> Course Type
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/ApplicationStatus" 
                className={`nav-link sidebar_link ${[
                  "/ApplicationStatus",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ApplicationStatus"
                ref={el => (sidebarRefs.current['/ApplicationStatus'] = el)}
              >
                <i className="fa fa-book nav-icon"></i> Application Status
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/ListModuleEmail",
                  "/AddModuleEmail",
                  "/EditModuleEmail",
                  "/ViewModuleEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ListModuleEmail"
                ref={el => (sidebarRefs.current['/ListModuleEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i> Email
              </Link>
            </li>
           
            <li className="nav-item">
              <Link 
                to="/ClientModule" 
                className={`nav-link sidebar_link ${[
                  "/ClientModule",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ClientModule"
                ref={el => (sidebarRefs.current['/ClientModule'] = el)}
              >
                <i className="fa fa-user nav-icon"></i> Client
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/ListCustomModule",
                  "/AddCustomModule",
                  "/EditCustomModule",
                  "/ViewCustomModule",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ListCustomModule"
                ref={el => (sidebarRefs.current['/ListCustomModule'] = el)}
              >
                <i className="fa fa-cogs nav-icon"></i> Custom Module
              </Link>
            </li>
          </ul>
        </div>
      </li>

      {/* Privileges */}
      <li className="nav-item">
        <Link 
          to="#" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.privileges}
          aria-controls="collapse9"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => toggleDropdown("privileges")}
          role="button"
          aria-label="Privileges"
        >
          <div>
            <i className="fa fa-lock nav-icon"></i> Privileges
          </div>
          <i
            className={`fa fa-angle-right ${isOpen.privileges ? "rotate-icon" : ""}`}
            aria-hidden="true"
            style={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        </Link>
        <div
          className={`collapse ${isOpen.privileges ? "show" : ""}`}
          id="collapse9"
        >
          <ul className="nav d-flex flex-column border-0 ps-4">
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/ListGlobalPrivileges",
                  "/AddGlobalPrivileges",
                  "/EditGlobalPrivileges",
                  "/ViewGlobalPrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ListGlobalPrivileges"
                ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i> Global Privileges
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/ListModulePrivileges",
                  "/AddModulePrivileges",
                  "/EditModulePrivileges",
                  "/ViewModulePrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/ListModulePrivileges"
                ref={el => (sidebarRefs.current['/ListModulePrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i> Module Privileges
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>


<li className="nav-item" style={{ position: "relative" }}>
  <Link
    to="#"
    className="nav-link sidebar_link"
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
      <i className="fa fa-file-alt nav-icon"></i>
      Reports
    </div>
    <i
      className={`fa fa-angle-right ${isOpen.Reports ? "rotate-icon" : ""}`}
      aria-hidden="true"
    />
  </Link>
  <div
    className={`collapse ${isOpen.Reports ? "show" : ""}`}
    id="collapse4"
  >
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/ListReportEmployee",
              "/AddReportEmployee",
              "/EditReportEmployee",
              "/ViewReportEmployee",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/ListGlobalPrivileges"
          ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-tie nav-icon"></i> Employee
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/ListReportAgent",
              "/AddReportAgent",
              "/EditReportAgent",
              "/ViewReportAgent",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/ListGlobalPrivileges"
          ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-secret nav-icon"></i> Agent
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/ListReportStudents",
              "/AddReportStudents",
              "/EditReportStudents",
              "/ViewReportStudents",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/ListGlobalPrivileges"
          ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-graduate nav-icon"></i> Students
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/ListReportBranch",
              "/AddReportBranch",
              "/EditReportBranch",
              "/ViewReportBranch",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/ListGlobalPrivileges"
          ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
        >
          <i className="fa fa-sitemap nav-icon"></i> Branch
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/ListReportAdmin",
              "/AddReportAdmin",
              "/EditReportAdmin",
              "/ViewReportAdmin",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/ListGlobalPrivileges"
          ref={el => (sidebarRefs.current['/ListGlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-shield nav-icon"></i> Admin
        </Link>
      </li>
    </ul>
  </div>
</li>

<li className="nav-item">
  <Link
    to="/"
    className="nav-link sidebar_link"
    onClick={logout}
    style={{ cursor: "pointer" }}
  >
    <i className="fa fa-flag nav-icon" aria-hidden="true" />
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
