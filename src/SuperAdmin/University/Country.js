import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import {
  getallEvent,
  deleteEvent,
  getFilterEvent,
} from "../../api/Notification/event";
import { formatDate } from "../../Utils/DateFormat";

import { FaFilter } from "react-icons/fa";

export const ListEvents = () => {
  const [notification, setnotification] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 0,
  });

  useEffect(() => {
    getAllClientDetails();
  }, [pagination.from, pagination.to]);

  const getAllClientDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterEvent(data)
      .then((res) => {
        setnotification(res?.data?.result?.eventList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.eventCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProgramData = () => {
    deleteEvent(deleteId)
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

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;

    const sortable = new Sortable(table.querySelector("thead tr"), {
      animation: 150,
      swapThreshold: 0.5,
      handle: ".sortable-handle",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        table.querySelectorAll("tbody tr").forEach((row) => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      },
    });

    return () => {
      sortable.destroy();
    };
  }, []);

  // Countdown Timer
  const calculateTimeLeft = (date) => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLefts, setTimeLefts] = useState({});

  useEffect(() => {
    const timers = setInterval(() => {
      setTimeLefts((prevTimes) =>
        notification.reduce((acc, data) => {
          acc[data._id] = calculateTimeLeft(data.date);
          return acc;
        }, {})
      );
    }, 1000);

    return () => clearInterval(timers);
  }, [notification]);

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header  bg-light shadow-sm sticky-top mb-0">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-xl-12">
                <ol className=" d-flex flex-row justify-content-end align-items-center w-100 mb-0 list-unstyled">
                  <li className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "600px" }}>
                      <input
                        type="search"
                        placeholder="Search"
                        aria-describedby="button-addon3"
                        className="form-control bg-white border-1  rounded-4 w-100"
                        style={{
                          fontSize: "12px",
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
                  <li className="m-1">
                    <div>
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: "11px" }}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
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
                          <h5 id="offcanvasRightLabel">Filter Events</h5>
                          <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          />
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
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                              <label className="form-label">Subject</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessContactNo"
                                placeholder="Search...Subject"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />

                              <label className="form-label">Users</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="status"
                                placeholder="Search...Users"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 fw-semibold rounded-1  rounded-pill text-white float-right bg"
                                style={{
                                  backgroundColor: "#0f2239",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                className="btn btn-save border-0 fw-semibold rounded-1  rounded-pill text-white float-right mx-2"
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
                  <li className="m-1">
                    <Link>
                      <button
                        style={{ backgroundColor: "#E12929", fontSize: "11px" }}
                        className="btn text-white "
                      >
                        <span>
                          <i className="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className="m-1">
                    <Link className="btn-filters">
                      <span>
                        <button
                          style={{
                            backgroundColor: "#22A033",
                            fontSize: "11px",
                          }}
                          className="btn text-white "
                        >
                          <i
                            className="fa fa-file-excel"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li className="m-1">
                    <Link to="/add-event">
                      <button
                        style={{ backgroundColor: "#3A74FF", fontSize: "11px" }}
                        className="btn text-white"
                      >
                        <span>
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-2">
          <div className="card">
            <div className="card-body pt-2">
              <table
                ref={tableRef}
                className="table table-hover table-bordered table-striped"
              >
                <thead
                  className="bg-light"
                  style={{ position: "sticky", top: "0", zIndex: 100 }}
                >
                  <tr>
                    <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Event
                    </th>
                    <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Date
                    </th>
                    <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Countdown
                    </th>
                    <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Users
                    </th>
                    <th style={{ fontSize: "12px", fontWeight: "bold" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {notification.map((data, index) => (
                    <tr key={index}>
                      <td style={{ fontSize: "12px" }}>{data.subject}</td>
                      <td style={{ fontSize: "12px" }}>
                        {formatDate(data.date)}
                      </td>
                      <td style={{ fontSize: "12px" }}>
                        {timeLefts[data._id] ? (
                          <>
                            {timeLefts[data._id].days}d{" "}
                            {timeLefts[data._id].hours}h{" "}
                            {timeLefts[data._id].minutes}m{" "}
                            {timeLefts[data._id].seconds}s
                          </>
                        ) : (
                          "Event Started"
                        )}
                      </td>
                      <td style={{ fontSize: "12px" }}>{data.users}</td>
                      <td>
                        <div className="d-flex flex-row">
                          <Link
                            to={`/edit-event/${data._id}`}
                            className="m-1 btn-sm btn btn-primary"
                            style={{ fontSize: "11px" }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => openPopup(data._id)}
                            className="m-1 btn-sm btn btn-danger"
                            style={{ fontSize: "11px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-footer pb-0">
          <div className="row justify-content-end align-items-center">
            <div className="col-auto">
              <Pagination
                count={Math.ceil(pagination.count / pageSize)}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                size="small"
                siblingCount={0}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={closePopup}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={closePopup}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            X
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h4>Are you sure?</h4>
              <div>
                <button
                  className="btn btn-primary mx-2"
                  onClick={deleteProgramData}
                >
                  Yes
                </button>
                <button className="btn btn-secondary mx-2" onClick={closePopup}>
                  No
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ListEvents;