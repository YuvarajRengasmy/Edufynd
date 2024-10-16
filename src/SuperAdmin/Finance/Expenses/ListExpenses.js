import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallExpense, deleteExpense,updateExpense,activeExpense, getAllExpenseCard,getFilterExpense, deactivateExpense } from "../../../api//invoice/expenses";
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



export const ListExpense = () => {

  const initialState = {
    expenseDate: "",
    typeOfUser: "",
    paidName: "",
    value: "",
    branch: "",
    acceptType: "",
    attachment: "",
    
  };
  const [Expense, setExpense] = useState([]);
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
    getExpenseList();
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
        const ExpenseList = res?.data?.result?.expensesListed;
        setExpense(ExpenseList);
        const result = ExpenseList.length ? "Expenses" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };

  const getExpenseList = () => {

    const params = {
      limit: pageSize, // Use dynamic page size here
      page: pagination.from,
    };
    getFilterExpense(params)
      .then((res) => {
        console.log("uvi", res);
        const value = res?.data?.result?.statusList;
        setExpense(value);
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

      expenseDate:inputs?.expenseDate,
    typeOfUser:inputs?.typeOfUser,
   paidName:inputs?.paidName,
    value: inputs?.value,
    branch: inputs?.branch,
    acceptType:inputs?.acceptType,
    attachment:inputs?.attachment,
      limit: 10,
      page: pagination.from,
    };

    getFilterExpense(data)
      .then((res) => {
        setExpense(res?.data?.result?.statusList);
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
    getExpenseList();
   
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
      const allIds = Expense.map((data) => data._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleActionChange = (event) => {
    const action = event.target.value;
    if (action === "Delete") {
      deleteSelectedUsers();
    } 
  };

 
  const deleteSelectedUsers = () => {
    if (selectedIds.length > 0) {
      Promise.all(selectedIds.map((id) => deleteExpense(id)))
        .then((responses) => {
          toast.success("Expense deleted successfully!");
          setSelectedIds([]);
          getExpenseList ();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete Expense.");
        });
    } else {
      toast.warning("No Expense selected.");
    }
  };


  
  
 
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteExpenseData = () => {
    deleteExpense(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getExpenseList();
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

    getallExpense(Expense)
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
            text: "expenseId",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "expenseDate",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "typeOfUser",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "paidName",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Value",
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
              text: element?.expenseId ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.expenseDate ?? "-",
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
              text: element?.paidName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.value ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("ExpenseList", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallExpense(Expense)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            expenseId: res?.expenseId ?? "-",
            expenseDate: res?.expenseDate ?? "-",
            typeOfUser: res?.typeOfUser ?? "-",
            paidName: res?.paidName ?? "-",
            value: res?.value ?? "-",
          });
        });
        let header1 = [
          "expenseId",
          "expenseDate",
          "typeOfUser",
          "paidName",
          "value",
        ];
        let header2 = [
          "Expense Id",
          "Expense Date",
          "Type Of Client",
          "Client Name",
          "Value",
        ];
        ExportCsvService.downloadCsv(
          list,
          "ExpenseList",
          "Expense List",

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
    typeOfUser: false,
    name: false,
    primaryNo: false,
    email: false,
    status: false,
  });
  const [inputValues, setInputValues] = useState({
    typeOfUser: '',
    name: '',
    primaryNo: '',
    email: '',
    status: '',
  });
  const [Expenses, setExpenses] = useState([]);
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
  const fetchFilteredExpenses = async () => {
    setLoading(true);
    try {
      const response = await getFilterExpense(inputValues);
      setExpenses(response.data); // Assuming the data is in response.data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredExpenses(); // Fetch data when filters change
  }, [inputValues]);

  // Function to filter options based on the search input
  const filteredOptions = (options, filterKey) => {
    return options.filter(option =>
      option.toLowerCase().includes(inputValues[filterKey].toLowerCase())
    );
  };
  


  const [statuses, setStatuses] = useState({});  // Store toggle status

  useEffect(() => {
    // Fetch all Expenses on component mount
    const fetchExpenses = async () => {
      try {
        const response = await getallExpense();
        const ExpensesData = Array.isArray(response.data) ? response.data : [];
  
        
        // Initialize statuses based on the fetched Expense data
        const initialStatuses = ExpensesData.reduce((acc, ExpenseData) => {
          return { ...acc, [ExpenseData._id]: ExpenseData.ExpenseStatus === 'Active' };
        }, {});
  
        setExpenses(ExpensesData);  // Set Expenses data
        setStatuses(initialStatuses);  // Set initial statuses
      } catch (error) {
        console.error('Error fetching Expenses:', error);
      }
    };
  
    fetchExpenses();
  }, []);  // Empty dependency array to run once on mount
  
  // Toggle Expense status
  const handleCheckboxChange = async (expenseId) => {
    const currentStatus = statuses[expenseId];
    const updatedStatus = currentStatus ? 'Inactive' : 'Active';
  
    // Update the local state immediately for a quick UI response
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [expenseId]: !prevStatuses[expenseId],
    }));
  
    // Prepare the Expense data to send to the backend
    const updatedExpense = {
      _id: expenseId,
      ExpenseStatus: updatedStatus,  // Update the status based on toggle
    };
  
    try {
      await updateExpense(updatedExpense);  // Send update to the backend
      console.log(`Expense ${expenseId} status updated to ${updatedStatus}`);
    } catch (error) {
      console.error('Error updating Expense status:', error);
  
      // Revert the status if there's an error during the update
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [expenseId]: !prevStatuses[expenseId],  // Revert the change
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
                      <h6 id="offcanvasRightLabel">Filter Expense</h6>
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
                              name="typeOfUser"
                              onChange={handleInputs}
                              placeholder="Search... typeOfUser"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-user"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="paidName"
                              onChange={handleInputs}
                              placeholder="Search... Expense Name"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="branch"
                              onChange={handleInputs}
                              placeholder="Search... Expense Contact No"
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-tag"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="value"
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
                    <Link class="btn btn-pix-primary" to="/add_expenses">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                         Add Expense
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
        {/* Card 1: Total Expense */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#4CAF50" }} // Green
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-dollar-sign" style={{ color: '#ffffff' }}></i> Total Expense
                </h6>
                <p className="card-text">Total: $75,000</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 2: Monthly Expense */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#2196F3" }} // Blue
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-calendar-month" style={{ color: '#ffffff' }}></i> Monthly Expense
                </h6>
                <p className="card-text">Total: $6,500</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 3: Expense from Investments */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#FF9800" }} // Orange
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-chart-line" style={{ color: '#ffffff' }}></i> Expense from Investments
                </h6>
                <p className="card-text">Total: $15,000</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card 4: Other Expense */}
        <div className="col-md-3 col-sm-6 mb-3">
          <Link to="#" className="text-decoration-none">
            <div
              className="card rounded-3 border-0 text-white shadow-sm"
              style={{ backgroundColor: "#9C27B0" }} // Purple
            >
              <div className="card-body">
                <h6 className="card-title">
                  <i className="fas fa-briefcase" style={{ color: '#ffffff' }}></i> Other Expense
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
    checked={selectedIds.length === Expense.length}
  />
</th>



            <th className="text-capitalize text-start">S No</th>
            <th className="text-capitalize text-start">expenseDate</th>

            {/* Filterable Columns */}
            <th className="text-capitalize text-start">
              Expense ID
            
            </th>

            <th className="text-capitalize text-start">
            Type Of Client
             
            </th>

            <th className="text-capitalize text-start">
            Client Name
             
            </th>

            <th className="text-capitalize text-start">
            Branch
            
            </th>
            <th className="text-capitalize text-start"> AcceptType</th>
           
            
            <th>Action</th>
          </tr>
        </thead>



          

                      <tbody style={{ fontSize: "11px" }}>
                        {Expense?.map((data, index) => (
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
                              {data?.expenseDate || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.expenseId || "Not Available"}
                            </td>
                            <td className="text-capitalize text-start">
                              <Link
                                className="text-decoration-none text-dark"
                                to={{
                                  pathname: "/view_Expense",
                                  search: `?id=${data?._id}`,
                                }}
                              >
                                {data?.typeOfUser || "Not Available"}
                              </Link>
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.paidName || "Not Available"}
                            </td>
                            <td className="text-start">
                              {data?.branch || "Not Available"}
                            </td>
                            <td className="text-start">
                              {data?.acceptType || "Not Available"}
                            </td>
                           
                         
                            <td className="text-capitalize text-start">
                              <div className="d-flex justify-content-between align-items-start">
                                <Link
                                  className="text-decoration-none "
                                  to={{
                                    pathname: "/view_Expense",
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
                                    pathname: "/edit_Expense",
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
    {Expense?.map((data, index) => (
      <div className="row" key={index}>
        <div className="col-4">
        <div className="card shadow-sm" style={{fontSize:'10px'}}>
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{data?.paidName || "Not Available"}</h5>
       
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <p className="text-muted">S.No:</p>
            <p className="card-text"> {pagination.from + index + 1}</p>
            <p className="text-muted">Expense ID:</p>
            <p className="card-text">{data?.expenseId || "Not Available"}</p>
            <p className="text-muted">Type of Expense:</p>
            <p className="card-text">{data?.typeOfUser || "Not Available"}</p>
           
            
          </div>
          <div className="col-md-6">
            <p className="text-muted">ExpenseData</p>
            <p className="card-text">{data?.expenseDate || "Not Available"}</p>
          
            <p className="text-muted">paidName:</p>
            <p className="card-text"> {data?.paidName || "Not Available"}</p>
            <p className="text-muted">Branch</p>
            <p className="card-text">{data?.branch || "Not Available"}</p>
          </div>
        </div>
      </div>
      <div className="card-footer bg-light d-flex justify-content-between">
      <Link
                                  className="btn btn-outline-primary btn-sm"
                                  to={{
                                    pathname: "/view_Expense",
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
                                    pathname: "/edit_Expense",
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
            
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">25</option>
            <option value="100">100</option>
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
    
   
    </div>
  </>
  )
}


export default ListExpense;
