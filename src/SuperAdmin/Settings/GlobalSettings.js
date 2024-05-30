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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState("");
  const [lgas, setLGAs] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [inputs, setInputs] = useState(false);
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

    if (!data.country) {
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

  // useEffect(() => {
  //   const getStates = async () => {
  //     try {
  //       const states = await getCountryRegionInstance().getStates(selectedCountry);
  //       setStates(states.map(userState => ({
  //         value: userState?.id,
  //         label: userState?.name
  //       })));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   if (selectedCountry) {
  //     getStates();
  //   }
  // }, [selectedCountry]);

  // useEffect(() => {
  //   const getLGAs = async () => {
  //     try {
  //       const lgas = await getCountryRegionInstance().getLGAs(selectedCountry, selectedState);
  //       setLGAs(lgas?.map(lga => ({
  //         value: lga?.id,
  //         label: lga?.name
  //       })));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   if (selectedState) {
  //     getLGAs();
  //   }
  // }, [selectedCountry, selectedState]);
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
    setSelectedState("");
    setSelectedLGA("");
  };

  // const handleStateChange = (selectedOption) => {
  //   setSelectedState(selectedOption.value);
  //   setSelectedLGA("");
  // };

  // const handleLGAChange = (selectedOption) => {
  //   setSelectedLGA(selectedOption.value);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation({ country: selectedCountry, state: selectedState, lga: selectedLGA });
    setErrors(newError);
    setSubmitted(true);

    const allInputsValid = Object.values(newError).every(x => x === "");
    if (allInputsValid) {
      // Retrieve country name based on its ID
      const countryName = countries.find(country => country.value === selectedCountry)?.label;

      // Retrieve state names based on their IDs
      // const selectedStateLabels = Array.isArray(selectedState) ? selectedState.map(stateId => states.find(state => state.value === stateId)?.label) : [];

      // // Retrieve LGA names based on their IDs
      // const selectedLGALabels = Array.isArray(selectedLGA) ? selectedLGA.map(lgaId => lgas.find(lga => lga.value === lgaId)?.label) : [];

      // Save data to the backend
      saveCountry({
        country: countryName,
        // states: selectedStateLabels,
        // lgas: selectedLGALabels,
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
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const newError = handleValidation({ country: selectedCountry, state: selectedState, lga: selectedLGA });
  //   setErrors(newError);
  //   setSubmitted(true);

  //   const allInputsValid = Object.values(newError).every(x => x === "");
  //   if (allInputsValid) {
  //     // Retrieve country, state, and LGA names based on their IDs
  //     const countryName = countries.find(country => country.value === selectedCountry)?.label;
  //     const stateName = states.find(state => state.value === selectedState)?.label;
  //     const lgaName = lgas.find(lga => lga.value === selectedLGA)?.label;

  //     saveCountry({
  //       country: countryName,
  //       state: stateName,
  //       lga: lgaName,
  //     })
  //     .then((res) => {
  //       toast.success(res?.data?.message);
  //       navigate("/GlobalSettings");
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message);
  //     });
  //   }
  // };

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
      <div className="">
        <Mastersidebar />
      </div>
      <div className="content-wrapper" style={{ backgroundColor: '#fff' }}>
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
                          <h5 id="offcanvasRightLabel">Filter BY Country</h5>
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

                        {country?.map((data, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', }}>{data?.country}</div>
                            </div>
                            <div className="d-flex gap-2">
                            
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  openPopup(data?._id);
                                }}
                              >
                                <i className="far fa-trash-alt text-danger me-1"></i>
                              </button>

                            </div>
                          </li>
                        ))}
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
  <DialogContent style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
   <div className="card-body Col-md-12">
    <form  onSubmit={handleSubmit}>
      <section className="  justify-content-center">
        <section className=" col-md-6 form-group">
          <Select
            type="text"
            placeholder="Select a country"
            id="name"
            name='country'
            onChange={handleCountryChange}
            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
            options={countries}
            styles={customStyles}
          />
          {errors.country && <span className="text-danger">{errors.country}</span>}
        </section>
        {/* 
        <section className="submain-one-form-body-subsection col-md-6">
          {states.length !== ZERO &&
            <Select
              placeholder="Select a state"
              id="name"
              name='state'
              onChange={handleStateChange}
              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              options={states}
              isMulti
              styles={customStyles}
            />
          }
        </section>
        <br />
        <section className="submain-one-form-body-subsection col-md-6">
          {lgas && lgas.length !== ZERO &&
            <Select
              placeholder="Select a Substate"
              id="name"
              name='lga'
              onChange={handleLGAChange}
              options={lgas}
              isMulti
              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
              styles={customStyles}
            />
          }
        </section> 
        */}
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
