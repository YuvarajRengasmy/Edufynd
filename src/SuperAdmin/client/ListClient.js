import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallClient, deleteClient,updateClient,activeClient, getAllClientCard,getFilterClient } from "../../api/client";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";
import Masterheader from "../../compoents/header";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import Downshift from "downshift";
export default function Masterproductlist() {
  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessContactNo:"", 
    clientStatus:"",
    businessMailID:"",
    
  };
  const [client, setClient] = useState([]);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); // To track selected checkboxes
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchClear, setSearchClear] = useState("");

  const search = useRef(null);

  const [pageSize, setPageSize] = useState(10); // Default page size
  const [details, setDetails] = useState();

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getClientList();
  }, [pageSize]);

  useEffect(() => {
    if (search.current) {
      search.current.focus();
    }
  }, [pagination.from, pagination.to]);

  useEffect(() => {
    if (searchValue) {
      search.current.value = searchValue.substring(1);
      handleSearch();
    }
  }, [searchValue]);

  
useEffect(() => {
  getallClientCount();
  filterUniversityList();
 
}, []);

const getallClientCount = ()=>{
  getAllClientCard().then((res)=>setDetails(res?.data.result))
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
        const clientList = res?.data?.result?.clientList;
        setClient(clientList);
        const result = clientList.length ? "clients" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };

  const getClientList = () => {

    const params = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterClient(params)
      .then((res) => {
        const value = res?.data?.result?.clientList;
        setClient(value);
        setPagination({
          ...pagination,
          count: res?.data?.result?.clientCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterUniversityList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {

      typeOfClient: inputs.typeOfClient,
      businessName: inputs.businessName,
      businessContactNo:inputs.businessContactNo, 
      clientStatus:inputs.clientStatus,
      businessMailID:inputs.businessMailID,
      limit: 10,
      page: pagination.from,
    };

    getFilterClient(data)
      .then((res) => {
        setClient(res?.data?.result?.clientList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.clientCount,
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
    getClientList();
   
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


  const handleCheckboxChanges = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = client.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      deleteSelectedNotifications();
    } else if (action === "Activate") {
      activateSelectedNotifications();
    }
  };

  const deleteSelectedNotifications = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteClient(id)))
        .then((responses) => {
          toast.success("Client deleted successfully!");
          setSelectedIds([]);
          getClientList ();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete Client.");
        });
    } else {
      toast.warning("No Client selected.");
    }
  };

  const activateSelectedNotifications = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => activeClient(id)))
        .then((responses) => {
          toast.success("Client activated successfully!");
          setSelectedIds([]);
          getClientList();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to activate Client.");
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
  const deleteClientData = () => {
    deleteClient(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getClientList();
      })
      .catch((err) => {
        console.log(err);
      });
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

    getallClient(client)
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
            text: "ClientId",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "BusinessName",
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
            text: "BusinessContactNo",
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
              text: element?.clientID ?? "-",
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
              text: element?.businessMailID ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.businessContactNo ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.clientStatus ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("clientList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallClient(client)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            clientID: res?.clientID ?? "-",
            businessName: res?.businessName ?? "-",
            businessMailID: res?.businessMailID ?? "-",
            businessContactNo: res?.businessContactNo ?? "-",
            status: res?.clientStatus ?? "-",
          });
        });
        let header1 = [
          "clientID",
          "businessName",
          "businessMailID",
          "businessContactNo",
          "clientStatus",
        ];
        let header2 = [
          "Client Id",
          "Business Name",
          "Business MailID",
          "Business ContactNo",
          "Status",
        ];
        ExportCsvService.downloadCsv(
          list,
          "clientList",
          "Client List",

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



  // filter
  const [showFilter, setShowFilter] = useState({
    typeOfClient: false,
    name: false,
    primaryNo: false,
    email: false,
    status: false,
  });
  const [inputValues, setInputValues] = useState({
    typeOfClient: '',
    name: '',
    primaryNo: '',
    email: '',
    status: '',
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle filter modal display
  const handleFilterClick = (column) => {
    setShowFilter((prev) => ({ ...prev, [column]: !prev[column] }));
  };
  

  // Function to handle modal close
  const handleClose = (column) => {
    setShowFilter((prev) => ({ ...prev, [column]: false }));
  };

  // Handle input value changes for each filter
  const handleInputValueChange = (filterKey, value) => {
    setInputValues((prev) => ({ ...prev, [filterKey]: value }));
  };

  // Fetch filtered data
  const fetchFilteredClients = async () => {
    setLoading(true);
    try {
      const response = await getFilterClient(inputValues);
      setClients(response.data); // Assuming the data is in response.data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredClients(); // Fetch data when filters change
  }, [inputValues]);

  // Function to filter options based on the search input
  const filteredOptions = (options, filterKey) => {
    return options.filter(option =>
      option.toLowerCase().includes(inputValues[filterKey].toLowerCase())
    );
  };
  


  const [statuses, setStatuses] = useState({});  // Store toggle status

  useEffect(() => {
    // Fetch all clients on component mount
    const fetchClients = async () => {
      try {
        const response = await getallClient();
        const clientsData = Array.isArray(response.data) ? response.data : [];
  
        
        // Initialize statuses based on the fetched client data
        const initialStatuses = clientsData.reduce((acc, clientData) => {
          return { ...acc, [clientData._id]: clientData.clientStatus === 'Active' };
        }, {});
  
        setClients(clientsData);  // Set clients data
        setStatuses(initialStatuses);  // Set initial statuses
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
  
    fetchClients();
  }, []);  // Empty dependency array to run once on mount
  
  // Toggle client status
  const handleCheckboxChange = async (clientId) => {
    const currentStatus = statuses[clientId];
    const updatedStatus = currentStatus ? 'Inactive' : 'Active';
  
    // Update the local state immediately for a quick UI response
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [clientId]: !prevStatuses[clientId],
    }));
  
    // Prepare the client data to send to the backend
    const updatedClient = {
      _id: clientId,
      clientStatus: updatedStatus,  // Update the status based on toggle
    };
  
    try {
      await updateClient(updatedClient);  // Send update to the backend
      console.log(`Client ${clientId} status updated to ${updatedStatus}`);
    } catch (error) {
      console.error('Error updating client status:', error);
  
      // Revert the status if there's an error during the update
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [clientId]: !prevStatuses[clientId],  // Revert the change
      }));
    }
  };

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header bg-light shadow-sm sticky-top mb-2 ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <ul className="d-flex align-items-center justify-content-end mb-0 list-unstyled">
                  {/* Search Form */}
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

                  {/* Filter Button */}
                  <li className="m-1">
                    <button
                      className="btn border-0 rounded-1"
                      style={{ backgroundColor: "#007BFF", color: "#fff" }} // Primary color
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                    >
                      <FaFilter />
                    </button>
                  </li>

                  {/* Offcanvas Filter */}
                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <h6 id="offcanvasRightLabel">Filter Client</h6>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      />
                    </div>
                    <div className="offcanvas-body">
                      <form>
                        <div className="row gy-3 mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-id-card"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="typeOfClient"
                              onChange={handleInputs}
                              placeholder="Search... TypeOfClient"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-user"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="businessName"
                              onChange={handleInputs}
                              placeholder="Search... Client Name"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="businessContactNo"
                              onChange={handleInputs}
                              placeholder="Search... Client Contact No"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-tag"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="clientStatus"
                              onChange={handleInputs}
                              placeholder="Search... Status"
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

                  {/* Import Button */}
                  <li className="m-1">
                    <Link onClick={openImportPopup}>
                      <button
                        className="btn text-white border-0 rounded-1"
                        style={{ backgroundColor: "#7627ef", fontSize: "12px" }} // Purple for import
                      >
                        <i className="fa fa-upload" aria-hidden="true"></i>
                      </button>
                    </Link>
                  </li>

                  {/* Add Client Button */}
                  <li className="m-1">
                    <Link to="/add_client">
                      <button
                        className="btn text-white border-0 fw-semibold rounded-1"
                        style={{ backgroundColor: "#231f20", fontSize: "12px" }} // Dark color for add client
                      >
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        &nbsp;&nbsp; Add Client
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="#" className="text-decoration-none">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#00796B" }} // Tropical Teal
                >
                  <div className="card-body">
                    <h6 className=""><i className="fas fa-user-check"></i> No of Clients</h6>
                    <p className="card-text">Total Client: {details?.totalClient || 0}</p>
                    {/* <p className="card-text">
                      <i className="fas fa-users"></i> Actively Engaged
                    </p> */}
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="#" className="text-decoration-none">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#C62828" }} // Crimson Red
                >
                  <div className="card-body">
                    <h6 className=""><i className="fas fa-user-times"></i> Active Clients</h6>
                    <p className="card-text">
                    <i className="fas fa-users"></i> Currently Active: {details?.activeClient || 0}    
                    </p>
                    <p className="card-text">
                      <i className="fas fa-user-slash"></i> Currently Inactive: {details?.inactiveClient || 0}
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="#" className="text-decoration-none">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#0288D1" }} // Steel Blue
                >
                  <div className="card-body">
                    <h6 className=""><i className="fas fa-file-invoice"></i> Invoices Raised</h6>
                    <p className="card-text">Total: 350</p>
                    <p className="card-text">
                      <i className="fas fa-file-invoice"></i> Pending Payments
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <Link to="#" className="text-decoration-none">
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#1A237E" }} // Navy Blue
                >
                  <div className="card-body">
                    <h6 className=""><i className="fas fa-money-check-alt"></i> Invoices Paid</h6>
                    <p className="card-text">Total: 290</p>
                    <p className="card-text">
                      <i className="fas fa-money-bill-wave"></i> Payments Received
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>


        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-xl-12">
              <div className="card border-0 rounded-1 shadow-sm">
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
  <div className="tab-content m">
    {/* List View */}
    <div className="tab-pane fade show active" id="tab-home" role="tabpanel" aria-labelledby="home-tab">
    
                  <div className="table-responsive">
                    <table
                      className="table table-hover text-center"
                      style={{ color: "#9265cc" }} // Existing color code
                      ref={tableRef}
                    >
               <thead className="table-light" style={{ fontSize: '12px' }}>
          <tr>
            <th className="text-start">
            <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === client.length
                                    }
                                  />
            </th>
            <th className="text-capitalize text-start">S No</th>
            <th className="text-capitalize text-start">Code</th>

            {/* Filterable Columns */}
            <th className="text-capitalize text-start">
              Type
              <i
                className="fa fa-filter ms-2"
                aria-hidden="true"
                onClick={() => handleFilterClick('typeOfClient')}
              />
              {showFilter.typeOfClient && (
                <div className="position-absolute bg-white border p-2">
                  <Downshift
                    inputValue={inputValues.typeOfClient}
                    onInputValueChange={(value) => handleInputValueChange('typeOfClient', value)}
                    itemToString={(item) => (item ? item : '')}
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      isOpen,
                      highlightedIndex,
                    }) => (
                      <div className="d-inline-block position-relative">
                        <input
                          {...getInputProps({
                            placeholder: 'Search Type',
                            className: 'form-control form-control-sm mb-2',
                          })}
                        />
                        <ul
                          {...getMenuProps()}
                          className="list-group"
                          style={{ listStyle: 'none', padding: 0 }}
                        >
                          {isOpen &&
                            filteredOptions([], 'typeOfClient').map((item, index) => (
                              <li
                                key={item}
                                {...getItemProps({
                                  index,
                                  item,
                                  className: `list-group-item ${
                                    highlightedIndex === index
                                      ? 'bg-primary text-white'
                                      : ''
                                  }`,
                                })}
                              >
                                {item}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Downshift>
                </div>
              )}
            </th>

            <th className="text-capitalize text-start">
              Name
              <i
                className="fa fa-filter ms-2"
                aria-hidden="true"
                onClick={() => handleFilterClick('name')}
              />
              {showFilter.name && (
                <div className="position-absolute bg-white border p-2">
                  <Downshift
                    inputValue={inputValues.name}
                    onInputValueChange={(value) => handleInputValueChange('name', value)}
                    itemToString={(item) => (item ? item : '')}
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      isOpen,
                      highlightedIndex,
                    }) => (
                      <div className="d-inline-block position-relative">
                        <input
                          {...getInputProps({
                            placeholder: 'Search Name',
                            className: 'form-control form-control-sm mb-2',
                          })}
                        />
                        <ul
                          {...getMenuProps()}
                          className="list-group"
                          style={{ listStyle: 'none', padding: 0 }}
                        >
                          {isOpen &&
                            filteredOptions([], 'name').map((item, index) => (
                              <li
                                key={item}
                                {...getItemProps({
                                  index,
                                  item,
                                  className: `list-group-item ${
                                    highlightedIndex === index
                                      ? 'bg-primary text-white'
                                      : ''
                                  }`,
                                })}
                              >
                                {item}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Downshift>
                </div>
              )}
            </th>

            <th className="text-capitalize text-start">
              Primary No
              <i
                className="fa fa-filter ms-2"
                aria-hidden="true"
                onClick={() => handleFilterClick('primaryNo')}
              />
              {showFilter.primaryNo && (
                <div className="position-absolute bg-white border p-2">
                  <Downshift
                    inputValue={inputValues.primaryNo}
                    onInputValueChange={(value) => handleInputValueChange('primaryNo', value)}
                    itemToString={(item) => (item ? item : '')}
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      isOpen,
                      highlightedIndex,
                    }) => (
                      <div className="d-inline-block position-relative">
                        <input
                          {...getInputProps({
                            placeholder: 'Search Primary No',
                            className: 'form-control form-control-sm mb-2',
                          })}
                        />
                        <ul
                          {...getMenuProps()}
                          className="list-group"
                          style={{ listStyle: 'none', padding: 0 }}
                        >
                          {isOpen &&
                            filteredOptions([], 'primaryNo').map((item, index) => (
                              <li
                                key={item}
                                {...getItemProps({
                                  index,
                                  item,
                                  className: `list-group-item ${
                                    highlightedIndex === index
                                      ? 'bg-primary text-white'
                                      : ''
                                  }`,
                                })}
                              >
                                {item}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Downshift>
                </div>
              )}
            </th>

            <th className="text-capitalize text-start">
              Email ID
              <i
                className="fa fa-filter ms-2"
                aria-hidden="true"
                onClick={() => handleFilterClick('email')}
              />
              {showFilter.email && (
                <div className="position-absolute bg-white border p-2">
                  <Downshift
                    inputValue={inputValues.email}
                    onInputValueChange={(value) => handleInputValueChange('email', value)}
                    itemToString={(item) => (item ? item : '')}
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      isOpen,
                      highlightedIndex,
                    }) => (
                      <div className="d-inline-block position-relative">
                        <input
                          {...getInputProps({
                            placeholder: 'Search Email ID',
                            className: 'form-control form-control-sm mb-2',
                          })}
                        />
                        <ul
                          {...getMenuProps()}
                          className="list-grop"
                          style={{ listStyle: 'none', padding: 0 }}
                        >
                          {isOpen &&
                            filteredOptions([], 'email').map((item, index) => (
                              <li
                                key={item}
                                {...getItemProps({
                                  index,
                                  item,
                                  className: `list-group-item ${
                                    highlightedIndex === index
                                      ? 'bg-primary text-white'
                                      : ''
                                  }`,
                                })}
                              >
                                {item}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Downshift>
                </div>
              )}
            </th>

            <th className="text-capitalize text-start">
              Status
              <i
                className="fa fa-filter ms-2"
                aria-hidden="true"
                onClick={() => handleFilterClick('status')}
              />
              {showFilter.status && (
                <div className="position-absolute bg-white border p-2">
                  <Downshift
                    inputValue={inputValues.status}
                    onInputValueChange={(value) => handleInputValueChange('status', value)}
                    itemToString={(item) => (item ? item : '')}
                  >
                    {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      isOpen,
                      highlightedIndex,
                    }) => (
                      <div className="d-inline-block position-relative">
                        <input
                          {...getInputProps({
                            placeholder: 'Search Status',
                            className: 'form-control form-control-sm mb-2',
                          })}
                        />
                        <ul
                          {...getMenuProps()}
                          className="list-group"
                          style={{ listStyle: 'none', padding: 0 }}
                        >
                          {isOpen &&
                            filteredOptions(['Active', 'Inactive'], 'status').map((item, index) => (
                              <li
                                key={item}
                                {...getItemProps({
                                  index,
                                  item,
                                  className: `list-group-item ${
                                    highlightedIndex === index
                                      ? 'bg-primary text-white'
                                      : ''
                                  }`,
                                })}
                              >
                                {item}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </Downshift>
                </div>
              )}
            </th>
            <th>Action</th>
          </tr>
        </thead>



          

                      <tbody style={{ fontSize: "11px" }}>
                        {client?.map((data, index) => (
                          <tr key={index} className="align-middle">
                            <td className=" text-start">
                            <input
                                      type="checkbox"
                                      checked={selectedIds.includes(data._id)}
                                      onChange={() => handleCheckboxChanges(data._id)}
                                    />
                              </td>
                            <td className="text-capitalize text-start">
                              {pagination.from + index + 1}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.clientID || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.typeOfClient || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start">
                              <Link
                                className="text-decoration-none text-dark"
                                to={{
                                  pathname: "/view_client",
                                  search: `?id=${data?._id}`,
                                }}
                              >
                                {data?.businessName || "Not Available"}
                              </Link>
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.businessContactNo || "Not Available"}
                            </td>
                            <td className="text-start">
                              {data?.businessMailID || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start ">
    
            <span className="form-check form-switch d-inline ms-2" >
              {data?.clientStatus === "Active" ? (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={data?.clientStatus}
                  id={`flexSwitchCheckDefault${index}`}
                  checked={statuses[data._id] || false}
                  onChange={() => handleCheckboxChange(data._id, statuses[data._id])}
                />
              ) : (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={data?.clientStatus}
                  id={`flexSwitchCheckDefault${index}`}
                  checked={statuses[data._id] || false}
                  onChange={() => handleCheckboxChange(data._id, statuses[data._id])}
                />
              )}
             <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>
                {data?.clientStatus || "Not Available"}
              </label>

            </span>
                            </td>
                         
                            <td className="text-capitalize text-start">
                              <div className="d-flex justify-content-between align-items-start">
                                <Link
                                  className="text-decoration-none "
                                  to={{
                                    pathname: "/view_client",
                                    search: `?id=${data?._id}`,
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="View"
                                >
                                  <i className="far fa-eye text-primary "></i>
                                </Link>
                                <Link
                                  className="text-decoration-none "
                                  to={{
                                    pathname: "/edit_client",
                                    search: `?id=${data?._id}`,
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i className="far fa-edit text-warning "></i>
                                </Link>
                                <button
                                  className="text-decoration-none border-0 btn p-0 m-0 bg-white "
                                  onClick={() => {
                                    openPopup(data?._id);
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                >
                                  <i className="far fa-trash-alt text-danger "></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                
    </div>
  
    <div className="tab-pane fade" id="tab-profile" role="tabpanel" aria-labelledby="profile-tab">
    {client?.map((data, index) => (
      <div className="row" key={index}>
        <div className="col-4">
        <div className="card shadow-sm" style={{fontSize:'10px'}}>
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{data?.businessName || "Not Available"}</h5>
       
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <p className="text-muted">S.No:</p>
            <p className="card-text"> {pagination.from + index + 1}</p>
            <p className="text-muted">Client ID:</p>
            <p className="card-text">{data?.clientID || "Not Available"}</p>
            <p className="text-muted">Type of Client:</p>
            <p className="card-text">{data?.typeOfClient || "Not Available"}</p>
            <p className="text-muted">Status:</p>
            <p className="card-text">
              <span className="badge bg-success"> <span className="form-check form-switch d-inline ms-2" >
              {data?.clientStatus === "Active" ? (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={data?.clientStatus}
                  id={`flexSwitchCheckDefault${index}`}
                  checked={statuses[data._id] || false}
                  onChange={() => handleCheckboxChange(data._id, statuses[data._id])}
                />
              ) : (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={data?.clientStatus}
                  id={`flexSwitchCheckDefault${index}`}
                  checked={statuses[data._id] || false}
                  onChange={() => handleCheckboxChange(data._id, statuses[data._id])}
                />
              )}
             <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>
                {data?.clientStatus || "Not Available"}
              </label>

            </span></span>
            </p>
          </div>
          <div className="col-md-6">
            <p className="text-muted">Name:</p>
            <p className="card-text">{data?.businessName || "Not Available"}</p>
            <p className="text-muted">Primary Number:</p>
            <p className="card-text"> {data?.businessContactNo || "Not Available"}</p>
            <p className="text-muted">Email ID:</p>
            <p className="card-text"> {data?.businessMailID || "Not Available"}</p>
          </div>
        </div>
      </div>
      <div className="card-footer bg-light d-flex justify-content-between">
      <Link
                                  className="btn btn-outline-primary btn-sm"
                                  to={{
                                    pathname: "/view_client",
                                    search: `?id=${data?._id}`,
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="View"
                                >
                                  <i className="far fa-eye text-primary "></i>View
                                </Link>
        
       
        <Link
                                  className="btn btn-outline-warning btn-sm"
                                  to={{
                                    pathname: "/edit_client",
                                    search: `?id=${data?._id}`,
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i className="far fa-edit text-warning "></i>Edit
                                </Link>
        <button className="btn btn-outline-danger btn-sm" onClick={() => {
                                    openPopup(data?._id);
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="Delete">
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
        </div>

      </div>
    ))}
    
   
    </div>
  </div>
  </div>
  <div className='card-footer bg-white'>
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
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center p-4">
            <h6 className="mb-4 text-capitalize">
              Are you sure you want to delete the selected client?
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
            <div className="form-group mb-3">
              <input
                type="file"
                name="file"
                className="form-control rounded-1"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link
                to="/ListClient"
                className="btn btn-cancel border-0 rounded-1 text-uppercase  fw-semibold text-white"
                style={{
                  backgroundColor: "#231f20",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-save border-0 rounded-1 text-uppercase  fw-semibold text-white mx-2"
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
