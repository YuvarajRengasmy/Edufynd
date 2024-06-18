import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearStorage } from '../Utils/storage';
import { Link } from 'react-router-dom';
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg"

const Sidebar = () => {
  const logout = () => {
    clearStorage();
    toast.success('You have Student logged out successfully.')
  }
  return (
    <div>
      <aside className="main-sidebar elevation-10" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '13px',position: 'absolute', height: '100%', overflowY: 'auto',scrollbarWidth: 'none' }} >
        <div  className="d-md-none  shadow-lg rounded  ">
        </div>
        <div className="sidebar">
          <div className="user-panel mt-2 pb-3  d-flex ">
          </div>
          <div className="user-panel mt-2 pb-3  d-flex">
            <div className="image">
            </div>
            <div className="info  mt-1">
              <a href="/DashBoard" className="brand-text font-weight-light text-decoration-none">
                <img src={Edufynd} alt="logo" className='img-fluid mb-3' style={{ width: "180px", height: "50px" }} />
              </a>
              <a className="d-block text-sm text-white" style={{ textDecoration: "none" }}>
              </a>
            </div>
          </div>
          <nav>
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item mt-1">
                <a href="/
                " className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-tachometer-alt" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Dashboard Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Dashboard</p>
                </a>
              </li>

              <li className="nav-item mt-2">
                <a href="/ListUniversity" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-university" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* University Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>University</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/Programs" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa  fa-graduation-cap" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Program</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Student</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-book" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Application</p>
                </a>
              </li>
              <li className="nav-item mt-1">
  <a href="/UsingEnquiry" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
    <i className="nav-icon fas fa-envelope" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
    <p style={{ fontSize: "16px", fontWeight: "bold" }}> Enquiry</p>
  </a>
  <div className="collapse" id="collapse1">
    <ul className='nav d-flex flex-column border-0 px-4'>
      <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Student form</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Forex Form</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Accommodation</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Flight Ticket</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Loans</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Business Enquiry</a></li>
      <li className='nav-item'><a href="#" className="nav-link  text-dark text-capitalize  fw-semibold">General Enquiry</a></li>
    </ul>
  </div>
</li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-flag" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Finance</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse2">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Expenses</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Income</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Quotation</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize fw-semibold">Invoice Generate</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Sales Report</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-users" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Users</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse3">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="/ListStudent" className="nav-link text-dark text-capitalize fw-semibold">Students</a></li>
                    <li className='nav-item'><a href="/ListAgent" className="nav-link text-dark  text-capitalize  fw-semibold">Agents</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">staffs</a></li>
                    <li className='nav-item'><a href="/client" className="nav-link text-dark  text-capitalize  fw-semibold">Clients</a></li>
                  </ul>
                </div>
              </li>


              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-id-card" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Projects & Tasks</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Marketing</p>
                </a>
              </li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-envelope" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> ELT</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse4">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Booking</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">class schedule</a></li>
                  </ul>
                </div>
              </li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-envelope" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> HRMS</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse5">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">Staff</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Attendance</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">payrol</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">leaves</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">kpl</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">policies</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">reviews</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-bell" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Notifications</p>
                </a>
              </li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-certificate " style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Promotion</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Training Material</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-calendar" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Events</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-flag" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Meetings</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-comment" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Chats</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-envelope" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Email</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-rss " style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Blogs</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-cogs" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Testimonials</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                <i class="fa fa-cog fa-spin fa-3x fa-fw" aria-hidden="true" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}/>
                  
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Settings</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse6">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className="nav-item mt-1">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>

                        <p style={{ fontSize: "14px", fontWeight: "bold" }}> Global Settings</p>
                      </a>
                      <div class="collapse collapse-vertical" id="collapse7">
                        <ul className='nav d-flex flex-column border-0 px-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize  fw-semibold">status</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Country</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">Currency</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">email</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">intake</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  fw-semibold">dashboard</a></li>

                        </ul>
                      </div>
                    </li>
                    <li className="nav-item mt-1">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>

                        <p style={{ fontSize: "14px", fontWeight: "bold" }}> Modules</p>
                      </a>
                      <div class="collapse collapse-vertical" id="collapse8">
                        <ul className='nav d-flex flex-column border-0 px-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize title2 fw-semibold">University</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">Status</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">Program</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">Country</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">Add label</a></li>

                        </ul>
                      </div>
                    </li>
                    <li className="nav-item mt-1">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>

                        <p style={{ fontSize: "16px", fontWeight: "bold" }}> Privilages</p>
                      </a>
                      <div class="collapse collapse-vertical" id="collapse9">
                        <ul className='nav d-flex flex-column border-0 px-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize title2 fw-semibold">program</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">hrm</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">attendance</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold">payroll</a></li>

                        </ul>
                      </div>
                    </li>

                  </ul>
                </div>
              </li>

              <li className="nav-item mt-1">
                <Link className="nav-link" to="/" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  
                  <i className="nav-icon fa fa-flag" aria-hidden="true" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> 
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} onClick={logout}> Log Out </p>
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
