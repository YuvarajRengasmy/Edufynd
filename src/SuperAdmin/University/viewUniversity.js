import React, { useState, useEffect } from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useLocation } from "react-router-dom";


function ViewUniversity() {
  return (
    <div>
      <div class="position-fixed">
        <div class="fixed-element">
          <Sidebar />
          <Header />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 style={{ color: "#9265cc" }} className=" text-bold">
                    View University
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="row p-3">
                  <div className="col-md-6">
                    <div className="upload-img form-group text-center">
                      <div className="circle d-flex align-items-center justify-content-center" id="profile-picture-circle">
                        <label htmlFor="fileInputImage" className="file-upload align-items-center justify-content-center">
                          <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>University Name</label>
                          <br />
                          <span>PES University</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Country</label>
                          <br />
                          <span>UK</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Campus</label>
                          <br />
                          <span>London</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Ranking</label>
                          <br />
                          <span>April-July</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Average Fees</label>
                          <br />
                          <span>$25000</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Popular Categories</label>
                          <br />
                          <span>Master Degree</span>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Offer TAT</label>
                          <br />
                          <span>Yes</span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Admission Requirement</label>
                          <br />
                          <textarea
                            className="form-control"
                            type="none"
                            name="additionalComments"
                            rows="4"
                          >
                            PFA the project requirement. Kindly go through the document and make sure to submit the flow chart by Friday EOD
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-md-12">
                      <button
                        type="submit"
                        className="btn btn-user text-white font-weight-bold"
                        style={{ background: "#FE5722" }}
                      >
                        Commission
                      </button>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Payment Method</label>
                        <br />
                        <span>Fixed/Percentage</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Amount/Percentage</label>
                        <br />
                        <span>8%</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Eligibility for Commission</label>
                        <br />
                        <span>7%</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Currency</label>
                        <br />
                        <span>Yes</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Payment TAT</label>
                        <br />
                        <span>Yes</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Tax (Inclusive/Exclusive)</label>
                        <br />
                        <span>Exclusive</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Commission paid</label>
                        <br />
                        <span>Course Fees</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <div className="d-flex ">
              <div className="col-md-12 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group text-center">
                      <label style={{ color: "#9265cc" }}>Program Title </label>
                      <br />
                      <span>Master</span>
                    </div>
                    <div className="form-group text-center">
                      <label style={{ color: "#9265cc" }}>Course Fee </label>
                      <br />
                      <span>$250000</span>
                    </div>
                    <div className="form-group text-center">
                      <label style={{ color: "#9265cc" }}>Duration</label>
                      <br />
                      <span>48Month</span>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#FE5722" }} className="card-header">
                    <h5 className="text-bold text-center">
                      <a className="text-decoration-none" style={{ color: "#231F20 " }} href="/ViewProgram">View Program</a>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group text-center">
                      <label style={{ color: "#9265cc" }}>Program Title </label>
                      <br />
                      <span>Master</span>
                    </div>
                    <div className="form-group text-center">
                      <label style={{ color: "#9265cc" }}>Course Fee </label>
                      <br />
                      <span>$250000</span>
                    </div>
                    <div className="form-group text-center">
                      <label style={{ color: "#9265cc" }}>Duration</label>
                      <br />
                      <span>48Month</span>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "#FE5722" }} className="card-header">
                    <h5 className="text-bold text-center">
                      <a className="text-decoration-none" style={{ color: "#231F20 " }} href="/ViewProgram">View Program</a>
                    </h5>
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
export default ViewUniversity;
