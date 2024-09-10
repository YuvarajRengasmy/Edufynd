import React from 'react';
import { CiSearch } from 'react-icons/ci';
import Sidebar from '../../compoents/StudentSidebar';

export default function Event() {
  return (
    <>
      <Sidebar />

      <div className='content-wrapper'>
        <div className='container-fluid'>
          {/* Banner Section */}
          <div className='row'>
            <div className='col-12'>
              <div className="bg-image" style={{ backgroundImage: `url("https://campusdirect.io/static/media/banner.b190f2c0.jpg")`, height: '400px' }}>
                <div className="mask d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '100%' }}>
                  <div className="text-center text-light">
                    <h4 className="mt-5 fw-bold">Don't miss out!</h4>
                    <h4 className="fw-bold">Explore the vibrant events happening locally and globally.</h4>

                    {/* Search Section */}
                    <div className="input-group mt-5 w-50 mx-auto">
                      <span className="input-group-text bg-light border-0" id="search-addon">
                        <CiSearch className="fs-5" />
                      </span>
                      <input
                        type="search"
                        placeholder="Search"
                        aria-describedby="search-addon"
                        className="form-control bg-light border-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className='row text-center my-5'>
            <div className='col-lg-3 col-sm-6 mb-4'>
              <div className="card border-0">
                <div className="card-body">
                  <i className="fa fa-3x fa-graduation-cap mb-4" style={{ color: "#fe5722" }}></i>
                  <h6 className="mb-3">Skilled Instructors</h6>
                  <p className="card-text">Experienced and qualified instructors.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fa fa-3x fa-globe mb-4" style={{ color: "#fe5722" }}></i>
                  <h6 className="mb-3">Online Classes</h6>
                  <p className="card-text">Learn from anywhere in the world.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fa fa-3x fa-home mb-4" style={{ color: "#fe5722" }}></i>
                  <h6 className="mb-3">Home Projects</h6>
                  <p className="card-text">Practice with real-world projects from home.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mb-4">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fa fa-3x fa-book-open mb-4" style={{ color: "#fe5722" }}></i>
                  <h6 className="mb-3">Book Library</h6>
                  <p className="card-text">Access a wide range of educational resources.</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className='row my-5'>
            <div className="col-lg-6 mb-4">
              <img className="img-fluid w-100 h-100 object-fit-cover" src="https://themewagon.github.io/elearning/img/about.jpg" alt="About Us" />
            </div>
            <div className="col-lg-6">
              <h6 className="text-primary">About Us</h6>
              <h1 className="mb-3">Welcome to EDUFYND</h1>
              <p className="mb-3">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
              <p className="mb-3">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.</p>
              <div className="row gy-2 gx-4">
                <div className="col-sm-6">
                  <p className="mb-0"><i className="fa fa-arrow-right me-2 text-primary" />Skilled Instructors</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0"><i className="fa fa-arrow-right me-2 text-primary" />Online Classes</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0"><i className="fa fa-arrow-right me-2 text-primary" />International Certificate</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0"><i className="fa fa-arrow-right me-2 text-primary" />Skilled Instructors</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0"><i className="fa fa-arrow-right me-2 text-primary" />Online Classes</p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0"><i className="fa fa-arrow-right me-2 text-primary" />International Certificate</p>
                </div>
              </div>
              <a href="#" className="btn btn-primary text-white mt-2 rounded-2">Read More</a>
            </div>
          </div>

          {/* Instructors Section */}
          <div className='row my-5 text-center'>
            <div className="col-12">
              <h6 className="section-title text-center text-primary px-3">Instructors</h6>
              <h1 className="mb-5">Expert Instructors</h1>
            </div>
            {[...Array(4)].map((_, index) => (
              <div className="col-lg-3 col-md-6 mb-4" key={index}>
                <div className="team-item bg-light">
                  <div className="overflow-hidden">
                    <img className="img-fluid" src="https://themewagon.github.io/elearning/img/team-1.jpg" alt="Instructor" />
                  </div>
                  <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
                    <div className="bg-light d-flex justify-content-center pt-2 px-1">
                      <a className="btn btn-sm-square text-white mx-1" style={{ backgroundColor: "#fe5722" }} href="#"><i className="fab fa-facebook-f text-white" /></a>
                      <a className="btn btn-sm-square text-white mx-1" style={{ backgroundColor: "#fe5722" }} href="#"><i className="fab fa-twitter text-white" /></a>
                      <a className="btn btn-sm-square text-white mx-1" style={{ backgroundColor: "#fe5722" }} href="#"><i className="fab fa-instagram text-white" /></a>
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <h6 className="mb-0">Instructor Name</h6>
                    <small>Designation</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
