import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { getallStudnetEnquiry, getSingleStudnetEnquiry, deleteStudnetEnquiry } from "../../../api/Enquiry/student";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from "../../../compoents/sidebar";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";

export const ListStudentForm = () => {

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

  }

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
    <div>
      <div style={{ fontFamily: 'Plus Jakarta Sans' }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
          <div className='content-wrapper' style={{fontSize:'14px' }}>
            <div className="container">
              <div className="content-header">
              <div className="row">
         <div className='col-xl-12'  >
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


                  <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                    <button className="btn btn-primary" type="button" style={{ fontSize: '11px' }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Filter Student Enquiry</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
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

                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...Student Code"
                            />
                            <label className="form-label">Name</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="state"

                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...Name"
                            />
                            <label className="form-label">Desired Country</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="averageFees"

                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...Desired Country"
                            />
                            <label className="form-label">Source</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="country"

                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...Source"
                            />

                            <label className="form-label">Assigned To</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="popularCategories"

                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...Assigned To"
                            />
                          </div>
                          <div>
                            <button

                              data-bs-dismiss="offcanvas"
                              className="btn btn-cancel border-0 fw-semibold text-uppercase rounded-pill px-4 py-2 text-white float-right bg"
                              style={{ backgroundColor: "#0f2239", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}

                            >
                              Reset
                            </button>
                            <button
                              data-bs-dismiss="offcanvas"
                              type="submit"

                              className="btn btn-save border-0 fw-semibold text-uppercase rounded-pill px-4 py-2 text-white float-right mx-2"
                              style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
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
                  <Link >
                    <button style={{ backgroundColor: "#E12929", fontSize: '11px' }} className="btn text-white ">
                      <span>
                        <i class="fa fa-file-pdf" aria-hidden="true"></i>
                      </span>
                    </button>
                  </Link>
                </li>
                <li class="m-1">
                  <Link class="btn-filters">
                    <span>
                      <button style={{ backgroundColor: "#22A033", fontSize: '11px' }} className="btn text-white ">
                        <i class="fa fa-file-excel" aria-hidden="true"></i>
                      </button>
                    </span>
                  </Link>
                </li>

                <li class="m-1">
                  <Link class="btn-filters">
                    <span>
                      <button
                        style={{ backgroundColor: "#9265cc", fontSize: '11px' }}
                        className="btn text-white "
                      >
                        <i class="fa fa fa-upload" aria-hidden="true"></i>
                      </button>
                    </span>
                  </Link>
                </li>
                <li class="m-1">
                  <Link class="btn btn-pix-primary" to="/AddStudentForm">
                    <button
                      className="btn btn-outline border-0 text-white  "

                      style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                    >
                      <i
                        class="fa fa-plus-circle me-2"
                        aria-hidden="true"
                      ></i>
                      Add Student Form
                    </button>
                  </Link>
                </li>

              </ol>


            </div>
         </div>
              </div>
          
           
            <div className="row">
              
                <div className="col-xl-12">
                  <div className="card border-0">
                    <div className="card-body">
                      <div className="card-table">
                        <div className="table-responsive">
                          <table className=" table card-table dataTable text-center" style={{ color: '#9265cc', fontSize: '13px' }}
              ref={tableRef}>
                            <thead>
                              <tr style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} >
                                <th className="text-capitalize text-start sortable-handle"> S.No.</th>
                                <th className="text-capitalize text-start sortable-handle"> Date </th>
                                <th className="text-capitalize text-start sortable-handle"> Student Code </th>
                                <th className="text-capitalize text-start sortable-handle"> Name </th>
                                <th className="text-capitalize text-start sortable-handle"> Contact Number </th>
                                <th className="text-capitalize text-start sortable-handle"> Email ID </th>
                                <th className="text-capitalize text-start sortable-handle"> Desired Country</th>
                                <th className="text-capitalize text-start sortable-handle"> Source</th>
                                <th className="text-capitalize text-start sortable-handle"> Assigned To</th>
                                <th className="text-capitalize text-start sortable-handle"> Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {student && student.length > 0 ? (
                                student.map((data, index) => (
                                  <tr key={index} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                                    <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                                    <td className="text-capitalize text-start" > {formatDate(data?.createdOn ? data?.createdOn : data?.modifiedOn ? data?.modifiedOn : "-")}</td>
                                   
                                    <td className="text-capitalize text-start">{data?.studentCode}</td>
                                    <td className="text-capitalize text-start">{data?.name}</td>
                                    <td className="text-capitalize text-start">{data?.primaryNumber}</td>
                                    <td className="text-capitalize text-start">{data?.email}</td>
                                    <td className="text-capitalize text-start">{data?.desiredCountry}</td>
                                    <td className="text-capitalize text-start">{data?.source}</td>
                                    <td className="text-capitalize text-start">{data?.assignedTo}</td>
                                    <td>
                                      <div className="d-flex">
                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/ViewStudentForm",
                                            search: `?id=${data?._id}`,
                                          }}
                                        >
                                          <i className="far fa-eye text-primary me-1"></i>
                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/EditStudentForm",
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
                                ))
                              ) : (
                                <tr>
                                  <td className="form-text text-danger" colSpan="10">
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
          <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4"    style={{fontSize:"14px",fontFamily: 'Plus Jakarta Sans'}}>
          
              Are you sure you want to Delete <br /> the selected Student Enquiry ?
            </h5>
            <button
              type="button"
              style={{fontSize:"12px",fontFamily: 'Plus Jakarta Sans'}}
              className="btn btn-danger rounded-pill px-4 py-2 fw-semibold text-uppercase mx-3"
              onClick={deletStudentData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-success rounded-pill px-4 py-2 fw-semibold text-uppercase "
              onClick={closePopup}
              style={{fontSize:"12px",fontFamily: 'Plus Jakarta Sans'}}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>

        </div>
      </div>
    </div>
    
  )
}
export default ListStudentForm;