import React, { useEffect, useState } from 'react';


import Sidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";


export const AddCampaign = () => {
  return (
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
        <h5 className='text-center text-capitalize p-1'> Add Campaign Details</h5>
        </div>
        <div className="card-body mt-5">
        <div className='text-end'><a className='btn text-uppercase fw-semibold px-4 py-2  ' style={{backgroundColor:'#fe5722',color:'#fff',fontSize:'12px'}}>


        <i class="fa fa-plus-circle me-2" aria-hidden="true"></i> Add Platform</a></div>
                      <div className="row g-3">
                     
                      <div className="row g-2">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                         Platform<span className="text-danger">*</span>
                          </label>
                          <select class="form-select form-select-lg rounded-2"  style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }} aria-label="Default select example">
  <option selected>Select Platform</option>
  <option value="FaceBook">FaceBook</option>
  <option value="Instagram">Instagram</option>
  <option value="Linkedin">Linkedin</option>
</select>
                          
                        </div>
                        </div>
                     
                        <div className="row g-2">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Campaign Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Campaign Name"
                            name="CampaignName"
                          />
                          
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Budget Requested<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Budget Requested"
                            name="BudgetRequested"
                          />
                          
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Budget Alloted<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Budget Alloted"
                            name="BudgetAlloted"
                          />
                          
                        </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Budget Spent<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter Budget Spent"
                            name="Budget Spent"
                          />
                          
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Time<span className="text-danger">*</span>
                          </label>
                          <input
                            type="datetime-local"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Time"
                            name="BudgetRequested"
                          />
                          
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Leads Genreated<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Leads Genreated"
                            name="LeadsGenreated"
                          />
                          
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                          Leads Converted<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Leads Converted"
                            name="LeadsConverted"
                          />
                          
                        </div>


                   
                        

                       
                       
                     
                        
                       
                        

                        <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <button
                                style={{
                                  backgroundColor: "#231F20",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                type='reset'
                                className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                              >
                                Cancel
                              </button>
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
  )
}
export default AddCampaign