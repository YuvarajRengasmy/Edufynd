import React, { useEffect, useState } from 'react';

import { RichTextEditor } from '@mantine/rte';
import Sidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";


export const AddDailyTask = () => {
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
            <h5 className='text-center text-capitalize p-1'> Add DailyTask Details</h5>
            </div>
            <div className="card-body mt-5">
                          <div className="row g-3">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                            SEO  Type
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                class="form-select form-select-lg rounded-2"
                                aria-label="Default select example"
                                style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                              >
                                <option selected>Select SEO Type</option>
                                <option value="Chrome">Chrome</option>
                                <option value="Google">Google</option>
                                
                              </select>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Link<span className="text-danger">*</span>
                              </label>
                              <input
                                type="url"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter Link"
                                name="seolink"
                              />
                              
                            </div>
                            <div className="row g-3 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Platform Type
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                class="form-select form-select-lg rounded-2"
                                aria-label="Default select example"
                                style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                              >
                                <option selected>Select Platform Type</option>
                                <option value="Chrome">Chrome</option>
                                <option value="Google">Google</option>
                                
                              </select>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Link<span className="text-danger">*</span>
                              </label>
                              <input
                                type="url"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter Link"
                                name="platformLink"
                              />
                              
                            </div>
                            </div>
                            <div className="row g-3 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Poster Name (Photo)<span className="text-danger">*</span>
                              </label>
                              <input
                                type='file'
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  file"
                                name="posterfile"
                              />
                              
                            </div>
                           
                            </div>
                           
                            <div className="col">
                            <label style={{ color: "#231F20" }}>
                             Content<span className="text-danger">*</span>
                              </label>
                            <RichTextEditor
       
          placeholder="Start writing your content here..."
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
            minHeight: '200px', overflowY: 'auto'
           
          }}
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
export default AddDailyTask