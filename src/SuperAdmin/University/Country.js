import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isValidNumber, isValidCourseFees, isValidDuration } from "../../Utils/Validation";
import { saveProgram } from "../../api/Program";
import { getallUniversity } from "../../api/university";
import { getallCountryModule } from "../../api/universityModule/country";
import { getCountryByCountry, getStatesByCountry,getCitiesByState } from "../../api/country";
import Sidebar from "../../compoents/sidebar";
import Select from "react-select";
import { Link } from "react-router-dom";

function Profile() {
  const initialState = {
    universityName: "",
    universityId: "",
    programTitle: "",
    country: "",
    state: [],
    cities: [], // Added city
    courseType: "",
    applicationFee: "",
    currency: "",
    discountedValue: "",
    englishlanguageTest: "",
    textBox: "",
    universityInterview: "",
    greGmatRequirement: "",
    score: "",
    academicRequirement: "",
    universityLogo: "",
    popularCategories: "",
    campuses: [{ id: 1, campus: "", inTake: "", duration: "", courseFees: "" }],
  };

  const initialStateErrors = {
    universityName: { required: false },
    universityId: { required: false },
    country: { required: false },
    state: { required: false },
    cities: { required: false }, // Added city
    programTitle: { required: false },
    courseType: { required: false },
    applicationFee: { required: false },
    currency: { required: false },
    discountedValue: { required: false },
    englishlanguageTest: { required: false },
    textBox: { required: false },
    universityInterview: { required: false },
    greGmatRequirement: { required: false },
    score: { required: false },
    academicRequirement: { required: false },
    universityLogo: { required: false },
    popularCategories: { required: false },
    campuses: [
      {
        id: 1,
        campus: { required: false },
        inTake: { required: false },
        duration: { required: false, valid: false },
        courseFees: { required: false, valid: false },
      },
    ],
  };

  const [program, setProgram] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [campuses, setCampuses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]); // Added cities
  const [submitted, setSubmitted] = useState(false);
  const [university, setUniversity] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [selectedPopularType, setSelectedPopularType] = useState(null);

  const [type, setType] = useState([]);
  const [intake, setIntake] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
    getAllCurrencyDetails();
    countryStates();
  }, []);

  const getAllUniversityList = () => {
    getallUniversity()
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCurrencyDetails = () => {
    getallCountryModule()
      .then((res) => {
        setCountries(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.universityName === "") {
      error.universityName.required = true;
    }

    if (data.country === "") {
      error.country.required = true;
    }

    if (data.state === "") {
      error.state.required = true;
    }

    if (data.city === "") {  // Added validation for city
      error.city.required = true;
    }

    if (data.programTitle === "") {
      error.programTitle.required = true;
    }

    if (data.applicationFee === "") {
      error.applicationFee.required = true;
    }

    if (data.universityInterview === "") {
      error.universityInterview.required = true;
    }
    if (data.discountedValue === "") {
      error.discountedValue.required = true;
    }

    if (!isValidNumber(data.applicationFee)) {
      error.applicationFee.valid = true;
    }
    if (!isValidNumber(data.discountedValue)) {
      error.discountedValue.valid = true;
    }
    const campusErrors = data.campuses.map((campus) => ({
      campus: campus.campus === "",
      inTake: campus.inTake === "",
      duration: campus.duration === "" || !isValidDuration(campus.duration),
      courseFees:
        campus.courseFees === "" || !isValidCourseFees(campus.courseFees),
    }));

    error.campuses = campusErrors;
    setErrors(error);

    return error;
  };

  const addCampus = () => {
    const newCampus = {
      campus: "",
      inTake: "",
      courseFees: "",
      duration: "",
    };
    setCampuses([...campuses, newCampus]);
  };

 
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setProgram({ ...program, country: selectedCountry });
    
    getCountryByCountry(selectedCountry)
      .then((res) => {
        const result = res?.data?.result;
        setProgram(result);
        setUniversities((prev) => ({
            ...prev,
            country: result.country,
        }));
    })
    .catch((err) => {
        console.log(err);
    });

    countryStates(selectedCountry);
  };

  const countryStates = (selectedCountry) => {
    getStatesByCountry(selectedCountry)
      .then((res) => {
        setProgram((prevProgram) => ({
          ...prevProgram,
          state: res?.data?.result || [], // Ensure it's an array
        }));
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
        setProgram((prevProgram) => ({
          ...prevProgram,
          state: [], // Fallback to an empty array on error
        }));
      });
  };
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setProgram({ ...program, state: selectedState });
    
    getStatesByCountry(selectedState)
      .then((res) => {
        const result = res?.data?.result;
        setProgram(result);
        setUniversities((prev) => ({
            ...prev,
            state: result.state.name,
        }));
    })
    .catch((err) => {
        console.log(err);
    });

    fetchCitiesByState(selectedState);
  };
 
  
  const fetchCitiesByState = (selectedState) => {
    getCitiesByState(selectedState)
      .then((res) => {
        setProgram((prevProgram) => ({
          ...prevProgram,
          cities: res?.data?.result || [] 
        }));
      })
      .catch((err) => {
        console.error(`Error fetching cities for ${selectedState}:`, err);
        setProgram((prevProgram) => ({
          ...prevProgram,
          cities: []
        }));
      });
  };
  



  const handleInputChange = (index, fieldName, value) => {
    const updatedCampuses = [...campuses];
    updatedCampuses[index][fieldName] = value;
    setCampuses(updatedCampuses);
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    
    // Ensure 'state' and 'city' are handled correctly
    if (name === "state" || name === "city") {
      setProgram((prevProgram) => ({
        ...prevProgram,
        [name]: value
      }));
      
      // If 'state' or 'city' changes and the form has been submitted, clear the errors
      if (submitted) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: { required: false }
        }));
      }
  
      // Fetch cities if state is changed
      if (name === "state") {
        fetchCitiesByState(value);
      }
      
    } else {
      setProgram((prevProgram) => ({
        ...prevProgram,
        [name]: value
      }));
      
      // Clear errors if form is submitted and this field has changed
      if (submitted) {
        const newError = handleValidation({ ...program, [name]: value });
        setErrors(newError);
      }
    }
  };
  
  
  
  
  const handleSelectCourseChange = (selectedOptions) => {
    setSelectedCourseType(selectedOptions);
  };

  const handleSelectPopularChange = (selectedOptions) => {
    setSelectedPopularType(selectedOptions);
  };

  const campusOptions = program?.state
    ? program.state.map((state) => ({ value: state, label: state }))
    : [];

  const courseTypeOptions = program?.courseType
    ? program.courseType.map((courseType) => ({
        value: courseType,
        label: courseType,
      }))
    : [];

  const CategoriesOptions = program?.popularCategories
    ? program.popularCategories.map((category) => ({
        value: category,
        label: category,
      }))
    : [];

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const error = handleValidation(program);
    if (Object.values(error).some((err) => err)) {
      return;
    }

    const programData = {
      ...program,
      courseType: selectedCourseType?.map((option) => option.value) || [],
      popularCategories: selectedPopularType?.map((option) => option.value) || [],
      campuses: campuses.map((campus) => ({
        ...campus,
        inTake: parseInt(campus.inTake, 10),
        courseFees: parseFloat(campus.courseFees),
        duration: parseInt(campus.duration, 10),
      })),
    };

    saveProgram(programData)
      .then(() => {
        toast.success("Program saved successfully!");
        navigate("/programs");
      })
      .catch((err) => {
        toast.error("Error saving program!");
        console.error(err);
      });
  };

  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>
        <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
          <div className="content-header">
            <div className="content container-fluid">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: "#fe5722", color: "#fff" }}>
                        <h5 className="text-center text-capitalize p-1">Add Program Details</h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row mb-2">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Country<span className="text-danger">*</span></label>
                            <select
                              className="form-select font-weight-light"
                              name="country"
                              style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                              value={program.country}
                              onChange={handleCountryChange}
                            >
                              <option className="font-weight-light" value="" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                                Select Country
                              </option>
                              {countries.map((country, index) => (
                                Array.isArray(country.country) && country.country.map((countryName, countryIndex) => (
                                  <option key={`${index}-${countryIndex}`} value={countryName}>
                                    {countryName}
                                  </option>
                                ))
                              ))}
                            </select>
                            {errors.country.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>State<span className="text-danger">*</span></label>
                            <select
                              className="form-select font-weight-light"
                              name="state"
                              style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                              value={program.state}
                              onChange={handleInputs}
                            >
                              <option className="font-weight-light" value="" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                                Select State
                              </option>
                              {Array.isArray(program.state) && program.state.map((state) => (
  <option key={state.name} value={state.name}>
    {state.name}
  </option>
))}
                            </select>
                            {errors.state?.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          {/* <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>City<span className="text-danger">*</span></label>
                            <select
                              className="form-select font-weight-light"
                              name="city"
                              style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                              value={program.city}
                              onChange={(e) => setProgram({ ...program, city: e.target.value })}
                            >
                              <option className="font-weight-light" value="" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                                Select City
                              </option>
                              {program.state.cities && program.state.cities.map((city, index) => (
                                <option key={index} value={city.cities}>
                                  {city.cities}
                                </option>
                              ))}
                            </select>
                            {errors.city?.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                          </div> */}
                        </div>
                        <div className="row g-3">
                          {/* Render dynamic campuses */}
                          {campuses.map((campus, index) => (
                            <div key={index} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <div className="mb-2">
                                <label>Campus {index + 1}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={campus.campus}
                                  onChange={(e) => handleInputChange(index, "campus", e.target.value)}
                                  placeholder="Campus"
                                />
                              </div>
                              <div className="mb-2">
                                <label>Intake</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={campus.inTake}
                                  onChange={(e) => handleInputChange(index, "inTake", e.target.value)}
                                  placeholder="Intake"
                                />
                              </div>
                              <div className="mb-2">
                                <label>Duration</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={campus.duration}
                                  onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                                  placeholder="Duration"
                                />
                                {errors.campuses[index]?.duration && (
                                  <span className="text-danger form-text profile_error">
                                    Duration is required or invalid.
                                  </span>
                                )}
                              </div>
                              <div className="mb-2">
                                <label>Course Fees</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={campus.courseFees}
                                  onChange={(e) => handleInputChange(index, "courseFees", e.target.value)}
                                  placeholder="Course Fees"
                                />
                                {errors.campuses[index]?.courseFees && (
                                  <span className="text-danger form-text profile_error">
                                    Course fees are required or invalid.
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <button type="button" className="btn btn-primary" onClick={addCampus}>
                              Add Campus
                            </button>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Course Type<span className="text-danger">*</span></label>
                            <Select
                              isMulti
                              name="courseType"
                              options={courseTypeOptions}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={handleSelectCourseChange}
                              value={selectedCourseType}
                            />
                            {errors.courseType.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Popular Categories<span className="text-danger">*</span></label>
                            <Select
                              isMulti
                              name="popularCategories"
                              options={CategoriesOptions}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={handleSelectPopularChange}
                              value={selectedPopularType}
                            />
                            {errors.popularCategories.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <button type="submit" className="btn btn-primary">
                              Save
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
    </div>
  );
}

export default Profile;
