import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { getallClient, deleteClient } from "../../api/client";
import { Link } from "react-router-dom";
import {deleteTestimonial,getFilterTestimonial  } from "../../api/Notification/Testimonial";
import { formatDate } from "../../Utils/DateFormat";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import Masterheader from "../../compoents/header";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";
import ListAgent from "../Admins/AdminList";


export const ListTestimonials = () => {


  const [notification, setnotification] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 0
  });


  useEffect(() => {
    getAllClientDetails();
  }, [pagination.from, pagination.to]);

  const getAllClientDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterTestimonial(data)
      .then((res) => {
        console.log(res);
        setnotification(res?.data?.result?.testimonialList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.testimonialCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

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
  
    const deleteProgramData = () => {
      deleteTestimonial(deleteId)
        .then((res) => {
          toast.success(res?.data?.message);
          closePopup();
          getAllClientDetails();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const openPopup = (data) => {
      setOpen(true);
      setDeleteId(data);
    };
  
    const closePopup = () => {
      setOpen(false);
    };




  

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
    <>
    <div >
     
        <Mastersidebar />
      


      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header bg-light shadow-sm sticky-top mb-0">
        <div className="container-fluid">
          
            <div className="row ">
              <div className="col-xl-12">
              
                <ol className="breadcrumb d-flex flex-row justify-content-end align-items-center w-100 mb-0">
                  <li className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "600px" }}>
                      <input
                        type="search"
                        placeholder="Search"
                        aria-describedby="button-addon3"
                        className="form-control  border-1  rounded-4 w-100"
                        style={{
                        
                          fontSize: "12px", // Keep the font size if it's correct
                        
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
                          <h5 id="offcanvasRightLabel">Filter Notifications</h5>
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
                                className="btn btn-cancel border-0 fw-semibold rounded-1  rounded-pill text-white float-right bg"
                                style={{ backgroundColor: "#0f2239", color: '#fff', fontSize: '12px' }}
                              // onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                // onClick={filterProgramList}
                                className="btn btn-save border-0 fw-semibold rounded-1  rounded-pill text-white float-right mx-2"
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
                    <Link class="btn btn-pix-primary" to="/add_testimonials">
                      <button
                        className="btn btn-outline   fw-semibold rounded-1 border-0 text-white  "
                        style={{ backgroundColor: "#231f20", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                         Add Testimonials
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
        {/* Card 1: New Testimonials */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#009688" }} // Teal
          >
            <div className="card-body">
              <h6 className="">
                <i className="fas fa-user-check" style={{ color: '#ffffff' }}></i> New Testimonials
              </h6>
              <p className="card-text">Recent testimonials received.</p>
              <p className="card-text">Total: 5</p>
            </div>
          </div>
        </div>

        {/* Card 2: Verified Testimonials */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#4CAF50" }} // Green
          >
            <div className="card-body">
              <h6 className="">
                <i className="fas fa-thumbs-up" style={{ color: '#ffffff' }}></i> Verified Testimonials
              </h6>
              <p className="card-text">Testimonials verified and approved.</p>
              <p className="card-text">Total: 12</p>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Reviews */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FF9800" }} // Orange
          >
            <div className="card-body">
              <h6 className="">
                <i className="fas fa-clock" style={{ color: '#ffffff' }}></i> Pending Reviews
              </h6>
              <p className="card-text">Testimonials pending review.</p>
              <p className="card-text">Total: 7</p>
            </div>
          </div>
        </div>

        {/* Card 4: Archived Testimonials */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#795548" }} // Brown
          >
            <div className="card-body">
              <h6 className="">
                <i className="fas fa-archive" style={{ color: '#ffffff' }}></i> Archived Testimonials
              </h6>
              <p className="card-text">Old or archived testimonials.</p>
              <p className="card-text">Total: 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className="content-body">
            <div className="container-fluid">
            <div className="row">
            <div className="col-xl-12">
              <div className="card rounded-1 shadow-sm  border-0">
              <div className="card-header bg-white mb-0 mt-1 pb-0">
                  <div className="d-flex  mb-0">
                    <p className="me-auto ">
                      Change
                      <select
                        className="form-select form-select-sm rounded-1 d-inline mx-2"
                        aria-label="Default select example1"
                        style={{ width: "auto", display: "inline-block", fontSize: "12px" }}
                      >
                        <option value="5">Active</option>
                        <option value="10">InActive</option>
                        <option value="20">Delete</option>
                      </select>{" "}

                    </p>


                  </div>
                </div>
                <div className="card-body">
                  <div className="card-table">
                    <div className="table-responsive">

                      <table className=" table table-hover card-table  dataTable text-center" style={{ color: '#9265cc', fontSize: '12px' }} ref={tableRef}>
                        <thead className="table-light">
                          <tr style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                          <th className=" text-start">
                            <input type="checkbox" />
                            </th>
                            <th className="text-capitalize text-start sortable-handle">S No</th>
                            <th className="text-capitalize text-start sortable-handle">Date</th>
                            <th className="text-capitalize text-start sortable-handle">course</th>
                            <th className="text-capitalize text-start sortable-handle">Users</th>
                            
                            <th className="text-capitalize text-start sortable-handle">Action </th>
                            
                          </tr>
                        </thead>
                        <tbody>
                        {notification?.map((item, index) => (
                            <tr key={index} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                               <td className=" text-start">
                              <input type="checkbox" />
                              </td>
                              <td className="text-capitalize text-start text-truncate">{pagination.from + index + 1}</td>
                              <td className="text-capitalize text-start text-truncate">{formatDate(item?.createdOn ? item?.createdOn : item?.modifiedOn ? item?.modifiedOn : "-")  || "Not Available"}</td>
                              <td className="text-capitalize text-start text-truncate" >{item?.courseOrUniversityName || "Not Available"}</td>
                              <td className="text-capitalize text-start text-truncate">{item.typeOfUser || "Not Available"}</td>
                             
                              <td className="text-capitalize text-start text-truncate">
                                <div className="d-flex">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/view_testimonials",
                                      search: `?id=${item?._id}`,
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="View"
                                  >
                                    <i className="far fa-eye text-primary me-1"></i>

                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/edit_testimonials",
                                      search: `?id=${item?._id}`,
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <i className="far fa-edit text-primary me-1"></i>
                                  </Link>
                                  <Link
                                          className="dropdown-item"
                                          onClick={() => {
                                            openPopup(item?._id);
                                          }}
                                        >
                                          <i className="far fa-trash-alt text-danger me-1"></i>
                                        </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                           

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3">
                  <p className="me-auto ">
                    Show
                    <select
                      className="form-select form-select-sm rounded-1 d-inline mx-2"
                      aria-label="Default select example1"
                      style={{ width: "auto", display: "inline-block", fontSize: "12px" }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>{" "}
                    Entries    out of 100
                  </p>
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
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
              className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold rounded-1 mx-3"
              
              style={{ fontSize: '12px' }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold rounded-1 "
              
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
                to="/list_testimonials"
                className="btn btn-cancel border-0 rounded-pill rounded-1 px-3 py-1 fw-semibold text-white float-right bg"
                style={{ backgroundColor: "#0f2239", color: '#fff', fontSize: '12px' }}

              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0 rounded-pill rounded-1 fw-semibold px-3 py-1 text-white float-right mx-2"
                style={{ backgroundColor: "#fe5722", color: '#fff', fontSize: '12px' }}
              >
                Apply
              </button>

            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </>
  )
}
export default ListTestimonials