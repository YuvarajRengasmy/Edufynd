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
      <aside className="main-sidebar elevation-10" style={{ backgroundColor: 'black', color:'white', fontFamily: 'Plus Jakarta Sans', fontSize: '13px',position: 'fixed', height: '100%', overflowY: 'auto',scrollbarWidth: 'none' }} >
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
                <img src={"https://www.edufynd.com/assets/images/foot_logo.png"} alt="logo" className='img-fluid mb-3' style={{ width: "180px", height: "50px" }} />
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
                  <i className="nav-icon fas fa-tachometer-alt text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Dashboard Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'>Dashboard</p>
                </a>
              </li>

              <li className="nav-item mt-2">
                <a href="/ListUniversity" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-university text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* University Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'>University</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/Programs" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa  fa-graduation-cap text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'>Program</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'>Student</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-book text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'>Application</p>
                </a>
              </li>
              <li className="nav-item mt-1">
  <a href="/UsingEnquiry" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
    <i className="nav-icon fas fa-envelope text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
    <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Enquiry</p>
  </a>
  <div className="collapse" id="collapse1">
    <ul className='nav d-flex flex-column border-0 px-4'>
      <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize text-white  fw-semibold">Student form</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Forex Form</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Accommodation</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Flight Ticket</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  text-white fw-semibold">Loans</a></li>
      <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  text-white fw-semibold">Business Enquiry</a></li>
      <li className='nav-item'><a href="#" className="nav-link  text-dark text-capitalize  text-white fw-semibold">General Enquiry</a></li>
    </ul>
  </div>
</li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-flag text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Finance</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse2">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-white text-capitalize  fw-semibold">Expenses</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-white text-capitalize  fw-semibold">Income</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-white text-capitalize  fw-semibold">Quotation</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-white  text-capitalize fw-semibold">Invoice Generate</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-white text-capitalize  fw-semibold">Sales Report</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-users text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Users</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse3">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="/ListStudent" className="nav-link text-dark text-capitalize text-white fw-semibold">Students</a></li>
                    <li className='nav-item'><a href="/ListAgent" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Agents</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">staffs</a></li>
                    <li className='nav-item'><a href="/client" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Clients</a></li>
                  </ul>
                </div>
              </li>


              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-id-card text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Projects & Tasks</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Marketing</p>
                </a>
              </li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-envelope text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> ELT</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse4">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize text-white  fw-semibold">Booking</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">class schedule</a></li>
                  </ul>
                </div>
              </li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-envelope text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> HRMS</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse5">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize text-white fw-semibold">Staff</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white fw-semibold">Attendance</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">payrol</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">leaves</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">kpl</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">policies</a></li>
                    <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize  text-white fw-semibold">reviews</a></li>
                  </ul>
                </div>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-bell text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Notifications</p>
                </a>
              </li>

              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-certificate text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Promotion</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-flag text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Training Material</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-calendar text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Events</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-flag text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Meetings</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-comment text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Chats</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-envelope text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Email</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fa fa-rss text-white " style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Blogs</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-cogs text-white" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Testimonials</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                <i class="fa fa-cog fa-spin fa-3x fa-fw text-white" aria-hidden="true" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}/>
                  
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Settings</p>
                </a>
                <div class="collapse collapse-vertical" id="collapse6">
                  <ul className='nav d-flex flex-column border-0 px-4'>
                    <li className="nav-item mt-1">
                      <a href="/GlobalSettings" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>

                        <p style={{ fontSize: "14px", fontWeight: "bold" }} className='text-white'> Global Settings</p>
                      </a>
                      <div class="collapse collapse-vertical" id="collapse7">
                        <ul className='nav d-flex flex-column border-0 px-4'>
                          <li className='nav-item'><a href="/Status" className="nav-link text-dark text-capitalize text-white fw-semibold">status</a></li>
                          <li className='nav-item'><a href="/GlobalSettings" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Country</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">Currency</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">email</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">intake</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize text-white  fw-semibold">dashboard</a></li>

                        </ul>
                      </div>
                    </li>
                    <li className="nav-item mt-1">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse8" aria-expanded="false" aria-controls="collapse8" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>

                        <p style={{ fontSize: "14px", fontWeight: "bold" }} className='text-white'> Modules</p>
                      </a>
                      <div class="collapse collapse-vertical" id="collapse8">
                        <ul className='nav d-flex flex-column border-0 px-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-white text-capitalize title2 fw-semibold">University</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-white  text-capitalize title2 fw-semibold">Status</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-white  text-capitalize title2 fw-semibold">Program</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-white text-capitalize title2 fw-semibold">Country</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-white text-capitalize title2 fw-semibold">Add label</a></li>

                        </ul>
                      </div>
                    </li>
                    <li className="nav-item mt-1">
                      <a href="#" className="nav-link" data-bs-toggle="collapse" data-bs-target="#collapse9" aria-expanded="false" aria-controls="collapse9" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>

                        <p style={{ fontSize: "16px", fontWeight: "bold" }} className='text-white'> Privilages</p>
                      </a>
                      <div class="collapse collapse-vertical" id="collapse9">
                        <ul className='nav d-flex flex-column border-0 px-4'>
                          <li className='nav-item'><a href="#" className="nav-link text-dark text-capitalize title2 text-white fw-semibold">program</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold text-white">hrm</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold  text-white">attendance</a></li>
                          <li className='nav-item'><a href="#" className="nav-link text-dark  text-capitalize title2 fw-semibold text-white">payroll</a></li>

                        </ul>
                      </div>
                    </li>

                  </ul>
                </div>
              </li>

              <li className="nav-item mt-1">
                <Link className="nav-link" to="/" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  
                  <i className="nav-icon fa fa-flag text-white" aria-hidden="true" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> 
                  <p style={{ fontSize: "16px", fontWeight: "bold" }} onClick={logout} className='text-white'> Log Out </p>
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
