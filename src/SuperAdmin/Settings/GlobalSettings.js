
import Mastersidebar from '.././../compoents/sidebar'
import { FaFilter } from "react-icons/fa";
import { Button } from "reactstrap";
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import CountryRegion from "countryregionjs";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, backdropClasses, radioClasses, } from "@mui/material";

export default function GlobalSettings() {



  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [lga, setLGA] = useState("");
  const [lgas, setLGAs] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors)


  const ZERO = 0;
  let countryRegion = null;
  const getCountryRegionInstance = () => {
    if (!countryRegion) {
      countryRegion = new CountryRegion();
    }
    return countryRegion;
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
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

  useEffect(() => {
    const getStates = async () => {
      try {
        const states = await getCountryRegionInstance().getStates(country);
        setStates(states.map(userState => ({
          value: userState?.id,
          label: userState?.name
        })));
      } catch (error) {
        console.error(error);
      }
    }
    if (country) {
      getStates();
    }
  }, [country]);

  useEffect(() => {
    const getLGAs = async () => {
      try {
        const lgas = await getCountryRegionInstance().getLGAs(country, state);
        setLGAs(lgas?.map(lga => ({
          value: lga?.id,
          label: lga?.name
        })));
      } catch (error) {
        console.error(error);
      }
    }
    if (state) {
      getLGAs();
    }
  }, [country, state]);

  const handleCountryChange = (event) => {
    const { value } = event;
    setCountry(value);
  };

  const handleStateChange = (event) => {
    const { value } = event;
    setState(value);
  };

  const handleLGAChange = (event) => {
    const { value } = event;
    setLGA(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(country);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveProgram({
        ...country,
        country:countries ,
       state: states,
        lga: lgas,
      })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Programs");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'border: 1.4783px solid rgba(11, 70, 84, 0.25)',
      borderRadius: '5.91319px',
      fontSize: "1.5rem",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? '#3B0051' : '#F2CCFF',
      ':hover': {
        color: 'black'
      }
    })
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
                  {/* <li className="flex-grow-1">
                    <inputz
                      type="search"
                      placeholder="Search"
                      aria-describedby="button-addon3"
                      className="form-control-lg bg-light border-2  ps-1 rounded-4 w-100"
                      style={{ maxWidth: "600px", marginLeft: "0px" }}
                    />
                  </li> */}
                  <li className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "600px" }}>
                      <input
                        type="search"
                        placeholder="Search"
                        aria-describedby="button-addon3"
                        className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                        style={{
                          borderColor: "#FE5722",
                          paddingRight: "1.5rem",
                          marginLeft: "0px",
                          fontSize: "14px"
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
                  <li class="m-2">


                    <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"> <FaFilter /></button>
                      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter BY University</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <div className="offcanvas-body ">
                          <form>
                            <div className="from-group mb-3">
                              <label className="form-label">University Name</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="universityName"

                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Search...University Name"
                              />
                              <label className="form-label">Campus</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="campus"

                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Search...Campus"
                              />
                              <label className="form-label">Average Fees</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="averageFees"

                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Search...Average Fees"
                              />
                              <label className="form-label">Country</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="country"

                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Search...Country"
                              />

                              <label className="form-label">Popular Categories</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="popularCategories"

                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Search...Country"
                              />
                            </div>
                            <div>
                              <button

                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border text-white float-right bg"
                                style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}

                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"

                                className="btn btn-save border text-white float-right mx-2"
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
                  <li class="m-2">

                    <button style={{ backgroundColor: "#E12929" }} className="btn text-white ">
                      <span>
                        <i class="fa fa-file-pdf" aria-hidden="true"></i>
                      </span>
                    </button>

                  </li>
                  <li class="m-2">

                    <span>
                      <button style={{ backgroundColor: "#22A033" }} className="btn text-white ">
                        <i class="fa fa-file-excel" aria-hidden="true"></i>
                      </button>
                    </span>

                  </li>

                  <li class="m-2">

                    <span>
                      <button
                        style={{ backgroundColor: "#9265cc" }}
                        className="btn text-white "
                      >
                        <i class="fa fa fa-upload" aria-hidden="true"></i>
                      </button>
                    </span>

                  </li>
                  <li class="m-2">
                    <Link onClick={openFilterPopup} class="btn-filters">
                      <span>
                        <button style={{ backgroundColor: "#22A033" }} className="btn text-white ">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  {/* <li class="m-2">
                      
                        <button
                          className="btn btn-outline border text-white  "

                          style={{ backgroundColor: "#9265cc", fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                         onClick={ }
                        </button>
                      
                    </li> */}

                </ol>


              </div>
            </div>
          </div>
        </div>


        <div class="container mt-5">
          <div class="row">
            <div class="col-12">
              <div class="app-content">
                <div class="card">
                  <div class="card-body">
                    <ul class="list-group list-group-flush">
                      <h4 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>Country List</h4>
                      <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-bold">UK</div>
                        </div>
                        <div class="d-flex gap-2">
                          <button class="btn border-0 rounded-3 btn-success">Edit</button>
                          <button class="btn border-0 rounded-3 btn-danger ms-2">Delete</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Add Country
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form className="submain-one-form" onSubmit={handleSubmit}>
            <header className="submain-one-form-header">

            </header>
            <section className="submain-one-form-body jusify-content-center">
              <section className="submain-one-form-body-subsection col-md-6 form-group">
                <Select
                  type="text"
                  placeholder="Select a country"
                  id="name"
                  onChange={handleCountryChange}
                  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                  options={countries}
                  styles={customStyles}

                />
              </section>
              <section className="submain-one-form-body-subsection col-md-6">
                {
                  states?.length !== ZERO &&
                  <Select
                    placeholder="Select a state"
                    id="name"
                    onChange={handleStateChange}
                    style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                    options={states}
                    styles={customStyles}


                  />}
              </section>
              <br />
              <section className="submain-one-form-body-subsection col-md-6">
                {
                  lgas && lgas?.length !== ZERO &&
                  <Select
                    placeholder="Select a Substate"
                    id="name"
                    onChange={handleLGAChange}
                    options={lgas}
                    style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                    styles={customStyles}

                  />}
              </section>
              {
                !true && lga
              }
              <br />
              <section className="subdomain-one-form-body-subsection-one form-group col-md-3">
                <button className=" jusify-content-center btn btn-primary col-md-12" type='submit' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Submit</button>
              </section>
            </section>
          </form>
        </DialogContent>
      </Dialog>

    </div>



  )

}

