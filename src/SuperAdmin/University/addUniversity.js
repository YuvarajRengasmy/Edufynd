import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidWebsite,
  isValidYear,
  isValidPinCode,
} from "../../Utils/Validation";
import { getallCountryModule } from "../../api/universityModule/country";
import { getallCountryList, getStatesByCountry, getCitiesByState } from "../../api/country"; // Adjust the imports as necessary

import { getallClient } from "../../api/client";

import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveUniversity } from "../../api/university";
import { getallCategories } from "../../api/universityModule/categories";
import { getallOfferTatModule } from "../../api/universityModule/offerTat";
import { getallInstitutionModule } from "../../api/universityModule/institutation";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import Sidebar from "../../compoents/sidebar";
import Select from "react-select";
import CountryRegion from "countryregionjs";
import { Currency } from "../../api/endpoints";

function Profile() {
  const initialState = {
    banner: "",
    businessName: "",
    universityLogo: "",
    universityName: "",
    about: "",
    founded: "",
    courseType: "",
    country: "",
    website: "",
    inTake: "",
    state: "",
    city: "",
    currency: "",
    ranking: "",
    averageFees: "",
    popularCategories: [],
    admissionRequirement: "",
    offerTAT: "",
    email: "",
    institutionType: "",
    countryStateCity: [{id: 1,country: "", state: "", citites: ""}],
  };

  const initialStateErrors = {
    businessName: { required: false },
    universityLogo: { required: false },
    banner: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    email: { required: false, valid: false },
    country: { required: false },
    website: { required: false },
    courseType: { required: false },
    campus: { required: false },
    ranking: { required: false },
    averageFees: { required: false },
    popularCategories: { required: false },
    admissionRequirement: { required: false },
    offerTAT: { required: false },
    founded: { required: false },
    institutionType: { required: false },
  
    //  costOfLiving: { required: false },
    // grossTuition: { required: false },
    // applicationFees: { required: false },
  };

  const [university, setUniversity] = useState(initialState);

  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [campus, setCampus] = useState([]);
  const [categorie, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institutation, setInstitution] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryStateCity, setCountryStateCity] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // To store cities per state

  const [type, setType] = useState([]);
  const [inTake, setInTake] = useState([]);
  const ZERO = 0;
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  let countryRegion = null;
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (data.universityName === "") error.universityName.required = true;
    if (data.businessName === "") error.businessName.required = true;
    if (data.inTake === "") error.inTake.required = true;
    if (data.website === "") error.website.required = true;
    if (data.averageFees === "") error.averageFees.required = true;
    if (data.courseType.length === 0) error.courseType.required = true;
    if (data.popularCategories.length === 0)
      error.popularCategories.required = true;
    if (data.offerTAT === "") error.offerTAT.required = true;
    if (data.email === "") error.email.required = true;
    if (data.founded === "") error.founded.required = true;
    if (data.institutionType === "") error.institutionType.required = true;
    
    if (!isValidName(data.universityName)) {
      error.universityName.valid = true;
    }
    if (!isValidYear(data.founded)) {
      error.founded.valid = true;
    }
    if (!isValidPinCode(data.averageFees)) {
      error.averageFees.valid = true;
    }
    if (!isValidWebsite(data.website)) {
      error.website.valid = true;
    }
    if (!isValidEmail(data.email)) error.email.valid = true;

    
    return error;
  };

  useEffect(() => {
    getClientList();
    getAllCountryDetails();
    
    getAllCatgoeryDetails();
    getAllCourseDetails();
    getOfferTatList();
    getAllInstitutionDetails();

    getAllIntakeDetails();
  }, []);

  const getAllCountryDetails = () => {
    getallCountryList()
      .then((res) => {
        setCountries(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCourseDetails = () => {
    getallModule()
      .then((res) => {
        console.log(res);
        setType(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllIntakeDetails = () => {
    getallIntake()
      .then((res) => {
        console.log(res);
        setInTake(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getClientList = () => {
    getallClient()
      .then((res) => {
        const value = res?.data?.result;
        setClient(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCatgoeryDetails = () => {
    getallCategories()
      .then((res) => {
        console.log(res);
        setCategories(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getOfferTatList = () => {
    getallOfferTatModule()
      .then((res) => {
        const value = res?.data?.result;
        setOfferTat(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllInstitutionDetails = () => {
    getallInstitutionModule()
      .then((res) => {
        console.log(res);
        setInstitution(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUniversity((prevUniversity) => ({
        ...prevUniversity,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };


  const handleCountryChange = (selectedOption, index) => {
    const updatedCountryStateCity = [...countryStateCity];
    updatedCountryStateCity[index].country = selectedOption.value;
    updatedCountryStateCity[index].state = ""; // Reset state
    updatedCountryStateCity[index].city = ""; // Reset city
    setCountryStateCity(updatedCountryStateCity);

    // Fetch states for the selected country
    getStatesByCountry(selectedOption.value)
      .then((res) => {
        setStates(res?.data?.result || []); // Ensure states is set to an array
      })
      .catch((err) => {
        console.log(err);
        setStates([]); // Clear states if there's an error
      });
  };

  const handleStateChange = (selectedOption, index) => {
    const updatedCountryStateCity = [...countryStateCity];
    updatedCountryStateCity[index].state = selectedOption.value;
    updatedCountryStateCity[index].city = ""; // Reset city
    setCountryStateCity(updatedCountryStateCity);

    // Fetch cities for the selected state
    getCitiesByState(selectedOption.value)
      .then((res) => {
        setCities(res?.data?.result || []); // Ensure states is set to an array
      })
      .catch((err) => {
        console.log(err);
        setCities([]); // Clear states if there's an error
      });
  };

  const handleCityChange = (selectedOption, index) => {
    const updatedCountryStateCity = [...countryStateCity];
    updatedCountryStateCity[index].city = selectedOption.value;
    setCountryStateCity(updatedCountryStateCity);
  };

  const addCountryStateCityFields = () => {
    const newCampus = [{
    country: "", state: "", cities: "" ,
  }];
    setCountryStateCity([...countryStateCity,newCampus ]);
  };
 
  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setUniversity((prevUniversity) => {
        const updatedUniversity = { ...prevUniversity, [name]: value };
        if (name === "state") {
          const selectedState = states.find(u => u.state === value);
          if (selectedState) {
            return {
              ...updatedUniversity,
              state: selectedState._id,
              city: selectedState.cities,
              
            };
          }
        }
        return updatedUniversity;
      });
    }

    if (submitted) {
      const newError = handleValidation({ ...university, [name]: value });
      setErrors(newError);
    }
  };
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setUniversity({ ...university, [name]: values });
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
    const newError = handleValidation(university);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      saveUniversity({ ...university, countryStateCity })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListUniversity");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const popularCategoriesOptions = categorie.map((data) => ({
    value: data.popularCategories,
    label: data.popularCategories,
  }));
  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const stateOptions = (index) => {
    return states.state && states.state.map((state) => ({
      value: state.name,
      label: state.name,
    }));
  };
  const courseTypeOptions = type.map((data) => ({
    value: data.courseType,
    label: data.courseType,
  }));
  const intakeOptions = inTake.map((data) => ({
    value: data.intakeName,
    label: data.intakeName,
  }));
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };

  return (
    <>
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </nav>
        </div>
        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
        >
          <div className="content-header ">
            <div className=" container-fluid ">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12 ">
                    <div className="card rounded-0 shadow-sm border-0 ">
                      <div className=" position-relative">
                        <label
                          htmlFor="banner"
                          className="file-upload"
                          style={{ color: "#231F20" }}
                        >
                          <img
                            class="card-img-top rounded-0 "
                            src={
                              university?.banner
                                ? university?.banner
                                : "https://wallpapercave.com/wp/wp6837474.jpg"
                            }
                            alt="image"
                            style={{
                              width: "60.9rem",
                              height: "12rem",
                              objectFit: "fill",
                            }}
                          />
                        </label>
                        <input
                          name="banner"
                          id="banner"
                          type="file"
                          accept="image/*"
                          className="form-control border-0 text-dark bg-transparent"
                          style={{
                            display: "none",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          onChange={handleInputs}
                        />
                        <label
                          htmlFor="fileInputImage"
                          className="file-upload"
                          style={{ color: "#231F20" }}
                        >
                          <img
                            class="img-fluid rounded-pill img-thumbnail position-absolute profile-logo  "
                            src={
                              university?.universityLogo
                                ? university?.universityLogo
                                : "https://placehold.co/128x128"
                            }
                            alt="image"
                            style={{
                              width: "8rem",
                              height: "8rem",
                              left: "50%",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        </label>
                        <input
                          name="universityLogo"
                          id="fileInputImage"
                          type="file"
                          accept="image/*"
                          className="form-control border-0 text-dark bg-transparent"
                          style={{
                            display: "none",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          onChange={handleInputs}
                        />
                      </div>
                      <div className="card-header rounded-0 bg-white ">
                        <h5
                          style={{
                            fontVariant: "all-small-caps",
                            fontWeight: "bold",
                          }}
                        >
                          Add University Details{" "}
                        </h5>
                      </div>
                      <div className="card-body p-4">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Client Name<span className="text-danger">*</span>
                            </label>
                            <select
                              onChange={handleInputs}
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              className="form-select rounded-1 form-select-lg  "
                              name="businessName"
                              placeholder="Select Client"
                            >
                              <option value={""} disabled hidden>
                                Select Client
                              </option>
                              {client.map((data, index) => (
                                <option key={index} value={data?.businessName}>
                                  {" "}
                                  {data?.businessName}
                                </option>
                              ))}
                            </select>
                            {errors.businessName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Institution Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-select-lg rounded-1"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="institutionType"
                              onChange={handleInputs}
                            >
                              <option value={" "}>
                                Select Institution Type
                              </option>
                              {institutation.map((data, index) => (
                                <option
                                  key={index}
                                  value={data?.institutionType}
                                >
                                  {" "}
                                  {data?.institutionType}
                                </option>
                              ))}
                            </select>
                            {errors.institutionType.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              University Name
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter University Name"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="universityName"
                              onChange={handleInputs}
                            />
                            {errors.universityName.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            {errors.universityName.valid && (
                              <div className="text-danger form-text">
                                Name should contain only letters.
                              </div>
                            )}
                          </div>
                          <div className="row g-3">
                        {countryStateCity.map((item, index) => (
                          < div className="row g-3" key={index}>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Country<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select Country"
                                name="country"
                                styles={customStyles}
                                options={countryOptions}
                                onChange={(selectedOption) =>
                                  handleCountryChange(selectedOption, index)
                                }
                                className="submain-one-form-body-subsection-select"
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                State<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select State"
                                name="state"
                                styles={customStyles}
                                options={stateOptions(index)}
                                onChange={(selectedOption) =>
                                  handleStateChange(selectedOption, index)
                                }
                                className="submain-one-form-body-subsection-select"
                               
                              />
                            </div>
                            {/* <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                City<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select City"
                                name="city"
                                styles={customStyles}
                                options={cityOptions(index)}
                                onChange={(selectedOption) =>
                                  handleCityChange(selectedOption, index)
                                }
                                className="submain-one-form-body-subsection-select"
                                isDisabled={!item.state}
                              />
                              {errors.city.required && submitted && <span className="text-danger">City is required</span>}
                            </div> */}
                          </div>
                        ))}
                        <div className="col-xl-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={addCountryStateCityFields}
                          >
                            Add Country
                          </button>
                        </div>
                       
                      </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              E-Mail<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Example johndoe123@gmail.com"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="email"
                              onChange={handleInputs}
                            />
                            {errors.email.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : errors.email.valid ? (
                              <div className="text-danger form-text">
                                Enter valid Email Id.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Website<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Example www.edufynd.com"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="website"
                              onChange={handleInputs}
                            />
                            {errors.website.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            {errors.website.valid && (
                              <div className="text-danger form-text">
                                Enter a valid Website URL.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Course Type<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              options={courseTypeOptions}
                              name="courseType"
                              onChange={handleSelectChange}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }),
                              }}
                              placeholder="Select Course Type"
                            ></Select>
                            {errors.courseType.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Found Year <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Example 1947"
                              name="founded"
                              
                               
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                            />
                            {errors.founded.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            {errors.founded.valid && (
                              <div className="text-danger form-text">
                                Enter a valid Number Only.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Ranking</label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Example 7th Ranking "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="ranking"
                              onChange={handleInputs}
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Popular Categories{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              options={popularCategoriesOptions}
                              name="popularCategories"
                              onChange={handleSelectChange}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }),
                              }}
                              placeholder="Select Popular Categories"
                            ></Select>
                            {errors.popularCategories.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Average Fees<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Example 2500 "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="averageFees"
                              onChange={handleInputs}
                            />
                            {errors.averageFees.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            {errors.averageFees.valid && (
                              <div className="text-danger form-text">
                                Enter a valid Number Only.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Intake<span className="text-danger">*</span>
                            </label>
                            <Select
                              isMulti
                              options={intakeOptions}
                              name="inTake"
                              onChange={handleSelectChange}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }),
                              }}
                              placeholder="Select Intake"
                            ></Select>
                            {errors.inTake.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Offer TAT<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-select-lg rounded-2"
                              name="offerTAT"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                            >
                              {" "}
                              <option value={" "}>Select Offer TAT</option>
                              {offerTAT.map((data, index) => (
                                <option key={index} value={data?.offerTAT}>
                                  {" "}
                                  {data?.offerTAT}
                                </option>
                              ))}
                            </select>
                            {errors.offerTAT.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                About <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                placeholder="University Details..."
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                rows="5" // You can adjust the number of rows as needed
                                onChange={handleInputs}
                                name="about"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                Admission Requirements{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <textarea
                                className="form-control"
                                placeholder=" Requirements Details..."
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                rows="5" // You can adjust the number of rows as needed
                                onChange={handleInputs}
                                name="admissionRequirement"
                              ></textarea>
                            </div>
                          </div>

                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              to="/ListUniversity"
                              className="btn btn-cancel border-0 px-4 py-2 fw-semibold text-uppercase text-white  m-1"
                            >
                              Cancel
                            </Link>
                            <button
                              style={{
                                backgroundColor: "#FE5722",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              type="submit"
                              className="btn btn-save border-0 px-4 py-2 fw-semibold text-uppercase text-white m-1"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
