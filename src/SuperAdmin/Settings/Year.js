import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveYear, getFilterYear, getallYear, deleteYear,updateYear } from '../../api/year';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";

import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";

export default function GlobalSettings() {
  const initialStateInputs = {
  year: "",
  };
  
  const initialStateErrors = {
      year:{required:false},
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
  const [yearList, setYearList] = useState([]);
  const [isEdit, setIsEdit] = useState(false); // New state to check if the modal is in edit mode
  const [editId, setEditId] = useState(null); 
  const modalRef = useRef(null);
  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.year) {
      error.year.required = true;
    }
    
    
    return error;
  };

  useEffect(() => {
    getAllYearDetails();
  }, [pagination.from, pagination.to]);

  const getAllYearDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterYear(data)
      .then((res) => {
        setYearList(res?.data?.result?.yearList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.yearCount || 0,
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

  const deleteYearData = () => {
    deleteYear(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllYearDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

  const filterYearList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
     year: inputs.year,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterYear(data)
      .then((res) => {
        setYearList(res?.data?.result?.yearList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.yearCount || 0,
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
    getAllYearDetails();
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
        updateYear({ ...inputs, id: editId }) // Pass the ID for updating
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            setIsEdit(false);
            getAllYearDetails();
            const modalElement = document.getElementById("addYearModal");
            if (modalElement) {
              const bootstrapModal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
              bootstrapModal.hide();
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else {
        saveYear(inputs)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllYearDetails();
            const modalElement = document.getElementById("addYearModal");
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
    getallYear()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Year", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
           
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.year ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            
          ]);
        });
        templatePdf("Year List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallYear()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          year: res?.year ?? "-",
       

        }));
        const header1 = ["year"];
        const header2 = ["Year"];
        ExportCsvService.downloadCsv(list, "yearList", "Year List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
    <div style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
      <div className='container-fluid'>
        <nav className='navbar navbar-vertical navbar-expang-lg'>
        <Mastersidebar />
        </nav>
       
      
      <div className="content-wrapper" style={{ backgroundColor: '#fff' }}>
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
                      <button className="btn btn-primary" style={{ fontSize: '11px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter BY Year</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                          <form onSubmit={filterYearList}>
                            <div>
                              <div className="mb-3">
                                <label htmlFor="intakeName" className="form-label">Year</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="startDate"
                                  name="year"
                                  value={inputs.year}
                                  onChange={handleInputs}
                                />
                              </div>
                            
                            </div>
                            <div className="text-end">
                              <button type="submit" className="btn btn-primary me-2">Apply</button>
                              <button type="button" className="btn btn-secondary" onClick={resetFilter}>Reset</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="breadcrumb-item">
                    <button
                      className="btn btn-primary text-white text-center rounded-pill"
                      style={{
                        backgroundColor: "#3498DB",
                        border: "none",
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        margin: "1px"
                      }}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#addYearModal"
                      onClick={() => { handleAddModule() }}
                    >
                      Add Year
                    </button>
                  </li>
                  <li className="breadcrumb-item">
                    <button
                      className="btn btn-success text-white text-center rounded-pill"
                      style={{
                        backgroundColor: "#45AA62",
                        border: "none",
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        margin: "1px"
                      }}
                      type="button"
                      onClick={exportCsv}
                    >
                      Export to CSV
                    </button>
                  </li>
                  <li className="breadcrumb-item">
                    <button
                      className="btn btn-danger text-white text-center rounded-pill"
                      style={{
                        backgroundColor: "#E74C3C",
                        border: "none",
                        fontFamily: "Poppins",
                        fontSize: "11px",
                        margin: "1px"
                      }}
                      type="button"
                      onClick={pdfDownload}
                    >
                      Export to PDF
                    </button>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-3">
          <div className="card">
            <div className="card-header d-flex align-items-center" style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
              <h3 className="card-title flex-grow-1">YearList</h3>
            </div>
            <div className="card-body">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                    <th className='text-start text-capitalize'>S.No</th>
                    <th className='text-center text-capitalize'>Year </th>
                  
                    <th className='text-end text-capitalize'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {yearList.length > 0 ? (
                    yearList.map((data, index) => (
                      <tr key={index}  style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                        <td className='text-start text-capitalize'>{pagination.from + index + 1}</td>
                        <td className='text-center text-capitalize'>{data?.year}</td>
                       
                        <td  className='text-end text-capitalize'>
                        <button type="button" className="btn btn-info btn-sm m-1"
                            data-bs-toggle="modal"
                           data-bs-target="#addYearModal"
                       onClick={() => { handleEditModule(data) }}
                         style={{ fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>Edit</button>
                          <button
                            className="btn btn-danger btn-sm m-2"
                            onClick={() => openPopup(data._id)}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          >
                            Delete
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
        <Dialog open={open} onClose={closePopup}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <div>Are you sure you want to delete this Year?</div>
            <div className="text-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteYearData}
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="modal fade" id="addYearModal" tabIndex="-1" aria-labelledby="addYearModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addYearModalLabel">{isEdit ? "Edit Year" : "Add Year"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="intakeName" className="form-label">Year</label>
                  <input
                type="text"
                className="form-control"
                id="intakeName"
                name="year"
                value={inputs.year}
                onChange={handleInputs}
                pattern="\d{4}"
                placeholder="YYYY"
            />
                  {submitted && errors.year.required && (
                    <span className="text-danger">Year is required</span>
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
