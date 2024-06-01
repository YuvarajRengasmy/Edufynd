import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearStorage } from '../Utils/storage';
import { Link } from 'react-router-dom';
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg"
import './Sidebar.css'
import { colors } from '@mui/material';

const Sidebar = () => {
  const logout = () => {
    clearStorage();
    toast.success('You have Student logged out successfully.')
  }
  return (
    <div>
      <aside className="main-sidebar elevation-6" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'helvetica', fontSize: '12px', position: 'fixed', width: "195px", height: '100%', overflowY: 'auto', scrollbarWidth: 'none' }} >
        <div className="d-md-none  shadow-lg rounded  ">
        </div>
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
                <a href="/" className="nav-link" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-tachometer-alt " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
                   <p style={{ fontSize: "12px", fontWeight: "bold", color: '#231f20' }} >Dashboard</p>
                </a>
              </li>

              <li className="nav-item  " >
                <a href="/ListUniversity" className="nav-link " style={{ fontSize: "12px", fontWeight: "bold", }}>
                  <i className="nav-icon fas fa-university " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* University Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20" }} >University</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="/Programs" className="nav-link" style={{ fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa  fa-graduation-cap " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#191725" }}>Program</p>
                </a>
              </li>
              <li className="nav-item  ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} >Student</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-book " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} >Application</p>
                </a>
              </li>
              <li className="nav-item" style={{ position: 'relative' }}>
                <a href="/UsingEnquiry" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <i className="nav-icon fas fa-envelope" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} className='pe-2'> Enquiry</span>
                  </div>
                  <i className="fa fa-angle-down " aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                </a>
                <div className="collapse" id="collapse1">
                  <ul className='nav d-flex flex-column border-0 ps-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize   fw-semibold">Student form</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Forex Form</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Accommodation</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Flight Ticket</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize   fw-semibold">Loans</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Business Enquiry</a></li>
                    <li className='nav-item'><a href="#" className="nav-link  text-dark text-capitalize   fw-semibold">General Enquiry</a></li>
                  </ul>
                </div>
              </li>


              <li className="nav-item" style={{ position: 'relative' }}>
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <i className="nav-icon fa fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                    <span style={{ fontSize: "12px", fontWeight: "bold" }} className=' pe-2'> Finance</span>
                  </div>
                  <i className="fa fa-angle-down " aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                </a>
                <div class="collapse collapse-vertical" id="collapse2">
                  <ul className='nav d-flex flex-column border-0 ps-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Expenses</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Income</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Quotation</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark   text-capitalize fw-semibold">Invoice </a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark   text-capitalize  fw-semibold">Sales Report</a></li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="nav-icon fas fa-users " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                    <span style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "5px", color: "#231f20", }} > Users</span>
                  </div>
                  <i className="fa fa-angle-down " aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                </a>
                <div className="collapse collapse-vertical" id="collapse3">
                  <ul className='nav d-flex flex-column border-0 ps-4'>
                    <li className='nav-item'><a href="/ListStudent" className="nav-link text-dark text-capitalize fw-semibold">Students</a></li>
                    <li className='nav-item'><a href="/ListAgent" className="nav-link text-dark text-capitalize fw-semibold">Agents</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Staffs</a></li>
                    <li className='nav-item'><a href="/client" className="nav-link text-dark text-capitalize  fw-semibold">Clients</a></li>
                  </ul>
                </div>
              </li>



              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-id-card " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Projects & Tasks</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Marketing</p>
                </a>
              </li>
              <li className="nav-item" style={{ position: 'relative' }}>
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="nav-icon fas fa-envelope " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                    <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} className=' pe-2'> ELT</p>
                  </div>
                  <i className="fa fa-angle-down  dropdown" aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                </a>
                <div className="collapse collapse-vertical" id="collapse4">
                  <ul className='nav d-flex flex-column border-0 ps-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Booking</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize   fw-semibold">Class Schedule</a></li>
                  </ul>
                </div>
              </li>



              <li className="nav-item" style={{ position: "relative" }}>
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i className="nav-icon fas fa-envelope " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                    <span style={{ fontSize: "12px", fontWeight: "bold", marginLeft: "5px", color: "#231f20", }} > HRMS</span>
                  </div>
                  <i className="fa fa-angle-down " aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                </a>
                <div className="collapse collapse-vertical" id="collapse5">
                  <ul className='nav d-flex flex-column border-0 ps-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Staff</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Attendance</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Payroll</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize fw-semibold">Leaves</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">KPL</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize fw-semibold">Policies</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Reviews</a></li>
                  </ul>
                </div>
              </li>

              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-bell " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Notifications</p>
                </a>
              </li>

              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-certificate " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Promotion</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Training Material</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-calendar" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }}> Events</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-flag " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Meetings</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-comment " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Chats</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-envelope " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }}> Email</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-rss " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "11px", fontWeight: "bold", color: "#231f20", }} > Blogs</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-cogs " style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} > Testimonials</p>
                </a>
              </li>
              <li className="nav-item" style={{ position: 'relative' }}>
                <a href="#" className="nav-link ps-4" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa fa-cog fa-spin fa-3x fa-fw " aria-hidden="true" style={{ color: "#fe5722", fontSize: "12px", fontWeight: "bold" }} />
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }}className='ps-2' > Settings</p>
                  </div>
                  <i className="fa fa-angle-down  dropdown" aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                </a>
                <div className="collapse collapse-vertical" id="collapse6">
                  <ul className='nav d-flex flex-column border-0 ps-4'>
                    <li className="nav-item">
                      <a href="/GlobalSettings" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} className=' pe-1'> Global Settings</p>
                        <i className="fa fa-angle-down dropdown" aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                      </a>
                      <div className="collapse collapse-vertical" id="collapse7">
                        <ul className='nav d-flex flex-column border-0 ps-4 '>
                          <li className='nav-item'><a href="/Status" className="nav-link text-dark text-capitalize fw-semibold">status</a></li>
                          <li className='nav-item'><a href="/GlobalSettings" className="nav-link text-dark  text-capitalize   fw-semibold">Country</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize   fw-semibold">Currency</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize   fw-semibold">email</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize   fw-semibold">intake</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">dashboard</a></li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} className=' pe-2'> Modules</p>
                        <i className="fa fa-angle-down  dropdown" aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                      </a>
                      <div className="collapse collapse-vertical" id="collapse8">
                        <ul className='nav d-flex flex-column border-0 ps-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize fw-semibold">University</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark   text-capitalize fw-semibold">Status</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark   text-capitalize fw-semibold">Program</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark   text-capitalize  fw-semibold">Country</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Add label</a></li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#231f20", }} className=' pe-2'> Privilages</p>
                        <i className="fa fa-angle-down  dropdown" aria-hidden="true" style={{ color: "#231f20", fontSize: "12px", fontWeight: "bold" }} />
                      </a>
                      <div className="collapse collapse-vertical" id="collapse9">
                        <ul className='nav d-flex flex-column border-0 ps-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize   fw-semibold">program</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold ">hrm</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold  ">attendance</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold ">payroll</a></li>
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
      </aside>
    </div>
  );
};
export default Sidebar;
