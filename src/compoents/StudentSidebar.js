import React from 'react'
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg";
import './Hoverbar.css';
import { toast } from "react-toastify";
import { clearStorage } from "../Utils/storage";
import { useNavigate } from "react-router-dom";

export const StudentSidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    clearStorage(); // Assuming clearStorage is defined elsewhere
    toast.success("You have been logged out successfully.");
    navigate("/");
  };
  return (

   

    <div className="sBar text-bg-dark ">
      <ul className="nav flex-column">
        <div className="user-panel mt-2 d-flex">
          <div className="info mt-1 p-2">
            <Link to="/StudentDashboard" className="brand-text font-weight-light text-decoration-none">
              <img src={Edufynd} alt="logo" className='img-fluid' style={{ width: "100%" }} />
            </Link>
          </div>
        </div>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/StudentDashboard" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/Student" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/About" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/Program" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-graduation-cap"></i>
            <span>Programs</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/Profile" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/Contact" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-envelope"></i>
            <span>Contact</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/TrackApplication" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-search"></i>
            <span>Track Application</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/ViewApplication" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-eye"></i>
            <span>View Application</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/Faq" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-question-circle"></i>
            <span>FAQ</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/ViewpageUniversity" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-university"></i>
            <span>View University</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar_link" to="/ViewProgramUniversity" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-book"></i>
            <span>View Program University</span>
          </Link>
        </li>
        <li className="nav-item">
                  <a href="/"
                    className="nav-link sidebar_link"
                    target="_self"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="nav-icon fa fa-flag "
                      aria-hidden="true"
                      
                    />
                    Log Out
                  </a>
                </li>
     
      </ul>
    </div>
  );
}

export default StudentSidebar