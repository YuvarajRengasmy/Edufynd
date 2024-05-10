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
          <section className="section profile">
            <div className="row">
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width={"150"} height={"150"} className="rounded-circle" />
                    <h2 className="fw-bold">{student?.name ? student?.name : "-"}</h2>
                    <h5>{student?.email ? student?.email : "-"}</h5>
                    <div className="social-links mt-2">
                      <Link to={student?.twitter} className="twitter mr-4 fs-5"><i className="fab fa-twitter " /></Link>
                      <Link to={student?.facebook} className="facebook mr-4 fs-5"><i className="fab fa-facebook" /></Link>
                      <Link to={student?.instagram} className="instagram mr-4 fs-5"><i className="fab fa-instagram" /></Link>
                      <Link to={student?.linkedIn} className="linkedi mr-4 fs-5"><i className="fab fa-linkedin" /></Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="card">
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
                      <div className="tab-pane fade show active profile-overview" id="profile-overview">
                   
                                        
                                        <div className="row mb-3">
                                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Student Name</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  type="text" className="form-control" id="fullName" value={student?.name} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">PassportNo</label>
                                            <div className="col-md-8 col-lg-9 d-flex">
                                                <input  value={student?.passportNo}  className="form-control" id="company" />
                                                &nbsp; &nbsp; &nbsp; &nbsp;    <input  value={student?.expiryDate} className="form-control" id="company" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">DOB</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input value={student?.dob} className="form-control" id="Job"  />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Citizenship</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Country" value={student?.citizenship} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Gender</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Address" value={student?.gender} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Whatsapp Number</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Email" value={student?.whatsAppNumber} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                English Language Test
                                            </label>
                                            <input className="form-control" id="Email" value={student?.englishLanguageTest} />
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired University </label>
                                            <div className="col-md-8 col-lg-9">
                                             <input  className="form-control" id="Email" value={student?.desiredUniversity} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">DesiredCountry </label>
                                            {student?.country.map((country, index) => (
                                            <div key={index} className="col-md-8 col-lg-9">
                                                <input className="form-control" id="Phone" value={country?.label} />
                                            </div>
                                            ))}
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Course </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Email" value={student?.desiredCourse} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Work Experience</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Twitter" value={student?.workExperience} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                Any visa rejections
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                              <input  className="form-control" id="Twitter" value={student?.visaRejection} />
                                            </div>
                                           
                                           
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                            Do you have a travel history
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                               <input  className="form-control" id="Twitter" value={student?.travelHistory}/>
                                            </div>
                                            <br /><br />
                                          
                                        </div>

                                        <div className="row mb-3">
                                            <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Finance</label>
                                            <div className="col-md-8 col-lg-9">
                                             <select className="form-control" name="campus" >
                                                    <option value="">Self Funding</option>
                                                    <option value="">Loan</option>
                                                </select>

                                            </div>
                                        </div><br/>
                                        <h4>Highest Qualification :</h4>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Degree Name </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Phone" value={student?.degreeName} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Academic Year & Year Passed </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Phone" value={student?.academicYear}  />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Institution</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Phone" value={student?.institution} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Percentage </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input  className="form-control" id="Phone" value={student?.percentage}  />
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