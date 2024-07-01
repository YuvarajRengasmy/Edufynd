import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, backdropClasses, radioClasses, } from "@mui/material";
import { saveCountry, getFilterCountry,getallCountry,  deleteCountry } from '../../api/globalsettings';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import Select from 'react-select';
import CountryRegion from "countryregionjs";
import zIndex from '@mui/material/styles/zIndex';

export default function GlobalSettings() {
  const initialStateInputs = {
    country: "",
    state: "",
    lga: "",
  };
  const initialStateErrors = {
    country: "",
    state: "",
    lga: "",
  };

  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState("");
  const [lgas, setLGAs] = useState([]);
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
  const [country, setCountry] = useState();
  let countryRegion = null;

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.country.length === 0) {
      error.country = "Country is required";
    }
    return error;
  };

  useEffect(() => {
    getAllCountryDetails();
  }, [pagination.from, pagination.to]);

  const getAllCountryDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterCountry(data)
      .then((res) => {
        console.log(res);
        setCountry(res?.data?.result?.countryList);
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
    deleteCountry(deleteId)
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

  const getCountryRegionInstance = () => {
    if (!countryRegion) {
      countryRegion = new CountryRegion();
    }
    return countryRegion;
  };

  const filterCountryList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      country: inputs.country,
      limit: 10,
      page: pagination.from,
    };
    getFilterCountry(data)
      .then((res) => {
        setCountry(res?.data?.result?.countryList);
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

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countries = await getCountryRegionInstance().getCountries();
        setCountries(countries.map(country => ({
          value: country.id,
          label: country.name
        })));
      } catch (error) {
        console.error(error);
      }
    }
    getCountries();
  }, []);

  const handleCountryChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedCountry(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation({ country: selectedCountry });
    setErrors(newError);
    setSubmitted(true);

    const allInputsValid = Object.values(newError).every(x => x === "");
    if (allInputsValid) {
      const selectedCountryNames = selectedCountry.map(countryId => {
        const country = countries.find(country => country.value === countryId);
        return country ? country.label : "";
      });

      saveCountry({
        country: selectedCountryNames,
      })
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1.4783px solid rgba(11, 70, 84, 0.25)',
      borderRadius: '5.91319px',
      fontSize: "14px",
      fontFamily: "Plus Jakarta Sans",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#3B0051' : '#F2CCFF',
      ':hover': {
        color: 'black',
        fontSize: "11px",
      }
    })
  };
  const pdfDownload = (event) => {
    event?.preventDefault();

    getallCountry(country)
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

    getallCountry(country)
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
    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className=" container-fluid">
        <nav className='navbar navbar-vertical navbar-expand-lg'> 
           <Mastersidebar />
           </nav>
      
     
      <div className="content-wrapper " style={{ backgroundColor: '#fff' }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row ">
              <div >
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
                    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}>
                      <button className="btn btn-primary" style={{ fontSize: '11px' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter  Country</h5>
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
                                onClick={filterCountryList}
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

                  <li className="m-2">
                    <Link onClick={openFilterPopup} className="btn-filters">
                      <span>
                        <button style={{ backgroundColor: "#9265cc", fontSize: '11px' }} className="btn text-white ">
                          <i className="fa " aria-hidden="true">AddCountry </i>
                        </button>
                      </span>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div >
          <div className="container   mt-3">
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <div className="card">
                    <div className="card-body">

                      <ol className="breadcrumb d-flex justify-content-start align-items-center w-100">
                        <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px', marginRight: '100px' }}>Country List</h4>


                      </ol>
                      <ul className="list-group list-group-flush">
  {Array.isArray(country) && country?.map((item, index) => {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
        <div className="ms-2 me-auto">
          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>{item.country}</div>
        </div>
        <div className="d-flex gap-2">
          {/* Uncomment the below button to enable edit functionality
          <button
            className="dropdown-item"
            onClick={() => editCountry(item)}
          >
            <i className="far fa-edit text-primary me-1"></i>
          </button>
          */}
          <button
            className="dropdown-item"
            onClick={() => deleteCountry(item)}
          >
            <i className="far fa-trash-alt text-danger me-1"></i>
          </button>
        </div>
      </li>
    );
  })}
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
          </div>
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
              className="btn btn-primary mx-3"
              style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              onClick={deleteCountryData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-info"
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
  <DialogContent style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',height:'400px' }} >
   <div className="card-body col-md-12 " >
    <form  onSubmit={handleSubmit}>
      <section className="  justify-content-center">
        <section className=" col-md-12 form-group">
          <Select
          className=''
            type="text"
            placeholder="Select a country"
            id="name"
            isMulti
            name='country'
            onChange={handleCountryChange}
            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}
            options={countries}
            styles={customStyles}
          />
         
        </section>
        
        <br />
        <section className=" form-group  text-center">
          <button className="justify-content-center btn btn-primary col-md-12 border-0" type='submit' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px',backgroundColor:'#fe5722',color:'#fff' }}>Submit</button>
        </section>
      </section>
    </form>
    </div>
  </DialogContent>
</Dialog>


</div>
    </div>
    </div>
  );
}
