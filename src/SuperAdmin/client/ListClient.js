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
        <div className="content-header">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <ol className="breadcrumb d-flex flex-row align-items-center justify-content-end">
                  <li className="flex-grow-1">
                    <form onSubmit={handleSearch}>
                      <div
                        className="input-group"
                        style={{ maxWidth: "600px" }}
                      >
                        <input
                          type="search"
                          placeholder="Search..."
                          aria-describedby="button-addon3"
                          ref={search}
                          onChange={handleInputsearch}
                          className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
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
                          <h5 id="offcanvasRightLabel">Filter Client</h5>
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
                              <label className="form-label">Client Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessName"
                                onChange={handleInputs}
                                placeholder="Search...Client Name"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                              <label className="form-label">
                                Client Contact No{" "}
                              </label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessContactNo"
                                onChange={handleInputs}
                                placeholder="Search...Client Contact No"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />

                              <label className="form-label">Status</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="status"
                                onChange={handleInputs}
                                placeholder="Search...Status"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                              <label className="form-label">Client Id</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="clientID"
                                onChange={handleInputs}
                                placeholder="Search...Client Id"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2  text-white float-right bg"
                                style={{
                                  backgroundColor: "#0f2239",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                                // onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                // onClick={filterProgramList}
                                className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2  text-white float-right mx-2"
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
                    <Link
                      class="btn border-0 text-uppercase fw-semibold px-4 py-2 text-white"
                      to="/AddClient"
                    >
                      <button
                        className="btn  border-0 text-uppercase fw-semibold px-4 py-2 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                        &nbsp;&nbsp; Add Client
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
                <div className="card  border-0 rounded-0">
                  <div className="card-body">
                    <div className="card-table">
                      <div className="table-responsive">
                        <table
                          className=" table   card-table table-hover  dataTable text-center"
                          style={{ color: "#9265cc", fontSize: "12px" }}
                          ref={tableRef}
                        >
                          <thead class="table-light">
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
                                {" "}
                                Code
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Type{" "}
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Name
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Primary No
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Email ID
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Status
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {client?.map((data, index) => (
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
                                  {data?.clientID}
                                </td>
                                <td className="text-capitalize text-start">
                                  {data?.typeOfClient}
                                </td>
                                <td className="text-capitalize text-start">
                                  {" "}
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/ViewClient",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    {data?.businessName}{" "}
                                  </Link>
                                </td>
                                <td className="text-capitalize text-start">
                                  {data?.businessContactNo}
                                </td>
                                <td className=" text-start">
                                  {data?.businessMailID}
                                </td>
                                <td className="text-capitalize text-start">
                                  {data?.status}
                                </td>
                                <td>
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/ViewClient",
                                        search: `?id=${data?._id}`,
                                      }}
                                      data-bs-toggle="tooltip"
                                      title="View"
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/EditClient",
                                        search: `?id=${data?._id}`,
                                      }}
                                      data-bs-toggle="tooltip"
                                      title="Edit"
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      onClick={() => {
                                        openPopup(data?._id);
                                      }}
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                    >
                                      <i className="far fa-trash-alt text-danger me-1"></i>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
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
          <div className="text-center p-4">
            <h5 className="mb-4 text-capitalize">
              Are you sure you want to Delete <br /> the selected Client ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              onClick={deleteClientData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase border-0 "
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
            <div className="from-group mb-3">
              <div className="mb-3">
                <input
                  type="file"
                  name="file"
                  className="form-control text-dark bg-transparent"
                  onChange={handleFileChange}
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div>
              <Link
                to="/client"
                className="btn btn-cancel border-0 rounded-pill text-uppercase px-4 py-2 fw-semibold text-white float-right bg"
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
                className="btn btn-save border-0 rounded-pill text-uppercase fw-semibold px-4 py-2 text-white float-right mx-2"
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
