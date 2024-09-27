import { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallPromotion, getFilterPromotions,deletePromotion,deactivateClient,activeClient } from "../../api/promotions";
import { getNotificationSearch } from "../../api/superAdmin";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import Mastersidebar from "../../compoents/sidebar";
import { toast } from "react-toastify";
import { formatDate } from "../../Utils/DateFormat";
import { FaFilter } from "react-icons/fa";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
export const ListPromotions = () => {

  const initialStateInputs = {
    hostName: "",   
    typeOfUser:"",
subject:"",
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

  const [notification, setnotification] = useState([]);
 
  useEffect(() => {
    getAllClientDetails();
  }, []);

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
  const getAllClientDetails = () => {
    getFilterPromotions()
      .then((res) => {
        console.log(res);
        setnotification(res?.data?.result?.promotionList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.promotionCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
    getNotificationSearch(data)
      .then((res) => {
        const universityList = res?.data?.result?.promotionList;
        setnotification(universityList);
        const result = universityList.length ? "notification" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const filterAgentList = (event) => {
    event?.preventDefault();
     setFilter(true);
    const data = {
        hostName: inputs.hostName,
        typeOfUser:inputs.typeOfUser,
        subject: inputs.subject,
        isActive: inputs.isActive
    };
    getFilterPromotions(data)
    .then((res) => {
      const sortedStudents = res?.data?.result?.promotionList.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
      });
      setnotification(sortedStudents);
      setPagination({
        ...pagination,
        count: res?.data?.result?.promotionCount,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllClientDetails();
  };

  const deleteProgramData = () => {
    deletePromotion(deleteId)
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

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallPromotion(notification)
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
            text: "subject",
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
              text: element?.subject ?? "-",
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
        templatePdf("promotionsList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallPromotion(notification)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
           
            hostName: res?.hostName ?? "-",
            typeOfUser: res?.typeOfUser ?? "-",
            subject: res?.subject ?? "-",
            isActive: res?.isActive ?? "-",
          });
        });
        let header1 = [
          
          "hostName",
          "typeOfUser",
          "subject",
          "isActive",
        ];
        let header2 = [
          
          "Host Name",
          "Type Of User",
          "subject Name",
         
          "Status",
        ];
        ExportCsvService.downloadCsv(
          list,
          "promotionsList",
          "promotions List",

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
      const allIds = notification.map((data) => data._id);
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
    }
    else if (action === "Delete") {
      setOpenDelete(true);
    }
  };
 
  const deleteSelectedStudent = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) =>deletePromotion(id)))
        .then((responses) => {
          toast.success("promotions deleted successfully!");
          setSelectedIds([]);
          setOpenDelete(false);
          getAllClientDetails();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete promotions.");
        });
    } else {
      toast.warning("No promotions selected.");
    }
  };
  const activateSelectedAgent = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to activate the clients
      activeClient({ promotionIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("promotions activated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful activation
          getAllClientDetails(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Already activate promotions.");
        });
    } else {
      toast.warning("No selected promotions.");
    }
  };

  const deactivateSelectedAgent= () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to deactivate the clients
      deactivateClient({ promotionIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("promotions deactivated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful deactivation
          getAllClientDetails(); // Refresh the client list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Aready to deactivate promotions.");
        });
    } else {
      toast.warning("No selected promotions.");
    }
  };
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
                  <ol className=" d-flex flex-row justify-content-end align-items-center w-100 mb-0 list-unstyled">
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
                          <h5 id="offcanvasRightLabel">Filter Promotion</h5>
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
                              <label className="form-label">Type Of User</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="typeOfUser"
                                onChange={handleInputs}
                                placeholder="Search...TypeOfUser"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                               <label className="form-label">Host Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="hostName"
                                onChange={handleInputs}
                                placeholder="Search...Host Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              />
                              <label className="form-label">Subject </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="subject"
                                onChange={handleInputs}
                                placeholder="Search...subject"
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
                      <Link class="btn btn-pix-primary" to="/add_promotions">
                        <button
                          className="btn btn-outline rounded-1  fw-semibold  border-0 text-white  "
                          style={{
                            backgroundColor: "#231f20",
                            fontSize: "12px",
                          }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                          Add Promotion
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
              {/* Card 1: Active Promotions */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#E91E63" }} // Pink
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-bullhorn"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Active Promotions
                    </h6>
                    <p className="card-text">Current active promotions.</p>
                    <p className="card-text">Total: 20</p>
                  </div>
                </div>
              </div>
              {/* Card 2: Expired Promotions */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#9C27B0" }} // Purple
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-calendar-times"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Expired Promotions
                    </h6>
                    <p className="card-text">Promotions that have expired.</p>
                    <p className="card-text">Total: 5</p>
                  </div>
                </div>
              </div>
              {/* Card 3: Upcoming Promotions */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#FFC107" }} // Amber
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-calendar-plus"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Upcoming Promotions
                    </h6>
                    <p className="card-text">
                      Promotions scheduled for the future.
                    </p>
                    <p className="card-text">Total: 10</p>
                  </div>
                </div>
              </div>
              {/* Card 4: Promotion Performance */}
              <div className="col-md-3 col-sm-6 mb-3">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#3F51B5" }} // Indigo
                >
                  <div className="card-body">
                    <h6 className="">
                      <i
                        className="fas fa-chart-line"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Promotion Performance
                    </h6>
                    <p className="card-text">
                      Performance metrics for promotions.
                    </p>
                    <p className="card-text">Total: 7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-body">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card rounded-1  shadow-sm border-0">
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
                              <option value="Delete">Delete</option>
                             
                            </select>
                          </p> 
                         
                        </div>
                        <div>
                          <ul
                            class="nav nav-underline "
                            id="myTab"
                            role="tablist"
                            style={{ fontSize: "12px" }}
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
                                className=" table  table-hover card-table  dataTable text-center"
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
                                      TypeOfUser
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                      Subject
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                      Status
                                    </th>
                                    <th className="text-capitalize text-start sortable-handle">
                                      Action{" "}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {notification?.map((data, index) => (
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
                                        {formatDate(
                                          data?.createdOn
                                            ? data?.createdOn
                                            : data?.modifiedOn
                                            ? data?.modifiedOn
                                            : "-"
                                        ) || "Not Available"}
                                      </td>
                                      <th className="text-capitalize text-start text-truncate">
                                        {data?.hostName || "Not Available"}
                                      </th>
                                      <th className="text-capitalize text-start text-truncate">
                                        {data?.typeOfUser || "Not Available"}
                                      </th>
                                      <td className="text-capitalize text-start text-truncate">
                                        {data?.subject || "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        {data?.isActive || "Not Available"}
                                      </td>
                                      <td className="text-capitalize text-start text-truncate">
                                        <div className="d-flex justify-coontent-between align-items-center">
                                          <Link
                                            className="dropdown-item"
                                            to={{
                                              pathname: "/view_promotions",
                                              search: `?id=${data?._id}`,
                                            }}
                                          >
                                            <i className="far fa-eye text-primary me-1"></i>
                                          </Link>
                                          <Link
                                            className="dropdown-item"
                                            to={{
                                              pathname: "/edit_promotions",
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
                              {notification?.map((data, index) => (
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
                                                data?.createdOn
                                                  ? data?.createdOn
                                                  : data?.modifiedOn
                                                  ? data?.modifiedOn
                                                  : "-"
                                              ) || "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <strong>Type Of User</strong>
                                            </div>
                                            <div className="col-md-7">
                                              {data?.typeOfUser ||
                                                "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                          <div className="row">
                                            <div className="col-md-5">
                                              <strong>Subject</strong>
                                            </div>
                                            <div className="col-md-7">
                                              {data?.subject || "Not Available"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
                                      <Link
                                        className="btn btn-sm btn-outline-primary"
                                        to={{
                                          pathname: "/view_promotions",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>
                                        View
                                      </Link>
                                      <Link
                                        className="btn btn-sm btn-outline-warning"
                                        to={{
                                          pathname: "/edit_promotions",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-edit text-warning me-1"></i>
                                        Edit
                                      </Link>
                                      <button
                                        className="btn btn-sm btn-ouline-danger"
                                        onClick={() => {
                                          openPopup(data?._id);
                                        }}
                                      >
                                        <i className="far fa-trash-alt text-danger me-1"></i>
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
              <h5 className="mb-4" style={{ fontSize: "14px" }}>
                Are you sure you want to Delete <br /> the selected Promotion ?
              </h5>
              <button
                type="button"
                className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold  mx-3"
                onClick={deleteProgramData}
                style={{ fontSize: "12px" }}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold  "
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
      </div>
    </>
  );
};
export default ListPromotions;
