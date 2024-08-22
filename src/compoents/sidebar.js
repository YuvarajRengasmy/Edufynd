import React, { useState, useEffect, useRef } from "react"; // Import React hooks
import { toast } from "react-toastify"; // Import toast for notifications
import { clearStorage } from "../Utils/storage"; // Import function to clear storage
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import hooks and Link from react-router-dom
import Edufynd from "../Assests/EduFynd.png"; // Import logo/image
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import * as bootstrap from "bootstrap"; // Import Bootstrap JavaScript
import "./Sidebar.css"; // Import custom CSS

const Sidebar = () => {
  const location = useLocation(); // Get current location from react-router-dom
  const navigate = useNavigate(); // Hook to navigate programmatically
  const currentPath = location.pathname; // Current path from location object

  const [activeLink, setActiveLink] = useState(currentPath); // State to keep track of the active link
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
  }); // State to manage which dropdowns are open
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
    // Initialize collapsed state from local storage
  });

  const sidebarRefs = useRef({}); // Ref to store references to sidebar items

  const handleSetActiveLink = (path) => {
    setActiveLink(path); // Set the active link
  };

  const toggleDropdown = (key) => {
    setIsOpen((prevState) => ({ ...prevState, [key]: !prevState[key] }));
    // Toggle dropdown state for a specific key
  };

  const handleSidebarToggle = () => {
    setIsCollapsed((prev) => {
      const newCollapsedState = !prev;
      localStorage.setItem(
        "sidebarCollapsed",
        JSON.stringify(newCollapsedState)
      );
      // Save the new collapsed state to local storage
      return newCollapsedState;
    });
  };

  const logout = () => {
    clearStorage(); // Clear storage on logout
    toast.success("You have been logged out successfully."); // Show success toast
    navigate("/"); // Navigate to home page
  };

  useEffect(() => {
    const dropdownPaths = {
      users: [
        // Define paths related to users
        "/list_student",
        "/add_student",
        "/view_student",
        "/edit_student",
        "/list_staff",
        "/add_staff",
        "/edit_staff",
        "/view_staff",
        "/view_agent",
        "/edit_agent",
        "/list_agent",
        "/add_agent",
      ],
      enquiry: [
        // Define paths related to enquiries
        "/list_enquiry_student",
        "/add_enquiry_student",
        "/edit_enquiry_student",
        "/view_enquiry_student",
        "/list_forex_form",
        "/add_forex_form",
        "/edit_forex_form",
        "/view_forex_form",
        "/list_accommodation",
        "/add_accommodation",
        "/edit_accommodation",
        "/view_accommodation",
        "/list_flight_ticket",
        "/add_flight_ticket",
        "/edit_flight_ticket",
        "/view_flight_ticket",
        "/list_loan_enquiry",
        "/add_loan_enquiry",
        "/edit_loan_enquiry",
        "/view_loan_enquiry",
        "/list_business_enquiry",
        "/add_business_enquiry",
        "/edit_business_enquiry",
        "/view_business_enquiry",
        "/list_general_enquiry",
        "/add_general_enquiry",
        "/edit_general_enquiry",
        "/view_general_enquiry",
      ],
      finance: [
        // Define paths related to finance
        "/list_income",
        "/add_income",
        "/edit_income",
        "/view_income",
        "/list_expenses",
        "/add_expenses",
        "/edit_expenses",
        "/view_expenses",
        "/list_raisequotations",
        "/add_raisequotations",
        "/edit_raisequotations",
        "/view_raisequotations",
        "/list_invoice",
        "/add_invoice",
        "/edit_invoice",
        "/view_invoice",
        "/list_income_report",
        "/add_income_report",
        "/edit_income_report",
        "/view_income_report",
      ],
      hrms: [
        // Define paths related to HRMS
        "/list_hrms_staff",
        "/add_hrms_staff",
        "/edit_hrms_staff",
        "/view_hrms_staff",
        "/list_attendance",
        "/add_attendance",
        "/edit_attendance",
        "/view_attendance",
        "/list_payroll",
        "/add_payroll",
        "/edit_payroll",
        "/view_payroll",
        "/list_leave",
        "/add_leave",
        "/edit_leave",
        "/view_leave",
        "/list_kpi",
        "/add_kpi",
        "/edit_kpi",
        "/view_kpi",
        "/list_policies",
        "/add_policies",
        "/edit_policies",
        "/view_policies",
        "/list_performance_report",
        "/add_performance_report",
        "/edit_performance_report",
        "/view_performance_report",
      ],
      Projects: [
        // Define paths related to projects
        "/list_project",
        "/add_project",
        "/edit_project",
        "/view_project",
        "/list_task",
        "/add_task",
        "/edit_task",
        "/view_task",
      ],
      Marketing: {
        socialMedia: {
          facebook: [
            "/list_facebook",
            "/add_facebook",
            "/edit_facebook",
            "/view_facebook",
          ],
          linkedIn: [
            "/list_linkedin",
            "/add_linkedin",
            "/edit_linkedin",
            "/view_linkedin",
          ],
          instagram: [
            "/list_instagram",
            "/add_instagram",
            "/edit_instagram",
            "/view_instagram",
          ],
        },
        campaigns: [
          "/list_campaign",
          "/add_campaign",
          "/edit_campaign",
          "/view_campaign",
        ],
        dailyTasks: [
          "/list_daily_task",
          "/add_daily_task",
          "/edit_daily_task",
          "/view_daily_task",
        ],
      },
      elt: [
        // Define paths related to ELT
        "/list_bookings",
        "/add_bookings",
        "/edit_bookings",
        "/view_bookings",
        "/list_class_schedule",
        "/add_class_schedule",
        "/edit_class_schedule",
        "/view_class_schedule",
      ],
      settings: {
        globalSettings: [
          // Define paths related to global settings
          "/global_settings",
          "/currency_settings",
          "/status",
          "/intake",
          "/year_setting",
        ],
        modules: [
          // Define paths related to modules
          "/client_module",
          "/university_settings",
          "/application_status",
          "/course_type",
        ],
      },
      Reports: [
        // Define paths related to reports
        "/EmployeeReports",
        "/AgentReports",
        "/StudentReports",
        "/BranchReports",
        "/AdminReports",
      ],
      Socialmedia: [
        // Define paths related to social media
        "/list_facebook",
        "/add_facebook",
        "/edit_facebook",
        "/view_facebook",
        "/list_linkedin",
        "/add_linkedin",
        "/edit_linkedin",
        "/view_linkedin",
        "/list_instagram",
        "/add_instagram",
        "/edit_instagram",
        "/view_instagram",
      ],
      globalSettings: [
        "/global_settings",
        "/currency_settings",
        "/status",
        "/intake",
        "/year_setting",
      ],
      modules: [
        "/client_module",
        "/university_settings",
        "/application_status",
        "/course_type",
      ],
    };

    const checkNestedPaths = (paths, currentPath) => {
      // Check if currentPath matches any of the provided paths
      if (Array.isArray(paths)) {
        return paths.some((path) => currentPath.includes(path));
      }
      return Object.keys(paths).some((key) =>
        checkNestedPaths(paths[key], currentPath)
      );
    };

    const newIsOpen = Object.keys(dropdownPaths).reduce((acc, key) => {
      acc[key] = checkNestedPaths(dropdownPaths[key], currentPath);
      return acc;
    }, {});

    setIsOpen((prevState) => ({ ...prevState, ...newIsOpen }));
    // Update dropdown open states based on the current path

    // Cleanup tooltips when the component unmounts or path changes
    return () => {
      const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.forEach((tooltipTriggerEl) => {
        const tooltipInstance = bootstrap.Tooltip.getInstance(tooltipTriggerEl);
        if (tooltipInstance) {
          tooltipInstance.dispose(); // Dispose of each tooltip instance
        }
      });
    };
  }, [currentPath]);

  useEffect(() => {
    const activeRef = Object.values(sidebarRefs.current).find(
      (ref) => ref && currentPath.includes(ref.dataset.path)
    );

    if (activeRef) {
      setTimeout(() => {
        activeRef.scrollIntoView({ behavior: "smooth", block: "center" });
        // Smoothly scroll to the active sidebar item
      }, 100); // Delay to ensure correct scroll behavior
    }

    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      if (isCollapsed) {
        new bootstrap.Tooltip(tooltipTriggerEl, { placement: "right" }); // Initialize tooltip with 'right' placement if collapsed
      } else {
        bootstrap.Tooltip.getInstance(tooltipTriggerEl)?.dispose(); // Dispose of tooltip if not collapsed
      }
    });
  }, [currentPath, isCollapsed]);

  return (
    <>
      <aside
        className={`main-sidebar elevation-10  text-bg-white  ${
          isCollapsed ? "collapsed" : ""
        }`}
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
                  to="/dashboard"
                  className="brand-text font-weight-light text-decoration-none"
                >
                  <img
                    src={Edufynd}
                    alt="logo"
                    className="img-fluid"
                    style={{ width: "100%" }}
                  />
                </Link>
              </div>
            </div>
            <button
              onClick={handleSidebarToggle}
              className="btn btn-link text-white sidebar-toggle  "
            >
              <i className={`fa ${isCollapsed ? "fa-times " : "fa-bars "}`} />
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
                    to="/dashboard"
                    ref={(el) => (sidebarRefs.current["/dashboard"] = el)}
                    className={`nav-link sidebar_link ${
                      activeLink === "/dashboard" ? "active" : ""
                    }`}
                    onClick={() => handleSetActiveLink("/dashboard")}
                    data-path="/dashboard"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Dashboard" : ""}
                  >
                    <i className="fa fa-tachometer-alt nav-icon"></i>
                    {!isCollapsed && "Dashboard"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_client"
                    ref={(el) => (sidebarRefs.current["/list__client"] = el)}
                    className={`nav-link sidebar_link ${
                      [
                        "/list_client",
                        "/add_client",
                        "/view_client",
                        "/edit_client",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSetActiveLink("/list_client")}
                    data-path="/list_client"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Client" : ""}
                  >
                    <i className="fa fa-user nav-icon"></i>

                    {!isCollapsed && " Client"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_university"
                    ref={(el) =>
                      (sidebarRefs.current["/list__university"] = el)
                    }
                    className={`nav-link sidebar_link ${
                      [
                        "/list_university",
                        "/add_university",
                        "/view_university",
                        "/edit_university",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSetActiveLink("/list_university")}
                    data-path="/list_university"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "University" : ""}
                  >
                    <i className="fa fa-graduation-cap nav-icon"></i>

                    {!isCollapsed && "University"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_commission"
                    ref={(el) =>
                      (sidebarRefs.current["/list__commission"] = el)
                    }
                    className={`nav-link sidebar_link ${
                      [
                        "/list_commission",
                        "/add_commission",
                        "/view_commission",
                        "/edit_commission",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSetActiveLink("/list_commission")}
                    data-path="/list_commission"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Commission" : ""}
                  >
                    <i className="fa fa-dollar-sign nav-icon"></i>

                    {!isCollapsed && "Commission"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_program"
                    ref={(el) => (sidebarRefs.current["/list__program"] = el)}
                    className={`nav-link sidebar_link ${
                      [
                        "/list_program",
                        "/add_program",
                        "/edit_program",
                        "/view_program",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSetActiveLink("/list_Program")}
                    data-path="/list_Program"
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("users")}
                  >
                    <div
                      style={{
                        display: "-webkit-box", // For older Safari versions
                        display: "-ms-flexbox", // For IE10
                        display: "flex", // Modern browsers
                        alignItems: "center", // Vertical alignment
                        justifyContent: "space-between", // Space between elements
                      }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Users" : ""}
                    >
                      <i className="fa fa-users nav-icon"></i>

                      {!isCollapsed && "Users"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.users ? "rotate-icon" : ""
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
                        <Link
                          to="/list_student"
                          ref={(el) =>
                            (sidebarRefs.current["/list_student"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_student",
                              "/add_student",
                              "/view_student",
                              "/edit_student",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleSetActiveLink("/list_student")}
                          data-path="/list_student"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Students" : ""}
                        >
                          <i className="fa fa-user-graduate nav-icon"></i>
                          {!isCollapsed && " Students"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_staff"
                          ref={(el) =>
                            (sidebarRefs.current["/list_staff"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_staff",
                              "/add_staff",
                              "/edit_staff",
                              "/view_staff",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleSetActiveLink("/list_staff")}
                          data-path="/list_staff"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Staffs" : ""}
                        >
                          <i className="fa fa-user-tie nav-icon"></i>
                          {!isCollapsed && " Staffs"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_agent"
                          ref={(el) =>
                            (sidebarRefs.current["/list_agent"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/view_agent",
                              "/edit_agent",
                              "/list_agent",
                              "/add_agent",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleSetActiveLink("/list_agent")}
                          data-path="/list_agent"
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
                    to="/list_application"
                    ref={(el) =>
                      (sidebarRefs.current["/list_application"] = el)
                    }
                    className={`nav-link sidebar_link ${
                      [
                        "/list_application",
                        "/add_application",
                        "/edit_application",
                        "/Application",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSetActiveLink("/list_application")}
                    data-path="/list_application"
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("enquiry")}
                  >
                    <div
                      style={{
                        display: "-webkit-box", // For older Safari versions
                        display: "-ms-flexbox", // For IE10
                        display: "flex", // Modern browsers
                        alignItems: "center", // Vertical alignment
                        justifyContent: "space-between", // Space between elements
                      }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Enquiry" : ""}
                    >
                      <i className="fa fa-question-circle nav-icon"></i>
                      {!isCollapsed && " Enquiry"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.enquiry ? "rotate-icon" : ""
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
                        <Link
                          to="/list_enquiry_student"
                          ref={(el) =>
                            (sidebarRefs.current["/list_enquiry_student"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_enquiry_student",
                              "/add_enquiry_student",
                              "/edit_enquiry_student",
                              "/view_enquiry_student",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_enquiry_student")
                          }
                          data-path="/list_enquiry_student"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Student Enquiry" : ""}
                        >
                          <i className="fa fa-user-graduate nav-icon"></i>
                          {!isCollapsed && " Student "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_forex_form"
                          ref={(el) =>
                            (sidebarRefs.current["/list_forex_form"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_forex_form",
                              "/add_forex_form",
                              "/edit_forex_form",
                              "/view_forex_form",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_forex_form")
                          }
                          data-path="/list_forex_form"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "FOREX Enquiry" : ""}
                        >
                          <i className="fa fa-money-bill-wave nav-icon"></i>
                          {!isCollapsed && " FOREX "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_accommodation"
                          ref={(el) =>
                            (sidebarRefs.current["/list_accommodation"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_accommodation",
                              "/add_accommodation",
                              "/edit_accommodation",
                              "/view_accommodation",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_accommodation")
                          }
                          data-path="/list_accommodation"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Accommodation  Enquiry" : ""}
                        >
                          <i className="fa fa-bed nav-icon"></i>
                          {!isCollapsed && " Accommodation  "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_flight_ticket"
                          ref={(el) =>
                            (sidebarRefs.current["/list_flight_ticket"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_flight_ticket",
                              "/add_flight_ticket",
                              "/edit_flight_ticket",
                              "/view_flight_ticket",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_flight_ticket")
                          }
                          data-path="/list_flight_ticket"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Flight Ticket" : ""}
                        >
                          <i className="fa fa-plane nav-icon"></i>
                          {!isCollapsed && " Flight Ticket"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_loan_enquiry"
                          ref={(el) =>
                            (sidebarRefs.current["/list_loan_enquiry"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_loan_enquiry",
                              "/add_loan_enquiry",
                              "/edit_loan_enquiry",
                              "/view_loan_enquiry",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_loan_enquiry")
                          }
                          data-path="/list_loan_enquiry"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Loan Enquiry" : ""}
                        >
                          <i className="fa fa-credit-card nav-icon"></i>
                          {!isCollapsed && " Loan "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_business_enquiry"
                          ref={(el) =>
                            (sidebarRefs.current["/list_business_enquiry"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_business_enquiry",
                              "/add_business_enquiry",
                              "/edit_business_enquiry",
                              "/view_business_enquiry",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_business_enquiry")
                          }
                          data-path="/list_business_enquiry"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Business Enquiry" : ""}
                        >
                          <i className="fa fa-briefcase nav-icon"></i>
                          {!isCollapsed && "  Business"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_general_enquiry"
                          ref={(el) =>
                            (sidebarRefs.current["/list_general_enquiry"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_general_enquiry",
                              "/add_general_enquiry",
                              "/edit_general_enquiry",
                              "/view_general_enquiry",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_general_enquiry")
                          }
                          data-path="/list_general_enquiry"
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("finance")}
                  >
                    <div 
                     style={{
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Finance" : ""}
                    >
                      <i className="fa fa-wallet nav-icon"></i>
                      {!isCollapsed && "Finance"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.finance ? "rotate-icon" : ""
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
                        <Link
                          to="/list_income"
                          ref={(el) =>
                            (sidebarRefs.current["/list_income"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_income",
                              "/add_income",
                              "/edit_income",
                              "/view_income",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleSetActiveLink("/list_income")}
                          data-path="/list_income"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Income" : ""}
                        >
                          <i className="fa fa-arrow-up nav-icon"></i>
                          {!isCollapsed && " Income"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_expenses"
                          ref={(el) =>
                            (sidebarRefs.current["/list_expenses"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_expenses",
                              "/add_expenses",
                              "/edit_expenses",
                              "/view_expenses",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleSetActiveLink("/list_expenses")}
                          data-path="/list_expenses"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Expense" : ""}
                        >
                          <i className="fa fa-arrow-down nav-icon"></i>
                          {!isCollapsed && " Expense"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_raisequotations"
                          ref={(el) =>
                            (sidebarRefs.current["/list_raiseQuotations"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_raisequotations",
                              "/add_raisequotations",
                              "/edit_raisequotations",
                              "/view_raisequotations",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_raisequotations")
                          }
                          data-path="/list_raisequotations"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Raise Quotations" : ""}
                        >
                          <i className="fa fa-file-invoice nav-icon"></i>
                          {!isCollapsed && " Raise Quotations"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_invoice"
                          ref={(el) =>
                            (sidebarRefs.current["/list_invoice"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_invoice",
                              "/add_sender_invoice",
                              "/add_reciever_invoice",
                              "/edit_invoice",
                              "/view_invoice",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() => handleSetActiveLink("/list_invoice")}
                          data-path="/list_invoice"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Raise Invoice" : ""}
                        >
                          <i className="fa fa-file-invoice-dollar nav-icon"></i>
                          {!isCollapsed && " Raise Invoice"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_income_report"
                          ref={(el) =>
                            (sidebarRefs.current["/list_income_Report"] = el)
                          }
                          className={`nav-link sidebar_link ${
                            [
                              "/list_income_report",
                              "/add_income_report",
                              "/edit_income_report",
                              "/view_income_report",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            handleSetActiveLink("/list_income_report")
                          }
                          data-path="/list_income_report"
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("Projects")}
                    ref={(el) => (sidebarRefs.current["/Projects"] = el)}
                  >
                    <div 
                      style={{
                        display: "-webkit-box", // For older Safari versions
                        display: "-ms-flexbox", // For IE10
                        display: "flex", // Modern browsers
                        alignItems: "center", // Vertical alignment
                        justifyContent: "space-between", // Space between elements
                      }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Project & Task" : ""}
                    >
                      <i className="fa fa-project-diagram nav-icon"></i>
                      {!isCollapsed && " Project & Task"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.Projects ? "rotate-icon" : ""
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
                        <Link
                          to="/list_project"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_project",
                              "/add_project",
                              "/edit_project",
                              "/view_project",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          ref={(el) =>
                            (sidebarRefs.current["/list_project"] = el)
                          }
                          data-path="/list_project"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Project" : ""}
                        >
                          <i className="fa fa-briefcase nav-icon"></i>
                          {!isCollapsed && "  Project"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_task"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_task",
                              "/add_task",
                              "/edit_task",
                              "/view_task",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          ref={(el) => (sidebarRefs.current["/list_task"] = el)}
                          data-path="/list_task"
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("Marketing")}
                    ref={(el) => (sidebarRefs.current["/Marketing"] = el)}
                  >
                    <div 
                      style={{
                        display: "-webkit-box", // For older Safari versions
                        display: "-ms-flexbox", // For IE10
                        display: "flex", // Modern browsers
                        alignItems: "center", // Vertical alignment
                        justifyContent: "space-between", // Space between elements
                      }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Marketing" : ""}
                    >
                      <i className="fa fa-bullhorn nav-icon"></i>
                      {!isCollapsed && " Marketing"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.Marketing ? "rotate-icon" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                  <div
                    className={`collapse ${isOpen.Marketing ? "show" : ""}`}
                    id="collapse17"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item" style={{ position: "relative" }}>
                        <Link
                          to="#"
                          className="nav-link sidebar_link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.Socialmedia}
                          aria-controls="collapse30"
                          style={{
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                          onClick={() => toggleDropdown("Socialmedia")}
                          ref={(el) =>
                            (sidebarRefs.current["/Socialmedia"] = el)
                          }
                        >
                          <div
                            style={{
                              display: "-webkit-box", // For older Safari versions
                              display: "-ms-flexbox", // For IE10
                              display: "flex", // Modern browsers
                              alignItems: "center", // Vertical alignment
                              justifyContent: "space-between", // Space between elements
                            }}
                            data-bs-toggle="tooltip"
                            title={isCollapsed ? "Social Media" : ""}
                          >
                            <i className="fa fa-users nav-icon"></i>
                            {!isCollapsed && "  Social Media"}
                          </div>
                          <i
                            className={`fa fa-angle-right ${
                              isOpen.Socialmedia ? "rotate-icon" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </Link>
                        <div
                          className={`collapse ${
                            isOpen.Socialmedia ? "show" : ""
                          }`}
                          id="collapse30"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <Link
                                to="/list_facebook"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_facebook",
                                    "/add_facebook",
                                    "/view_facebook",
                                    "/edit_facebook",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                ref={(el) =>
                                  (sidebarRefs.current["/list_facebook"] = el)
                                }
                                data-path="/list_facebook"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Facebook" : ""}
                              >
                                <i className="fa fa-user-graduate nav-icon"></i>
                                {!isCollapsed && "  Facebook"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/list_instagram"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_instagram",
                                    "/add_instagram",
                                    "/edit_instagram",
                                    "/view_instagram",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                ref={(el) =>
                                  (sidebarRefs.current["/list_instagram"] = el)
                                }
                                data-path="/list_instagram"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Instagram" : ""}
                              >
                                <i className="fa fa-user-tie nav-icon"></i>
                                {!isCollapsed && " Instagram"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/list_linkedin"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/view_linkedin",
                                    "/edit_linkedin",
                                    "/list_linkedin",
                                    "/add_linkedin",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                ref={(el) =>
                                  (sidebarRefs.current["/list_linkedin"] = el)
                                }
                                data-path="/list_linkedin"
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
                          to="/list_campaign"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_campaign",
                              "/add_campaign",
                              "/edit_campaign",
                              "/view_campaign",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          ref={(el) =>
                            (sidebarRefs.current["/list_campaign"] = el)
                          }
                          data-path="/list_campaign"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? " Campaigns" : ""}
                        >
                          <i className="fa fa-bullhorn nav-icon"></i>
                          {!isCollapsed && " Campaigns"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_daily_task"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_daily_task",
                              "/add_daily_task",
                              "/edit_daily_task",
                              "/view_daily_task",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          ref={(el) =>
                            (sidebarRefs.current["/list_daily_task"] = el)
                          }
                          data-path="/list_daily_task"
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
                    to="/list_notifications"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_notifications",
                        "/add_notifications",
                        "/edit_notifications",
                        "/view_notifications",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    ref={(el) =>
                      (sidebarRefs.current["/list_notifications"] = el)
                    }
                    data-path="/list_notifications"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Notifications" : ""}
                  >
                    <i className="fa fa-bell nav-icon"></i>
                    {!isCollapsed && "  Notifications"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_meetings"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_meetings",
                        "/add_meetings",
                        "/edit_meetings",
                        "/view_meetings",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    ref={(el) => (sidebarRefs.current["/list_meetings"] = el)}
                    data-path="/list_meetings"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Meetings" : ""}
                  >
                    <i className="fa fa-video nav-icon"></i>
                    {!isCollapsed && " Meetings"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_training"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_training",
                        "/add_training",
                        "/edit_training",
                        "/view_training",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_training"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Training Material" : ""}
                    ref={(el) => (sidebarRefs.current["/list_training"] = el)}
                  >
                    <i className="fa fa-book nav-icon"></i>
                    {!isCollapsed && " Training Material"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_chat"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_chat",
                        "/add_chat",
                        "/edit_chat",
                        "/view_chat",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_chat"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Chat" : ""}
                    ref={(el) => (sidebarRefs.current["/list_chat"] = el)}
                  >
                    <i className="fa fa-comments nav-icon"></i>
                    {!isCollapsed && " Chat"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_email"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_email",
                        "/add_email",
                        "/edit_email",
                        "/view_email",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_email"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Email" : ""}
                    ref={(el) => (sidebarRefs.current["/list_email"] = el)}
                  >
                    <i className="fa fa-envelope nav-icon"></i>
                    {!isCollapsed && "  Email"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_promotions"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_promotions",
                        "/add_promotions",
                        "/edit_promotions",
                        "/view_promotions",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_promotions"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Promotions" : ""}
                    ref={(el) => (sidebarRefs.current["/list_promotions"] = el)}
                  >
                    <i className="fa fa-bullhorn nav-icon"></i>

                    {!isCollapsed && "  Promotions"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_events"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_events",
                        "/add_events",
                        "/edit_events",
                        "/view_events",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_events"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Events" : ""}
                    ref={(el) => (sidebarRefs.current["/list_events"] = el)}
                  >
                    <i className="fa fa-calendar nav-icon"></i>

                    {!isCollapsed && "  Events"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_blog"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_blog",
                        "/add_blog",
                        "/edit_blog",
                        "/view_blog",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_blog"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Blogs" : ""}
                    ref={(el) => (sidebarRefs.current["/list_blog"] = el)}
                  >
                    <i className="fa fa-blog nav-icon"></i>
                    {!isCollapsed && " Blogs"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_testimonials"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_testimonials",
                        "/add_testimonials",
                        "/edit_testimonials",
                        "/view_testimonials",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_testimonials"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? "Testimonials" : ""}
                    ref={(el) =>
                      (sidebarRefs.current["/list_testimonials"] = el)
                    }
                  >
                    <i className="fa fa-quote-right nav-icon"></i>
                    {!isCollapsed && " Testimonials"}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/list_admin"
                    className={`nav-link sidebar_link ${
                      [
                        "/list_admin",
                        "/add_Admin",
                        "/edit_Admin",
                        "/view_Admin",
                      ].includes(currentPath)
                        ? "active"
                        : ""
                    }`}
                    data-path="/list_admin"
                    data-bs-toggle="tooltip"
                    title={isCollapsed ? " Admin" : ""}
                    ref={(el) => (sidebarRefs.current["/list_admin"] = el)}
                  >
                    <i className="fa fa-user-shield nav-icon"></i>
                    {!isCollapsed && "   Admin"}
                  </Link>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                    to="#"
                    className="nav-link sidebar_link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.elt}
                    aria-controls="collapse4"
                    style={{
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("elt")}
                  >
                    <div 
                     style={{
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "ELT" : ""}
                    >
                      <i className="fa fa-book nav-icon"></i>

                      {!isCollapsed && " ELT"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.elt ? "rotate-icon" : ""
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
                        <Link
                          to="/list_bookings"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_bookings",
                              "/add_bookings",
                              "/edit_bookings",
                              "/view_bookings",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_bookings"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Booking" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_bookings"] = el)
                          }
                        >
                          <i className="fa fa-calendar-check nav-icon"></i>
                          {!isCollapsed && " Booking"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/list_class_schedule"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_class_schedule",
                              "/add_class_schedule",
                              "/edit_class_schedule",
                              "/view_class_schedule",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_class_schedule"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Class Schedule" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_class_schedule"] = el)
                          }
                        >
                          <i className="fa fa-calendar nav-icon"></i>
                          {!isCollapsed && "  Class Schedule"}
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("settings")}
                    role="button"
                    aria-label="Settings"
                  >
                    <div
                      style={{
                        display: "-webkit-box", // For older Safari versions
                        display: "-ms-flexbox", // For IE10
                        display: "flex", // Modern browsers
                        alignItems: "center", // Vertical alignment
                        justifyContent: "space-between", // Space between elements
                      }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Settings" : ""}
                    >
                      <i className="fa fa-cog fa-spin nav-icon"></i>

                      {!isCollapsed && "  Settings"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.settings ? "rotate-icon" : ""
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
                        <Link
                          to="#"
                          className="nav-link sidebar_link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.globalSettings}
                          aria-controls="collapse7"
                          style={{
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                          onClick={() => toggleDropdown("globalSettings")}
                          role="button"
                          aria-label="Global Settings"
                        >
                          <div
                           style={{
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                            data-bs-toggle="tooltip"
                            title={isCollapsed ? "Global Setting" : ""}
                          >
                            <i className="fa fa-globe nav-icon"></i>{" "}
                            {!isCollapsed && " Global Settings"}
                          </div>
                          <i
                            className={`fa fa-angle-right ${
                              isOpen.globalSettings ? "rotate-icon" : ""
                            }`}
                            aria-hidden="true"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </Link>
                        <div
                          className={`collapse ${
                            isOpen.globalSettings ? "show" : ""
                          }`}
                          id="collapse7"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_GlobalEmail",
                                    "/add_GlobalEmail",
                                    "/edit_GlobalEmail",
                                    "/view_GlobalEmail",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/list_GlobalEmail"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Email" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/list_GlobalEmail"] =
                                    el)
                                }
                              >
                                <i className="fa fa-envelope nav-icon"></i>{" "}
                                {!isCollapsed && " Email"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/global_settings"
                                className={`nav-link sidebar_link ${
                                  ["/global_settings"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/global_settings"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Country" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/global_settings"] = el)
                                }
                              >
                                <i className="fa fa-globe nav-icon"></i>{" "}
                                {!isCollapsed && " Country"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/currency_settings"
                                className={`nav-link sidebar_link ${
                                  ["/currency_settings"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/currency_settings"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Currency" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/currency_settings"] =
                                    el)
                                }
                              >
                                <i className="fa fa-money-bill-wave nav-icon"></i>{" "}
                                {!isCollapsed && " Currency"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/status"
                                className={`nav-link sidebar_link ${
                                  ["/status"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/status"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Status" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/status"] = el)
                                }
                              >
                                <i className="fa fa-clipboard-list nav-icon"></i>{" "}
                                {!isCollapsed && " Status"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/intake"
                                className={`nav-link sidebar_link ${
                                  ["/intake"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/intake"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Intake" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/intake"] = el)
                                }
                              >
                                <i className="fa fa-calendar-alt nav-icon"></i>{" "}
                                {!isCollapsed && " Intake"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/year_setting"
                                className={`nav-link sidebar_link ${
                                  ["/year_setting"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/year_setting"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Year" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/year_setting"] = el)
                                }
                              >
                                <i className="fa fa-calendar nav-icon"></i>{" "}
                                {!isCollapsed && " Year"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_GlobalPrivileges",
                                    "/add_GlobalPrivileges",
                                    "/edit_GlobalPrivileges",
                                    "/view_GlobalPrivileges",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/list_GlobalPrivileges"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Privileges" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current[
                                    "/list_GlobalPrivileges"
                                  ] = el)
                                }
                              >
                                <i className="fa fa-lock nav-icon"></i>{" "}
                                {!isCollapsed && " Privileges"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/global_settingsDashboard"
                                className={`nav-link sidebar_link ${
                                  ["/global_settingsDashboard"].includes(
                                    currentPath
                                  )
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/global_settingsDashboard"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Dashboard" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current[
                                    "/global_settingsDashboard"
                                  ] = el)
                                }
                              >
                                <i className="fa fa-tachometer-alt nav-icon"></i>{" "}
                                {!isCollapsed && " Dashboard "}
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
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                          onClick={() => toggleDropdown("modules")}
                          role="button"
                          aria-label="Module"
                        >
                          <div
                           style={{
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                            data-bs-toggle="tooltip"
                            title={isCollapsed ? "Module" : ""}
                          >
                            <i className="fa fa-cogs nav-icon"></i>{" "}
                            {!isCollapsed && " Module"}
                          </div>
                          <i
                            className={`fa fa-angle-right ${
                              isOpen.modules ? "rotate-icon" : ""
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
                              <Link
                                to="/university_settings"
                                className={`nav-link sidebar_link ${
                                  ["/university_settings"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/university_settings"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "University" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/university_settings"] =
                                    el)
                                }
                              >
                                <i className="fa fa-university nav-icon"></i>{" "}
                                {!isCollapsed && " University"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/course_type"
                                className={`nav-link sidebar_link ${
                                  ["/course_type"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/course_type"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Course Type" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/course_type"] = el)
                                }
                              >
                                <i className="fa fa-book nav-icon"></i>{" "}
                                {!isCollapsed && " Course Type"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="/application_status"
                                className={`nav-link sidebar_link ${
                                  ["/application_status"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/application_status"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Application Status" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/application_status"] =
                                    el)
                                }
                              >
                                <i className="fa fa-book nav-icon"></i>{" "}
                                {!isCollapsed && "  Application Status"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_ModuleEmail",
                                    "/add_ModuleEmail",
                                    "/edit_ModuleEmail",
                                    "/view_ModuleEmail",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/list_ModuleEmail"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Email" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/list_ModuleEmail"] =
                                    el)
                                }
                              >
                                <i className="fa fa-envelope nav-icon"></i>{" "}
                                {!isCollapsed && " Email"}
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link
                                to="/client_module"
                                className={`nav-link sidebar_link ${
                                  ["/client_module"].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/client_module"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Client" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/client_module"] = el)
                                }
                              >
                                <i className="fa fa-user nav-icon"></i>{" "}
                                {!isCollapsed && "  Client "}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_CustomModule",
                                    "/add_CustomModule",
                                    "/edit_CustomModule",
                                    "/view_CustomModule",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/list_CustomModule"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Custom Module" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current["/list_CustomModule"] =
                                    el)
                                }
                              >
                                <i className="fa fa-cogs nav-icon"></i>{" "}
                                {!isCollapsed && " Custom Module"}
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
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                          onClick={() => toggleDropdown("privileges")}
                          role="button"
                          aria-label="Privileges"
                        >
                          <div 
                           style={{
                            display: "-webkit-box", // For older Safari versions
                            display: "-ms-flexbox", // For IE10
                            display: "flex", // Modern browsers
                            alignItems: "center", // Vertical alignment
                            justifyContent: "space-between", // Space between elements
                          }}
                            data-bs-toggle="tooltip"
                            title={isCollapsed ? "Privileges" : ""}
                          >
                            <i className="fa fa-lock nav-icon"></i>{" "}
                            {!isCollapsed && "Privileges"}
                          </div>
                          <i
                            className={`fa fa-angle-right ${
                              isOpen.privileges ? "rotate-icon" : ""
                            }`}
                            aria-hidden="true"
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </Link>
                        <div
                          className={`collapse ${
                            isOpen.privileges ? "show" : ""
                          }`}
                          id="collapse9"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_GlobalPrivileges",
                                    "/add_GlobalPrivileges",
                                    "/edit_GlobalPrivileges",
                                    "/view_GlobalPrivileges",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/list_GlobalPrivileges"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Global Privileges" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current[
                                    "/list_GlobalPrivileges"
                                  ] = el)
                                }
                              >
                                <i className="fa fa-lock nav-icon"></i>{" "}
                                {!isCollapsed && " Global Privileges"}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                to="#"
                                className={`nav-link sidebar_link ${
                                  [
                                    "/list_ModulePrivileges",
                                    "/add_ModulePrivileges",
                                    "/edit_ModulePrivileges",
                                    "/view_ModulePrivileges",
                                  ].includes(currentPath)
                                    ? "active"
                                    : ""
                                }`}
                                data-path="/list_ModulePrivileges"
                                data-bs-toggle="tooltip"
                                title={isCollapsed ? "Module Privileges" : ""}
                                ref={(el) =>
                                  (sidebarRefs.current[
                                    "/list_ModulePrivileges"
                                  ] = el)
                                }
                              >
                                <i className="fa fa-lock nav-icon"></i>{" "}
                                {!isCollapsed && " Module Privileges"}
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
                      display: "-webkit-box", // For older Safari versions
                      display: "-ms-flexbox", // For IE10
                      display: "flex", // Modern browsers
                      alignItems: "center", // Vertical alignment
                      justifyContent: "space-between", // Space between elements
                    }}
                    onClick={() => toggleDropdown("Reports")}
                  >
                    <div
                      style={{
                        display: "-webkit-box", // For older Safari versions
                        display: "-ms-flexbox", // For IE10
                        display: "flex", // Modern browsers
                        alignItems: "center", // Vertical alignment
                        justifyContent: "space-between", // Space between elements
                      }}
                      data-bs-toggle="tooltip"
                      title={isCollapsed ? "Reports" : ""}
                    >
                      <i className="fa fa-file-alt nav-icon"></i>
                      {!isCollapsed && "   Reports"}
                    </div>
                    <i
                      className={`fa fa-angle-right ${
                        isOpen.Reports ? "rotate-icon" : ""
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
                        <Link
                          to="#"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_ReportEmployee",
                              "/add_ReportEmployee",
                              "/edit_ReportEmployee",
                              "/view_ReportEmployee",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_GlobalPrivileges"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Employee" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_GlobalPrivileges"] = el)
                          }
                        >
                          <i className="fa fa-user-tie nav-icon"></i>{" "}
                          {!isCollapsed && " Employee"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_ReportAgent",
                              "/add_ReportAgent",
                              "/edit_ReportAgent",
                              "/view_ReportAgent",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_GlobalPrivileges"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Agent" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_GlobalPrivileges"] = el)
                          }
                        >
                          <i className="fa fa-user-secret nav-icon"></i>{" "}
                          {!isCollapsed && " Agent "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_ReportStudents",
                              "/add_ReportStudents",
                              "/edit_ReportStudents",
                              "/view_ReportStudents",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_GlobalPrivileges"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Students" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_GlobalPrivileges"] = el)
                          }
                        >
                          <i className="fa fa-user-graduate nav-icon"></i>{" "}
                          {!isCollapsed && " Students"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_ReportBranch",
                              "/add_ReportBranch",
                              "/edit_ReportBranch",
                              "/view_ReportBranch",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_GlobalPrivileges"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Branch" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_GlobalPrivileges"] = el)
                          }
                        >
                          <i className="fa fa-sitemap nav-icon"></i>{" "}
                          {!isCollapsed && " Branch"}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="#"
                          className={`nav-link sidebar_link ${
                            [
                              "/list_ReportAdmin",
                              "/add_ReportAdmin",
                              "/edit_ReportAdmin",
                              "/view_ReportAdmin",
                            ].includes(currentPath)
                              ? "active"
                              : ""
                          }`}
                          data-path="/list_GlobalPrivileges"
                          data-bs-toggle="tooltip"
                          title={isCollapsed ? "Admin" : ""}
                          ref={(el) =>
                            (sidebarRefs.current["/list_GlobalPrivileges"] = el)
                          }
                        >
                          <i className="fa fa-user-shield nav-icon"></i>{" "}
                          {!isCollapsed && "Admin"}
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
