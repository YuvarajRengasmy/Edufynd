import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, backdropClasses, radioClasses, } from "@mui/material";
import { saveCountryModule, getFilterCountryModule,getallCountryModule,  deleteCountryModule } from '../../api/universityModule/country';
import { getallCountryList,getFilterCountryList } from "../../api/country";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import Select from 'react-select';

 function GlobalSettings() {

  const initialStateInputs = {
    country: "",
  };
  const initialStateErrors = {
    country: {
      required: false}
  
  };

 
  const [open, setOpen] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [countries, setCountries] = useState([]);
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
  
  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.country.length === 0) {
      error.country = "Country is required";
    }
    return error;
  };

  useEffect(() => {
    getAllCountryListDetails();
    getAllCountryDetails();
  }, [pagination.from, pagination.to]);

  const getAllCountryListDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getallCountryList(data)
      .then((res) => {
        console.log(res);
        setCountryList(res?.data?.result);
        setPagination({
          ...pagination,
          count: res?.data?.result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCountryDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterCountryModule(data)
      .then((res) => {
        console.log(res);
        setCountries(res?.data?.result?.countryList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.countryCount,
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

  const deleteCountryData = () => {
    deleteCountryModule(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllCountryDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

 

  const filterCountryList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      country: inputs.country,
      limit: 10,
      page: pagination.from,
    };
    getFilterCountryModule(data)
      .then((res) => {
        setCountryList(res?.data?.result?.countryList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.countryCount,
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
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setInputs({ ...inputs, [name]: values });
  };
  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllCountryDetails();
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
      saveCountryModule(inputs)
        .then((res) => {
          if (res && res.data && res.data.success) {
            toast.success(res.data.message);
            navigate("/GlobalSettings");
            closeFilterPopup();
          } else {
            toast.error("Failed to save data.");
          }
        })
        .catch((err) => {
          console.error("Error saving country:", err);
          toast.error("Failed to save data.");
        });
    }
  };

  const countryOptions = countryList.map((data) => ({
    value: data.name,
    label: data.name,
  }));

  const pdfDownload = (event) => {
    event?.preventDefault();

    getallCountryModule(countryList)
      .then((res) => {
        var result = res?.data?.result;
        var tablebody = [];
        tablebody.push([
          {
            text: "S.NO",
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          },
          {
            text: "Country Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          

        ]);
        result.forEach((element, index) => {
          tablebody.push([
            {
              text: index + 1,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
              border: [true, false, true, true],
            },
           
            {
              text: element?.country ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

          ]);
        });
        templatePdf("Country List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();

    getallCountryModule(countryList)
      .then((res) => {
        var result = res?.data?.result;
        let list = [];
        result?.forEach((res) => {
          list.push({
            country: res?.country ?? "-",

          });
        });
        let header1 = [
          "country",

        ];
        let header2 = [
          "Country",
        ];
        ExportCsvService.downloadCsv(
          list,
          "countryList",
          "Country List",

          header1,
          header2
        );

      })
      .catch((err) => {
        console.log(err);
      });
  };










  return (
    <div>
   
      
           <Mastersidebar />
          
      
     
      <div className="content-wrapper " style={{ fontSize: '14px' }}>



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
                          fontSize: "12px", // Keep the font size if it's correct
                          height: "11px", // Set the height to 11px
                          padding: "0px" // Adjust padding to fit the height
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
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                      <button className="btn btn-primary" style={{ fontSize: '11px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter Country</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body ">
                          <form>
                            <div className="from-group mb-3">
                              <label className="form-label">Country</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="country"
                                onChange={handleInputs}
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Search...Country"
                              />
                             
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 text-uppercase fw-semibold px-4 py-2 text-white float-right bg"
                                style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                className="btn btn-save  border-0 text-uppercase fw-semibold px-4 py-2 text-white float-right mx-2"
                                onClick={filterCountryList}
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
                  
                  <li className="m-2">
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                      {/* <button className="btn btn-primary" style={{ fontSize: '11px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2" aria-controls="offcanvasRight"><MdOutlineAdd /></button> */}
                      {/* <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight2" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel1">Add Country</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body ">
                          <form onSubmit={handleSubmit}>
                            <div className="from-group mb-3">
                              <label className="form-label">Country</label>
                              <br />
                              <Select
            type="text"
            placeholder="Select a country"
            id="name"
            isMulti
            name='country'
            onChange={handleSelectChange}
            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
             options={countryOptions}
            
          />
                             
                            </div>
                            <div>
                              <button
                              
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 text-uppercase fw-semibold px-4 py-2 text-white float-right bg"
                                style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                               
                              >
                               cancel
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                className="btn btn-save  border-0 text-uppercase fw-semibold px-4 py-2 text-white float-right mx-2"
                              
                                style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div> */}
                    </div>
                  </li>
                </ol>
              </div>


          <div className="container mt-4">
            <div className="row ">
              <div className='col-md-4' >
              <div className="card  border- rounded-1 shadow-sm" >
                        <div className="card-header bg-white border-0">
                          <h5 className='card-title fw-semibold'>Add Country</h5>
                         
                        </div>
                        <div className="card-body ">
                          <form onSubmit={handleSubmit}>
                            <div className="from-group mb-3">
                              <label className="form-label">Country</label>
                              <br />
                              <Select
            type="text"
            placeholder="Select a country"
            id="name"
            isMulti
            name='country'
            onChange={handleSelectChange}
            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
             options={countryOptions}
            
          />
                             
                            </div>
                            <div>
                              <button
                              
                             
                                className="btn btn-cancel border-0  fw-semibold rounded-1 text-white float-right bg"
                                style={{ backgroundColor: "#231f20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                               
                              >
                               Cancel
                              </button>
                              <button
                              
                                type="submit"
                                className="btn btn-save  border-0  fw-semibold rounded-1 text-white float-right mx-2"
                              
                                style={{ backgroundColor: "#fe5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
            </div>
            <div className='col-md-8' >
           
                
                <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
              <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
              <h6 className='text-center text-capitalize p-1'> List Country</h6>
              </div>
              <div className="card-body mt-5">
  
                        
                         
  
  
        <ul className="list-group list-group-flush  ">
                        {countries.map((country, index) =>
            Array.isArray(country.country) && country.country.map((countryName, countryIndex) => (
    
        <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-start" key={`${index}-${countryIndex}`}>
          <div className="ms-2 me-auto">
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>{countryName}</div>
          </div>
          <div className="d-flex gap-2">
           
            <button
              className="dropdown-item"
              onClick={() => openPopup(countryName)}
            >
              <i className="far fa-trash-alt text-danger me-1"></i>
            </button>
          </div>
        </li>
       ))
    )}
           </ul> 
  
                       
                      
  
  
  
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
         
        </div>
        <div >
          
           
        
        </div>

      </div>

      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4"  >
            <h5 className="mb-4" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
              Are you sure you want to Delete <br /> the selected Country ?
            </h5>
            <button
              type="button"
              className="btn btn-success btn-sm text-uppercase fw-semibold px-4 py-2 rounded-pill mx-3"
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              onClick={deleteCountryData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm text-uppercase fw-semibold px-4 py-2 rounded-pill"
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              onClick={closePopup}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog 
  open={openFilter} 
  fullWidth 
 
  
>
  <DialogTitle>
    Add Country
    <IconButton className="float-right" onClick={closeFilterPopup}>
      <i className="fa fa-times fa-xs" aria-hidden="true"></i>
    </IconButton>
  </DialogTitle>
  <DialogContent>
   <div className="card-body Col-md-12">
    <form  onSubmit={handleSubmit}>
      <section className="  justify-content-center">
        <section className=" col-md-6 form-group">
         
         
        </section>
        
        <br />
        <section className=" form-group col-md-3">
          <button className="justify-content-center btn btn-primary col-md-12" type='submit' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Submit</button>
        </section>
      </section>
    </form>
    </div>
  </DialogContent>
</Dialog>



  
    </div>
  );
}
export default GlobalSettings;