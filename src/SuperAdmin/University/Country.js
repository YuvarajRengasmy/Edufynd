import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidYear,
  isValidPinCode,
  isValidWebsite,
} from "../../Utils/Validation";
import { getallCountryList } from "../../api/country";
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

const MAX_CAMPUS_FIELDS = 5;

const initialState = {
  country: "",
  campuses: [{ state: "", cities: ""}],
};

const initialStateErrors = {
  country: { required: false },
};

const App = () => {
  const [university, setUniversity] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [type, setType] = useState([]);
  const [inTake, setInTake] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getClientList();
    getAllCountryDetails();
    getAllCategoryDetails();
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
        setType(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllIntakeDetails = () => {
    getallIntake()
      .then((res) => {
        setInTake(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getClientList = () => {
    getallClient()
      .then((res) => {
        setClient(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCategoryDetails = () => {
    getallCategories()
      .then((res) => {
        setCategories(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOfferTatList = () => {
    getallOfferTatModule()
      .then((res) => {
        setOfferTat(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllInstitutionDetails = () => {
    getallInstitutionModule()
      .then((res) => {
        setInstitution(res?.data?.result || []);
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

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campuses: [{ state: "", cities:"" }],
    }));
    setStates(selectedOption ? selectedOption.states : []);
    setCities([]);
  };

  const handleStateChange = (index, selectedOption) => {
    const updatedCampuses = [...university.campuses];
    updatedCampuses[index].state = selectedOption ? selectedOption.value : "";
    updatedCampuses[index].cities =""; // Reset cities when state changes
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campuses: updatedCampuses,
    }));

    // Fetch cities for the selected state
    const selectedState = states.find(state => state.name === selectedOption.value);
    setCities(selectedState ? selectedState.cities : []);
  };

  const handleCityChange = (index, selectedOption) => {
    const updatedCampuses = [...university.campuses];
    updatedCampuses[index].cities = selectedOption ? [selectedOption.value] : [];
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campuses: updatedCampuses,
    }));
  };

  const addCampusFields = () => {
    if (university.campuses.length < MAX_CAMPUS_FIELDS) {
      setUniversity((prevUniversity) => ({
        ...prevUniversity,
        campuses: [...prevUniversity.campuses, { state: "", cities: "" }],
      }));
    } else {
      alert("Maximum of 5 campus fields can be added.");
    }
  };

  const removeCampus = (index) => {
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      campuses: prevUniversity.campuses.filter((_, i) => i !== index),
    }));
  };

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setUniversity((prevUniversity) => ({
        ...prevUniversity,
        [name]: value,
      }));
    }

    if (submitted) {
      const newError = handleValidation({ ...university, [name]: value });
      setErrors(newError);
    }
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (data.email === "") error.email.required = true;

    // if (!isValidEmail(data.email)) error.email.valid = true;

    return error;
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
  
    // Validate the form data
    const newError = handleValidation(university);
    setErrors(newError);
    setSubmitted(true);
  
    // Check if there are no validation errors
    if (handleErrors(newError)) {
      // Prepare the data for submission
      const submissionData = {
        countryName: selectedCountry ? selectedCountry.label : "", // Ensure country name is included
        campuses: university.campuses.map(campus => ({
          state: campus.state ? campus.state.value : "",
          cities: campus.cities.map(city => city.value),
        })),
        // Include other university data as needed
        ...university,
      };
  
      // Submit the data
      saveUniversity(submissionData)
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
    states: country.state,
  }));

  const stateOptions = selectedCountry
    ? selectedCountry.states.map((state) => ({
        value: state.name,
        label: state.name,
      }))
    : [];

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
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>
      </div>
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card rounded-0 shadow-sm border-0">
                    <div className="card-header rounded-0 bg-white">
                      <h5 style={{ fontVariant: "all-small-caps", fontWeight: "bold" }}>
                        Add University Details
                      </h5>
                    </div>
                    <div className="card-body p-4">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>
                              University Country<span className="text-danger">*</span>
                            </label>
                            <Select
                              styles={customStyles}
                              options={countryOptions}
                              onChange={handleCountryChange}
                            />
                            {errors.country.required && (
                              <span className="text-danger">Please select a country.</span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          {/* <div className="form-group">
                            <label>
                              University Email Address<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              onChange={handleInputs}
                            />
                            {errors.email.required && (
                              <span className="text-danger">Please enter an email address.</span>
                            )}
                            {errors.email.valid && (
                              <span className="text-danger">Please enter a valid email address.</span>
                            )}
                          </div> */}
                        </div>
                      </div>

                      {university.campuses.map((campus, index) => (
                        <div key={index} className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label>State</label>
                              <Select
                                styles={customStyles}
                                options={stateOptions}
                                onChange={(selectedOption) => handleStateChange(index, selectedOption)}
                                value={stateOptions.find(option => option.value === campus.state) || null}
                              />
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="form-group">
                              <label>City</label>
                              <Select
                                styles={customStyles}
                                options={cities.map((city) => ({
                                  value: city,
                                  label: city,
                                }))}
                                onChange={(selectedOption) => handleCityChange(index, selectedOption)}
                                value={campus.cities.length > 0 ? { value: campus.cities[0], label: campus.cities[0] } : null}
                              />
                            </div>
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            {index === 0 && university.campuses.length < MAX_CAMPUS_FIELDS && (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={addCampusFields}
                              >
                                Add Campus
                              </button>
                            )}
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeCampus(index)}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="form-group mt-3">
                        <button type="submit" className="btn btn-primary">
                          Save University
                        </button>
                        <Link to="/ListUniversity" className="btn btn-secondary ml-2">
                          Cancel
                        </Link>
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
  );
};

export default App;
