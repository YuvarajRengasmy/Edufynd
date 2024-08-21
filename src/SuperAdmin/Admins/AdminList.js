import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallAdmin, deleteAdmin } from "../../api/admin";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";
export default function ListAgent() {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [admin, setAdmin] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    getAllAdminDetails();
  }, [pagination.from, pagination.to]);

  const getAllAdminDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };

    getallAdmin(data)
      .then((res) => {
        console.log("yuvi", res);
        setAdmin(res?.data?.result);
        setPagination({ ...pagination, count: res?.data?.result?.adminCount });
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

  const deleteAdminData = () => {
    deleteAdmin(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllAdminDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;

    // Apply SortableJS to the table headers
    const sortable = new Sortable(table.querySelector("thead tr"), {
      animation: 150,
      swapThreshold: 0.5,
      handle: ".sortable-handle",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        // Move the columns in the tbody
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

  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header bg-light shadow-sm sticky-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <ol className=" d-flex justify-content-end align-items-center mb-0 list-unstyled">
                  <li className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "600px" }}>
                      <input
                        type="search"
                        placeholder="Search...."
                        aria-describedby="button-addon3"
                        className="form-control border-1  rounded-4 "
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
                    <div
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ fontSize: "12px" }}
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
                          <h5 id="offcanvasRightLabel">Filter Admin</h5>
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
                              <label className="form-label">Admin Id</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="universityName"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Search...Admin Id"
                              />
                              <label className="form-label">E-Mail</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="state"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Search...E-Mail"
                              />
                              <label className="form-label">Role</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="averageFees"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Search...Role"
                              />
                              <label className="form-label">
                                Contact Number
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="country"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Search...Contact Number"
                              />

                              <label className="form-label">Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="popularCategories"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Search...Name"
                              />
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0  fw-semibold   text-white float-right bg"
                                style={{
                                  backgroundColor: "#0f2239",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "14px",
                                }}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                className="btn btn-save border-0  fw-semibold   text-white float-right mx-2"
                                style={{
                                  backgroundColor: "#fe5722",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "14px",
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
                  <li class="m-2">
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
                            fontSize: "12px",
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
                            fontSize: "12px",
                          }}
                          className="btn text-white "
                        >
                          <i class="fa fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn btn-pix-primary" to="/add_admin">
                      <button
                        className="btn btn-outline   fw-semibold  border-0 text-white  "
                        style={{
                          backgroundColor: "#231f20",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Admin
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
        {/* Card 1: Active Users */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#9C27B0" }} // Purple
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-users" style={{ color: '#ffffff' }}></i> Active Users
              </h6>
              <p className="card-text">Users currently active.</p>
              <p className="card-text">Total: 150</p>
            </div>
          </div>
        </div>

        {/* Card 2: Pending Requests */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FF5722" }} // Deep Orange
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-clock" style={{ color: '#ffffff' }}></i> Pending Requests
              </h6>
              <p className="card-text">Requests awaiting approval.</p>
              <p className="card-text">Total: 12</p>
            </div>
          </div>
        </div>

        {/* Card 3: Banned Users */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FFEB3B" }} // Yellow
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-ban" style={{ color: '#ffffff' }}></i> Banned Users
              </h6>
              <p className="card-text">Users who are banned.</p>
              <p className="card-text">Total: 5</p>
            </div>
          </div>
        </div>

        {/* Card 4: System Logs */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#2196F3" }} // Blue
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-file-alt" style={{ color: '#ffffff' }}></i> System Logs
              </h6>
              <p className="card-text">Logs of system activities.</p>
              <p className="card-text">Total: 35</p>
            </div>
          </div>
        </div>
      </div>
    </div>

        <div className="content-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card  border-0 rounded-1 shadow-sm">
                  <div className="card-body">
                    <div className="card-table">
                      <div className="table-responsive">
                        <table
                          className="table table-hover card-table dataTable text-center"
                          style={{ color: "#9265cc", fontSize: "13px" }}
                          ref={tableRef}
                        >
                          <thead className="table-light">
                            <tr
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                S.No.
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                ID{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Name{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Email ID{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Role{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Contact number{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Action{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {admin?.map((data, index) => (
                              <tr
                                key={index}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              >
                                <td className="text-capitalize text-start text-truncate ">
                                  #{pagination.from + index + 1}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.adminCode || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.name || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate ">
                                  {data?.email || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.role || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.mobileNumber || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/view_admin",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/edit_admin",
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
                            {admin?.length === 0 ? (
                              <tr>
                                <td
                                  className="form-text text-danger"
                                  colSpan="9"
                                >
                                  No data
                                </td>
                              </tr>
                            ) : null}
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


      
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete <br /> the selected Admin?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-danger  text-white   fw-semibold  mx-3"
              onClick={deleteAdminData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel btn-success text-white   fw-semibold  "
              onClick={closePopup}
              style={{ fontSize: "12px" }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Products
          <IconButton className="float-right">
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
    </>
  );
}
