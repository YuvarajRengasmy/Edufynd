import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import {getallNotifications,deleteProgram,getFilterNotification  } from "../../api/Notification/Notification";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import { formatDate } from "../../Utils/DateFormat";

import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";



export const ListNotifications = () => {



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
    getFilterNotification(data)
      .then((res) => {
        console.log(res);
        setnotification(res?.data?.result?.notificationList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.notificationCount,
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
      deleteProgram(deleteId)
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

  return (
    <>
    <div >
      
        <Mastersidebar />
      


      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header">
        <div className="container">
          
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
                    <Link class="btn btn-pix-primary" to="/AddNotifications">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                         Add Notifications
                      </button>
                    </Link>
                  </li>

                </ol>
              </div>


            </div>
          </div>

         
        
        </div>

        <div className="container mt-3">
      <div className="row">
        {/* Card 1: New Notifications */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#4CAF50" }} // Green
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-bell" style={{ color: '#ffffff' }}></i> New Notifications
              </h6>
              <p className="card-text">New notifications received.</p>
              <p className="card-text">Total: 20</p>
            </div>
          </div>
        </div>

        {/* Card 2: Alerts */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#F44336" }} // Red
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-exclamation-circle" style={{ color: '#ffffff' }}></i> Alerts
              </h6>
              <p className="card-text">Critical alerts issued.</p>
              <p className="card-text">Total: 5</p>
            </div>
          </div>
        </div>

        {/* Card 3: System Updates */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#2196F3" }} // Blue
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-sync" style={{ color: '#ffffff' }}></i> System Updates
              </h6>
              <p className="card-text">Recent system updates.</p>
              <p className="card-text">Total: 8</p>
            </div>
          </div>
        </div>

        {/* Card 4: Messages */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FFC107" }} // Amber
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-envelope" style={{ color: '#ffffff' }}></i> Messages
              </h6>
              <p className="card-text">New messages in the inbox.</p>
              <p className="card-text">Total: 12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className="content-body">
            <div className="container">
            <div className="row">
            <div className="col-xl-12">
              <div className="card rounded-0  border-0">
                <div className="card-body">
                  <div className="card-table">
                    <div className="table-responsive">

                      <table className=" table  table-hover card-table  dataTable text-center" style={{ color: '#9265cc', fontSize: '12px' }} ref={tableRef}>
                        <thead className="table-light">
                          <tr style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                            <th className="text-capitalize text-start sortable-handle">S No</th>
                            <th className="text-capitalize text-start sortable-handle">Date</th>
                            <th className="text-capitalize text-start sortable-handle">TypeOfUser</th>

                            <th className="text-capitalize text-start sortable-handle">Subject</th>
                            
                            <th className="text-capitalize text-start sortable-handle">Action </th>
                            
                          </tr>
                        </thead>
                        <tbody>
                        {notification?.map((data, index) => (
                            <tr key={index}  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                              <td className="text-capitalize text-start text-truncate">{pagination.from + index + 1}</td>
                              <td className="text-capitalize text-start text-truncate">{formatDate(data?.createdOn ? data?.createdOn : data?.modifiedOn ? data?.modifiedOn : "-")  || "Not Available"}</td>
                              <th className="text-capitalize text-start  text-truncate">{data?.typeOfUser  || "Not Available"}</th>

                              <td className="text-capitalize text-start text-truncate">{data?.subject  || "Not Available"}</td>
                             
                            
                            
                              <td className="text-capitalize text-start text-truncate">
                              <div className="d-flex">
                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/ViewNotifications",
                                            search: `?id=${data?._id}`,
                                          }}
                                        >
                                          <i className="far fa-eye text-primary me-1"></i>
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/EditNotifications",
                                            search: `?id=${data?._id}`,
                                          }}
                                        >
                                          <i className="far fa-edit text-warning me-1"></i>
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          onClick={() => {
                                            openPopup(data?._id);
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
                  <div className="float-right my-2">
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
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center p-4">
            <h5 className="mb-4" style={{fontSize:'14px'}}>
              Are you sure you want to Delete <br /> the selected Notification ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              onClick={deleteProgramData}
              style={{ fontSize: '12px' }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase "
              onClick={closePopup}
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
  </>
  )
}
export default ListNotifications