import React, { useEffect, useState, useRef } from "react";
import { getSingleStudent } from "../../api/student";
import {getStudentId } from "../../Utils/storage";
import { getMonthYear} from "../../Utils/DateFormat";
import { Link } from 'react-router-dom'

import Header from "../Home/HeaderHome";
import EditProfile from "./EditProfile";
import Footer from "../../compoents/Footer";

const Profile = () => {

  const [student, setStudent] = useState(null);
  const [currentView, setCurrentView] = useState('profile');

  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = () => {
    const id = getStudentId();
    console.log("id", id);
    getSingleStudent(id)
      .then((res) => {
        console.log("yuvi",res);
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Header />
        <br /> <br />
        <main id="main" className="main mt-5 ">
          <div className="pagetitle ">
          </div>
          <section className="container-fluid section profile">
            <div className="row g-4">
              <div className="col-xl-4">
                <div className="card border-0 shadow">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width={"150"} height={"150"} className="img-fluid rounded-circle mx-auto d-block" />
                    <h2 className="fw-bold">{student?.name ? student?.name : "-"}</h2>
                    <h5>{student?.email ? student?.email : "-"}</h5>
                    <div className="social-links mt-2">
                      <Link to={student?.twitter} className="twitter mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-twitter " /></Link>
                      <Link to={student?.facebook} className="facebook mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-facebook" /></Link>
                      <Link to={student?.instagram} className="instagram mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-instagram" /></Link>
                      <Link to={student?.linkedIn} className="linkedi mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-linkedin" /></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="card border-0 shadow">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button className="nav-link active fw-bold" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link fw-bold" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link fw-bold" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link fw-bold" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                      </li>
                    </ul>
                    <div className="tab-content pt-2">
                      <div className="tab-pane fade show active profile-overview p-2" id="profile-overview">
                   
                      <div className="row mb-3">
                      <div className="col">
                                            <label htmlFor="fullName" className="form-label fw-semibold">Student Code</label>
                                           
                                                <input  type="text" className="form-control " id="fullName" value={student?.studentCode} />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="fullName" className="form-label fw-semibold">Student Name</label>
                                            
                                                <input  type="text" className="form-control " id="fullName" value={student?.name} />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="company" className="form-label fw-semibold">PassportNo</label>
                                          
                                                <input  value={student?.passportNo}  className="form-control " id="company" />
                                                &nbsp; &nbsp; &nbsp; &nbsp;    <input  value={student?.expiryDate} className="form-control " id="company" />
                                            </div>
                                        </div>
                                      
                                       
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Job" className="form-label fw-semibold">DOB</label>
                                            
                                                <input value={student?.dob} className="form-control " id="Job"  />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Country" className="form-label fw-semibold">Citizenship</label>
                                            
                                                <input  className="form-control " id="Country" value={student?.citizenship} />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Address" className="form-label fw-semibold">Gender</label>
                                            
                                                <input  className="form-control " id="Address" value={student?.gender} />
                                            </div>
                                        </div>
                                    
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">E-Mail</label>
                                           
                                                <input  className="form-control " id="Email" value={student?.whatsAppNumber} />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">Primary Number</label>
                                           
                                                <input  className="form-control " id="Email" value={student?.whatsAppNumber} />
                                            </div>
                                        <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">Whatsapp Number</label>
                                           
                                                <input  className="form-control " id="Email" value={student?.whatsAppNumber} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label style={{ color: '#231F20' }} className="form-label fw-semibold">
                                                English Language Test
                                            </label>
                                            {currentView === 'feed' ? (
                                            <input className="form-control " id="Email" value={student?.englishLanguageTest} />
                                            ) : (
                                           
                                            <div className=" d-flex col-md-12 col-lg-9 gap-5">
                                              <label className="form-label fw-semiold">English Test Type
                                                <input  className="form-control " id="Email" value={student?.englishTestType} /></label>
                                                <label>TestScore<input  className="form-control " id="Email" value={student?.testScore} /></label>
                                                <label>TestDate <input  className="form-control " id="Email" value={student?.dateOfTest} /></label>
                                               
                                            </div>
                                         
                                            
                                            )}
                                        </div>
                                        </div>
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">Desired University </label>
                                           
                                             <input  className="form-control " id="Email" value={student?.desiredUniversity} />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Desired Country </label>
                                            {student?.country.map((country, index) => (
                                            <div key={index} >
                                                <input className="form-control " id="Phone" value={country?.label} />
                                            </div>
                                            ))}
                                        </div>
                                        <div className="col">
                                            <label htmlFor="Email" className="form-label fw-semibold">Desired Course </label>
                                          
                                                <input  className="form-control " id="Email" value={student?.desiredCourse} />
                                            </div>
                                        </div>
                                      
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Twitter" className="form-label fw-semibold">Work Experience</label>
                                            
                                                <input  className="form-control " id="Twitter" value={student?.workExperience} />
                                            </div>
                                            <div className="col">
                                            <label style={{ color: '#231F20' }} className="form-label fw-semibold">
                                                Any visa rejections
                                            </label>
                                           
                                              <input  className="form-control " id="Twitter" value={student?.visaReason ? student?.visaReason : "no"} />
                                            </div>
                                            <div className="col">
                                            <label style={{ color: '#231F20' }} className="form-label fw-semibold">
                                            Do you have a travel history
                                            </label>
                                            
                                               <input  className="form-control " id="Twitter" value={student?.travelReason? student?.travelReason : "no"}/>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-3">
                                       
                                            <div className="col">
                                            <label htmlFor="Linkedin" className="form-label fw-semibold">Finance</label>
                                        
                                             <select className="form-control " name="campus" >
                                                    <option value="">Self Funding</option>
                                                    <option value="">Loan</option>
                                                </select>

                                            </div>
                                            
                                            <div className="col">
                                            <label htmlFor="Linkedin" className="form-label fw-semibold">Finance</label>
                                        
                                             <select className="form-control " name="campus" >
                                                    <option value="">Self Funding</option>
                                                    <option value="">Loan</option>
                                                </select>

                                            </div>
                                            
                                            <div className="col">
                                            <label htmlFor="Linkedin" className="form-label fw-semibold">Finance</label>
                                        
                                             <select className="form-control " name="campus" >
                                                    <option value="">Self Funding</option>
                                                    <option value="">Loan</option>
                                                </select>

                                            </div>
                                            <br />
                                          
                                        </div>

                                      
                                        <h4>Highest Qualification :</h4>
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Degree Name </label>
                                            
                                                <input  className="form-control " id="Phone" value={student?.degreeName} />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Academic Year & Year Passed </label>
                                            
                                                <input  className="form-control " id="Phone" value={student?.academicYear}  />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Institution</label>
                                           
                                                <input  className="form-control " id="Phone" value={student?.institution} />
                                            </div>
                                           
                                        </div>
                                        <div className="row mb-3">
                                        <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Percentage </label>
                                          
                                                <input  className="form-control " id="Phone" value={student?.percentage}  />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Percentage </label>
                                          
                                                <input  className="form-control " id="Phone" value={student?.percentage}  />
                                            </div>
                                            <div className="col">
                                            <label htmlFor="Phone" className="form-label fw-semibold">Percentage </label>
                                          
                                                <input  className="form-control " id="Phone" value={student?.percentage}  />
                                            </div>
                                        </div>
                                       
                                        
                                   
                      </div>
                     
                     
                    </div>
                    <EditProfile />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
export default Profile;