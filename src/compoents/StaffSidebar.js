import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";

export const StaffSidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [activeLink, setActiveLink] = useState(currentPath);
  
  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

//   const toggleDropdown = (key) => {
//     setIsOpen(prevState => ({ ...prevState, [key]: !prevState[key] }));
//   };

  const logout = () => {
    clearStorage(); // Assuming clearStorage is defined elsewhere
    toast.success("You have been logged out successfully.");
    navigate("/");
  };

  

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
        fontVariant: "all-small-caps",
        background:'#F5F5DC'

        }}
      >
       
          <div className="sidebar">
            <div className="user-panel  d-flex">
              <div className="info  ">
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
                    href="/StaffDashboard"
                    target="_self"
                    className={`nav-link ${[
                      "/StaffDashboard",
                     
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
                    href="/ViewProfile"
                    target="_self"
                    className={`nav-link ${[
                      "/ViewStaffProfile",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-graduation-cap nav-icon"></i>
                   Profile
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/ListStaffUniversity"
                    target="_self"
                    className={`nav-link ${[
                      "/ListStaffUniversity",
                      "/AddStaffUniversity",
                      "/EditStaffUniversity",
                      "/ViewStaffUniversity",
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
                    href="/ListStaffProgram"
                    target="_self"
                    className={`nav-link ${[
                      "/ListStaffProgram",
                      "/AddStaffProgram",
                      "/EditStaffProgram",
                      "/ViewStaffProgram",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-cogs nav-icon"></i>
                    Program
                  </a>
                </li>

                

                <li className="nav-item">
                  <a
                    href="/ListStaffApplication"
                    target="_self"
                    className={`nav-link ${[
                      "/ListStaffApplication",
                      "/AddStaffApplication",
                      "/EditStaffApplication",
                      "/ViewStaffApplication",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-archive nav-icon"></i>
                    Application
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/chat"
                    target="_self"
                    className={`nav-link ${[
                      "/chat",
                     
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-bell nav-icon"></i>
                    Chat
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/ListStaffNotifications"
                    target="_self"
                    className={`nav-link ${[
                      "/ListStaffNotifications",
                      "/AddStaffNotifications",
                      "/EditStaffNotifications",
                      "/ViewStaffNotifications",
                    ].includes(currentPath)
                      ? "active"
                      : ""
                      }`}
                  >
                    <i class="fa fa-bell nav-icon"></i>
                    Notifications
                  </a>
                </li>

              

                {/* <li className="nav-item" style={{ position: "relative" }}>
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
                </li> */}

                {/* <li className="nav-item" style={{ position: "relative" }}>
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
                </li> */}

                {/* <li className="nav-item" style={{ position: "relative" }}>
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
                </li> */}

              

                
                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item">
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
                </li> */}

                {/* <li className="nav-item" style={{ position: "relative" }}>
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
                </li> */}

                

                {/* <li className="nav-item" style={{ position: "relative" }}>
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
                </li> */}

                <li className="nav-item">
                  <a href="/"
                    className="nav-link"
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
       
      </aside>
    </>
  );
};
export default StaffSidebar