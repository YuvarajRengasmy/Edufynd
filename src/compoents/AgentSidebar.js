import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Edufynd from "../Assests/EduFynd.png";
import Edufynd_logo from "../Assests/3.png";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap"; 


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
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Load the collapsed state from local storage
    return JSON.parse(localStorage.getItem('sidebarCollapsed')) || false;
  });

  const sidebarRefs = useRef({});

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

  const toggleDropdown = (key) => {
    setIsOpen((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const handleSidebarToggle = () => {
    setIsCollapsed((prev) => {
      const newCollapsedState = !prev;
      // Save the new collapsed state to local storage
      localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsedState));
      return newCollapsedState;
    });
  };

  const logout = () => {
    clearStorage(); // Assuming clearStorage is defined elsewhere
    toast.success("You have been logged out successfully.");
    navigate("/");
  };

  useEffect(() => {
    const dropdownPaths = {
      users: [
        "/agent_list_student",
        "/agent_add_student",
        "/agent_view_student",
        "/agent_edit_student",
        "/agent_list_staff",
        "/agent_add_staff",
        "/agent_edit_staff",
        "/agent_view_staff",
        "/agent_view_agent",
        "/agent_edit_agent",
        "/agent_list_agent",
        "/agent_add_agent",
      ],
      enquiry: [
        "/agent_list_enquiry_student",
        "/agent_add_enquiry_student",
        "/agent_edit_enquiry_student",
        "/agent_view_enquiry_student",
        "/agent_list_forex_form",
        "/agent_add_forex_form",
        "/agent_edit_forex_form",
        "/agent_view_forex_form",
        "/agent_list_accommodation",
        "/agent_add_accommodation",
        "/agent_edit_accommodation",
        "/agent_view_accommodation",
        "/agent_list_flight_ticket",
        "/agent_add_flight_ticket",
        "/agent_edit_flight_ticket",
        "/agent_view_flight_ticket",
        "/agent_list_loan_enquiry",
        "/agent_add_loan_enquiry",
        "/agent_edit_loan_enquiry",
        "/agent_view_loan_enquiry",
        "/agent_list_business_enquiry",
        "/agent_add_business_enquiry",
        "/agent_edit_business_enquiry",
        "/agent_view_business_enquiry",
        "/agent_list_general_enquiry",
        "/agent_add_general_enquiry",
        "/agent_edit_general_enquiry",
        "/agent_view_general_enquiry",
      ],
      finance: [
        "/agent_list_income",
        "/agent_add_income",
        "/agent_edit_income",
        "/agent_view_income",
        "/agent_list_expenses",
        "/agent_add_expenses",
        "/agent_edit_expenses",
        "/agent_view_expenses",
        "/agent_list_raisequotations",
        "/agent_add_raisequotations",
        "/agent_edit_raisequotations",
        "/agent_view_raisequotations",
        "/agent_list_invoice",
        "/agent_add_invoice",
        "/agent_edit_invoice",
        "/agent_view_invoice",
        "/agent_list_income_report",
        "/agent_add_income_report",
        "/agent_edit_income_report",
        "/agent_view_income_report",
      ],
      hrms: [
        "/agent_list_hrms_staff",
        "/agent_add_hrms_staff",
        "/agent_edit_hrms_staff",
        "/agent_view_hrms_staff",
        "/agent_list_attendance",
        "/agent_add_attendance",
        "/agent_edit_attendance",
        "/agent_view_attendance",
        "/agent_list_payroll",
        "/agent_add_payroll",
        "/agent_edit_payroll",
        "/agent_view_payroll",
        "/agent_list_leave",
        "/agent_add_leave",
        "/agent_edit_leave",
        "/agent_view_leave",
        "/agent_list_kpi",
        "/agent_add_kpi",
        "/agent_edit_kpi",
        "/agent_view_kpi",
        "/agent_list_policies",
        "/agent_add_policies",
        "/agent_edit_policies",
        "/agent_view_policies",
        "/agent_list_performance_report",
        "/agent_add_performance_report",
        "/agent_edit_performance_report",
        "/agent_view_performance_report",
      ],
      Projects: [
        "/agent_list_project",
        "/agent_add_project",
        "/agent_edit_project",
        "/agent_view_project",
        "/agent_list_task",
        "/agent_add_task",
        "/agent_edit_task",
        "/agent_view_task",
      ],
      Marketing: {
        socialMedia: {
          facebook: ["/agent_list_facebook", "/agent_add_facebook", "/agent_edit_facebook", "/agent_view_facebook"],
          linkedIn: ["/agent_list_linkedin", "/agent_add_linkedin", "/agent_edit_linkedin", "/agent_view_linkedin"],
          instagram: ["/agent_list_instagram", "/agent_add_instagram", "/agent_edit_instagram", "/agent_view_instagram"],
        },
        campaigns: ["/agent_list_campaign", "/agent_add_campaign", "/agent_edit_campaign", "/agent_view_campaign"],
        dailyTasks: ["/agent_list_daily_task", "/agent_add_daily_task", "/agent_edit_daily_task", "/agent_view_daily_task"],
      },
      elt: [
        "/agent_list_bookings",
        "/agent_add_bookings",
        "/agent_edit_bookings",
        "/agent_view_bookings",
        "/agent_list_class_schedule",
        "/agent_add_class_schedule",
        "/agent_edit_class_schedule",
        "/agent_view_class_schedule",
      ],
      settings: {
        globalSettings: [
          "/agent_global_settings",
          "/agent_currency_settings",
          "/agent_status",
          "/agent_intake",
          "/agent_year_setting",
        ],
        modules: [
          "/agent_client_module",
          "/agent_university_settings",
          "/agent_application_status",
          "/agent_course_type",
        ],
        privileges:[
          "/agent_Privilages",
        ]
      },
      Reports: [
        "/agent_EmployeeReports",
        "/agent_AgentReports",
        "/agent_StudentReports",
        "/agent_BranchReports",
        "/agent_AdminReports",
      ],
      Socialmedia: [
        "/agent_list_facebook",
        "/agent_add_facebook",
        "/agent_edit_facebook",
        "/agent_view_facebook",
        "/agent_list_linkedin",
        "/agent_add_linkedin",
        "/agent_edit_linkedin",
        "/agent_view_linkedin",
        "/agent_list_instagram",
        "/agent_add_instagram",
        "/agent_edit_instagram",
        "/agent_view_instagram",
      ],
      globalSettings: [
        "/agent_global_settings",
        "/agent_currency_settings",
        "/agent_status",
        "/agent_intake",
        "/agent_year_setting",
      ],
      modules: [
        "/agent_client_module",
        "/agent_university_settings",
        "/agent_application_status",
        "/agent_course_type",
      ],
      privileges:[
        "/agent_Privilages",
      ]
    };

    const checkNestedPaths = (paths, currentPath) => {
      if (Array.isArray(paths)) {
        return paths.some((path) => currentPath.includes(path));
      }
      return Object.keys(paths).some((key) => checkNestedPaths(paths[key], currentPath));
    };

    const newIsOpen = Object.keys(dropdownPaths).reduce((acc, key) => {
      acc[key] = checkNestedPaths(dropdownPaths[key], currentPath);
      return acc;
    }, {});

    setIsOpen((prevState) => ({ ...prevState, ...newIsOpen }));
  }, [currentPath]);

  useEffect(() => {
    const activeRef = Object.values(sidebarRefs.current).find((ref) =>
      ref && currentPath.includes(ref.dataset.path)
    );

    if (activeRef) {
      setTimeout(() => {
        activeRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100); // Adjust delay as necessary
    }

    // Initialize tooltips
   
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    tooltipTriggerList.forEach(tooltipTriggerEl => {
      if (isCollapsed) {
        tooltipTriggerEl.addEventListener('mouseenter', () => {
          if (!bootstrap.Tooltip.getInstance(tooltipTriggerEl)) {
            new bootstrap.Tooltip(tooltipTriggerEl, {
              placement: 'right'
            });
          }
        });

        tooltipTriggerEl.addEventListener('mouseleave', () => {
          const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
          if (tooltipInstance && !tooltipTriggerEl.classList.contains('active')) {
            tooltipInstance.dispose();
          }
        });
      } else {
        const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      }
    });
  }, [currentPath, isCollapsed]);

  return (
    <>
      <aside
        className={`main-sidebar elevation-10  text-bg-white  ${isCollapsed ? "collapsed" : ""}`}
        style={{
          backgroundColor:'#2C3E50',
          position: "fixed",
          width: isCollapsed ? "80px" : "250px",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          fontSize: "0.85rem",
          fontWeight: "bold",
          fontFamily: "Plus Jakarta Sans",
          fontVariant: "all-small-caps",
        }}
      >
        <div className="  shadow-none   ">
       
          <div className="sidebar">

            <div className="user-panel  d-flex">
              <div className="info  ">
              <Link
                to="/agent_dashboard"
                className="brand-text font-weight-light text-decoration-none"
              >
                <img
  src={isCollapsed ? Edufynd_logo : Edufynd}
  alt="logo"
  className="img-fluid"
  style={{ width: "75%" }}
/>

              </Link>
              </div>
            </div>
            <button onClick={handleSidebarToggle} className= "btn btn-link text-white sidebar-toggle  ">
            <i className={`fa ${isCollapsed ? "fa-times " : "fa-bars "}`}/>
          </button>
            <nav>
              <ul
                className="nav  nav-sidebar flex-column "
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
             <li className="nav-item">
  <Link 
    to="/agent_dashboard"
    ref={el => (sidebarRefs.current['/dashboard'] = el)}
    className={`nav-link sidebar_link ${activeLink === "/agent_dashboard" ? "active" : ""}`}
    onClick={() => handleSetActiveLink("/agent_dashboard")}
      data-path="/agent_dashboard"
   
      data-bs-toggle="tooltip"
      title={isCollapsed ? "Dashboard" : ""}
  >
    <i className="fa fa-tachometer-alt nav-icon"></i>
    {!isCollapsed && "Dashboard"}
  </Link>
</li>

{/* <li className="nav-item">
  <Link 
    to="/agent_list_client"
    ref={el => (sidebarRefs.current['/list__client'] = el)}
    className={`nav-link sidebar_link ${
      ["/agent_list_client", "/agent_add_client", "/agent_view_client", "/agent_edit_client"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/agent_list_client")}
     data-path="/agent_list_client"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Client" : ""}
  >
    <i className="fa fa-user nav-icon"></i>
   
    {!isCollapsed && " Client"}
  </Link>
</li> */}

<li className="nav-item">
  <Link 
    to="/agent_list_university"
    ref={el => (sidebarRefs.current['/list__university'] = el)}
    className={`nav-link sidebar_link ${
      ["/agent_list_university", "/agent_add_university", "/agent_view_university", "/agent_edit_university"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/agent_list_university")}
   
     data-path="/agent_list_university"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "University" : ""}
  >
    <i className="fa fa-graduation-cap nav-icon"></i>
    
    {!isCollapsed && "University"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/agent_list_commission"
    ref={el => (sidebarRefs.current['/list__commission'] = el)}
    className={`nav-link sidebar_link ${
      ["/agent_list_commission", "/agent_add_commission", "/agent_view_commission", "/agent_edit_commission"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/agent_list_commission")}
     data-path="/agent_list_commission"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Commission" : ""}
  >
    <i className="fa fa-dollar-sign nav-icon"></i>
    
    {!isCollapsed && "Commission"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/agent_list_program" 
    ref={el => (sidebarRefs.current['/list__program'] = el)} 
    className={`nav-link sidebar_link ${
      ["/agent_list_program", "/agent_add_program", "/agent_edit_program", "/agent_view_program"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/agent_list_Program")}
     data-path="/agent_list_Program"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Program" : ""}
  >
    <i className="fa fa-cogs nav-icon"></i>
   
    {!isCollapsed && "Program"}
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
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("users")}
    
  >
    <div   style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Users" : ""}>
      <i className="fa fa-users nav-icon"></i>
      
      {!isCollapsed && "Users"}
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
          to="/agent_list_student"
          ref={el => (sidebarRefs.current['/list_student'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_student", "/agent_add_student", "/agent_view_student", "/agent_edit_student"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_student")}
           data-path="/agent_list_student"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Students" : ""}
           
        >
          <i className="fa fa-user-graduate nav-icon"></i>
          {!isCollapsed && " Students"} 
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_staff"
          ref={el => (sidebarRefs.current['/list_staff'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_staff", "/agent_add_staff", "/agent_edit_staff", "/agent_view_staff"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_staff")}
           data-path="/agent_list_staff"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Staffs" : ""}
        >
          <i className="fa fa-user-tie nav-icon"></i> 
          {!isCollapsed && " Staffs"}
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link 
          to="/agent_list_agent"
          ref={el => (sidebarRefs.current['/list_agent'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_view_agent", "/agent_edit_agent", "/agent_list_agent", "/agent_add_agent"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_agent")}
           data-path="/agent_list_agent"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Agents" : ""}
        >
          <i className="fa fa-user-secret nav-icon"></i> 
          {!isCollapsed && " Agents"}
        </Link>
      </li> */}
    </ul>
  </div>
</li>




<li className="nav-item">
  <Link 
    to="/agent_list_application"
    ref={el => (sidebarRefs.current['/list_application'] = el)}
    className={`nav-link sidebar_link ${
      ["/agent_list_application", "/agent_add_application", "/agent_edit_application", "/agent_Application"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/agent_list_application")}
     data-path="/agent_list_application"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Application" : ""}
  >
    <i className="fa fa-archive nav-icon"></i> 
    {!isCollapsed && " Application"}
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
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    
    onClick={() => toggleDropdown("enquiry")}
    
  >
    <div 
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Enquiry" : ""}>
    
      <i className="fa fa-question-circle nav-icon"></i> 
      {!isCollapsed && " Enquiry"}
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
          to="/agent_list_enquiry_student"
          ref={el => (sidebarRefs.current['/list_enquiry_student'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_enquiry_student", "/agent_add_enquiry_student", "/agent_edit_enquiry_student", "/agent_view_enquiry_student"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_enquiry_student")}
           data-path="/agent_list_enquiry_student"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Student Enquiry" : ""}
        >
          <i className="fa fa-user-graduate nav-icon"></i> 
          {!isCollapsed && " Student "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_forex_form"
          ref={el => (sidebarRefs.current['/list_forex_form'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_forex_form", "/agent_add_forex_form", "/agent_edit_forex_form", "/agent_view_forex_form"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_forex_form")}
           data-path="/agent_list_forex_form"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "FOREX Enquiry" : ""}
        >
          <i className="fa fa-money-bill-wave nav-icon"></i> 
          {!isCollapsed && " FOREX "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_accommodation"
          ref={el => (sidebarRefs.current['/list_accommodation'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_accommodation", "/agent_add_accommodation", "/agent_edit_accommodation", "/agent_view_accommodation"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_accommodation")}
           data-path="/agent_list_accommodation"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Accommodation  Enquiry" : ""}
        >
          <i className="fa fa-bed nav-icon"></i> 
          {!isCollapsed && " Accommodation  "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_flight_ticket"
          ref={el => (sidebarRefs.current['/list_flight_ticket'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_flight_ticket", "/agent_add_flight_ticket", "/agent_edit_flight_ticket", "/agent_view_flight_ticket"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_flight_ticket")}
           data-path="/agent_list_flight_ticket"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Flight Ticket" : ""}
        >
          <i className="fa fa-plane nav-icon"></i> 
          {!isCollapsed && " Flight Ticket "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_loan_enquiry"
          ref={el => (sidebarRefs.current['/list_loan_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_loan_enquiry", "/agent_add_loan_enquiry", "/agent_edit_loan_enquiry", "/agent_view_loan_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_loan_enquiry")}
           data-path="/agent_list_loan_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Loan Enquiry" : ""}
        >
          <i className="fa fa-credit-card nav-icon"></i> 
          {!isCollapsed && " Loan "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_business_enquiry"
          ref={el => (sidebarRefs.current['/list_business_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_business_enquiry", "/agent_add_business_enquiry", "/agent_edit_business_enquiry", "/agent_view_business_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_business_enquiry")}
           data-path="/agent_list_business_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Business Enquiry" : ""}
        >
          <i className="fa fa-briefcase nav-icon"></i>
          {!isCollapsed && "  Business "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_general_enquiry"
          ref={el => (sidebarRefs.current['/list_general_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_general_enquiry", "/agent_add_general_enquiry", "/agent_edit_general_enquiry", "/agent_view_general_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_general_enquiry")}
           data-path="/agent_list_general_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "General Enquiry" : ""}
        >
          <i className="fa fa-info-circle nav-icon"></i> 
          {!isCollapsed && "General "}
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
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("finance")}
  >
    <div 
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
     data-bs-toggle="tooltip"
    title={isCollapsed ? "Finance" : ""}>
   
      <i className="fa fa-wallet nav-icon"></i> 
      {!isCollapsed && "Finance"}
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
          to="/agent_list_income"
          ref={el => (sidebarRefs.current['/list_income'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_income", "/agent_add_income", "/agent_edit_income", "/agent_view_income"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_income")}
           data-path="/agent_list_income"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Income" : ""}
        >
          <i className="fa fa-arrow-up nav-icon"></i> 
          {!isCollapsed && " Income"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_expenses"
          ref={el => (sidebarRefs.current['/list_expenses'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_expenses", "/agent_add_expenses", "/agent_edit_expenses", "/agent_view_expenses"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_expenses")}
           data-path="/agent_list_expenses"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Expense" : ""}
        >
          <i className="fa fa-arrow-down nav-icon"></i> 
          {!isCollapsed && " Expense"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_raisequotations"
          ref={el => (sidebarRefs.current['/list_raiseQuotations'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_raisequotations", "/agent_add_raisequotations", "/agent_edit_raisequotations", "/agent_view_raisequotations"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_raisequotations")}
           data-path="/agent_list_raisequotations"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Raise Quotations" : ""}
        >
          <i className="fa fa-file-invoice nav-icon"></i> 
          {!isCollapsed && " Raise Quotations"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_invoice"
          ref={el => (sidebarRefs.current['/list_invoice'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_invoice", "/agent_add_sender_invoice", "/agent_add_reciever_invoice", "/agent_edit_invoice", "/agent_view_invoice"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_invoice")}
           data-path="/agent_list_invoice"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Raise Invoice" : ""}
        >
          <i className="fa fa-file-invoice-dollar nav-icon"></i> 
          {!isCollapsed && " Raise Invoice"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_income_report"
          ref={el => (sidebarRefs.current['/list_income_Report'] = el)}
          className={`nav-link sidebar_link ${
            ["/agent_list_income_report", "/agent_add_income_report", "/agent_edit_income_report", "/agent_view_income_report"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/agent_list_income_report")}
           data-path="/agent_list_income_report"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Income Report" : ""}
        >
          <i className="fa fa-chart-line nav-icon"></i> 
          {!isCollapsed && " Income Report"}
        </Link>
      </li>
    </ul>
  </div>
</li>


{/* <li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.Projects}
    aria-controls="collapse12"
  style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("Projects")}
    ref={el => (sidebarRefs.current['/Projects'] = el)}
  >
    <div 
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
      data-bs-toggle="tooltip"
      title={isCollapsed ? "Project & Task" : ""}>
  
      <i className="fa fa-project-diagram nav-icon"></i> 
      {!isCollapsed && " Project & Task"}
    </div>
    <i className={`fa fa-angle-right ${isOpen.Projects ? "rotate-icon" : ""}`} aria-hidden="true" />
  </Link>
  <div className={`collapse ${isOpen.Projects ? "show" : ""}`} id="collapse12">
    <ul className="nav d-flex flex-column border-0 ps-4">
      <li className="nav-item">
        <Link 
          to="/agent_list_project"
          className={`nav-link sidebar_link ${
            ["/agent_list_project", "/agent_add_project", "/agent_edit_project", "/agent_view_project"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_project'] = el)}
           data-path="/agent_list_project"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Project" : ""}
        >
          <i className="fa fa-briefcase nav-icon"></i>
          {!isCollapsed && "  Project"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_task"
          className={`nav-link sidebar_link ${
            ["/agent_list_task", "/agent_add_task", "/agent_edit_task", "/agent_view_task"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_task'] = el)}
           data-path="/agent_list_task"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Task" : ""}
        >
          <i className="fa fa-tasks nav-icon"></i> 
          {!isCollapsed && " Task"}
        </Link>
      </li>
    </ul>
  </div>
</li> */}

{/* <li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.Marketing}
    aria-controls="collapse17"
  style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("Marketing")}
    ref={el => (sidebarRefs.current['/Marketing'] = el)}
  >
    <div 
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
      data-bs-toggle="tooltip"
      title={isCollapsed ? "Marketing" : ""}>
  
      <i className="fa fa-bullhorn nav-icon"></i> 
      {!isCollapsed && " Marketing"}
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
        style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
          onClick={() => toggleDropdown("Socialmedia")}
          ref={el => (sidebarRefs.current['/Socialmedia'] = el)}
        >
          <div style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Social Media" : ""}>
      
            <i className="fa fa-users nav-icon"></i>
            {!isCollapsed && "  Social Media"}
          </div>
          <i className={`fa fa-angle-right ${isOpen.Socialmedia ? "rotate-icon" : ""}`} aria-hidden="true" />
        </Link>
        <div className={`collapse ${isOpen.Socialmedia ? "show" : ""}`} id="collapse30">
          <ul className="nav d-flex flex-column border-0 ps-4">
            <li className="nav-item">
              <Link 
                to="/agent_list_facebook"
                className={`nav-link sidebar_link ${
                  ["/agent_list_facebook", "/agent_add_facebook", "/agent_view_facebook", "/agent_edit_facebook"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/list_facebook'] = el)}
                  data-path="/agent_list_facebook"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "Facebook" : ""}
              >
                <i className="fa fa-user-graduate nav-icon"></i>
                {!isCollapsed && "  Facebook"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_list_instagram"
                className={`nav-link sidebar_link ${
                  ["/agent_list_instagram", "/agent_add_instagram", "/agent_edit_instagram", "/agent_view_instagram"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/list_instagram'] = el)}
                  data-path="/agent_list_instagram"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "Instagram" : ""}
              >
                <i className="fa fa-user-tie nav-icon"></i> 
                {!isCollapsed && " Instagram"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_list_linkedin"
                className={`nav-link sidebar_link ${
                  ["/agent_view_linkedin", "/agent_edit_linkedin", "/agent_list_linkedin", "/agent_add_linkedin"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/list_linkedin'] = el)}
                  data-path="/agent_list_linkedin"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "LinkedIn" : ""}
              >
                <i className="fa fa-user-secret nav-icon"></i> 
                {!isCollapsed && "LinkedIn"}
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_campaign"
          className={`nav-link sidebar_link ${
            ["/agent_list_campaign", "/agent_add_campaign", "/agent_edit_campaign", "/agent_view_campaign"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_campaign'] = el)}
            data-path="/agent_list_campaign"
            data-bs-toggle="tooltip"
            title={isCollapsed ? " Campaigns" : ""}
        >
          <i className="fa fa-bullhorn nav-icon"></i> 
          {!isCollapsed && " Campaigns"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/agent_list_daily_task"
          className={`nav-link sidebar_link ${
            ["/agent_list_daily_task", "/agent_add_daily_task", "/agent_edit_daily_task", "/agent_view_daily_task"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_daily_task'] = el)}
           data-path="/agent_list_daily_task"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Daily Task" : ""}
        >
          <i className="fa fa-tasks nav-icon"></i> 
          {!isCollapsed && " Daily Task"}
        </Link>
      </li>
    </ul>
  </div>
</li> */}

<li className="nav-item">
  <Link 
    to="/agent_list_notifications"
    className={`nav-link sidebar_link ${
      ["/agent_list_notifications", "/agent_add_notifications", "/agent_edit_notifications", "/agent_view_notifications"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/list_notifications'] = el)}
     data-path="/agent_list_notifications"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Notifications" : ""}
  >
    <i className="fa fa-bell nav-icon"></i>
    {!isCollapsed && "  Notifications"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/agent_list_meetings"
    className={`nav-link sidebar_link ${
      ["/agent_list_meetings", "/agent_add_meetings", "/agent_edit_meetings", "/agent_view_meetings"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/list_meetings'] = el)}
     data-path="/agent_list_meetings"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Meetings" : ""}
  >
    <i className="fa fa-video nav-icon"></i> 
    {!isCollapsed && " Meetings"}
  </Link>
</li>

{/* <li className="nav-item">
  <Link 
    to="/agent_list_training"
    className={`nav-link sidebar_link ${
      ["/agent_list_training", "/agent_add_training", "/agent_edit_training", "/agent_view_training"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/agent_list_training"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Training Material" : ""}
    ref={el => (sidebarRefs.current['/list_training'] = el)}
  >
    <i className="fa fa-book nav-icon"></i> 
    {!isCollapsed && " Training Material"}
  </Link>
</li> */}

<li className="nav-item">
  <Link 
    to="/agent_list_chat"
    className={`nav-link sidebar_link ${
      ["/agent_list_chat", "/agent_add_chat", "/agent_edit_chat", "/agent_view_chat"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/agent_list_chat"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Chat" : ""}
    ref={el => (sidebarRefs.current['/list_chat'] = el)}
  >
    <i className="fa fa-comments nav-icon"></i> 
    {!isCollapsed && " Chat"}
  </Link>
</li>

{/* <li className="nav-item">
  <Link 
    to="/agent_list_email"
    className={`nav-link sidebar_link ${
      ["/agent_list_email", "/agent_add_email", "/agent_edit_email", "/agent_view_email"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/agent_list_email"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Email" : ""}
    ref={el => (sidebarRefs.current['/list_email'] = el)}
  >
    <i className="fa fa-envelope nav-icon"></i>
    {!isCollapsed && "  Email"}
  </Link>
</li> */}



<li className="nav-item">
  <Link to="/agent_list_promotions"
    className={`nav-link sidebar_link ${[
      "/agent_list_promotions",
      "/agent_add_promotions",
      "/agent_edit_promotions",
      "/agent_view_promotions",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/agent_list_promotions"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Promotions" : ""}
     ref={el => (sidebarRefs.current['/list_promotions'] = el)}
  >
    <i className="fa fa-bullhorn nav-icon"></i>
   
    {!isCollapsed && "  Promotions"}
  </Link>
</li>

<li className="nav-item">
  <Link to="/agent_list_events"
    className={`nav-link sidebar_link ${[
      "/agent_list_events",
      "/agent_add_events",
      "/agent_edit_events",
      "/agent_view_events",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/agent_list_events"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Events" : ""}
     ref={el => (sidebarRefs.current['/list_events'] = el)}
  >
    <i className="fa fa-calendar nav-icon"></i>
   
    {!isCollapsed && "  Events"}
  </Link>
</li>

{/* <li className="nav-item">
  <Link to="/agent_list_blog"
    className={`nav-link sidebar_link ${[
      "/agent_list_blog",
      "/agent_add_blog",
      "/agent_edit_blog",
      "/agent_view_blog",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/agent_list_blog"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Blogs" : ""}
     ref={el => (sidebarRefs.current['/list_blog'] = el)}
  >
    <i className="fa fa-blog nav-icon"></i> 
    {!isCollapsed && " Blogs"}
  </Link>
</li> */}

{/* <li className="nav-item">
  <Link to="/agent_list_testimonials"
    className={`nav-link sidebar_link ${[
      "/agent_list_testimonials",
      "/agent_add_testimonials",
      "/agent_edit_testimonials",
      "/agent_view_testimonials",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/agent_list_testimonials"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Testimonials" : ""}
     ref={el => (sidebarRefs.current['/list_testimonials'] = el)}
  >
    <i className="fa fa-quote-right nav-icon"></i> 
    {!isCollapsed && " Testimonials"}
  </Link>
</li>

<li className="nav-item">
  <Link to="/agent_list_admin"
    className={`nav-link sidebar_link ${[
      "/agent_list_admin",
      "/agent_add_Admin",
      "/agent_edit_Admin",
      "/agent_view_Admin",
    ].includes(currentPath) ? "active" : ""}`}
    data-path="/agent_list_admin"
    data-bs-toggle="tooltip"
    title={isCollapsed ? " Admin" : ""}
    ref={el => (sidebarRefs.current['/list_admin'] = el)}
  >
    <i className="fa fa-user-shield nav-icon"></i>
    {!isCollapsed && "   Admin"}
  
  </Link>
</li> */}

<li className="nav-item" style={{ position: "relative" }}>
  <Link to="#"
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.elt}
    aria-controls="collapse4"
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("elt")}
  >
    <div   
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    data-bs-toggle="tooltip"
    title={isCollapsed ? "ELT" : ""}>
      <i className="fa fa-book nav-icon"></i>
      
      {!isCollapsed && " ELT"}
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
        <Link to="/agent_list_bookings"
          className={`nav-link sidebar_link ${[
            "/agent_list_bookings",
            "/agent_add_bookings",
            "/agent_edit_bookings",
            "/agent_view_bookings",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/agent_list_bookings"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Booking" : ""}
          ref={el => (sidebarRefs.current['/list_bookings'] = el)}
        >
          <i className="fa fa-calendar-check nav-icon"></i> 
          {!isCollapsed && " Booking"}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/agent_list_class_schedule"
          className={`nav-link sidebar_link ${[
            "/agent_list_class_schedule",
            "/agent_add_class_schedule",
            "/agent_edit_class_schedule",
            "/agent_view_class_schedule",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/agent_list_class_schedule"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Class Schedule" : ""}
          ref={el => (sidebarRefs.current['/list_class_schedule'] = el)}
        >
          <i className="fa fa-calendar nav-icon"></i>
          {!isCollapsed && "  Class Schedule"}
        </Link>
      </li>
    </ul>
  </div>
</li>


{/* <li className="nav-item" style={{ position: "relative" }}>
  <Link 
    to="#" 
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.settings}
    aria-controls="collapse6"
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("settings")}
    role="button"
    aria-label="Settings"
  >
    <div style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Settings" : ""}
    >
      <i className="fa fa-cog fa-spin nav-icon"></i>
     
      {!isCollapsed && "  Settings"}
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
     
      <li className="nav-item">
        <Link 
          to="#" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.globalSettings}
          aria-controls="collapse7"
        style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
          onClick={() => toggleDropdown("globalSettings")}
          role="button"
          aria-label="Global Settings"
        >
          <div  
           style={{
            display: "-webkit-box",          // For older Safari versions
            display: "-ms-flexbox",          // For IE10
            display: "flex",                 // Modern browsers
            alignItems: "center",            // Vertical alignment
            justifyContent: "space-between"  // Space between elements
          }}
           data-bs-toggle="tooltip"
    title={isCollapsed ? "Global Setting" : ""}>
            <i className="fa fa-globe nav-icon"></i>  {!isCollapsed && " Global Settings"}
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
                  "/agent_list_GlobalEmail",
                  "/agent_add_GlobalEmail",
                  "/agent_edit_GlobalEmail",
                  "/agent_view_GlobalEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_list_GlobalEmail"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Email" : ""}
                ref={el => (sidebarRefs.current['/list_GlobalEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i>  {!isCollapsed && " Email"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_global_settings" 
                className={`nav-link sidebar_link ${[
                  "/agent_global_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_global_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Country" : ""}
                ref={el => (sidebarRefs.current['/global_settings'] = el)}
              >
                <i className="fa fa-globe nav-icon"></i>  {!isCollapsed && " Country"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_currency_settings" 
                className={`nav-link sidebar_link ${[
                  "/agent_currency_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_currency_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Currency" : ""}
                ref={el => (sidebarRefs.current['/currency_settings'] = el)}
              >
                <i className="fa fa-money-bill-wave nav-icon"></i>  {!isCollapsed && " Currency"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_status" 
                className={`nav-link sidebar_link ${[
                  "/agent_status",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_status"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Status" : ""}
                ref={el => (sidebarRefs.current['/status'] = el)}
              >
                <i className="fa fa-clipboard-list nav-icon"></i>  {!isCollapsed && " Status"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_intake" 
                className={`nav-link sidebar_link ${[
                  "/agent_intake",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_intake"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Intake" : ""}
                ref={el => (sidebarRefs.current['/intake'] = el)}
              >
                <i className="fa fa-calendar-alt nav-icon"></i>   {!isCollapsed && " Intake"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_year_setting" 
                className={`nav-link sidebar_link ${[
                  "/agent_year_setting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_year_setting"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Year" : ""}
                ref={el => (sidebarRefs.current['/year_setting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Year"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_source" 
                className={`nav-link sidebar_link ${[
                  "/agent_source",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_source"
                ref={el => (sidebarRefs.current['/source'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Source"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_blog_setting" 
                className={`nav-link sidebar_link ${[
                  "/agent_blog_setting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_blog_setting"
                ref={el => (sidebarRefs.current['/blog_setting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Blog_Category"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_Privilages" 
                className={`nav-link sidebar_link ${[
                  "/agent_list_GlobalPrivileges",
                  "/agent_add_GlobalPrivileges",
                  "/agent_edit_GlobalPrivileges",
                  "/agent_view_GlobalPrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_list_GlobalPrivileges"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Privileges" : ""}
                ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i>   {!isCollapsed && " Privileges"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/agent_global_settingsDashboard" 
                className={`nav-link sidebar_link ${[
                  "/agent_global_settingsDashboard",
                 
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_global_settingsDashboard"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Dashboard" : ""}
                ref={el => (sidebarRefs.current['/global_settingsDashboard'] = el)}
              >
                <i className="fa fa-tachometer-alt nav-icon"></i>  {!isCollapsed && " Dashboard "}
              </Link>
            </li>
          </ul>
        </div>
      </li>

     
      <li className="nav-item">
        <Link 
          to="#" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.modules}
          aria-controls="collapse8"
        style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
          onClick={() => toggleDropdown("modules")}
          role="button"
          aria-label="Module"
        >
          <div 
           style={{
            display: "-webkit-box",          // For older Safari versions
            display: "-ms-flexbox",          // For IE10
            display: "flex",                 // Modern browsers
            alignItems: "center",            // Vertical alignment
            justifyContent: "space-between"  // Space between elements
          }}
            data-bs-toggle="tooltip"
    title={isCollapsed ? "Module" : ""}>
            <i className="fa fa-cogs nav-icon"></i>   {!isCollapsed && " Module"}
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
                to="/agent_university_settings" 
                className={`nav-link sidebar_link ${[
                  "/agent_university_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_university_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "University" : ""}
                ref={el => (sidebarRefs.current['/university_settings'] = el)}
              >
                <i className="fa fa-university nav-icon"></i>   {!isCollapsed && " Global Module"}
              </Link>
            </li>
           
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/agent_list_ModuleEmail",
                  "/agent_add_ModuleEmail",
                  "/agent_edit_ModuleEmail",
                  "/agent_view_ModuleEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_list_ModuleEmail"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Email" : ""}
                ref={el => (sidebarRefs.current['/list_ModuleEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i>   {!isCollapsed && " Email"}
              </Link>
            </li>
           
           
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/agent_list_CustomModule",
                  "/agent_add_CustomModule",
                  "/agent_edit_CustomModule",
                  "/agent_view_CustomModule",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_list_CustomModule"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Custom Module" : ""}
                ref={el => (sidebarRefs.current['/list_CustomModule'] = el)}
              >
                <i className="fa fa-cogs nav-icon"></i>   {!isCollapsed && " Custom Module"}
              </Link>
            </li>
          </ul>
        </div>
      </li>

     
      <li className="nav-item">
        <Link 
          to="/agent_Privilages" 
          className="nav-link sidebar_link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.privileges}
          aria-controls="collapse9"
        style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
          onClick={() => toggleDropdown("privileges")}
          role="button"
          aria-label="Privileges"
        >
          <div  
           style={{
            display: "-webkit-box",          // For older Safari versions
            display: "-ms-flexbox",          // For IE10
            display: "flex",                 // Modern browsers
            alignItems: "center",            // Vertical alignment
            justifyContent: "space-between"  // Space between elements
          }}
           data-bs-toggle="tooltip"
    title={isCollapsed ? "Privileges" : ""}>
            <i className="fa fa-lock nav-icon"></i>   {!isCollapsed && "Privileges"}
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
                to="/agent_Privilages" 
                className={`nav-link sidebar_link ${[
                  "/agent_Privilages",
                  
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_Privilages"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Global Privileges" : ""}
                ref={el => (sidebarRefs.current['/Privilages'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i>   {!isCollapsed && " Global Privileges"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/agent_list_ModulePrivileges",
                  "/agent_add_ModulePrivileges",
                  "/agent_edit_ModulePrivileges",
                  "/agent_view_ModulePrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/agent_list_ModulePrivileges"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Module Privileges" : ""}
                ref={el => (sidebarRefs.current['/list_ModulePrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i>   {!isCollapsed && " Module Privileges"}
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li> */}


{/* <li className="nav-item" style={{ position: "relative" }}>
  <Link
    to="#"
    className="nav-link sidebar_link"
    data-bs-toggle="collapse"
    aria-expanded={isOpen.Reports}
    aria-controls="collapse4"
     style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    onClick={() => toggleDropdown("Reports")}
  >
    <div style={{
      display: "-webkit-box",          // For older Safari versions
      display: "-ms-flexbox",          // For IE10
      display: "flex",                 // Modern browsers
      alignItems: "center",            // Vertical alignment
      justifyContent: "space-between"  // Space between elements
    }}
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Reports" : ""}>
      <i className="fa fa-file-alt nav-icon"></i>
      {!isCollapsed && "   Reports"}
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
              "/agent_list_ReportEmployee",
              "/agent_add_ReportEmployee",
              "/agent_edit_ReportEmployee",
              "/agent_view_ReportEmployee",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/agent_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Employee" : ""}
          ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-tie nav-icon"></i>   {!isCollapsed && " Employee"}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/agent_list_ReportAgent",
              "/agent_add_ReportAgent",
              "/agent_edit_ReportAgent",
              "/agent_view_ReportAgent",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/agent_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Agent" : ""}
          ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-secret nav-icon"></i>  {!isCollapsed && " Agent "}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/agent_list_ReportStudents",
              "/agent_add_ReportStudents",
              "/agent_edit_ReportStudents",
              "/agent_view_ReportStudents",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/agent_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Students" : ""}
          ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-graduate nav-icon"></i>   {!isCollapsed && " Students"}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/agent_list_ReportBranch",
              "/agent_add_ReportBranch",
              "/agent_edit_ReportBranch",
              "/agent_view_ReportBranch",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/agent_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Branch" : ""}
          ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-sitemap nav-icon"></i>   {!isCollapsed && " Branch"}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/agent_list_ReportAdmin",
              "/agent_add_ReportAdmin",
              "/agent_edit_ReportAdmin",
              "/agent_view_ReportAdmin",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/agent_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Admin" : ""}
          ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-shield nav-icon"></i>   {!isCollapsed && "Admin"}
        </Link>
      </li>
    </ul>
  </div>
</li> */}

<li className="nav-item">
  <Link
    to="/"
    className="nav-link sidebar_link"
    onClick={logout}
    style={{ cursor: "pointer" }}
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Log Out" : ""}
  >
    <i className="fa fa-flag nav-icon" aria-hidden="true" />
    {!isCollapsed && "   Log Out"}
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
