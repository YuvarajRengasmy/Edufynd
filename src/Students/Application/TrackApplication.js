import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallApplication, deleteApplication } from "../../api/applicatin";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";
import Masterheader from "../../compoents/header";
import { getStudentId } from "../../Utils/storage";
import { getMonthYear } from "../../Utils/DateFormat";
import Mastersidebar from '../../compoents/StudentSidebar';

import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";

import {  getSingleStudent } from "../../api/student";
export default function Masterproductlist() {
  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessMailID: "",
    businessContactNo: "",
    website: "",
    addressLine1: "", // Street Address, City, State, Postal Code, Country
    addressLine2: "",
    addressLine3: "",
    name: "",
    contactNo: "",
    emailID: "",
    gstn: "",
    status: "",
  };

  const [application, setApplication] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [student, setStudent] = useState(null);

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getStudentDetails();
    getApplicationList();
  }, []);


  const getStudentDetails = () => {
    const id = getStudentId();
    getSingleStudent(id)
      .then((res) => {
        console.log("yuvi", res);
        setStudent(res?.data?.result); // Assuming the staff data is inside res.data.result
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  if (!student || !student.privileges) {
    // return null; // or a loading spinner
  }
  
  const studentPrivileges = student?.privileges?.find(privilege => privilege.module === 'application');
  
  if (!studentPrivileges) {
    // return null; // or handle the case where there's no 'Student' module privilege
  }

  const getApplicationList = () => {
    const data ={
      studentId:getStudentId()
    }
    getallApplication(data)
      .then((res) => {
        const value = res?.data?.result;
        setApplication(value);
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
  const deleteApplicationData = () => {
    deleteApplication(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getApplicationList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const handleInputs = (event) => {
    setApplication({ ...application, [event.target.name]: event.target.value });
  };
  const openImportPopup = () => {
    setOpenImport(true);
  };

  const closeImportPopup = () => {
    setOpenImport(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallApplication(application)
      .then((res) => {
        var result = res?.data?.result;
        var tablebody = [];
        tablebody.push([
          {
            text: "S.NO",
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          },
          {
            text: "ClientId",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "BusinessName",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "BusinessMailID",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "BusinessContactNo",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Status",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
        ]);
        result.forEach((element, index) => {
          tablebody.push([
            {
              text: index + 1,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
              border: [true, false, true, true],
            },
            {
              text: element?.clientID ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.businessName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.businessMailID ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.businessContactNo ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.status ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("clientList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallApplication(application)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            clientID: res?.clientID ?? "-",
            businessName: res?.businessName ?? "-",
            businessMailID: res?.businessMailID ?? "-",
            businessContactNo: res?.businessContactNo ?? "-",
            status: res?.status ?? "-",
          });
        });
        let header1 = [
          "clientID",
          "businessName",
          "businessMailID",
          "businessContactNo",
          "status",
        ];
        let header2 = [
          "Client Id",
          "Business Name",
          "Business MailID",
          "Business ContactNo",
          "Status",
        ];
        ExportCsvService.downloadCsv(
          list,
          "clientList",
          "Client List",

          header1,
          header2
        );
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

      <div
        className="content-wrapper  "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
       <div className="content-header bg-light shadow-sm sticky-top">
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-12">
        <ol className="d-flex justify-content-between align-items-center mb-0 list-unstyled">
          <li className="flex-grow-1">
            <div className="input-group" style={{ maxWidth: "600px" }}>
              <input
                type="search"
                placeholder="Search"
                aria-describedby="button-addon3"
                className="form-control border-1 ps-1 rounded-4"
                style={{ fontSize: "12px" }}
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
                <i className="fas fa-search" style={{ color: "black" }}></i>
              </span>
            </div>
          </li>
          <li className="m-1">
            <button
              className="btn btn-primary"
              style={{ fontSize: "12px" }}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <FaFilter />
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Filter Application</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">
                <form>
                  <div className="form-group mb-3">
                    <label className="form-label">Applicant Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessName"
                      onChange={handleInputs}
                      placeholder="Search...Applicant Code"
                      style={{ fontSize: "12px" }}
                    />
                    <label className="form-label mt-3">University Applied</label>
                    <input
                      type="text"
                      className="form-control"
                      name="businessContactNo"
                      onChange={handleInputs}
                      placeholder="Search...University Applied"
                      style={{ fontSize: "12px" }}
                    />
                    <label className="form-label mt-3">Course Applied</label>
                    <input
                      type="text"
                      className="form-control"
                      name="status"
                      onChange={handleInputs}
                      placeholder="Search...Course Applied"
                      style={{ fontSize: "12px" }}
                    />
                    <label className="form-label mt-3">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      name="clientID"
                      onChange={handleInputs}
                      placeholder="Search...Status"
                      style={{ fontSize: "12px" }}
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      data-bs-dismiss="offcanvas"
                      className="btn btn-cancel border-0 fw-semibold text-white"
                      style={{
                        backgroundColor: "#0f2239",
                        fontSize: "14px",
                      }}
                    >
                      Reset
                    </button>
                    <button
                      data-bs-dismiss="offcanvas"
                      type="submit"
                      className="btn btn-save border-0 fw-semibold text-white ms-2"
                      style={{
                        backgroundColor: "#fe5722",
                        fontSize: "14px",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </li>
          <li className="m-1">
            <Link onClick={pdfDownload}>
              <button
                style={{ backgroundColor: "#E12929", fontSize: "12px" }}
                className="btn text-white"
              >
                <i className="fa fa-file-pdf" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={exportCsv}>
              <button
                style={{ backgroundColor: "#22A033", fontSize: "12px" }}
                className="btn text-white"
              >
                <i className="fa fa-file-excel" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={openImportPopup}>
              <button
                style={{ backgroundColor: "#9265cc", fontSize: "12px" }}
                className="btn text-white"
              >
                <i className="fa fa-upload" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
          {studentPrivileges?.add && (
            <Link to="/student_add_application">
              <button
                className="btn btn-outline rounded-1 fw-semibold border-0 text-white"
                style={{
                  backgroundColor: "#231f20",
                  fontSize: "12px",
                }}
              >
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                Add Application
              </button>
            </Link>
          )}
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>


    

    <div className="container-fluid mt-3 " >
      <div className="row">
        {/* Application Submitted Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-paper-plane"></i>&nbsp;&nbsp;Application Submitted</h6>
                <p className="card-text">45</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Offered and Rejected Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#2196F3', color: '#fff' }}>
              <div className="card-body text-center">
            
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column">
                    <h6><i className="fas fa-thumbs-up"></i>&nbsp;&nbsp;Offered</h6>
                    <p className="card-text">30</p>
                  </div>
                  <div className="d-flex flex-column">
                    <h6><i className="fas fa-thumbs-down"></i>&nbsp;&nbsp;Rejected</h6>
                    <p className="card-text">15</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Deposit Paid Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#FFC107', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-money-bill-wave"></i>&nbsp;&nbsp;Deposit Paid</h6>
                <p className="card-text">20</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Travel Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#FF5722', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-plane"></i>&nbsp;&nbsp;Travel</h6>
                <p className="card-text">10</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Enrolled Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#009688', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-user-check"></i>&nbsp;&nbsp;Enrolled</h6>
                <p className="card-text">25</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Invoices Raised Card */}
        <div className="col-md-3 flex-shrink-0">
          <Link to="#" className="text-decoration-none">
            <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#3F51B5', color: '#fff' }}>
              <div className="card-body text-center">
                <h6><i className="fas fa-file-invoice-dollar"></i>&nbsp;&nbsp;Invoices Raised</h6>
                <p className="card-text">8</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
       
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card rounded-1 shadow-sm border-0">
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
                        {studentPrivileges?.delete && (      <option value="20">Delete</option> )}
                      </select>{" "}

                    </p>


                  </div>
                </div>
                  <div className="card-body">
                    <div className="card-table">
                      <div className="table-responsive">
                        <table
                          className=" table table-hover card-table dataTable table-responsive-sm text-center"
                          ref={tableRef}
                        >
                          <thead className="table-light">
                            <tr
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <th className=" text-start">
                            <input type="checkbox" />
                            </th>
                              <th className="text-capitalize text-start sortable-handle">
                                S No
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Date
                              </th>
                              <th className="text-capitalize text-start">
                                {" "}
                                Code
                              </th>

                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Name
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                University Applied
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Course Applied
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Status
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {application?.map((data, index) => (
                              <tr
                                key={index}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              >
                                <td className=" text-start">
                              <input type="checkbox" />
                              </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {pagination.from + index + 1}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {getMonthYear(data?.createdOn) || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.applicationCode || "Not Available"}
                                </td>

                                <td className="text-capitalize text-start text-truncate">
                                  {data?.name || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.universityName || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.course || data?.programTitle ||"Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate"></td>

                                <td className="text-capitalize text-start text-truncate">
                                  <div className="d-flex">
                                  {studentPrivileges?.view && (
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/student_view_application",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                  )}
                                  
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
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete <br /> the selected Application ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success border-0 text-white   fw-semibold  mx-3"
              onClick={deleteApplicationData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel btn-danger border-0 text-white   fw-semibold  "
              onClick={closePopup}
              style={{ fontSize: "12px" }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter University
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
      <Dialog open={openImport} fullWidth maxWidth="sm">
        <DialogTitle>
          Upload University List
          <IconButton className="float-right" onClick={closeImportPopup}>
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
                  className="form-control  text-dark bg-transparent"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              <Link
                to="/ListUniversity"
                className="btn btn-cancel border-0  fw-semibold   text-white float-right bg"
                style={{ backgroundColor: "#0f2239", fontSize: "12px" }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0  fw-semibold   text-white float-right mx-2"
                style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
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
