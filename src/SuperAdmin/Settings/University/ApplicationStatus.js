import Mastersidebar from '../../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, duration } from "@mui/material";
import { saveStatus, getFilterApplicationStatus, getallStatuses, deleteStatus,getSingleStatus, updateStatus } from '../../../api/universityModule/ApplicationStatus';
import { toast } from 'react-toastify';
import { getallStatus} from "../../../api/status";
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";

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
  const [status, setStatus] = useState([]);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [filter, setFilter] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // Track the id of the item being edited
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
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
    getModuleDetails();
    getAllModule();
  }, [pagination.from, pagination.to]);



  const getAllModule = () => {
   
    getallStatus()
      .then((res) => {
        setStatus(res?.data?.result || []);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    getFilterApplicationStatus(data)
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
    getFilterApplicationStatus(data)
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
  const handleAddModuleList = () => {
    setInputs( initialStateInputs)
    setIsEditing(false);
    setSubmitted(false)
    setErrors(initialStateErrors)

}
  const handleEditModuleList = (data) => {
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
    getallStatuses()
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
    getallStatuses()
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
     
         
           
         
          <div className=" " style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px"  }}>
          {/* <div className="content-header bg-light shadow-sm sticky-top">
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
                        <div style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
                          <button className="btn btn-primary" style={{ fontSize: '12px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight11" aria-controls="offcanvasRight11"> <FaFilter /></button>
                          <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight11" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                              <h5 id="offcanvasRightLabel">Filter  Status</h5>
                              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                              <form onSubmit={filterModuleList}>
                                <div>
                                  <div className="mb-3">
                                    <label htmlFor="statusName" className="form-label">Status Type</label>
                                  <input
                                  placeholder='Search...Status Type'
                                    type="text"
                                    className="form-control"
                                    id="statusName"
                                    name="statusName"
                                    value={inputs.statusName}
                                    onChange={handleInputs}
                                    style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  />
                                  </div>
                                  <div className="mb-3">
                                    <label htmlFor="duration" className="form-label">Status Type</label>
                                    <input
                                    placeholder='Search...Status Type'
                                      type="text"
                                      className="form-control"
                                      id="duration"
                                      name="duration"
                                      value={inputs.duration}
                                      onChange={handleInputs}
                                      style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                    />
                                  </div>
                                </div>
                                <div className="text-end">
                                  <button type="submit" className="btn btn-save  border-0 text-uppercase fw-semibold px-4 rounded-pill py-2 text-white float-right mx-2" data-bs-dismiss="offcanvas" onClick={resetFilter}  style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Reset </button>
                                  <button type="button"   className="btn btn-cancel border-0 text-uppercase fw-semibold px-4 rounded-pill py-2 text-white float-right bg"  style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} >Apply</button>
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
                         
                            fontSize: "12px",
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
                         
                            fontSize: "12px",
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
                          className="btn  text-white px-4 py-2 text-uppercase fw-semibold  text-center"
                          style={{
                            backgroundColor: "#fe5722",
                            border: "none",
                         
                            fontSize: "12px",
                            margin: "1px"
                          }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#addCountryModal17"
                          onClick={() => { handleAddModuleList () }}
                        >
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;   Add Status
                        </button>
                      </li>
                    </ol>
                  </div> */}
              <div className="container-fluid ">
                <div className="row ">
                  {/* <div className='col-md-4'>
                  <div className="card rounded-1 border-0 shadow-sm" >
                  <div className="card-header bg-white border-0">
                    <h5 className="card-title" >{isEditing ? "Edit Status Type" : "Add Status Type"}</h5>
                
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="statusName" className="form-label">Status Name</label>
                        <select
                                        name="statusName"
                                        value={inputs.statusName}
                                        onChange={handleInputs}
                                        className="form-select"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <option value="">Select Status</option>
                                        {
                                          status.map((status) => (
                                            <option
                                              key={status._id}
                                              value={status.statusName}
                                            >
                                              {status.statusName}
                                            </option>
                                          ))}
                                      </select>
                        {submitted && errors.statusName.required && (
                          <div className="text-danger">status is required</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
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
                        <button type="submit" className="btn btn-primary float-end" >{isEditing ? "Update" : "Add"}</button>
                      </div>
                    </form>
                  </div>
                </div>
                </div> */}
            
             
            <div className="col-md-12">
            <div className="card  border-0 rounded-0 shadow-sm  ">
            <div className="card-header  bg-white " >
              <div className='d-flex justify-content-between'>
              <h6 className=' text-capitalize p-1'> List Status</h6>
            <button
                          className="btn  text-white px-4 py-2 text-uppercase fw-semibold  text-center"
                          style={{
                            backgroundColor: "#fe5722",
                            border: "none",
                         
                            fontSize: "12px",
                            margin: "1px"
                          }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#addCountryModal17"
                          onClick={() => { handleAddModuleList () }}
                        >
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;   Add Status
                        </button>
              </div>
            
            </div>
            <div className="card-body  p-3">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                        <th className="text-capitalize text-start" >S.No</th>
                        <th className="text-capitalize text-start" >Status Name</th>
                        <th className="text-capitalize text-start" >Status Duration</th>
                        <th className="text-capitalize text-start" style={{ width: "40px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleList.length > 0 ? (
                        moduleList.map((data, index) => (
                          <tr key={index} style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                            <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                            <td className="text-capitalize text-start">{data.statusName}</td>
                            <td className="text-capitalize text-start">{data.duration}</td>
                            <td className="text-capitalize text-start">
                            <button
                                className="btn btn-primary btn-sm "
                                data-bs-toggle="modal"
                                data-bs-target="#addCountryModal17"
                                onClick={() => handleEditModuleList(data)}
                                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px" }}
                              >
                                <i class="fa fa-edit" aria-hidden="true"></i>
                              </button>
                              
                              <button
                                className="btn btn-danger ml-3 btn-sm"
                                onClick={() => openPopup(data._id)}
                                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px" }}
                              >
                                 <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data To Status Found
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
            <div className="modal fade" id="addCountryModal17" tabIndex={-1} aria-labelledby="addCountryModalLabel17" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addCountryModalLabel17">{isEditing ? "Edit Status Type" : "Add Status Type"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="statusName" className="form-label">Status Name</label>
                        <select
                                        name="statusName"
                                        value={inputs.statusName}
                                        onChange={handleInputs}
                                        className="form-select"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <option value="">Select Status</option>
                                        {
                                          status.map((status) => (
                                            <option
                                              key={status._id}
                                              value={status.statusName}
                                            >
                                              {status.statusName}
                                            </option>
                                          ))}
                                      </select>
                        {submitted && errors.statusName.required && (
                          <div className="text-danger">status is required</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
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
  );
}