import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import {
  getallStudnetEnquiry,
  getSingleStudnetEnquiry,
  getFilterStudnetEnquiry,
  deleteStudnetEnquiry,
  deactivateClient,activeClient,
  assignStaffToEnquiries
} from "../../../api/Enquiry/student";
import { getallStaff } from "../../../api/staff";
import { Link, useLocation } from "react-router-dom";
import { getSuperAdminForSearch } from "../../../api/superAdmin";

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
  };


  const [pageSize, setPageSize] = useState(10); 
  const search = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [selectedStaffName, setSelectedStaffName] = useState(''); // To store the staff name
  const [openDelete, setOpenDelete] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [inputs, setInputs] = useState("");
  const [student, setStudent] = useState([]);
  const [staff, setStaff] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getAllStudentDetails();
    getStaffList();
  }, [pagination.from, pagination.to,pageSize]);
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
  const getStaffList = () => {
    getallStaff()
      .then((res) => {
        setStaff(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  const getAllStudentDetails = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterStudnetEnquiry(data)
      .then((res) => {
        setStudent(res?.data?.result?.studentList);
        setPagination({ ...pagination, count: res?.data?.result?.studentCount });
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
        const universityList = res?.data?.result?.studentList;
        setStudent(universityList);
        const result = universityList.length ? "studentEnquiry" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const filterAgentList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      agentName: inputs.agentName,
      agentCode: inputs.agentCode,
      mobileNumber: inputs.mobileNumber,
      businessName: inputs.businessName,
      limit: 10,
      page: pagination.from,
    };
    getFilterStudnetEnquiry(data)
    .then((res) => {
      setStudent(res?.data?.result?.studentList);
      setPagination({
        ...pagination,
        count: res?.data?.result?.studentCount,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialState);
    getAllStudentDetails();
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


  const pdfDownload = (event) => {
    event?.preventDefault();
    getallStudnetEnquiry(student)
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
            text: "Agent Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Business Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Agent Code",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Mobile Number",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Staff Name",
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
              text: element?.agentName ?? "-",
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
              text: element?.agentCode?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.staffName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.mobileNumber ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("agent List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallStudnetEnquiry(student)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            agentName: res?.agentName ?? "-",
            businessName: res?.businessName ?? "-",
            agentCode: res?.agentCode ?? "-",
            staffName: res?.staffName ?? "-",
            mobileNumber: res?.mobileNumber ?? "-",
          });
        });
        let header1 = [
          "agentName",
          "businessName",
          "agentCode",
          "staffName",
          "mobileNumber",
        ];
        let header2 = [
          "Agent Name",
          "Business Name",
          "Agent Code",
          "Staff Name",
          "Mobile Number",
        ];
        ExportCsvService.downloadCsv(
          list,
          "agentList",
          "Agent List",

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
      const allIds = student.map((data) => data._id); // Map all student IDs
      setSelectedIds(allIds); // Select all IDs
    } else {
      setSelectedIds([]); // Deselect all
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === 'Delete') {
      setOpenDelete(true);
    } else if (action === 'Activate') {
      activateSelectedStudent();
    } else if (action === 'DeActivate') {
      deactivateSelectedStudent();
    } else if (action === 'Assign') {
      setOpenAssign(true);
    }
  };

  const deleteSelectedstudent = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) =>deleteStudnetEnquiry(id)))
        .then(() => {
          toast.success('Student(s) deleted successfully!');
          setSelectedIds([]);
          setOpenDelete(false);
          getAllStudentDetails(); // Refresh student list
        })
        .catch((err) => {
          console.log(err);
          toast.error('Failed to delete student.');
        });
    } else {
      toast.warning('No student selected.');
    }
  };

  const activateSelectedStudent = () => {
    if (selectedIds.length > 0) {
      activeClient({ studentEnquiryIds: selectedIds })
        .then(() => {
          toast.success('Student(s) activated successfully!');
          setSelectedIds([]); // Clear selected IDs after success
          getAllStudentDetails(); // Refresh student list
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to activate student(s).');
        });
    } else {
      toast.warning('No student selected.');
    }
  };

  const deactivateSelectedStudent = () => {
    if (selectedIds.length > 0) {
      deactivateClient({ studentEnquiryIds: selectedIds })
        .then(() => {
          toast.success('Student deactivated successfully!');
          setSelectedIds([]); // Clear selected IDs after success
          getAllStudentDetails(); // Refresh student list
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to deactivate student(s).');
        });
    } else {
      toast.warning('No student selected.');
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
      assignStaffToEnquiries({ studentEnquiryIds: selectedIds, staffId: selectedStaffId , staffName: selectedStaffName  })
        .then(() => {
          toast.success('Staff assigned successfully!');
          setSelectedIds([]); // Clear selected enquiries
          getAllStudentDetails(); // Refresh student enquiries
        })
        .catch((err) => {
          console.log(err);
          toast.error('Failed to assign staff.');
        });
    } else {
      toast.warning('Please select enquiries and staff.');
    }
  };




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
                          <h5 id="offcanvasRightLabel">Filter Agent</h5>
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
                              <label className="form-label">Agent Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="agentName"
                                onChange={handleInputs}
                                placeholder="Search...Agent Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                               <label className="form-label">Agent Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessName"
                                onChange={handleInputs}
                                placeholder="Search...Business Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                              <label className="form-label">Agent Code</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="agentCode"
                                onChange={handleInputs}
                                placeholder="Search...Agent Code"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                              <label className="form-label">
                                Mobile Number
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="mobileNumber"
                                onChange={handleInputs}
                                placeholder="Search...MobileNumber"
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
                    <Link class="btn btn-pix-primary" to="/add_enquiry_student">
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
                        ></i>
                        Add Student Form
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
              className="card rounded-1 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#1976D2" }} // Blue
            >
              <div className="card-body">
                <h6 className="">
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
              className="card rounded-1 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#E64A19" }} // Deep Orange
            >
              <div className="card-body">
                <h6 className="">
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
              className="card rounded-1 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#FBC02D" }} // Yellow
            >
              <div className="card-body">
                <h6 className="">
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
              className="card rounded-1 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#388E3C" }} // Green
            >
              <div className="card-body">
                <h6 className="">
                  <i className="fas fa-file-alt" style={{ color: '#ffffff' }}></i> Documents Received
                </h6>
                <p className="card-text">Total: 90</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card rounded-1 shadow-sm border-0">
                <div className="card-header bg-white mb-0 mt-1 pb-0">
  <div className="d-flex align-items-center justify-content-between">
    <div className="d-flex gap-3">
      <div className="d-flex mb-0">
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
                              <option value="Delete">Delete</option>
                            </select>
                          </p>  
      </div>
      
    </div>

    
    <div>
      <ul className="nav nav-underline" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            href="#tab-home"
            role="tab"
            aria-controls="tab-home"
            aria-selected="true"
          >
            <i className="fa fa-list" aria-hidden="true"></i> List View
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            href="#tab-profile"
            role="tab"
            aria-controls="tab-profile"
            aria-selected="false"
          >
            <i className="fa fa-th" aria-hidden="true"></i> Grid View
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

<div className="table-responsive">
                        <table
                          className=" table table-hover card-table dataTable text-center"
                          style={{ color: "#9265cc", fontSize: "11px" }}
                          ref={tableRef}
                        >
                          <thead className="table-light">
                            <tr
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "11px",
                              }}
                            >
                               <th className="text-capitalize text-start sortable-handle">
                                {" "}
                              
                                   <input
        type="checkbox"
        checked={selectedIds.length === student.length} // Check if all students are selected
        onChange={handleSelectAll}
      />
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                S.No.
                              </th>
                             
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Student Code{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Date{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Name{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Contact Number{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Email ID{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Desired Country
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Source
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Assigned To
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Status
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody >
                            {student && student.length > 0 ? (
                              student.map((data, index) => (
                                <tr
                                  key={index}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "10px",
                                  }}
                                >
                                   <td>
            
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
                                    {data?.studentCode || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {" "}
                                    {formatDate(
                                      data?.createdOn
                                        ? data?.createdOn
                                        : data?.modifiedOn
                                        ? data?.modifiedOn
                                        : "-"
                                        || "Not Available" )}
                                  </td>

                                 
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.name || "Not Available"}
                                  </td>
                                  
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.primaryNumber|| "Not Available"}
                                  </td>
                                  <td className=" text-start text-truncate text-lowercase">
                                    {data?.email || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.desiredCountry || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.source || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    {data?.staffName || "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start ">
           {data?.isActive || "Not Avaialble"}
           
          </td>
                                  <td className="text-capitalize text-start text-truncate">
                                    <div className="d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/view_enquiry_student",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/edit_enquiry_student",
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



<div
                     class="tab-pane fade " id="tab-profile" role="tabpanel" aria-labelledby="profile-tab"
                    >
          
          <div className="container">
  <div className="row">
  { student?.map((data, index) => (
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
                    <strong>Student ID</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.studentCode || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Date</strong>
                  </div>
                  <div className="col-md-7">
                  {formatDate(
                                      data?.createdOn
                                        ? data?.createdOn
                                        : data?.modifiedOn
                                        ? data?.modifiedOn
                                        : "-"
                                        || "Not Available" )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Primary No</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.primaryNumber|| "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Email ID</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.email || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Desired Country</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.desiredCountry || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Source</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.source || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Assigned To</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.staffName || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Status</strong>
                  </div>
                  <div className="col-md-7">
                 {data?.isActive || "NOT Available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
          <Link
                                        className="btn btn-sm btn-outline-primary"
                                        to={{
                                          pathname: "/view_enquiry_student",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>View
                                      </Link>
                                      <Link
                                        className="btn btn-sm btn-outline-warning"
                                        to={{
                                          pathname: "/edit_enquiry_student",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-edit text-warning me-1"></i>Edit
                                      </Link>
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => {
                                          openPopup(data?._id);
                                        }}
                                      >
                                        <i className="far fa-trash-alt text-danger me-1"></i>Delete
                                      </button>
          </div>
        </div>
      </div>
    ))}
  </div>
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
              style={{ fontSize: "12px", fontFamily: "Plus Jakarta Sans" }}
              className="btn btn-danger rounded-pill px-4 py-2 fw-semibold text-uppercase mx-3"
              onClick={deletStudentData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-success rounded-pill px-4 py-2 fw-semibold text-uppercase "
              onClick={closePopup}
              style={{ fontSize: "12px", fontFamily: "Plus Jakarta Sans" }}
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
                     onClick={deleteSelectedstudent}
                     
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
    </>
  );
};
export default ListStudentForm;
