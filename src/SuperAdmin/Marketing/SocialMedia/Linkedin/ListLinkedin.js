import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import Sidebar from "../../../../compoents/sidebar";


import { FaFilter } from "react-icons/fa";

const ListLinkedin = () => {

  
  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;

    // Apply SortableJS to the table headers
    const sortable = new Sortable(table.querySelector('thead tr'), {
      animation: 150,
      swapThreshold: 0.5,
      handle: '.sortable-handle',
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        // Move the columns in the tbody
        table.querySelectorAll('tbody tr').forEach((row) => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      }
    });

    return () => {
      sortable.destroy();
    };
  }, []);

  return (
    <div >
   
        <Sidebar />
    


      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header  bg-light shadow-sm sticky-top">
        <div className="container-fluid">
          
            <div className="row ">
              <div className="col-xl-12">
             
                <ol className="breadcrumb d-flex flex-row justify-content-end align-items-center w-100">
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
                          fontSize: "12px", // Keep the font size if it's correct
                          height: "11px", // Set the height to 11px
                          padding: "0px" // Adjust padding to fit the height
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
                  <li class="m-1">


                    <div>
                      <button className="btn btn-primary" style={{ fontSize: "11px" }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter SocialMedia</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body ">
                          <form>
                            <div className="from-group mb-3">
                              <label className="form-label">Date</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessName"
                               
                                placeholder="Search...Date"
                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              />
                              <label className="form-label">Subject</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessContactNo"
                               
                                placeholder="Search...Subject"
                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              />

                              <label className="form-label">Users</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="status"
                               
                                placeholder="Search...Users"
                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              />
                          

                            </div>
                            <div>
                              <button

                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right bg"
                                style={{ backgroundColor: "#0f2239", color: '#fff', fontSize: '12px' }}
                              // onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                // onClick={filterProgramList}
                                className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right mx-2"
                                style={{ backgroundColor: "#fe5722", color: '#fff', fontSize: '12px' }}
                              >
                                Apply
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>


                  </li>
                  <li class="m-1">
                    <Link >
                      <button style={{ backgroundColor: "#E12929", fontSize: "11px" }} className="btn text-white ">
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link  class="btn-filters">
                      <span>
                        <button style={{ backgroundColor: "#22A033", fontSize: "11px" }} className="btn text-white ">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>

                  <li class="m-1">
                    <Link class="btn-filters">
                      <span>
                        <button
                          style={{ backgroundColor: "#9265cc", fontSize: "11px" }}
                          className="btn text-white "
                        >
                          <i class="fa fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn btn-pix-primary" to="/AddLinkedIn">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                         Add SocialMedia
                      </button>
                    </Link>
                  </li>

                </ol>
              </div>


            </div>
          </div>


          
        
        </div>

        <div className="container-fluid mt-3">
      <div className="row">
        {/* Card 1: Total Followers */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#1DA1F2" }} // Twitter Blue
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fab fa-twitter" style={{ color: '#ffffff' }}></i> Total Followers
                </h6>
                <p className="card-text">Followers across all platforms.</p>
                <p className="card-text">Total: 50,000</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 2: Engagement Rate */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#3B5998" }} // Facebook Blue
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fab fa-facebook-f" style={{ color: '#ffffff' }}></i> Engagement Rate
                </h6>
                <p className="card-text">Overall engagement on posts.</p>
                <p className="card-text">Rate: 4.5%</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 3: Campaign Reach */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#E1306C" }} // Instagram Pink
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fab fa-instagram" style={{ color: '#ffffff' }}></i> Campaign Reach
                </h6>
                <p className="card-text">Reach of recent campaigns.</p>
                <p className="card-text">Reach: 100,000</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 4: Ads Performance */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#FF0000" }} // YouTube Red
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fab fa-youtube" style={{ color: '#ffffff' }}></i> Ads Performance
                </h6>
                <p className="card-text">Performance of ad campaigns.</p>
                <p className="card-text">Conversions: 2,000</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
        <div className="content-body">
            <div className="container-fluid">
            <div className="row">
            <div className="col-xl-12">
              <div className="card rounded-0 border-0">
                <div className="card-body">
                  <div className="card-table">
                    <div className="table-responsive">

                      <table className=" table table-hover card-table  dataTable text-center" style={{ color: '#9265cc', fontSize: '12px' }} ref={tableRef}>
                        <thead className="table-light">
                          <tr style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                            <th className="text-capitalize text-start sortable-handle">S No</th>
                            <th className="text-capitalize text-start sortable-handle">Date</th>
                            <th className="text-capitalize text-start sortable-handle">Subject</th>
                            <th className="text-capitalize text-start sortable-handle">Users</th>
                            
                            <th className="text-capitalize text-start sortable-handle">Action </th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          
                            <tr  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                              <td className="text-capitalize text-start text-truncate"></td>
                              <td className="text-capitalize text-start text-truncate"></td>
                              <td className="text-capitalize text-start text-truncate"></td>
                             
                              <td className="text-capitalize text-start text-truncate"></td>
                            
                              <td  className="text-capitalize text-start text-truncate">
                                <div className="d-flex">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/ViewLinkedIn",
                                      
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="View"
                                  >
                                    <i className="far fa-eye text-primary me-1"></i>

                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/EditLinkedIn",
                                      
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <i className="far fa-edit text-warning me-1"></i>

                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                
                                    data-bs-toggle="tooltip"
                                    title="Delete"
                                  >
                                    <i className="far fa-trash-alt text-danger me-1"></i>

                                  </Link>
                                </div>

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
          </div>


      </div>
      <Dialog >
        <DialogContent>
          <div className="text-center p-4">
            <h5 className="mb-4" style={{fontSize:'14px'}}>
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              
              style={{ fontSize: '12px' }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase "
              
              style={{ fontSize: '12px' }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog  fullWidth maxWidth="sm">
        <DialogTitle>
          Filter University
          <IconButton className="float-right" >
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>

        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Upload University List
          <IconButton className="float-right" >
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">

              <div className="mb-3">
                <input
                  type="file"
                  name="file"
                  className="form-control text-dark bg-transparent"
                 
                  style={{fontSize:'14px'}}
                />
              </div>

            </div>
            <div>
              <Link
                to="/ListUniversity"
                className="btn btn-cancel border-0 rounded-pill text-uppercase px-3 py-1 fw-semibold text-white float-right bg"
                style={{ backgroundColor: "#0f2239", color: '#fff', fontSize: '12px' }}

              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0 rounded-pill text-uppercase fw-semibold px-3 py-1 text-white float-right mx-2"
                style={{ backgroundColor: "#fe5722", color: '#fff', fontSize: '12px' }}
              >
                Apply
              </button>

            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ListLinkedin
