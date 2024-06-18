import React from 'react';
// import Logo from '../../Assests/Logo.svg';
import { FaBars } from 'react-icons/fa6';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm d-block d-md-none ">
      <div className="container">
        <div className="navbar-brand me-auto ">
          <a href="/" className="nav-link">
            {/* <img src={Logo} alt="Logo" width={200} className="img-fluid" /> */}
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item fw-semibold">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item fw-semibold">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item fw-semibold">
              <a className="nav-link" href="#">
                Programs
              </a>
            </li>
            <li className="nav-item fw-semibold">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item fw-semibold">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item fw-semibold">
              <a className="nav-link" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
