import React, { useEffect, useState, useRef } from "react";
import Header from "../Agents/AgentHeader";
import Footer from "../Agents/AgentFooter";
const AgentProfile = () => {
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
                          <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Agent ID  </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="job" type="text" className="form-control" id="Job" value="St67543" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Name</label>
                          <div className="col-md-8 col-lg-9 d-flex">
                            <input name="company" value={"Yuvaraj"} type={"text"} className="form-control" id="company" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Business Name</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="job" type="text" className="form-control" id="Job" value="Study Job Service" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Address</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="country" type="text" className="form-control" id="Country" value="17/3A2, Gandhi St,Alwartirunagar, Chennai - 600087,Tamil Nadu, India." />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Email ID</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="address" type="text" className="form-control" id="Address" value="rajaram123@gmail.com" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">PAN Number of Individual</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="phone" type="text" className="form-control" id="Phone" value="APFPY9543N" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Primary Number</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Whats App Number</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">PAN of Company </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value="Afynd Setvice Pvt.Ltd" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">GSTN </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value="33SC56FTYB890QW" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">INC </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value="Yes" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Course </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                        <form>
                          <div className="row mb-3">
                            <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                            <div className="col-md-8 col-lg-9">
                              <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width={"150"} height={"150"} alt="Profile" />
                              <div className="pt-2">
                                <a href="#" className="btn btn-primary btn-sm mr-4" title="Upload new profile image"><i className="bi bi-upload" /></a>
                                <a href="#" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash" /></a>
                              </div>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Name</label>
                            <div className="col-md-8 col-lg-9 d-flex">
                              <input name="company" type={"text"} className="form-control" id="company" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Business Name</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="job" type="text" className="form-control" id="Job" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Country" className="col-md-4 col-lg-3 col-form-label">Address</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="country" type="text" className="form-control" id="Country" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Address" className="col-md-4 col-lg-3 col-form-label">Email ID</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="address" type="text" className="form-control" id="Address" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">PAN Number of Individual</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="phone" type="text" className="form-control" id="Phone" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Primary Number</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="email" type="email" className="form-control" id="Email" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Whats App Number</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="email" type="email" className="form-control" id="Email" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">PAN of Company </label>
                            <div className="col-md-8 col-lg-9">
                              <input name="email" type="email" className="form-control" id="Email" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">GSTN </label>
                            <div className="col-md-8 col-lg-9">
                              <input name="email" type="email" className="form-control" id="Email" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">INC </label>
                            <div className="col-md-8 col-lg-9">
                              <input name="email" type="email" className="form-control" id="Email" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">Desired Course </label>
                            <div className="col-md-8 col-lg-9">
                              <input name="email" type="email" className="form-control" id="Email" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="twitter" type="text" className="form-control" id="Twitter" defaultValue="https://twitter.com/#" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="facebook" type="text" className="form-control" id="Facebook" defaultValue="https://facebook.com/#" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="instagram" type="text" className="form-control" id="Instagram" defaultValue="https://instagram.com/#" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="linkedin" type="text" className="form-control" id="Linkedin" defaultValue="https://linkedin.com/#" />
                            </div>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane fade pt-3" id="profile-settings">
                        <form>
                          <div className="row mb-3">
                            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
                            <div className="col-md-8 col-lg-9">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked />
                                <label className="form-check-label" htmlFor="changesMade">
                                  Changes made to your account
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked />
                                <label className="form-check-label" htmlFor="newProducts">
                                  Information on new products and services
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="proOffers" />
                                <label className="form-check-label" htmlFor="proOffers">
                                  Marketing and promo offers
                                </label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled />
                                <label className="form-check-label" htmlFor="securityNotify">
                                  Security alerts
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane fade pt-3" id="profile-change-password">
                        <form>
                          <div className="row mb-3">
                            <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="password" type="password" className="form-control" id="currentPassword" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="newpassword" type="password" className="form-control" id="newPassword" />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                            <div className="col-md-8 col-lg-9">
                              <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                            </div>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary">Change Password</button>
                          </div>
                        </form>
                      </div>
                    </div>
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
export default AgentProfile;