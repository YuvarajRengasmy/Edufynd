import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallIncome, deleteIncome,updateIncome,activeIncome, getAllIncomeCard,getFilterIncome, deactivateIncome } from "../../../api//invoice/income";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  radioClasses,
} from "@mui/material";
import { getSuperAdminForSearch } from "../../../api/superAdmin";
import Mastersidebar from "../../../compoents/sidebar";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { toast } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import Downshift from "downshift";
import { Chart, registerables } from 'chart.js';



export const ListIncome = () => {

  const initialState = {
    incomeDate: "",
    typeOfIncome: "",
    incomeName: "",
    value: "",
    branch: "",
    acceptType: "",
    attachment: "",
    
  };
  const [income, setIncome] = useState([]);
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
  const [details, setDetails] = useState(null);
  const [loadin, setLoadin] = useState(true); // Add a loading state

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });


  useEffect(() => {
    getIncomeList();
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
 
  filterUniversityList();

}, []);




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
        const IncomeList = res?.data?.result?.incomesListed;
        setIncome(IncomeList);
        const result = IncomeList.length ? "Incomes" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };

  const getIncomeList = () => {

    const params = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterIncome(params)
      .then((res) => {
        const value = res?.data?.result?.statusList;
        setIncome(value);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount,
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

      incomeDate:inputs?.incomeDate,
    typeOfIncome:inputs?.typeOfIncome,
    IncomeName: "",
    value: "",
    branch: "",
    acceptType: "",
    attachment: "",
      limit: 10,
      page: pagination.from,
    };

    getFilterIncome(data)
      .then((res) => {
        setIncome(res?.data?.result?.statusList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount,
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
    getIncomeList();
   
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
    setSelectedIds((prevSelected) =>prevSelected.includes(id) ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = income.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      deleteSelectedUsers();
    } else if (action === "Activate") {
      activateSelectedUsers();
      getIncomeList();
    } else if (action === "Deactivate") {
      deactivateSelectedUsers();
      getIncomeList(); 
    }
  };

 
  const deleteSelectedUsers = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteIncome(id)))
        .then((responses) => {
          toast.success("Income deleted successfully!");
          setSelectedIds([]);
          getIncomeList ();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete Income.");
        });
    } else {
      toast.warning("No Income selected.");
    }
  };


  const activateSelectedUsers = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to activate the Incomes
      activeIncome({ IncomeIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("Income activated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful activation
          getIncomeList(); // Refresh the Income list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Already Incomes were Activated");
        });
    } else {
      toast.warning("No selected Income.");
    }
  };
  
  const deactivateSelectedUsers = () => {
    if (selectedIds.length > 0) {
      // Send the selected IDs to the backend to deactivate the Incomes
      deactivateIncome({ IncomeIds: selectedIds })
        .then((response) => {
          console.log("Response:", response);
          toast.success("Income deactivated successfully!");
          setSelectedIds([]); // Clear selected IDs after successful deactivation
          getIncomeList(); // Refresh the Income list
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to deactivate Income.");
        });
    } else {
      toast.warning("No selected Income.");
    }
  };
  
  
 
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteIncomeData = () => {
    deleteIncome(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getIncomeList();
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

    getallIncome(income)
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
            text: "IncomeId",
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
              text: element?.incomeID ?? "-",
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
              text: element?.isActive ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("IncomeList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallIncome(income)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            IncomeID: res?.IncomeID ?? "-",
            businessName: res?.businessName ?? "-",
            businessMailID: res?.businessMailID ?? "-",
            businessContactNo: res?.businessContactNo ?? "-",
            isActive: res?.isActive ?? "-",
          });
        });
        let header1 = [
          "IncomeID",
          "businessName",
          "businessMailID",
          "businessContactNo",
          "isActive",
        ];
        let header2 = [
          "income Id",
          "Business Name",
          "Business MailID",
          "Business ContactNo",
          "Status",
        ];
        ExportCsvService.downloadCsv(
          list,
          "IncomeList",
          "Income List",

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




  const chartRefer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRefer.current.getContext('2d');

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
            details?.accommodation || 0,
            details?.flight || 0,
            details?.loan || 0,
            details?.forex || 0,
            details?.education || 0,
            details?.finance || 0,

          ], // Use default 0 if no data available
          backgroundColor: [
            '#fdc21d', // Green for "Active" (chat bubble color)
            '#207cbb',
            "#097969",
            "#00d4ff",
            "#ba1b1b",
            "#94bbe9" // Blue for "Inactive" (chat bubble color)
          ],
          borderColor: [
           '#fdc21d', // Green for "Active" (chat bubble color)
            '#207cbb',
            "#097969",
            "#00d4ff",
            "#ba1b1b",
            "#94bbe9" // Blue for "Inactive" (chat bubble color)
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
  // filter


 
  const chartRef = useRef(null);
  const chartInstanc = useRef(null);
useEffect(() => {
  const ctx = chartRef.current.getContext('2d');

  // Destroy previous chart if it exists
  if (chartInstanc.current) {
    chartInstanc.current.destroy();
  }

  // Create the new chart
  chartInstanc.current = new Chart(ctx, {
    type: 'pie', // Change type to 'pie'
    data: {
      datasets: [{
        data: [
          details?.activeIncome || 0,
          details?.inactiveIncome || 0,
         
        ], // Use default 0 if no data available
        backgroundColor: [
          '#fdc21d', // Yellow
          '#207cbb', // Blue
         // Light Blue
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
          position: 'top', // Position the legend at the top
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw;
            }
          }
        }
      }
    },
  });

  // Clean up on component unmount
  return () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  };
}, [details]);

  const [showFilter, setShowFilter] = useState({
    typeOfIncome: false,
    name: false,
    primaryNo: false,
    email: false,
    status: false,
  });
  const [inputValues, setInputValues] = useState({
    typeOfIncome: '',
    name: '',
    primaryNo: '',
    email: '',
    status: '',
  });
  const [Incomes, setIncomes] = useState([]);
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
  const fetchFilteredIncomes = async () => {
    setLoading(true);
    try {
      const response = await getFilterIncome(inputValues);
      setIncomes(response.data); // Assuming the data is in response.data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredIncomes(); // Fetch data when filters change
  }, [inputValues]);

  // Function to filter options based on the search input
  const filteredOptions = (options, filterKey) => {
    return options.filter(option =>
      option.toLowerCase().includes(inputValues[filterKey].toLowerCase())
    );
  };
  


  const [statuses, setStatuses] = useState({});  // Store toggle status

  useEffect(() => {
    // Fetch all Incomes on component mount
    const fetchIncomes = async () => {
      try {
        const response = await getallIncome();
        const IncomesData = Array.isArray(response.data) ? response.data : [];
  
        
        // Initialize statuses based on the fetched Income data
        const initialStatuses = IncomesData.reduce((acc, IncomeData) => {
          return { ...acc, [IncomeData._id]: IncomeData.IncomeStatus === 'Active' };
        }, {});
  
        setIncomes(IncomesData);  // Set Incomes data
        setStatuses(initialStatuses);  // Set initial statuses
      } catch (error) {
        console.error('Error fetching Incomes:', error);
      }
    };
  
    fetchIncomes();
  }, []);  // Empty dependency array to run once on mount
  
  // Toggle Income status
  const handleCheckboxChange = async (IncomeId) => {
    const currentStatus = statuses[IncomeId];
    const updatedStatus = currentStatus ? 'Inactive' : 'Active';
  
    // Update the local state immediately for a quick UI response
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [IncomeId]: !prevStatuses[IncomeId],
    }));
  
    // Prepare the Income data to send to the backend
    const updatedIncome = {
      _id: IncomeId,
      IncomeStatus: updatedStatus,  // Update the status based on toggle
    };
  
    try {
      await updateIncome(updatedIncome);  // Send update to the backend
      console.log(`Income ${IncomeId} status updated to ${updatedStatus}`);
    } catch (error) {
      console.error('Error updating Income status:', error);
  
      // Revert the status if there's an error during the update
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [IncomeId]: !prevStatuses[IncomeId],  // Revert the change
      }));
    }
  };




  return (
    <>
    <div>
     
        <Mastersidebar />
      


      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header  bg-light shadow-sm sticky-top">
        <div className="container-fluid">
          
            <div className="row ">
              <div className="col-xl-12">
             
                <ol className="breadcrumb d-flex flex-row justify-content-end align-items-center w-100">
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


                  <div
                    className="offcanvas offcanvas-end"
                    tabIndex={-1}
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <h6 id="offcanvasRightLabel">Filter income</h6>
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
                              name="typeOfincome"
                              onChange={handleInputs}
                              placeholder="Search... TypeOfincome"
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
                              placeholder="Search... income Name"
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
                              placeholder="Search... income Contact No"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-tag"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="incomeStatus"
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
                 
                  <li class="m-1">
                    <Link class="btn btn-pix-primary" to="/add_income">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                         Add Income
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
        {/* Card 1: Total Income */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#4CAF50" }} // Green
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-dollar-sign" style={{ color: '#ffffff' }}></i> Total Income
                </h6>
                <p className="card-text">Total: $75,000</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 2: Monthly Income */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#2196F3" }} // Blue
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-calendar-month" style={{ color: '#ffffff' }}></i> Monthly Income
                </h6>
                <p className="card-text">Total: $6,500</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 3: Income from Investments */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#FF9800" }} // Orange
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-chart-line" style={{ color: '#ffffff' }}></i> Income from Investments
                </h6>
                <p className="card-text">Total: $15,000</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 4: Other Income */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#9C27B0" }} // Purple
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-briefcase" style={{ color: '#ffffff' }}></i> Other Income
                </h6>
                <p className="card-text">Total: $5,000</p>
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
                    {/* <div className="d-flex  mb-0">
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
                    </div> */}

<div className="d-flex mb-0">
  <p className="me-auto ">
    Change
    <select
      className="form-select form-select-sm rounded-1 d-inline mx-2"
      aria-label="Default select example1"
      style={{ width: "auto", display: "inline-block", fontSize: "12px" }}
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
            {/* <th className="text-start">
            <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                      selectedIds.length === income.length
                                    }
                                  />
            </th> */}


            <th className="text-start">
  <input
    type="checkbox"
    onChange={handleSelectAll}
    checked={selectedIds.length === income.length}
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
                            filteredOptions([], 'typeOfincome').map((item, index) => (
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
                        {income?.map((data, index) => (
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
                              {data?.incomeID || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.typeOfincome || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start">
                              <Link
                                className="text-decoration-none text-dark"
                                to={{
                                  pathname: "/view_income",
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
                            {data?.isActive || "Not Available"}
            
                            </td>
                         
                            <td className="text-capitalize text-start">
                              <div className="d-flex justify-content-between align-items-start">
                                <Link
                                  className="text-decoration-none "
                                  to={{
                                    pathname: "/view_income",
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
                                    pathname: "/edit_income",
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
    {income?.map((data, index) => (
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
            <p className="text-muted">income ID:</p>
            <p className="card-text">{data?.incomeID || "Not Available"}</p>
            <p className="text-muted">Type of income:</p>
            <p className="card-text">{data?.typeOfincome || "Not Available"}</p>
            <p className="text-muted">Status:</p>
            <p className="card-text">
              <span className="badge bg-success"> <span className="form-check form-switch d-inline ms-2" >
              {data?.incomeStatus === "Active" ? (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={data?.incomeStatus}
                  id={`flexSwitchCheckDefault${index}`}
                  checked={statuses[data._id] || false}
                  onChange={() => handleCheckboxChange(data._id, statuses[data._id])}
                />
              ) : (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={data?.incomeStatus}
                  id={`flexSwitchCheckDefault${index}`}
                  checked={statuses[data._id] || false}
                  onChange={() => handleCheckboxChange(data._id, statuses[data._id])}
                />
              )}
             <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${index}`}>
             {data?.isActive || "Not Available"}
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
                                    pathname: "/view_income",
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
                                    pathname: "/edit_income",
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
      <Dialog >
        <DialogContent>
          <div className="text-center p-4">
            <h5 className="mb-4" style={{fontSize:'14px'}}>
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              
              style={{ fontSize: '12px' }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold text-uppercase "
              
              style={{ fontSize: '12px' }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog  fullWidth maxWidth="sm">
        <DialogTitle>
          Filter University
          <IconButton className="float-right" >
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>

        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Upload University List
          <IconButton className="float-right" >
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
                 
                  style={{fontSize:'14px'}}
                />
              </div>

            </div>
            <div>
              <Link
                to="/ListUniversity"
                className="btn btn-cancel border-0 rounded-pill text-uppercase px-3 py-1 fw-semibold text-white float-right bg"
                style={{ backgroundColor: "#0f2239", color: '#fff', fontSize: '12px' }}

              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0 rounded-pill text-uppercase fw-semibold px-3 py-1 text-white float-right mx-2"
                style={{ backgroundColor: "#fe5722", color: '#fff', fontSize: '12px' }}
              >
                Apply
              </button>

            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  </>
  )
}


export default ListIncome
