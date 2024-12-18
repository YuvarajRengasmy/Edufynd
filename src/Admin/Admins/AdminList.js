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
import Sidebar from "../../compoents/AdminSidebar";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";

export const AdminListAdmin = () => {
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
      <div>
        <Sidebar />

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                    <li className="flex-grow-1">
                      <div
                        className="input-group"
                        style={{ maxWidth: "600px" }}
                      >
                        <input
                          type="search"
                          placeholder="Search"
                          aria-describedby="button-addon3"
                          className="form-control-lg bg-white border-2 ps-1 rounded-4 text-capitalize  w-100"
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
                      <div
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{ fontSize: "11px" }}
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
                                  className="btn btn-cancel border-0 text-uppercase fw-semibold px-4 py-2 rounded-pill text-white float-right bg"
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
                                  className="btn btn-save border-0 text-uppercase fw-semibold px-4 py-2 rounded-pill text-white float-right mx-2"
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
                          style={{
                            backgroundColor: "#E12929",
                            fontSize: "11px",
                          }}
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
                      <Link class="btn btn-pix-primary" to="/AddAdmin">
                        <button
                          className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                          style={{
                            backgroundColor: "#fe5722",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "11px",
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
          <div className="content-body">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card  border-0 rounded-0">
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
                                  Admin ID{" "}
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
                                  <td className="text-capitalize text-start ">
                                    #{pagination.from + index + 1}
                                  </td>
                                  <td className="text-capitalize text-start ">
                                    {data?.adminCode}
                                  </td>
                                  <td className="text-capitalize text-start ">
                                    {data?.name}
                                  </td>
                                  <td className="text-capitalize text-start ">
                                    {data?.email}
                                  </td>
                                  <td className="text-capitalize text-start ">
                                    {data?.role}
                                  </td>
                                  <td className="text-capitalize text-start ">
                                    {data?.mobileNumber}
                                  </td>
                                  <td className="text-capitalize text-start ">
                                    <div className="d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/ViewAdmin",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/EditAdmin",
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
                className="btn btn-save btn-danger  text-white px-4 py-2 rounded-pill fw-semibold text-uppercase mx-3"
                onClick={deleteAdminData}
                style={{ fontSize: "12px" }}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-cancel btn-success text-white px-4 py-2 rounded-pill fw-semibold text-uppercase "
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
      </div>
    </>
  );
};
export default AdminListAdmin;
