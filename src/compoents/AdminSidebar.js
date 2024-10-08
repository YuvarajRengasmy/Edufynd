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
        "/admin_list_student",
        "/admin_add_student",
        "/admin_view_student",
        "/admin_edit_student",
        "/admin_list_staff",
        "/admin_add_staff",
        "/admin_edit_staff",
        "/admin_view_staff",
        "/admin_view_agent",
        "/admin_edit_agent",
        "/admin_list_agent",
        "/admin_add_agent",
      ],
      enquiry: [
        "/admin_list_enquiry_student",
        "/admin_add_enquiry_student",
        "/admin_edit_enquiry_student",
        "/admin_view_enquiry_student",
        "/admin_list_forex_form",
        "/admin_add_forex_form",
        "/admin_edit_forex_form",
        "/admin_view_forex_form",
        "/admin_list_accommodation",
        "/admin_add_accommodation",
        "/admin_edit_accommodation",
        "/admin_view_accommodation",
        "/admin_list_flight_ticket",
        "/admin_add_flight_ticket",
        "/admin_edit_flight_ticket",
        "/admin_view_flight_ticket",
        "/admin_list_loan_enquiry",
        "/admin_add_loan_enquiry",
        "/admin_edit_loan_enquiry",
        "/admin_view_loan_enquiry",
        "/admin_list_business_enquiry",
        "/admin_add_business_enquiry",
        "/admin_edit_business_enquiry",
        "/admin_view_business_enquiry",
        "/admin_list_general_enquiry",
        "/admin_add_general_enquiry",
        "/admin_edit_general_enquiry",
        "/admin_view_general_enquiry",
      ],
      finance: [
        "/admin_list_income",
        "/admin_add_income",
        "/admin_edit_income",
        "/admin_view_income",
        "/admin_list_expenses",
        "/admin_add_expenses",
        "/admin_edit_expenses",
        "/admin_view_expenses",
        "/admin_list_raisequotations",
        "/admin_add_raisequotations",
        "/admin_edit_raisequotations",
        "/admin_view_raisequotations",
        "/admin_list_invoice",
        "/admin_add_invoice",
        "/admin_edit_invoice",
        "/admin_view_invoice",
        "/admin_list_income_report",
        "/admin_add_income_report",
        "/admin_edit_income_report",
        "/admin_view_income_report",
      ],
      hrms: [
        "/admin_list_hrms_staff",
        "/admin_add_hrms_staff",
        "/admin_edit_hrms_staff",
        "/admin_view_hrms_staff",
        "/admin_list_attendance",
        "/admin_add_attendance",
        "/admin_edit_attendance",
        "/admin_view_attendance",
        "/admin_list_payroll",
        "/admin_add_payroll",
        "/admin_edit_payroll",
        "/admin_view_payroll",
        "/admin_list_leave",
        "/admin_add_leave",
        "/admin_edit_leave",
        "/admin_view_leave",
        "/admin_list_kpi",
        "/admin_add_kpi",
        "/admin_edit_kpi",
        "/admin_view_kpi",
        "/admin_list_policies",
        "/admin_add_policies",
        "/admin_edit_policies",
        "/admin_view_policies",
        "/admin_list_performance_report",
        "/admin_add_performance_report",
        "/admin_edit_performance_report",
        "/admin_view_performance_report",
      ],
      Projects: [
        "/admin_list_project",
        "/admin_add_project",
        "/admin_edit_project",
        "/admin_view_project",
        "/admin_list_task",
        "/admin_add_task",
        "/admin_edit_task",
        "/admin_view_task",
      ],
      Marketing: {
        socialMedia: {
          facebook: ["/admin_list_facebook", "/admin_add_facebook", "/admin_edit_facebook", "/admin_view_facebook"],
          linkedIn: ["/admin_list_linkedin", "/admin_add_linkedin", "/admin_edit_linkedin", "/admin_view_linkedin"],
          instagram: ["/admin_list_instagram", "/admin_add_instagram", "/admin_edit_instagram", "/admin_view_instagram"],
        },
        campaigns: ["/admin_list_campaign", "/admin_add_campaign", "/admin_edit_campaign", "/admin_view_campaign"],
        dailyTasks: ["/admin_list_daily_task", "/admin_add_daily_task", "/admin_edit_daily_task", "/admin_view_daily_task"],
      },
      elt: [
        "/admin_list_bookings",
        "/admin_add_bookings",
        "/admin_edit_bookings",
        "/admin_view_bookings",
        "/admin_list_class_schedule",
        "/admin_add_class_schedule",
        "/admin_edit_class_schedule",
        "/admin_view_class_schedule",
      ],
      settings: {
        globalSettings: [
          "/admin_global_settings",
          "/admin_currency_settings",
          "/admin_status",
          "/admin_intake",
          "/admin_year_setting",
        ],
        modules: [
          "/admin_client_module",
          "/admin_university_settings",
          "/admin_application_status",
          "/admin_course_type",
        ],
        privileges:[
          "/admin_Privilages",
        ]
      },
      Reports: [
        "/admin_EmployeeReports",
        "/admin_AgentReports",
        "/admin_StudentReports",
        "/admin_BranchReports",
        "/admin_AdminReports",
      ],
      Socialmedia: [
        "/admin_list_facebook",
        "/admin_add_facebook",
        "/admin_edit_facebook",
        "/admin_view_facebook",
        "/admin_list_linkedin",
        "/admin_add_linkedin",
        "/admin_edit_linkedin",
        "/admin_view_linkedin",
        "/admin_list_instagram",
        "/admin_add_instagram",
        "/admin_edit_instagram",
        "/admin_view_instagram",
      ],
      globalSettings: [
        "/admin_global_settings",
        "/admin_currency_settings",
        "/admin_status",
        "/admin_intake",
        "/admin_year_setting",
      ],
      modules: [
        "/admin_client_module",
        "/admin_university_settings",
        "/admin_application_status",
        "/admin_course_type",
      ],
      privileges:[
        "/admin_Privilages",
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
                to="/admin_dashboard"
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
    to="/admin_dashboard"
    ref={el => (sidebarRefs.current['/dashboard'] = el)}
    className={`nav-link sidebar_link ${activeLink === "/admin_dashboard" ? "active" : ""}`}
    onClick={() => handleSetActiveLink("/admin_dashboard")}
      data-path="/admin_dashboard"
   
      data-bs-toggle="tooltip"
      title={isCollapsed ? "Dashboard" : ""}
  >
    <i className="fa fa-tachometer-alt nav-icon"></i>
    {!isCollapsed && "Dashboard"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_client"
    ref={el => (sidebarRefs.current['/list__client'] = el)}
    className={`nav-link sidebar_link ${
      ["/admin_list_client", "/admin_add_client", "/admin_view_client", "/admin_edit_client"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/admin_list_client")}
     data-path="/admin_list_client"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Client" : ""}
  >
    <i className="fa fa-user nav-icon"></i>
   
    {!isCollapsed && " Client"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_university"
    ref={el => (sidebarRefs.current['/list__university'] = el)}
    className={`nav-link sidebar_link ${
      ["/admin_list_university", "/admin_add_university", "/admin_view_university", "/admin_edit_university"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/admin_list_university")}
   
     data-path="/admin_list_university"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "University" : ""}
  >
    <i className="fa fa-graduation-cap nav-icon"></i>
    
    {!isCollapsed && "University"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_commission"
    ref={el => (sidebarRefs.current['/list__commission'] = el)}
    className={`nav-link sidebar_link ${
      ["/admin_list_commission", "/admin_add_commission", "/admin_view_commission", "/admin_edit_commission"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/admin_list_commission")}
     data-path="/admin_list_commission"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Commission" : ""}
  >
    <i className="fa fa-dollar-sign nav-icon"></i>
    
    {!isCollapsed && "Commission"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_program" 
    ref={el => (sidebarRefs.current['/list__program'] = el)} 
    className={`nav-link sidebar_link ${
      ["/admin_list_program", "/admin_add_program", "/admin_edit_program", "/admin_view_program"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/admin_list_Program")}
     data-path="/admin_list_Program"
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
          to="/admin_list_student"
          ref={el => (sidebarRefs.current['/list_student'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_student", "/admin_add_student", "/admin_view_student", "/admin_edit_student"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_student")}
           data-path="/admin_list_student"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Students" : ""}
           
        >
          <i className="fa fa-user-graduate nav-icon"></i>
          {!isCollapsed && " Students"} 
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_staff"
          ref={el => (sidebarRefs.current['/list_staff'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_staff", "/admin_add_staff", "/admin_edit_staff", "/admin_view_staff"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_staff")}
           data-path="/admin_list_staff"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Staffs" : ""}
        >
          <i className="fa fa-user-tie nav-icon"></i> 
          {!isCollapsed && " Staffs"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_agent"
          ref={el => (sidebarRefs.current['/list_agent'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_view_agent", "/admin_edit_agent", "/admin_list_agent", "/admin_add_agent"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_agent")}
           data-path="/admin_list_agent"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Agents" : ""}
        >
          <i className="fa fa-user-secret nav-icon"></i> 
          {!isCollapsed && " Agents"}
        </Link>
      </li>
    </ul>
  </div>
</li>




<li className="nav-item">
  <Link 
    to="/admin_list_application"
    ref={el => (sidebarRefs.current['/list_application'] = el)}
    className={`nav-link sidebar_link ${
      ["/admin_list_application", "/admin_add_application", "/admin_edit_application", "/admin_Application"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/admin_list_application")}
     data-path="/admin_list_application"
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
          to="/admin_list_enquiry_student"
          ref={el => (sidebarRefs.current['/list_enquiry_student'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_enquiry_student", "/admin_add_enquiry_student", "/admin_edit_enquiry_student", "/admin_view_enquiry_student"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_enquiry_student")}
           data-path="/admin_list_enquiry_student"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Student Enquiry" : ""}
        >
          <i className="fa fa-user-graduate nav-icon"></i> 
          {!isCollapsed && " Student "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_forex_form"
          ref={el => (sidebarRefs.current['/list_forex_form'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_forex_form", "/admin_add_forex_form", "/admin_edit_forex_form", "/admin_view_forex_form"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_forex_form")}
           data-path="/admin_list_forex_form"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "FOREX Enquiry" : ""}
        >
          <i className="fa fa-money-bill-wave nav-icon"></i> 
          {!isCollapsed && " FOREX "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_accommodation"
          ref={el => (sidebarRefs.current['/list_accommodation'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_accommodation", "/admin_add_accommodation", "/admin_edit_accommodation", "/admin_view_accommodation"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_accommodation")}
           data-path="/admin_list_accommodation"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Accommodation  Enquiry" : ""}
        >
          <i className="fa fa-bed nav-icon"></i> 
          {!isCollapsed && " Accommodation  "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_flight_ticket"
          ref={el => (sidebarRefs.current['/list_flight_ticket'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_flight_ticket", "/admin_add_flight_ticket", "/admin_edit_flight_ticket", "/admin_view_flight_ticket"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_flight_ticket")}
           data-path="/admin_list_flight_ticket"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Flight Ticket" : ""}
        >
          <i className="fa fa-plane nav-icon"></i> 
          {!isCollapsed && " Flight Ticket "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_loan_enquiry"
          ref={el => (sidebarRefs.current['/list_loan_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_loan_enquiry", "/admin_add_loan_enquiry", "/admin_edit_loan_enquiry", "/admin_view_loan_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_loan_enquiry")}
           data-path="/admin_list_loan_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Loan Enquiry" : ""}
        >
          <i className="fa fa-credit-card nav-icon"></i> 
          {!isCollapsed && " Loan "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_business_enquiry"
          ref={el => (sidebarRefs.current['/list_business_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_business_enquiry", "/admin_add_business_enquiry", "/admin_edit_business_enquiry", "/admin_view_business_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_business_enquiry")}
           data-path="/admin_list_business_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Business Enquiry" : ""}
        >
          <i className="fa fa-briefcase nav-icon"></i>
          {!isCollapsed && "  Business "}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_general_enquiry"
          ref={el => (sidebarRefs.current['/list_general_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_general_enquiry", "/admin_add_general_enquiry", "/admin_edit_general_enquiry", "/admin_view_general_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_general_enquiry")}
           data-path="/admin_list_general_enquiry"
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
          to="/admin_list_income"
          ref={el => (sidebarRefs.current['/list_income'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_income", "/admin_add_income", "/admin_edit_income", "/admin_view_income"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_income")}
           data-path="/admin_list_income"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Income" : ""}
        >
          <i className="fa fa-arrow-up nav-icon"></i> 
          {!isCollapsed && " Income"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_expenses"
          ref={el => (sidebarRefs.current['/list_expenses'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_expenses", "/admin_add_expenses", "/admin_edit_expenses", "/admin_view_expenses"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_expenses")}
           data-path="/admin_list_expenses"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Expense" : ""}
        >
          <i className="fa fa-arrow-down nav-icon"></i> 
          {!isCollapsed && " Expense"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_raisequotations"
          ref={el => (sidebarRefs.current['/list_raiseQuotations'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_raisequotations", "/admin_add_raisequotations", "/admin_edit_raisequotations", "/admin_view_raisequotations"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_raisequotations")}
           data-path="/admin_list_raisequotations"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Raise Quotations" : ""}
        >
          <i className="fa fa-file-invoice nav-icon"></i> 
          {!isCollapsed && " Raise Quotations"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_invoice"
          ref={el => (sidebarRefs.current['/list_invoice'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_invoice", "/admin_add_sender_invoice", "/admin_add_reciever_invoice", "/admin_edit_invoice", "/admin_view_invoice"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_invoice")}
           data-path="/admin_list_invoice"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Raise Invoice" : ""}
        >
          <i className="fa fa-file-invoice-dollar nav-icon"></i> 
          {!isCollapsed && " Raise Invoice"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_income_report"
          ref={el => (sidebarRefs.current['/list_income_Report'] = el)}
          className={`nav-link sidebar_link ${
            ["/admin_list_income_report", "/admin_add_income_report", "/admin_edit_income_report", "/admin_view_income_report"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/admin_list_income_report")}
           data-path="/admin_list_income_report"
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


<li className="nav-item" style={{ position: "relative" }}>
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
          to="/admin_list_project"
          className={`nav-link sidebar_link ${
            ["/admin_list_project", "/admin_add_project", "/admin_edit_project", "/admin_view_project"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_project'] = el)}
           data-path="/admin_list_project"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Project" : ""}
        >
          <i className="fa fa-briefcase nav-icon"></i>
          {!isCollapsed && "  Project"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_task"
          className={`nav-link sidebar_link ${
            ["/admin_list_task", "/admin_add_task", "/admin_edit_task", "/admin_view_task"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_task'] = el)}
           data-path="/admin_list_task"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Task" : ""}
        >
          <i className="fa fa-tasks nav-icon"></i> 
          {!isCollapsed && " Task"}
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
                to="/admin_list_facebook"
                className={`nav-link sidebar_link ${
                  ["/admin_list_facebook", "/admin_add_facebook", "/admin_view_facebook", "/admin_edit_facebook"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/list_facebook'] = el)}
                  data-path="/admin_list_facebook"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "Facebook" : ""}
              >
                <i className="fa fa-user-graduate nav-icon"></i>
                {!isCollapsed && "  Facebook"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_list_instagram"
                className={`nav-link sidebar_link ${
                  ["/admin_list_instagram", "/admin_add_instagram", "/admin_edit_instagram", "/admin_view_instagram"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/list_instagram'] = el)}
                  data-path="/admin_list_instagram"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "Instagram" : ""}
              >
                <i className="fa fa-user-tie nav-icon"></i> 
                {!isCollapsed && " Instagram"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_list_linkedin"
                className={`nav-link sidebar_link ${
                  ["/admin_view_linkedin", "/admin_edit_linkedin", "/admin_list_linkedin", "/admin_add_linkedin"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/list_linkedin'] = el)}
                  data-path="/admin_list_linkedin"
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
          to="/admin_list_campaign"
          className={`nav-link sidebar_link ${
            ["/admin_list_campaign", "/admin_add_campaign", "/admin_edit_campaign", "/admin_view_campaign"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_campaign'] = el)}
            data-path="/admin_list_campaign"
            data-bs-toggle="tooltip"
            title={isCollapsed ? " Campaigns" : ""}
        >
          <i className="fa fa-bullhorn nav-icon"></i> 
          {!isCollapsed && " Campaigns"}
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          to="/admin_list_daily_task"
          className={`nav-link sidebar_link ${
            ["/admin_list_daily_task", "/admin_add_daily_task", "/admin_edit_daily_task", "/admin_view_daily_task"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/list_daily_task'] = el)}
           data-path="/admin_list_daily_task"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Daily Task" : ""}
        >
          <i className="fa fa-tasks nav-icon"></i> 
          {!isCollapsed && " Daily Task"}
        </Link>
      </li>
    </ul>
  </div>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_notifications"
    className={`nav-link sidebar_link ${
      ["/admin_list_notifications", "/admin_add_notifications", "/admin_edit_notifications", "/admin_view_notifications"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/list_notifications'] = el)}
     data-path="/admin_list_notifications"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Notifications" : ""}
  >
    <i className="fa fa-bell nav-icon"></i>
    {!isCollapsed && "  Notifications"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_meetings"
    className={`nav-link sidebar_link ${
      ["/admin_list_meetings", "/admin_add_meetings", "/admin_edit_meetings", "/admin_view_meetings"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/list_meetings'] = el)}
     data-path="/admin_list_meetings"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Meetings" : ""}
  >
    <i className="fa fa-video nav-icon"></i> 
    {!isCollapsed && " Meetings"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_training"
    className={`nav-link sidebar_link ${
      ["/admin_list_training", "/admin_add_training", "/admin_edit_training", "/admin_view_training"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/admin_list_training"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Training Material" : ""}
    ref={el => (sidebarRefs.current['/list_training'] = el)}
  >
    <i className="fa fa-book nav-icon"></i> 
    {!isCollapsed && " Training Material"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_chat"
    className={`nav-link sidebar_link ${
      ["/admin_list_chat", "/admin_add_chat", "/admin_edit_chat", "/admin_view_chat"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/admin_list_chat"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Chat" : ""}
    ref={el => (sidebarRefs.current['/list_chat'] = el)}
  >
    <i className="fa fa-comments nav-icon"></i> 
    {!isCollapsed && " Chat"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/admin_list_email"
    className={`nav-link sidebar_link ${
      ["/admin_list_email", "/admin_add_email", "/admin_edit_email", "/admin_view_email"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/admin_list_email"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Email" : ""}
    ref={el => (sidebarRefs.current['/list_email'] = el)}
  >
    <i className="fa fa-envelope nav-icon"></i>
    {!isCollapsed && "  Email"}
  </Link>
</li>



<li className="nav-item">
  <Link to="/admin_list_promotions"
    className={`nav-link sidebar_link ${[
      "/admin_list_promotions",
      "/admin_add_promotions",
      "/admin_edit_promotions",
      "/admin_view_promotions",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/admin_list_promotions"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Promotions" : ""}
     ref={el => (sidebarRefs.current['/list_promotions'] = el)}
  >
    <i className="fa fa-bullhorn nav-icon"></i>
   
    {!isCollapsed && "  Promotions"}
  </Link>
</li>

<li className="nav-item">
  <Link to="/admin_list_events"
    className={`nav-link sidebar_link ${[
      "/admin_list_events",
      "/admin_add_events",
      "/admin_edit_events",
      "/admin_view_events",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/admin_list_events"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Events" : ""}
     ref={el => (sidebarRefs.current['/list_events'] = el)}
  >
    <i className="fa fa-calendar nav-icon"></i>
   
    {!isCollapsed && "  Events"}
  </Link>
</li>

<li className="nav-item">
  <Link to="/admin_list_blog"
    className={`nav-link sidebar_link ${[
      "/admin_list_blog",
      "/admin_add_blog",
      "/admin_edit_blog",
      "/admin_view_blog",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/admin_list_blog"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Blogs" : ""}
     ref={el => (sidebarRefs.current['/list_blog'] = el)}
  >
    <i className="fa fa-blog nav-icon"></i> 
    {!isCollapsed && " Blogs"}
  </Link>
</li>

<li className="nav-item">
  <Link to="/admin_list_testimonials"
    className={`nav-link sidebar_link ${[
      "/admin_list_testimonials",
      "/admin_add_testimonials",
      "/admin_edit_testimonials",
      "/admin_view_testimonials",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/admin_list_testimonials"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Testimonials" : ""}
     ref={el => (sidebarRefs.current['/list_testimonials'] = el)}
  >
    <i className="fa fa-quote-right nav-icon"></i> 
    {!isCollapsed && " Testimonials"}
  </Link>
</li>

{/* <li className="nav-item">
  <Link to="/admin_list_admin"
    className={`nav-link sidebar_link ${[
      "/admin_list_admin",
      "/admin_add_Admin",
      "/admin_edit_Admin",
      "/admin_view_Admin",
    ].includes(currentPath) ? "active" : ""}`}
    data-path="/admin_list_admin"
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
        <Link to="/admin_list_bookings"
          className={`nav-link sidebar_link ${[
            "/admin_list_bookings",
            "/admin_add_bookings",
            "/admin_edit_bookings",
            "/admin_view_bookings",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/admin_list_bookings"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Booking" : ""}
          ref={el => (sidebarRefs.current['/list_bookings'] = el)}
        >
          <i className="fa fa-calendar-check nav-icon"></i> 
          {!isCollapsed && " Booking"}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin_list_class_schedule"
          className={`nav-link sidebar_link ${[
            "/admin_list_class_schedule",
            "/admin_add_class_schedule",
            "/admin_edit_class_schedule",
            "/admin_view_class_schedule",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/admin_list_class_schedule"
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
                  "/admin_list_GlobalEmail",
                  "/admin_add_GlobalEmail",
                  "/admin_edit_GlobalEmail",
                  "/admin_view_GlobalEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_list_GlobalEmail"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Email" : ""}
                ref={el => (sidebarRefs.current['/list_GlobalEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i>  {!isCollapsed && " Email"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_global_settings" 
                className={`nav-link sidebar_link ${[
                  "/admin_global_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_global_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Country" : ""}
                ref={el => (sidebarRefs.current['/global_settings'] = el)}
              >
                <i className="fa fa-globe nav-icon"></i>  {!isCollapsed && " Country"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_currency_settings" 
                className={`nav-link sidebar_link ${[
                  "/admin_currency_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_currency_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Currency" : ""}
                ref={el => (sidebarRefs.current['/currency_settings'] = el)}
              >
                <i className="fa fa-money-bill-wave nav-icon"></i>  {!isCollapsed && " Currency"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_status" 
                className={`nav-link sidebar_link ${[
                  "/admin_status",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_status"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Status" : ""}
                ref={el => (sidebarRefs.current['/status'] = el)}
              >
                <i className="fa fa-clipboard-list nav-icon"></i>  {!isCollapsed && " Status"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_intake" 
                className={`nav-link sidebar_link ${[
                  "/admin_intake",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_intake"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Intake" : ""}
                ref={el => (sidebarRefs.current['/intake'] = el)}
              >
                <i className="fa fa-calendar-alt nav-icon"></i>   {!isCollapsed && " Intake"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_year_setting" 
                className={`nav-link sidebar_link ${[
                  "/admin_year_setting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_year_setting"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Year" : ""}
                ref={el => (sidebarRefs.current['/year_setting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Year"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_source" 
                className={`nav-link sidebar_link ${[
                  "/admin_source",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_source"
                ref={el => (sidebarRefs.current['/source'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Source"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_blog_setting" 
                className={`nav-link sidebar_link ${[
                  "/admin_blog_setting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_blog_setting"
                ref={el => (sidebarRefs.current['/blog_setting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Blog_Category"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_Privilages" 
                className={`nav-link sidebar_link ${[
                  "/admin_list_GlobalPrivileges",
                  "/admin_add_GlobalPrivileges",
                  "/admin_edit_GlobalPrivileges",
                  "/admin_view_GlobalPrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_list_GlobalPrivileges"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Privileges" : ""}
                ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i>   {!isCollapsed && " Privileges"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_global_settingsDashboard" 
                className={`nav-link sidebar_link ${[
                  "/admin_global_settingsDashboard",
                 
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_global_settingsDashboard"
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
                to="/admin_university_settings" 
                className={`nav-link sidebar_link ${[
                  "/admin_university_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_university_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "University" : ""}
                ref={el => (sidebarRefs.current['/university_settings'] = el)}
              >
                <i className="fa fa-university nav-icon"></i>   {!isCollapsed && " Global Module"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_course_type" 
                className={`nav-link sidebar_link ${[
                  "/admin_course_type",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_course_type"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Course Type" : ""}
                ref={el => (sidebarRefs.current['/course_type'] = el)}
              >
                <i className="fa fa-book nav-icon"></i>   {!isCollapsed && " Course Type"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/admin_application_status" 
                className={`nav-link sidebar_link ${[
                  "/admin_application_status",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_application_status"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Application Status" : ""}
                ref={el => (sidebarRefs.current['/application_status'] = el)}
              >
                <i className="fa fa-book nav-icon"></i>  {!isCollapsed && "  Application Status"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/admin_list_ModuleEmail",
                  "/admin_add_ModuleEmail",
                  "/admin_edit_ModuleEmail",
                  "/admin_view_ModuleEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_list_ModuleEmail"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Email" : ""}
                ref={el => (sidebarRefs.current['/list_ModuleEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i>   {!isCollapsed && " Email"}
              </Link>
            </li>
           
            <li className="nav-item">
              <Link 
                to="/admin_client_module" 
                className={`nav-link sidebar_link ${[
                  "/admin_client_module",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_client_module"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Client" : ""}
                ref={el => (sidebarRefs.current['/client_module'] = el)}
              >
                <i className="fa fa-user nav-icon"></i> {!isCollapsed && "  Client "}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="#" 
                className={`nav-link sidebar_link ${[
                  "/admin_list_CustomModule",
                  "/admin_add_CustomModule",
                  "/admin_edit_CustomModule",
                  "/admin_view_CustomModule",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_list_CustomModule"
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
          to="/admin_Privilages" 
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
                to="/admin_Privilages" 
                className={`nav-link sidebar_link ${[
                  "/admin_Privilages",
                  
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_Privilages"
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
                  "/admin_list_ModulePrivileges",
                  "/admin_add_ModulePrivileges",
                  "/admin_edit_ModulePrivileges",
                  "/admin_view_ModulePrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/admin_list_ModulePrivileges"
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


<li className="nav-item" style={{ position: "relative" }}>
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
              "/admin_list_ReportEmployee",
              "/admin_add_ReportEmployee",
              "/admin_edit_ReportEmployee",
              "/admin_view_ReportEmployee",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/admin_list_GlobalPrivileges"
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
              "/admin_list_ReportAgent",
              "/admin_add_ReportAgent",
              "/admin_edit_ReportAgent",
              "/admin_view_ReportAgent",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/admin_list_GlobalPrivileges"
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
              "/admin_list_ReportStudents",
              "/admin_add_ReportStudents",
              "/admin_edit_ReportStudents",
              "/admin_view_ReportStudents",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/admin_list_GlobalPrivileges"
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
              "/admin_list_ReportBranch",
              "/admin_add_ReportBranch",
              "/admin_edit_ReportBranch",
              "/admin_view_ReportBranch",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/admin_list_GlobalPrivileges"
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
              "/admin_list_ReportAdmin",
              "/admin_add_ReportAdmin",
              "/admin_edit_ReportAdmin",
              "/admin_view_ReportAdmin",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/admin_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Admin" : ""}
          ref={el => (sidebarRefs.current['/list_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-shield nav-icon"></i>   {!isCollapsed && "Admin"}
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
