
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveCategories, getFilterCategories, getallCategories, deleteCategories, getSingleAllCategories, updateCategories } from '../../../api/universityModule/categories';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { bootstrap } from "bootstrap/dist/js/bootstrap.bundle.min";
export default function GlobalSettings() {
  const initialStateInputs = {
    popularCategories: "",
  };

  const initialStateErrors = {
    popularCategories: { required: false },
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

    if (!data.popularCategories) {
      error.popularCategories.required = true;
    }

    return error;
  };

  useEffect(() => {
    getAllModuleDetails();
    getModuleDetails()
  }, [pagination.from, pagination.to]);


  const getModuleDetails = () => {
    const data = {
      popularCategories: inputs.popularCategories,

    }
    getSingleAllCategories(data)
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
    getFilterCategories(data)
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
    deleteCategories(deleteId)
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
      popularCategories: inputs.popularCategories,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterCategories(data)
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

      if (isEditing) {
        updateCategories(data)
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
        saveCategories(inputs)
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
    getallCategories()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Popular Categories", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.popularCategories ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("PopularCategories List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallCategories()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          popularCategories: res?.popularCategories ?? "-",
        }));
        const header1 = ["popularCategories"];
        const header2 = ["Popular Categories"];
        ExportCsvService.downloadCsv(list, "Popular Categories", "Popular Categories List", header1, header2);
      })
      .catch((err) => {
        console.log(err);
      });
  };








  return (
    <div>
      <div className="col-md-12">
        <div className="">
          <div className="card rounded-0 border-0">
            <div className="card-body">

              <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                <li className="flex-grow-1">
                  <div className="input-group" style={{ maxWidth: "600px", fontSize: "14px" }}>
                    <h1 className="fw-bold text-capitalizee" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '15px' }}>Popular Catgories</h1>


                  </div>
                </li>
                <li className="m-2">
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
                    <button className="btn btn-primary" style={{ fontSize: '12px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Filter  Popular Categories</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                      </div>
                      <div className="offcanvas-body ">
                        <form>
                          <div className="from-group mb-3">
                            <label className="form-label">Popular Categories</label>
                            <br />
                            <input
                              type="text"
                              className="form-control"
                              name="popularCategories"
                              onChange={handleInputs}
                              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              placeholder="Search...Popular Categories"
                            />

                          </div>
                          <div>
                            <button
                              data-bs-dismiss="offcanvas"
                              className="btn btn-cancel border-0  px-4 py-2 text-uppercase fw-semibold text-white float-right bg"
                              style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              onClick={resetFilter}
                            >
                              Reset
                            </button>
                            <button
                              data-bs-dismiss="offcanvas"
                              type="submit"
                              className="btn btn-save  border-0  px-4 py-2 text-uppercase fw-semibold text-white float-right mx-2"
                              onClick={filterModuleList}
                              style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                    <button style={{ backgroundColor: "#E12929", fontSize: '12px' }} className="btn text-white ">
                      <span>
                        <i className="fa fa-file-pdf" aria-hidden="true"></i>
                      </span>
                    </button>
                  </Link>
                </li>
                <li className="m-2">
                  <Link onClick={exportCsv} class="btn-filters">
                    <span>
                      <button style={{ backgroundColor: "#22A033", fontSize: '12px' }} className="btn text-white ">
                        <i className="fa fa-file-excel" aria-hidden="true"></i>
                      </button>
                    </span>
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <button
                    className="btn text-white text-center fw-semibold text-uppercase px-4 rounded-1 py-2"
                    style={{
                      backgroundColor: "#fe5722",
                      border: "none",
                    
                      fontSize: "12px",
                      margin: "1px"
                    }}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#addPopularModal"
                    onClick={() => { handleAddModule() }}
                  >
                   <i class="fa fa-plus-circle" aria-hidden="true"></i> &nbsp; Add 
                  </button>
                </li>
              </ol>

              <div className="card-body">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                      <th className='text-start text-capitalize'  style={{ width: "10px" }}>S.No</th>
                      <th className='text-start text-capitalize'>Popular Categories</th>
                      <th className='text-start text-capitalize'  style={{ width: "40px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleList.length > 0 ? (
                      moduleList.map((data, index) => (
                        <tr key={index} style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                          <td className='text-start text-capitalize'>{pagination.from + index + 1}</td>
                          <td className='text-start text-capitalize'>{data.popularCategories}</td>
                          <td className='text-start text-capitalize'>
                            <button
                              className="btn btn-white  text-center "
                              style={{
                              
                              
                                fontSize: "12px",
                                
                              }}
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#addPopularModal"
                              onClick={() => { handleEditModule(data) }}
                            >
                              <i class="fa fa-edit text-primary" aria-hidden="true"></i>
                            </button>
                            <button
                              className="btn btn-white  btn-sm"
                              onClick={() => openPopup(data._id)}
                              style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                            >
                              <i class="fa fa-trash text-danger" aria-hidden="true"></i>
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
              <div className="float-right my-2">
            <Pagination
              count={Math.ceil(pagination.count / pageSize)}
              onChange={handlePageChange}
              style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
              variant="outlined"
              shape="rounded"
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
          <div>Are you sure you want to delete this status?</div>
          <div className="text-end mt-3">
            <button
              className="btn btn-danger px-3 py-2 text-uppercase fw-semibold text-white rounded-pill me-2"
              onClick={closePopup}
              style={{fontSize:'10px'}}
            >
             No
            </button>
            <button
              className="btn btn-success px-3 py-2 text-uppercase fw-semibold text-white rounded-pill"
              onClick={deleteModuleData}
              style={{fontSize:'10px'}}

            >
             Yes
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="modal fade" id="addPopularModal" tabIndex={-1} aria-labelledby="addPopularModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-uppercase fw-semibold" id="addPopularModalLabel">{isEditing ? "Edit " : "Add "}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="popularCategories" className="form-label">Popular Categories</label>
                  <input
                    type="text"
                    className="form-control"
                    id="popularCategories"
                    name="popularCategories"
                    value={inputs.popularCategories}
                    onChange={handleInputs}
                  />
                  {submitted && errors.popularCategories.required && (
                    <div className="text-danger">Popular Catageries is required</div>
                  )}
                </div>
                <div className="text-end">
                  <button type="submit" className="btn text-uppercase fw-semibold text-white px-3 py-2" style={{fontSize:'12px',backgroundColor:'#fe5722',color:'#fff'}} data-bs-dismiss="modal">{isEditing ? "Update" : "Add"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
