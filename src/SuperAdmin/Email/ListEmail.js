import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";

import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";

import Mastersidebar from "../../compoents/sidebar";

import { FaFilter } from "react-icons/fa";

export const ListEmail = () => {
  // const tableRef = useRef(null);

  // useEffect(() => {
  //   const table = tableRef.current;

  //   // Apply SortableJS to the table headers
  //   const sortable = new Sortable(table.querySelector("thead tr"), {
  //     animation: 150,
  //     swapThreshold: 0.5,
  //     handle: ".sortable-handle",
  //     onEnd: (evt) => {
  //       const oldIndex = evt.oldIndex;
  //       const newIndex = evt.newIndex;

  //       // Move the columns in the tbody
  //       table.querySelectorAll("tbody tr").forEach((row) => {
  //         const cells = Array.from(row.children);
  //         row.insertBefore(cells[oldIndex], cells[newIndex]);
  //       });
  //     },
  //   });

  //   return () => {
  //     sortable.destroy();
  //   };
  // }, []);

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
  <div className="container-fluid">
            <div className="row no-gutters">
                {/* Sidebar */}
                <div className="col-md-2 bg-light border-right" style={{ height: '100vh', overflowY: 'auto' }}>
                    <div className="p-3 border-bottom">
                        <button className="btn btn-danger btn-block" data-bs-toggle="collapse" data-bs-target="#composeEmail">
                            <i className="fas fa-plus"></i> Compose
                        </button>
                    </div>
                    <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="inbox-tab" data-bs-toggle="tab" href="#inbox" role="tab" aria-controls="inbox" aria-selected="true">
                                <i className="fas fa-inbox mr-2"></i> Inbox
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="starred-tab" data-bs-toggle="tab" href="#starred" role="tab" aria-controls="starred" aria-selected="false">
                                <i className="fas fa-star mr-2"></i> Starred
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="sent-tab" data-bs-toggle="tab" href="#sent" role="tab" aria-controls="sent" aria-selected="false">
                                <i className="fas fa-paper-plane mr-2"></i> Sent
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="drafts-tab" data-bs-toggle="tab" href="#drafts" role="tab" aria-controls="drafts" aria-selected="false">
                                <i className="fas fa-file-alt mr-2"></i> Drafts
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="trash-tab" data-bs-toggle="tab" href="#trash" role="tab" aria-controls="trash" aria-selected="false">
                                <i className="fas fa-trash-alt mr-2"></i> Trash
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="templates-tab" data-bs-toggle="tab" href="#templates" role="tab" aria-controls="templates" aria-selected="false">
                                <i className="fas fa-folder-open mr-2"></i> Templates
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="col-md-10 d-flex flex-column" style={{ height: '100vh' }}>
                    {/* Header */}
                    <div className="d-flex align-items-center p-3 border-bottom bg-white">
                        <div className="btn-group">
                            <button className="btn btn-outline-secondary">
                                <i className="fas fa-sync-alt"></i>
                            </button>
                            <button className="btn btn-outline-secondary">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                        <div className="ml-auto">
                            <input type="text" className="form-control form-control-sm" placeholder="Search mail" />
                        </div>
                        <div className="ml-3">
                            <button className="btn btn-outline-secondary">
                                <i className="fas fa-cog"></i>
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content flex-grow-1 overflow-auto bg-light" id="myTabContent">
                        {/* Inbox Tab */}
                        <div className="tab-pane fade show active" id="inbox" role="tabpanel" aria-labelledby="inbox-tab">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Sender 1</h6>
                                        <small className="text-muted">2:30 PM</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Subject of the email goes here...</p>
                                    <small className="text-muted">This is a short preview of the email content.</small>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Sender 2</h6>
                                        <small className="text-muted">3:45 PM</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Subject of the email goes here...</p>
                                    <small className="text-muted">This is a short preview of the email content.</small>
                                </a>
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Sender 3</h6>
                                        <small className="text-muted">4:15 PM</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Subject of the email goes here...</p>
                                    <small className="text-muted">This is a short preview of the email content.</small>
                                </a>
                            </div>
                        </div>

                        {/* Starred Tab */}
                        <div className="tab-pane fade" id="starred" role="tabpanel" aria-labelledby="starred-tab">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Sender 4</h6>
                                        <small className="text-muted">Yesterday</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Important email content...</p>
                                    <small className="text-muted">This is a short preview of the important email content.</small>
                                </a>
                            </div>
                        </div>

                        {/* Sent Tab */}
                        <div className="tab-pane fade" id="sent" role="tabpanel" aria-labelledby="sent-tab">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Recipient 1</h6>
                                        <small className="text-muted">Today</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Sent email content preview...</p>
                                    <small className="text-muted">This is a preview of the sent email.</small>
                                </a>
                            </div>
                        </div>

                        {/* Drafts Tab */}
                        <div className="tab-pane fade" id="drafts" role="tabpanel" aria-labelledby="drafts-tab">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Draft 1</h6>
                                        <small className="text-muted">2 days ago</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Draft email content preview...</p>
                                    <small className="text-muted">This is a preview of the draft email.</small>
                                </a>
                            </div>
                        </div>

                        {/* Trash Tab */}
                        <div className="tab-pane fade" id="trash" role="tabpanel" aria-labelledby="trash-tab">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Deleted Email 1</h6>
                                        <small className="text-muted">Last week</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Deleted email content preview...</p>
                                    <small className="text-muted">This is a preview of the deleted email.</small>
                                </a>
                            </div>
                        </div>

                        {/* Templates Tab */}
                        <div className="tab-pane fade" id="templates" role="tabpanel" aria-labelledby="templates-tab">
                            <div className="list-group list-group-flush">
                                <a href="#" className="list-group-item list-group-item-action">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Template 1</h6>
                                        <small className="text-muted">Last month</small>
                                    </div>
                                    <p className="mb-0 text-truncate">Template content preview...</p>
                                    <small className="text-muted">This is a preview of the email template.</small>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Email Editor (Initially Collapsed) */}
                    <div id="composeEmail" className="collapse">
                        <div className="p-3 border-top bg-white">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" placeholder="To" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" rows="5" placeholder="Write your email..."></textarea>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-outline-secondary">
                                            <i className="fas fa-paperclip"></i>
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary">
                                            <i className="fas fa-image"></i>
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary">
                                            <i className="fas fa-smile"></i>
                                        </button>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        {/* <div className="content-header">
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
                          padding: "0px", // Adjust padding to fit the height
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
                          cursor: "pointer",
                        }}
                      >
                        <i
                          className="fas fa-search"
                          style={{ color: "black" }}
                        ></i>
                      </span>
                    </div>
                  </li>
                  <li class="m-1">
                    <div>
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: "11px" }}
                        type="button"
                        data-bs-bs-bs-toggle="offcanvas"
                        data-bs-bs-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        {" "}
                        <FaFilter />
                      </button>
                      <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel"
                      >
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter Client</h5>
                          <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-bs-bs-dismiss="offcanvas"
                            aria-label="Close"
                          />
                        </div>
                        <div className="offcanvas-body ">
                          <form>
                            <div className="from-group mb-3">
                              <label className="form-label">Client Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessName"
                                placeholder="Search...Client Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                              <label className="form-label">
                                Client Contact No{" "}
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessContactNo"
                                placeholder="Search...Client Contact No"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />

                              <label className="form-label">Status</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="status"
                                placeholder="Search...Status"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                              <label className="form-label">Client Id</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="clientID"
                                placeholder="Search...Client Id"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                            </div>
                            <div>
                              <button
                                data-bs-bs-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right bg"
                                style={{
                                  backgroundColor: "#0f2239",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                                // onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-bs-bs-dismiss="offcanvas"
                                type="submit"
                                // onClick={filterProgramList}
                                className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right mx-2"
                                style={{
                                  backgroundColor: "#fe5722",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
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
                    <Link>
                      <button
                        style={{ backgroundColor: "#E12929", fontSize: "11px" }}
                        className="btn text-white "
                      >
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn-filters">
                      <span>
                        <button
                          style={{
                            backgroundColor: "#22A033",
                            fontSize: "11px",
                          }}
                          className="btn text-white "
                        >
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>

                  <li class="m-1">
                    <Link class="btn-filters">
                      <span>
                        <button
                          style={{
                            backgroundColor: "#9265cc",
                            fontSize: "11px",
                          }}
                          className="btn text-white "
                        >
                          <i class="fa fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn btn-pix-primary" to="/AddEmail">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Email
                      </button>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card rounded-0 border-0">
                  <div className="card-body">
                    <div className="card-table">
                      <div className="table-responsive">
                        <table
                          className=" table card-table  dataTable text-center"
                          style={{ color: "#9265cc", fontSize: "12px" }}
                          ref={tableRef}
                        >
                          <thead>
                            <tr
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <th className="text-capitalize text-start sortable-handle">
                                S No
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                University Code
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                University Name
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Commission
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Primary Campus
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                No of Applications
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Action{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "11px",
                              }}
                            >
                              <td className="text-capitalize text-start"></td>
                              <td className="text-capitalize text-start"></td>
                              <td className="text-capitalize text-start"></td>
                              <td className="text-capitalize text-start"></td>
                              <td className="text-capitalize text-start"></td>
                              <td className="text-capitalize text-start"></td>

                              <td>
                                <div className="d-flex">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/ViewEmail",
                                    }}
                                    data-bs-bs-bs-toggle="tooltip"
                                    title="View"
                                  >
                                    <i className="far fa-eye text-primary me-1"></i>
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/EdiEmail",
                                    }}
                                    data-bs-bs-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <i className="far fa-edit text-warning me-1"></i>
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    data-bs-bs-bs-toggle="tooltip"
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
        </div> */}






      </div>
      {/* <Dialog>
        <DialogContent>
          <div className="text-center p-4">
            <h5 className="mb-4" style={{ fontSize: "14px" }}>
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase "
              style={{ fontSize: "12px" }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Filter University
          <IconButton className="float-right">
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Upload University List
          <IconButton className="float-right">
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
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div>
              <Link
                to="/ListUniversity"
                className="btn btn-cancel border-0 rounded-pill text-uppercase px-3 py-1 fw-semibold text-white float-right bg"
                style={{
                  backgroundColor: "#0f2239",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0 rounded-pill text-uppercase fw-semibold px-3 py-1 text-white float-right mx-2"
                style={{
                  backgroundColor: "#fe5722",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                Apply
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default ListEmail;
