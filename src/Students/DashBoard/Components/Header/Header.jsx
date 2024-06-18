import React from 'react';
import { FaBell } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { FaBars } from 'react-icons/fa6';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <div className="navbar-brand me-auto ">
          <a href="/" className="nav-link">
            <img src={""} alt="Logo" width={'200px'} className="img-responsive" />
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

        <div className="collapse navbar-collapse  " id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item fw-semibold d-none d-lg-inline">
              <form className="d-flex ">
                <div className="input-group ">
                  <input type="text" className="form-control border-0 rounded-4 " placeholder="Search" />
                  <button type="submit" className="btn btn-light rounded-circle border-0 mx-1">
                    <IoMdSearch />
                  </button>
                </div>
              </form>
            </li>
            <li className="nav-item fw-semibold d-none d-lg-inline">
              <button type="button" className="btn position-relative">
                <span className="fs-5"><FaBell /></span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">+99 <span className="visually-hidden">unread messages</span></span>
              </button>
            </li>
            <li className="nav-item fw-semibold d-none d-lg-inline">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRIq-fnHHGn5O1_S4UwUSg2-N0suZH5QRs1zx9Ckv-w&s"
                alt="user profile"
                className="rounded-circle border-0 ms-4"
                style={{ width: '30px' }}
              />
            </li>
            <li className="nav-item fw-semibold d-block d-lg-none">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item fw-semibold d-block d-lg-none">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item fw-semibold d-block d-lg-none">
              <a className="nav-link" href="#">
                Programs
              </a>
            </li>
            <li className="nav-item fw-semibold d-block d-lg-none">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
            <li className="nav-item fw-semibold d-block d-lg-none">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item fw-semibold d-block d-lg-none">
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
