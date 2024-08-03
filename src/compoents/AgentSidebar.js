import React from 'react';
import { Link } from "react-router-dom";
import Edufynd from "../Assests/White Logo EduFynd.png";
import './Hoverbar.css';

const HoverBar = () => {
  return (
    <div className="sBar text-bg-dark">
      <ul className="nav flex-column">
        <div className="user-panel mt-2 d-flex">
          <div className="info mt-1 p-2">
            <Link to="/AgentHome" className="brand-text font-weight-light text-decoration-none">
              <img src={Edufynd} alt="logo" className='img-fluid' style={{ width: "100%" }} />
            </Link>
          </div>
        </div>
        <li className="nav-item">
          <Link className="nav-link" to="/AgentHome" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AgentAbout" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-info-circle"></i>
            <span>About</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AgentProgram" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-graduation-cap"></i>
            <span>Programs</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AgentProfile" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AgentContact" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-envelope"></i>
            <span>Contact</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Studentpage" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-users"></i>
            <span>Students</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/AddStudent" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-user-plus"></i>
            <span>Add Student</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ViewAgentStudent" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-eye"></i>
            <span>View Student</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/EditAgentStudent" style={{ fontSize: "14px", fontWeight: "bold" }}>
            <i className="fas fa-edit"></i>
            <span>Edit Student</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HoverBar;
