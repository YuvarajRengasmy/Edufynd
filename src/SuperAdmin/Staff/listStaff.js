import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import {getallStaff,deleteStaff} from "../../api/staff";
import Mastersidebar from "../../compoents/sidebar";
import { formatDate } from "../../Utils/DateFormat";

import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";

import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, backdropClasses, radioClasses, } from "@mui/material";
function ListStaff() {



  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });


  
  const [staff, setStaff] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    getAllStaffDetails();
  }, [pagination.from, pagination.to]);

  const getAllStaffDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };

    getallStaff(data)
      .then((res) => {
       
        setStaff(res?.data?.result);
        setPagination({ ...pagination, count: res?.data?.result?.staffCount });
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

  const deleteStaffData = () => {
    deleteStaff (deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllStaffDetails();
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
    <>
        
    <div >
         
            <Mastersidebar />
        
        <div className='content-wrapper ' style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div className='content-header bg-light shadow-sm sticky-top'>
  <div className="container">
    <div className="row">
      <div className='col-xl-12'>
        <ol className="list-unstyled mb-0 d-flex justify-content-end align-items-center w-100">
          <li className="flex-grow-1 me-2">
            <div className="input-group" style={{ maxWidth: "600px" }}>
              <input
                type="search"
                placeholder="Search...."
                aria-describedby="button-addon3"
                className="form-control border-1 rounded-4"
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
                  cursor: "pointer"
                }}
              >
                <i className="fas fa-search" style={{ color: "black" }}></i>
              </span>
            </div>
          </li>
          <li className="ms-2">
            <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
              <button className="btn btn-primary" type="button" style={{ fontSize: '11px' }} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <FaFilter />
              </button>
              <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                  <h5 id="offcanvasRightLabel">Filter Staff</h5>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Employee ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="employeeID"
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Employee ID"
                      />
                      <label className="form-label mt-3">DOJ</label>
                      <input
                        type="text"
                        className="form-control"
                        name="doj"
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...DOJ"
                      />
                      <label className="form-label mt-3">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Designation"
                      />
                      <label className="form-label mt-3">Reporting Manager</label>
                      <input
                        type="text"
                        className="form-control"
                        name="reportingManager"
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Reporting Manager"
                      />
                      <label className="form-label mt-3">Status</label>
                      <input
                        type="text"
                        className="form-control"
                        name="status"
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Status"
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        data-bs-dismiss="offcanvas"
                        className="btn btn-cancel border-0 rounded-pill fw-semibold text-white me-2"
                        style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="btn btn-save border-0 rounded-pill fw-semibold text-white"
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
          <li className="ms-2">
            <Link>
              <button style={{ backgroundColor: "#E12929", fontSize: '12px' }} className="btn text-white rounded-1 border-0">
                <i className="fa fa-file-pdf" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="ms-2">
            <Link className="btn-filters">
              <button style={{ backgroundColor: "#22A033", fontSize: '12px' }} className="btn text-white rounded-1 border-0">
                <i className="fa fa-file-excel" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="ms-2">
            <Link className="btn-filters">
              <button style={{ backgroundColor: "#7627ef", fontSize: '12px' }} className="btn text-white rounded-1 border-0">
                <i className="fa fa-upload" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="ms-2">
            <Link className="btn btn-pix-primary" to="/add_staff">
              <button
                className="btn btn-outline fw-semibold border-0 rounded-1 text-white"
                style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              >
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                Add Staff
              </button>
            </Link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>


<div className="content-body">
<div className="container mt-3">
      <div className="row">
        {/* Card 1: Active Logins - Daily */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#43A047" }} // Leaf Green
            >
              <div className="card-body">
                <h6 className="">
                  <i className="fas fa-sign-in-alt" style={{ color: '#ffffff' }}></i> Active Logins - Daily
                </h6>
                <p className="card-text">Total: 150</p>
                <p className="card-text">
                  <i className="fas fa-clock" style={{ color: '#ffffff' }}></i> Logins Today
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 2: Total Staff - Active Overall */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#D32F2F" }} // Red
            >
              <div className="card-body">
                <h6 className="">
                  <i className="fas fa-users" style={{ color: '#ffffff' }}></i> Total Staff - Active Overall
                </h6>
                <p className="card-text">Total: 350</p>
                <p className="card-text">
                  <i className="fas fa-user-check" style={{ color: '#ffffff' }}></i> Active Staff
                </p>
              </div>
            </div>
          </Link>
        </div>

     
      </div>
    </div>
          
            <div className="container">
            <div className="row">
          <div className="col-xl-12">
          <div className="col-md-12">
            <div className="card rounded-1 shadow-sm mt-2 border-0">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table table-hover card-table dataTable table-responsive-sm text-center"   style={{ color: '#9265cc', fontSize: '13px' }}
              ref={tableRef}>
                      <thead className="table-light">
                        <tr style={{fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                          <th className="text-capitalize text-start sortable-handle"> S.No.</th>
                          <th className="text-capitalize text-start sortable-handle">Emp_ID </th>
                          <th className="text-capitalize text-start sortable-handle"> DOJ </th>
                          <th className="text-capitalize text-start sortable-handle"> Name </th>
                          <th className="text-capitalize text-start sortable-handle"> Designation</th>
                          <th className="text-capitalize text-start sortable-handle"> Reporting_Manager </th>
                          <th className="text-capitalize text-start sortable-handle"> Contact No </th>
                          
                          <th className="text-capitalize text-start sortable-handle"> Status </th>
                          <th className="text-capitalize text-start sortable-handle"> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                      {staff?.map((data, index) => (
                        <tr key={index} style={{ fontFamily: "Plus Jakarta Sans", fontSize: "11px" }} >
                           <td className="text-capitalize text-start text-truncate">{pagination.from + index + 1}</td>
                          <td className="text-capitalize text-start text-truncate">{data?.employeeID  || "Not Available"}</td>
                          <td className="text-capitalize text-start text-truncate">{formatDate(data?.doj)  || "Not Available"}</td>
                          <td className="text-capitalize text-start text-truncate">{data?.empName  || "Not Available"}</td>
                          <td className="text-capitalize text-start text-truncate">{data?.designation  || "Not Available"}</td>
                          <td className="text-capitalize text-start text-truncate">{data?.reportingManager  || "Not Available"}</td>
                          <td className="text-capitalize text-start text-truncate">{data?.mobileNumber  || "Not Available"}</td>
                          
                          <td className="text-capitalize text-start text-truncate">{data?.active  || "Not Available"}</td>
                          
                          <td  className="text-capitalize text-start text-truncate">
                          <div className="d-flex">
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/view_staff",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-eye text-primary me-1"></i>

                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/edit_staff",
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
                    {staff?.length === 0 ? (
                     <tr>
                       <td className="form-text text-danger" colSpan="9">
                         No data In Staff
                       </td>
                     </tr>
                    ) : null}
                     
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
            </div>
</div>
         
          
          
        
                
        


        
        </div>
        <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete <br /> the selected Staff?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-danger fw-semibold  rounded-pill  mx-3"
              onClick={deleteStaffData}
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel btn-success fw-semibold  rounded-pill  "
              onClick={closePopup}
              style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
                    
               </div>     
   
    </>
  )
};
export default ListStaff;
