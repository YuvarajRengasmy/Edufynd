import React, { useState } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
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

  const toggleDropdown = (key) => {
    setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  };
  const logout = () => {
    clearStorage();
    toast.success("You have Student logged out successfully.");
  };
  return (
    <div style={{fontSize:'12px'}}>
      <aside
        className="main-sidebar elevation-10 d-none   d-lg-block"
        style={{
         
         
         
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
                <a href="/DashBoard"
                  

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
                  <a href="/DashBoard"
                   
                    
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-tachometer-alt" style={{fontSize:'12px'}} />
                    <p className="nav-text">Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/client"
                   
                    
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-user" style={{fontSize:'12px'}} />
                    <p className="nav-text">Client</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListUniversity"
                   
                    
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-university" style={{fontSize:'12px'}} />
                    <p className="nav-text">University</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListCommission"
                   
                    
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-credit-card" style={{fontSize:'12px'}} />
                    <p className="nav-text">Commission</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/Programs"
                   
                    
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-graduation-cap" style={{fontSize:'12px'}} />
                    <p className="nav-text">Program</p>
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
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
                      <i className="nav-icon fas fa-users" style={{fontSize:'12px'}}/>
                      <p
                       
                      >
                        Users
                      </p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.users ? "rotate-icon" : ""}`}
                      aria-hidden="true"
                    />
                  </a>
                  <div className={`collapse ${isOpen.users ? "show" : ""}`} id="collapse3">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="/ListStudent"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Students
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListStaff"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListAgent"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Agents
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <a href="/ListApplication"
                   
                    
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-book" style={{fontSize:'12px'}} />
                    <p className="nav-text">Application</p>
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
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
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'12px'}} />
                      <p>Enquiry</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.enquiry ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </a>
                  <div className={`collapse ${isOpen.enquiry ? "show" : ""}`} id="collapse1">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="/ListStudentForm"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Student
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListForexForm"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          FOREX
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListAccommodation"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Accommodation
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListFlightTicket"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Flight
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListLoanEnquiry"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Loan
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListBusinessEnquiry"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Business Enquiry
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListGeneralEnquiry"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          General Enquiry
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
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
                      <i className="nav-icon fa fa-flag"  style={{fontSize:'12px'}}/>
                      <p>Finance</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.finance ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </a>
                  <div className={`collapse ${isOpen.finance ? "show" : ""}`} id="collapse2">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Income
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Expense
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Raise Quotations
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListInvoice"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Raise Invoice
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Income Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
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
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'12px'}} />
                      <p>HRMS</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.hrms ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </a>
                  <div className={`collapse ${isOpen.hrms ? "show" : ""}`} id="collapse5">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Attendance
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Payroll
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Leave
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-uppercase fw-semibold"
                        >
                          KPI
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Policies
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Performance Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
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
                      <i className="nav-icon fas fa-id-card" style={{fontSize:'12px'}} />
                      <p>Project & Task</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.Projects ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </a>
                  <div className={`collapse ${isOpen.Projects ? "show" : ""}`} id="collapse12">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Project
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Task
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
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
                      <i className="nav-icon fas fa-id-card" style={{fontSize:'12px'}}/>
                      <p>Marketing</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.Marketing ? "rotate-icon" : ""}`} aria-hidden="true" />
                  </a>
                  <div className={`collapse ${isOpen.Marketing ? "show" : ""}`} id="collapse17">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="/ListSocialMedia"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Social Media
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListCampaign"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Campaigns
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListDailyTask"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Daily Task
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-item">
                  <a href="/ListNotifications"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-bell"  style={{fontSize:'12px'}}/>
                    <p>Notifications</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListMeetings"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-flag" style={{fontSize:'12px'}} />
                    <p>Meetings</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListTraining"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-flag"  style={{fontSize:'12px'}}/>
                    <p>Training Material</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="#"
                   
                    
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-comment" style={{fontSize:'12px'}} />
                    <p>Chat</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#"
                   
                    
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-envelope" style={{fontSize:'12px'}} />
                    <p>Email</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListPromotions"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-certificate" style={{fontSize:'12px'}} />
                    <p>Promotions</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListEvents"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-calendar" style={{fontSize:'12px'}} />
                    <p>Events</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListBlog"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fa fa-rss"  style={{fontSize:'12px'}}/>
                    <p>Blogs</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListTestimonials"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-cogs" style={{fontSize:'12px'}} />
                    <p>Testimonials</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/AdminList"
                   
                   
                    className="nav-link"
                  >
                    <i className="nav-icon fas fa-user" style={{fontSize:'12px'}} />
                    <p>Admin</p>
                  </a>
                </li>


                <li className="nav-item" style={{ position: 'relative' }}>
                  <a href="#"
                   
                    
                    className="nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded={isOpen.elt}
                    aria-controls="collapse4"
                    style={{  fontSize: "12px",  display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    onClick={() => toggleDropdown('elt')}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'12px'}} />
                      <p>ELT</p>
                    </div>
                    <i className={`fa fa-angle-right ${isOpen.elt ? 'rotate-icon' : ''}`} aria-hidden="true" style={{  fontSize: "12px", fontWeight: "bold" }} />
                  </a>
                  <div className={`collapse ${isOpen.elt ? 'show' : ''}`} id="collapse4">
                    <ul className='nav d-flex flex-column border-0 ps-4'>
                      <li className='nav-item'>
                        <a href="#"
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Booking
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a href="#"
                      
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Class Schedule
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                   
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
                      <i className="nav-icon fa fa-cog fa-spin" style={{fontSize:'12px'}} />
                      <p className="pe-2">Settings</p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.settings ? "rotate-icon" : ""}`}
                      aria-hidden="true"
                    />
                  </a>
                  <div className={`collapse ${isOpen.settings ? "show" : ""}`} id="collapse6">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      {/* Global Settings */}
                      <li className="nav-item">
                        <a href="#"
                          
                         
                          className="nav-link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.globalSettings}
                          aria-controls="collapse7"
                          style={{
                            
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("globalSettings")}
                        >
                          <div>
                            <p className="pe-2">Global Settings</p>
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
                          className={`collapse ${isOpen.globalSettings ? "show" : ""}`}
                          id="collapse7"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Email
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/GlobalSettings"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Country
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/CurrencySettings"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Currency
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/Status"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Status
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/Intake"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Intake
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/YearSetting"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Year
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Privileges
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Dashboard
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Module */}
                      <li className="nav-item">
                        <a href="#"
                          
                         
                          className="nav-link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.modules}
                          aria-controls="collapse8"
                          style={{
                          
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("modules")}
                        >
                          <div>
                            <p className="pe-2">Module</p>
                          </div>
                          <i
                            className={`fa fa-angle-right ${isOpen.modules ? "rotate-icon" : ""}`}
                            aria-hidden="true"
                            style={{
                            
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </a>
                        <div className={`collapse ${isOpen.modules ? "show" : ""}`} id="collapse8">
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <a href="/UniversitySettings"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                University
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/CourseType"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Course Type
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Email
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                              
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Intake
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/ClientModule"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Client
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Custom Module
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      {/* Privileges */}
                      <li className="nav-item">
                        <a href="#"
                          
                         
                          className="nav-link"
                          data-bs-toggle="collapse"
                          aria-expanded={isOpen.privileges}
                          aria-controls="collapse9"
                          style={{
                          
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          onClick={() => toggleDropdown("privileges")}
                        >
                          <div>
                            <p className="pe-2">Privileges</p>
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
                          className={`collapse ${isOpen.privileges ? "show" : ""}`}
                          id="collapse9"
                        >
                          <ul className="nav d-flex flex-column border-0 ps-4">
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Program
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                               
                                className="nav-link text-uppercase fw-semibold"
                              >
                                HRM
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                                
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Attendance
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                               
                                
                                className="nav-link text-capitalize fw-semibold"
                              >
                                Payroll
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                   
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
                      <i className="nav-icon fas fa-envelope" style={{fontSize:'12px'}} />
                      <p className="pe-2">Reports</p>
                    </div>
                    <i
                      className={`fa fa-angle-right ${isOpen.Reports ? "rotate-icon" : ""}`}
                      aria-hidden="true"
                    />
                  </a>
                  <div className={`collapse ${isOpen.Reports ? "show" : ""}`} id="collapse4">
                    <ul className="nav d-flex flex-column border-0 ps-4">
                      <li className="nav-item">
                        <a href="#"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Employee
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Agent
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                          
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Students
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                        
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Branch
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                         
                         
                          className="nav-link text-capitalize fw-semibold"
                        >
                          Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item ">
                  <a href="/"
                   

                    className="nav-link"
                  

                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      style={{fontSize:'12px'}}
                    />
                    <p

                      onClick={logout}
                    >
                      {" "}
                      Log Out{" "}
                    </p>
                  </a>
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
