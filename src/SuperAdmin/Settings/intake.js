import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveIntake, getFilterIntake, getallIntake, deleteIntake,updateIntake } from '../../api/intake';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";

export default function GlobalSettings() {
  const initialStateInputs = {
    intakeName: "",
    startDate: "",
    endDate: "",
  };
  
  const initialStateErrors = {
    intakeName: { required: false },
   startDate: { required: false },
   endDate: { required: false },
  };

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [inputs, setInputs] = useState(initialStateInputs);
  const [filter, setFilter] = useState(false);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const ZERO = 0;
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [intakeList, setIntakeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false); // New state to check if the modal is in edit mode
  const [editId, setEditId] = useState(null); 
  const modalRef = useRef(null);
  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.intakeName) {
      error.statusName.required = true;
    }
    if (!data.startDate) {
      error.startDate.required = true;
    }
    if (!data.endDate) {
        error.endDate.required = true;
      }
    return error;
  };

  useEffect(() => {
    getAllIntakeDetails();
  }, [pagination.from, pagination.to]);

  const getAllIntakeDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterIntake(data)
      .then((res) => {
        setIntakeList(res?.data?.result?.intakeList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.intakeCount || 0,
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

  const deleteIntakeData = () => {
    deleteIntake(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllIntakeDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

  const filterIntakeList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      intakeName: inputs.intakeName,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterIntake(data)
      .then((res) => {
        setIntakeList(res?.data?.result?.intakeList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.intakeCount || 0,
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
    getAllIntakeDetails();
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
    setInputs(initialStateInputs)
    setSubmitted(false)
    setErrors(initialStateErrors)

  }
  const handleEditModule = (data) => {
    setInputs(data); // Set the form inputs to the data of the item being edited
    setIsEdit(true); // Set editing mode to true
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
      if (isEdit) {
        updateIntake({ ...inputs, id: editId }) // Pass the ID for updating
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            setIsEdit(false);
            getAllIntakeDetails();
            const modalElement = document.getElementById("addCountryModal");
            if (modalElement) {
              const bootstrapModal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
              bootstrapModal.hide();
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else {
        saveIntake(inputs)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllIntakeDetails();
            const modalElement = document.getElementById("addCountryModal");
            if (modalElement) {
              const bootstrapModal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
              bootstrapModal.hide();
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    }
  };

  const pdfDownload = (event) => {
    event?.preventDefault();
    getallIntake()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Intake Name", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
            { text: "Start Date", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
            { text: "End Date", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.intakeName ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            { text: element?.startDate ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            { text: element?.endDate ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("IntakeName List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallIntake()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          intakeName: res?.intakeName ?? "-",
         startDate: res?.startDtae?? "-",
         endDate: res?.endDtae?? "-",

        }));
        const header1 = ["intakeName", "startDate", "endDate"];
        const header2 = ["IntakeName", "StartDate", "EndDate"];
        ExportCsvService.downloadCsv(list, "intakeList", "Intake List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className='container-fluid'>
        <nav className='navbar navbar-vertical navbar-expang-lg'>
        <Mastersidebar />
        </nav>
       
      
      <div className="content-wrapper" style={{fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      
          <div className="container">
            <div className="row ">
              <div className='col-xl-12'>
              <div className="content-header">
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
                      <button className="btn btn-primary" style={{ fontSize: '12px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter  Intake</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                          <form onSubmit={filterIntakeList}>
                            <div>
                              <div className="mb-3">
                                <label htmlFor="intakeName" className="form-label">Intake Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="startDate"
                                  name="intakeName"
                                  value={inputs.intakeName}
                                  onChange={handleInputs}
                                  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Start Date</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="startDate"
                                  name="startDate"
                                  value={inputs.startDate}
                           
                                  onChange={handleInputs}
                                  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">End Date</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="endDate"
                                  name="endDate"
                                  value={inputs.endDate}
                           
                                  onChange={handleInputs}
                                  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                />
                              </div>
                            </div>
                            <div className="text-end">
                              <button type="submit" className="btn btn-sm text-uppercase fw-semibold px-4 py-2 rounded-pill text-white me-2" style={{backgroundColor:'#fe5722',color:'#fff',fontSize:'12px'}}>Apply</button>
                              <button type="button" className="btn btn-sm text-uppercase fw-semibold px-4 py-2 rounded-pill text-white btn-secondary" onClick={resetFilter} style={{backgroundColor:'#231f20',color:'#fff',fontSize:'12px'}}>Reset</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                 
                  <li className="me-2">
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
                  <li className="me-2">
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
                  <li className="me-2">
                    <button
                      className="btn  text-white text-center border-0 px-4 py-2 fw-semibold text-uppercase "
                      style={{
                        backgroundColor: "#fe5722",
                        border: "none",
                      
                        fontSize: "12px",
                        margin: "1px"
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#addCountryModal"
                      onClick={() => { handleAddModule() }}
                    >
                   <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;   Add Intake
                    </button>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="row ">
        <div className="col-xl-12">
        <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h6 className='text-center text-capitalize p-1'> List Intake</h6>
            </div>
            <div className="card-body mt-5">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                    <th className="text-capitalize text-start" >S.No</th>
                    <th className="text-capitalize text-start">Intake Name</th>
                    <th className="text-capitalize text-start">Start Date</th>
                    <th className="text-capitalize text-start">End Date</th>
                    <th className="text-capitalize text-start" style={{ width: "40px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeList.length > 0 ? (
                    intakeList.map((data, index) => (
                      <tr key={index}  style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                        <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                        <td className="text-capitalize text-start">{data.intakeName}</td>
                        <td className="text-capitalize text-start">{data.startDate}</td>
                        <td className="text-capitalize text-start">{data.endDate}</td>
                        <td className="text-capitalize text-start">
                        <button type="button" className="btn btn-primary btn-sm m-1"
                            data-bs-toggle="modal"
                           data-bs-target="#addCountryModal"
                       onClick={() => { handleEditModule(data) }}
                         style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px",color:'#fff' }}> <i class="fa fa-edit" aria-hidden="true"></i></button>
                          <button
                            className="btn btn-danger btn-sm m-2"
                            onClick={() => openPopup(data._id)}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px",color:'#fff' }}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No Status Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <Pagination
                 style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                  count={Math.ceil(pagination.count / pageSize)}
                  page={pagination.from / pageSize + 1}
                  onChange={handlePageChange}
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
            <div>Are you sure you want to delete this status?</div>
            <div className="text-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteIntakeData}
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="modal fade" id="addCountryModal" tabIndex="-1" aria-labelledby="addCountryModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCountryModalLabel">{isEdit ? "Edit Intake" : "Add Intake"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="intakeName" className="form-label">Intake Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="intakeName"
                    name="intakeName"
                    value={inputs.intakeName}
                    onChange={handleInputs}
                  />
                  {submitted && errors.intakeName.required && (
                    <span className="text-danger">Intake Name is required</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={inputs.startDate}
                    onChange={handleInputs}
                  />
                  {submitted && errors.startDate.required && (
                    <span className="text-danger">Start Date is required</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={inputs.endDate}
                    onChange={handleInputs}
                  />
                  {submitted && errors.endDate.required && (
                    <span className="text-danger">End Date is required</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Save"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
