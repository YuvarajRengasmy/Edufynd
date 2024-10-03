import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import {
  getallUniversity,
  deleteUniversity,
  getAllUniversit,
  getFilterUniversity,
  deactivateClient, activeClient,

} from "../../api/university";
import { getAllApplicantCard } from "../../api/applicatin";
import { PieChart } from '@mui/x-charts/PieChart';

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
import { Chart, registerables } from 'chart.js';
import Downshift from "downshift";
Chart.register(...registerables);

export default function Masterproductlist() {
  const initialStateInputs = {
    universityName: "",

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
  const [openDelete, setOpenDelete] = useState(false);

  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const search = useRef(null);
  const [details, setDetails] = useState();
  const [detail, setDetail] = useState();

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [university, setUniversity] = useState([]);

  useEffect(() => {
    getAllUniversityDetails();
    getallUniversityCount();
    getallApplicantCount();
  }, [pagination.from, pagination.to, pageSize]);

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
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };

    getFilterUniversity(data)
      .then((res) => {
        console.log(res?.data?.result?.universityCount);
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



  const getallUniversityCount = () => {
    getAllUniversit()
      .then((res) => {
        setDetails(res?.data.result)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const getallApplicantCount = () => {
    getAllApplicantCard().then((res) => setDetail(res?.data.result))
  }
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



  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const filterUniversityList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: inputs.universityName,
      country: inputs.country,
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

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Update page size when dropdown changes
    setPagination({ ...pagination, from: 0, to: Number(event.target.value) }); // Reset pagination
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
        "https://api.edufynd.in/api/university/import",
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


  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create the new chart
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
      
        datasets: [{
          data: [
            details?.activeUniversities || 0,
            details?.inactiveUniversities || 0,
          ], // Use default 0 if no data available
          backgroundColor: [
            '#fdc21d', // Green for "Active" (chat bubble color)
            '#207cbb', // Blue for "Inactive" (chat bubble color)
          ],
          borderColor: [
            '#fdc21d',
            '#207cbb',
          ],
          borderWidth: 5,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              }
            }
          }
            },
          },
        
        
        
      
    });

    // Clean up on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [details]);
 
  


  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = university.map((data) => data._id);
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
      getallUniversityCount();
    } else if (action === "Deactivate") {
      deactivateSelectedUniversity();
      getallUniversityCount();
    }
  };

  const deleteSelectedUniversity = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteUniversity(id)))
        .then((responses) => {
          toast.success("university deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getAllUniversityDetails();

        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete notifications.");
        });
    } else {
      toast.warning("No notifications selected.");
    }
  };


  const activateSelectedUniversity = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to activate the clients
      activeClient({ universityIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("University activated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful activation
          getAllUniversityDetails(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Already activate university.");
        });
    } else {
      toast.warning("No selected University.");
    }
  };

  const deactivateSelectedUniversity = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to deactivate the clients
      deactivateClient({ universityIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("University deactivated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful deactivation
          getAllUniversityDetails(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Aready to deactivate university.");
        });
    } else {
      toast.warning("No selected University.");
    }
  };


  return (
    <>
      <div>
        <Mastersidebar />

        <div
          className="content-wrapper  "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header bg-light shadow-sm sticky-top">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <ul className="d-flex align-items-center justify-content-end mb-0 list-unstyled">
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
                        <h6 id="offcanvasRightLabel">Filter University</h6>
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
                            <label className="form-label">University Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="universityName"
                              onChange={handleInputs}
                              placeholder="Example Stanford"
                              style={{ fontSize: "12px" }}
                            />

                            <label className="form-label">Average Fees</label>
                            <input
                              type="text"
                              className="form-control"
                              name="averageFees"
                              onChange={handleInputs}
                              placeholder="Example 5000"
                              style={{ fontSize: "12px" }}
                            />
                            <label className="form-label">Country</label>
                            <input
                              type="text"
                              className="form-control"
                              name="country"
                              onChange={handleInputs}
                              placeholder="Example United Kingdom"
                              style={{ fontSize: "12px" }}
                            />
                            <label className="form-label">Popular Categories</label>
                            <input
                              type="text"
                              className="form-control"
                              name="popularCategories"
                              onChange={handleInputs}
                              placeholder="Example Harvard University"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                          <div>
                            <button
                              data-bs-dismiss="offcanvas"
                              type="submit"
                              onClick={filterUniversityList}
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
                    <li className="m-1">
                      <Link onClick={openImportPopup}>
                        <button
                          className="btn text-white rounded-1 border-0"
                          style={{ backgroundColor: "#9265cc", fontSize: "12px" }}
                        >
                          <i className="fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </Link>
                    </li>

                    <li className="m-1">
                      <Link to="/add_university">
                        <button
                          className="btn border-0 fw-semibold text-white"
                          style={{ backgroundColor: "#231f20", fontSize: "12px" }}
                        >
                          <i className="fa fa-plus-circle me-2" aria-hidden="true"></i> Add University
                        </button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>



          <div className="container mt-2 mb-0">
            <div className="row">
              <div className="col-md-3 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-dark shadow-sm p-3"> {/* Tropical Teal */}
                    <div className="row g-0">
                      <div className="col-7">
                        <h7 className=""><i class="fas fa-university ">University:{details?.totalUniversities || 0}</i></h7>
                      </div>
                      <div className="col-auto ">
                        <div className="chart-container " style={{ position: 'relative', width: '12rem', height: '10rem' }}>
                          <canvas ref={chartRef} style={{width: '6rem', height: '7rem'}} />
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <p className="card-text mb-1 rounded border-0 text-white" style={{backgroundColor:'#fdc21d',}}>Active: {details?.activeUniversities || 0}</p>
                        <p className="card-text mb-1 rounded border-0 text-white" style={{backgroundColor:'#207cbb',}}>InActive:  {details?.inactiveUniversities || 0}</p>
                      </div>
                     
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-white shadow-sm" > {/* Steel Blue */}
                    <div className="card-body">
                      <h6 className=""><i class="fas fa-flag "></i>&nbsp;&nbsp; No of Countries:{details?.totalUniqueCountries || 0}</h6>
                      <div className="d-flex align-items-center justify-content-between">
                      <div className="mx-auto my-2  my-xl-4" style={{ width: '14rem', height: '12rem' }}>
                                    <PieChart tooltip={{ trigger: 'item' }}
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: details?.master?.coins, label: 'Total Earnings', color: '#ffff4d' },
                                                    { id: 2, value: 0, label: 'Session Completed', color: '#66ff99' },
                                                    { id: 1, value: details?.bookedSession, label: 'Booked Session', color: '#ff6666' },
                                                    { id: 3, value: details?.totalPlayList, label: 'Total Playlist', color: '#ff80df' },
                                                ], innerRadius: 50, outerRadius: 100, cx: 100
                                            },
                                        ]}
                                        slotProps={{
                                            legend: {
                                                labelStyle: {
                                                    fontSize: 12,
                                                    fontWeight: 'bold'
                                                },
                                            },
                                        }}
                                    />
                                </div>
                        <p className="card-text mb-1">CountryWise</p>
                        <p className="card-text mb-1">Procssing...</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-white shadow-sm" style={{ backgroundColor: "#C62828" }}> {/* Crimson Red */}
                    <div className="card-body">
                      <h6 className=""><i class="fas fa-info-circle "></i>&nbsp;&nbsp; Popular Categories:{details?.totalPopularCategoryCount || 0}</h6>
                      <div className="d-flex align-items-center justify-content-between">
                        {/* <p className="card-text mb-1">Active: {details?.activeUniversities|| 0}</p>
                <p className="card-text mb-1">Inactive:  {details?.inactiveUniversities|| 0}</p> */}
                      </div>

                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-white shadow-sm" style={{ backgroundColor: "#1A237E" }}> {/* Navy Blue */}
                    <div className="card-body">
                      <h6 className=""><i class="fas fa-clipboard-list "></i>&nbsp;&nbsp;No of Applications:{detail?.totalApplication || 0}</h6>

                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-white shadow-sm" style={{ backgroundColor: "#0288D1" }}> {/* Navy Blue */}
                    <div className="card-body">
                      <h6 className=""><i class="fas fa-clipboard-list "></i>&nbsp;&nbsp;Highest Applied University</h6>
                      <p className="card-text">processing...</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-white shadow-sm" style={{ backgroundColor: "#1A237E" }}> {/* Navy Blue */}
                    <div className="card-body">
                      <h6 className=""><i class="fas fa-clipboard-list "></i>&nbsp;&nbsp;Highest Applied Country</h6>
                      <p className="card-text">processing...</p>
                    </div>
                  </div>
                </Link>
              </div>


              <div className="col-md-4 mb-3">
                <Link to="#" className="text-decoration-none">
                  <div className="card rounded-1 border-0 text-white shadow-sm" style={{ backgroundColor: "#C62828" }}> {/* Crimson Red */}
                    <div className="card-body">
                      <h6 className=""><i class="fas fa-info-circle "></i>&nbsp;&nbsp; No of Commission:processing...</h6>
                      <div className="d-flex align-items-center justify-content-between">

                        <p className="card-text mb-1">
                          <i className="fas fa-users mb-1"></i> Commissionable: 0
                          <br />
                          <i className="fas fa-user-slash mb-1"></i> Non-Commissionable: 0
                          <br />
                          <i className="fas fa-user-slash mb-1"></i> Varies By Program: 0
                        </p>
                      </div>

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
                            <option value="Deactivate">Deactivate</option>
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

                        <div className="table-responsive">
                          <table
                            className="table table-hover card-table dataTable text-center "
                            style={{ color: "#9265cc" }}
                            ref={tableRef}
                          >
                            <thead className="table-light" style={{ fontSize: "11px" }}>
                              <tr>
                                <th className=" text-start">
                                  <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === university.length
                                    }
                                  />
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  S No
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Code
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Name    <i className="fa fa-filter" aria-hidden="true"></i>
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Country   <i className="fa fa-filter" aria-hidden="true"></i>
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Campus   <i className="fa fa-filter" aria-hidden="true"></i>
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Popular Categories  <i className="fa fa-filter" aria-hidden="true"></i>
                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Application
                                  <i className="fa fa-filter" aria-hidden="true"></i>

                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  status
                                  <i className="fa fa-filter" aria-hidden="true"></i>

                                </th>
                                <th className="text-capitalize text-start sortable-handle">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody style={{ fontSize: "10px" }}>
                              {university?.map((data, index) => {
                                const isExpanded = !!expandedRows[index];

                                return (
                                  <tr key={index}>
                                    <td className=" text-start">
                                      <input
                                        type="checkbox"
                                        checked={selectedIds.includes(data._id)}
                                        onChange={() => handleCheckboxChange(data._id)}
                                      />
                                    </td>
                                    <td className="text-capitalize text-start">
                                      {pagination.from + index + 1}
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">
                                      {data?.universityCode}
                                    </td>
                                    <td
                                      className="text-capitalize text-start text-truncate"
                                      onMouseEnter={() => toggleRow(index)}
                                      onMouseLeave={() => toggleRow(index)}
                                      title={data?.universityName}
                                    >
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/view_university",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        {getDisplayText(data?.universityName, isExpanded)}
                                      </Link>
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">
                                      {data?.country}
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">
                                      {data.campuses?.map((campus, yearIndex) => (
                                        <div key={yearIndex}>
                                          {campus?.state?.length > 0
                                            ? campus.state
                                            : "Not Available"}
                                          {"_"}
                                          {campus?.lga?.length > 0
                                            ? campus.lga
                                            : "Not Available"}{"_"}
                                          {campus?.primary === "true" ? campus.primary ? <i className="fas fa-check text-primary">Primary Campus</i> : "Secondary Campus" : "Secondary Campus"}

                                        </div>
                                      ))}
                                    </td>
                                    <td
                                      className="text-capitalize text-start text-truncate"
                                      onMouseEnter={() => toggleRow(index)}
                                      onMouseLeave={() => toggleRow(index)}
                                      title={data?.popularCategories}
                                    >
                                      {getDisplayText(data?.popularCategories.join(", "), isExpanded)}
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">
                                      {data?.noofApplications || "Not Available"}
                                    </td>
                                    <td className="text-capitalize text-start text-truncate">
                                      {data?.isActive || "Not Available"}
                                    </td>

                                    <td className="text-capitalize text-start text-truncate">
                                      <div className="d-flex">

                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/view_university",
                                            search: `?id=${data?._id}`,
                                          }}
                                        >
                                          <i className="far fa-eye text-primary me-1"></i>
                                        </Link>



                                        <Link
                                          className="dropdown-item"
                                          to={{
                                            pathname: "/edit_university",
                                            search: `?id=${data?._id}`,
                                          }}
                                        >
                                          <i className="far fa-edit text-warning me-1"></i>
                                        </Link>


                                        <button
                                          className="dropdown-item"
                                          onClick={() => openPopup(data?._id)}
                                        >
                                          <i className="far fa-trash-alt text-danger me-1"></i>
                                        </button>

                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>



                      <div
                        class="tab-pane fade " id="tab-profile" role="tabpanel" aria-labelledby="profile-tab"
                      >

                        <div className="container">
                          <div className="row">
                            {university?.map((item, index) => {
                              <div className="col-md-4 mb-4" key={index}>
                                <div className="card shadow-sm  rounded-1 text-bg-light h-100">
                                  <div className="card-header   d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">{item?.universityName}</h6>
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
                                            <strong>University ID</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {item?.universityCode}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mb-2">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <strong>Country</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {item?.country}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mb-2">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <strong>Campus</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {item.campuses?.map((campus, yearIndex) => (
                                              <div key={yearIndex}>
                                                {campus?.state?.length > 0
                                                  ? campus.state
                                                  : "Not Available"}
                                                {"_"}
                                                {campus?.lga?.length > 0
                                                  ? campus.lga
                                                  : "Not Available"}{"_"}
                                                {campus?.primary === "true" ? campus.primary ? <i className="fas fa-check text-primary">Primary Campus</i> : "Secondary Campus" : "Secondary Campus"}

                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mb-2">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <strong>Popular Categories</strong>
                                          </div>
                                          <div className="col-md-7">
                                            {item?.popularCategories}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mb-2">
                                        <div className="row">
                                          <div className="col-md-5">
                                            <strong> {data?.isActive || "Not Available"}</strong>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
                                    <Link
                                      className="btn btn-sm btn-outline-primary"
                                      to={{
                                        pathname: "/view_university",
                                        search: `?id=${item?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>



                                    <Link
                                      className="btn btn-sm btn-outline-warning"
                                      to={{
                                        pathname: "/edit_university",
                                        search: `?id=${item?._id}`,
                                      }}
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>
                                    </Link>


                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => openPopup(item?._id)}
                                    >
                                      <i className="far fa-trash-alt text-danger me-1"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            })}
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
              <h6
                className="mb-4"
                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
              >
                Are you sure you want to Delete <br /> the selected University ?
              </h6>
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
                  to="#"
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

      </div>
    </>
  );
}
