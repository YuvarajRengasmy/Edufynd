import React from 'react';
import { toast } from 'react-toastify';
import { clearStorage } from '../Utils/storage';
import { Link } from 'react-router-dom';


const Masterheader = () => {
  
  const logout = () => {
    clearStorage();
    toast.success('You have Student logged out successfully.')
}
  return (
    <div>
      <nav className="main-header navbar navbar-expand-md navbar-white navbar-light position-static">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                <i className={`fas fa-bars`} />
              </a> */}
            </li>
          </ul>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
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
        </div>
      
      </nav>
    </div>
  );
};
export default Masterheader;
