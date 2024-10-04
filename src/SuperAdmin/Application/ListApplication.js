import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallApplication, getFilterApplican,deleteApplication, getAllApplicantCard,assignStaffToEnquiries, deactivateClient,activeClient } from "../../api/applicatin";
import { Link, useLocation } from "react-router-dom";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import { getallStaff } from "../../api/staff";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";
import Masterheader from "../../compoents/header";
import { getMonthYear } from "../../Utils/DateFormat";

import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";

export default function Masterproductlist() {
  const initialStateInputs = {
    name: "",   
universityName:"",
programTitle:"",
isActive:"" 
  };

  
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [openDelete, setOpenDelete] = useState(false);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedStaffName, setSelectedStaffName] = useState(''); // To store the staff name
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [openAssign, setOpenAssign] = useState(false);
  const [staff, setStaff] = useState([]);
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [filter, setFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [pageSize, setPageSize] = useState(10); 
  const search = useRef(null);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [application, setApplication] = useState([]);
const [details, setDetails] = useState()

  useEffect(() => {
    getApplicationList();
       getallApplicantCount();
       getStaffList()
 
  }, [pagination.from, pagination.to,pageSize,pageSize]);

  const getStaffList = () => {
    getallStaff()
      .then((res) => {
        setStaff(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const getallApplicantCount = ()=>{
    getAllApplicantCard().then((res)=>setDetails(res?.data.result))
  }

  const getApplicationList = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
     
    };
    getFilterApplican(data)
      .then((res) => {
        console.log('yuvi',res)
        const value = res?.data?.result?.applicantList;
        setApplication(value);
        setPagination({
          ...pagination,count:res?.data?.result?.applicantCount
        })
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
        const universityList = res?.data?.result?.applicationListed;
        setApplication(universityList);
        const result = universityList.length ? "application" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const filterAgentList = (event) => {
    event?.preventDefault();
     setFilter(true);
    const data = {
         name:inputs.name,
         universityName:inputs.universityName,
         programTitle:inputs.programTitle,
         isActive:inputs.isActive,
         limit: 10,
        page: pagination.from,
       

    };
    getFilterApplican(data)
    .then((res) => {
      const sortedStudents = res?.data?.result?.applicationList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
      });
      setApplication(sortedStudents);
      setPagination({
        ...pagination,
        count: res?.data?.result?.applicantCount,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getApplicationList();
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
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
            text: "Student Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Univeristy Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Course Name",
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
              text: element?.name ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.universityName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.programTitle ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            
            {
              text: element?.isActive ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("ApplicationList", tablebody, "landscape");
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
            name: res?.name ?? "-",
            universityName: res?.universityName ?? "-",
            programTitle: res?.programTitle ?? "-",
            isActive: res?.isActive ?? "-",
          });
        });
        let header1 = [
          "name",
          "universityName",
          "programTitle",
         
          "isActive",
        ];
        let header2 = [
          "Student Name",
          "University Name",
          "Course Name",
         
          "Status",
        ];
        ExportCsvService.downloadCsv(
          list,
          "ApplicationList",
          "Application List",

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

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = application.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
     if (action === "Activate") {
      activateSelectedAgent();
    }else if (action === "DeActivate") {
      deactivateSelectedAgent();
    }else if (action === "Assign") {
      // activateSelectedAgent();
      setOpenAssign(true);
    }
  };
 
  const activateSelectedAgent = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to activate the clients
      activeClient({ applicantIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("application activated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful activation
          getApplicationList(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Already activate application.");
        });
    } else {
      toast.warning("No selected application.");
    }
  };

  const deactivateSelectedAgent= () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to deactivate the clients
      deactivateClient({ applicantIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("application deactivated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful deactivation
          getApplicationList(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Aready to deactivate application.");
        });
    } else {
      toast.warning("No selected application.");
    }
  };

  const handleStaffSelect = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedStaffId = event.target.value;
    const selectedStaffName = event.target.options[selectedIndex].text;
    setSelectedStaffId(selectedStaffId);
    setSelectedStaffName(selectedStaffName);   // Store staff ID   
  }
  const handleSubmitStaffAssign = () => {
    if (selectedIds.length > 0 && selectedStaffId) {
      assignStaffToEnquiries({ Ids: selectedIds, staffId: selectedStaffId , staffName: selectedStaffName  })
        .then(() => {
          toast.success('Student assigned successfully!');
          setSelectedIds([]); // Clear selected enquiries
          getApplicationList(); // Refresh student enquiries
        })
        .catch((err) => {
          console.log(err);
          toast.error('Failed to assign student.');
        });
    } else {
      toast.warning('Please select enquiries and student.');
    }
  };

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
          <li class="m-1">
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
                          <h5 id="offcanvasRightLabel">Filter Application</h5>
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
                              <label className="form-label">Student Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={handleInputs}
                                placeholder="Search...Student Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                               <label className="form-label">University Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="universityName"
                                onChange={handleInputs}
                                placeholder="Search...University Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                              <label className="form-label">Course Name </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="programTitle"
                                onChange={handleInputs}
                                placeholder="Search...programTitle"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                              <label className="form-label">
                            Status
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="isActive"
                                onChange={handleInputs}
                                placeholder="Search...passportNo"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                              
                            
                              <label className="form-label">
                             Assign Staff
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="staffName"
                                onChange={handleInputs}
                                placeholder="Search...Staff"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 rounded-1 fw-semibold text-white float-right bg"
                                onClick={resetFilter}
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
                                onClick={filterAgentList}
                                className="btn btn-save border-0 rounded-1 fw-semibold text-white float-right mx-2"
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
                  <li class="m-1">
                    <Link onClick={pdfDownload}>
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
                    <Link onClick={exportCsv} class="btn-filters">
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
                <h6><i className="fas fa-paper-plane"></i>&nbsp;&nbsp;No of Application</h6>
                <p className="card-text">{details?.totalApplication}</p>
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
                              <option value="DeActivate">DeActivate</option>
                              <option value="Assign">Assign</option>
                             
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
                              <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === application.length
                                    }
                                  />
                            </th>
                              <th className="text-capitalize text-start sortable-handle">
                                S No
                              </th>
                              <th className="text-capitalize text-start">
                                {" "}
                                Code
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Date
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
                                Assign Staff
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
                                <input
                                      type="checkbox"
                                      checked={selectedIds.includes(data._id)}
                                      onChange={() => handleCheckboxChange(data._id)}
                                    />
                              </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {pagination.from + index + 1}
                                </td>
                              
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.applicationCode || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {getMonthYear(data?.createdOn) || "Not Available"}
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
                               < td className="text-capitalize text-start ">
                                {data?.staffName || "Not Data"}
          </td>
                                <td className="text-capitalize text-start ">
                                {data?.isActive || "Not Data"}
          </td>

                                <td className="text-capitalize text-start text-truncate">
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/view_application",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/edit_application",
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
  {application?.map((data, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="card shadow-sm  rounded-1 text-bg-light h-100" style={{fontSize:'10px'}}>
          <div className="card-header   d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{data?.name || "Not Available"}</h6>
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
                    <strong>  Application ID</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.applicationCode || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Date</strong>
                  </div>
                  <div className="col-md-7">
                  {getMonthYear(data?.createdOn) || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>University Applied</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.universityName || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Course Applied</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.course || data?.programTitle ||"Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Status</strong>
                  </div>
                  <div className="col-md-7 ">
                  {data?.isActive || "Not Data"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
          <Link
                                      className="btn btn-sm btn-outline-primary"
                                      to={{
                                        pathname: "/view_application",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="btn btn-sm btn-outline-primary"
                                      to={{
                                        pathname: "/edit_application",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>
                                    </Link>
                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => {
                                        openPopup(data?._id);
                                      }}
                                    >
                                      <i className="far fa-trash-alt text-danger me-1"></i>
                                    </button>
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
      <Dialog 
        open={openAssign} 
        onClose={() => setOpenAssign(false)}
        PaperProps={{
          style: {
            width: '600px', // Set custom width
            height: '400px', // Set custom height
            maxWidth: 'none', // Prevents default max-width from Material-UI
          },
        }}
      >
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
              Assign to Staff
            </h5>

            <form>
              <div className="from-group mb-3">
                <label  className="form-label">
                  Staff List
                </label>
                <select
                        className="form-select rounded-1"
                        name="staffName"
                        onChange={handleStaffSelect}  // Capture selected staffId
                    >
                        <option value="1">Select a Staff</option>
                        {staff.map((staff, index) => (
                            <option key={index} value={staff._id}>{staff.empName}</option>  // Use staff._id as value
                        ))}
                    </select>
              </div>

              <button
                type="button"
                className="btn btn-success mt-4 px-3 py-1 rounded-pill text-uppercase fw-semibold text-white mx-3"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                onClick={handleSubmitStaffAssign}
              >
                Yes
              </button>

              <button
                type="button"
                className="btn btn-danger mt-4 px-3 py-1 rounded-pill text-uppercase text-white fw-semibold"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                onClick={() => setOpenAssign(false)}  
              >
                Cancel
              </button>
            </form>
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
