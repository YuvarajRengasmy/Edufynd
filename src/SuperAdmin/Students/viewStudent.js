import React, { useState, useEffect } from "react";
import { getSingleStudent } from "../../api/student";
import { Link, useLocation } from "react-router-dom";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";


import { FaUser, FaPassport, FaCalendarAlt, FaFlag, FaBirthdayCake, FaMale, FaPhone, FaWhatsapp } from 'react-icons/fa';
function Profile() {
   
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [student, setStudent] = useState();
  const pageSize = 5;
 
  
  useEffect(() => {
      getStudentDetails();
  }, []);


  const getStudentDetails = () => {
    getSingleStudent(id)
          .then((res) => {
              setStudent(res?.data?.result);
          })
          .catch((err) => {
              console.log(err);
          });
  };

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
                src={student?.photo?student?.photo:"https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"}
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
                  <p className="card-text text-capitalize fw-light">{student?.name}</p>
                  <p className="card-text text-capitalize fw-light">{student?.passportNo}</p>
                  <p className="card-text text-capitalize fw-light">{student?.expiryDate}</p>
                  <p className="card-text text-capitalize fw-light">{student?.citizenship}</p>
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
                    <p className="card-text text-capitalize fw-light">{student?.dob}</p>
                    <p className="card-text text-capitalize fw-light">{student?.gender}</p>
                    <p className="card-text text-capitalize fw-light">{student?.mobileNumber}</p>
                    <p className="card-text text-capitalize fw-light">{student?.whatsAppNumber}</p>
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
                    <p className="card-text text-capitalize fw-light">{student?.doHaveAnyEnglishLanguageTest}</p>
                    <p className="card-text text-capitalize fw-light">{student?.englishTestType}</p>
                    <p className="card-text text-capitalize fw-light">{student?.testScore}</p>
                    <p className="card-text text-capitalize fw-light">{student?.dateOfTest}</p>
                    <p className="card-text text-capitalize fw-light">{student?.country}</p>
                    <p className="card-text text-capitalize fw-light">{student?.desiredUniversity}</p>
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
                    <p className="card-text text-capitalize fw-light">{student?.desiredCourse}</p>
                    <p className="card-text text-capitalize fw-light">{student?.workExperience}</p>
                    <p className="card-text text-capitalize fw-light">{student?.anyVisaRejections?"yes":"No"}</p>
                    <p className="card-text text-capitalize fw-light">{student?.visaReason?student?.visaReason:"No"}</p>
                    <p className="card-text text-capitalize fw-light">{student?.doYouHaveTravelHistory?"yes":"No"}</p>
                    <p className="card-text text-capitalize fw-light">{student?.finance}</p>
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
                   
                    <p className="card-text text-capitalize fw-light">{student?.highestQualification}</p>
                    <p className="card-text text-capitalize fw-light">{student?.degreeName}</p>
                    <p className="card-text text-capitalize fw-light">{student?.academicYear}</p>
                    <p className="card-text text-capitalize fw-light">{student?.yearPassed}</p>
                    <p className="card-text text-capitalize fw-light">{student?.institution}</p>
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
                  <p className="card-text text-capitalize fw-light">{student?.percentage}</p>
                    <p className="card-text text-capitalize fw-light">{student?.email}</p>
                    <p className="card-text text-capitalize fw-light">{student?.password}</p>
                    <p className="card-text text-capitalize fw-light">{student?.confirmPassword}</p>
                   
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
