import React, {  useState } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState({
    enquiry: false,
    finance: false,
    users: false,
    elt: false,
    hrms: false,
    settings: false,
    globalSettings: false,
    modules: false,
    privileges: false,
    Projects: false,
    Reports: false,
    Marketing: false,
  });

  const toggleDropdown = (key) => {
    setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  };
  const logout = () => {
    clearStorage();
    toast.success("You have Student logged out successfully.");
  };
  return (
    <div>
      <aside
        className="main-sidebar elevation-10 d-none   d-lg-block"
        style={{
          backgroundColor: "white",
          color: "black",
          fontFamily: "helvetica",
          fontSize: "12px",
          position: "fixed",
          width: "200px",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div className="  shadow-lg   ">
          <div className="sidebar">
            <div className="user-panel mt-2  d-flex">
              <div className="info  mt-1">
                <Link
                to="/DashBoard"
                
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
                className="nav nav-pills nav-sidebar flex-column "
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item mt-1 ">
                  <Link
                  to="/DashBoard"
                   
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-tachometer-alt "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item  ">
                  <Link
                  to="/client"
                  
                    className="nav-link "
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-user "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* University Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Client
                    </p>
                  </Link>
                </li>
                <li className="nav-item  ">
                  <Link
                  to="/ListUniversity"
                   
                    className="nav-link "
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-university "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* University Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      University
                    </p>
                  </Link>
                </li>
                <li className="nav-item  ">
                  <Link
                  to="/ListCommission"
                  
                    className="nav-link "
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-credit-card "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* University Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Commission
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="/Programs"
                    href=""
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fa  fa-graduation-cap "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Program Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Program
                    </p>
                  </Link>
                </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                   to="#"
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.users}
                    aria-controls="collapse3"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("users")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="nav-icon fas fa-users"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        {" "}
                        Users
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.users ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
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
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Students
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListStaff"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          {" "}
                          Staffs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListAgent"
                          href=""
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Agents
                        </Link>
                      </li>
                     
                    </ul>
                  </div>
                </li>
                <li className="nav-item ">
                  <Link
                  to="/ListApplication"
                   
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-book "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Program Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Application
                    </p>
                  </Link>
                </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                  to="#"
                   
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.enquiry}
                    aria-controls="collapse1"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("enquiry")}
                  >
                    <div>
                      <i
                        className="nav-icon fas fa-envelope"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2"
                      >
                        {" "}
                        Enquiry
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.enquiry ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
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
                         
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Student{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListForexForm"
                         
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          FOREX{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListAccommodation"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Accommodation
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListFlightTicket"
                         
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Flight
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListLoanEnquiry"
                         
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Loan
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListBusinessEnquiry"
                         
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Business Enquiry
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListGeneralEnquiry"
                         
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          General Enquiry
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                  to="#"
                  
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.finance}
                    aria-controls="collapse2"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("finance")}
                  >
                    <div>
                      <i
                        className="nav-icon fa fa-flag"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2"
                      >
                        Finance
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.finance ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                  </Link>
                  <div
                    className={`collapse ${isOpen.finance ? "show" : ""}`}
                    id="collapse2"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Income{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Expense
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Raise Quotations
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListInvoice"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Raise Invoice
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Income Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                  to="#"
                    
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.hrms}
                    aria-controls="collapse5"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("hrms")}
                  >
                    <div>
                      <i
                        className="nav-icon fas fa-envelope"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2 text-uppercase"
                      >
                        HRMS
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.hrms ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                  </Link>
                  <div
                    className={`collapse ${isOpen.hrms ? "show" : ""}`}
                    id="collapse5"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Staffs
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Attendance
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Payroll
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Leave
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-uppercase fw-semibold"
                        >
                          KPI{" "}
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Policies
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Performance Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                  to="#"
                    
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.Projects}
                    aria-controls="collapse12"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Projects")}
                  >
                    <div>
                      <i
                        className="nav-icon fas fa-id-card"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2 "
                      >
                        Project & Task
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Projects ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                  </Link>
                  <div
                    className={`collapse ${isOpen.Projects ? "show" : ""}`}
                    id="collapse12"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Project
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Task
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                  to="#"
                    
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.Projects}
                    aria-controls="collapse17"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Marketing")}
                  >
                    <div>
                      <i
                        className="nav-icon fas fa-id-card"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <span
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2 "
                      >
                        Marketing
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Marketing? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                  </Link>
                  <div
                    className={`collapse ${isOpen.Marketing ? "show" : ""}`}
                    id="collapse17"
                  >
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <Link
                        to="/ListSocialMedia"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                         Social Media
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListCampaign"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                         Campaigns
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/ListDailyTask"
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                         Daily Task
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              
                <li className="nav-item ">
                  <Link
                  to="/ListNotifications"
                   
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-bell "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Notifications
                    </p>
                  </Link>
                </li>{" "}
                <li className="nav-item ">
                  <Link
                  to="/ListMeetings"
                    
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fa fa-flag "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Meetings
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="/ListTraining"
                    
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-flag "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Training Material{" "}
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="#"
                    
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-comment "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>Chat</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="#"
                    
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fa fa-envelope "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Email
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to=""
                    href="ListPromotions"
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-certificate "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Promotions
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="/ListEvents"
                   
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-calendar"
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Events
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="/ListBlog"
                    
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fa fa-rss "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "11px", fontWeight: "bold" }}>
                      Blogs
                    </p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link
                  to="/ListTestimonials"
                   
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-cogs "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    {/* Admin Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Testimonials
                    </p>
                  </Link>
                </li>
            
                <li className="nav-item  ">
                  <Link
                  to=""
                    href="/AdminList"
                    className="nav-link"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fas fa-user "
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Admin
                    </p>
                  </Link>
                </li>
                <li className="nav-item" style={{ position: 'relative' }}>
        <Link
        to=""
          
          className="nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.elt}
          aria-controls="collapse4"
          style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          onClick={() => toggleDropdown('elt')}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="nav-icon fas fa-envelope" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
            <p style={{ fontSize: "12px", fontWeight: "bold",  }} className='pe-2 text-uppercase'> ELT</p>
          </div>
          <i className={`fa fa-angle-right ${isOpen.elt ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
        </Link>
        <div className={`collapse ${isOpen.elt ? 'show' : ''}`} id="collapse4">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className='nav-item'><Link
            to=""  className="nav-link text-capitalize fw-semibold">Booking</Link></li>
            <li className='nav-item'><Link
            to=""  className="nav-link  text-capitalize fw-semibold">Class Schedule</Link></li>
          </ul>
        </div>
      </li>
                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                  to="#"
                    
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.settings}
                    aria-controls="collapse6"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("settings")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="nav-icon fa fa-cog fa-spin"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <p
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2"
                      >
                        Settings
                      </p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.settings ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
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
                          
                          className="nav-link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.globalSettings}
                          aria-controls="collapse7"
                          style={{
                            color: "#231f20",
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("globalSettings")}
                        >
                          <div>
                            <span
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                              className="pe-2"
                            >
                              Global Settings
                            </span>
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.globalSettings ? "rotate-icon" : ""
                              }`}
                            aria-hidden="true"
                            style={{
                              color: "#231f20",
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
                              <Link
                              to="#"
                              
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Email{" "}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="/GlobalSettings"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Country 
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="/CurrencySettings"
                               
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Currency
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="/Status"
                                
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Status{" "}
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="/Intake"
                               
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Intake
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="/YearSetting"
                              
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Year
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Privileges
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Dashboard
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.modules}
                          aria-controls="collapse8"
                          style={{
                            color: "#231f20",
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("modules")}
                        >
                          <div>
                            <span
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                              className="pe-2"
                            >
                              Module
                            </span>
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.modules ? "rotate-icon" : ""
                              }`}
                            aria-hidden="true"
                            style={{
                              color: "#231f20",
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
                                
                                className="nav-link text-capitalize fw-semibold"
                              >
                                University
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="/ProgramModule"
                               
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Email
                              </Link>
                            </li>
                          
                            <li className="nav-item">
                              <Link
                              to="/ClientModule"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Status
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                               Intake
                              </Link>
                            </li>
                          
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                Custom Module
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.privileges}
                          aria-controls="collapse9"
                          style={{
                            color: "#231f20",
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("privileges")}
                        >
                          <div>
                            <span
                              style={{ fontSize: "12px", fontWeight: "bold" }}
                              className="pe-2"
                            >
                              Privileges
                            </span>
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.privileges ? "rotate-icon" : ""
                              }`}
                            aria-hidden="true"
                            style={{
                              color: "#231f20",
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
                              <Link
                              to="#"
                                
                                className="nav-link text-capitalize fw-semibold"
                              >
                                program
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-uppercase fw-semibold"
                              >
                                hrm
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                attendance
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                              to="#"
                                
                                className="nav-link  text-capitalize fw-semibold"
                              >
                                payroll
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
                    
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.Reports}
                    aria-controls="collapse4"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Reports")}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i
                        className="nav-icon fas fa-envelope"
                        style={{
                          color: "#fe5722",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      <p
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="pe-2 "
                      >
                        Reports
                      </p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Reports ? "rotate-icon" : ""
                        }`}
                      aria-hidden="true"
                      style={{
                        color: "#231f20",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
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
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Employee
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Agent
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Students
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="#"
                          
                          className="nav-link  text-capitalize fw-semibold"
                        >
                          Branch
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                        to="/AdminList"
                        
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Admin
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item ">
                  <Link
                    className="nav-link"
                    to="/"
                    style={{
                      color: "#231f20",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      style={{
                        color: "#fe5722",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    />
                    <p
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                      onClick={logout}
                    >
                      {" "}
                      Log Out{" "}
                    </p>
                  </Link>
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
