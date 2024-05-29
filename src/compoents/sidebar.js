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
      <aside className="main-sidebar elevation-10" style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
        <div style={{ marginLeft: "210px" }} className="d-md-none  shadow-lg rounded  position-absolute">
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
                <a href="/ListStudent" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user-graduate" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Student Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Student</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/ListAgent" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user-secret" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Agent Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Agent</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/client" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa fa-users" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Agent Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Client</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/Programs" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-code" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Program</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/AdminList" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-cogs" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Admin</p>
                </a>
              </li>
              <li className="nav-item mt-1">
                <a href="/UsingEnquiry" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-envelope" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Enquiry</p>
                </a>
              </li>
             
              <li className="nav-item mt-1">
                <Link className="nav-link" to="/" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon far fa-image" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Logout Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}  onClick={logout}> Log Out </p>
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
