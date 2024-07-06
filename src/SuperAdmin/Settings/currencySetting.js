import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination } from "@mui/material";
import { saveCurrency, getFilterCurrency, getallCurrency, deleteCurrency,updateCurrency } from '../../api/currency';
import { toast } from 'react-toastify';
import {getallCountry} from "../../api/globalsettings";
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import Flags from 'react-world-flags';
import { templatePdf } from "../../Utils/PdfMake";

export default function GlobalSettings() {
  const initialStateInputs = {
   country: "",
    flag: "",
    currency: "",
  };
  
  const initialStateErrors = {
    country: { required: false },
   flag: { required: false },
    currency: { required: false },
  };

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [inputs, setInputs] = useState(initialStateInputs);
  const [filter, setFilter] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // Track the id of the item being edited
 
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
  const [currency, setCurrency] = useState([]);
  const [country, setCountry] = useState([]);

  const modalRef = useRef(null);


  useEffect(() => {
    
    getAllCountryDetails();
  }, [pagination.from, pagination.to]);

  const getAllCountryDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getallCountry(data)
      .then((res) => {
        console.log(res);
        setCountry(res?.data?.result);
        setPagination({
          ...pagination,
          count: res?.data?.result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.country) {
      error.country.required = true;
    }
   
    if (!data.currency) {
        error.currency.required = true;
      }
    return error;
  };

  useEffect(() => {
    getAllCurrencyDetails();
  }, [pagination.from, pagination.to]);

  const getAllCurrencyDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterCurrency(data)
      .then((res) => {
        setCurrency(res?.data?.result?.currencyList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.currencyCount || 0,
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

  const deleteCurrencyData = () => {
    deleteCurrency(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllCurrencyDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

  const filterCurrencyList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      country: inputs.country,
      flag: inputs.flag,
      currency: inputs.currency,
      limit: pageSize,
      page: pagination.from,
    };
    getFilterCurrency(data)
      .then((res) => {
        setCurrency(res?.data?.result?.currencyList || []);
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
    getAllCurrencyDetails();
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
      const data = {
        ...inputs,
        _id: editId, // If editing, include the ID in the data
      };

      if (isEdit) {
        updateCurrency(data)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllCurrencyDetails();
            closePopup();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else {
        saveCurrency(inputs)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllCurrencyDetails();
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
    getallCurrency()
      .then((res) => {
        const result = res?.data?.result || [];
        const tablebody = [
          [
            { text: "S.NO", fontSize: 11, alignment: "center", margin: [5, 5], bold: true },
            { text: "Country Name", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
            { text: "Flag", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
            { text: "Currency", fontSize: 11, alignment: "center", margin: [20, 5], bold: true },
          ],
        ];
        result.forEach((element, index) => {
          tablebody.push([
            { text: index + 1, fontSize: 10, alignment: "left", margin: [5, 3], border: [true, false, true, true] },
            { text: element?.country ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            { text: element?.flag ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
            { text: element?.currency ?? "-", fontSize: 10, alignment: "left", margin: [5, 3] },
          ]);
        });
        templatePdf("Currency List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    getallCurrency()
      .then((res) => {
        const result = res?.data?.result || [];
        const list = result.map((res) => ({
          country: res?.country ?? "-",
         flag: res?.flag?? "-",
         currency: res?.currency?? "-",

        }));
        const header1 = ["country", "flag", "currency"];
        const header2 = ["Country", "Flag", "Currency"];
        ExportCsvService.downloadCsv(list, "CurrencyList", "Currency List", header1, header2);
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
                          <h5 id="offcanvasRightLabel">Filter BY Currency</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                          <form onSubmit={filterCurrencyList}>
                            <div>
                              <div className="mb-3">
                                <label htmlFor="intakeName" className="form-label">Intake Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="startDate"
                                  name="country"
                                  value={inputs.country}
                                  onChange={handleInputs}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="startDate1" className="form-label">Start Date</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="startDate1"
                                  name="flag"
                                  value={inputs.flag}
                           
                                  onChange={handleInputs}
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">End Date</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="endDate"
                                  name="currency"
                                  value={inputs.currency}
                           
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
                      data-bs-target="#addPopularModal5"
                      onClick={() => { handleAddModule() }}
                    >
                      Add Currency
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
              <h3 className="card-title flex-grow-1">Intake List</h3>
            </div>
            <div className="card-body">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                    <th style={{ width: "10px" }}>S.No</th>
                    <th>Country</th>
                    <th>Flag</th>
                    <th>Currency</th>
                    <th style={{ width: "40px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currency.length > 0 ? (
                   currency.map((data, index) => (
                      <tr key={index}  style={{backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                        <td>{pagination.from + index + 1}</td>
                        <td>{data.country}</td>
                        <td><Flags code={data.flag} className="me-2" name="flag" style={{ width: '40px', height: '30px' }} /></td>

                        <td>{data.currency}</td>
                        <td>
                       
                          <button
                            className="btn btn-danger btn-sm m-2"
                            type="button"
                            onClick={() => openPopup(data._id)}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          >
                           <i className="icon-trash"></i> 
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
            <div>Are you sure you want to delete this currency?</div>
            <div className="text-end mt-3">
              <button
                className="btn btn-secondary me-2"
                onClick={closePopup}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteCurrencyData}
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="modal fade" id="addPopularModal5" tabIndex="-1" aria-labelledby="addModalLabelCurrency" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabelCurrency">{isEdit ? "Edit Currency" : "Add Currency"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">

<label style={{ color: "#231F20" }}>
  {" "}
Country Name<span className="text-danger">*</span>
</label>
<select onChange={handleInputs} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select rounded-2 p-2 " name='country'>
  <option value={""}  >Select Country</option>
  {country.map((country, index) =>
          Array.isArray(country.country) && country.country.map((countryName, countryIndex) => (
  
    
       <option key={`${index}-${countryIndex}`} value={countryName}> {countryName}</option>
     ))
  )}
</select>
{errors.country.required ? (
  <div className="text-danger form-text">
    This field is required.
  </div>
) : null}
</div>
                <div className="mb-3">
                  <label htmlFor="text" className="form-label">Flag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="flag"
                    name="flag"
                    value={inputs.flag}
                    onChange={handleInputs}
                  />
                 
                </div>
                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="currency"
                    name="currency"
                    value={inputs.currency}
                    onChange={handleInputs}
                  />
                  {submitted && errors.currency.required && (
                    <span className="text-danger">currency is required</span>
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
