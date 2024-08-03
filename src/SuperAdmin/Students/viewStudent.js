import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [student, setStudent] = useState({});

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
    <>
      <Sidebar />

      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header">
          <div className="container-fluid">
            <h2 className="mb-4 text-center">Student Details</h2>

            <div className="row mb-4">
              <div className="col-md-4 text-center">
                <img
                  src={student?.photo ? student?.photo : "https://via.placeholder.com/150"}
                  alt="Profile Photo"
                  className="img-fluid rounded-circle img-thumbnail"
                  style={{ width: '10rem', height: '10rem' }}
                />
              </div>

              <div className="col-md-4">
                <h3 className="mb-2">{student?.name}</h3>
                <p className="text-muted mb-2">Student Code: {student?.studentCode}</p>
                <p className="text-muted mb-2"><i className="fas fa-envelope me-2"></i>{student?.email}</p>
                <p className="text-muted mb-2"><i className="fas fa-phone-alt me-2"></i>{student?.primaryNumber}</p>
              </div>
              <div className="col-md-4">

                <div className="card card-body border-0 p-4">
                  <h6 className="fw-semibold text-center">Application Submission</h6>
                  <p className="card-text text-center my-2"><Link to='#' className="btn btn-sm px-4 py-2 text-uppercase fw-semibold" data-bs-toggle="modal" data-bs-target="#ApplyStudentUniversity" style={{backgroundColor:'#fe5722',color:'#fff'}}>Apply</Link></p>
                </div>
                <div class="modal fade" id="ApplyStudentUniversity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">University Apply</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form>
      <div class="modal-body">
      <div className="container">
                            
                                <div className="row g-4">
                                   
                                       
                                           
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Country<span className="text-danger">*</span></label>
                                                        <select
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            className="form-select rounded-1 p-2"
                                                            name='campus'
                                                           
                                                        >
                                                            <option>Select Country</option>
                                                           
                                                                    <option ></option>
                                                               
                                                        </select>
                                                      
                                                    </div>
                                              
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Campus<span className="text-danger">*</span></label>
                                                        <select
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            className="form-select rounded-1 p-2"
                                                            name='campus'
                                                           
                                                        >
                                                            <option>Select Campus</option>
                                                           
                                                                    <option ></option>
                                                               
                                                        </select>
                                                      
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>InTake<span className="text-danger">*</span></label>
                                                        <select
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            className="form-select rounded-1 p-2"
                                                           
                                                           
                                                        >
                                                            <option >Select InTake</option>
                                                           
                                                                    <option></option>
                                                              
                                                        </select>
                                                       
                                                    </div>

                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>University Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter University Name"
                                                            name="universityName"
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            disabled
                                                        />
                                                       
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter Name"
                                                          
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                       
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>DOB<span className="text-danger">*</span></label>
                                                        <input
                                                            type="date"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter DOB"
                                                            name="dob"
                                                           
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                      
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Passport No<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter Passport No"
                                                            name="passportNo"
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Email<span className="text-danger">*</span></label>
                                                        <input
                                                            type="email"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter Email"
                                                            name="email"
                                                         
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                     
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Primary Number<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter Primary Number"
                                                            name="primaryNumber"
                                                           
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                      
                                                       
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>WhatsApp Number<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter WhatsApp Number"
                                                            name="whatsAppNumber"
                                                           
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                       
                                                    </div>
                                                   
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Course Type<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter Course Type"
                                                            name="course"
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            disabled
                                                        />
                                                       
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Course Fees<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-1 p-2"
                                                            placeholder="Enter Course Fees"
                                                            name="courseFees"
                                                          
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            disabled
                                                        />
                                                      
                                                    </div>
                                                    <div className=" border-0 d-flex justify-content-center py-3">
                                                     
                                                    </div>
                                              
                                           
                                       
                                   
                                </div>
                           
                        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary text-white px-4 py-2 text-uppercase fw-semibold" style={{fontSize:'12px'}} data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn text-white px-4 py-2 text-uppercase fw-semibold"   style={{ backgroundColor: '#fe5722', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Submit</button>
      </div>
      </form>
    </div>
  </div>
</div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-info-circle me-2"></i> Basic Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Source:</strong> {student?.source}</li>
                    <li className="list-group-item"><strong>Date of Birth:</strong> {student?.dob}</li>
                    <li className="list-group-item"><strong>Passport:</strong> {student?.passportNo}</li>
                    <li className="list-group-item"><strong>Expiry Date:</strong> {student?.expiryDate}</li>
                    <li className="list-group-item"><strong>Citizenship:</strong> {student?.citizenship}</li>
                    <li className="list-group-item"><strong>Gender:</strong> {student?.gender}</li>
                    <li className="list-group-item"><strong>WhatsApp Number:</strong> {student?.whatsAppNumber}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-graduation-cap me-2"></i> Academic Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Highest Qualification:</strong> {student?.highestQualification}</li>
                    <li className="list-group-item"><strong>Degree Name:</strong> {student?.degreeName}</li>
                    <li className="list-group-item"><strong>Institution:</strong> {student?.institution}</li>
                    <li className="list-group-item"><strong>Percentage:</strong> {student?.percentage}</li>
                    <li className="list-group-item"><strong>Academic Year:</strong> {student?.academicYear}</li>
                    <li className="list-group-item"><strong>Year Passed:</strong> {student?.yearPassed}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0"><i className="fas fa-file-alt me-2"></i> Test Type</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.englishTestType}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0"><i className="fas fa-tachometer-alt me-2"></i> Test Score</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.testScore}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0"><i className="fas fa-calendar-day me-2"></i> Date of Test</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.dateOfTest}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-globe me-2"></i> Desired Country</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.desiredCountry}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-university me-2"></i> Desired University</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.desiredUniversity}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-book me-2"></i> Desired Course</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.desiredCourse}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-briefcase me-2"></i> Work Experience</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.workExperience}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-ban me-2"></i> Visa Rejections</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.anyVisaRejections}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-globe-americas me-2"></i> Travel History</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.travelHistory}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-question-circle me-2"></i> Additional Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.additionalInfo}</li>
                  </ul>
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
