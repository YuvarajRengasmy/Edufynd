import React, { useEffect, useState, useRef } from "react";
import { getSingleAgent } from "../../api/agent";
import {getAgentId } from "../../Utils/storage";
import Header from "../Agents/AgentHeader";
import Footer from "../Agents/AgentFooter";
const AgentProfile = () => {

  const [agent, setAgent] = useState(null);
  const [currentView, setCurrentView] = useState('profile');

  useEffect(() => {
    getAgentDetails();
  }, []);

  const getAgentDetails = () => {
    const id = getAgentId();
    console.log("id", id);
    getSingleAgent(id)
      .then((res) => {
        setAgent(res?.data?.result);
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
          <section className= "container-fluid section profile" style={{ backgroundColor: '#fff',fontSize:'14px' }}>
            <div className="row g-4">
              <div className="col-xl-4">
                <div className="card border-0 shadow">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width={"150"} height={"150"} className="img-fluid rounded-pill" />
                    <h2 className="fw-bold">Yuvaraj</h2>
                    <div className="social-links mt-2">
                      <a href="#" className="twitter mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-twitter " /></a>
                      <a href="#" className="facebook mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-facebook" /></a>
                      <a href="#" className="instagram mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-instagram" /></a>
                      <a href="#" className="linkedi mr-4 fs-5" style={{color:'#fe5722'}}><i className="fab fa-linkedin" /></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="card border-0 shadow">
                  <div className="card-body pt-3">
                    <ul className="nav nav-tabs nav-tabs-bordered">
                      <li className="nav-item">
                        <button className="nav-link active fw-normal" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link fw-normal" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link fw-normal" data-bs-toggle="tab" data-bs-target="#profile-settings">Settings</button>
                      </li>
                      <li className="nav-item">
                        <button className="nav-link fw-normal" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                      </li>
                    </ul>
                    <div className="tab-content pt-2 ">
                      <div className="tab-pane fade show active profile-overview p-2" id="profile-overview">
                        <div className="row mb-3">
                           <div className="col">
                          <label htmlFor="Job" className=" form-label fw-semibold ">Agent ID  </label>
                         
                            <input name="job" type="text" className="form-control" id="Job" value={agent?.agentCode}/>
                          </div>
                          <div className="col">
                          <label htmlFor="company" className="form-label fw-semibold">Name</label>
                         
                            <input name="company" value={agent?.agentName} type={"text"} className="form-control" id="company" />
                          </div>

                          <div className="col">
                          <label htmlFor="Job" className="form-label fw-semibold">Business Name</label>
                         
                            <input name="job" type="text" className="form-control" id="Job" value={agent?.businessName} />
                          </div>
                        </div>
                        <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="Address" className="form-label fw-semibold">Email ID</label>
                         
                            <input name="address" type="text" className="form-control" id="Address" value={agent?.email} />
                          </div>
                      
                          <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">Primary Number</label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value={agent?.mobileNumber} />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">Whats App Number</label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value={agent?.whatsappNumber} />
                          </div>

                        </div>
                        <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="Phone" className="form-label fw-semibold">Staff Name</label>
                         
                            <input name="phone" type="text" className="form-control" id="Phone" value={agent?.staffName} />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">Staff Number </label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value={agent?.staffContactNo} />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">Pan Number Individual  </label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value={agent?.panNumberIndividual} />
                          </div>
                        </div>


                        <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">Country Interested </label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value={agent?.countryInterested} />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">	Agent Business Logo </label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label fw-semibold">	Agent Business Logo </label>
                         
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                        </div>

                        <div className="row mb-3">
                           <div className="col">
                          <label htmlFor="Country" className="form-label fw-semibold">Address</label>
                         
                            <input name="country" type="text" className="form-control" id="Country" value={agent?. addressLine1} />
                          </div>
                        </div>
                        
                        
                       
                        <div className="row mb-3">
                         
                        </div>
                        <div className="row mb-3">
                        
                        </div>
                        <div className="row mb-3">
                           
                        </div>
                        <div className="row mb-3">
                           
                        </div>
                      </div>
                      <div className="tab-content ">
                      <div className="tab-pane fade show  profile-edit" id="profile-edit">
                        
                        <div className="row mb-3">
                         
                          <div className="col ">
                          <label htmlFor="company" className="form-label">Name</label>
                            <input name="agentName" value={agent?.agentName} type="text" className="form-control" id="company" />
                            {errors.agentName.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                          
                          </div>
                          <div className="col">
                          <label htmlFor="Job" className="form-label">Business Name</label>
                            <input name="businessName" type="text" className="form-control" id="Job" value="Study Job Service" />
                            {errors.businessName.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                         
                          </div>
                          <div className="col">
                          <label htmlFor="Country" className="form-label">Address Line1</label>
                            <input name="addressLine1" type="text" className="form-control" id="Country" value="17/3A2, Gandhi St,Alwartirunagar, Chennai - 600087,Tamil Nadu, India." />
                            {errors.addressLine1.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                          
                          </div>
                        </div>
                        <div className="row mb-3">
                         
                        
                         
                          <div className="col">
                          <label htmlFor="Country" className="form-label">Address Line2</label>
                            <input name="addressLine2" type="text" className="form-control" id="Country" value="17/3A2, Gandhi St,Alwartirunagar, Chennai - 600087,Tamil Nadu, India." />
                            {errors.addressLine2.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                          
                          </div>
                          <div className="col">
                          <label htmlFor="Country" className="form-label">Address Line3</label>
                            <input name="addressLine3" type="text" className="form-control" id="Country" value="17/3A2, Gandhi St,Alwartirunagar, Chennai - 600087,Tamil Nadu, India." />
                            {errors.addressLine3.required ? (
                                                    <span className="form-text text-danger">
                                                        This field is required.
                                                    </span>
                                                ) : null}
                          
                          </div>
                          <div className="col">
                          <label htmlFor="Address" className="form-label">Email ID</label>
                            <input name="address" type="text" className="form-control" id="Address" value="rajaram123@gmail.com" />
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          
                          
                        
                          <div className="col">
                          <label htmlFor="Phone" className="form-label">PAN Number of Individual</label>
                            <input name="phone" type="text" className="form-control" id="Phone" value="APFPY9543N" />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label">Primary Number</label>
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label">Whats App Number</label>
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                        </div>
                        
                        
                       
                        <div className="row mb-3">
                         
                          <div className="col">
                          <label htmlFor="Email" className="form-label">PAN of Company </label>
                            <input name="email" type="email" className="form-control" id="Email" value="Afynd Setvice Pvt.Ltd" />
                          </div>
                           <div className="col">
                          <label htmlFor="Email" className="form-label">GSTN </label>
                            <input name="email" type="email" className="form-control" id="Email" value="33SC56FTYB890QW" />
                          </div>
                          <div className="col">
                          <label htmlFor="Email" className="form-label">INC </label>
                            <input name="email" type="email" className="form-control" id="Email" value="Yes" />
                          </div>
                        </div>
                       
                        <div className="row mb-3">
                          
                          <div className="col">
                          <label htmlFor="Email" className="form-label">Desired Course </label>
                            <input name="email" type="email" className="form-control" id="Email" value="9876543210" />
                          </div>
                        </div>
                      </div>
                     
                    </div>
                      <div className="tab-pane fade pt-3" id="profile-settings">
                        <form>
                          <div className="row mb-3">
                             <div className="col">
                            <label htmlFor="fullName" className="form-label fw-semibold">Email Notifications</label>
                           
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
                            <button type="submit" className="btn" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save Changes</button>
                          </div>
                        </form>
                      </div>
                      <div className="tab-pane fade pt-3" id="profile-change-password">
                        <form>
                          <div className="row mb-3">
                             <div className="col">
                            <label htmlFor="currentPassword" className="form-label fw-semibold">Current Password</label>
                           
                              <input name="password" type="password" className="form-control" id="currentPassword" />
                            </div>
                            <div className="col">
                            <label htmlFor="newPassword" className="form-label fw-semibold">New Password</label>
                           
                              <input name="newpassword" type="password" className="form-control" id="newPassword" />
                            </div>
                            <div className="col">
                            <label htmlFor="renewPassword" className="form-label fw-semibold">Re-enter New Password</label>
                           
                              <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                            </div>
                          </div>
                         
                          <div className="text-center">
                            <button type="submit" className="btn "style={{backgroundColor:'#fe5722',color:'#fff'}} >Change Password</button>
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