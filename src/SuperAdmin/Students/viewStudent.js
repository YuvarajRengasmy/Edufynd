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
      <div className="card border-0 shadow text-bg-white p-4">
        <div className="bg-transparent mb-3 ">
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
                  <p className="card-text text-capitalize fw-bold" ><FaUser style={{color:'#fe5722'}} /> Student Name</p>
                  <p className="card-text text-capitalize fw-bold"><FaPassport  style={{color:'#fe5722'}} /> Passport No</p>
                  <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Expiry Date</p>
                  <p className="card-text text-capitalize fw-bold"><FaFlag   style={{color:'#fe5722'}}/> Citizenship</p>
                </div>
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-light">James Lee</p>
                  <p className="card-text text-capitalize fw-light">NEW123LL</p>
                  <p className="card-text text-capitalize fw-light">28-06-2025</p>
                  <p className="card-text text-capitalize fw-light">Indian</p>
                </div>
                </div>
              
                </div>
             <div className="col-sm-6">
             <div className="d-flex flex-row flex-wrap align-items-start justify-content-around">
             <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaBirthdayCake  style={{color:'#fe5722'}} /> DOB</p>
                    <p className="card-text text-capitalize fw-bold"><FaMale  style={{color:'#fe5722'}} /> Gender</p>
                    <p className="card-text text-capitalize fw-bold"><FaPhone  style={{color:'#fe5722'}} /> Contact Number</p>
                    <p className="card-text text-capitalize fw-bold"><FaWhatsapp  style={{color:'#fe5722'}} /> WhatsApp Number</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-light">17-01-1992</p>
                    <p className="card-text text-capitalize fw-light">Male</p>
                    <p className="card-text text-capitalize fw-light">1234567890</p>
                    <p className="card-text text-capitalize fw-light">09876544321</p>
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
                    <p className="card-text text-capitalize fw-bold"><FaUser  style={{color:'#fe5722'}} /> Do Have Any English Language Test</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport   style={{color:'#fe5722'}}/> english Test Type</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Test Score</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} /> Date Of Test</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> country</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} /> Desired University</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-light">Yes</p>
                    <p className="card-text text-capitalize fw-light">SAT</p>
                    <p className="card-text text-capitalize fw-light">100%</p>
                    <p className="card-text text-capitalize fw-light">05-08-2024</p>
                    <p className="card-text text-capitalize fw-light">America</p>
                    <p className="card-text text-capitalize fw-light">Oxford</p>
                  </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-bold"><FaUser  style={{color:'#fe5722'}} />desired Course</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport  style={{color:'#fe5722'}} /> Work Experience</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Any Visa Rejections</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} /> visa Reason</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Do You Have Travel History</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} />Finance</p>
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                    <p className="card-text text-capitalize fw-light">Game Designing</p>
                    <p className="card-text text-capitalize fw-light">5 Years</p>
                    <p className="card-text text-capitalize fw-light">No</p>
                    <p className="card-text text-capitalize fw-light">Education</p>
                    <p className="card-text text-capitalize fw-light">Yes</p>
                    <p className="card-text text-capitalize fw-light">$300000</p>
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
                    <p className="card-text text-capitalize fw-bold"><FaUser  style={{color:'#fe5722'}} /> Highest Qualification</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport  style={{color:'#fe5722'}} /> Degree Name</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> Start Date</p>
                    <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} /> End Date</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> institution</p>
                   
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                   
                    <p className="card-text text-capitalize fw-light">B.E.Cse</p>
                    <p className="card-text text-capitalize fw-light">PG</p>
                    <p className="card-text text-capitalize fw-light">21-05-2019</p>
                    <p className="card-text text-capitalize fw-light">05-06-2023</p>
                    <p className="card-text text-capitalize fw-light">Anna University</p>
                  </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="d-flex flex-row  align-items-start justify-content-around ">
        <div className="d-flex flex-column align-items-start justify-content-start">
        <p className="card-text text-capitalize fw-bold"><FaFlag  style={{color:'#fe5722'}} /> percentage</p>
                    <p className="card-text text-capitalize fw-bold"><FaUser  style={{color:'#fe5722'}} />Email ID</p>
                    <p className="card-text text-capitalize fw-bold"><FaPassport   style={{color:'#fe5722'}}/> Password</p>
                    <p className="card-text text-capitalize fw-bold"><FaCalendarAlt  style={{color:'#fe5722'}} /> ConfirmPassword</p>
                  
                  </div>
                  <div className="d-flex flex-column align-items-start justify-content-start">
                  <p className="card-text text-capitalize fw-light">93%</p>
                    <p className="card-text text-capitalize fw-light">Student@123gmail.com</p>
                    <p className="card-text text-capitalize fw-light">********</p>
                    <p className="card-text text-capitalize fw-light">********</p>
                   
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
