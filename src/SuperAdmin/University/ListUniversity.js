import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import {
  getallUniversity,
  deleteUniversity,
  saveUniversity,
  getFilterUniversity,
} from "../../api/university";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  backdropClasses,
  radioClasses,
} from "@mui/material";
import Masterheader from "../../compoents/header";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import "./ListTable.css";
import { FaFilter } from "react-icons/fa";
import axios from "axios";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import * as XLSX from "xlsx";

export default function Masterproductlist() {
  const initialStateInputs = {
    universityName: "",
    state: "",
    lga: "",
    averageFees: "",
    country: "",
    popularCategories: "",
  };
  const [file, setFile] = useState(null);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const search = useRef(null);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [university, setUniversity] = useState();

  useEffect(() => {
    getAllUniversityDetails();
  }, [pagination.from, pagination.to]);

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

  const getAllUniversityDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };

    getFilterUniversity(data)
      .then((res) => {
        setUniversity(res?.data?.result?.universityList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.universityCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        const universityList = res?.data?.result?.universityList;
        setUniversity(universityList);
        const result = universityList.length ? "universities" : "";
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
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteUniversityData = () => {
    deleteUniversity(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllUniversityDetails();
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
  const filterUniversityList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: inputs.universityName,
      country: inputs.country,
      // state: inputs?.lga && inputs.lga.length > 0 ? inputs.lga.join(", ") : inputs?.state?.join(", ") ?? "-",
      averageFees: inputs.averageFees,
      popularCategories: inputs.popularCategories,
      limit: 10,
      page: pagination.from,
    };

    getFilterUniversity(data)
      .then((res) => {
        setUniversity(res?.data?.result?.universityList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.universityCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllUniversityDetails();
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

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        // "https://api.edufynd.in/api/university/import",
        "http://localhost:4409/api/university/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getDisplayText = (text, expanded) => {
    if (!text) return ""; // Ensure text is defined
    const words = text.split(" ");
    return expanded
      ? text
      : words.slice(0, 2).join(" ") + (words.length > 2 ? "..." : "");
  };

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallUniversity(university)
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
            text: "university Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "campus",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Average Fees",
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
              text: element?.universityName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text:
                element?.lga?.length > 0
                  ? element.lga.join(", ")
                  : element?.state?.join(", ") ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.averageFees ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.country ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("University List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallUniversity(university)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            universityName: res?.universityName ?? "-",
            state:
              res?.lga?.length > 0
                ? res.lga.join(", ")
                : res?.state?.join(", ") ?? "-",
            averageFees: res?.averageFees ?? "-",
            country: res?.country ?? "-",
          });
        });
        let header1 = ["universityName", "state", "averageFees", "country"];
        let header2 = ["University Name", "Campus", "Average Fees", "Country"];
        ExportCsvService.downloadCsv(
          list,
          "universityList",
          "University List",

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

  // Function to handle the display of cities or state

  return (
    <>
      <div>
        <Mastersidebar />

        <div
          className="content-wrapper  "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header ">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                    <li className="flex-grow-1">
                      <form onSubmit={handleSearch}>
                        <div
                          className="input-group"
                          style={{ maxWidth: "600px" }}
                        >
                          <input
                            type="search"
                            placeholder="Search"
                            ref={search}
                            onChange={handleInputsearch}
                            aria-describedby="button-addon3"
                            className="form-control-lg bg-white border-2 ps-1 rounded-4 text-capitalize  w-100"
                            style={{
                              borderColor: "#FE5722",
                              paddingRight: "1.5rem",
                              marginLeft: "0px",
                              fontSize: "12px", // Keep the font size if it's correct
                              height: "11px", // Set the height to 11px
                              padding: "0px", // Adjust padding to fit the height
                            }}
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
                            <i
                              className="fas fa-search"
                              style={{ color: "black" }}
                            ></i>
                          </button>
                        </div>
                      </form>
                    </li>
                    <li class="m-1">
                      <div
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                      >
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{ fontSize: "11px" }}
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
                            <h5 id="offcanvasRightLabel">Filter University</h5>
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
                                <label className="form-label">
                                  University Name
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="universityName"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example StandFord"
                                />

                                <label className="form-label">Campus</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="state"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example Apple Park"
                                />
                                <label className="form-label">
                                  Average Fees
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="averageFees"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example 5000"
                                />
                                <label className="form-label">Country</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="country"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example United Kingdom"
                                />

                                <label className="form-label">
                                  Popular Categories
                                </label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="popularCategories"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example Havard University"
                                />
                              </div>
                              <div>
                                <button
                                  data-bs-dismiss="offcanvas"
                                  type="submit"
                                  onClick={filterUniversityList}
                                  className="btn btn-save border-0 text-white float-right  px-4 py-2 fw-semibold text-uppercase mx-2"
                                  style={{
                                    backgroundColor: "#fe5722",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                >
                                  Apply
                                </button>
                                <button
                                  data-bs-dismiss="offcanvas"
                                  className="btn btn-cancel border-0 text-white px-4 py-2 float-right fw-semibold bg text-uppercase"
                                  style={{
                                    backgroundColor: "#231f20",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  onClick={resetFilter}
                                >
                                  Reset
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="m-2">
                      <Link onClick={pdfDownload}>
                        <button
                          style={{
                            backgroundColor: "#E12929",
                            fontSize: "11px",
                          }}
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
                      <Link onClick={openImportPopup} class="btn-filters">
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
                      <Link class="btn  border-0" to="/AddUniversity">
                        <button
                          className="btn border-0 text-uppercase fw-semibold px-4 py-2 text-white  "
                          style={{
                            backgroundColor: "#fe5722",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                          Add University
                        </button>
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card rounded-0 border-0 ">
                    <div className="card-body">
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
                                <th className="text-capitalize text-start sortable-handle">
                                  S No
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Code
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  University Name
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  country
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Campus
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Popular Categories
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  App
                                </th>

                                <th className="text-capitalize text-start sortable-handle">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {university?.map((data, index) => {
                                const isExpanded = !!expandedRows[index];

                                return (
                                  <tr
                                    key={index}
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "11px",
                                    }}
                                  >
                                    <td className="text-capitalize text-start">
                                      {pagination.from + index + 1}
                                    </td>
                                    <td className="text-capitalize text-start">
                                      {data?.universityCode}
                                    </td>
                                    <td
                                      className="text-capitalize text-start"
                                      onMouseEnter={() => toggleRow(index)}
                                      onMouseLeave={() => toggleRow(index)}
                                      title={data?.universityName}
                                    >
                                      {getDisplayText(
                                        data?.universityName,
                                        isExpanded
                                      )}
                                    </td>
                                    <td className="text-capitalize text-start">
                                      {data?.country}
                                    </td>
                                    <td className="text-capitalize text-start">
                                      {data.campuses?.map(
                                        (campus, yearIndex) => (
                                          <div key={yearIndex}>
                                            {campus?.state?.length > 0
                                              ? campus.state
                                              : "Not Available"}
                                            __
                                            {campus?.lga?.length > 0
                                              ? campus.lga
                                              : "Not Available"}
                                            __
                                          </div>
                                        )
                                      )}
                                    </td>
                                    <td
                                      className="text-capitalize text-start"
                                      onMouseEnter={() => toggleRow(index)}
                                      onMouseLeave={() => toggleRow(index)}
                                      title={data?.popularCategories}
                                    >
                                      {" "}
                                      {getDisplayText(
                                        data?.popularCategories.join(", "),
                                        isExpanded
                                      )}{" "}
                                    </td>

                                    <td className="text-capitalize text-start">
                                      {data?.noofApplications}
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <OverlayTrigger
                                          placement="bottom"
                                          overlay={<Tooltip >View</Tooltip>}
                                        >
                                          <Link
                                            className="dropdown-item"
                                            to={{
                                              pathname: "/ViewUniversity",
                                              search: `?id=${data?._id}`,
                                            }}
                                          >
                                            <i className="far fa-eye text-primary me-1"></i>
                                          </Link>
                                        </OverlayTrigger>

                                        <OverlayTrigger
                                          placement="bottom"
                                          overlay={<Tooltip>Edit</Tooltip>}
                                        >
                                          <Link
                                            className="dropdown-item"
                                            to={{
                                              pathname: "/EditUniversity",
                                              search: `?id=${data?._id}`,
                                            }}
                                          >
                                            <i className="far fa-edit text-warning me-1"></i>
                                          </Link>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                          placement="bottom"
                                          overlay={<Tooltip>Delete</Tooltip>}
                                        >
                                          <button
                                            className="dropdown-item"
                                            onClick={() => {
                                              openPopup(data?._id);
                                            }}
                                          >
                                            <i className="far fa-trash-alt text-danger me-1"></i>
                                          </button>
                                        </OverlayTrigger>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
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
        </div>
        <Dialog open={open}>
          <DialogContent>
            <div className="text-center m-4">
              <h5
                className="mb-4"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
              >
                Are you sure you want to Delete <br /> the selected University ?
              </h5>
              <button
                type="button"
                className="btn btn-success px-3 py-1 rounded-pill text-uppercase fw-semibold text-white mx-3"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                onClick={deleteUniversityData}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-danger px-3 py-1 rounded-pill text-uppercase text-white fw-semibold"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                onClick={closePopup}
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
                    style={{ fontSize: "12px" }}
                    className="form-control   text-dark bg-transparent"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                <Link
                  to="/ListUniversity"
                  className="btn btn-cancel border-0 fw-semibold text-uppercase py-1 px-3 rounded-pill text-white float-right bg"
                  style={{ backgroundColor: "#0f2239", fontSize: "12px" }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  onClick={handleFileUpload}
                  className="btn btn-save border-0 text-white fw-semibold text-uppercase py-1 px-3 rounded-pill float-right mx-2"
                  style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                >
                  Apply
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        {/* <div className="modal fade" id="addCountryModal" tabIndex="-1" aria-labelledby="addCountryModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCountryModalLabel">{isEdit }</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="intakeName" className="form-label">Intake Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="intakeName"
                    name="intakeName"
                    value={inputs.intakeName}
                    onChange={handleInputs}
                  />
                  {submitted && errors.intakeName.required && (
                    <span className="text-danger">Intake Name is required</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={inputs.startDate}
                    onChange={handleInputs}
                  />
                  {submitted && errors.startDate.required && (
                    <span className="text-danger">Start Date is required</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={inputs.endDate}
                    onChange={handleInputs}
                  />
                  {submitted && errors.endDate.required && (
                    <span className="text-danger">End Date is required</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Save"}</button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}
