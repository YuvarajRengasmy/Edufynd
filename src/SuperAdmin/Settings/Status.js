import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, duration } from "@mui/material";
import { saveStatus, getFilterStatus, getallStatus, deleteStatus,getSingleStatus, updateStatus } from '../../api/status';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";



export default function GlobalSettings() {
  const initialStateInputs = {
    statusName: "",
    duration: "",
  };

  const initialStateErrors = {
    statusName: { required: false },
    duration: { required: false },
  };

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [inputs, setInputs] = useState(initialStateInputs);
  const [filter, setFilter] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // Track the id of the item being edited
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const ZERO = 0;
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [moduleList, setModuleList] = useState([]);
  const modalRef = useRef(null);
  
  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.statusName) {
      error.statusName.required = true;
    }

    if (!data.duration) {
      error.duration.required = true;
    }

    return error;
  };

  useEffect(() => {
    getAllModuleDetails();
    getModuleDetails()
  }, [pagination.from, pagination.to]);


  const getModuleDetails = () => {
    const data = {
        courseType: inputs.courseType,
      
    }
    getSingleStatus(data)
        .then((res) => {
            const result = res?.data?.result
            setInputs(result)
        })
        .catch((err) => {
            console.log(err);
        });
}

  const getAllModuleDetails = () => {
    const data = {
      limit: 5,
      page: pagination.from,
    };
    getFilterStatus(data)
      .then((res) => {
        setModuleList(res?.data?.result?.statusList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount || 0,
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

  const deleteModuleData = () => {
    deleteStatus(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllModuleDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

  const filterModuleList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      statusName: inputs.statusName,
      duration: inputs.duration,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterStatus(data)
      .then((res) => {
        setModuleList(res?.data?.result?.dropDownList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.dropDownCount || 0,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllModuleDetails();
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };
  const handleAddModule = () => {
    setInputs( initialStateInputs)
    setSubmitted(false)
    setErrors(initialStateErrors)

}
  const handleEditModule = (data) => {
    setInputs(data); // Set the form inputs to the data of the item being edited
    setIsEditing(true); // Set editing mode to true
    setEditId(data._id); // Set the ID of the item being edited
    setSubmitted(false); // Reset submitted state
    setErrors(initialStateErrors); // Reset errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    const allInputsValid = Object.values(newError).every((x) => !x.required);
    if (allInputsValid) {
      const data = {
        ...inputs,
        _id: editId, // If editing, include the ID in the data
      };

      if (isEditing) {
        updateStatus(data)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllModuleDetails();
            closePopup();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else {
        saveStatus(inputs)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllModuleDetails();
            closePopup();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    }
  };

 




  const pdfDownload = (event) => {
    event?.preventDefault();
    getallStatus()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "statusName", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
            { text: "duration", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.statusName ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            { text: element?.duration ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("status List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallStatus()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
         statusName: res?.statusName ?? "-",
         duration: res?.duration ?? "-",
        }));
        const header1 = ["statusName", "duration"];
        const header2 = ["Status Name", "Duration"];
        ExportCsvService.downloadCsv(list, "statusList", "Status Type List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
        <div className='container-fluid'>
          <nav className='navbar navbar-vertical navbar-expand-lg'>
            <Mastersidebar />
          </nav>
          <div className="content-wrapper " style={{ backgroundColor: '#fff' }}>
            <div className="content-header">
              <div className="container-fluid">
                <div className="row ">
                  <div>
                    <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                      <li className="flex-grow-1">
                        <div className="input-group" style={{ maxWidth: "600px", fontSize: "14px" }}>
                          <input
                            type="search"
                            placeholder="Search"
                            aria-describedby="button-addon3"
                            className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                            style={{
                              borderColor: "#FE5722",
                              paddingRight: "1.5rem",
                              marginLeft: "0px",
                              fontSize: "12px",
                              height: "11px",
                              padding: "0px"
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
                      <li className="m-2">
                        <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                          <button className="btn btn-primary" style={{ fontSize: '14px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight11" aria-controls="offcanvasRight11"> <FaFilter /></button>
                          <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight11" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                              <h5 id="offcanvasRightLabel">Filter BY Status</h5>
                              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                              <form onSubmit={filterModuleList}>
                                <div>
                                  <div className="mb-3">
                                    <label htmlFor="statusName" className="form-label">Status Type</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="statusName"
                                      name="statusName"
                                      value={inputs.statusName}
                                      onChange={handleInputs}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="duration" className="form-label">Status Type</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="duration"
                                      name="duration"
                                      value={inputs.duration}
                                      onChange={handleInputs}
                                    />
                                  </div>
                                </div>
                                <div className="text-end">
                                  <button type="submit" className="btn btn-primary me-2 "data-bs-dismiss="offcanvas">Apply</button>
                                  <button type="button" className="btn btn-secondary" onClick={resetFilter}>Reset</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </li>
                    
                      <li >
                        <button
                          className="btn btn-success text-white text-center "
                          style={{
                            backgroundColor: "#45AA62",
                            border: "none",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            margin: "1px"
                          }}
                          type="button"
                          onClick={exportCsv}
                        >
                        <i className="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </li>
                      <li >
                        <button
                          className="btn btn-danger text-white text-center "
                          style={{
                            backgroundColor: "#E74C3C",
                            border: "none",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            margin: "1px"
                          }}
                          type="button"
                          onClick={pdfDownload}
                        >
                         <i className="fa fa-file-pdf" aria-hidden="true"></i>
                        </button>
                      </li>
                      <li className="breadcrumb-item">
                        <button
                          className="btn btn-primary text-white text-center"
                          style={{
                            backgroundColor: "#3498DB",
                            border: "none",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            margin: "1px"
                          }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#addCountryModal11"
                          onClick={() => { handleAddModule () }}
                        >
                       Add Status
                        </button>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-3">
              <div className="card">
                <div className="card-header d-flex align-items-center" style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                  <h3 className="card-title flex-grow-1">Status List</h3>
                </div>
                <div className="card-body">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                        <th style={{ width: "10px" }}>S.No</th>
                        <th className='text-center'>Status Name</th>
                        <th className='text-center'>Status Duration</th>
                        <th style={{ width: "40px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleList.length > 0 ? (
                        moduleList.map((data, index) => (
                          <tr key={index} style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                            <td>{pagination.from + index + 1}</td>
                            <td className='text-center'>{data.statusName}</td>
                            <td className='text-center'>{data.duration}</td>
                            <td>
                            <button
                                className="btn btn-primary btn-sm "
                                data-bs-toggle="modal"
                                data-bs-target="#addCountryModal11"
                                onClick={() => handleEditModule(data)}
                                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                              >
                                <i class="fa fa-edit" aria-hidden="true"></i>
                              </button>
                              
                              <button
                                className="btn btn-danger ml-3 btn-sm"
                                onClick={() => openPopup(data._id)}
                                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                              >
                                 <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data To Ststus Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
            <Dialog open={open} onClose={closePopup}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <div>Are you sure you want to delete this course type?</div>
                <div className="text-end mt-3">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={closePopup}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={deleteModuleData}
                  >
                    Delete
                  </button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="modal fade" id="addCountryModal11" tabIndex={-1} aria-labelledby="addCountryModalLabel11" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addCountryModalLabel11">{isEditing ? "Edit Status Type" : "Add Status Type"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="statusName" className="form-label">Status Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="statusName"
                          name="statusName"
                          value={inputs.statusName}
                          onChange={handleInputs}
                        />
                        {submitted && errors.statusName.required && (
                          <div className="text-danger">status is required</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Status Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="duration"
                          name="duration"
                          value={inputs.duration}
                          onChange={handleInputs}
                        />
                        {submitted && errors.duration.required && (
                          <div className="text-danger">duration is required</div>
                        )}
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{isEditing ? "Update" : "Add"}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
