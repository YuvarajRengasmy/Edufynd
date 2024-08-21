import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";

import {
  getallStudnetEnquiry,
  getSingleStudnetEnquiry,
  deleteStudnetEnquiry,
} from "../../../api/Enquiry/student";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from "../../../compoents/sidebar";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";

export const ListBusiness = () => {
  const initialState = {
    source: "",
    name: "",
    dob: "",
    passportNo: "",
    qualification: "",
    whatsAppNumber: "",
    primaryNumber: "",
    email: "",
    cgpa: "",
    yearPassed: "",
    desiredCountry: "",
    desiredCourse: "",
    doYouNeedSupportForLoan: "",
    assignedTo: "",
  };

  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [student, setStudent] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    getAllStudentDetails();
  }, [pagination.from, pagination.to]);

  const getAllStudentDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getallStudnetEnquiry(data)
      .then((res) => {
        setStudent(res?.data?.result);
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
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const deletStudentData = () => {
    deleteStudnetEnquiry(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllStudentDetails();
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
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "14px" }}>
        <div className="content-header  bg-light shadow-sm sticky-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                  <li className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "600px" }}>
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
                        backgroundColor: "#fff",
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
                          <h5 id="offcanvasRightLabel">Filter Business</h5>
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
                              <label className="form-label">Student Code</label>
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
                                placeholder="Search...Student Code"
                              />
                              <label className="form-label">Email ID</label>
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
                                placeholder="Search...Email ID"
                              />
                              <label className="form-label">
                                Desired Country
                              </label>
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
                                placeholder="Search...Desired Country"
                              />
                              <label className="form-label">Source</label>
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
                                placeholder="Search...Source"
                              />

                              <label className="form-label">Assigned To</label>
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
                                placeholder="Search...Assigned To"
                              />
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 rounded-pill fw-semibold text-uppercase px-4 py-2 text-white float-right bg"
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
                                className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right mx-2"
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
                    <Link class="btn btn-pix-primary" to="/add_business_enquiry">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{
                          backgroundColor: "#fe5722",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>
                        Add Business Enquiry
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
        {/* Card 1: Lead Converted */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#1976D2" }} // Blue
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-check-circle" style={{ color: '#ffffff' }}></i> Lead Converted
                </h6>
                <p className="card-text">Total: 75</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 2: Drop/Withdraw */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#E64A19" }} // Deep Orange
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-user-times" style={{ color: '#ffffff' }}></i> Drop/Withdraw
                </h6>
                <p className="card-text">Total: 20</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 3: Delayed Followups */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#FBC02D" }} // Yellow
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-hourglass-half" style={{ color: '#ffffff' }}></i> Delayed Followups
                </h6>
                <p className="card-text">Total: 45</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 4: Documents Received */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#388E3C" }} // Green
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-file-alt" style={{ color: '#ffffff' }}></i> Documents Received
                </h6>
                <p className="card-text">Total: 90</p>
              </div>
            </div>
          </Link>
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
                                S.No.
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Date
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Student Code
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Name
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Contact Number
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Email ID
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Desired Country
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Source
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Assigned To
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {student && student.length > 0 ? (
                              student.map((data, index) => (
                                <tr
                                  key={index}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "11px",
                                  }}
                                >
                                  <td className="text-capitalize text-start text-truncate">
                                    {pagination.from + index + 1}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {formatDate(data?.createdOn) || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.studentCode || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.name || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.primaryNumber || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.email || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.desiredCountry || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.source || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.assignedTo || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    <div className="d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/view_business_enquiry",
                                          search: `?id=${data?._id}`,
                                        }}
                                        data-bs-toggle="tooltip"
                                        title="View"
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/edit_business_enquiry",
                                          search: `?id=${data?._id}`,
                                        }}
                                        data-bs-toggle="tooltip"
                                        title="Edit"
                                      >
                                        <i className="far fa-edit text-warning me-1"></i>
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        onClick={() => {
                                          openPopup(data?._id);
                                        }}
                                        data-bs-toggle="tooltip"
                                        title="Delete"
                                      >
                                        <i className="far fa-trash-alt text-danger me-1"></i>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  className="form-text text-danger"
                                  colSpan="10"
                                >
                                  No data
                                </td>
                              </tr>
                            )}
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
          <div className="text-center m-4">
            <h5
              className="mb-4"
              style={{ fontSize: "14px", fontFamily: "Plus Jakarta Sans" }}
            >
              Are you sure you want to Delete <br /> the selected Student
              Enquiry ?
            </h5>
            <button
              type="button"
              style={{ fontSize: "11px", fontFamily: "Plus Jakarta Sans" }}
              className="btn btn-danger px-4 py-2 rounded-pill fw-semibold text-uppercase mx-3"
              onClick={deletStudentData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-success px-4 py-2 text-uppercase fw-semibold text-white rounded-pill "
              onClick={closePopup}
              style={{ fontSize: "11px", fontFamily: "Plus Jakarta Sans" }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ListBusiness;
