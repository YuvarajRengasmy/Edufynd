import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import {getallStaff,deleteStaff,getFilterStaffSuperAdmin,updateStaff} from "../../api/staff";
import Mastersidebar from "../../compoents/StaffSidebar";
import { formatDate } from "../../Utils/DateFormat";
import { Link, useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, backdropClasses, radioClasses, } from "@mui/material";
import {getStaffId } from "../../Utils/storage";
import {  getSingleStaff } from "../../api/staff";
function ListStaff() {

  const initialStateInputs = {
   empName: "",
    designation: "",
   mobileNumber: "",
    email: "",
    reportingManager: "",
    employeeID:""
  };
  const [file, setFile] = useState(null);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const search = useRef(null);
  const [filter, setFilter] = useState(false);
  const [inputs, setInputs] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [openDelete, setOpenDelete] = useState(false);
  const [pageSize, setPageSize] = useState(10); 
  const [staff, setStaff] = useState(null);
  const [staffp, setStaffp] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
 

  useEffect(() => {
    getStaffDetails();
    getAllStaffDetails();
  }, [pagination.from, pagination.to,pageSize]);

  const getStaffDetails = () => {
    const id = getStaffId();
    getSingleStaff(id)
      .then((res) => {
        console.log("yuvi", res);
        setStaffp(res?.data?.result); // Assuming the staff data is inside res.data.result
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  if (!staff || !staff.privileges) {
    // return null; // or a loading spinner
  }
  
  const studentPrivileges = staff?.privileges?.find(privilege => privilege.module === 'staff');
  
  if (!studentPrivileges) {
    // return null; // or handle the case where there's no 'Student' module privilege
  }

  useEffect(() => {
    if (search.current) {
      search.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      search.current.value = searchValue.substring(1);
      handleSearch();
    }
  }, [searchValue]);

  const handleInputsearch = (event) => {
    if (event.key === "Enter") {
      search.current.blur();
      handleSearch();
    }
  };

  const handleSearch = (event) => {
    const data = search.current.value;
    event?.preventDefault();
    getSuperAdminForSearch(data)
      .then((res) => {
        const universityList = res?.data?.result?.staffList;
        setStaff(universityList);
        const result = universityList.length ? "Staff" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const getAllStaffDetails = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };

    getFilterStaffSuperAdmin(data)
      .then((res) => {
       
        setStaff(res?.data?.result?.staffList);
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
  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllStaffDetails();
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

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size when dropdown changes
    setPagination({ ...pagination, from: 0, to: Number(event.target.value) }); // Reset pagination
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const filterStaffList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      empName:inputs.empName,
      designation: inputs.designation,
      mobileNumber: inputs.mobileNumber,
      email: inputs.email,
      reportingManager:inputs.reportingManager,
      employeeID:inputs.employeeID,
      limit: 10,
      page: pagination.from,
    };
    getFilterStaffSuperAdmin(data)
      .then((res) => {
        console.log("uio",res);
        setStaff(res?.data?.result?.staffList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.staffCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallStaff(staff)
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
            text: "Staff Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Designation",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "ReportingManager",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "shiftTiming",
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
              text: element?.empName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.designation ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.reportingManager ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.shiftTiming ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("staffList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallStaff(staff)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
           
            empName: res?.empName ?? "-",
            designation: res?.designation ?? "-",
            reportingManager: res?.reportingManager ?? "-",
            shiftTiming: res?.shiftTiming ?? "-",
          });
        });
        let header1 = [
         
          "empName",
          "designation",
          "reportingManager",
          "shiftTiming",
        ];
        let header2 = [
         
          "Staff Name",
          "Designation",
          "ReportingManager",
          "ShiftTiming",
        ];
        ExportCsvService.downloadCsv(
          list,
          "staffList",
          "Staff List",

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


  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = staff.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      setOpenDelete(true);
      // deleteSelectedstaff();
    } else if (action === "Activate") {
      activateSelectedstaff();
    }
  };
  const deleteSelectedstaff = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) =>deleteStaff(id)))
        .then((responses) => {
          toast.success("staff deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getAllStaffDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete staff.");
        });
    } else {
      toast.warning("No staff selected.");
    }
  };
  const activateSelectedstaff = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => updateStaff(id,{ active: true })))
        .then((responses) => {
          toast.success("staff activated successfully!");
          setSelectedIds([]);
          getAllStaffDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate staff.");
        });
    } else {
      toast.warning("No staff selected.");
    }
  }; 

  return (
    <>
        
    <div >
         
            <Mastersidebar />
        
        <div className='content-wrapper ' style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div className='content-header bg-light shadow-sm sticky-top mb-0'>
  <div className="container">
    <div className="row">
      <div className='col-xl-12'>
        <ol className="list-unstyled mb-0 d-flex justify-content-end align-items-center w-100 mb-0">
        <li className="flex-grow-1">
            <form onSubmit={handleSearch}>
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="search"
                  placeholder="Search....."
                  ref={search}
                  onChange={handleInputsearch}
                  aria-describedby="button-addon3"
                  className="form-control border-1 border-dark rounded-4"
                  style={{ fontSize: '12px' }}
                />
                <button
                  className="input-group-text bg-transparent border-0"
                  id="button-addon3"
                  type="submit"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-search" style={{ color: "black" }}></i>
                </button>
              </div>
            </form>
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
                        onChange={handleInputs}
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Employee ID"
                      />
                      
                      <label className="form-label mt-3">Staff Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="empName"
                        onChange={handleInputs}
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...StaffName"
                      />
                      <label className="form-label mt-3">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        onChange={handleInputs}
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Designation"
                      />
                      <label className="form-label mt-3">Reporting Manager</label>
                      <input
                        type="text"
                        className="form-control"
                        name="reportingManager"
                        onChange={handleInputs}
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...Reporting Manager"
                      />
                      <label className="form-label mt-3">MobileNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        onChange={handleInputs}
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...mobileNumber"
                      />
                      <label className="form-label mt-3">email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={handleInputs}
                        style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        placeholder="Search...mobileNumber"
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        data-bs-dismiss="offcanvas"
                        onClick={resetFilter}
                        className="btn btn-cancel border-0 rounded-pill fw-semibold text-white me-2"
                        style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                         data-bs-dismiss="offcanvas"
                        onClick={filterStaffList}
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

          <li className="m-1">
            <Link onClick={pdfDownload}>
              <button
                style={{ backgroundColor: "#E12929", fontSize: "12px" }}
                className="btn text-white rounded-1 border-0"
              >
                <i className="fa fa-file-pdf" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={exportCsv}>
              <button
                style={{ backgroundColor: "#22A033", fontSize: "12px" }}
                className="btn text-white rounded-1 border-0"
              >
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
          {studentPrivileges?.add && (
            <Link className="btn btn-pix-primary" to="/staff_add_staff">
              <button
                className="btn btn-outline fw-semibold border-0 rounded-1 text-white"
                style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              >
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                Add Staff
              </button>
            </Link>
          )}
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
        <div className="col-md-4 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-1 border-0 text-white shadow-sm"
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
        <div className="col-md-4 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-1 border-0 text-white shadow-sm"
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
            <div className="card-header bg-white mb-0 mt-1 pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex  mb-0">
                    <p className="me-auto">
                            Change
                            <select
                              className="form-select form-select-sm rounded-1 d-inline mx-2"
                              aria-label="Default select example1"
                              style={{
                                width: "auto",
                                display: "inline-block",
                                fontSize: "12px",
                              }}
                              onChange={handleActionChange}
                            >
                              <option value="">Select Action</option>
                              <option value="Activate">Activate</option>
                              {studentPrivileges?.delete && (       <option value="Delete">Delete</option> )}
                            </select>
                          </p> 
                    </div>

                    <div>
                    
                       
                        <ul class="nav nav-underline fs-9" id="myTab" role="tablist">
                          <li>
                            {" "}
                            <a
              className="nav-link active "
              id="home-tab"
              data-bs-toggle="tab"
              href="#tab-home"
              role="tab"
              aria-controls="tab-home"
              aria-selected="true"
            >
                          <i class="fa fa-list" aria-hidden="true"></i>    List View
                            </a>
                          </li>
                          <li>
                            
                              <a
                              className="nav-link "
                              id="profile-tab"
                              data-bs-toggle="tab"
                              href="#tab-profile"
                              role="tab"
                              aria-controls="tab-profile"
                              aria-selected="false"
                            >
                            
                            <i class="fa fa-th" aria-hidden="true"></i>  Grid View
                            </a>
                          </li>
                        </ul>
                      
                     
                    </div>
                  </div>
                </div>
              <div className="card-body">
              <div className="tab-content ">
                    {/* List View */}
                    <div
                      className="tab-pane fade show active"
                      id="tab-home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                       <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table table-hover card-table dataTable table-responsive-sm text-center"   style={{ color: '#9265cc', fontSize: '13px' }}
              ref={tableRef}>
                      <thead className="table-light">
                        <tr style={{fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                        <th className=" text-start">
                        <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === staff.length
                                    }
                                  />
                            </th>
                          <th className="text-capitalize text-start sortable-handle"> S.No.</th>
                          <th className="text-capitalize text-start sortable-handle">Staff ID </th>
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
                          <td className=" text-start">
                          <input
                                      type="checkbox"
                                      checked={selectedIds.includes(data._id)}
                                      onChange={() => handleCheckboxChange(data._id)}
                                    />
                              </td>
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
                          {studentPrivileges?.view && (
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/staff_view_staff",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-eye text-primary "></i>

                                </Link>
                          )}
                          {studentPrivileges?.edit && (
                                <Link
                                  className="dropdown-item"
                                  to={{
                                    pathname: "/staff_edit_staff",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-edit text-warning "></i>

                                </Link>
                          )}
                          {studentPrivileges?.delete && (
                                <Link
                                  className="dropdown-item"
                                  onClick={() => {
                                    openPopup(data?._id);
                                  }}
                                >
                                  <i className="far fa-trash-alt text-danger "></i>

                                </Link>
                          )}
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
</div>



<div
                     class="tab-pane fade " id="tab-profile" role="tabpanel" aria-labelledby="profile-tab"
                    >
          
          <div className="container">
  <div className="row">
  {staff?.map((data, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="card shadow-sm  rounded-1 text-bg-light h-100" style={{fontSize:'10px'}}> 
          <div className="card-header   d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{data?.empName  || "Not Available"}</h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>S.No</strong>
                  </div>
                  <div className="col-md-7">
                  {pagination.from + index + 1}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Staff ID</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.employeeID  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>DOJ</strong>
                  </div>
                  <div className="col-md-7">
                  {formatDate(data?.doj)  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Primary No</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.mobileNumber  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Designation</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.designation  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Reporting Manager</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.reportingManager  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Status</strong>
                  </div>
                  <div className="col-md-7 ">
                  {data?.active  || "Not Available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
          {studentPrivileges?.view && (
          <Link
                                  className="btn btn-sm btn-outline-primary"
                                  to={{
                                    pathname: "/staff_view_staff",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-eye text-primary "></i> View

                                </Link>
          )}
          {studentPrivileges?.edit && (
                                <Link
                                  className="btn btn-sm btn-outline-warning"
                                  to={{
                                    pathname: "/staff_edit_staff",
                                    search: `?id=${data?._id}`,
                                  }}
                                >
                                  <i className="far fa-edit text-warning "></i> Edit

                                </Link>
          )}
          {studentPrivileges?.delete && (
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => {
                                    openPopup(data?._id);
                                  }}
                                >
                                  <i className="far fa-trash-alt text-danger "></i>Delete

                                </button>
          )}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>







                    </div>
                </div>
               
                <div className="d-flex justify-content-between align-items-center p-3">
        <p className="me-auto">
          Show
          <select
            className="form-select form-select-sm rounded-1 d-inline mx-2"
            aria-label="Default select example1"
            style={{ width: "auto", display: "inline-block", fontSize: "12px" }}
            value={pageSize}
            onChange={handlePageSizeChange} // Handle page size change
          >
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>{" "}
          Entries out of {pagination.count}
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
</div>
         
          
          
        
                
        


        
        </div>
        <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete  the Selected Staff?
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
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogContent>
                  <div className="text-center m-4">
                    <h5 className="mb-4"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                  Are you sure you want to delete?</h5>
                    <button
                     type="button"
                     className="btn btn-success px-3 py-1 rounded-pill text-uppercase fw-semibold text-white mx-3"
                     style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}     
                     onClick={deleteSelectedstaff}
                     
                    >
                      Yes
                    </button>
                    <button
                     type="button"
                     className="btn btn-danger px-3 py-1 rounded-pill text-uppercase text-white fw-semibold"
                     style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                    
                      onClick={() => setOpenDelete(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  </DialogContent>
                </Dialog>
                    
               </div>     
   
    </>
  )
};
export default ListStaff;
