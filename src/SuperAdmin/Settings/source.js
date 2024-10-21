import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveSource, getFilterSource, getallSource, deleteSource,updateSource } from '../../api/settings/source';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";

import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";

export default function GlobalSettings() {
  const initialStateInputs = {
    sourceName: "",
  };
  
  const initialStateErrors = {
    sourceName:{required:false},
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
  const [sourceList, setSourceList] = useState([]);
  const [isEdit, setIsEdit] = useState(false); // New state to check if the modal is in edit mode
  const [editId, setEditId] = useState(null); 
  const modalRef = useRef(null);
  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.sourceName) {
      error.sourceName.required = true;
    }
    
    
    return error;
  };

  useEffect(() => {
    getAllSourceDetails();
  }, [pagination.from, pagination.to]);

  const getAllSourceDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterSource(data)
      .then((res) => {
        setSourceList(res?.data?.result?.sourceList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.sourceCount || 0,
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

  const deleteSourceData = () => {
    deleteSource(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllSourceDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

  const filterSourceList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
     sourceName: inputs.sourceName,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterSource(data)
      .then((res) => {
        setSourceList(res?.data?.result?.sourceList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.sourceCount || 0,
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
    getAllSourceDetails();
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
  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };
  
const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
      const data = {
        ...inputs,
        _id: editId, // If editing, include the ID in the data
      };
      if (isEdit) {
        updateSource(data) // Pass the ID for updating
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            setIsEdit(false);
            getAllSourceDetails();
            const modalElement = document.getElementById("addSourceModal");
            if (modalElement) {
              const bootstrapModal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
              bootstrapModal.hide();
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else {
        saveSource(inputs)
          .then((res) => {
            console.log("res", res);
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllSourceDetails();
            const modalElement = document.getElementById("addSourceModal");
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
    getallSource()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Source", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
           
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.sourceName ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            
          ]);
        });
        templatePdf("Source List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallSource()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          sourceName: res?.sourceName ?? "-",
       

        }));
        const header1 = ["Source"];
        const header2 = ["sourceName"];
        ExportCsvService.downloadCsv(list, "SourceList", "Source List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
    
        
        <Mastersidebar />
       
       
      
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px"}}>
        <div className="content-header bg-light shadow-sm sticky-top">
          <div className="container-fluid">
            <div className="row ">
              <div className='col-xl-12'>
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
                    <div style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                      <button className="btn btn-primary" style={{ fontSize: '13px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter  Source</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                          <form onSubmit={filterSourceList}>
                            <div>
                              <div className="mb-3">
                                <label htmlFor="intakeName" className="form-label">Source</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="intakeName"
                                  name="sourceName"
                                  value={inputs.sourceName}
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
                 
                  <li className="m-2">
                    <button
                      className="btn btn-success text-white text-center fw-semibold "
                      style={{
                        
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
                  <li className="m-2">
                    <button
                      className="btn btn-danger text-white text-center  fw-semibold"
                      style={{
                       
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
                 
                </ol>
              </div>
            </div>
          </div>
        </div>



        <div className="container-fluid mt-3">

          <div className='row'>
            <div className='col-md-4'>
            <div className="card border-0 rounded-1 shadow-sm" ref={modalRef}>
            <div className="card-header bg-white border-0">
              <h5 className="card-title fw-semibold" >{isEdit ? "Edit Source" : "Add Source"}</h5>
            
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="intakeName" className="form-label">Source</label>
                  <input
                type="text"
                className="form-control"
                id="intakeName"
                name="sourceName"
                value={inputs.sourceName}
                onChange={handleInputs}
           
                placeholder="Enter Source in Student"
            />
                  {submitted && errors.sourceName.required && (
                    <span className="text-danger">source is required</span>
                  )}
                </div>
               
                <button type="submit" className="btn btn-primary float-end">{isEdit ? "Update" : "Save"}</button>
              </form>
            </div>
          </div>
            </div>
            <div className='col-md-8'>

            <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h6 className='text-center text-capitalize p-1'> List Source</h6>
            </div>
            <div className="card-body mt-5">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                    <th className='text-start text-capitalize'>S.No</th>
                    <th className='text-center text-capitalize'>Source </th>
                  
                    <th className='text-end text-capitalize'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceList.length > 0 ? (
                    sourceList.map((data, index) => (
                      <tr key={index}  style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                        <td className='text-start text-capitalize'>{pagination.from + index + 1}</td>
                        <td className='text-center text-capitalize'>{data?.sourceName}</td>
                       
                        <td  className='text-end text-capitalize'>
                        <button type="button" className="btn btn-primary btn-sm text-white btn-sm m-1 fw-semibold text-uppercase px-2 py-2"
                         
                       onClick={() => { handleEditModule(data) }}
                         style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}> <i className="far fa-edit text-white me-1"></i></button>
                          <button
                            className="btn btn-danger btn-sm m-2 fw-semibold text-uppercase p-2"
                            onClick={() => openPopup(data._id)}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          >
                           <i className="far fa-trash-alt text-white me-1"></i>
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
             
            </div>
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
        <Dialog open={open} onClose={closePopup}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <div>Are you sure you want to delete this Source?</div>
            <div className="text-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteSourceData}
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
     
   
    </div>
  );
}
