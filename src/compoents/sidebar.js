import React, { useState } from "react";
import { toast } from "react-toastify";
 import { clearStorage } from "../Utils/storage";
import { useNavigate } from 'react-router-dom';
// import { clearToken } from '../../Utils/storage';
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

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
  const navigate = useNavigate();
  const toggleDropdown = (key) => {
    setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  };
  // const logout = () => {
  //   clearStorage();
  //   toast.success("You have Student logged out successfully.");
  // };

  const handleLogout = () => {
    clearStorage();
    toast.success("You have Student logged out successfully.");
    navigate('/');
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
          width: "250px",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        <div className="  shadow-lg   ">
          <div className="sidebar">
            <div className="user-panel mt-2  d-flex">
              <div className="info  mt-1">
                <NavLink activeClassName="active"
                  to="/DashBoard"

                  className="brand-text font-weight-light text-decoration-none"
                >
                  <img
                    src={Edufynd}
                    alt="logo"
                    className="img-fluid "
                    style={{ width: "100%" }}
                  />
                </NavLink>
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
                  <NavLink
                    to="/DashBoard"
                    exact
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-tachometer-alt" style={{fontSize:'13px'}} />
                    <p className="nav-text">Dashboard</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/client"
                    exact
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-user" style={{fontSize:'13px'}} />
                    <p className="nav-text">Client</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/ListUniversity"
                    exact
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-university" style={{fontSize:'13px'}} />
                    <p className="nav-text">University</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/ListCommission"
                    exact
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-credit-card" style={{fontSize:'13px'}} />
                    <p className="nav-text">Commission</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/Programs"
                    exact
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-graduation-cap" style={{fontSize:'13px'}} />
                    <p className="nav-text">Program</p>
                  </NavLink>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                    to="#"
                    className="nav-link"
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
                      <i className="nav-icon fas fa-users" style={{fontSize:'13px'}}/>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}
                      >
                        Users
                      </span>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.users ? "rotate-icon" : ""}`}
                      aria-hidden="true"
                    />
                  </Link>
                  <div className={`collapse ${isOpen.users ? "show" : ""}`} id="collapse3">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListStudent"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Students
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListStaff"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Staffs
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListAgent"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Agents
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/ListApplication"
                    exact
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-book" style={{fontSize:'13px'}} />
                    <p className="nav-text">Application</p>
                  </NavLink>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                    to="#"
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
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'13px'}} />
                      <span    style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}>Enquiry</span>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.enquiry ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </Link>
                  <div className={`collapse ${isOpen.enquiry ? "show" : ""}`} id="collapse1">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListStudentForm"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Student
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListForexForm"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          FOREX
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListAccommodation"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Accommodation
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListFlightTicket"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Flight
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListLoanEnquiry"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Loan
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListBusinessEnquiry"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Business Enquiry
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListGeneralEnquiry"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          General Enquiry
                        </NavLink>
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("finance")}
                  >
                    <div>
                      <i className="nav-icon fa fa-flag"  style={{fontSize:'13px'}}/>
                      <span style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}>Finance</span>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.finance ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </Link>
                  <div className={`collapse ${isOpen.finance ? "show" : ""}`} id="collapse2">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Income
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Expense
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Raise Quotations
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListInvoice"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Raise Invoice
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Income Report
                        </NavLink>
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("hrms")}
                  >
                    <div>
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'13px'}} />
                      <span style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}>HRMS</span>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.hrms ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </Link>
                  <div className={`collapse ${isOpen.hrms ? "show" : ""}`} id="collapse5">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Staffs
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Attendance
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Payroll
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Leave
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-uppercase fw-semibold"
                        >
                          KPI
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Policies
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Performance Report
                        </NavLink>
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => toggleDropdown("Projects")}
                  >
                    <div>
                      <i className="nav-icon fas fa-id-card" style={{fontSize:'13px'}} />
                      <span style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}>Project & Task</span>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.Projects ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </Link>
                  <div className={`collapse ${isOpen.Projects ? "show" : ""}`} id="collapse12">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Project
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="#"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Task
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                    to="#"
                    className="nav-link"
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
                      <i className="nav-icon fas fa-id-card" style={{fontSize:'13px'}}/>
                      <span style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginLeft: "5px",
                        }}>Marketing</span>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.Marketing ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </Link>
                  <div className={`collapse ${isOpen.Marketing ? "show" : ""}`} id="collapse17">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListSocialMedia"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Social Media
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListCampaign"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Campaigns
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListDailyTask"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Daily Task
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-item">
                  <NavLink
                    to="/ListNotifications"
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-bell"  style={{fontSize:'13px'}}/>
                    <p>Notifications</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/ListMeetings"
                    activeClassName="active"
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-flag" style={{fontSize:'13px'}} />
                    <p>Meetings</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListTraining"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-flag"  style={{fontSize:'13px'}}/>
                    <p>Training Material</p>
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListChat"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-comment" style={{fontSize:'13px'}} />
                    <p>Chat</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListEmail"
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-envelope" style={{fontSize:'13px'}} />
                    <p>Email</p>
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListPromotions"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-certificate" style={{fontSize:'13px'}} />
                    <p>Promotions</p>
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListEvents"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-calendar" style={{fontSize:'13px'}} />
                    <p>Events</p>
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListBlog"
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-rss"  style={{fontSize:'13px'}}/>
                    <p style={{ fontSize: "11px", fontWeight: "bold" }}>Blogs</p>
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/ListTestimonials"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-cogs" style={{fontSize:'13px'}} />
                    <p>Testimonials</p>
                  </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink
                    activeClassName="active"
                    to="/AdminList"
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-user" style={{fontSize:'13px'}} />
                    <p>Admin</p>
                  </NavLink>
                </li>


                <li className="nav-item" style={{ position: 'relative' }}>
                  <Link
                    activeClassName="active"
                    to="#"
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.elt}
                    aria-controls="collapse4"
                    style={{ color: "#231f20", fontSize: "12px",  display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    onClick={() => toggleDropdown('elt')}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'13px'}} />
                      <p className='pe-2 text-uppercase'>ELT</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.elt ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                  </Link>
                  <div className={`collapse ${isOpen.elt ? 'show' : ''}`} id="collapse4">
                    <ul className='nav d-flex flex-column border-0 ps-4'>
                      <li className='nav-item'>
                        <NavLink
                          to="ListBookings"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Booking
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink
                          to="/ListClassSchedule"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Class Schedule
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-item" style={{ position: "relative" }}>
                  <Link
                    to="#"
                    activeClassName="active"
                    className="nav-link"
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
                      <i className="nav-icon fa fa-cog fa-spin" style={{fontSize:'13px'}} />
                      <p className="pe-2">Settings</p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.settings ? "rotate-icon" : ""}`}
                      aria-hidden="true"
                    />
                  </Link>
                  <div className={`collapse ${isOpen.settings ? "show" : ""}`} id="collapse6">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      {/* Global Settings */}
                      <li className="nav-item">
                        <Link
                          to="#"
                          activeClassName="active"
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
                            <span className="pe-2">Global Settings</span>
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
                          className={`collapse ${isOpen.globalSettings ? "show" : ""}`}
                          id="collapse7"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/listemail"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Email
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/GlobalSettings"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Country
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/CurrencySettings"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Currency
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/Status"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Status
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/Intake"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Intake
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/YearSetting"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Year
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="ListPrivilages"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Privileges
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/listDashboard"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Dashboard
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Module */}
                      <li className="nav-item">
                        <Link
                          to="#"
                          activeClassName="active"
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
                            <span className="pe-2">Module</span>
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.modules ? "rotate-icon" : ""}`}
                            aria-hidden="true"
                            style={{
                              color: "#231f20",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </Link>
                        <div className={`collapse ${isOpen.modules ? "show" : ""}`} id="collapse8">
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/UniversitySettings"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                University
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/CourseType"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Course Type
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="emailmodule"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Email
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="intakemodule"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Intake
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/ClientModule"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Client
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="/custommodule"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Custom Module
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Privileges */}
                      <li className="nav-item">
                        <Link
                          to="#"
                          activeClassName="active"
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
                            <span className="pe-2">Privileges</span>
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
                          className={`collapse ${isOpen.privileges ? "show" : ""}`}
                          id="collapse9"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="privilegesprogram"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Program
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="privilegeshrm"
                                className="nav-link text-uppercase fw-semibold"
                              >
                                HRM
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="privilegesattendance"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Attendance
                              </NavLink>
                            </li>
                            <li className="nav-item">
                              <NavLink
                                activeClassName="active"
                                to="privilegespayroll"
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Payroll
                              </NavLink>
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
                    activeClassName="active"
                    className="nav-link"
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
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'13px'}} />
                      <p className="pe-2">Reports</p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Reports ? "rotate-icon" : ""}`}
                      aria-hidden="true"
                    />
                  </Link>
                  <div className={`collapse ${isOpen.Reports ? "show" : ""}`} id="collapse4">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListEmployees"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Employee
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListAgent"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Agent
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListStudents"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Students
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="/ListBranch"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Branch
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="active"
                          to="//Listadmin"
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Admin
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* <li className="nav-item ">
                  <NavLink
                    activeClassName="active"

                    className="nav-link"
                    to="/"

                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      style={{fontSize:'13px'}}
                    />
                    <p

onClick={handleLogout}
                    >
                      {" "}
                      Log Out{" "}
                    </p>
                  </NavLink>
                </li> */}
                 <button onClick={handleLogout}>Logout</button>
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
