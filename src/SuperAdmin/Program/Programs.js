import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import {getSuperAdminForSearch} from '../../api/superAdmin';
import { getAllApplicantCard } from "../../api/applicatin";
import {getallProgram,getAllProgramCard,deleteProgram,getFilterProgram,updatedProgram} from "../../api/Program";
import { Link, useLocation } from "react-router-dom";
import {Dialog,DialogContent,DialogTitle,IconButton,Pagination,radioClasses,} from "@mui/material";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";

import { FaFilter } from "react-icons/fa";
import axios from "axios";

export default function Masterproductlist() {
  const initialStateInputs = {
    universityName: "",
    programTitle: "",
    applicationFee: "",
    courseFee: "",
  };
  const [file, setFile] = useState(null);
  const location = useLocation()
  var searchValue = location.state
  const [link ,setLink] = useState('');
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [openDelete, setOpenDelete] = useState(false);
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const search = useRef(null);
  const [pageSize, setPageSize] = useState(10); 
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [program, setProgaram] = useState([]);
  const [detail, setDetail] = useState();
  const [details, setDetails] = useState();

  useEffect(() => {
    getAllProgaramDetails();
  }, [pagination.from, pagination.to,pageSize]);

  useEffect(() => {
    if (search.current) {
        search.current.focus()
    }
}, [])

useEffect(() => {
    if (searchValue) {
        search.current.value = searchValue.substring(1)
        handleSearch()
    }
}, [searchValue])


useEffect(() => {
  getallProgramCount();
  getallApplicantCount();
 
}, []);

const getallApplicantCount = ()=>{
  getAllApplicantCard().then((res)=>setDetail(res?.data.result))
}
const getallProgramCount = ()=>{
  getAllProgramCard().then((res)=>setDetails(res?.data.result))
}


  const getAllProgaramDetails = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterProgram(data)
      .then((res) => {
        setProgaram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
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
    if (event.key === 'Enter') {
        search.current.blur();
        handleSearch()
    }
  }

  const handleSearch = (event) => {
    const data = search.current.value;
    event?.preventDefault();
    getSuperAdminForSearch(data)
      .then(res => {
        const programList = res?.data?.result?.programList;
        setProgaram(programList);
        const result = programList.length ? 'programs' : '';
        setLink(result);
        setData(result === '' ? true : false);
      })
      .catch(err => console.log(err));
  };
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteProgramData = () => {
    deleteProgram(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllProgaramDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const filterProgramList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: inputs.universityName,
      programTitle: inputs.programTitle,
      applicationFee: inputs.applicationFee,
      courseFee: inputs.courseFee,
      limit: 10,
      page: pagination.from,
    };
    getFilterProgram(data)
      .then((res) => {
        setProgaram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
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
    getAllProgaramDetails();
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

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("program", file);

    try {
      const response = await axios.post(
         "https://api.edufynd.in/api/program/import",
        // "http://localhost:4409/api/program/import",
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
       toast.error('Unsupported file format. Please upload CSV or XLSX.');
    }
  };

  const pdfDownload = (event) => {
    event?.preventDefault();
    getFilterProgram(program)
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
            text: "University Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Program Title",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Application Fees",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Course Fees",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Campus",
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
              text: element?.programTitle ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: element?.applicationFee ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.courseFee ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.campus ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("Program List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getFilterProgram(program)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            universityName: res?.universityName ?? "-",
            programTitle: res?.programTitle ?? "-",
            applicationFee: res?.applicationFee ?? "-",
            courseFee: res?.courseFee ?? "-",
            campus: res?.campus ?? "-",
          });
        });
        let header1 = [
          "universityName",
          "programTitle",
          "applicationFee",
          "courseFee",
          "campus",
        ];
        let header2 = [
          "University Name",
          "Program Title",
          "Application Fees",
          "Course Fees",
          "Campus",
        ];
        ExportCsvService.downloadCsv(
          list,
          "programList",
          "Program List",

          header1,
          header2
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const tableRef = useRef(null);

  // useEffect(() => {
  //   const table = tableRef.current;

  //   // Apply SortableJS to the table headers
  //   const sortable = new Sortable(table.querySelector("thead tr"), {
  //     animation: 150,
  //     swapThreshold: 0.5,
  //     handle: ".sortable-handle",
  //     onEnd: (evt) => {
  //       const oldIndex = evt.oldIndex;
  //       const newIndex = evt.newIndex;

  //       // Move the columns in the tbody
  //       table.querySelectorAll("tbody tr").forEach((row) => {
  //         const cells = Array.from(row.children);
  //         row.insertBefore(cells[oldIndex], cells[newIndex]);
  //       });
  //     },
  //   });

  //   return () => {
  //     sortable.destroy();
  //   };
  // }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = program.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      setOpenDelete(true);
      // deleteSelectedprogram();
    } else if (action === "Activate") {
      activateSelectedProgram();
    }
  };
 

  const deleteSelectedProgram = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) =>deleteProgram(id)))
        .then((responses) => {
          toast.success("program deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getAllProgaramDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete program.");
        });
    } else {
      toast.warning("No program selected.");
    }
  };

  const activateSelectedProgram = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => updatedProgram(id,{ active: true })))
        .then((responses) => {
          toast.success("program activated successfully!");
          setSelectedIds([]);
          getAllProgaramDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate program.");
        });
    } else {
      toast.warning("No program selected.");
    }
  };

  
  return (
    <>
      <div>
        <Mastersidebar />

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
       <div className="content-header bg-light shadow-sm sticky-top">
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-12">
        <ol className="d-flex justify-content-end align-items-center list-unstyled mb-0">
          <li className="flex-grow-1">
            <form onSubmit={handleSearch}>
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="search"
                  ref={search}
                  onChange={handleInputsearch}
                  placeholder="Search...."
                  aria-describedby="button-addon3"
                  className="form-control border-1 border-dark rounded-4"
                  style={{ fontSize: "12px" }} // Keep the font size if it's correct
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
              className="btn btn-primary rounded-1 border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              style={{ fontSize: "12px" }}
            >
              <FaFilter />
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h6 id="offcanvasRightLabel">Filter Program</h6>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">
                <form>
                  <div className="form-group mb-3">
                    <label className="form-label">University Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="universityName"
                      onChange={handleInputs}
                      placeholder="Search...University Name"
                      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                    />
                    <label className="form-label">Program Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="programTitle"
                      onChange={handleInputs}
                      placeholder="Search...Program Title"
                      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                    />
                    <label className="form-label">Application Fee</label>
                    <input
                      type="text"
                      className="form-control"
                      name="applicationFee"
                      onChange={handleInputs}
                      placeholder="Search...Application Fee"
                      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                    />
                    <label className="form-label">Course Fee</label>
                    <input
                      type="text"
                      className="form-control"
                      name="courseFee"
                      onChange={handleInputs}
                      placeholder="Search...Course Fee"
                      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                    />
                  </div>
                  <div>
                    <button
                      data-bs-dismiss="offcanvas"
                      className="btn btn-cancel border-0 fw-semibold text-white float-right"
                      style={{ backgroundColor: "#0f2239", fontSize: "14px" }}
                      onClick={resetFilter}
                    >
                      Reset
                    </button>
                    <button
                      data-bs-dismiss="offcanvas"
                      type="submit"
                      onClick={filterProgramList}
                      className="btn btn-save border-0 text-white fw-semibold float-right mx-2"
                      style={{ backgroundColor: "#fe5722", fontSize: "14px" }}
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </li>
          <li className="m-1">
            <Link onClick={pdfDownload}>
              <button
                className="btn text-white rounded-1 border-0"
                style={{ backgroundColor: "#E12929", fontSize: "12px" }}
              >
                <i className="fa fa-file-pdf" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={exportCsv}>
              <button
                className="btn text-white rounded-1 border-0"
                style={{ backgroundColor: "#22A033", fontSize: "12px" }}
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
          <li className="m-0">
            <Link className="btn btn-pix-primary border-0" to="/add_program">
              <button
                className="btn rounded-1 fw-semibold border-0 text-white"
                style={{ backgroundColor: "#231f20", fontSize: "12px" }}
              >
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                Add Program
              </button>
            </Link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>

<div className="container-fluid mt-3">
      <div className="row g-4">
        {/* Total Number of Programs Card */}
        <div className="col-md-3">
        <Link to='#' className="text-decoration-none">  <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#00695c', color: '#fff' }}>
            <div className="card-body text-center">
             
              <h6> <i className="fas fa-list-ul "></i>&nbsp;&nbsp;Total No of Programs</h6>
              <p className="card-text">Count:{details?.totalProgram|| 0}</p>
            </div>
          </div>
          </Link>
        </div>

        {/* Popular Categories Card1 */}
        <div className="col-md-3">
        <Link to='#' className="text-decoration-none">     <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#ff5722', color: '#fff' }}>
            <div className="card-body text-center">
             
              <h6> <i className="fas fa-star "></i> &nbsp;&nbsp;No of Country</h6>
              <p className="card-text">Count:{details?.totalUniqueCountries|| 0}</p>
            </div>
          </div>
          </Link>
        </div>

 {/* Popular Categories Card2 */}
        <div className="col-md-3">
        <Link to='#' className="text-decoration-none">     <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: "#0288D1" }}>
            <div className="card-body text-center">
             
              <h6> <i className="fas fa-star "></i> &nbsp;&nbsp;No of University</h6>
              <p className="card-text">Count:{details?.universityName|| 0}</p>
            </div>
          </div>
          </Link>
        </div>

        {/* Number of Applications Card */}
        <div className="col-md-3">
        <Link to='#' className="text-decoration-none">    <div className="card rounded-1 border-0 shadow-sm" style={{ backgroundColor: '#3f51b5', color: '#fff' }}>
            <div className="card-body text-center">
             
              <h6>   <i className="fas fa-chart-bar "></i>&nbsp;&nbsp;No Of Applications</h6>
              <p className="card-text">{detail?.totalApplication}</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>

          <div className="container-fluid">
  <div className="row">
    <div className="col-xl-12">
      <div className="card rounded-1 shadow-sm border-0 ">
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
            className="table card-table table-hover dataTable text-center"
            style={{ color: "#9265cc", fontSize: "12px" }}
            // ref={tableRef}
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
                                      selectedIds.length === program.length
                                    }
                                  />
                            </th>
                <th className="text-capitalize text-start sortable-handle">
                  S No
                </th>
                
                <th className="text-capitalize text-start sortable-handle">
                  Code  <i className="fa fa-filter" aria-hidden="true"></i>
                </th>
                <th className="text-capitalize text-start sortable-handle">
                  Title   <i className="fa fa-filter" aria-hidden="true"></i>
                </th>
                <th className="text-capitalize text-start sortable-handle">
                  University Name   <i className="fa fa-filter" aria-hidden="true"></i>
                </th>
                <th className="text-capitalize text-start sortable-handle">
                  Application Fees  <i className="fa fa-filter" aria-hidden="true"></i>
                </th>
                <th className="text-capitalize text-start sortable-handle">
                  Course Fees 
       
        <i className="fa fa-filter" aria-hidden="true"></i>
     
                </th>
                <th className="text-capitalize text-start sortable-handle">
                  Status
       
        <i className="fa fa-filter" aria-hidden="true"></i>
     
                </th>
                <th className="text-capitalize text-start sortable-handle">
                  Action
                </th>
              </tr>
            </thead>
            <tbody   style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "11px",
                }}>
              {program?.map((data, index) => {
                const isExpanded = !!expandedRows[index];
                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: "#fff",
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
                    <td className="text-capitalize text-start text-truncate" >
                      {pagination.from + index + 1}
                    </td>
                   
                    <td className="text-capitalize text-start text-truncate">
                      {data?.programCode  || "Not Available"}
                    </td>
                    <td className="text-capitalize text-start text-truncate">
                      <Link
                        className="dropdown-item"
                        to={{
                          pathname: "/view_program",
                          search: `?id=${data?._id}`,
                        }}
                      >
                        {getDisplayText(data?.programTitle, isExpanded)  || "Not Available"}
                      </Link>
                    </td>
                    <td
                      className="text-capitalize text-start text-truncate"
                      title={data?.universityName  || "Not Available"}
                    >
                      {getDisplayText(data?.universityName, isExpanded)}
                    </td>
                    <td className="text-capitalize text-start text-truncate">
                      {data?.applicationFee  || "Not Available"}
                    </td>
                    <td className="text-capitalize text-start text-truncate">
                      {data?.campuses?.length > 0
                        ? data?.campuses[0]?.courseFees
                        : "Not Available"}
                    </td>
                    <td className="text-capitalize text-start ">
           
            <span className="form-check form-switch d-inline ms-2" >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
              
              />
            </span>
          </td>
                    <td className="text-capitalize text-start text-truncate">
                      <div className="d-flex">
                        <Link
                          className="dropdown-item"
                          to={{
                            pathname: "/view_program",
                            search: `?id=${data?._id}`,
                          }}
                        >
                          <i className="far fa-eye text-primary me-1"></i>
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={{
                            pathname: "/edit_program",
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
  {program?.map((data, index) => {
      <div className="col-md-4 mb-4" key={index}>
        <div className="card shadow-sm  rounded-1 text-bg-light h-100">
          <div className="card-header   d-flex justify-content-between align-items-center">
            <h6 className="mb-0">{data?.programTitle}</h6>
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
                    <strong>Program ID</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.programCode  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>University Name</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.universityName  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Application Fee</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.applicationFee  || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Course Fee</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.campuses?.length > 0
                        ? data?.campuses[0]?.courseFees
                        : "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Status</strong>
                  </div>
                  <div className="col-md-7 ">
                 
            <span className="form-check form-switch d-inline ms-2" >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                
              />
            </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
          <Link
                          className="btn btn-sm btn-outline-primary"
                          to={{
                            pathname: "/view_program",
                            search: `?id=${data?._id}`,
                          }}
                        >
                          <i className="far fa-eye text-primary me-1"></i>
                        </Link>
                        <Link
                          className="dropdown-item"
                          to={{
                            pathname: "/edit_program",
                            search: `?id=${data?._id}`,
                          }}
                        >
                          <i className="btn btn-sm btn-outline-warning"></i>
                        </Link>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            openPopup(data?._id);
                          }}
                        >
                          <i className="btn btn-sm btn-outline-danger"></i>
                        </button>
          </div>
        </div>
      </div>
})}
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
              <h6 className="mb-4">
                Are you sure you want to Delete <br /> the selected Program ?
              </h6>
              <button
                type="button"
                className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase mx-3"
                onClick={deleteProgramData}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-cancel btn-danger px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase "
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
                     onClick={deleteSelectedProgram}
                     
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
            Upload Program List
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
                  className="btn btn-cancel border-0 fw-semibold text-uppercase rounded-pill px-3 py-1 text-white float-right bg"
                  style={{ backgroundColor: "#0f2239" }}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  onClick={handleFileUpload}
                  className="btn btn-save border-0 text-white fw-semibold text-uppercase rounded-pill px-3 py-1 float-right mx-2"
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
