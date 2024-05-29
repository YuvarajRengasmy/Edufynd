import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, } from "@mui/material";
import Masterheader from "../../compoents/header";
import Mastersidebar from "../../compoents/sidebar";


export default function Masterproductlist() {

  return (
    <div>
      <div class=""  style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
        <div class="fixed-element">
          <Mastersidebar />
        </div>
      </div>
  
      <div className="content-wrapper" style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              
              <div className="col-sm-12">
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


                    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
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
                                
                                style={{  backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '12px'  }}
                                placeholder="Search...University Name"
                              />
                              <label className="form-label">Campus</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="campus"
                              
                                style={{  backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '12px'  }}
                                placeholder="Search...Campus"
                              />
                              <label className="form-label">Average Fees</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="averageFees"
                               
                                style={{  backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '12px'  }}
                                placeholder="Search...Average Fees"
                              />
                              <label className="form-label">Country</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="country"
                               
                                style={{  backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '12px'  }}
                                placeholder="Search...Country"
                              />

                              <label className="form-label">Popular Categories</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="popularCategories"
                               
                                style={{  backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '12px'  }}
                                placeholder="Search...Country"
                              />
                            </div>
                            <div>
                              <button

                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border text-white float-right bg"
                                style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}
                           
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                               
                                className="btn btn-save border text-white float-right mx-2"
                                style={{ backgroundColor: "#9265cc",fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}
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
                    <Link >
                      <button   style={{ backgroundColor: "#E12929" }} className="btn text-white ">
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link  class="btn-filters">
                      <span>
                        <button   style={{ backgroundColor: "#22A033" }} className="btn text-white ">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>

                  <li class="m-2">
                    <Link  class="btn-filters">
                      <span>
                        <button
                          style={{ backgroundColor: "#9265cc" }}
                          className="btn text-white "
                        >
                          <i class="fa fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link class="btn btn-pix-primary" to="/AddStudent">
                      <button
                        className="btn btn-outline border text-white  "
                   
                        style={{ backgroundColor: "#9265cc",fontFamily: 'Plus Jakarta Sans',fontSize: '16px' }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Student
                      </button>
                    </Link>
                  </li>

                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>	Student Code </th>
                          <th>	Name</th>
                          <th>	Passport No</th>
                          <th>	Contact number</th>
                          <th>	Citizenship</th>
                          <th>	Finance </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} >
                          <td>sd0845</td>
                          <td>John</td>
                          <td>Wz34BY71</td>
                          <td>9876543210</td>
                          <td>Indian</td>
                          <td>Self Funding</td>
                          <td>
                          <div className="d-flex">
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/ViewUniversity",
                                  
                                  }}
                                >
                                  <i className="far fa-eye text-primary me-1"></i>

                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/EditUniversity",
                                    
                                  }}
                                >
                                  <i className="far fa-edit text-warning me-1"></i>

                                </Link>
                                <Link
                                  className="dropdown-item"
                                 
                                >
                                  <i className="far fa-trash-alt text-danger me-1"></i>

                                </Link>
                              </div>
                          </td>
                        </tr>
                       
                        <tr>
                          <td className="form-text text-danger" colSpan="9">
                            No data
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-right my-2">
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog >
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3"
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel"
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Products
          <IconButton className="float-right" >
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">Search By Selling</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="selling"
                placeholder="search..."
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-cancel border text-white float-right bg"
                style={{ backgroundColor: "#9265cc" }}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-save border text-white float-right mx-2"
                style={{ backgroundColor: "#9265cc" }}
              >
                Apply
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
