import React, { useEffect, useState } from 'react';

export default function Event() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg container-fluid fixed-top" style={{ backgroundColor:'#673AB7' }}>
        <div className="container">
          <a className="navbar-brand text-white fw-bold fs-5" href="#"><img src="https://edufynd.com/assets/images/edufynd-logo.svg" className="me-2" alt="logo" width={"300"} height={"50"} color='white' /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto gap-5">
              <li className="nav-item active">
                <a className="nav-link text-white fw-bold mt-3 " href="/Student">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-bold mt-3 " href="/About">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-bold mt-3" href="/Program">Programs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-bold mt-3" href="/Contact">Contact</a>
              </li>
              <li className="nav-item dropdown ml-3 align-items-end">
                <a className="nav-link nav-profile d-flex align-items-center " href="/Profile" data-bs-toggle="dropdown">
                  <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width={"50"} height={"50"} alt="Profile" className="rounded-circle" />
                  <span className="d-none d-md-block  ps-2 text-white fw-bold">Yuvaraj</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header ">
                    <h6 className='fw-italic'>Yuvaraj</h6>
                    <span>Web Designer</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="/Profile">
                      <i className="bi bi-person" />  &nbsp;&nbsp; &nbsp;
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="/Faq">
                      <i className="bi bi-question-circle" /> &nbsp;&nbsp; &nbsp;
                      <span>Need Help?</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="/ViewApplication">
                      <i className="bi  bi-cloud" /> &nbsp;&nbsp; &nbsp;
                      <span>Application</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="/">
                      <i className="bi bi-box-arrow-right" />  &nbsp;&nbsp; &nbsp;
                      <span>Sign Out</span>
                    </a>
                  </li>
                </ul>{/* End Profile Dropdown Items */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
};
