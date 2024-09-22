import React, { useEffect, useState } from 'react';

import { RichTextEditor } from '@mantine/rte';
import Sidebar from "../../../compoents/StaffSidebar";
import { Link } from "react-router-dom";


export const EditDailyTask = () => {
  return (
    <>
        <div >
          
                <Sidebar />
              
          
        
        <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
            <div className="content-header ">
                <div className="content container-fluid ">
                    <form >
                        <div className="row">            
              <div className="col-xl-12 ">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h5 className='text-center text-capitalize p-1'> Edit DailyTask Details</h5>
            </div>
            <div className="card-body mt-5">
                          <div className="row g-3">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Host Name{" "}
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
                                <option selected>Select Host Name</option>
                                <option value="Staff">Staff</option>
                                <option value="Student">Student</option>
                                <option value="Agent">Agent</option>
                              </select>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Attendees<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter Attendees"
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
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
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
                            </div>
                            <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Date<span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Date"
                                name="Username"
                              />
                              
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Time<span className="text-danger">*</span>
                              </label>
                              <input
                                type='time'
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Time"
                                name="Username"
                              />
                              
                            </div>
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
                               Update
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
    </>
  )
}
export default EditDailyTask