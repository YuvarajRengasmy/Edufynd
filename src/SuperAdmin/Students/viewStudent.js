import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { useLocation } from "react-router-dom";


function Profile() {


  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [student, setStudent] = useState([]);

  useEffect(() => {
    getStudentDetails();
  }, []);
  const getStudentDetails = () => {
    getSingleStudent(id)
      .then((res) => {
        console.log(res);
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <>
      <div>
        <Sidebar />

        <div className="content-wrapper" style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="content-header">


        
          <div class="container mt-4">
        <h2 class="mb-4">Student Details</h2>

      
        <div class="row mb-4 align-items-center">
            <div class="col-md-3 text-center">
                <img src={student?.photo?student?.photo:"https://via.placeholder.com/150"} alt="Profile Photo" class="profile-img rounded-circle border" style={{width:'150px',height:'150px'}}/>
                <h5 class="mt-2">John Doe</h5>
                <p class="text-muted">Student Code: Auto Generated</p>
            </div>
            <div class="col-md-9">
                <div class="row g-3">
                    <div class="col-md-6">
                        <div class="card p-3 border-primary">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-passport  card-icon" ></i> Passport No</h5>
                                <p class="card-text">AB123456</p>
                                <h6 class="mt-3"><i class="fas fa-calendar-alt card-icon"></i> Expiry Date</h6>
                                <p class="card-text">2025-12-31</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-3 border-primary">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-birthday-cake card-icon"></i> Date of Birth</h5>
                                <p class="card-text">1995-01-01</p>
                                <h6 class="mt-3"><i class="fas fa-flag card-icon"></i> Citizenship</h6>
                                <p class="card-text">USA</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-3 border-primary">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-genderless card-icon"></i> Gender</h5>
                                <p class="card-text">Male</p>
                                <h6 class="mt-3"><i class="fas fa-envelope card-icon"></i> Email ID</h6>
                                <p class="card-text">john.doe@example.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card p-3 border-primary">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-phone-alt card-icon"></i> Contact Number</h5>
                                <p class="card-text">+1 234 567 890 (Primary)</p>
                                <p class="card-text">+1 234 567 891 (WhatsApp)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      
        <h3 class="mb-3">Highest Qualification</h3>
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="card p-3 border-success">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-graduation-cap card-icon"></i> Degree Name</h5>
                        <p class="card-text">Bachelor of Science</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 border-success">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-calendar card-icon"></i> Academic Year & Year Passed</h5>
                        <p class="card-text">2015 - 2019</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 border-success">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-school card-icon"></i> Institution</h5>
                        <p class="card-text">ABC University</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 border-success">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-percent card-icon"></i> Percentage</h5>
                        <p class="card-text">85%</p>
                    </div>
                </div>
            </div>
        </div>

        
        <h3 class="mb-3">English Language Test</h3>
        <div class="row g-3 mb-4">
            <div class="col-md-6">
                <div class="card p-3 border-warning">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-file-alt card-icon"></i> Test Taken</h5>
                        <p class="card-text">IELTS</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 border-warning">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-tachometer-alt card-icon"></i> Test Score</h5>
                        <p class="card-text">8.0</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card p-3 border-warning">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-calendar-day card-icon"></i> Date of Test</h5>
                        <p class="card-text">2024-01-01</p>
                    </div>
                </div>
            </div>
        </div>

       
        <h3 class="mb-3">Desired Information</h3>
        <div class="row g-3 mb-4">
            <div class="col-md-4">
                <div class="card p-3 border-info">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-globe card-icon"></i> Desired Country</h5>
                        <p class="card-text">USA</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3 border-info">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-university card-icon"></i> Desired University</h5>
                        <p class="card-text">XYZ University</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3 border-info">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-book card-icon"></i> Desired Course</h5>
                        <p class="card-text">Computer Science</p>
                    </div>
                </div>
            </div>
        </div>

      
        <h3 class="mb-3">Work Experience & Additional Information</h3>
        <div class="row g-3 mb-4">
            <div class="col-md-6">
                <div class="card p-3 border-danger">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-briefcase card-icon"></i> Work Experience</h5>
                        <p class="card-text">3 years at ABC Company</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card p-3 border-danger">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-ban card-icon"></i> Visa Rejections</h5>
                        <p class="card-text">No</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card p-3 border-danger">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-globe-americas card-icon"></i> Travel History</h5>
                        <p class="card-text">Yes</p>
                        <p class="card-text">Visited Canada in 2023</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card p-3 border-danger">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-money-bill card-icon"></i> Finance</h5>
                        <p class="card-text">Self Funding</p>
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
