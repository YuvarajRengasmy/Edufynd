
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveModule, getFilterModule, getallInstitutionModule, deleteModule, getSingleAllModule, updateModule } from '../../../api/universityModule/institutation';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { bootstrap } from "bootstrap/dist/js/bootstrap.bundle.min";
export default function GlobalSettings() {
  const initialStateInputs = {
    institutionType: "",
  };

  const initialStateErrors = {
    institutionType: { required: false },
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

    if (!data.institutionType) {
      error.institutionType.required = true;
    }

    return error;
  };

  useEffect(() => {
    getAllModuleDetails();
    getModuleDetails()
  }, [pagination.from, pagination.to]);


  const getModuleDetails = () => {
    const data = {
      institutionType: inputs.institutionType,

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
      institutionType: inputs.institutionType,
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
    setInputs(initialStateInputs)
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
    getallInstitutionModule()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "InstitutionType", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.institutionType ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("InstitutionType List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallInstitutionModule()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          institutionType: res?.institutionType ?? "-",
        }));
        const header1 = ["institutionType"];
        const header2 = ["InstitutionType"];
        ExportCsvService.downloadCsv(list, "institutionType", "Institution Type List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };








  return (
    <div>
      <div className="col-md-12">
        <div className="">
          <div className="card">
            <div className="card-body">

              <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                <li className="flex-grow-1">
                  <div className="input-group" style={{ maxWidth: "600px", fontSize: "14px" }}>
                    <h1 className="text-bold" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '15px' }}>Institution Type</h1>


                  </div>
                </li>
                <li className="m-2">
                  <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                    <button className="btn btn-primary" style={{ fontSize: '11px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight3" aria-controls="offcanvasRight"> <FaFilter /></button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight3" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Filter BY InstitutionType</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                      </div>
                      <div className="offcanvas-body ">
                        <form>
                          <div className="from-group mb-3">
                            <label className="form-label">Institution Type</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="institutionType"
                              onChange={handleInputs}
                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...institutionType"
                            />

                          </div>
                          <div>
                            <button
                              data-bs-dismiss="offcanvas"
                              className="btn btn-cancel border text-white float-right bg"
                              style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                              onClick={resetFilter}
                            >
                              Reset
                            </button>
                            <button
                              data-bs-dismiss="offcanvas"
                              type="submit"
                              className="btn btn-save border text-white float-right mx-2"
                              onClick={filterModuleList}
                              style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                            >
                              Apply
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="m-2">
                  <Link onClick={pdfDownload}>
                    <button style={{ backgroundColor: "#E12929", fontSize: '11px' }} className="btn text-white ">
                      <span>
                        <i className="fa fa-file-pdf" aria-hidden="true"></i>
                      </span>
                    </button>
                  </Link>
                </li>
                <li className="m-2">
                  <Link onClick={exportCsv} class="btn-filters">
                    <span>
                      <button style={{ backgroundColor: "#22A033", fontSize: '11px' }} className="btn text-white ">
                        <i className="fa fa-file-excel" aria-hidden="true"></i>
                      </button>
                    </span>
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <button
                    className="btn btn-primary text-white text-center rounded"
                    style={{
                      backgroundColor: "#3498DB",
                      border: "none",
                      fontFamily: "Poppins",
                      fontSize: "11px",
                      margin: "1px"
                    }}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#addPopularModal3"
                    onClick={() => { handleAddModule() }}
                  >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </li>
              </ol>

              <div className="card-body">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                      <th style={{ width: "10px" }}>S.No</th>
                      <th className='text-center'>Institution Type</th>
                      <th style={{ width: "40px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleList.length > 0 ? (
                      moduleList.map((data, index) => (
                        <tr key={index} style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                          <td>{pagination.from + index + 1}</td>
                          <td className='text-center'>{data.institutionType}</td>
                          <td>
                            <button
                              className="btn btn-white text-center "
                              style={{
                               
                                border: "none",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "11px",
                                margin: "1px"
                              }}
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#addPopularModal3"
                              onClick={() => { handleEditModule(data) }}
                            >
                              <i class="fa fa-edit" aria-hidden="true"></i>
                            </button>
                            <button
                              className="btn btn-white ml-3 btn-sm"
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
               
              </div>



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
              onClick={deleteModuleData}

            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="modal fade" id="addPopularModal3" tabIndex={-1} aria-labelledby="addPopularModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addPopularModalLabel">{isEditing ? "Edit " : "Add "}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="institutionType" className="form-label">Institution Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="institutionType"
                    name="institutionType"
                    value={inputs.institutionType}
                    onChange={handleInputs}
                  />
                  {submitted && errors.institutionType.required && (
                    <div className="text-danger">Institution Type is required</div>
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
