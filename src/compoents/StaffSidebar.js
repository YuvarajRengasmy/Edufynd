import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Edufynd from "../Assests/EduFynd.png";
import Edufynd_logo from "../Assests/3.png";
import {getStaffId } from "../Utils/storage";
import {  getSingleStaff } from "../api/staff";
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

  const [student, setStudent] = useState(null);
  useEffect(() => {
    getStudentDetails();
    // Check if privileges are properly fetched
  }, []);
  

  const getStudentDetails = () => {
    const id = getStaffId();
    getSingleStaff(id)
      .then((res) => {
        console.log("yuvrtyu", res);
        console.log("yuvi", res);
        setStudent(res?.data?.result); // Assuming the staff data is inside res.data.result
      })
      .catch((err) => {
        console.log(err);
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
        "/staff_list_student",
        "/staff_add_student",
        "/staff_view_student",
        "/staff_edit_student",
        "/staff_list_staff",
        "/staff_add_staff",
        "/staff_edit_staff",
        "/staff_view_staff",
        "/staff_view_agent",
        "/staff_edit_agent",
        "/staff_list_agent",
        "/staff_add_agent",
      ],
      enquiry: [
        "/staff_list_enquiry_student",
        "/staff_add_enquiry_student",
        "/staff_edit_enquiry_student",
        "/staff_view_enquiry_student",
        "/staff_list_forex_form",
        "/staff_add_forex_form",
        "/staff_edit_forex_form",
        "/staff_view_forex_form",
        "/staff_list_accommodation",
        "/staff_add_accommodation",
        "/staff_edit_accommodation",
        "/staff_view_accommodation",
        "/staff_list_flight_ticket",
        "/staff_add_flight_ticket",
        "/staff_edit_flight_ticket",
        "/staff_view_flight_ticket",
        "/staff_list_loan_enquiry",
        "/staff_add_loan_enquiry",
        "/staff_edit_loan_enquiry",
        "/staff_view_loan_enquiry",
        "/staff_list_business_enquiry",
        "/staff_add_business_enquiry",
        "/staff_edit_business_enquiry",
        "/staff_view_business_enquiry",
        "/staff_list_general_enquiry",
        "/staff_add_general_enquiry",
        "/staff_edit_general_enquiry",
        "/staff_view_general_enquiry",
      ],
      finance: [
        "/staff_list_income",
        "/staff_add_income",
        "/staff_edit_income",
        "/staff_view_income",
        "/staff_list_expenses",
        "/staff_add_expenses",
        "/staff_edit_expenses",
        "/staff_view_expenses",
        "/staff_list_raisequotations",
        "/staff_add_raisequotations",
        "/staff_edit_raisequotations",
        "/staff_view_raisequotations",
        "/staff_list_invoice",
        "/staff_add_invoice",
        "/staff_edit_invoice",
        "/staff_view_invoice",
        "/staff_list_income_report",
        "/staff_add_income_report",
        "/staff_edit_income_report",
        "/staff_view_income_report",
      ],
      hrms: [
        "/staff_list_hrms_staff",
        "/staff_add_hrms_staff",
        "/staff_edit_hrms_staff",
        "/staff_view_hrms_staff",
        "/staff_list_attendance",
        "/staff_add_attendance",
        "/staff_edit_attendance",
        "/staff_view_attendance",
        "/staff_list_payroll",
        "/staff_add_payroll",
        "/staff_edit_payroll",
        "/staff_view_payroll",
        "/staff_list_leave",
        "/staff_add_leave",
        "/staff_edit_leave",
        "/staff_view_leave",
        "/staff_list_kpi",
        "/staff_add_kpi",
        "/staff_edit_kpi",
        "/staff_view_kpi",
        "/staff_list_policies",
        "/staff_add_policies",
        "/staff_edit_policies",
        "/staff_view_policies",
        "/staff_list_performance_report",
        "/staff_add_performance_report",
        "/staff_edit_performance_report",
        "/staff_view_performance_report",
      ],
      Projects: [
        "/staff_list_project",
        "/staff_add_project",
        "/staff_edit_project",
        "/staff_view_project",
        "/staff_list_task",
        "/staff_add_task",
        "/staff_edit_task",
        "/staff_view_task",
      ],
      Marketing: {
        socialMedia: {
          facebook: ["/staff_list_facebook", "/staff_add_facebook", "/staff_edit_facebook", "/staff_view_facebook"],
          linkedIn: ["/staff_list_linkedin", "/staff_add_linkedin", "/staff_edit_linkedin", "/staff_view_linkedin"],
          instagram: ["/staff_list_instagram", "/staff_add_instagram", "/staff_edit_instagram", "/staff_view_instagram"],
        },
        campaigns: ["/staff_list_campaign", "/staff_add_campaign", "/staff_edit_campaign", "/staff_view_campaign"],
        dailyTasks: ["/staff_list_daily_task", "/staff_add_daily_task", "/staff_edit_daily_task", "/staff_view_daily_task"],
      },
      elt: [
        "/staff_list_bookings",
        "/staff_add_bookings",
        "/staff_edit_bookings",
        "/staff_view_bookings",
        "/staff_list_class_schedule",
        "/staff_add_class_schedule",
        "/staff_edit_class_schedule",
        "/staff_view_class_schedule",
      ],
      settings: {
        globalSettings: [
          "/staff_global_settings",
          "/staff_currency_settings",
          "/staff_status",
          "/staff_intake",
          "/staff_year_setting",
        ],
        modules: [
          "/staff_client_module",
          "/staff_university_settings",
          "/staff_application_status",
          "/staff_course_type",
        ],
        privileges:[
          "/staff_Privilages",
        ]
      },
      Reports: [
        "/staff_EmployeeReports",
        "/staff_AgentReports",
        "/staff_StudentReports",
        "/staff_BranchReports",
        "/staff_AdminReports",
      ],
      Socialmedia: [
        "/staff_list_facebook",
        "/staff_add_facebook",
        "/staff_edit_facebook",
        "/staff_view_facebook",
        "/staff_list_linkedin",
        "/staff_add_linkedin",
        "/staff_edit_linkedin",
        "/staff_view_linkedin",
        "/staff_list_instagram",
        "/staff_add_instagram",
        "/staff_edit_instagram",
        "/staff_view_instagram",
      ],
      globalSettings: [
        "/staff_global_settings",
        "/staff_currency_settings",
        "/staff_status",
        "/staff_intake",
        "/staff_year_setting",
      ],
      modules: [
        "/staff_client_module",
        "/staff_university_settings",
        "/staff_application_status",
        "/staff_course_type",
      ],
      privileges:[
        "/staff_Privilages",
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
                to="/staff_dashboard"
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
    to="/staff_dashboard"
    ref={el => (sidebarRefs.current['/dashboard'] = el)}
    className={`nav-link sidebar_link ${activeLink === "/staff_dashboard" ? "active" : ""}`}
    onClick={() => handleSetActiveLink("/staff_dashboard")}
      data-path="/staff_dashboard"
   
      data-bs-toggle="tooltip"
      title={isCollapsed ? "Dashboard" : ""}
  >
    <i className="fa fa-tachometer-alt nav-icon"></i>
    {!isCollapsed && "Dashboard"}
  </Link>
</li>
{student?.privileges?.some(privilege => privilege.module === "client") && (
  <li className="nav-item">
  <Link 
    to="/staff_list_client"
    ref={el => (sidebarRefs.current['/staff_client'] = el)}
    className={`nav-link sidebar_link ${
      ["/staff_list_client", "/staff_add_client", "/staff_view_client", "/staff_edit_client"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/staff_list_client")}
     data-path="/staff_list_client"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Client" : ""}
  >
    <i className="fa fa-user nav-icon"></i>
   
    {!isCollapsed && " Client"}
  </Link>
</li>
)}


<li className="nav-item">
  <Link 
    to="/staff_list_university"
    ref={el => (sidebarRefs.current['/staff_university'] = el)}
    className={`nav-link sidebar_link ${
      ["/staff_list_university", "/staff_add_university", "/staff_view_university", "/staff_edit_university"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/staff_list_university")}
   
     data-path="/staff_list_university"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "University" : ""}
  >
    <i className="fa fa-graduation-cap nav-icon"></i>
    
    {!isCollapsed && "University"}
  </Link>
</li>

{student?.privileges?.some(privilege => privilege.module === "commission") && (

<li className="nav-item">
  <Link 
    to="/staff_list_commission"
    ref={el => (sidebarRefs.current['/staff_commission'] = el)}
    className={`nav-link sidebar_link ${
      ["/staff_list_commission", "/staff_add_commission", "/staff_view_commission", "/staff_edit_commission"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/staff_list_commission")}
     data-path="/staff_list_commission"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Commission" : ""}
  >
    <i className="fa fa-dollar-sign nav-icon"></i>
    
    {!isCollapsed && "Commission"}
  </Link>
</li>
)}

<li className="nav-item">
  <Link 
    to="/staff_list_program" 
    ref={el => (sidebarRefs.current['/staff_program'] = el)} 
    className={`nav-link sidebar_link ${
      ["/staff_list_program", "/staff_add_program", "/staff_edit_program", "/staff_view_program"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/staff_list_Program")}
     data-path="/staff_list_Program"
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
    {student?.privileges?.some(privilege => privilege.module === "student") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_student"
          ref={el => (sidebarRefs.current['/staff_student'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_student", "/staff_add_student", "/staff_view_student", "/staff_edit_student"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_student")}
           data-path="/staff_list_student"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Students" : ""}
           
        >
          <i className="fa fa-user-graduate nav-icon"></i>
          {!isCollapsed && " Students"} 
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "staff") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_staff"
          ref={el => (sidebarRefs.current['/staff_list_staff'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_staff", "/staff_add_staff", "/staff_edit_staff", "/staff_view_staff"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_staff")}
           data-path="/staff_list_staff"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Staffs" : ""}
        >
          <i className="fa fa-user-tie nav-icon"></i> 
          {!isCollapsed && " Staffs"}
        </Link>
      </li>
    )}
     {student?.privileges?.some(privilege => privilege.module === "agent") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_agent"
          ref={el => (sidebarRefs.current['/staff_agent'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_view_agent", "/staff_edit_agent", "/staff_list_agent", "/staff_add_agent"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_agent")}
           data-path="/staff_list_agent"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Agents" : ""}
        >
          <i className="fa fa-user-secret nav-icon"></i> 
          {!isCollapsed && " Agents"}
        </Link>
      </li>
     )}
    </ul>
  </div>
</li>


{student?.privileges?.some(privilege => privilege.module === "application") && (

<li className="nav-item">
  <Link 
    to="/staff_list_application"
    ref={el => (sidebarRefs.current['/staff_application'] = el)}
    className={`nav-link sidebar_link ${
      ["/staff_list_application", "/staff_add_application", "/staff_edit_application", "/staff_Application"].includes(currentPath)
        ? "active"
        : ""
    }`}
    onClick={() => handleSetActiveLink("/staff_list_application")}
     data-path="/staff_list_application"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Application" : ""}
  >
    <i className="fa fa-archive nav-icon"></i> 
    {!isCollapsed && " Application"}
  </Link>
</li>
)}

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
    {student?.privileges?.some(privilege => privilege.module === "studentEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_enquiry_student"
          ref={el => (sidebarRefs.current['/staff_enquiry_student'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_enquiry_student", "/staff_add_enquiry_student", "/staff_edit_enquiry_student", "/staff_view_enquiry_student"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_enquiry_student")}
           data-path="/staff_list_enquiry_student"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Student Enquiry" : ""}
        >
          <i className="fa fa-user-graduate nav-icon"></i> 
          {!isCollapsed && " Student "}
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "forexEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_forex_form"
          ref={el => (sidebarRefs.current['/staff_forex_form'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_forex_form", "/staff_add_forex_form", "/staff_edit_forex_form", "/staff_view_forex_form"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_forex_form")}
           data-path="/staff_list_forex_form"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "FOREX Enquiry" : ""}
        >
          <i className="fa fa-money-bill-wave nav-icon"></i> 
          {!isCollapsed && " FOREX "}
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "accommodationEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_accommodation"
          ref={el => (sidebarRefs.current['/staff_accommodation'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_accommodation", "/staff_add_accommodation", "/staff_edit_accommodation", "/staff_view_accommodation"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_accommodation")}
           data-path="/staff_list_accommodation"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Accommodation  Enquiry" : ""}
        >
          <i className="fa fa-bed nav-icon"></i> 
          {!isCollapsed && " Accommodation  "}
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "flightEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_flight_ticket"
          ref={el => (sidebarRefs.current['/staff_flight_ticket'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_flight_ticket", "/staff_add_flight_ticket", "/staff_edit_flight_ticket", "/staff_view_flight_ticket"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_flight_ticket")}
           data-path="/staff_list_flight_ticket"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Flight Ticket" : ""}
        >
          <i className="fa fa-plane nav-icon"></i> 
          {!isCollapsed && " Flight Ticket "}
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "loanEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_loan_enquiry"
          ref={el => (sidebarRefs.current['/staff_loan_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_loan_enquiry", "/staff_add_loan_enquiry", "/staff_edit_loan_enquiry", "/staff_view_loan_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_loan_enquiry")}
           data-path="/staff_list_loan_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Loan Enquiry" : ""}
        >
          <i className="fa fa-credit-card nav-icon"></i> 
          {!isCollapsed && " Loan "}
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "businessEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_business_enquiry"
          ref={el => (sidebarRefs.current['/staff_business_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_business_enquiry", "/staff_add_business_enquiry", "/staff_edit_business_enquiry", "/staff_view_business_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_business_enquiry")}
           data-path="/staff_list_business_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Business Enquiry" : ""}
        >
          <i className="fa fa-briefcase nav-icon"></i>
          {!isCollapsed && "  Business "}
        </Link>
      </li>
    )}
    {student?.privileges?.some(privilege => privilege.module === "generalEnquiry") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_general_enquiry"
          ref={el => (sidebarRefs.current['/staff_general_enquiry'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_general_enquiry", "/staff_add_general_enquiry", "/staff_edit_general_enquiry", "/staff_view_general_enquiry"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_general_enquiry")}
           data-path="/staff_list_general_enquiry"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "General Enquiry" : ""}
        >
          <i className="fa fa-info-circle nav-icon"></i> 
          {!isCollapsed && "General "}
        </Link>
      </li>
    )}
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
    {student?.privileges?.some(privilege => privilege.module === "income") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_income"
          ref={el => (sidebarRefs.current['/staff_income'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_income", "/staff_add_income", "/staff_edit_income", "/staff_view_income"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_income")}
           data-path="/staff_list_income"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Income" : ""}
        >
          <i className="fa fa-arrow-up nav-icon"></i> 
          {!isCollapsed && " Income"}
        </Link>
      </li>
    )}
        {student?.privileges?.some(privilege => privilege.module === "expenses") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_expenses"
          ref={el => (sidebarRefs.current['/staff_expenses'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_expenses", "/staff_add_expenses", "/staff_edit_expenses", "/staff_view_expenses"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_expenses")}
           data-path="/staff_list_expenses"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Expense" : ""}
        >
          <i className="fa fa-arrow-down nav-icon"></i> 
          {!isCollapsed && " Expense"}
        </Link>
      </li>
        )}
            {student?.privileges?.some(privilege => privilege.module === "raiseQuotations") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_raisequotations"
          ref={el => (sidebarRefs.current['/staff_raiseQuotations'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_raisequotations", "/staff_add_raisequotations", "/staff_edit_raisequotations", "/staff_view_raisequotations"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_raisequotations")}
           data-path="/staff_list_raisequotations"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Raise Quotations" : ""}
        >
          <i className="fa fa-file-invoice nav-icon"></i> 
          {!isCollapsed && " Raise Quotations"}
        </Link>
      </li>
            )}
                {student?.privileges?.some(privilege => privilege.module === "raiseInvoices") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_invoice"
          ref={el => (sidebarRefs.current['/staff_invoice'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_invoice", "/staff_add_sender_invoice", "/staff_add_reciever_invoice", "/staff_edit_invoice", "/staff_view_invoice"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_invoice")}
           data-path="/staff_list_invoice"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Raise Invoice" : ""}
        >
          <i className="fa fa-file-invoice-dollar nav-icon"></i> 
          {!isCollapsed && " Raise Invoice"}
        </Link>
      </li>
                )}
                    {student?.privileges?.some(privilege => privilege.module === "incomeReport") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_income_report"
          ref={el => (sidebarRefs.current['/staff_income_Report'] = el)}
          className={`nav-link sidebar_link ${
            ["/staff_list_income_report", "/staff_add_income_report", "/staff_edit_income_report", "/staff_view_income_report"].includes(currentPath)
              ? "active"
              : ""
          }`}
          onClick={() => handleSetActiveLink("/staff_list_income_report")}
           data-path="/staff_list_income_report"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Income Report" : ""}
        >
          <i className="fa fa-chart-line nav-icon"></i> 
          {!isCollapsed && " Income Report"}
        </Link>
      </li>
                    )}
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
    {student?.privileges?.some(privilege => privilege.module === "projects") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_project"
          className={`nav-link sidebar_link ${
            ["/staff_list_project", "/staff_add_project", "/staff_edit_project", "/staff_view_project"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/staff_project'] = el)}
           data-path="/staff_list_project"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Project" : ""}
        >
          <i className="fa fa-briefcase nav-icon"></i>
          {!isCollapsed && "  Project"}
        </Link>
      </li>
    )}
                    {student?.privileges?.some(privilege => privilege.module === "tasks") && (


      <li className="nav-item">
        <Link 
          to="/staff_list_task"
          className={`nav-link sidebar_link ${
            ["/staff_list_task", "/staff_add_task", "/staff_edit_task", "/staff_view_task"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/staff_task'] = el)}
           data-path="/staff_list_task"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Task" : ""}
        >
          <i className="fa fa-tasks nav-icon"></i> 
          {!isCollapsed && " Task"}
        </Link>
      </li>
                    )}
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
          {student?.privileges?.some(privilege => privilege.module === "facebook") && (

            <li className="nav-item">
              <Link 
                to="/staff_list_facebook"
                className={`nav-link sidebar_link ${
                  ["/staff_list_facebook", "/staff_add_facebook", "/staff_view_facebook", "/staff_edit_facebook"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/staff_facebook'] = el)}
                  data-path="/staff_list_facebook"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "Facebook" : ""}
              >
                <i className="fa fa-user-graduate nav-icon"></i>
                {!isCollapsed && "  Facebook"}
              </Link>
            </li>
          )}
                              {student?.privileges?.some(privilege => privilege.module === "instagram") && (

            <li className="nav-item">
              <Link 
                to="/staff_list_instagram"
                className={`nav-link sidebar_link ${
                  ["/staff_list_instagram", "/staff_add_instagram", "/staff_edit_instagram", "/staff_view_instagram"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/staff_instagram'] = el)}
                  data-path="/staff_list_instagram"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "Instagram" : ""}
              >
                <i className="fa fa-user-tie nav-icon"></i> 
                {!isCollapsed && " Instagram"}
              </Link>
            </li>
                              )}
                                                  {student?.privileges?.some(privilege => privilege.module === "linkedIn") && (

            <li className="nav-item">
              <Link 
                to="/staff_list_linkedin"
                className={`nav-link sidebar_link ${
                  ["/staff_view_linkedin", "/staff_edit_linkedin", "/staff_list_linkedin", "/staff_add_linkedin"].includes(currentPath)
                    ? "active"
                    : ""
                }`}
                ref={el => (sidebarRefs.current['/staff_linkedin'] = el)}
                  data-path="/staff_list_linkedin"
                  data-bs-toggle="tooltip"
                  title={isCollapsed ? "LinkedIn" : ""}
              >
                <i className="fa fa-user-secret nav-icon"></i> 
                {!isCollapsed && "LinkedIn"}
              </Link>
            </li>
                                                  )}
          </ul>
        </div>
      </li>
  
                        {student?.privileges?.some(privilege => privilege.module === "campaings") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_campaign"
          className={`nav-link sidebar_link ${
            ["/staff_list_campaign", "/staff_add_campaign", "/staff_edit_campaign", "/staff_view_campaign"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/staff_campaign'] = el)}
            data-path="/staff_list_campaign"
            data-bs-toggle="tooltip"
            title={isCollapsed ? " Campaigns" : ""}
        >
          <i className="fa fa-bullhorn nav-icon"></i> 
          {!isCollapsed && " Campaigns"}
        </Link>
      </li>
                        )}
 {student?.privileges?.some(privilege => privilege.module === "dailyTasks") && (

      <li className="nav-item">
        <Link 
          to="/staff_list_daily_task"
          className={`nav-link sidebar_link ${
            ["/staff_list_daily_task", "/staff_add_daily_task", "/staff_edit_daily_task", "/staff_view_daily_task"].includes(currentPath)
              ? "active"
              : ""
          }`}
          ref={el => (sidebarRefs.current['/staff_daily_task'] = el)}
           data-path="/staff_list_daily_task"
           data-bs-toggle="tooltip"
           title={isCollapsed ? "Daily Task" : ""}
        >
          <i className="fa fa-tasks nav-icon"></i> 
          {!isCollapsed && " Daily Task"}
        </Link>
      </li>
                                            )}
    </ul>
  </div>
</li>

<li className="nav-item">
  <Link 
    to="/staff_list_notifications"
    className={`nav-link sidebar_link ${
      ["/staff_list_notifications", "/staff_add_notifications", "/staff_edit_notifications", "/staff_view_notifications"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/staff_notifications'] = el)}
     data-path="/staff_list_notifications"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Notifications" : ""}
  >
    <i className="fa fa-bell nav-icon"></i>
    {!isCollapsed && "  Notifications"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/staff_list_meetings"
    className={`nav-link sidebar_link ${
      ["/staff_list_meetings", "/staff_add_meetings", "/staff_edit_meetings", "/staff_view_meetings"].includes(currentPath)
        ? "active"
        : ""
    }`}
    ref={el => (sidebarRefs.current['/staff_meetings'] = el)}
     data-path="/staff_list_meetings"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Meetings" : ""}
  >
    <i className="fa fa-video nav-icon"></i> 
    {!isCollapsed && " Meetings"}
  </Link>
</li>

{student?.privileges?.some(privilege => privilege.module === "training") && (

<li className="nav-item">
  <Link 
    to="/staff_list_training"
    className={`nav-link sidebar_link ${
      ["/staff_list_training", "/staff_add_training", "/staff_edit_training", "/staff_view_training"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/staff_list_training"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Training Material" : ""}
    ref={el => (sidebarRefs.current['/staff_training'] = el)}
  >
    <i className="fa fa-book nav-icon"></i> 
    {!isCollapsed && " Training Material"}
  </Link>
</li>
)}

<li className="nav-item">
  <Link 
    to="/staff_list_chat"
    className={`nav-link sidebar_link ${
      ["/staff_list_chat", "/staff_add_chat", "/staff_edit_chat", "/staff_view_chat"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/staff_list_chat"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Chat" : ""}
    ref={el => (sidebarRefs.current['/staff_chat'] = el)}
  >
    <i className="fa fa-comments nav-icon"></i> 
    {!isCollapsed && " Chat"}
  </Link>
</li>

<li className="nav-item">
  <Link 
    to="/staff_list_email"
    className={`nav-link sidebar_link ${
      ["/staff_list_email", "/staff_add_email", "/staff_edit_email", "/staff_view_email"].includes(currentPath)
        ? "active"
        : ""
    }`}
    data-path="/staff_list_email"
    data-bs-toggle="tooltip"
    title={isCollapsed ? "Email" : ""}
    ref={el => (sidebarRefs.current['/staff_email'] = el)}
  >
    <i className="fa fa-envelope nav-icon"></i>
    {!isCollapsed && "  Email"}
  </Link>
</li>



<li className="nav-item">
  <Link to="/staff_list_promotions"
    className={`nav-link sidebar_link ${[
      "/staff_list_promotions",
      "/staff_add_promotions",
      "/staff_edit_promotions",
      "/staff_view_promotions",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/staff_list_promotions"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Promotions" : ""}
     ref={el => (sidebarRefs.current['/staff_promotions'] = el)}
  >
    <i className="fa fa-bullhorn nav-icon"></i>
   
    {!isCollapsed && "  Promotions"}
  </Link>
</li>

<li className="nav-item">
  <Link to="/staff_list_events"
    className={`nav-link sidebar_link ${[
      "/staff_list_events",
      "/staff_add_events",
      "/staff_edit_events",
      "/staff_view_events",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/staff_list_events"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Events" : ""}
     ref={el => (sidebarRefs.current['/staff_events'] = el)}
  >
    <i className="fa fa-calendar nav-icon"></i>
   
    {!isCollapsed && "  Events"}
  </Link>
</li>

{student?.privileges?.some(privilege => privilege.module === "blogs") && (

<li className="nav-item">
  <Link to="/staff_list_blog"
    className={`nav-link sidebar_link ${[
      "/staff_list_blog",
      "/staff_add_blog",
      "/staff_edit_blog",
      "/staff_view_blog",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/staff_list_blog"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Blogs" : ""}
     ref={el => (sidebarRefs.current['/staff_list_blog'] = el)}
  >
    <i className="fa fa-blog nav-icon"></i> 
    {!isCollapsed && " Blogs"}
  </Link>
</li>
)}
{student?.privileges?.some(privilege => privilege.module === "testimonials") && (

<li className="nav-item">
  <Link to="/staff_list_testimonials"
    className={`nav-link sidebar_link ${[
      "/staff_list_testimonials",
      "/staff_add_testimonials",
      "/staff_edit_testimonials",
      "/staff_view_testimonials",
    ].includes(currentPath) ? "active" : ""}`}
     data-path="/staff_list_testimonials"
     data-bs-toggle="tooltip"
     title={isCollapsed ? "Testimonials" : ""}
     ref={el => (sidebarRefs.current['/staff_testimonials'] = el)}
  >
    <i className="fa fa-quote-right nav-icon"></i> 
    {!isCollapsed && " Testimonials"}
  </Link>
</li>
)}
{/* <li className="nav-item">
  <Link to="/staff_list_admin"
    className={`nav-link sidebar_link ${[
      "/staff_list_admin",
      "/staff_add_admin",
      "/staff_edit_admin",
      "/staff_view_admin",
    ].includes(currentPath) ? "active" : ""}`}
    data-path="/staff_list_admin"
    data-bs-toggle="tooltip"
    title={isCollapsed ? " Admin" : ""}
    ref={el => (sidebarRefs.current['/staff_admin'] = el)}
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
        <Link to="/staff_list_bookings"
          className={`nav-link sidebar_link ${[
            "/staff_list_bookings",
            "/staff_add_bookings",
            "/staff_edit_bookings",
            "/staff_view_bookings",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/staff_list_bookings"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Booking" : ""}
          ref={el => (sidebarRefs.current['/staff_bookings'] = el)}
        >
          <i className="fa fa-calendar-check nav-icon"></i> 
          {!isCollapsed && " Booking"}
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/staff_list_class_schedule"
          className={`nav-link sidebar_link ${[
            "/staff_list_class_schedule",
            "/staff_add_class_schedule",
            "/staff_edit_class_schedule",
            "/staff_view_class_schedule",
          ].includes(currentPath) ? "active" : ""}`}
          data-path="/staff_list_class_schedule"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Class Schedule" : ""}
          ref={el => (sidebarRefs.current['/staff_class_schedule'] = el)}
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
                  "/staff_list_GlobalEmail",
                  "/staff_add_GlobalEmail",
                  "/staff_edit_GlobalEmail",
                  "/staff_view_GlobalEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_list_GlobalEmail"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Email" : ""}
                ref={el => (sidebarRefs.current['/staff_GlobalEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i>  {!isCollapsed && " Email"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_global_settings" 
                className={`nav-link sidebar_link ${[
                  "/staff_global_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_global_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Country" : ""}
                ref={el => (sidebarRefs.current['/global_settings'] = el)}
              >
                <i className="fa fa-globe nav-icon"></i>  {!isCollapsed && " Country"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_currency_settings" 
                className={`nav-link sidebar_link ${[
                  "/staff_currency_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_currency_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Currency" : ""}
                ref={el => (sidebarRefs.current['/currency_settings'] = el)}
              >
                <i className="fa fa-money-bill-wave nav-icon"></i>  {!isCollapsed && " Currency"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_status" 
                className={`nav-link sidebar_link ${[
                  "/staff_status",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_status"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Status" : ""}
                ref={el => (sidebarRefs.current['/status'] = el)}
              >
                <i className="fa fa-clipboard-list nav-icon"></i>  {!isCollapsed && " Status"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_intake" 
                className={`nav-link sidebar_link ${[
                  "/staff_intake",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_intake"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Intake" : ""}
                ref={el => (sidebarRefs.current['/intake'] = el)}
              >
                <i className="fa fa-calendar-alt nav-icon"></i>   {!isCollapsed && " Intake"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_year_setting" 
                className={`nav-link sidebar_link ${[
                  "/staff_year_setting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_year_setting"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Year" : ""}
                ref={el => (sidebarRefs.current['/year_setting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Year"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_source" 
                className={`nav-link sidebar_link ${[
                  "/staff_source",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_source"
                ref={el => (sidebarRefs.current['/source'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Source"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_blog_setting" 
                className={`nav-link sidebar_link ${[
                  "/staff_blog_setting",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_blog_setting"
                ref={el => (sidebarRefs.current['/blog_setting'] = el)}
              >
                <i className="fa fa-calendar nav-icon"></i>   {!isCollapsed && " Blog_Category"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_Privilages" 
                className={`nav-link sidebar_link ${[
                  "/staff_list_GlobalPrivileges",
                  "/staff_add_GlobalPrivileges",
                  "/staff_edit_GlobalPrivileges",
                  "/staff_view_GlobalPrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_list_GlobalPrivileges"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Privileges" : ""}
                ref={el => (sidebarRefs.current['/staff_GlobalPrivileges'] = el)}
              >
                <i className="fa fa-lock nav-icon"></i>   {!isCollapsed && " Privileges"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_global_settingsDashboard" 
                className={`nav-link sidebar_link ${[
                  "/staff_global_settingsDashboard",
                 
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_global_settingsDashboard"
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
                to="/staff_university_settings" 
                className={`nav-link sidebar_link ${[
                  "/staff_university_settings",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_university_settings"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "University" : ""}
                ref={el => (sidebarRefs.current['/university_settings'] = el)}
              >
                <i className="fa fa-university nav-icon"></i>   {!isCollapsed && " Global Module"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_course_type" 
                className={`nav-link sidebar_link ${[
                  "/staff_course_type",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_course_type"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Course Type" : ""}
                ref={el => (sidebarRefs.current['/course_type'] = el)}
              >
                <i className="fa fa-book nav-icon"></i>   {!isCollapsed && " Course Type"}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/staff_application_status" 
                className={`nav-link sidebar_link ${[
                  "/staff_application_status",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_application_status"
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
                  "/staff_list_ModuleEmail",
                  "/staff_add_ModuleEmail",
                  "/staff_edit_ModuleEmail",
                  "/staff_view_ModuleEmail",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_list_ModuleEmail"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Email" : ""}
                ref={el => (sidebarRefs.current['/staff_ModuleEmail'] = el)}
              >
                <i className="fa fa-envelope nav-icon"></i>   {!isCollapsed && " Email"}
              </Link>
            </li>
           
            <li className="nav-item">
              <Link 
                to="/staff_client_module" 
                className={`nav-link sidebar_link ${[
                  "/staff_client_module",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_client_module"
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
                  "/staff_list_CustomModule",
                  "/staff_add_CustomModule",
                  "/staff_edit_CustomModule",
                  "/staff_view_CustomModule",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_list_CustomModule"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Custom Module" : ""}
                ref={el => (sidebarRefs.current['/staff_CustomModule'] = el)}
              >
                <i className="fa fa-cogs nav-icon"></i>   {!isCollapsed && " Custom Module"}
              </Link>
            </li>
          </ul>
        </div>
      </li>

     
      <li className="nav-item">
        <Link 
          to="/staff_Privilages" 
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
                to="/staff_Privilages" 
                className={`nav-link sidebar_link ${[
                  "/staff_Privilages",
                  
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_Privilages"
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
                  "/staff_list_ModulePrivileges",
                  "/staff_add_ModulePrivileges",
                  "/staff_edit_ModulePrivileges",
                  "/staff_view_ModulePrivileges",
                ].includes(currentPath) ? "active" : ""}`}
                data-path="/staff_list_ModulePrivileges"
                data-bs-toggle="tooltip"
                title={isCollapsed ? "Module Privileges" : ""}
                ref={el => (sidebarRefs.current['/staff_ModulePrivileges'] = el)}
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
              "/staff_list_ReportEmployee",
              "/staff_add_ReportEmployee",
              "/staff_edit_ReportEmployee",
              "/staff_view_ReportEmployee",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/staff_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Employee" : ""}
          ref={el => (sidebarRefs.current['/staff_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-tie nav-icon"></i>   {!isCollapsed && " Employee"}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/staff_list_ReportAgent",
              "/staff_add_ReportAgent",
              "/staff_edit_ReportAgent",
              "/staff_view_ReportAgent",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/staff_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Agent" : ""}
          ref={el => (sidebarRefs.current['/staff_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-secret nav-icon"></i>  {!isCollapsed && " Agent "}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/staff_list_ReportStudents",
              "/staff_add_ReportStudents",
              "/staff_edit_ReportStudents",
              "/staff_view_ReportStudents",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/staff_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Students" : ""}
          ref={el => (sidebarRefs.current['/staff_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-user-graduate nav-icon"></i>   {!isCollapsed && " Students"}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/staff_list_ReportBranch",
              "/staff_add_ReportBranch",
              "/staff_edit_ReportBranch",
              "/staff_view_ReportBranch",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/staff_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Branch" : ""}
          ref={el => (sidebarRefs.current['/staff_GlobalPrivileges'] = el)}
        >
          <i className="fa fa-sitemap nav-icon"></i>   {!isCollapsed && " Branch"}
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="#"
          className={`nav-link sidebar_link ${
            [
              "/staff_list_ReportAdmin",
              "/staff_add_ReportAdmin",
              "/staff_edit_ReportAdmin",
              "/staff_view_ReportAdmin",
            ].includes(currentPath)
              ? "active"
              : ""
          }`}
          data-path="/staff_list_GlobalPrivileges"
          data-bs-toggle="tooltip"
          title={isCollapsed ? "Admin" : ""}
          ref={el => (sidebarRefs.current['/staff_GlobalPrivileges'] = el)}
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
