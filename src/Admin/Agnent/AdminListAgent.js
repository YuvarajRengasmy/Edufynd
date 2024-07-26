import React, { useEffect, useState, useRef } from "react";
import Sortable from 'sortablejs';
import { getallAgent, deleteAgent, getFilterAgent } from "../../api/agent";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, radioClasses, } from "@mui/material";
import { formatDate } from "../../Utils/DateFormat";
import Mastersidebar from "../../compoents/sidebar";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { toast } from "react-toastify";
import { getAgentId, getSuperAdminId } from "../../Utils/storage";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';




export const AdminListAgent = () => {


  const initialStateInputs = {
    agentName: "",
    agentCode: "",
    mobileNumber: "",
    courseFee: "",

  };
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [filter, setFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [agent, setAgent] = useState();

  useEffect(() => {
    getAllAgentDetails();
  }, [pagination.from, pagination.to]);

  const getAllAgentDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,


    };
    getallAgent(data)

      .then((res) => {
        setAgent(res?.data?.result);
        setPagination({
          ...pagination,
          count: res?.data?.result,
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
  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteAgentData = () => {
    deleteAgent(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllAgentDetails();
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
  const filterAgentList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      agentName: inputs.agentName,
      agentCode: inputs.agentCode,
      mobileNumber: inputs.mobileNumber,
      status: inputs.status,
      limit: 10,
      page: pagination.from,

    };
    getFilterAgent(data)
      .then((res) => {
        setAgent(res?.data?.result?.agentList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.agentCount,
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
    getAllAgentDetails();
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
    formData.append('program', file);

    try {
      const response = await axios.post('https://api.edufynd.in/api/agent/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };



  const pdfDownload = (event) => {
    event?.preventDefault();
    getFilterAgent(agent)
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
        templatePdf("Student List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getFilterAgent(agent)
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

  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;

    // Apply SortableJS to the table headers
    const sortable = new Sortable(table.querySelector('thead tr'), {
      animation: 150,
      swapThreshold: 0.5,
      handle: '.sortable-handle',
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        // Move the columns in the tbody
        table.querySelectorAll('tbody tr').forEach((row) => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      }
    });

    return () => {
      sortable.destroy();
    };
  }, []);




  return (
    <>
      <div >
       
          <Mastersidebar />
        


        <div className="content-wrapper " style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header">
        <div className="container">
         
            
              <div className="row ">

                <div className="col-xl-12" >
                  <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                    <li className="flex-grow-1">
                      <div className="input-group" style={{ maxWidth: "600px" }}>
                        <input
                          type="search"
                          placeholder="Search"
                          aria-describedby="button-addon3"
                          className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                          style={{
                            borderColor: "#FE5722",
                            paddingRight: "1.5rem",
                            marginLeft: "0px",
                            fontSize: "12px", // Keep the font size if it's correct
                            height: "11px", // Set the height to 11px
                            padding: "0px" // Adjust padding to fit the height
                          }}
                        />
                        <span
                          className="input-group-text bg-transparent border-0"
                          id="button-addon3"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer"
                          }}
                        >
                          <i className="fas fa-search" style={{ color: "black" }}></i>
                        </span>
                      </div>
                    </li>
                    <li class="m-1">


                      <div>
                        <button className="btn btn-primary" style={{ fontSize: '11px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                          <div className="offcanvas-header">
                            <h5 id="offcanvasRightLabel">Filter Agent</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                          </div>
                          <div className="offcanvas-body ">
                            <form>
                              <div className="from-group mb-3">
                                <label className="form-label">Agent Name</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="agentName"
                                  onChange={handleInputs}
                                  placeholder="Search...Agent Name"
                                  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                />
                                <label className="form-label">Agent Code</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="agentCode"
                                  onChange={handleInputs}
                                  placeholder="Search...Agent Code"
                                  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}

                                />
                                <label className="form-label">Mobile Number</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="mobileNumber"
                                  onChange={handleInputs}
                                  placeholder="Search...MobileNumber"
                                  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}

                                />
                                <label className="form-label">Status</label>
                                <br />
                                <input
                                  type="text"
                                  className="form-control"
                                  name="status"
                                  onChange={handleInputs}
                                  placeholder="Search...Status"
                                  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}

                                />


                              </div>
                              <div>
                                <button

                                  data-bs-dismiss="offcanvas"
                                  className="btn btn-cancel border-0 rounded-pill fw-semibold text-uppercase px-4 py-2 text-white float-right bg"

                                  onClick={resetFilter}
                                  style={{ backgroundColor: '#0f2239', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}

                                >
                                  Reset
                                </button>
                                <button
                                  data-bs-dismiss="offcanvas"
                                  type="submit"
                                  onClick={filterAgentList}
                                  className="btn btn-save border-0 rounded-pill fw-semibold text-uppercase px-4 py-2 text-white float-right mx-2"
                                  style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
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
                        <button style={{ backgroundColor: "#E12929", fontSize: '11px' }} className="btn text-white ">
                          <span>
                            <i class="fa fa-file-pdf" aria-hidden="true"></i>
                          </span>
                        </button>
                      </Link>
                    </li>
                    <li class="m-1">
                      <Link onClick={exportCsv} class="btn-filters">
                        <span>
                          <button style={{ backgroundColor: "#22A033", fontSize: '11px' }} className="btn text-white ">
                            <i class="fa fa-file-excel" aria-hidden="true"></i>
                          </button>
                        </span>
                      </Link>
                    </li>

                    <li class="m-1">
                      <Link onClick={openImportPopup} class="btn-filters">
                        <span>
                          <button
                            style={{ backgroundColor: "#9265cc", fontSize: '11px' }}
                            className="btn text-white "
                          >
                            <i class="fa fa fa-upload" aria-hidden="true"></i>
                          </button>
                        </span>
                      </Link>
                    </li>
                    <li class="m-0">
                      <Link class="btn btn-pix-primary" to="/AddAgent">
                        <button
                          className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                          style={{ backgroundColor: "#fe5722", fontSize: '12px' }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                          Add Agent
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
              <div className="card rounded-0 mt-2 border-0 ">
                <div className="card-body">
                  <div className="card-table">
                    <div className="table-responsive">

                      <table className=" table table-hover card-table dataTable table-responsive-sm text-center" style={{ color: '#9265cc', fontSize: '13px' }}
              ref={tableRef}>
                        <thead className="table-light">
                          <tr style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                            <th className="text-capitalize text-start sortable-handle">S No</th>
                      
                            <th className="text-capitalize text-start sortable-handle">Agent Name</th>
                            <th className="text-capitalize text-start sortable-handle">Agent Code</th>
                            <th className="text-capitalize text-start sortable-handle">Email</th>
                            <th className="text-capitalize text-start sortable-handle">Mobile Number</th>
                            <th className="text-capitalize text-start sortable-handle">Status</th>
                            <th className="text-capitalize text-start sortable-handle">Created by</th>
                            <th className="text-capitalize text-start sortable-handle">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {agent?.map((data, index) => (
                            <tr key={index} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                              <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                        
                              <td className="text-capitalize text-start">{data?.agentName}</td>
                              <td className="text-capitalize text-start">{data?.agentCode}</td>

                              <td className=" text-start">{data?.email}</td>
                              <td className="text-capitalize text-start">{data?.mobileNumber}</td>
                              <td className="text-capitalize text-start">{data?.status}</td>
                              <td className="text-capitalize text-start">{formatDate(data?.modifiedOn?data?.modifiedOn:data?.createdOn?data?.createdOn:null)}</td>

                              <td>
                                <div className="d-flex">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/ViewAgent",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-eye text-primary me-1"></i>

                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/EditAgent",
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
            <div className="text-center m-4">
              <h5 className="mb-4 text-capitalize" >

                Are you sure you want to Delete <br /> the selected Agent ?
              </h5>
              <button
                type="button"
                style={{ fontSize: "12px", fontFamily: 'Plus Jakarta Sans' }}
                className="btn btn-success rounded-pill border-0 px-4 py-2 text-white fw-semibold text-uppercase mx-3"
                onClick={deleteAgentData}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-danger border-0 rounded-pill text-white fw-semibold text-uppercase px-4 py-2 "
                onClick={closePopup}
                style={{ fontSize: "12px", fontFamily: 'Plus Jakarta Sans' }}
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
          <DialogContent>

          </DialogContent>
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
                  className="btn btn-cancel border-0 text-uppercase fw-semibold rounded-pill px-4 py-2 text-white float-right bg"
                  style={{ backgroundColor: "#0f2239",fontSize:'14px' }}

                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  onClick={handleFileUpload}
                  className="btn btn-save border-0 fw-semibold text-uppercase rounded-pill px-4 py-2 text-white float-right mx-2"
                  style={{ backgroundColor: "#fe5722",fontSize:'14px' }}
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
export default AdminListAgent;
