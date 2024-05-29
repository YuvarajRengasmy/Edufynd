import React from "react";
import Mastersidebar from '.././../compoents/sidebar'
import { FaFilter } from "react-icons/fa";
import { Button } from "reactstrap";
export default function GlobalSettings(){
    
    return(
        <div>
          <div className="">
            <Mastersidebar />
          </div>
            <div className="content-wrapper" style={{ backgroundColor: '#fff' }}>
            <div className="content-header">
            <div className="container-fluid">
              <div className="row ">

                <div >
                  <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                    {/* <li className="flex-grow-1">
                    <inputz
                      type="search"
                      placeholder="Search"
                      aria-describedby="button-addon3"
                      className="form-control-lg bg-light border-2  ps-1 rounded-4 w-100"
                      style={{ maxWidth: "600px", marginLeft: "0px" }}
                    />
                  </li> */}
                    <li className="flex-grow-1">
                      <div className="input-group" style={{ maxWidth: "600px" }}>
                        <input
                          type="search"
                          placeholder="Search"
                          aria-describedby="button-addon3"
                          className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                          style={{
                            borderColor: "#FE5722",
                            paddingRight: "1.5rem",
                            marginLeft: "0px",
                            fontSize: "14px"
                          }}
                        />
                        <span
                          className="input-group-text bg-transparent border-0"
                          id="button-addon3"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer"
                          }}
                        >
                          <i className="fas fa-search" style={{ color: "black" }}></i>
                        </span>
                      </div>
                    </li>
                    <li class="m-2">


                      <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                          <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Filter BY University</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                          </div>
                          <div className="offcanvas-body ">
                            <form>
                              <div className="from-group mb-3">
                                <label className="form-label">University Name</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="universityName"
                                  
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...University Name"
                                />
                                <label className="form-label">Campus</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="campus"
                                  
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Campus"
                                />
                                <label className="form-label">Average Fees</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="averageFees"
                                  
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Average Fees"
                                />
                                <label className="form-label">Country</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="country"
                                  
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Country"
                                />

                                <label className="form-label">Popular Categories</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="popularCategories"
                                  
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Country"
                                />
                              </div>
                              <div>
                                <button

                                  data-bs-dismiss="offcanvas"
                                  className="btn btn-cancel border text-white float-right bg"
                                  style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                  
                                >
                                  Reset
                                </button>
                                <button
                                  data-bs-dismiss="offcanvas"
                                  type="submit"
                                  
                                  className="btn btn-save border text-white float-right mx-2"
                                  style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                >
                                  Apply
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>


                    </li>
                    <li class="m-2">
                    
                        <button style={{ backgroundColor: "#E12929" }} className="btn text-white ">
                          <span>
                            <i class="fa fa-file-pdf" aria-hidden="true"></i>
                          </span>
                        </button>
                     
                    </li>
                    <li class="m-2">
                      
                        <span>
                          <button style={{ backgroundColor: "#22A033" }} className="btn text-white ">
                            <i class="fa fa-file-excel" aria-hidden="true"></i>
                          </button>
                        </span>
                      
                    </li>

                    <li class="m-2">
                      
                        <span>
                          <button
                            style={{ backgroundColor: "#9265cc" }}
                            className="btn text-white "
                          >
                            <i class="fa fa fa-upload" aria-hidden="true"></i>
                          </button>
                        </span>
                      
                    </li>
                    <li class="m-2">
                      
                        <button
                          className="btn btn-outline border text-white  "

                          style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                          Add University
                        </button>
                      
                    </li>

                  </ol>


                </div>
              </div>
            </div>
          </div>


          <div className="row">
                    <div className="container mt-3  ">

                        <ul class="list-group list-group-flush ">
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">UK</div>

                                </div>
                                <Button className="border-0 btn-success float-end">Edit</Button>
                                <Button className="border-0 btn-danger float-end" >Delete</Button>

                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">Subheading</div>

                                </div>
                                <Button className="border-0 btn-success float-end">Edit</Button>
                                <Button className="border-0 btn-danger float-end" >Delete</Button>

                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-start">
                                <div class="ms-2 me-auto">
                                    <div class="fw-bold">Subheading</div>

                                </div>
                                <Button className="border-0 btn-success float-end">Edit</Button>
                                <Button className="border-0 btn-danger float-end" >Delete</Button>

                            </li>
                        </ul>
                    </div>

                </div>
            </div>


        </div>

        
    )
}
