import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallAdmin,updateAdmin,getFilterAdmins, deleteAdmin, getAllAdminCard } from "../../api/admin";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import Sidebar from "../../compoents/sidebar";
import { toast } from "react-toastify";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import { FaFilter } from "react-icons/fa";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";


export default function ListAgent() {

  const initialState = {
    name:"",
    email:"",
    mobileNumber:"",
    role:"",
    adminCode:"",
    dial1: "",
    
  };
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [openDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
 
  const [data, setData] = useState(false);

  const [admin, setAdmin] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchClear, setSearchClear] = useState("");
  const [filter, setFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [inputs, setInputs] = useState(false);
  const search = useRef(null);

  const [details, setDetails] = useState();


  useEffect(() => {
    getAllAdminDetails();
   
  }, [pagination.from, pagination.to,pageSize]);


  useEffect(() => {
    if (searchValue) {
      search.current.value = searchValue.substring(1);
      handleSearch();
    }
  }, [searchValue]);

  
  useEffect(() => {
    getAllAdminCount()

  })

  const getAllAdminCount = () => {
    getAllAdminCard().then((res) => setDetails(res?.data.result))
  }



const handleInputsearch = (event) => {
  if (event.key === "Enter") {
    search.current.blur();
    handleSearch();
  }
};

const handleClear = () => {
  setSearchClear([]); // Clear the state value
  if (search.current) {
    search.current.value = ""; // Clear the input field using ref
  }
};

const handleSearch = (event) => {
  const data = search.current.value;
  event?.preventDefault();
  getSuperAdminForSearch(data)
    .then((res) => {
      const AdminList = res?.data?.result?.adminList;
      setAdmin(AdminList);
      const result = AdminList.length ? "admin" : "";
      setLink(result);
      setData(result === "" ? true : false);
    })
    .catch((err) => console.log(err));
};
  const getAllAdminDetails = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };

    getFilterAdmins(data)
      .then((res) => {
        console.log("yuvi", res);
        setAdmin(res?.data?.result?.adminList);
        setPagination({ ...pagination, count: res?.data?.result?.adminCount });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const filterUniversityList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
    name:inputs?.name,
    adminCode:inputs?.adminCode,
    role:inputs?.role,
    mobileNumber:inputs?.mobileNumber,
    email:inputs?.email,
      limit: 10,
      page: pagination.from,
    };

    getFilterAdmins(data)
      .then((res) => {
        setAdmin(res?.data?.result?.adminList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.adminCount,
          
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    // setFilter(false);
    setInputs(initialState);
    getAllAdminDetails();
   
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

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallAdmin(admin)
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
            text: "AdminCode",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Admin Name",
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
            text: "ContactNo",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Role",
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
              text: element?.adminCode?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
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
              text: element?.mobileNumber ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.role ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("adminList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallAdmin(admin)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            adminCode: res?.adminCode ?? "-",
            name: res?.name ?? "-",
            email: res?.email ?? "-",
           mobileNumber: res?.mobileNumber ?? "-",
            role: res?.role ?? "-",
          });
        });
        let header1 = [
          "adminCode",
          "name",
          "email",
          "mobileNumber",
          "role",
        ];
        let header2 = [
          "Admin Code",
          "Admin Name",
          "Admin MailID",
          " ContactNo",
          "Role",
        ];
        ExportCsvService.downloadCsv(
          list,
          "adminList",
          "Admin List",

          header1,
          header2
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckboxChanges = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = admin.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };
 
  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      setOpenDelete(true);
      // deleteSelectedAdmin();
    } else if (action === "Activate") {
      activateSelectedAdmin();
    }
  };

  const deleteSelectedAdmin = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteAdmin(id)))
        .then((responses) => {
          toast.success("Admin deleted successfully!");
          setSelectedIds([]);
          getAllAdminDetails ();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete Admin.");
        });
    } else {
      toast.warning("No Admin selected.");
    }
  };

  const activateSelectedAdmin = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => updateAdmin(id)))
        .then((responses) => {
          console.log("rajaram",responses);
          toast.success("Admin activated successfully!");
          setSelectedIds([]);
          getAllAdminDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate Admin.");
        });
    } else {
      toast.warning("No notifications selected.");
    }
  };
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header bg-light shadow-sm sticky-top mb-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <ol className=" d-flex justify-content-end align-items-center mb-0 list-unstyled">
                <li className="flex-grow-1">
                    <form onSubmit={handleSearch}>
                      <div className="input-group" style={{ maxWidth: "600px" }}>
                        <input
                          className="form-control form-control-sm border-1 border-dark rounded-4"
                          placeholder="Search..."
                          type="search"
                          aria-describedby="button-addon3"
                          ref={search}
                          onChange={handleInputsearch}
                        />
                        <button
                          className="input-group-text bg-transparent border-0"
                          id="button-addon3"
                          type="submit"
                          style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}
                        >
                          <i className="fas fa-search" style={{ color: "black" }}></i>
                        </button>
                      </div>
                    </form>
                  </li>
                  <li class="m-1">
                    <div
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        type="button"
                        style={{ fontSize: "12px" }}
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight12"
                        aria-controls="offcanvasRight12"
                      >
                        {" "}
                        <FaFilter />
                      </button>
                      <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasRight12"
                        aria-labelledby="offcanvasRightLabel12"
                      >
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel12">Filter Admin</h5>
                          <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          />
                        </div>
                        <div className="offcanvas-body ">
                        <form>
                        <div className="row gy-3 mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-id-card"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              onChange={handleInputs}
                              placeholder="Search... Admin Name"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-user"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="adminCode"
                              onChange={handleInputs}
                              placeholder="Search... AdminCode"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="mobileNumber"
                              onChange={handleInputs}
                              placeholder="Search... Admin Contact No"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-tag"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="role"
                              onChange={handleInputs}
                              placeholder="Search... Admin Role"
                            />
                          </div>
                        
                        </div>
                        <div className="d-flex justify-content-end gap-3">
                          <button
                             onClick={resetFilter}
                            className="btn text-uppercase rounded-1 border-0 fw-semibold"
                            style={{ backgroundColor: "#0f2239", color: "#fff" }} // Dark color for reset
                          >
                            Cancel
                          </button>
                          <button
                            data-bs-dismiss="offcanvas"
                            type="submit"
                            onClick={filterUniversityList}
                            className="btn text-uppercase rounded-1 border-0 fw-semibold"
                            style={{ backgroundColor: "#fe5722", color: "#fff" }} // Primary color for apply
                          >
                            Apply
                          </button>
                        </div>
                      </form>
                        </div>
                      </div>
                    </div>
                  </li>
                   {/* Export PDF Button */}
                   <li className="m-1">
                    <Link onClick={pdfDownload}>
                      <button
                        className="btn text-white border-0 rounded-1"
                        style={{ backgroundColor: "#E12929" }} // Red for PDF
                      >
                        <i className="fa fa-file-pdf" aria-hidden="true"></i>
                      </button>
                    </Link>
                  </li>

                  {/* Export CSV Button */}
                  <li className="m-1">
                    <Link onClick={exportCsv}>
                      <button
                        className="btn text-white border-0 rounded-1"
                        style={{ backgroundColor: "#22A033", fontSize: "12px" }} // Green for CSV
                      >
                        <i className="fa fa-file-excel" aria-hidden="true"></i>
                      </button>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn btn-pix-primary" to="/add_admin">
                      <button
                        className="btn btn-outline   fw-semibold  border-0 text-white  "
                        style={{
                          backgroundColor: "#231f20",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
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


        <div className="container-fluid mt-3">
      <div className="row">
        {/* Card 1: Active Users */}
        <div className="col-md-3">
              <Link to='#' className="text-decoration-none">  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#00695c', color: '#fff' }}>
                <div className="card-body text-start">
                  <h6> <i className="fas fa-list-ul "></i>&nbsp;&nbsp;No of Admins: {details?.totalAdmin || 0}</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="card-text mb-1">Active: {details?.activeData || 0}</p>
                    <p className="card-text mb-1">InActive: {details?.inactiveData || 0}</p> <br></br>

                  </div>
                </div>
              </div>
              </Link>
            </div>

        {/* Card 2: Pending Requests */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FF5722" }} // Deep Orange
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-clock" style={{ color: '#ffffff' }}></i> Pending Requests
              </h6>
              <p className="card-text">Requests awaiting approval.</p>
              <p className="card-text">Total: 12</p>
            </div>
          </div>
        </div>

        {/* Card 3: Banned Users */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FFEB3B" }} // Yellow
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-ban" style={{ color: '#ffffff' }}></i> Banned Users
              </h6>
              <p className="card-text">Users who are banned.</p>
              <p className="card-text">Total: 5</p>
            </div>
          </div>
        </div>

        {/* Card 4: System Logs */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-1 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#2196F3" }} // Blue
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-file-alt" style={{ color: '#ffffff' }}></i> System Logs
              </h6>
              <p className="card-text">Logs of system activities.</p>
              <p className="card-text">Total: 35</p>
            </div>
          </div>
        </div>
      </div>
    </div>

        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="card  border-0 rounded-1 shadow-sm">
                <div className="card-header bg-white mb-0 mt-1 pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex  mb-0">
                    <p className="me-auto ">
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
 <th className=" text-start">
 <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === admin.length
                                    }
                                  />
                            </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                S.No.
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                ID{" "}
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
                                 <td className=" text-start">
                                 <input
                                      type="checkbox"
                                      checked={selectedIds.includes(data._id)}
                                      onChange={() => handleCheckboxChanges(data._id)}
                                    />
                              </td>
                                <td className="text-capitalize text-start text-truncate ">
                                  {pagination.from + index + 1}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.adminCode || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.name || "Not Available"}
                                </td>
                                <td className="text-lowercase text-start text-truncate ">
                                  {data?.email || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.role || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.mobileNumber || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/view_admin",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/edit_admin",
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
        
</div>



<div
                     class="tab-pane fade " id="tab-profile" role="tabpanel" aria-labelledby="profile-tab"
                    >
          
          <div className="container">
  <div className="row">
  {admin?.map((data, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="card shadow-sm  rounded-1 text-bg-light h-100">
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
                    <strong>Admin ID</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.adminCode || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Email</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.email || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Role</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.role || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Contact No</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.mobileNumber || "Not Available"}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
          <Link
                                      className="btn btn-sm btn-outline-primary"
                                      to={{
                                        pathname: "/view_admin",
                                        search: `?id=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>View
                                    </Link>
                                    <Link
                                      className="btn btn-sm btn-outline-warning"
                                      to={{
                                        pathname: "/edit_admin",
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
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>{" "}
          Entries out of {pagination.count}
        </p>
        <Pagination
                        count={Math.ceil(pagination.count / pageSize)} // Adjust pagination based on dynamic page size
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
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete <br /> the selected Admin?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-danger  text-white   fw-semibold  mx-3"
              onClick={deleteAdminData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel btn-success text-white   fw-semibold  "
              onClick={closePopup}
              style={{ fontSize: "12px" }}
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
                     onClick={deleteSelectedAdmin}
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
    </>
  );
}
