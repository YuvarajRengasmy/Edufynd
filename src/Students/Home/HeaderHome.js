import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { clearStorage } from '../../Utils/storage';
import { Link } from 'react-router-dom';

export default function Event() {
  const logout = () => {
    clearStorage();
    toast.success('You have Student logged out successfully.')
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg container-fluid fixed-top" style={{ backgroundColor:' #fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="container">
          <Link className="navbar-brand text-white fw-bold fs-5" to="#"><img src="https://edufynd.com/assets/images/edufynd-logo.svg" className="me-2" alt="logo" width={"300"} height={"50"} color='white' /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto gap-5">
              <li className="nav-item active">
                <Link className="nav-link mt-3 fw-bold " to="/Student">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mt-3 " to="/About">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mt-3" to="/Program">Programs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-bold mt-3" to="/Contact">Contact</Link>
              </li>
              <li className="nav-item dropdown ml-3 align-items-end">
                <Link className="nav-link nav-profile d-flex align-items-center " to="/Profile" data-bs-toggle="dropdown">
                  <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width={"50"} height={"50"} alt="Profile" className="rounded-circle" />
                  <span className="d-none d-md-block  ps-2 text-white fw-bold">Yuvaraj</span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile" style={{ backgroundColor:' #fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                  <li className="dropdown-header ">
                    <h6 className='fw-italic'>Yuvaraj</h6>
                    <span>Web Designer</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/Profile">
                      <i className="bi bi-person" />  &nbsp;&nbsp; &nbsp;
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/Faq">
                      <i className="bi bi-question-circle" /> &nbsp;&nbsp; &nbsp;
                      <span>Need Help?</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/ViewApplication">
                      <i className="bi  bi-cloud" /> &nbsp;&nbsp; &nbsp;
                      <span>Application</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/" onClick={logout}>
                      <i className="bi bi-box-arrow-right" />  &nbsp;&nbsp; &nbsp;
                      <span>Sign Out</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
};
