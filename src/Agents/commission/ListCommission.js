import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallCommission, deleteCommission,getFilterCommission,updatedCommission } from "../../api/commission";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";
import Mastersidebar from "../../compoents/AgentSidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import { Link, useLocation } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import {getAgentId } from "../../Utils/storage";
import {  getSingleAgent } from "../../api/agent";
export default function Masterproductlist() {

  const initialState = {
    country: "",
    universityName: "",
    paymentMethod: "",
    amount: null,
    percentage: null,
    commissionPaidOn: "",
    eligibility: "",
    tax: "",
    paymentType: "",
    currency: "",
    flag: "",
    clientName: "",
    years: [
      {
        id: 1,
        year: "",
        courseTypes: [{ courseType: "", inTake: "", value: null }],
      },
    ],
  };



  const [commission, setCommission] = useState([]);
  const search = useRef(null);
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [openDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [pageSize, setPageSize] = useState(10); 
  const [agent, setAgent] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getCommissionList();
    getAgentDetails();
  }, [pagination.from, pagination.to,pageSize]);


  const getAgentDetails = () => {
    const id = getAgentId();
    getSingleAgent(id)
      .then((res) => {
        console.log("yuvi", res);
        setAgent(res?.data?.result); // Assuming the staff data is inside res.data.result
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  if (!agent || !agent.privileges) {
    // return null; // or a loading spinner
  }
  
  const agentPrivileges = agent?.privileges?.find(privilege => privilege.module === 'program');
  
  if (!agentPrivileges) {
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


  const getCommissionList = () => {
    const data = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterCommission(data)
      .then((res) => {
        console.log("yuvaraj",res)
        const value = res?.data?.result?.dropDownList;
        setCommission(value);
        setPagination({
          ...pagination,
          count: res?.data?.result?.dropDownCount || 0,
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

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteCommissionData = () => {
    deleteCommission(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getCommissionList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterCommissionList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: inputs.universityName,
     country: inputs.country,
     paymentMethod: inputs.paymentMethod,
      paymentType: inputs.paymentType,
      limit: 10,
      page: pagination.from,
    };
    getFilterCommission(data)
      .then((res) => {
        console.log("ui",res)
        setCommission(res?.data?.result?.dropDownList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.dropDownCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleSearch = (event) => {
    const data = search.current.value;
    event?.preventDefault();
    getSuperAdminForSearch(data)
      .then((res) => {
        const universityList = res?.data?.result?.commissionList;
        setCommission(universityList);
        const result = universityList.length ? "commission" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };

  const handleInputsearch = (event) => {
    if (event.key === "Enter") {
      search.current.blur();
      handleSearch();
    }
  };

  
 

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallCommission(commission)
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
            text: "UniversityName",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "BusinessMailID",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Eligibility",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Tax",
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
              text: element?.paymentMethod ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.eligibility ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.tax ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("commissionList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallCommission(commission)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
           
            universityName: res?.universityName ?? "-",
            paymentMethod: res?.paymentMethod ?? "-",
            eligibility: res?.eligibility ?? "-",
            tax: res?.tax ?? "-",
          });
        });
        let header1 = [
         
          "universityName",
          "paymentMethod",
          "eligibility",
          "tax",
        ];
        let header2 = [
          "Client Id",
          "University Name",
          "Payment Method",
          "eligibility",
          "Tax",
        ];
        ExportCsvService.downloadCsv(
          list,
          "commissionList",
          "Commission List",

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
      const allIds = commission.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      setOpenDelete(true);
      // deleteSelectedcommission();
    } else if (action === "Activate") {
      activateSelectedcommission();
    }
  };
 

  const deleteSelectedCommission = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteCommission(id)))
        .then((responses) => {
          toast.success("commission deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getCommissionList();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete commission.");
        });
    } else {
      toast.warning("No commission selected.");
    }
  };

  const activateSelectedcommission = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => updatedCommission(id,{ active: true })))
        .then((responses) => {
          toast.success("commission activated successfully!");
          setSelectedIds([]);
          getCommissionList();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate commission.");
        });
    } else {
      toast.warning("No commission selected.");
    }
  };

  

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
      <div className="content-header bg-light shadow-sm sticky-top">
  <div className="container-fluid">
    <div className="row">
      <div className="col-xl-12">
        <ol className="d-flex flex-row flex-wrap  justify-content-end justify-content-sm-evenly align-items-center list-unstyled mb-0">
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
              className="btn btn-primary border-0 rounded-1 text-white"
              style={{ fontSize: "12px" }}
              type="button"
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
              <h5 id="offcanvasRightLabel">Filter Commission</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <form>
                <div className="row g-4 mb-3">
                <label className="form-label">UniversityName</label>
                  <input
                    type="text"
                    className="form-control"
                    name="universityName"
                    onChange={handleInputs}
                    placeholder="Search...Client Name"
                    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                  />
                 <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    onChange={handleInputs}
                    placeholder="Search...Client Contact No"
                    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                  />
                <label className="form-label">PaymentMethod</label>
                  <input
                    type="text"
                    className="form-control"
                    name="paymentMethod"
                    onChange={handleInputs}
                    placeholder="Search...Status"
                    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                  />
                  <label className="form-label">PaymentType</label>
                  <input
                    type="text"
                    className="form-control"
                    name="paymentType"
                    onChange={handleInputs}
                    placeholder="Search...Client Id"
                    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                  />
                </div>
                <div>
                  <button
                    data-bs-dismiss="offcanvas"
                    className="btn btn-cancel border-0 rounded-1 fw-semibold text-white float-right"
                    style={{ backgroundColor: "#0f2239", fontSize: "12px" }}
                  >
                    Reset
                  </button>
                  <button
                    data-bs-dismiss="offcanvas"
                    onClick={filterCommissionList}
                    type="submit"
                    className="btn btn-save border-0 fw-semibold  rounded-1  text-white float-right mx-2"
                    style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
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
                className="btn text-white border-0 rounded-1"
                style={{ backgroundColor: "#E12929", fontSize: "12px" }}
              >
                <i className="fa fa-file-pdf" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link onClick={exportCsv}>
              <button
             
                className="btn text-white border-0 rounded-1"
                style={{ backgroundColor: "#22A033", fontSize: "12px" }}
              >
                <i className="fa fa-file-excel" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
            <Link>
              <button
                className="btn text-white border-0 rounded-1"
                style={{ backgroundColor: "#9265cc", fontSize: "12px" }}
              >
                <i className="fa fa-upload" aria-hidden="true"></i>
              </button>
            </Link>
          </li>
          <li className="m-1">
          {agentPrivileges?.add && (
            <Link to="/agent_add_commission">
              <button
                className="btn rounded-1 fw-semibold border-0 text-white"
                style={{ backgroundColor: "#231f20", fontSize: "12px" }}
              >
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                Add Commission
              </button>
            </Link>
          )}
          </li>
        </ol>
      </div>
    </div>
  </div>
</div>

        
        <div className="container-fluid mt-3">
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
                className="table card-table table-hover dataTable text-center"
                style={{ color: "#9265cc", fontSize: "12px" }}
                ref={tableRef}
              >
                <thead className="table-light" style={{fontSize:'12px'}}>
                  <tr>
                  <th className=" text-start">
                  <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === commission.length
                                    }
                                  />
                            </th>
                    <th className="text-capitalize text-start sortable-handle">
                      S No
                    </th>
                    <th className="text-capitalize text-start sortable-handle">
                      University Name   <i className="fa fa-filter" aria-hidden="true"></i>
                    </th>
                    <th className="text-capitalize text-start sortable-handle">
                      Country   <i className="fa fa-filter" aria-hidden="true"></i>
                    </th>
                    <th className="text-capitalize text-start sortable-handle">
                      Commission   <i className="fa fa-filter" aria-hidden="true"></i>
                    </th>
                    <th className="text-capitalize text-start sortable-handle">
                      Payment Type   <i className="fa fa-filter" aria-hidden="true"></i>
                    </th>
                    <th className="text-capitalize text-start sortable-handle">
                     Status  <i className="fa fa-filter" aria-hidden="true"></i>
                    </th>
                    <th className="text-capitalize text-start sortable-handle">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody style={{fontSize:'11px'}}>
                  {commission.map((data, index) => (
                    <tr key={index}>
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
                        {data?.universityName || "Not Available"} 
                      </td>
                      <td className="text-capitalize text-start text-truncate">
                        {data?.country || "Not Available"}
                      </td>
                    
                      <td className="text-capitalize text-start text-truncate">
                      {agentPrivileges?.view && (
                        <Link
                          className="dropdown-item"
                          to={{
                            pathname: "/ agent_view_commission",
                            search: `?id=${data?._id}`,
                          }}
                        >
                         {data?.years?.map((year, yearIndex) => (
  <div key={yearIndex}>
    {year?.year || "Not Available"} _
    {year?.courseTypes?.length > 0 && year?.courseTypes[0]?.inTake?.length > 0
      ? `${year?.courseTypes[0]?.inTake[0]?.inTake} _ ${year?.courseTypes[0]?.courseType} _ ${year?.courseTypes[0]?.inTake[0]?.value}%`
      : "Not Available"}{" ,"}
  </div>
))}

                        </Link>
                      )}
                      </td>
                      <td className="text-capitalize text-start text-truncate">
                        {data?.paymentType || "Not Available"}
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
                      <td>
                        <div className="d-flex">
                        {agentPrivileges?.view && (
                          <Link
                            className="dropdown-item"
                            to={{
                              pathname: "/agent_view_commission",
                              search: `?id=${data?._id}`,
                            }}
                            data-bs-toggle="tooltip"
                            title="View"
                          >
                            <i className="far fa-eye text-primary me-1"></i>
                          </Link>
                        )}
                        {agentPrivileges?.edit && (
                          <Link
                            className="dropdown-item"
                            to={{
                              pathname: "/agent_edit_commission",
                              search: `?id=${data?._id}`,
                            }}
                            data-bs-toggle="tooltip"
                            title="Edit"
                          >
                            <i className="far fa-edit text-warning me-1"></i>
                          </Link>
                        )}
                        {agentPrivileges?.delete && (
                          <Link
                            className="dropdown-item"
                            onClick={() => openPopup(data?._id)}
                          >
                            <i className="far fa-trash-alt text-danger me-1"></i>
                          </Link>
                        )}
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
  {commission.map((data, index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="card shadow-sm  rounded-1 text-bg-light h-100" style={{fontSize:'10px'}}> 
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
                    <strong>University Name</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.universityName || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Country</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.country || "Not Available"}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Commission</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.years?.map((year, yearIndex) => (
  <div key={yearIndex}>
    {year?.year || "Not Available"} _
    {year?.courseTypes?.length > 0 && year?.courseTypes[0]?.inTake?.length > 0
      ? `${year?.courseTypes[0]?.inTake[0]?.inTake} _ ${year?.courseTypes[0]?.courseType} _ ${year?.courseTypes[0]?.inTake[0]?.value}`
      : "Not Available"}{" ,"}
  </div>
))}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Payment Type</strong>
                  </div>
                  <div className="col-md-7">
                  {data?.paymentType || "Not Available"}
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
          {agentPrivileges?.view && (
                          <Link
                            className=" btn btn-outline-primary btn-sm"
                            to={{
                              pathname: "/agent_view_commission",
                              search: `?id=${data?._id}`,
                            }}
                            data-bs-toggle="tooltip"
                            title="View"
                          >
                            <i className="far fa-eye text-primary "></i> View
                          </Link>
          )}
          
          
          {agentPrivileges?.edit && (
                          <Link
                            className="btn btn-outline-warning btn-sm"
                            to={{
                              pathname: "/agent_edit_commission",
                              search: `?id=${data?._id}`,
                            }}
                            data-bs-toggle="tooltip"
                            title="Edit"
                          >
                            <i className="far fa-edit text-warning"></i> Edit
                          </Link>
          )}
           {agentPrivileges?.delete && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => openPopup(data?._id)}
                          >
                            <i className="far fa-trash-alt text-danger "></i> Delete
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
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete <br /> the Selected Commission ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              onClick={deleteCommissionData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel btn-danger px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase "
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
                     onClick={deleteSelectedCommission}
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
          Filter University
          <IconButton className="float-right">
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Upload University List
          <IconButton className="float-right">
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
                  className="form-control text-dark bg-transparent"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div>
              <Link
                to="#"
                className="btn btn-cancel border-0 rounded-pill text-uppercase px-3 py-1 fw-semibold text-white float-right bg"
                style={{
                  backgroundColor: "#0f2239",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0 rounded-pill text-uppercase fw-semibold px-3 py-1 text-white float-right mx-2"
                style={{
                  backgroundColor: "#fe5722",
                  color: "#fff",
                  fontSize: "12px",
                }}
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
