import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import { getallClient, deleteClient } from "../../api/client";
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

export default function Masterproductlist() {
  const initialState = {
    typeOfClient: "",
    businessName: "",
    businessMailID: "",
    businessContactNo: "",
    website: "",
    addressLine1: "", // Street Address, City, State, Postal Code, Country
    addressLine2: "",
    addressLine3: "",
    name: "",
    contactNo: "",
    emailID: "",
    gstn: "",
    status: "",
  };
  const [client, setClient] = useState([]);
  const location = useLocation();
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [searchClear, setSearchClear] = useState("");
  const pageSize = 10;
  const search = useRef(null);

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getClientList();
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
    getallClient()
      .then((res) => {
        const value = res?.data?.result;
        setClient(value);
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

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const handleInputs = (event) => {
    setClient({ ...client, [event.target.name]: event.target.value });
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
              text: element?.status ?? "-",
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
            status: res?.status ?? "-",
          });
        });
        let header1 = [
          "clientID",
          "businessName",
          "businessMailID",
          "businessContactNo",
          "status",
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

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header bg-light shadow-sm sticky-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <ul className="d-flex align-items-center justify-content-end  mb-0 list-unstyled">
                  {/* Search Form */}
                  <li className="flex-grow-1">
                    <form onSubmit={handleSearch}>
                      <div
                        className="input-group"
                        style={{ maxWidth: "600px" }}
                      >
                        <input
                          className="form-control border-1 border-dark rounded-4"
                          placeholder="Search....."
                          type="search"
                          aria-describedby="button-addon3"
                          ref={search}
                          onChange={handleInputsearch}
                          style={{ fontSize: "12px" }}
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

                  {/* Filter Button */}
                  <li className="m-1">
                    <button
                      className="btn border-0 rounded-1"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#007BFF", // Primary color
                        color: "#fff",
                      }}
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
                        <div className=" row gy-3 mb-3">
                          <div className="input-group">
                            <span className="input-group-text ">
                              <i className="fas fa-user"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="businessName"
                              onChange={handleInputs}
                              placeholder="Search...Client Name"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                          <div className="input-group ">
                            <span className="input-group-text">
                              <i className="fas fa-phone"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="businessContactNo"
                              onChange={handleInputs}
                              placeholder="Search...Client Contact No"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fas fa-tag"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="status"
                              onChange={handleInputs}
                              placeholder="Search...Status"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                          <div className="input-group ">
                            <span className="input-group-text">
                              <i className="fas fa-id-card"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              name="clientID"
                              onChange={handleInputs}
                              placeholder="Search...Client Id"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-end gap-3">
                          <button
                            className="btn text-uppercase rounded-1 border-0 fw-semibold"
                            style={{
                              backgroundColor: "#0f2239", // Dark color for reset
                              color: "#fff",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            data-bs-dismiss="offcanvas"
                            type="submit"
                            className="btn  text-uppercase rounded-1 border-0 fw-semibold"
                            style={{
                              backgroundColor: "#fe5722", // Primary color for apply
                              color: "#fff",
                            }}
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
                        className="btn text-white btn-ouline-danger border-0 rounded-1"
                        style={{
                          backgroundColor: "#E12929", // Red for PDF
                        }}
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
                        style={{
                          backgroundColor: "#22A033", // Green for CSV
                          fontSize: "12px",
                        }}
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
                        style={{
                          backgroundColor: "#7627ef", // Purple for import
                          fontSize: "12px",
                        }}
                      >
                        <i className="fa fa-upload" aria-hidden="true"></i>
                      </button>
                    </Link>
                  </li>

                  {/* Add Client Button */}
                  <li className="m-1">
                    <Link to="/AddClient">
                      <button
                        className="btn text-white border-0 fw-semibold rounded-1"
                        style={{
                          backgroundColor: "#231f20", // Dark color for add client
                          fontSize: "12px",
                        }}
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

        <div className="container mt-3  ">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-3">
              <Link
                to="#"
                className="text-decoration-none  link-opacity-50-hover"
              >
                <div
                  className="card rounded-1 border-0 text-white shadow-sm"
                  style={{ backgroundColor: "#00796B" }} // Tropical Teal
                >
                  <div className="card-body">
                    <h6 className=""><i class="fas fa-user-check "></i>&nbsp;&nbsp;Active Clients</h6>
                    <p className="card-text">Total: 120</p>
                    <p className="card-text">
                      <i className="fas fa-users"></i> Actively Engaged
                    </p>
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
                    <h6 className=""><i class="fas fa-user-times "></i>&nbsp;&nbsp;Inactive Clients</h6>
                    <p className="card-text">Total: 45</p>
                    <p className="card-text">
                      <i className="fas fa-user-slash"></i> Currently Inactive
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
                    <h6 className=""><i class="fas fa-file-invoice "></i>&nbsp;&nbsp;Invoices Raised</h6>
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
                    <h6 className=""><i class="fas fa-money-check-alt "></i>&nbsp;&nbsp;Invoices Paid</h6>
                    <p className="card-text">Total: 290</p>
                    <p className="card-text">
                      <i className="fas fa-money-bill-wave"></i> Payments
                      Received
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card border-0 rounded-1 shadow-sm">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      className="table table-hover text-center"
                      style={{ color: "#9265cc" }} // Existing color code
                      ref={tableRef}
                    >
                      <thead
                        className="table-light"
                        style={{ fontSize: "12px" }}
                      >
                        <tr>
                          <th className="text-capitalize text-start">S No</th>
                          <th className="text-capitalize text-start">Code</th>
                          <th className="text-capitalize text-start">Type</th>
                          <th className="text-capitalize text-start">Name</th>
                          <th className="text-capitalize text-start">
                            Primary No
                          </th>
                          <th className="text-capitalize text-start">
                            Email ID
                          </th>
                          <th className="text-capitalize text-start">Status</th>
                          <th className="text-capitalize text-start">Action</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "11px" }}>
                        {client?.map((data, index) => (
                          <tr key={index}>
                            <td className="text-capitalize text-start">
                              {pagination.from + index + 1}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.clientID}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.typeOfClient}
                            </td>
                            <td className="text-capitalize text-start">
                              <Link
                                className="text-decoration-none text-dark"
                                to={{
                                  pathname: "/ViewClient",
                                  search: `?id=${data?._id}`,
                                }}
                              >
                                {data?.businessName}
                              </Link>
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.businessContactNo}
                            </td>
                            <td className="text-start">
                              {data?.businessMailID}
                            </td>
                            <td className="text-capitalize text-start">
                              {data?.status}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <Link
                                  className="text-decoration-none me-2"
                                  to={{
                                    pathname: "/ViewClient",
                                    search: `?id=${data?._id}`,
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="View"
                                >
                                  <i className="far fa-eye text-primary fa-lg"></i>
                                </Link>
                                <Link
                                  className="text-decoration-none me-2"
                                  to={{
                                    pathname: "/EditClient",
                                    search: `?id=${data?._id}`,
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="Edit"
                                >
                                  <i className="far fa-edit text-warning fa-lg"></i>
                                </Link>
                                <Link
                                  className="text-decoration-none"
                                  onClick={() => {
                                    openPopup(data?._id);
                                  }}
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                >
                                  <i className="far fa-trash-alt text-danger fa-lg"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex justify-content-end p-3">
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
