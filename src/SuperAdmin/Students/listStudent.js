import { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import {
  getallStudent, deleteStudent, getFilterStudentAdmin, getFilterStudent, assignStaffToEnquiries, deactivateClient,
  activeClient, getallStudentCard
} from "../../api/student";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, } from "@mui/material";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { formatDate } from "../../Utils/DateFormat";
import { toast } from "react-toastify";
import { getStudentId, } from "../../Utils/storage";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';
import { getAllApplicantCard } from "../../api/applicatin";
import { getallStaff } from "../../api/staff";

export default function Masterproductlist() {

  const initialStateInputs = {
    name: "",
    email: "",
    studentCode: "",
    primaryNumber: ""
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
  const [student, setStudent] = useState([]);
  const [detail, setDetail] = useState();
  const [details, setDetails] = useState();
  const [card, setCard] = useState();
  useEffect(() => {
    getAllStudentDetails();
    getStaffList();
  }, [pagination.from, pagination.to, pageSize]);


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
  const getAllStudentDetails = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
      studentId: getStudentId,
      superAdminId: getStudentId,

    };
    getFilterStudentAdmin(data)

      .then((res) => {
        const sortedStudents = res?.data?.result?.studentList.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
        });
        setStudent(sortedStudents);
        setPagination({
          ...pagination,
          count: res?.data?.result?.studentCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallApplicantCount();
    getallStudentCount()

  }, []);

  const getallApplicantCount = () => {
    getAllApplicantCard().then((res) => setDetail(res?.data.result))
  }

  const getallStudentCount = () => {
    getallStudentCard().then((res) => setCard(res?.data.result))
  }


  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size when dropdown changes
    setPagination({ ...pagination, from: 0, to: Number(event.target.value) }); // Reset pagination
  };
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteStudentData = () => {
    deleteStudent(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllStudentDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const openFilterPopup = () => {
  //   setOpenFilter(true);
  // };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const filterStudentList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      name: inputs.name,
      email: inputs.email,
      studentCode: inputs.studentCode,
      primaryNumber: inputs.primaryNumber,
      limit: 10,
      page: pagination.from,
      studentId: getStudentId,
      superAdminId: getStudentId,

    };
    getFilterStudent(data)
      .then((res) => {
        const sortedStudents = res?.data?.result?.studentList.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
        });
        setStudent(sortedStudents);
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
    setInputs(initialStateInputs);
    getAllStudentDetails();
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
        const result = universityList.length ? "Student" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('student', file);

    try {
      const response = await axios.post('https://api.edufynd.in/api/student/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const pdfDownload = (event) => {
    event?.preventDefault();
    getallStudent(student)
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
            text: "StudentName",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Email",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "MobileNumber",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Country",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Gender",
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
              text: element?.email ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.primaryNumber ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.citizenship ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.gender ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("Student List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallStudent(student)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            name: res?.name ?? "-",
            email: res?.email ?? "-",
            primaryNumber: res?.primaryNumber ?? "-",
            citizenship: res?.citizenship ?? "-",
            gender: res?.gender ?? "-",

          });
        });
        let header1 = [
          "name",
          "email",
          "primaryNumber",
          "cityizenship",
          "gender",

        ];
        let header2 = [
          "StudentName",
          "email",
          "MobileNumber",
          "Country",
          "Gender",

        ];
        ExportCsvService.downloadCsv(
          list,
          "studentList",
          "student List",

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
      const allIds = student.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      setOpenDelete(true);
      // deleteSelectedagent();
    } else if (action === "Activate") {
      activateSelectedAgent();
      getallStudentCount()
    } else if (action === "DeActivate") {
      deactivateSelectedAgent();
      getallStudentCount()
    } else if (action === "Assign") {
      // activateSelectedAgent();
      setOpenAssign(true);
    }
  };

  const deleteSelectedStudent = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteStudent(id)))
        .then((responses) => {
          toast.success("student deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getAllStudentDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete student.");
        });
    } else {
      toast.warning("No student selected.");
    }
  };




  const activateSelectedAgent = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to activate the clients
      activeClient({ studentIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("Student activated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful activation
          getAllStudentDetails(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Already activate Student.");
        });
    } else {
      toast.warning("No selected Student.");
    }
  };

  const deactivateSelectedAgent = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to deactivate the clients
      deactivateClient({ studentIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("Student deactivated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful deactivation
          getAllStudentDetails(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Aready to deactivate Commission.");
        });
    } else {
      toast.warning("No selected Student.");
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
      assignStaffToEnquiries({ Ids: selectedIds, staffId: selectedStaffId, staffName: selectedStaffName })
        .then(() => {
          toast.success('Student assigned successfully!');
          setSelectedIds([]); // Clear selected enquiries
          getAllStudentDetails(); // Refresh student enquiries
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
      <div >

        <Mastersidebar />

        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header bg-light shadow-sm sticky-top">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <ol className="d-flex justify-content-end align-items-center mb-0 list-unstyled">
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
                    <li className="m-1">
                      <button
                        className="btn btn-primary border-0 rounded-1"
                        style={{ fontSize: '12px' }}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <FaFilter />
                      </button>
                    </li>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Filter Student</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                      </div>
                      <div className="offcanvas-body">
                        <form>
                          <div className="form-group mb-3">
                            <label className="form-label">Student Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              onChange={handleInputs}
                              placeholder="Search...Student Name"
                              style={{ fontSize: '12px' }}
                            />
                            <label className="form-label">Student Code</label>
                            <input
                              type="text"
                              className="form-control"
                              name="studentCode"
                              onChange={handleInputs}
                              placeholder="Search...Student Code"
                              style={{ fontSize: '12px' }}
                            />
                            <label className="form-label">primaryNumber</label>
                            <input
                              type="text"
                              className="form-control"
                              name="primaryNumber"
                              onChange={handleInputs}
                              placeholder="Search...Student Code"
                              style={{ fontSize: '12px' }}
                            />
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              onChange={handleInputs}
                              placeholder="Search...Email"
                              style={{ fontSize: '12px' }}
                            />

                          </div>
                          <div>
                            <button
                              data-bs-dismiss="offcanvas"
                              className="btn btn-cancel border-0 rounded-pill fw-semibold text-white float-right"
                              style={{ backgroundColor: "#0f2239", fontSize: '14px' }}
                              onClick={resetFilter}
                            >
                              Reset
                            </button>
                            <button
                              data-bs-dismiss="offcanvas"
                              type="submit"
                              onClick={filterStudentList}
                              className="btn btn-save border-0 rounded-pill fw-semibold text-white float-right mx-2"
                              style={{ backgroundColor: "#fe5722", fontSize: '14px' }}
                            >
                              Apply
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <li className="m-1">
                      <Link onClick={pdfDownload}>
                        <button
                          className="btn text-white rounded-1 border-0"
                          style={{ backgroundColor: "#E12929", fontSize: '12px' }}
                        >
                          <i className="fa fa-file-pdf" aria-hidden="true"></i>
                        </button>
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link onClick={exportCsv}>
                        <button
                          className="btn text-white rounded-1 border-0"
                          style={{ backgroundColor: "#22A033", fontSize: '12px' }}
                        >
                          <i className="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </Link>
                    </li>
                    <li className="m-1">
                      <Link onClick={openImportPopup}>
                        <button
                          className="btn text-white rounded-1 border-0"
                          style={{ backgroundColor: "#7627ef", fontSize: '12px' }}
                        >
                          <i className="fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link className="btn btn-pix-primary border-0 rounded-1" to="/add_student">
                        <button
                          className="btn fw-semibold rounded-1 border-0 text-white"
                          style={{ backgroundColor: "#231f20", fontSize: '12px' }}
                        >
                          <i className="fa fa-plus-circle me-1" aria-hidden="true"></i> Add Student
                        </button>
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-3 " >
            <div className="row ">
              {/* Application Submitted Card */}

              <div className="col-md-3 ">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#4CAF50', color: '#fff' }}>
                    <div className="card-body text-center">
                      <h6><i className="fas fa-list-ul "></i>&nbsp;&nbsp;No of Students: {card?.totalStudent || 0}</h6>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="card-text mb-1">Active: {card?.activeData || 0}</p>
                        <p className="card-text mb-1">InActive: {card?.inactiveData || 0}</p> <br></br>

                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              {/* Offered and Rejected Card */}
              <div className="col-md-3 ">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#2196F3', color: '#fff' }}>
                    <div className="card-body text-center">

                      <div className="d-flex align-items-start justify-content-between">
                        <div className="d-flex flex-column">
                          <h6><i className=""></i>&nbsp;&nbsp;Source Count</h6>
                          {card?.sourceCounts ? (
                            Object.entries(card.sourceCounts).map(([source, count]) => (
                              <p className="card-text" key={source}>
                                {source}: {count}
                              </p>
                            ))
                          ) : (
                            <p className="card-text">No sources available</p>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Deposit Paid Card */}
              <div className="col-md-3 ">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#FFC107', color: '#fff' }}>
                    <div className="card-body text-center">
                      <h6><i className="fas fa-money-bill-wave"></i>&nbsp;&nbsp;Student Status Count</h6>
                      <p className="card-text">Offered: processing....</p>
                      <p className="card-text">Travelled : processing....</p>
                      <p className="card-text">Enrolled: processing....</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Travel Card */}
              <div className="col-md-3 ">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#FF5722', color: '#fff' }}>
                    <div className="card-body text-start">
                      <h6><i className=""></i>&nbsp;&nbsp;Commissionable</h6>
                      <p className="card-text">Processing....</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Enrolled Card */}
              <div className="col-md-3 ">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#009688', color: '#fff' }}>
                    <div className="card-body text-start">
                      <h6><i className=""></i>&nbsp;&nbsp;Non-Commissionable</h6>
                      <p className="card-text">Processing...</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Invoices Raised Card */}
              {/* <div className="col-md-3 ">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#3F51B5', color: '#fff' }}>
                    <div className="card-body text-center">
                      <h6><i className="fas fa-file-invoice-dollar"></i>&nbsp;&nbsp;Invoices Raised</h6>
                      <p className="card-text">8</p>
                    </div>
                  </div>
                </Link>
              </div> */}
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xl-12">

                <div className="card  rounded-1 shadow-sm border-0">
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
                            <option value="Delete">Delete</option>
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

                            <table className=" table table-hover card-table dataTable text-center" style={{ color: '#9265cc', fontSize: '13px' }}
                              ref={tableRef}>
                              <thead className="table-light">
                                <tr style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                                  <th className=" text-start">
                                    <input
                                      type="checkbox"
                                      onChange={handleSelectAll}
                                      checked={
                                        selectedIds.length === student.length
                                      }
                                    />
                                  </th>
                                  <th className="text-capitalize text-start sortable-handle">S No</th>
                                  <th className="text-capitalize text-start sortable-handle"> Code</th>
                                  <th className="text-capitalize text-start sortable-handle"> Name</th>

                                  <th className="text-capitalize text-start sortable-handle">Email</th>
                                  <th className="text-capitalize text-start  sortable-handle">Mobile Number</th>
                                  <th className="text-capitalize text-start sortable-handle">Created At</th>
                                  <th className="text-capitalize text-start sortable-handle">Status</th>

                                  <th className="text-capitalize text-start sortable-handle">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {student?.map((data, index) => (
                                  <tr key={index} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                                    <td className=" text-start">
                                      <input
                                        type="checkbox"
                                        checked={selectedIds.includes(data._id)}
                                        onChange={() => handleCheckboxChange(data._id)}
                                      />
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">{pagination.from + index + 1}</td>

                                    <td className="text-capitalize text-start text-truncate">{data?.studentCode || "Not Available"}</td>
                                    <td className="text-capitalize text-start text-truncate">{data?.name ? data?.name : data?.superAdminId?.studentName || "Not Available"}</td>

                                    <td className=" text-start text-truncate">{data?.email}</td>
                                    <td className="text-capitalize text-start text-truncate">{data?.mobileNumber ? data?.mobileNumber : data?.whatsAppNumber ? data?.whatsAppNumber : null || "Not Available"}</td>

                                    <td className="text-capitalize text-start text-truncate" >{formatDate(data?.modifiedOn ? data?.modifiedOn : data?.createdOn ? data?.createdOn : null) || "Not Available"}</td>
                                    <td className="text-capitalize text-start ">
                                      {data?.isActive || "Not Data"}
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">
                                      <div className="d-flex">
                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/view_student",
                                            search: `?id=${data?._id}`,
                                          }}
                                        >
                                          <i className="far fa-eye text-primary me-1"></i>

                                        </Link>
                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/edit_student",
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
                            {student?.map((data, index) => (
                              <div className="col-md-4 mb-4" key={index}>
                                <div className="card shadow-sm  rounded-1 text-bg-light h-100" style={{ fontSize: '10px' }}>
                                  <div className="card-header   d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">{data?.name ? data?.name : data?.superAdminId?.studentName || "Not Available"}</h6>
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
                                            <strong>Email</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {data?.email}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mb-2">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <strong>Primary No</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {data?.mobileNumber ? data?.mobileNumber : data?.whatsAppNumber ? data?.whatsAppNumber : null || "Not Available"}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mb-2">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <strong>Created At</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {formatDate(data?.modifiedOn ? data?.modifiedOn : data?.createdOn ? data?.createdOn : null) || "Not Available"}
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
                                        pathname: "/view_student",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>

                                    </Link>
                                    <Link
                                      className="btn btn-sm btn-outline-warning"
                                      to={{
                                        pathname: "/edit_student",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>

                                    </Link>
                                    <Link
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => {
                                        openPopup(data?._id);
                                      }}
                                    >
                                      <i className="far fa-trash-alt text-danger me-1"></i>

                                    </Link>
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
              <h5 className="mb-4 text-capitalize"   >
                Are you sure you want to Delete <br /> the selected Student ?
              </h5>
              <button
                type="button"
                className="btn btn-danger fw-semibold  rounded-1 rounded-pill text-white border-0 mx-3"
                style={{ fontSize: "12px", fontFamily: 'Plus Jakarta Sans' }}
                onClick={deleteStudentData}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-success fw-semibold  rounded-1 rounded-pill text-white border-0 "
                style={{ fontSize: "12px", fontFamily: 'Plus Jakarta Sans' }}
                onClick={closePopup}
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
                onClick={deleteSelectedStudent}

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
                  <label className="form-label">
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
            Filter Student
            <IconButton className="float-right" onClick={closeFilterPopup}>
              <i className="fa fa-times fa-xs" aria-hidden="true"></i>
            </IconButton>
          </DialogTitle>
          <DialogContent>

          </DialogContent>
        </Dialog>
        <Dialog open={openImport} fullWidth maxWidth="sm">
          <DialogTitle>
            Upload student List
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
                  className="btn btn-cancel border-0 rounded-pill text-white  fw-semibold  px-3 py-1 float-right bg"
                  style={{ backgroundColor: "#0f2239" }}

                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  onClick={handleFileUpload}
                  className="btn btn-save border-0 text-white rounded-pill   fw-semibold  px-3 py-1 float-right mx-2"
                  style={{ backgroundColor: "#fe5722" }}
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
}
