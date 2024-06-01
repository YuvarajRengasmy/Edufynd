import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveIntake, getFilterIntake, getallIntake, deleteIntake } from '../../api/intake';
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
  const [editId, setEditId] = useState(null); // New state to store the ID of the intake being edited
  const modalRef = useRef(null);

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.intakeName) {
      error.intakeName.required = true; // Corrected this line
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

  const openEditPopup = (intake) => {
    setIsEdit(true);
    setEditId(intake._id);
    setInputs({
      intakeName: intake.intakeName,
      startDate: intake.startDate,
      endDate: intake.endDate,
    });
    const modalElement = document.getElementById("addCountryModal");
    if (modalElement) {
      const bootstrapModal = window.bootstrap.Modal.getOrCreateInstance(modalElement);
      bootstrapModal.show();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError).every((x) => !x.required);
    if (allInputsValid) {
      if (isEdit) {
        saveIntake({ ...inputs, id: editId }) // Pass the ID for updating
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
    event.preventDefault();
    getallIntake()
      .then((res) => {
        const result = res?.data?.result || [];
        const dataToExport = result.map((element) => ({
          intakeName: element?.intakeName ?? "-",
          startDate: element?.startDate ?? "-",
          endDate: element?.endDate ?? "-",
        }));
        ExportCsvService.exportCsv(dataToExport, "IntakeNameList");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid page-title-bar">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="page-title">Intake List</h1>
          </div>
          <div className="col-lg-6 text-end">
            <div className="d-inline">
              <button className="btn btn-secondary me-2" onClick={pdfDownload}>Export to PDF</button>
              <button className="btn btn-secondary" onClick={exportCsv}>Export to CSV</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCountryModal" onClick={() => setIsEdit(false)}>
                    Add Intake
                  </button>
                  <button className="btn btn-light text-primary" onClick={openFilterPopup}>
                    <FaFilter /> Filter
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Intake Name</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col" className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {intakeList.map((element, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{element.intakeName}</td>
                          <td>{element.startDate}</td>
                          <td>{element.endDate}</td>
                          <td className="text-end">
                            <button type="button" className="btn btn-link text-primary" onClick={() => openEditPopup(element)}>Edit</button>
                            <button type="button" className="btn btn-link text-danger" onClick={() => openPopup(element._id)} data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                          </td>
                        </tr>
                      ))}
                      {intakeList.length === 0 && (
                        <tr>
                          <td className="text-center" colSpan="5">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    page={Math.floor(pagination.from / pageSize) + 1}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this intake?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={deleteIntakeData} data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
      {/* Add/Edit Modal */}
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
      {/* Filter Modal */}
      <div className="modal fade" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">Filter</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={filterIntakeList} noValidate>
                <div className="mb-3">
                  <label htmlFor="filterIntakeName" className="form-label">Intake Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="filterIntakeName"
                    name="intakeName"
                    value={inputs.intakeName}
                    onChange={handleInputs}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="filterStartDate" className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="filterStartDate"
                    name="startDate"
                    value={inputs.startDate}
                    onChange={handleInputs}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="filterEndDate" className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="filterEndDate"
                    name="endDate"
                    value={inputs.endDate}
                    onChange={handleInputs}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Apply Filter</button>
                <button type="button" className="btn btn-secondary" onClick={resetFilter}>Reset</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
