import React, { useEffect, useState } from "react";
import { getallLoanEnquiry, getSingleLoanEnquiry, deleteLoanEnquiry } from "../../../api/Enquiry/Loan";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from "../../../compoents/sidebar";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";

export const ListLoanEnquiry = () => {

  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [loan, setLoan] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    getAllLoanDetails();
  }, [pagination.from, pagination.to]);

  const getAllLoanDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getallLoanEnquiry(data)
      .then((res) => {
        setLoan(res?.data?.result);
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

  const deletLoanData = () => {
    deleteLoanEnquiry(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllLoanDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };






  return (
    <div><div  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
    <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ backgroundColor: '#fff' }}>

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
                        
                            <h5 id="offcanvasRightLabel">Filter University</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                          </div>
                          <div className="offcanvas-body ">
                            <form>
                              <div className="from-group mb-3">
                                <label className="form-label">Passport No</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="universityName"
                                
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Passport No"
                                />
                                <label className="form-label"> Date</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="state"
                                
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search... Date"
                                />
                                <label className="form-label">Assigned User</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="averageFees"
                                
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Assigned User"
                                />
                                <label className="form-label">Assigned Platform</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="country"
                                 
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Assigned Platform"
                                />

                                <label className="form-label">Status</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="popularCategories"
                               
                                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  placeholder="Search...Status"
                                />
                              </div>
                              <div>
                                <button

                                  data-bs-dismiss="offcanvas"
                                  className="btn btn-cancel border-0 text-white float-right bg"
                                  style={{ backgroundColor: "#0f2239", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                 
                                >
                                  Reset
                                </button>
                                <button
                                  data-bs-dismiss="offcanvas"
                                  type="submit"
                                 
                                  className="btn btn-save border-0 text-white float-right mx-2"
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
                          <button style={{ backgroundColor: "#22A033",fontSize: '11px'  }} className="btn text-white ">
                            <i class="fa fa-file-excel" aria-hidden="true"></i>
                          </button>
                        </span>
                      </Link>
                    </li>

                    <li class="m-1">
                      <Link class="btn-filters">
                        <span>
                          <button
                            style={{ backgroundColor: "#9265cc",fontSize: '11px'  }}
                            className="btn text-white "
                          >
                            <i class="fa fa fa-upload" aria-hidden="true"></i>
                          </button>
                        </span>
                      </Link>
                    </li>
                    <li class="m-1">
                      <Link class="btn btn-pix-primary" to="/AddLoanEnquiry">
                        <button
                          className="btn btn-outline border text-white  "

                          style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>
                          Add Loan Enquiry
                        </button>
                      </Link>
                    </li>

                  </ol>


                </div>
                <div className="row">
          <div className="container">
          <div className="col-md-12">
            <div className="card mt-2 border-0">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                          <th className="text-capitalize text-start"> S.No.</th>
                          <th className="text-capitalize text-start"> Date </th>
                          <th className="text-capitalize text-start">Student Name</th>
                          <th className="text-capitalize text-start">Passport No</th>
                          <th className="text-capitalize text-start">Contact No </th>
                          <th className="text-capitalize text-start"> Email ID </th>
                          <th className="text-capitalize text-start">Assigned Platform</th>
                          <th className="text-capitalize text-start">Assigned User</th>
                         
                          <th className="text-capitalize text-start">Status </th>
                         
                          <th className="text-capitalize text-start"> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                      {loan && loan.length > 0 ? (
                                loan.map((data, index) => (
                        <tr key={index} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  >
                          <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                                    <td className="text-capitalize text-start" >{formatDate(data?.createdOn)}</td>
                                    <td className="text-capitalize text-start">{data?.studentName}</td>
                                    <td className="text-capitalize text-start">{data?.passportNumber}</td>
                                    <td className="text-capitalize text-start">{data?.primaryNumber}</td>
                                    <td className="text-capitalize text-start">{data?.email}</td>
                                    <td className="text-capitalize text-start">{data?.platform}</td>
                                    <td className="text-capitalize text-start">{data?.source}</td>
                                    <td className="text-capitalize text-start">{data?.assignedTo}</td>
                          <td>
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/ViewLoanEnquiry",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/EditLoanEnquiry",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>
                                    </Link>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        openPopup(data?._id);
                                      }}
                                     
                                    >
                                      <i className="far fa-trash-alt text-danger me-1"></i>
                                    </button>
                                  </div>
                                </td>
                        </tr>
                       ))
                      ) : (
                        <tr>
                          <td className="form-text text-danger" colSpan="9">
                            N0 Data Found In Page
                          </td>
                        </tr>
                      )}
                      
                       
                     
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-right my-2">
                  <Pagination variant="outlined" shape="rounded" color="primary"/>
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
          
              Are you sure you want to Delete <br /> the selected StudnetEnquiry ?
            </h5>
            <button
              type="button"
              style={{fontSize:"11px",fontFamily: 'Plus Jakarta Sans'}}
              className="btn btn-danger mx-3"
              onClick={deletLoanData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-info "
              onClick={closePopup}
              style={{fontSize:"11px",fontFamily: 'Plus Jakarta Sans'}}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>

        
        </div>
                    
               </div>     
    </div></div>
  )
}
export default ListLoanEnquiry