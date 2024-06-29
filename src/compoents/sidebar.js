import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearStorage } from '../Utils/storage';
import { Link } from 'react-router-dom';
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg"
import './Sidebar.css'

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
  });

  const toggleDropdown = (key) => {
    setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  };
  const logout = () => {
    clearStorage();
    toast.success('You have Student logged out successfully.')
  }
  return (
    <div>
      <aside className="main-sidebar elevation-10 d-none d-lg-block" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'helvetica', fontSize: '12px', position: 'fixed', width: "200px", height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }} >
        <div className="  shadow-lg rounded  ">
        
        <div className="sidebar">

          <div className="user-panel mt-2  d-flex">

            <div className="info  mt-1">
              <a href="/DashBoard" className="brand-text font-weight-light text-decoration-none">
                <img src={Edufynd} alt="logo" className='img-fluid ' style={{ width: "100%" }} />
              </a>

            </div>
          </div>
          <nav>
            <ul className="nav nav-pills nav-sidebar flex-column " data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item mt-1 ">
                <a href="/" className="nav-link" style={{ color: "#231f20",  fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-tachometer-alt " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
                   <p style={{ fontSize: "12px", fontWeight: "bold", }} >Dashboard</p>
                </a>
              </li>

              <li className="nav-item  " >
                <a href="/ListUniversity" className="nav-link " style={{color: "#231f20", fontSize: "12px", fontWeight: "bold", }}>
                  <i className="nav-icon fas fa-university " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* University Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold" }} >University</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="/Programs" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa  fa-graduation-cap " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold"}}>Program</p>
                </a>
              </li>
              <li className="nav-item  ">
                <a href="/StudentDashBoard" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold" }} >Student</p>
                </a>
              </li>
              <li className="nav-item  ">
                <a href="/AdminList" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold" }} >Admin</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="/ListApplication" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-book " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold" }} >Application</p>
                </a>
              </li>
              <li className="nav-item" style={{ position: 'relative' }}>
        <a
          href="#"
          className="nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.enquiry}
          aria-controls="collapse1"
          style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          onClick={() => toggleDropdown('enquiry')}
        >
          <div>
            <i className="nav-icon fas fa-envelope" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
            <span style={{ fontSize: "12px", fontWeight: "bold"}} className='pe-2'> Enquiry</span>
          </div>
          <i className={`fa fa-angle-right ${isOpen.enquiry ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
        </a>
        <div className={`collapse ${isOpen.enquiry ? 'show' : ''}`} id="collapse1">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className='nav-item'><a href="/ListStudentForm" className="nav-link  text-capitalize fw-semibold">Student form</a></li>
            <li className='nav-item'><a href="/ListForexForm" className="nav-link  text-capitalize fw-semibold">Forex Form</a></li>
            <li className='nav-item'><a href="/ListAccommodation" className="nav-link text-capitalize fw-semibold">Accommodation</a></li>
            <li className='nav-item'><a href="/ListFlightTicket" className="nav-link  text-capitalize fw-semibold">Flight Ticket</a></li>
            <li className='nav-item'><a href="/ListLoanEnquiry" className="nav-link  text-capitalize fw-semibold">Loans</a></li>
            <li className='nav-item'><a href="/ListBusinessEnquiry" className="nav-link  text-capitalize fw-semibold">Business Enquiry</a></li>
            <li className='nav-item'><a href="/ListGeneralEnquiry" className="nav-link  text-capitalize fw-semibold">General Enquiry</a></li>
          </ul>
        </div>
      </li>


      <li className="nav-item" style={{ position: 'relative' }}>
        <a
          href="#"
          className="nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.finance}
          aria-controls="collapse2"
          style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => toggleDropdown('finance')}
        >
          <div>
            <i className="nav-icon fa fa-flag" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
            <span style={{ fontSize: "12px", fontWeight: "bold" }} className='pe-2'>Finance</span>
          </div>
          <i className={`fa fa-angle-right ${isOpen.finance ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
        </a>
        <div className={`collapse ${isOpen.finance ? 'show' : ''}`} id="collapse2">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Expenses</a></li>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">Income</a></li>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">Quotation</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Invoice</a></li>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">Sales Report</a></li>
          </ul>
        </div>
      </li>

      <li className="nav-item" style={{ position: 'relative' }}>
        <a
          href="#"
          className="nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.users}
          aria-controls="collapse3"
          style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          onClick={() => toggleDropdown('users')}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="nav-icon fas fa-users" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
            <span style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "5px"}}> Users</span>
          </div>
          <i className={`fa fa-angle-right ${isOpen.users ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
        </a>
        <div className={`collapse ${isOpen.users ? 'show' : ''}`} id="collapse3">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className='nav-item'><a href="/ListStudent" className="nav-link  text-capitalize fw-semibold">Students</a></li>
            <li className='nav-item'><a href="/ListAgent" className="nav-link  text-capitalize fw-semibold">Agents</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Staffs</a></li>
            <li className='nav-item'><a href="/client" className="nav-link  text-capitalize fw-semibold">Clients</a></li>
          </ul>
        </div>
      </li>


              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-id-card " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold",  }} > Projects & Tasks</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold",}} > Marketing</p>
                </a>
              </li>
              <li className="nav-item" style={{ position: 'relative' }}>
        <a
          href="#"
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
        </a>
        <div className={`collapse ${isOpen.elt ? 'show' : ''}`} id="collapse4">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">Booking</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Class Schedule</a></li>
          </ul>
        </div>
      </li>



      <li className="nav-item" style={{ position: 'relative' }}>
        <a
          href="#"
          className="nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.hrms}
          aria-controls="collapse5"
          style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          onClick={() => toggleDropdown('hrms')}
        >
          <div>
            <i className="nav-icon fas fa-envelope" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
            <span style={{ fontSize: "12px", fontWeight: "bold",  }} className='pe-2 text-uppercase'> HRMS</span>
          </div>
          <i className={`fa fa-angle-right ${isOpen.hrms ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
        </a>
        <div className={`collapse ${isOpen.hrms ? 'show' : ''}`} id="collapse5">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Users</a></li>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">Attendance</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">payroll</a></li>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">leaves</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-uppercase fw-semibold">kpl</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">policies</a></li>
            <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">reviews</a></li>
           
          </ul>
        </div>
      </li>

              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-bell " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", }} > Notifications</p>
                </a>
              </li>

              <li className="nav-item ">
                <a href="/Demo" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-certificate " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold",  }} > Promotion</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold",  }} > Training Material</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-calendar" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold",  }}> Events</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold",  }} > Meetings</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-comment " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", }} > Chats</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-envelope " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", }}> Email</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-rss " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "11px", fontWeight: "bold",  }} > Blogs</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-cogs " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", }} > Testimonials</p>
                </a>
              </li>
              <li className="nav-item" style={{ position: 'relative' }}>
        <a
          href="#"
          className="nav-link"
          data-bs-toggle="collapse"
          aria-expanded={isOpen.settings}
          aria-controls="collapse6"
          style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          onClick={() => toggleDropdown('settings')}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="nav-icon fa fa-cog fa-spin" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
            <p style={{ fontSize: "12px", fontWeight: "bold", }} className='pe-2'> Settings</p>
          </div>
          <i className={`fa fa-angle-right ${isOpen.settings ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
        </a>
        <div className={`collapse ${isOpen.settings ? 'show' : ''}`} id="collapse6">
          <ul className='nav d-flex flex-column border-0 ps-4'>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-toggle="collapse"
                aria-expanded={isOpen.globalSettings}
                aria-controls="collapse7"
                style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                onClick={() => toggleDropdown('globalSettings')}
              >
                <div>
                  <span style={{ fontSize: "12px", fontWeight: "bold",  }} className='pe-2'>Global settings</span>
                </div>
                <i className={`fa fa-angle-right ${isOpen.globalSettings ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
              </a>
              <div className={`collapse ${isOpen.globalSettings ? 'show' : ''}`} id="collapse7">
                <ul className='nav d-flex flex-column border-0 ps-4'>
                  <li className='nav-item'><a href="/GlobalSettings" className="nav-link text-capitalize fw-semibold">University</a></li>
                  <li className='nav-item'><a href="/Status" className="nav-link  text-capitalize fw-semibold">Status</a></li>
                  <li className='nav-item'><a href="/Intake" className="nav-link text-capitalize fw-semibold">intake</a></li>
                <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">country</a></li>
                <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">email</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Currency</a></li>
               <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">Custom label</a></li>
               <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">dashboard</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-toggle="collapse"
                aria-expanded={isOpen.modules}
                aria-controls="collapse8"
                style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                onClick={() => toggleDropdown('modules')}
              >
                <div>
                  <span style={{ fontSize: "12px", fontWeight: "bold",}} className='pe-2'>Modules</span>
                </div>
                <i className={`fa fa-angle-right ${isOpen.modules ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
              </a>
              <div className={`collapse ${isOpen.modules ? 'show' : ''}`} id="collapse8">
                <ul className='nav d-flex flex-column border-0 ps-4'>
                  <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">status</a></li>
                  <li className='nav-item'><a href="/ProgramModule" className="nav-link  text-capitalize fw-semibold">program</a></li>
                  <li className='nav-item'><a href="/UniversitySettings" className="nav-link  text-capitalize fw-semibold">university</a></li>
            <li className='nav-item'><a href="/ClientModule" className="nav-link  text-capitalize fw-semibold">client</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">add label</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">dashboard</a></li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-bs-toggle="collapse"
                aria-expanded={isOpen.privileges}
                aria-controls="collapse9"
                style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                onClick={() => toggleDropdown('privileges')}
              >
                <div>
                  <span style={{ fontSize: "12px", fontWeight: "bold", }} className='pe-2'>Privileges</span>
                </div>
                <i className={`fa fa-angle-right ${isOpen.privileges ? 'rotate-icon' : ''}`} aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
              </a>
              <div className={`collapse ${isOpen.privileges ? 'show' : ''}`} id="collapse9">
                <ul className='nav d-flex flex-column border-0 ps-4'>
                  <li className='nav-item'><a href="#" className="nav-link text-capitalize fw-semibold">program</a></li>
                  <li className='nav-item'><a href="#" className="nav-link  text-uppercase fw-semibold">hrm</a></li>
                  <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">attendance</a></li>
            <li className='nav-item'><a href="#" className="nav-link  text-capitalize fw-semibold">payroll</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>



              <li className="nav-item ">
                <Link className="nav-link" to="/" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>

                  <i className="nav-icon fa fa-flag " aria-hidden="true" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
                  <p style={{ fontSize: "12px", fontWeight: "bold" }} onClick={logout} > Log Out </p>
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
