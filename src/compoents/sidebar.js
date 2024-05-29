import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="main-sidebar elevation-8" style={{ backgroundColor: "#fcf6f9" }} >
        <div style={{ marginLeft: "200px" }} className="d-md-none  shadow-lg rounded  position-absolute">
        </div>
        <div className="sidebar">
        <div className="user-panel mt-2 pb-3  d-flex ">
        </div>
        <div className="user-panel mt-2 pb-3  d-flex">
        <div className="image">
        </div>
        <div className="info  mt-1">
          <a href="/Dashboard" className="brand-text font-weight-light text-decoration-none">
            <h1 style={{ color: "#FE5722", fontSize: "30px", fontWeight: "bold" }}> EduFynd</h1>
          </a>
          <a className="d-block text-sm text-white" style={{ textDecoration: "none" }}>
          </a>
        </div>
        </div>
          <nav>
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <a href="/Dashboard" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-tachometer-alt" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Dashboard Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/ListUniversity" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-university" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* University Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>University</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/ListStudent" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user-graduate" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Student Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Student</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/ListAgent" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-user-secret" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Agent Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Agent</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Programs" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-code" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Program</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/AdminList" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-cogs" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Admin Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Admin</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/UsingEnquiry" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon fas fa-envelope" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Using Enquiry Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Enquiry</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Masterviewprofile" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon far fa-user" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Profile Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>Profile</p>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                  <i className="nav-icon far fa-image" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Logout Icon */}
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}> Log Out </p>
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
