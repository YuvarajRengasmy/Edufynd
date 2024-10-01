import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveIntake, getFilterIntake, getallIntakes, deleteIntake,updateIntake } from '../../api/settings/commissionValue';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { getallStatus } from "../../api/status";
import { templatePdf } from "../../Utils/PdfMake";

export default function GlobalSettings() {
  const initialStateInputs = {
    commissionValue: "", 
    paymentType: '',
    paymentStatus: '',
    paymentValue1: '',
    paymentStatus1: '',
    paymentValue2: '',
    paymentStatus2: '',
    paymentValue3: '',
    paymentStatus3: '',
  };
  
  const initialStateErrors = {
    commissionValue: { required: false },
  
  
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
  const [status, setStatus] = useState([]);
  const [isEdit, setIsEdit] = useState(false); // New state to check if the modal is in edit mode
  const [editId, setEditId] = useState(null); 
  const modalRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    const totalCommission = parseFloat(inputs.commissionValue || 0);
    const installment1 = parseFloat(inputs.paymentValue1 || 0);
    const installment2 = parseFloat(inputs.paymentValue2 || 0);
    const installment3 = parseFloat(inputs.paymentValue3 || 0);

    if (!inputs.commissionValue) {
      newErrors.commissionValue = { required: true };
      isValid = false;
    }

    if (inputs.paymentType === 'twoTime') {
      const totalTwoTime = installment1 + installment2;
      if (totalTwoTime !== totalCommission) {
        newErrors.paymentValue1 = 'Installment values must match the consulting fee';
        newErrors.paymentValue2 = 'Installment values must match the consulting fee';
        isValid = false;
      }
    }

    if (inputs.paymentType === 'multipleTime') {
      const totalMultipleTime = installment1 + installment2 + installment3;
      if (totalMultipleTime !== totalCommission) {
        newErrors.paymentValue1 = 'Installment values must match the consulting fee';
        newErrors.paymentValue2 = 'Installment values must match the consulting fee';
        newErrors.paymentValue3 = 'Installment values must match the consulting fee';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };
  

  useEffect(() => {
    getallIntakesDetails();
    getallStatusDetails();
  }, [pagination.from, pagination.to]);

  const getallIntakesDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterIntake(data)
      .then((res) => {
        setIntakeList(res?.data?.result?.dropDownList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.dropDownCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallStatusDetails = () => {
   
    getallStatus()
      .then((res) => {
        setStatus(res?.data?.result);
       
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
        getallIntakesDetails();
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
        setIntakeList(res?.data?.result?.dropDownList || []);
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
    getallIntakesDetails();
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
    setSubmitted(true);
    if (validateForm()) {
      if (isEdit) {
        updateIntake({ ...inputs, id: editId }) // Pass the ID for updating
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            setIsEdit(false);
            getallIntakesDetails();
            const modalElement = document.getElementById("addCountry");
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
            getallIntakesDetails();
            const modalElement = document.getElementById("addCountry");
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
    getallIntakes()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Intake Name", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
            { text: "Next Date", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.intakeName ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            { text: element?.nextDate ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("Commission List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallIntakes()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          intakeName: res?.intakeName ?? "-",
         nextDate: res?.nextDtae?? "-",
         

        }));
        const header1 = ["intakeName","nextDate"];
        const header2 = ["IntakeName", "NextDate"];
        ExportCsvService.downloadCsv(list, "CommissionList", "Commission List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
   
      
        <Mastersidebar />
       
      
      <div className="content-wrapper" style={{fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      
      <div className="content-header bg-light shadow-sm sticky-top">
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
                                <label htmlFor="intakeName" className="form-label">Consulting Fees</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="startDate"
                                  name="commissionValue"
                                  value={inputs.commissionValue}
                                  onChange={handleInputs}
                                  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Next Date</label>
                               <select className='form-select' name='intakeName' value={inputs.intakeName} onChange={handleInputs}>
                               <option>--Select--Payment--Mode-- </option>
                               <option value="oneTime">One Time</option>
                               <option value="twoTime">Two Time</option>
                               <option value="multipleTime">Multiple Time</option>
                               </select>
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
                  {/* <li className="me-2">
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
                      data-bs-target="#addCountry"
                      onClick={() => { handleAddModule() }}
                    >
                   <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;   Add Commission
                    </button>
                  </li> */}
                </ol>
              </div>
          <div className="container mt-4">
            <div className="row ">
            <div className='col-md-4'>
            <div className="card rounded-1 border-0 shadow-sm" ref={modalRef}>
        
            <div className="card-header bg-white border-0">
              <h5 className="card-title">{isEdit ? "Edit Commission" : "Add Commission"}</h5>
             
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="intakeName" className="form-label">Consulting Fees</label>
                  <input
                    type="text"
                    className="form-control"
                    id="intakeName"
                    name="commissionValue"
                    value={inputs.commissionValue}
                    onChange={handleInputs}
                    placeholder='Enter commission value'
                  />
                 
                </div>
                <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Payment Mode</label>
                               <select className='form-select' name='paymentType' value={inputs.paymentType} onChange={handleInputs}>
                               <option>--Select--Payment--Mode-- </option>
                               <option value="oneTime">One Time</option>
                               <option value="twoTime">Two Time</option>
                               <option value="multipleTime">Multiple Time</option>
                               </select>
                              </div>
                  {inputs.paymentType === "oneTime" ? (
                               
                    
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status</label>
                   <select className='form-select' name='paymentStatus' value={inputs.paymentStatus} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                
                  ) :inputs.paymentType === "twoTime" ? (
                    <div>
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue1"
                        value={inputs.paymentValue1}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                      {submitted && errors.paymentValue1 && (
                <span className="text-danger">{errors.paymentValue1}</span>
              )}
                    
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">paymentStatus1</label>
                   <select className='form-select' name='paymentStatus1' value={inputs.paymentStatus1} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue2"
                        value={inputs.paymentValue2}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                      {submitted && errors.paymentValue2 && (
                <span className="text-danger">{errors.paymentValue2}</span>
              )}
                    
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status2</label>
                   <select className='form-select' name='paymentStatus2' value={inputs.paymentStatus2} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>

                  </div>
                  ):inputs.paymentType === "multipleTime" ? (
                    <div>
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue1"
                        value={inputs.paymentValue1}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                      {submitted && errors.paymentValue1 && (
                <span className="text-danger">{errors.paymentValue1}</span>
              )}
                    
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status</label>
                   <select className='form-select' name='paymentStatus1' value={inputs.paymentStatus1} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue2"
                        value={inputs.paymentValue2}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                     {submitted && errors.paymentValue2 && (
                <span className="text-danger">{errors.paymentValue2}</span>
              )}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status 2</label>
                   <select className='form-select' name='paymentStatus2' value={inputs.paymentStatus2} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 3</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue3"
                        value={inputs.paymentValue3}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                     {submitted && errors.paymentValue3 && (
                <span className="text-danger">{errors.paymentValue3}</span>
              )}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status</label>
                   <select className='form-select' name='paymentStatus3' value={inputs.paymentStatus3} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  </div>
                  ):null}
                <button type="submit" className="btn btn-primary float-end">{isEdit ? "Update" : "Save"}</button>
              </form>
            </div>
          
        </div>
            </div>
              <div className='col-md-8'>
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h6 className='text-center text-capitalize p-1'> List Commission</h6>
            </div>
            <div className="card-body mt-5">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                    <th className="text-capitalize text-start" >S.No</th>
                    <th className="text-capitalize text-start">Consulting Fees</th>
                    <th className="text-capitalize text-start">Payment Type</th>
                  
                    <th className="text-capitalize text-start" style={{ width: "40px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeList.length > 0 ? (
                    intakeList.map((data, index) => (
                      <tr key={index}  style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                        <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                        <td className="text-capitalize text-start">{data.commissionValue}</td>
                        <td className="text-capitalize text-start">{data.paymentType}</td>
                       
                        <td className="text-capitalize text-start">
                        <button type="button" className="btn btn-primary btn-sm m-1"
                          
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
            <div>Are you sure you want to delete this Commission?</div>
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
      {/* <div className="modal fade" id="addCountry" tabIndex="-1" aria-labelledby="addCountryLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCountryLabel">{isEdit ? "Edit commission" : "Add commission"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="intakeName" className="form-label">Consulting fees</label>
                  <input
                    type="text"
                    className="form-control"
                    id="intakeName"
                    name="commissionValue"
                    value={inputs.commissionValue}
                    onChange={handleInputs}
                    placeholder='Enter commission value'
                  />
                 
                </div>
                <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Payment Mode</label>
                               <select className='form-select' name='paymentType' value={inputs.paymentType} onChange={handleInputs}>
                               <option>--Select--Payment--Mode-- </option>
                               <option value="oneTime">One Time</option>
                               <option value="twoTime">Two Time</option>
                               <option value="multipleTime">Multiple Time</option>
                               </select>
                              </div>
                  {inputs.paymentType === "oneTime" ? (
                               
                    
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status</label>
                   <select className='form-select' name='paymentStatus' value={inputs.paymentStatus} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                
                  ) :inputs.paymentType === "twoTime" ? (
                    <div>
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue1"
                        value={inputs.paymentValue1}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                      {submitted && errors.paymentValue1 && (
                <span className="text-danger">{errors.paymentValue1}</span>
              )}
                    
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">paymentStatus1</label>
                   <select className='form-select' name='paymentStatus1' value={inputs.paymentStatus1} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue2"
                        value={inputs.paymentValue2}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                      {submitted && errors.paymentValue2 && (
                <span className="text-danger">{errors.paymentValue2}</span>
              )}
                    
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status2</label>
                   <select className='form-select' name='paymentStatus2' value={inputs.paymentStatus2} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>

                  </div>
                  ):inputs.paymentType === "multipleTime" ? (
                    <div>
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 1</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue1"
                        value={inputs.paymentValue1}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                      {submitted && errors.paymentValue1 && (
                <span className="text-danger">{errors.paymentValue1}</span>
              )}
                    
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status</label>
                   <select className='form-select' name='paymentStatus1' value={inputs.paymentStatus1} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 2</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue2"
                        value={inputs.paymentValue2}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                     {submitted && errors.paymentValue2 && (
                <span className="text-danger">{errors.paymentValue2}</span>
              )}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status 2</label>
                   <select className='form-select' name='paymentStatus2' value={inputs.paymentStatus2} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Installment 3</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="paymentValue3"
                        value={inputs.paymentValue3}
                        onChange={handleInputs}
                        placeholder='Enter payment value'
                      />
                     {submitted && errors.paymentValue3 && (
                <span className="text-danger">{errors.paymentValue3}</span>
              )}
                    </div>
                    <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Payment Status</label>
                   <select className='form-select' name='paymentStatus3' value={inputs.paymentStatus3} onChange={handleInputs}>
                   <option value={""}>Select Status</option>
                   {status.map((data,index) => (
                     <option key={index} value={data?.statusName}>{data?.statusName}</option>
                   ))}
                    </select>
              

                  </div>
                  </div>
                  ):null}
                
                <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Save"}</button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
   
    </div>
  );
}
