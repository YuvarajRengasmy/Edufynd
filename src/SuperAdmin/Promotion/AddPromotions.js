import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import {getallClientModule} from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";

export const AddPromotions = () => {
  return (
    <>
    <div  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div class="container-fluid">
            <nav class="navbar navbar-vertical navbar-expand-lg">
                <Sidebar />
              
            </nav>
        
        <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
            <div className="content-header ">
                <div className="content container-fluid ">
                    <form >
                        <div className="row">            
              <div className="col-xl-12 ">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h5 className='text-center text-capitalize p-1'> Add Promotions Details</h5>
            </div>
            <div className="card-body mt-5">
                          <div className="row g-3">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Type of Users{" "}
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                class="form-select form-select-lg"
                                aria-label="Default select example"
                                style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                              >
                                <option selected>Select User</option>
                                <option value="Staff">Staff</option>
                                <option value="Student">Student</option>
                                <option value="Agent">Agent</option>
                              </select>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                UserName<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter UserName"
                                name="Username"
                              />
                              
                            </div>
                            <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Subject<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Subject"
                                name="Username"
                              />
                              
                            </div>
                            </div>
                            <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Content<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Content"
                                name="Username"
                              />
                              
                            </div>
                            </div>
                            <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Image upload<span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Image upload"
                                name="Username"
                              />
                              
                            </div>
                            </div>
                           
                            

                            <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                              <Link
                                style={{
                                  backgroundColor: "#231F20",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                to="/ClientList"
                                className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                              >
                                Cancel
                              </Link>
                              <button
                                style={{
                                  backgroundColor: "#FE5722",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                type="submit"
                                className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}
export default AddPromotions