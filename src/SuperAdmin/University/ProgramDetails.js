import React, { useState, useEffect } from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useLocation } from "react-router-dom";

function ViewUniversity() {
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <div className="card">
              <div className="card-header">
                <h5 style={{ color: "#9265cc" }} className="text-bold">
                  View Program
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Course Type</label>
                        <br />
                        <span>Master</span>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Program Title</label>
                        <br />
                        <div className="col-md-6">
                          <label style={{ color: "#FE5722" }}>Application Fees</label>
                        </div>
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewUniversity;
