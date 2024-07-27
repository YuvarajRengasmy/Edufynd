import React, { useEffect, useState } from "react";
import { getallCountry } from "../../api/globalsettings";
import { getallClient } from "../../api/client";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidWebsite,
  isValidYear,
  isValidPinCode,
} from "../../Utils/Validation";

import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getallCategories } from "../../api/universityModule/categories";
import { getallOfferTatModule } from "../../api/universityModule/offerTat";
import { getallInstitutionModule } from "../../api/universityModule/institutation";
import { getallModule } from "../../api/allmodule";
import Sidebar from "../../compoents/AdminSidebar";
import Select from "react-select";
import { getallIntake } from "../../api/intake";
import CountryRegion from "countryregionjs";
import {
  getallCountryList,
  getStatesByCountry,
  getCitiesByState,
} from "../../api/country"; // Adjust the imports as necessary

import { updateUniversity, getSingleUniversity } from "../../api/university";

export const AdminEditUniversity = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const initialState = {
    businessName: "",
    banner: "",
    universityLogo: "",
    universityName: "",
    about: "",
    courseType: "",
    country: "",
    ranking: "",
    averageFees: "",
    popularCategories: [],
    admissionRequirement: "",
    offerTAT: "",
    email: "",
    founded: "",
    institutionType: "",
    website: "",
    inTake: "",
    campuses: [{ state: "", cities: "" }],
  };

  const initialStateErrors = {
    businessName: { required: false },
    universityLogo: { required: false },
    banner: { required: false },
    about: { required: false },
    universityName: { required: false },
    email: { required: false, valid: false },
    country: { required: false },
    courseType: { required: false },
    state: { required: false },
    lga: { required: false },
    ranking: { required: false },
    averageFees: { required: false },
    popularCategories: { required: false },
    admissionRequirement: { required: false },
    offerTAT: { required: false },
    founded: { required: false },
    institutionType: { required: false },
    website: { required: false },
    inTake: { required: false },
    campuses: { required: false },
  };

  const [university, setUniversity] = useState(initialState);
  const MAX_CAMPUS_FIELDS = 5;

  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [categorie, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institutation, setInstitution] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [type, setType] = useState([]);
  const [inTake, setInTake] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState([]);

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
    getUniversityDetails();
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
  const getUniversityDetails = () => {
    getSingleUniversity(id)
      .then((res) => {
        setUniversity(res?.data?.result);
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

  const handleCountryChange = (selectedOption, index) => {
    const updatedCampus = [...university.campus];
    updatedCampus[index].country = selectedOption.value;
    updatedCampus[index].state = ""; // Reset state
    updatedCampus[index].cities = ""; // Reset city
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: updatedCampus,
    }));

    // Fetch states for the selected country

    const selectedCountry = countries.find(
      (country) => country.name === selectedOption.value
    );
    setStates(selectedCountry ? selectedCountry.state : []);
    setCities([]); // Clear cities since state is reset
  };

  const handleStateChange = (selectedOption, index) => {
    const updatedCampus = [...university.campus];
    updatedCampus[index].state = selectedOption.value;
    updatedCampus[index].cities = ""; // Reset city
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: updatedCampus,
    }));

    // Fetch cities for the selected state
    const selectedState = states.find(
      (state) => state.name === selectedOption.value
    );
    setCities(selectedState ? selectedState.cities : []);
  };

  const handleCityChange = (selectedOption, index) => {
    const updatedCampus = [...university.campus];
    updatedCampus[index].cities = selectedOption.value;
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campus: updatedCampus,
    }));
  };

  const addCampusFields = () => {
    if (university.campus.length < MAX_CAMPUS_FIELDS) {
      setUniversity((prevUniversity) => ({
        ...prevUniversity,
        campus: [
          ...prevUniversity.campus,
          { country: "", state: "", cities: "" },
        ],
      }));
    } else {
      alert("Maximum of 3 campus fields can be added.");
    }
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

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setUniversity((prevUniversity) => {
        const updatedUniversity = { ...prevUniversity, [name]: value };

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
    setUniversity((prevUniversity) => ({ ...prevUniversity, [name]: values }));
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
      updateUniversity({ ...university })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListUniversity");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const stateOptions = states.map((state) => ({
    value: state.name,
    label: state.name,
  }));

  const cityOptions = cities.map((cities) => ({
    value: cities,
    label: cities,
  }));
  const popularCategoriesOptions = categorie.map((data) => ({
    value: data.popularCategories,
    label: data.popularCategories,
  }));
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
      <div>
        <Sidebar />
      </div>
      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header ">
          <div className=" container-fluid ">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12 ">
                  <div className="card rounded-0 border-0 ">
                    <div className="position-relative">
                      <label
                        htmlFor="banner"
                        className="file-upload"
                        style={{ color: "#231F20", cursor: "pointer" }}
                      >
                        <img
                          className="card-img-top rounded-0"
                          src={
                            university?.banner ||
                            "https://wallpapercave.com/wp/wp6837474.jpg"
                          }
                          alt="Banner"
                          style={{
                            width: "60.9rem",
                            height: "12rem",
                            objectFit: "cover",
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
                        style={{ color: "#231F20", cursor: "pointer" }}
                      >
                        <img
                          className="img-fluid rounded-pill img-thumbnail position-absolute profile-logo"
                          src={
                            university?.universityLogo ||
                            "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                          }
                          alt="Logo"
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
                        Edit University Details{" "}
                      </h5>
                    </div>
                    <div className="card-body ">
                      <div className="row gy-4">
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
                            value={university?.businessName}
                            className="form-select rounded-1 form-select-lg "
                            name="businessName"
                          >
                            <option value={""} disabled hidden>
                              {university?.businessName}
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
                            className="form-select form-select-lg"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="institutionType"
                            onChange={handleInputs}
                            value={university?.institutionType}
                          >
                            <option value={" "}>Select Institution Type</option>
                            {institutation.map((data, index) => (
                              <option key={index} value={data?.institutionType}>
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
                            placeholder="Enter University name"
                            value={university?.universityName}
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

                        {Array.isArray(university?.campus) &&
                          university.campus.map((data, index) => (
                            <div className="row g-3" key={index}>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  State<span className="text-danger">*</span>
                                </label>

                                <select
                                  className="form-select form-select-lg"
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  name="state"
                                  onChange={(selectedOption) =>
                                    handleStateChange(selectedOption, index)
                                  }
                                  value={data?.state}
                                >
                                  <option value={" "}>{data?.state}</option>
                                  {stateOptions.map((data, index) => (
                                    <option key={index} value={data?.value}>
                                      {" "}
                                      {data?.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  City<span className="text-danger">*</span>
                                </label>

                                <select
                                  className="form-select form-select-lg"
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  name="cities"
                                  onChange={(selectedOption) =>
                                    handleCityChange(selectedOption, index)
                                  }
                                  value={data?.cities}
                                >
                                  <option value={" "}>{data?.cities}</option>
                                  {cityOptions.map((data, index) => (
                                    <option key={index} value={data?.value}>
                                      {" "}
                                      {data?.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        <div className="col-xl-12">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={addCampusFields}
                          >
                            Add Country
                          </button>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            Email<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={university?.email}
                            className="form-control "
                            placeholder="Enter Email"
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
                            Course Type<span className="text-danger">*</span>
                          </label>

                          <Select
                            isMulti
                            options={courseTypeOptions}
                            value={
                              university?.courseType
                                ? university?.courseType.map((courseType) => ({
                                    value: courseType,
                                    label: courseType,
                                  }))
                                : null
                            }
                            name="courseType"
                            onChange={handleSelectChange}
                            styles={{
                              container: (base) => ({
                                ...base,
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }),
                            }}
                          />

                          {errors.courseType.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Founded Year <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Founded Year"
                            value={university?.founded}
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
                            value={university?.ranking}
                            className="form-control "
                            placeholder="Enter Ranking "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="ranking"
                            onChange={handleInputs}
                          />
                          {errors.ranking.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Popular Categories
                            <span className="text-danger">*</span>
                          </label>

                          <Select
                            isMulti
                            options={popularCategoriesOptions}
                            value={
                              university?.popularCategories
                                ? university?.popularCategories.map(
                                    (popularCategories) => ({
                                      value: popularCategories,
                                      label: popularCategories,
                                    })
                                  )
                                : null
                            }
                            name="popularCategories"
                            onChange={handleSelectChange}
                            styles={{
                              container: (base) => ({
                                ...base,
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }),
                            }}
                          />

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
                            value={university?.averageFees}
                            placeholder="Enter Average Fees"
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
                            {" "}
                            Offer TAT<span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            name="offerTAT"
                            value={university?.offerTAT}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                          >
                            {" "}
                            <option value={" "}>select OfferTAT</option>
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
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            Website<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={university?.website}
                            className="form-control "
                            placeholder="Enter Website"
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
                            InTake<span className="text-danger">*</span>
                          </label>
                          <Select
                            isMulti
                            options={intakeOptions}
                            value={
                              university?.inTake
                                ? university?.inTake.map((inTake) => ({
                                    value: inTake,
                                    label: inTake,
                                  }))
                                : null
                            }
                            name="inTake"
                            onChange={handleSelectChange}
                            styles={{
                              container: (base) => ({
                                ...base,
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }),
                            }}
                            placeholder="Select InTake"
                          ></Select>
                          {errors.inTake.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label style={{ color: "#231F20" }}>
                              About <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Enter About"
                              value={university?.about}
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

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label style={{ color: "#231F20" }}>
                              Admission Requirement{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              placeholder="Enter Admission Requirements"
                              value={university?.admissionRequirement}
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

                        <div className="row g-2">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              to="/ListUniversity"
                              className="btn btn-cancel border-0 px-4 py-2 text-uppercase fw-semibold text-white  m-1"
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
                              className="btn btn-save border-0 px-4 py-2 text-uppercase fw-semibold text-white  m-1"
                            >
                              Submit
                            </button>
                          </div>{" "}
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
    </>
  );
};

export default AdminEditUniversity