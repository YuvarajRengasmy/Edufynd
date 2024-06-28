import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";

import { FaUser, FaPassport, FaCalendarAlt, FaFlag, FaBirthdayCake, FaMale, FaPhone, FaWhatsapp } from 'react-icons/fa';
function Profile() {
   

    return (
        <div style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class=" navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    </nav>
                <nav className="navbar navbar-top navbar-expand">
                    <Header />
                    </nav>
          
            <div className="content-wrapper"  >
            <div className="container-fluid p-4">
  <div className="row">
    <div className="col">
      <div className="card border-0 text-bg-primary p-4">
        <div className="bg-transparent mb-3 text-white">
          <div className="row g-0">
            <div className="col-md-3 text-center">
              <img
                src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                style={{ width: '150px', height: '150px' }}
                className="img-fluid rounded-pill mx-auto d-block"
                alt="student_image"
              />
            </div>
            <div className="col-md-9">
                <div className="row g-4">
                <div className="col-sm-6">
                <div className="d-flex flex-row flex-wrap align-items-start justify-content-around">
                
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-bold"><FaUser /> Student Name</p>
                  <p className="card-text text-capitalize fw-bold"><FaPassport /> Passport No</p>
                  <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> Expiry Date</p>
                  <p className="card-text text-capitalize fw-bold"><FaFlag /> Citizenship</p>
                </div>
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-semibold">James Lee</p>
                  <p className="card-text text-capitalize fw-semibold">NEW123LL</p>
                  <p className="card-text text-capitalize fw-semibold">28-06-2025</p>
                  <p className="card-text text-capitalize fw-semibold">Indian</p>
                </div>
                </div>
              
                </div>
             <div className="col-sm-6">
             <div className="d-flex flex-row flex-wrap align-items-start justify-content-around">
             <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaBirthdayCake /> DOB</p>
                    <p className="card-text text-capitalize fw-bold"><FaMale /> Gender</p>
                    <p className="card-text text-capitalize fw-bold"><FaPhone /> Contact Number</p>
                    <p className="card-text text-capitalize fw-bold"><FaWhatsapp /> WhatsApp Number</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-semibold">17-01-1992</p>
                    <p className="card-text text-capitalize fw-semibold">Male</p>
                    <p className="card-text text-capitalize fw-semibold">1234567890</p>
                    <p className="card-text text-capitalize fw-semibold">09876544321</p>
                  </div>
             </div>
              
                
               
              </div>
                </div>
                
            </div>
          </div>
        </div>
        <hr className="border-4 rounded-2"/>
<div className="header bg-none ">
    <h5>Student Course Details</h5>
    <div className="container my-3">
        <div className="row g-3">
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaUser /> Do Have Any English Language Test</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport /> english Test Type</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> Test Score</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag /> Date Of Test</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> country</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag /> desired University</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-semibold">Yes</p>
                    <p className="card-text text-capitalize fw-semibold">SAT</p>
                    <p className="card-text text-capitalize fw-semibold">100%</p>
                    <p className="card-text text-capitalize fw-semibold">05-08-2024</p>
                    <p className="card-text text-capitalize fw-semibold">America</p>
                    <p className="card-text text-capitalize fw-semibold">Oxford</p>
                  </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaUser />desired Course</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport /> Work Experience</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> Any Visa Rejections</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag /> visa Reason</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> Do You Have Travel History</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag />Finance</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-semibold">Game Designing</p>
                    <p className="card-text text-capitalize fw-semibold">5 Years</p>
                    <p className="card-text text-capitalize fw-semibold">No</p>
                    <p className="card-text text-capitalize fw-semibold">Education</p>
                    <p className="card-text text-capitalize fw-semibold">Yes</p>
                    <p className="card-text text-capitalize fw-semibold">$300000</p>
                  </div>
                  </div>
        </div>
        </div>
    </div>
   
       
  
  
                
    
    </div>
    <hr className="border-4 rounded-2"/>
<div className="header bg-none ">
    <h5 >Student Academic Details</h5>
    <div className="container my-3">
        <div className="row g-3">
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaUser /> Highest Qualification</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport /> Degree Name</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> Start Date</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag /> End Date</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> institution</p>
                   
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                   
                    <p className="card-text text-capitalize fw-semibold">B.E.Cse</p>
                    <p className="card-text text-capitalize fw-semibold">PG</p>
                    <p className="card-text text-capitalize fw-semibold">21-05-2019</p>
                    <p className="card-text text-capitalize fw-semibold">05-06-2023</p>
                    <p className="card-text text-capitalize fw-semibold">Anna University</p>
                  </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
        <p className="card-text text-capitalize fw-bold"><FaFlag /> percentage</p>
                    <p className="card-text text-capitalize fw-bold"><FaUser />Email ID</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport /> Password</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt /> ConfirmPassword</p>
                  
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-semibold">93%</p>
                    <p className="card-text text-capitalize fw-semibold">Student@123gmail.com</p>
                    <p className="card-text text-capitalize fw-semibold">********</p>
                    <p className="card-text text-capitalize fw-semibold">********</p>
                   
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
        </div>
        
    );
}
export default Profile;
