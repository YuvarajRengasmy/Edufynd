import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveModule, getFilterModule, getallModule, deleteModule,getSingleAllModule, updateModule } from '../../api/allmodule';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import{bootstrap} from "bootstrap/dist/js/bootstrap.bundle.min";


export default function GlobalSettings() {
  const initialStateInputs = {
    courseType: "",
  };

  const initialStateErrors = {
    courseType: { required: false },
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

    if (!data.courseType) {
      error.courseType.required = true;
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
    getSingleAllModule(data)
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
    getFilterModule(data)
      .then((res) => {
        setModuleList(res?.data?.result?.dropDownList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.dropDownCount || 0,
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
    deleteModule(deleteId)
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
      courseType: inputs.courseType,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterModule(data)
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
    setIsEditing(false);
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
        updateModule(data)
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
        saveModule(inputs)
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
    getallModule()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Course Type", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.courseType ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("CourseTypeName List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallModule()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          courseType: res?.courseType ?? "-",
        }));
        const header1 = ["courseType"];
        const header2 = ["Course Type"];
        ExportCsvService.downloadCsv(list, "courseTypeList", "Course Type List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
     
         
            {/* <Mastersidebar /> */}
        
        
            {/* <div className="content-header bg-light shadow-sm sticky-top">
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
                        <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                          <button className="btn btn-primary" style={{ fontSize: '14px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                          <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div className="offcanvas-header">
                              <h5 id="offcanvasRightLabel">Filter BY Course Type</h5>
                              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                              <form onSubmit={filterModuleList}>
                                <div>
                                  <div className="mb-3">
                                    <label htmlFor="courseType" className="form-label">Course Type</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="courseType"
                                      name="courseType"
                                      value={inputs.courseType}
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
                      
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="container-fluid ">
              <div className='row'>
               {/* <div className='col-md-4'>
               <div className="card rounded-1 border-0 shadow-sm">
                  <div className="card-header border-0 bg-white">
                    <h5 className="card-title fw-semibold" >{isEditing ? "Edit Course Type" : "Add Course Type"}</h5>
                 
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="courseType" className="form-label">Course Type</label>
                        <input
                          type="text"
                          className="form-control"
                          id="courseType"
                          name="courseType"
                          value={inputs.courseType}
                          onChange={handleInputs}
                        />
                        {submitted && errors.courseType.required && (
                          <div className="text-danger">Course Type is required</div>
                        )}
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">{isEditing ? "Update" : "Add"}</button>
                      </div>
                    </form>
                  </div>
                </div>
                
                </div>  */}
               <div className='col-md-12'>
               <div className="card rounded-1 border-0 shadow-sm">
                <div className="card-header d-flex align-items-center" style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                  <h3 className="card-title flex-grow-1">Course Types</h3>
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
                          data-bs-target="#addCountryModal"
                          onClick={() => { handleAddModule () }}
                        >
                       Add CourseType
                        </button>
                </div>
                <div className="card-body">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                        <th style={{ width: "10px" }}>S.No</th>
                        <th className='text-center'>Course Type</th>
                        <th style={{ width: "40px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleList.length > 0 ? (
                        moduleList.map((data, index) => (
                          <tr key={index} style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                            <td>{pagination.from + index + 1}</td>
                            <td className='text-center'>{data.courseType}</td>
                            <td>
                            <button
                                className="btn btn-primary btn-sm "
                                data-bs-toggle="modal"
                                data-bs-target="#addCountryModal"
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
                            No Course Types Found
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
            <div className="modal fade" id="addCountryModal" tabIndex={-1} aria-labelledby="addCountryModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addCountryModalLabel">{isEditing ? "Edit Course Type" : "Add Course Type"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="courseType" className="form-label">Course Type</label>
                        <input
                          type="text"
                          className="form-control"
                          id="courseType"
                          name="courseType"
                          value={inputs.courseType}
                          onChange={handleInputs}
                        />
                        {submitted && errors.courseType.required && (
                          <div className="text-danger">Course Type is required</div>
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
  );
}
