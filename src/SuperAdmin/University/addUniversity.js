import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidWebsite,
  isValidYear,
  isValidPinCode,
} from "../../Utils/Validation";
import { getallClient } from "../../api/client";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveUniversity } from "../../api/university";
import { getallCategories } from "../../api/universityModule/categories";
import { getallOfferTatModule } from "../../api/universityModule/offerTat";
import { getallInstitutionModule } from "../../api/universityModule/institutation";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import {getYear} from '../../Utils/DateFormat';
import Sidebar from "../../compoents/sidebar";
import Select from "react-select";
import CountryRegion from "countryregionjs";
import { RichTextEditor } from "@mantine/rte";



const App = () => {

  const initialState = {
    banner: "",
    businessName: "",
    universityLogo: "",
    universityName: "",
    about: "",
    founded: "",
    courseType: "",
    website: "",
    inTake: "",
    ranking: "",
    averageFees: "",
    popularCategories: [],
    admissionRequirement: "",
    offerTAT: "",
    email: "",
    institutionType: "",
    country: "",
    campuses: [
      {
        state: "",
        lga: "",
        states: [],
        lgas: [],
        primary:""
      },
    ],
  };

  const initialStateErrors = {
    businessName: { required: false },
    universityLogo: { required: false },
    banner: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    email: { required: false, valid: false },
    website: { required: false },
    courseType: { required: false },
    country: { required: false },
    campuses: { required: false },
    ranking: { required: false },
    averageFees: { required: false },
    popularCategories: { required: false },
    admissionRequirement: { required: false },
    offerTAT: { required: false },
    founded: { required: false },
    institutionType: { required: false },

  };

  const [university, setUniversity] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [client, setClient] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offerTAT, setOfferTat] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLGAs] = useState([]);
  const [type, setType] = useState([]);
  const [inTake, setInTake] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getClientList();

    getCountries();
    getAllCategoryDetails();
    getAllCourseDetails();
    getOfferTatList();
    getAllInstitutionDetails();
    getAllIntakeDetails();
  }, []);

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

  const getCountries = async () => {
    try {
      const countries = await getCountryRegionInstance().getCountries();
      setCountries(
        countries.map((country) => ({
          value: country.id,
          label: country.name,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getCountryRegionInstance = () => {
    return new CountryRegion();
  };

  const fetchStates = async (countryId) => {
    try {
      const states = await getCountryRegionInstance().getStates(countryId);
      const updatedStates = states.map((state) => ({
        value: state.id,
        label: state.name,
      }));
      setStates(updatedStates);
      setUniversity((prevState) => ({
        ...prevState,
        campuses: prevState.campuses.map((campus) => ({
          ...campus,
          states: updatedStates,
          lgas: [], // Clear LGAs when the state changes
        })),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLGAs = async (countryId, stateId) => {
    try {
      const lgas = await getCountryRegionInstance().getLGAs(countryId, stateId);
      const updatedLGAs = lgas.map((lga) => ({
        value: lga.id,
        label: lga.name,
      }));
      setLGAs(updatedLGAs);
      setUniversity((prevState) => ({
        ...prevState,
        campuses: prevState.campuses.map((campus) =>
          campus.state === stateId ? { ...campus, lgas: updatedLGAs } : campus
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    setUniversity((prevState) => ({
      ...prevState,
      country: selectedCountry.value,
      campuses: prevState.campuses.map((campus) => ({
        ...campus,
        state: "",
        lga: "",
        lgas: [],
       
      })),
    }));
    fetchStates(selectedCountry.value);
  };

  const handleStateChange = (selectedState, index) => {
    setUniversity((prevState) => ({
      ...prevState,
      campuses: prevState.campuses.map((campus, i) =>
        i === index
          ? { ...campus, state: selectedState.value, lga: "", lgas: [] }
          : campus
      ),
    }));
    fetchLGAs(university.country, selectedState.value);
  };

  const handleLGAChange = (selectedLGA, index) => {
    setUniversity((prevState) => ({
      ...prevState,
      campuses: prevState.campuses.map((campus, i) =>
        i === index ? { ...campus, lga: selectedLGA.value } : campus
      ),
    }));
  };
  const handlePrimaryChange = (index) => {
    setUniversity((prevState) => ({
      ...prevState,
      campuses: prevState.campuses.map((campus, i) =>
        i === index ? { ...campus, primary: !campus.primary } : campus
      ),
    }));
   
  };
  
  const addCampus = () => {
    setUniversity((prevState) => ({
      ...prevState,
      campuses: [
        ...prevState.campuses,
        {
          state: "",
          lga: "",
          states: states, // Add states to new campus
          lgas: [],
        },
      ],
    }));
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

  const handleRichTextChange = (value) => {
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
    
      admissionRequirement: value,
    }));
  };
  const handleRichAboutChange = (value) => {
    setUniversity((prevUniversity) => ({
      ...prevUniversity,
      about: value,
    
    }));
  };
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setUniversity((prevUniversity) => ({ ...prevUniversity, [name]: values }));
  };

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
    if (data. ranking === "") error. ranking.required = true;
    if (data.institutionType === "") error.institutionType.required = true;
   
    // Add your validation functions here
    if (!isValidName(data.universityName)) error.universityName.valid = true;
    if (!isValidYear(data.founded)) error.founded.valid = true;
    if (!isValidPinCode(data.averageFees)) error.averageFees.valid = true;
    if (!isValidWebsite(data.website)) error.website.valid = true;
    if (!isValidEmail(data.email)) error.email.valid = true;

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
      const updatedUniversity = {
        ...university,
        country:
          countries.find((option) => option.value === university.country)
            ?.label || university.country,
        campuses: university.campuses.map((campus) => ({
          ...campus,
          state:
            states.find((option) => option.value === campus.state)?.label ||
            campus.state,
          lga:
            lgas.find((option) => option.value === campus.lga)?.label ||
            campus.lga,
        })),
      };

      // Submit the data
      saveUniversity(updatedUniversity)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_university");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }else {
      toast.error("Please Fill University Details");
    }
  };

  // Prepare options for Select components
  const popularCategoriesOptions = categories.map((data) => ({
    value: data.popularCategories,
    label: data.popularCategories,
  }));

  const courseTypeOptions = type.map((data) => ({
    value: data.courseType,
    label: data.courseType,
  }));

  const intakeOptions = inTake.map((data) => ({
    
    value: `${data.intakeName} - ${data.startDate}`,
    label: `${data.intakeName} - ${data.startDate}`,
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
    
        
          
            <Sidebar />
         
       
        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
        >
          <div className="content-header ">
            <div className=" container">
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
                           <label
                                htmlFor="fileInputImage"
                                className="position-absolute fs-6 rounded-circle "
                                style={{
                                  cursor: "pointer",
                                  bottom: "15%",
                                  left: "53.5%",
                                  transform: "translate(-25%, -25%)",
                                  color: "#0f2239",
                                }}
                              >
                                <i className="fas fa-camera"></i>
                              </label>
                          
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
                              className={`form-select form-select-lg rounded-1 ${errors.businessName.required ? 'is-invalid':''}`}
                              name="businessName"
                              placeholder="Select Client"
                            >
                              <option value={""} >
                                Select Client
                              </option>
                              {client.map((data, index) => (
                                <option key={index} value={data?.businessName}>
                                  {" "}
                                  {data?.businessName}
                                </option>
                              ))}
                            </select>
                            {errors.businessName.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Institution Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className={`form-select form-select-lg rounded-1 ${errors.institutionType.required  ? 'is-invalid':''}`}
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
                              {institution.map((data, index) => (
                                <option
                                  key={index}
                                  value={data?.institutionType}
                                >
                                  {" "}
                                  {data?.institutionType}
                                </option>
                              ))}
                            </select>
                            {errors.institutionType.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              University Name
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                                className={`form-control rounded-1 ${
                                  errors.universityName.required ? 'is-invalid' : errors.universityName.valid ? 'is-valid' : ''
    }`}
                              placeholder="Enter University Name"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="universityName"
                              onChange={handleInputs}
                              onKeyDown={(e) => {
                                // Prevent non-letter characters
                                if (/[^a-zA-Z\s]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {errors.universityName.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                           
                          </div>

       
                          <div className="row g-3 mb-3">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Country<span className="text-danger">*</span>
                              </label>
                              <Select
                                placeholder="Select Country"
                                onChange={handleCountryChange}
                                options={countries}
                                name="label"
                                value={countries.find(
                                  (option) => option.value === client.country
                                )}
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.country.required && (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              )}
                            </div>
                            <div className="col text-end">

<br/>
  <button
    type="button"
    style={{
      backgroundColor: "#231F20",
      fontFamily: "Plus Jakarta Sans",
      fontSize: "12px",
    }}
    className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
    onClick={addCampus}
  >
 <i class="fa fa-plus-circle" aria-hidden="true"></i> &nbsp;&nbsp;  Add Campus
  </button>
</div>



                            {university.campuses.map((campus, index) => (
                              <div className="row row-cols-3 my-3 " key={index}>
                                <div className="col">
                                  <label style={{ color: "#231F20" }}>
                                    State<span className="text-danger">*</span>
                                  </label>
                                  <Select
                                    placeholder="Select State"
                                    onChange={(option) =>
                                      handleStateChange(option, index)
                                    }
                                    options={campus.states }
                                    value={campus.states.find(
                                      (option) => option.value === campus.state
                                    )}
                                    styles={customStyles}
                                    name="state"
                                    className="submain-one-form-body-subsection-select"
                                  />
                                  {errors.campuses[index]?.state?.required && (
                                    <div className="text-danger form-text">
                                      This field is required.
                                    </div>
                                  )}
                                </div>
                                <div className="col">
                                  <label style={{ color: "#231F20" }}>
                                    City<span className="text-danger">*</span>
                                  </label>
                                  <Select
                                    placeholder="Select City"
                                    onChange={(option) =>
                                      handleLGAChange(option, index)
                                    }
                                    options={campus.lgas }
                                    value={campus.lgas.find(
                                      (option) => option.value === campus.lga
                                    )}
                                    styles={customStyles}
                                    name="lga"
                                    className="submain-one-form-body-subsection-select"
                                  />
                                  {errors.campuses[index]?.lga?.required && (
                                    <div className="text-danger form-text">
                                      This field is required.
                                    </div>
                                  )}
                                </div>
                                <div className="col mt-5">
            <label>
              <input
                type="checkbox"
                checked={campus.primary}
                 onChange={() => handlePrimaryChange(index)}
                // onChange={(e) => handlePrimaryChange(e, index)}
                 disabled={university.campuses.filter(c => c.primary).length > 0 && !campus.primary}
              />
              <span className="ms-2 text-success">Primary Campus</span> 
            </label>
          </div>

                                {index > 0 && (
                                  <div className="col-xl-12 my-3 ">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={() => removeCampus(index)}
                                    >
                                      <i className="far fa-trash-alt text-white "></i>
                                    </button>
                                  </div>
                                )}


                              </div>
                            ))}
                         
                           
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              E-Mail<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                                className={`form-control rounded-1 ${
      errors.email.required ? 'is-invalid' : errors.email.valid ? 'is-valid' : ''
    }`}
                              placeholder="Example johndoe123@gmail.com"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="email"
                              onChange={handleInputs}
                            />
                            {errors.email.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) }
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Website<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                                className={`form-control rounded-1 ${
      errors.website.required ? 'is-invalid' : errors.website.valid ? 'is-valid' : ''
    }`}
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
                              type="text"
                              className={`form-control rounded-1 ${
      errors.founded.required ? 'is-invalid' : errors.founded.valid ? 'is-valid' : ''
    }`}
                              placeholder="Example 1947"
                              name="founded"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                              onKeyDown={(e) => {
                                if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {errors.founded.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Ranking</label>
                            <input
                              type="text"
                                className={`form-control rounded-1 ${
      errors.ranking.required ? 'is-invalid' : errors.ranking.valid ? 'is-valid' : ''
    }`}
                              placeholder="Example 7th Ranking "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="ranking"
                              onChange={handleInputs}
                              onKeyDown={(e) => {
                                     // Prevent default behavior for disallowed keys
                                if (!/^[a-zA-Z0-9]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight','Space'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              
                            />
                             {errors.ranking.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) }
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
                              className={`form-control rounded-1 ${
      errors.averageFees.required ? 'is-invalid' : errors.averageFees.valid ? 'is-valid' : ''
    }`}
                              placeholder="Example 2500 "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="averageFees"
                              onChange={handleInputs}
                              onKeyDown={(e) => {
                                if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                            {errors.averageFees.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
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
                              className={`form-select form-select-lg rounded-1 ${errors.offerTAT.required ? 'is-invalid':''}`}
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
                            {errors.offerTAT.required && (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) }
                          </div>

                         
 
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                About{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <RichTextEditor
                                placeholder="Start writing your content here..."
                                name="about"
                                onChange={handleRichAboutChange}
                                value={university.about}
                               type="text"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  
                                  zIndex:'0'
                                }}
                              />
                            </div>
                          </div>
                         



                          
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#231F20" }}>
                                Admission Requirements{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <RichTextEditor
                                placeholder="Start writing your content here..."
                                name="admissionRequirement"
                                onChange={handleRichTextChange}
                                value={university.admissionRequirement}
                               type="text"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                 
                                  zIndex:'0'
                                }}
                              />
                            </div>
                          </div>
                          
                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              to="/list_university"
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
   
    </>
  );
};

export default App;
