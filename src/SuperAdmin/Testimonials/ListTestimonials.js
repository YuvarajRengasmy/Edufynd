import { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { Link, useLocation } from "react-router-dom";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import {
  deleteTestimonial,
  getFilterTestimonial,
  getallTestimonial,
  updatedTestimonial,
  
} from "../../api/Notification/Testimonial";
import {getSuperAdminForSearch} from "../../api/superAdmin";

import { formatDate } from "../../Utils/DateFormat";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import Mastersidebar from "../../compoents/sidebar";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";
export const ListTestimonials = () => {

  const initialState = {
    hostName:"",
    typeOfUser: "",
    courseOrUniversityName: "",
    location: "",
    counselorName: "",
  };

  const [file, setFile] = useState(null);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [filter, setFilter] = useState(false);
  const [inputs, setInputs] = useState(false);
  const search = useRef(null);
  const [notification, setnotification] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [pageSize, setPageSize] = useState(10); 
  const [selectedIds, setSelectedIds] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });


  useEffect(() => {
    getAllClientDetails();
  }, [pagination.from, pagination.to,pageSize]);
  const getAllClientDetails = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterTestimonial(data)
      .then((res) => {
        console.log(res);
        setnotification(res?.data?.result?.testimonialList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.testimonialCount,
        });
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
        const testimonialLists = res?.data?.result?.testimonialList;
        setnotification(testimonialLists);
        const result = testimonialLists.length ? "notification" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })

      .catch((err) => console.log(err));
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };


  const filtertestimonialList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      hostName: inputs.hostName,
      typeOfUser: inputs.typeOfUser,
      courseOrUniversityName : inputs.courseOrUniversityName,
      location: inputs.location,
      counselorName:inputs.counselorName,
      limit:10,
      page: pagination.from,
    };

    getFilterTestimonial(data)
      .then((res) => {
        setnotification(res?.data?.result?.testimonialList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.testimonialCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const resetFilter = () => {
    setFilter(false);
    setInputs(initialState);
    getAllClientDetails();
  };
  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size when dropdown changes
    setPagination({ ...pagination, from: 0, to: Number(event.target.value) }); // Reset pagination
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
  const deleteClientData = () => {
    deleteTestimonial(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllClientDetails();
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
  const pdfDownload = (event) => {
    event?.preventDefault();

    getallTestimonial(notification)
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
            text: "Host Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Type Of User",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "University",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Location",
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
              text: element?.hostName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
           

            {
              text: element?.typeOfUser ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.courseOrUniversityName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.location ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("TestImonials List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const exportCsv = (event) => {
    event?.preventDefault();

    getallTestimonial(notification)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            hostName: res?.hostName ?? "-",
            typeOfUser:res?.typeOfUser ?? "-",
            courseOrUniversityName:res?.courseOrUniversityName ?? "-",
            location: res?.location ?? "-",
           
          });
        });
        let header1 = ["hostName", "typeOfUser", "courseOrUniversityName", "location"];
        let header2 = ["Host Name", "Type Of User", "University Name", "Country"];
        ExportCsvService.downloadCsv(
          list,
          "testImonialsList",
          "TestImonialsList",

          header1,
          header2
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = notification.map((item) => item._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      setOpenDelete(true);

      // deleteSelectedUniversity();
    } else if (action === "Activate") {
      activateSelectedUniversity();
    }
  };

  const deleteSelectedUniversity = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteTestimonial(id)))
        .then((responses) => {
          toast.success("testimonial deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getAllClientDetails();
        
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete testimonial.");
        });
    } else {
      toast.warning("No testimonial selected.");
    }
  };

  const activateSelectedUniversity = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => updatedTestimonial(id)))
        .then((responses) => {
          toast.success("testimonial activated successfully!");
          setSelectedIds([]);
          getAllClientDetails();
        })

        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate testimonial.");
        });
    } else {
      toast.warning("No testimonial selected.");
    }
  }


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
      <div>
        <Mastersidebar />
        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header bg-light shadow-sm sticky-top mb-0">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-xl-12">
                  <ol className="breadcrumb d-flex flex-row justify-content-end align-items-center w-100 mb-0">
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
              className="btn btn-primary text-white border-0 rounded-1"
              type="button"
              style={{ fontSize: "12px" }}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <FaFilter />
            </button>
          </li>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h6 id="offcanvasRightLabel">Filter Testimonial</h6>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <form>
                <div className="from-group mb-3">
                  <label className="form-label">Host Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hostName"
                    onChange={handleInputs}
                    placeholder="Example Stanford"
                    style={{ fontSize: "12px" }}
                  />
                  
                  <label className="form-label">Type Of User</label>
                  <input
                    type="text"
                    className="form-control"
                    name="typeOfUser"
                    onChange={handleInputs}
                    placeholder="Example 5000"
                    style={{ fontSize: "12px" }}
                  />
                  <label className="form-label">University</label>
                  <input
                    type="text"
                    className="form-control"
                    name="courseOrUniversityName"
                    onChange={handleInputs}
                    placeholder="Example United Kingdom"
                    style={{ fontSize: "12px" }}
                  />
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    onChange={handleInputs}
                    placeholder="Example Harvard University"
                    style={{ fontSize: "12px" }}
                  />
                </div>
                <div>
                  <button
                    data-bs-dismiss="offcanvas"
                    type="submit"
                    onClick={filtertestimonialList}
                    className="btn btn-save border-0 text-white float-right px-4 py-2 fw-semibold text-uppercase mx-2"
                    style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                  >
                    Apply
                  </button>
                  <button
                    data-bs-dismiss="offcanvas"
                    type="button"
                    onClick={resetFilter}
                    className="btn btn-cancel border-0 text-white px-4 py-2 float-right fw-semibold bg text-uppercase"
                    style={{ backgroundColor: "#231f20", fontSize: "12px" }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                    <li class="m-1">
                      <Link class="btn btn-pix-primary" to="/add_testimonials">
                        <button
                          className="btn btn-outline   fw-semibold rounded-1 border-0 text-white  "
                          style={{
                            backgroundColor: "#231f20",
                            fontSize: "12px",
                          }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                          Add Testimonials
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
              {/* Card 1: New Testimonials */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#009688" }} // Teal
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-user-check"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      New Testimonials
                    </h6>
                    <p className="card-text">Recent testimonials received.</p>
                    <p className="card-text">Total: 5</p>
                  </div>
                </div>
              </div>
              {/* Card 2: Verified Testimonials */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#4CAF50" }} // Green
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-thumbs-up"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Verified Testimonials
                    </h6>
                    <p className="card-text">
                      Testimonials verified and approved.
                    </p>
                    <p className="card-text">Total: 12</p>
                  </div>
                </div>
              </div>
              {/* Card 3: Pending Reviews */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#FF9800" }} // Orange
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-clock"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Pending Reviews
                    </h6>
                    <p className="card-text">Testimonials pending review.</p>
                    <p className="card-text">Total: 7</p>
                  </div>
                </div>
              </div>
              {/* Card 4: Archived Testimonials */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#795548" }} // Brown
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-archive"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Archived Testimonials
                    </h6>
                    <p className="card-text">Old or archived testimonials.</p>
                    <p className="card-text">Total: 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card rounded-1 shadow-sm  border-0">
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
                              <option value="Assign">Assign</option>
                              <option value="Delete">Delete</option>
                            </select>
                          </p>
                         
                        </div>
                        <div>
                          <ul
                            class="nav nav-underline fs-9"
                            id="myTab"
                            role="tablist"
                          >
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
                                <i class="fa fa-list" aria-hidden="true"></i>{" "}
                                List View
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
                                <i class="fa fa-th" aria-hidden="true"></i> Grid
                                View
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
                                className=" table table-hover card-table  dataTable text-center"
                                style={{ color: "#9265cc", fontSize: "12px" }}
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
                                      selectedIds.length === notification.length
                                    }
                                  />
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                      S No
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                      Date
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                     Host Name
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                     Type Of User
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                     University
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                    Location
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                      Action{" "}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {notification?.map((item, index) => (
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
                                      checked={selectedIds.includes(item._id)}
                                      onChange={() => handleCheckboxChange(item._id)}
                                    />
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {pagination.from + index + 1}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {formatDate(
                                          item?.createdOn
                                            ? item?.createdOn
                                            : item?.modifiedOn
                                            ? item?.modifiedOn
                                            : "-"
                                        ) || "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {item?.hostName ||
                                          "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {item.typeOfUser || "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {item?.courseOrUniversityName ||
                                          "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {item?.location||
                                          "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        <div className="d-flex">
                                          <Link
                                            className="dropdown-item"
                                            to={{
                                              pathname: "/view_testimonials",
                                              search: `?id=${item?._id}`,
                                            }}
                                            data-bs-toggle="tooltip"
                                            title="View"
                                          >
                                            <i className="far fa-eye text-primary me-1"></i>
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to={{
                                              pathname: "/edit_testimonials",
                                              search: `?id=${item?._id}`,
                                            }}
                                            data-bs-toggle="tooltip"
                                            title="Edit"
                                          >
                                            <i className="far fa-edit text-primary me-1"></i>
                                          </Link>
                                          <button
                                            className="dropdown-item"
                                            onClick={() => {
                                              openPopup(item?._id);
                                            }}
                                          >
                                            <i className="far fa-trash-alt text-danger me-1"></i>
                                          </button>
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
                          class="tab-pane fade "
                          id="tab-profile"
                          role="tabpanel"
                          aria-labelledby="profile-tab"
                        >
                          <div className="container">
                            <div className="row">
                              {notification?.map((item, index) => (
                                <div className="col-md-4 mb-4" key={index}>
                                  <div
                                    className="card shadow-sm  rounded-1 text-bg-light h-100"
                                    style={{ fontSize: "10px" }}
                                  >
                                    <div className="card-header   d-flex justify-content-between align-items-center">
                                      <h6 className="mb-0"></h6>
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
                                              <strong>Date</strong>
                                            </div>
                                            <div className="col-md-7">
                                              {formatDate(
                                                item?.createdOn
                                                  ? item?.createdOn
                                                  : item?.modifiedOn
                                                  ? item?.modifiedOn
                                                  : "-"
                                              ) || "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <strong>Course</strong>
                                            </div>
                                            <div className="col-md-7">
                                              {item?.courseOrUniversityName ||
                                                "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <strong>User</strong>
                                            </div>
                                            <div className="col-md-7">
                                              {item.typeOfUser ||
                                                "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
                                      <Link
                                        className="btn btn-sm btn-outline-primary"
                                        to={{
                                          pathname: "/view_testimonials",
                                          search: `?id=${item?._id}`,
                                        }}
                                        data-bs-toggle="tooltip"
                                        title="View"
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>
                                        View
                                      </Link>
                                      <Link
                                        className="btn btn-sm btn-outline-warning"
                                        to={{
                                          pathname: "/edit_testimonials",
                                          search: `?id=${item?._id}`,
                                        }}
                                        data-bs-toggle="tooltip"
                                        title="Edit"
                                      >
                                        <i className="far fa-edit text-primary me-1"></i>{" "}
                                        Edit
                                      </Link>
                                      <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => {
                                          openPopup(item?._id);
                                        }}
                                      >
                                        <i className="far fa-trash-alt text-danger me-1"></i>{" "}
                                        Delete
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
        </div>
        <Dialog open={open}>
        <DialogContent>
          <div className="text-center p-4">
            <h6 className="mb-4 text-capitalize">
              Are you sure you want to delete the selected Testimonial?
            </h6>
            <button
              type="button"
              className="btn btn-success px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              onClick={deleteClientData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase"
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
                     onClick={deleteSelectedUniversity}
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
        <Dialog open={openFilter} fullWidth maxWidth="sm">
          <DialogTitle>
            Filter University
            <IconButton className="float-right" onClick={closeFilterPopup}>
              <i className="fa fa-times fa-xs" aria-hidden="true"></i>
            </IconButton>
          </DialogTitle>
          <DialogContent></DialogContent>
        </Dialog>
      </div>
    </>
  );
};
export default ListTestimonials;
