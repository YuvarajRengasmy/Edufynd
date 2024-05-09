import React, { useEffect, useState, useRef } from "react";
import CountryRegion from "countryregionjs";
import Select from 'react-select';
import Header from "../Home/HeaderHome";
import EditProfile from "./EditProfile";
import Footer from "../../compoents/Footer";

const Profile = () => {
  

  


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
                    <h2 className="fw-bold">Yuvaraj</h2>
                    <h5>Web Designer</h5>
                    <div className="social-links mt-2">
                      <a href="#" className="twitter mr-4 fs-5"><i className="fab fa-twitter " /></a>
                      <a href="#" className="facebook mr-4 fs-5"><i className="fab fa-facebook" /></a>
                      <a href="#" className="instagram mr-4 fs-5"><i className="fab fa-instagram" /></a>
                      <a href="#" className="linkedi mr-4 fs-5"><i className="fab fa-linkedin" /></a>
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
                                                <input name="fullName" type="text" className="form-control" id="fullName" defaultValue="Kevin Anderson" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">PassportNo</label>
                                            <div className="col-md-8 col-lg-9 d-flex">
                                                <input name="company" value={"WNBSP56432"} type={"text"} className="form-control" id="company" />
                                                &nbsp; &nbsp; &nbsp; &nbsp;    <input name="expxire" type="date" className="form-control" id="company" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">DOB</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="job" type="date" className="form-control" id="Job" value="2021-07-22" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Citizenship</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="country" type="text" className="form-control" id="Country" value="USA" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Gender</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="address" type="text" className="form-control" id="Address" value="male" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Whatsapp Number</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                English Language Test
                                            </label>
                                            <input name="email" type="email" className="form-control" id="Email" value="English" />
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Country </label>
                                            <div className="col-md-8 col-lg-9">
                                             <input name="email" type="email" className="form-control" id="Email" defaultValue="India" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Desired University </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="PES uNIversity" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Course </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="email" type="email" className="form-control" id="Email" defaultValue="MSC" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Work Experience</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="2Year" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                                Any visa rejections
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                              <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="Yes" />
                                            </div>
                                           
                                           
                                        </div>
                                        <div className="row mb-3">
                                            <label style={{ color: '#231F20' }} className="col-md-4 col-lg-3 col-form-label">
                                            Do you have a travel history
                                            </label>
                                            <div className="col-md-8 col-lg-9">
                                               <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="Yes" />
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
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="BE" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Academic Year & Year Passed </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="date" className="form-control" id="Phone" defaultValue="23-08-2020" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Institution</label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="Anna uNIversity" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">Percentage </label>
                                            <div className="col-md-8 col-lg-9">
                                                <input name="phone" type="text" className="form-control" id="Phone" defaultValue="68%" />
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