import React from "react";
import Sidebar from "../../compoents/sidebar";

import { FaUser, FaPassport, FaCalendarAlt, FaFlag, FaBirthdayCake, FaMale, FaPhone, FaWhatsapp } from 'react-icons/fa';

function Profile() {
  return (
    < >
      <div>
        <Sidebar />

        <div className="content-wrapper" style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="content-header">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card border-0 shadow-sm rounded-0 text-bg-white p-4">
                    <div className="bg-transparent mb-3">
                      <div className="row g-0 ">
                        <div className="col-md-12 ">
                          <img
                            src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                            style={{ width: '150px', height: '150px' }}
                            className="img-fluid rounded-pill "
                            alt="student_image"
                          />
                        </div>
                        <div className="col-md-12 align-self-center ">
                          <div className="row g-4 " >
                            <div className="col-sm-6">
                              <div className="d-flex flex-column align-items-start justify-content-start">
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Source</p>
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Student Name</p>
                                <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Citizenship</p>
                                <p className="card-text text-capitalize fw-bold"><FaBirthdayCake style={{ color: '#fe5722' }} /> DOB</p>
                                <p className="card-text text-capitalize fw-bold"><FaPassport style={{ color: '#fe5722' }} /> Passport No</p>
                                <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Expiry Date</p>
                                <p className="card-text text-capitalize fw-bold"><FaMale style={{ color: '#fe5722' }} /> Gender</p>
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Email ID</p>
                                <p className="card-text text-capitalize fw-bold"><FaPhone style={{ color: '#fe5722' }} /> Primary Number</p>
                                <p className="card-text text-capitalize fw-bold"><FaWhatsapp style={{ color: '#fe5722' }} /> WhatsApp Number</p>
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Highest Qualification</p>
                                <p className="card-text text-capitalize fw-bold"><FaPassport style={{ color: '#fe5722' }} /> Degree Name</p>
                                <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Percentage</p>
                                <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Institution</p>
                                <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Start Date</p>
                                <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> End Date</p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex flex-column align-items-start justify-content-start">
                                <p className="card-text text-capitalize fw-light">Agent</p>
                                <p className="card-text text-capitalize fw-light">James Lee</p>
                                <p className="card-text text-capitalize fw-light">Indian</p>
                                <p className="card-text text-capitalize fw-light">01-01-1990</p>
                                <p className="card-text text-capitalize fw-light">NEW123LL</p>
                                <p className="card-text text-capitalize fw-light">28-06-2025</p>
                                <p className="card-text text-capitalize fw-light">Male</p>
                                <p className="card-text text-capitalize fw-light">james.lee@example.com</p>
                                <p className="card-text text-capitalize fw-light">+1234567890</p>
                                <p className="card-text text-capitalize fw-light">+1234567890</p>
                                <p className="card-text text-capitalize fw-light">Bachelor's Degree</p>
                                <p className="card-text text-capitalize fw-light">Computer Science</p>
                                <p className="card-text text-capitalize fw-light">85%</p>
                                <p className="card-text text-capitalize fw-light">XYZ University</p>
                                <p className="card-text text-capitalize fw-light">01-09-2010</p>
                                <p className="card-text text-capitalize fw-light">01-06-2014</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-4 rounded-2" />
                    <div className="header bg-none">
                      <h5>Work Experience</h5>
                      <div className="container my-3 text-center">
                        <div className="row g-3">
                          <div className="col-md-6 ">
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Duration</p>
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Last Employer</p>
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Last Designation</p>
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Do You Have Any English Language Test</p>
                              <p className="card-text text-capitalize fw-bold"><FaPassport style={{ color: '#fe5722' }} /> English Test Type</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Test Score</p>
                              <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Date Of Test</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Do You Have Travel History</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Travel Date</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Purpose</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Country</p>
                              <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Any Visa Rejections</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Reason</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Desired University</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Desired Country</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Desired Course</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> How Do You Plan to Fund Your Education</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Work Experience</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <p className="card-text text-capitalize fw-light">2 years</p>
                              <p className="card-text text-capitalize fw-light">ABC Corp</p>
                              <p className="card-text text-capitalize fw-light">Software Engineer</p>
                              <p className="card-text text-capitalize fw-light">Yes</p>
                              <p className="card-text text-capitalize fw-light">IELTS</p>
                              <p className="card-text text-capitalize fw-light">8.0</p>
                              <p className="card-text text-capitalize fw-light">01-01-2020</p>
                              <p className="card-text text-capitalize fw-light">Yes</p>
                              <p className="card-text text-capitalize fw-light">01-01-2019</p>
                              <p className="card-text text-capitalize fw-light">Business</p>
                              <p className="card-text text-capitalize fw-light">USA</p>
                              <p className="card-text text-capitalize fw-light">None</p>
                              <p className="card-text text-capitalize fw-light"></p>
                              <p className="card-text text-capitalize fw-light">Stanford University</p>
                              <p className="card-text text-capitalize fw-light">USA</p>
                              <p className="card-text text-capitalize fw-light">MSc Computer Science</p>
                              <p className="card-text text-capitalize fw-light">Self-funded</p>
                              <p className="card-text text-capitalize fw-light">3 years</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default Profile;
