import React from 'react';
import { IoHome } from "react-icons/io5";
import { FaBookMedical } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { RiFileSearchFill } from "react-icons/ri";
// import Logo from '../../Assests/Logo.svg'
import { CiSettings } from "react-icons/ci";

export const SideBar = () => {
  return (
    <div className='d-none d-md-block' style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '220px', backgroundColor: '#ffefba', zIndex: 1000 }} >
      <div className="container-fluid d-none d-md-inline">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3  text-white ">
          <a
            href=""
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto mt-1  text-decoration-none"
          >
            {/* <img src={Logo} alt="" width={"100%"} /> */}
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-itmes-center align-items-sm-start justify-content-center px-2 "
            id="menu"
          >
            <li className="nav-item">
              <a href="" className="nav-link align-middle px-0 fs-5 fw-semibold text-secondary">
                <span className="fs-4 fw-bold">
                  <IoHome />
                </span>{" "}
                <span className="ms-1 d-none d-sm-inline">Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link align-middle px-0 fs-5 fw-semibold  text-secondary">
                <span className="fs-4 fw-bold">
                  <RiFileSearchFill />
                </span>{" "}
                <span className="ms-1 d-none d-sm-inline ">About</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link align-middle px-0 fs-5 fw-semibold  text-secondary">
                <span className="fs-4 fw-bold">
                  <FaBookMedical />
                </span>{" "}
                <span className="ms-1 d-none d-sm-inline ">Program</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link align-middle px-0 fs-5 fw-semibold  text-secondary">
                <span className="fs-3 fw-bold">
                  <IoIosContacts />
                </span>{" "}
                <span className="ms-1 d-none d-sm-inline ">Contact</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link align-middle px-0 fs-5 fw-semibold  text-secondary">
                <span className="fs-3 fw-bold">
                  <FaRegUserCircle />
                </span>{" "}
                <span className="ms-1 d-none d-sm-inline ">Profile</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link align-middle fs-5 fw-semibold px-0  text-secondary">
                <span className="fs-3 fw-bold">
                  <IoIosLogOut />
                </span>{" "}
                <span className="ms-1 d-none d-sm-inline ">Logout</span>
              </a>
            </li>
          </ul>
          <div className="dropdown dropup pb-4 mt-5 pt-5 align-items-end px-2">
            <a href="#" className="d-flex align-items-center fs-5 fw-semibold   text-secondary text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <span className='fs-4 fw-bold'><CiSettings /></span>
              <span className="d-none d-sm-inline mx-1 ">Settings</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><a className="dropdown-item" href="#">New project...</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SideBar
