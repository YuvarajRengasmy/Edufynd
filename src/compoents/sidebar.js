import React, { useState } from "react";
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg";
import "./Sidebar.css";


const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };
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
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <div style={{fontSize:'12px',fontWeight:'bold',fontFamily: 'Plus Jakarta Sans', }}>
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
                  <a href="/DashBoard"
                    target="_self"
                   
                    
                   
                   className={`nav-link ${activeLink === '/DashBoard' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/DashBoard')}
                  >
                    <i className="nav-icon fas fa-tachometer-alt" style={{fontSize:'12px'}} />
                    <p className="nav-text">Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/client"
                     target="_self"
                    
                   
                     className={`nav-link ${activeLink === '/client' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/client')}
                  >
                    <i className="nav-icon fas fa-user" style={{fontSize:'12px'}} />
                    <p className="nav-text">Client</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListUniversity"
                     target="_self"
                    
                   
                     className={`nav-link ${activeLink === '/ListUniversity' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListUniversity')}
                  >
                    <i className="nav-icon fas fa-university" style={{fontSize:'12px'}} />
                    <p className="nav-text">University</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListCommission"
                    target="_self"
                   
                    
                   
                     className={`nav-link ${activeLink === '/ListCommission' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListCommission')}
                  >
                    <i className="nav-icon fas fa-credit-card" style={{fontSize:'12px'}} />
                    <p className="nav-text">Commission</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/Programs"
                     target="_self"
                    
                   
                   className={`nav-link ${activeLink === '/Programs' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/Programs')}
                  >
                    <i className="nav-icon fa fa-graduation-cap" style={{fontSize:'12px'}} />
                    <p className="nav-text">Program</p>
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                     className='nav-link '
                 
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
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListStudent' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListStudent')}
                        >
                          Students
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListStaff"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListStaff' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListStaff')}
                        >
                          Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListAgent"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListAgent' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListAgent')}
                        >
                          Agents
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <a href="/ListApplication"
                    target="_self"
                   
                    
                   
                     className={`nav-link ${activeLink === '/ListApplication' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListApplication')}
                  >
                    <i className="nav-icon fas fa-book" style={{fontSize:'12px'}} />
                    <p className="nav-text">Application</p>
                  </a>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                     className='nav-link'
                 
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
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '/ListStudentForm' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListStudentForm')}
                        >
                          Student
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListForexForm"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListForexForm' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListForexForm')}
                        >
                          FOREX
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListAccommodation"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListAccommodation' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListAccommodation')}
                        >
                          Accommodation
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListFlightTicket"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListFlightTicket' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListFlightTicket')}
                        >
                          Flight
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListLoanEnquiry"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListLoanEnquiry' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListLoanEnquiry')}
                        >
                          Loan
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListBusinessEnquiry"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListBusinessEnquiry' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListBusinessEnquiry')}
                        >
                          Business Enquiry
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListGeneralEnquiry"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListGeneralEnquiry' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListGeneralEnquiry')}
                        >
                          General Enquiry
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                     className='nav-link '
                
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
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Income
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                           target="_self"
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Expense
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Raise Quotations
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListInvoice"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListInvoice' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListInvoice')}
                        >
                          Raise Invoice
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                           target="_self"
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Income Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                     className='nav-link '
                 
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
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Staffs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Attendance
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Payroll
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Leave
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                          className="nav-link text-uppercase fw-semibold"
                        >
                          KPI
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Policies
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                           target="_self"
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Performance Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                     className='nav-link '
                  
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
                           target="_self"
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Project
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Task
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                     className='nav-link '
                  
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
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/')}
                        >
                          Social Media
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListCampaign"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListCampaign' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListCampaign')}
                        >
                          Campaigns
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="/ListDailyTask"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '/ListDailyTask' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListDailyTask')}
                        >
                          Daily Task
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-item">
                  <a href="/ListNotifications"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListNotifications' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListNotifications')}
                  >
                    <i className="nav-icon fas fa-bell"  style={{fontSize:'12px'}}/>
                    <p>Notifications</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListMeetings"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListMeetings' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListMeetings')}
                  >
                    <i className="nav-icon fa fa-flag" style={{fontSize:'12px'}} />
                    <p>Meetings</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="/ListTraining"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListTraining' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListTraining')}
                  >
                    <i className="nav-icon fas fa-flag"  style={{fontSize:'12px'}}/>
                    <p>Training Material</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="#"
                    target="_self"
                   
                    
                     className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                  >
                    <i className="nav-icon fas fa-comment" style={{fontSize:'12px'}} />
                    <p>Chat</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#"
                    target="_self"
                   
                    
                     className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                  >
                    <i className="nav-icon fa fa-envelope" style={{fontSize:'12px'}} />
                    <p>Email</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListPromotions"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListPromotions' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListPromotions')}
                  >
                    <i className="nav-icon fas fa-certificate" style={{fontSize:'12px'}} />
                    <p>Promotions</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListEvents"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListEvents' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListEvents')}
                  >
                    <i className="nav-icon fas fa-calendar" style={{fontSize:'12px'}} />
                    <p>Events</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListBlog"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListBlog' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListBlog')}
                  >
                    <i className="nav-icon fa fa-rss"  style={{fontSize:'12px'}}/>
                    <p>Blogs</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/ListTestimonials"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/ListTestimonials' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ListTestimonials')}
                  >
                    <i className="nav-icon fas fa-cogs" style={{fontSize:'12px'}} />
                    <p>Testimonials</p>
                  </a>
                </li>


                <li className="nav-item">
                  <a href="/AdminList"
                    target="_self"
                   
                   
                     className={`nav-link ${activeLink === '/AdminList' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/AdminList')}
                  >
                    <i className="nav-icon fas fa-user" style={{fontSize:'12px'}} />
                    <p>Admin</p>
                  </a>
                </li>


                <li className="nav-item" style={{ position: 'relative' }}>
                  <a href="#"
                   
                    
                     className='nav-link'
                
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
                          target="_self"
                         
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Booking
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a href="#"
                          target="_self"
                      
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Class Schedule
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>


                <li className="nav-item" style={{ position: "relative" }}>
                  <a href="#"
                    
                   
                     className='nav-link '
                  
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
                      <p >Settings</p>
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
                          
                         
                           className='nav-link '
                
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
                            <p >Global Settings</p>
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
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                              >
                                Email
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/GlobalSettings"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/GlobalSettings' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/GlobalSettings')}
                              >
                                Country
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/CurrencySettings"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/CurrencySettings' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/CurrencySettings')}
                              >
                                Currency
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/Status"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/Status' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/Status')}
                              >
                                Status
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/Intake"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/Intake' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/Intake')}
                              >
                                Intake
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/YearSetting"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/YearSetting' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/YearSetting')}
                              >
                                Year
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                              >
                                Privileges
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
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
                          
                         
                           className='nav-link '
              
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
                            <p >Module</p>
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
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/UniversitySettings' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/UniversitySettings')}
                              >
                                University
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/CourseType"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/CourseType' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/CourseType')}
                              >
                                Course Type
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                              >
                                Email
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                target="_self"
                               
                              
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                              >
                                Intake
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="/ClientModule"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '/ClientModule' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('/ClientModule')}
                              >
                                Client
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
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
                          
                         
                           className='nav-link '
                
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
                            <p >Privileges</p>
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
                                target="_self"
                               
                               
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                              >
                                Program
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                 target="_self"
                               
                               className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                               onClick={() => handleSetActiveLink('#')}
                              >
                                HRM
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                target="_self"
                               
                                
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                              >
                                Attendance
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="#"
                                 target="_self"
                                
                                 className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
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
                    
                   
                     className='nav-link '
                 
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
                      <p >Reports</p>
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
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Employee
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Agent
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                           target="_self"
                          
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Students
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                        
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Branch
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#"
                          target="_self"
                         
                         
                           className={`nav-link ${activeLink === '#' ? 'active' : ''}`}
                   onClick={() => handleSetActiveLink('#')}
                        >
                          Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
        <div 
          className="nav-link"
          onClick={logout}
          style={{ cursor: 'pointer' }}
        >
          <i
            className="nav-icon fa fa-flag "
            aria-hidden="true"
            style={{ fontSize: '12px' }}
          />
          <p>Log Out</p>
        </div>
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
