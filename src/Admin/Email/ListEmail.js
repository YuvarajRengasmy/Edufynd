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

import Mastersidebar from "../../compoents/AdminSidebar";

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
        <div className="container-fluid mt-3">
      <div className="row">
        {/* Card 1: New Emails */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#3F51B5" }} // Indigo
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-envelope-open" style={{ color: '#ffffff' }}></i> New Emails
              </h6>
              <p className="card-text">Emails received recently.</p>
              <p className="card-text">Total: 30</p>
            </div>
          </div>
        </div>

        {/* Card 2: Sent Emails */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#009688" }} // Teal
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-paper-plane" style={{ color: '#ffffff' }}></i> Sent Emails
              </h6>
              <p className="card-text">Emails sent this month.</p>
              <p className="card-text">Total: 50</p>
            </div>
          </div>
        </div>

        {/* Card 3: Drafts */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FFEB3B" }} // Yellow
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-file-alt" style={{ color: '#ffffff' }}></i> Drafts
              </h6>
              <p className="card-text">Draft emails awaiting sending.</p>
              <p className="card-text">Total: 12</p>
            </div>
          </div>
        </div>

        {/* Card 4: Deleted Emails */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#607D8B" }} // Blue Grey
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-trash" style={{ color: '#ffffff' }}></i> Deleted Emails
              </h6>
              <p className="card-text">Emails that have been deleted.</p>
              <p className="card-text">Total: 8</p>
            </div>
          </div>
        </div>
      </div>
    </div>



</div>

    </>
  );
};

export default ListEmail;
