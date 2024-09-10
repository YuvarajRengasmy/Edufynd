import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  isValidNumber,
  isValidCourseFees,
  isValidDuration,
} from "../../Utils/Validation";
import { saveProgram } from "../../api/Program";
import { getFilterYear } from "../../api/year";

import { getallUniversity } from "../../api/university";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import { getallCurrency } from "../../api/currency";
import Sidebar from "../../compoents/sidebar";
import { getUniversitiesByCountry } from "../../api/university";
import { Link } from "react-router-dom";
import Select from "react-select";
import { RichTextEditor } from "@mantine/rte";
import { duration } from "@mui/material";


function Profile() {
  const initialState = {
    universityName: "",
    universityId: "",
    programTitle: "",
    country: "",
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
    years: [
      {
        id: 1,
        year: "",
        campuses: [{ id: 1, campus: "", inTake: "", duration: "", courseFees: "" }],

      },
    ],
  };
  // id: campuses.length + 1

  const initialStateErrors = {
    universityName: { required: false },
    universityId: { required: false },
    country: { required: false },
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
    years: [
      {
        year: { required: false },
        campuses: [
          {
            id: 1,
            campus: { required: false },
            inTake: { required: false },
            duration: { required: false, valid: false },
            courseFees: { required: false, valid: false },
          },
        ],
      }
    ]
  
  };

  const [program, setProgram] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [campuses, setCampuses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [university, setUniversity] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [selectedPopularType, setSelectedPopularType] = useState(null);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState([]);
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [type, setType] = useState([]);
  const [intake, setIntake] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
    getAllCurrencyDetails();
    getAllYearDetails();
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
  const getAllYearDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterYear(data)
      .then((res) => {
        setYear(res?.data?.result?.yearList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.yearCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCurrencyDetails = () => {
    getallCurrency()
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
    if (!data.years) {
      error.years.required = true;
    }

    const yearValidationErrors = validateYears(data.years);
    if (
      yearValidationErrors.some(
        (yearError) => Object.keys(yearError).length > 0
      )
    ) {
      errors.years = {
        required: false,
        valid: true,
        message: "Please fix the errors in the year fields.",
      };
      errors.yearErrors = yearValidationErrors;
    }
   

    return error;
  };
  const validateYears = (years) => {
    const errors = [];
    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const yearErrors = {};

      if (!year.year) {
        yearErrors.year = "Year is required.";
      }

      yearErrors.campuses = [];
      for (let j = 0; j < year.campuses.length; j++) {
        const campus = year.campuses[j];
        const courseTypeErrors = {};

        if (!campus.campus) {
          courseTypeErrors.campus = "Campus is required.";
          
        }

        if (!campus.inTake) {
          courseTypeErrors.inTake = "Intake is required.";
        }
        if(!campus.duration){
          courseTypeErrors.duration = "Duration is required.";
        }
        if (campus.courseFees === null || campus.courseFees === "") {
          courseTypeErrors.courseFees = "Value is required.";
        } else if (isNaN(campus.courseFees) || Number(campus.courseFees) >= 10000) {
          courseTypeErrors.courseFees = "Value must be a number less than 35.";
        }

        yearErrors.campuses[j] = courseTypeErrors;
      }

      errors[i] = yearErrors;
    }
    return errors;
  };

  const addYear = () => {
    const newYear = {
      year: "",
      campuses: [{ id: 1, campus: "", inTake: "", duration: "", courseFees: "" }],

    };
    setYears([...years, newYear]);
  };
 
  const addCampus = (yearIndex) => {
    const updatedYears = [...years];
    updatedYears[yearIndex].campuses.push({
           campus: "",
           inTake: "",
           courseFees: "",
           duration: "",
    });
    setYears(updatedYears);
  };

  const removeCampus = (yearIndex, courseTypeIndex) => {
    const updatedYears = [...program.years];
    updatedYears[yearIndex].campuses.splice(courseTypeIndex, 1);
    setProgram({
      ...program,
      years: updatedYears,
    });
  };

  const handleInputChange = (yearIndex, courseTypeIndex, fieldName, value) => {
    const updatedYears = [...years];
    if (courseTypeIndex !== null) {
      updatedYears[yearIndex].campuses[courseTypeIndex][fieldName] = value;
    } else {
      updatedYears[yearIndex][fieldName] = value;
    }
    setYears(updatedYears);
  };

   // const handleInputChange = (index, fieldName, value) => {
  //   const updatedCampuses = [...campuses];
  //   updatedCampuses[index][fieldName] = value;
  //   setCampuses(updatedCampuses);
  // };
  const yearOptions = year.map((data) => ({
    value: data.year,
    label: data.year,
  }));
  const handleRichTextChange = (value) => {
    setProgram((prevUniversity) => ({
      ...prevUniversity,
    
      academicRequirement: value,
    }));
  };
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setProgram({ ...program, country: selectedCountry });

    getUniversitiesByCountry(selectedCountry)
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(
          `Error fetching universities for ${selectedCountry}:`,
          err
        );
        setUniversities([]);
      });

    fetchCountryDetails(selectedCountry);
  };
  const fetchCountryDetails = (selectedCountry) => {
    const selectedCountryData = countries.find(
      (c) => c.country === selectedCountry
    );
    if (selectedCountryData) {
      setProgram((prevState) => ({
        ...prevState,
        currency: selectedCountryData.currency,
        flag: selectedCountryData.flag,
      }));
    }
  };

 
  const handleInputs = (event) => {
    const { name, value } = event.target;

    setProgram((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };
      if (name === "universityName") {
        const selectedUniversity = university.find(
          (u) => u.universityName === value
        );
        if (selectedUniversity) {
          const states = selectedUniversity.campuses.map((campus) => campus.state);
          const lgas = selectedUniversity.campuses.flatMap((campus) => campus.lga);
  
          return {
            ...updatedProgram,
            universityId: selectedUniversity._id,
            universityLogo: selectedUniversity.universityLogo,
            state: states,
            lga: lgas,
            courseType: selectedUniversity.courseType,
            country: selectedUniversity.country,
            inTake: selectedUniversity.inTake,
            popularCategories:selectedUniversity.popularCategories
          };
        }
      }

      return updatedProgram;
    });

    if (submitted) {
      const newError = handleValidation({ ...program, [name]: value });
      setErrors(newError);
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
  const lgaOptions =
    program?.lga && program.lga.length > 0
      ? program.lga.map((lga) => ({ value: lga, label: lga }))
      : [];
  const optionsToRender = lgaOptions.length > 0 ? lgaOptions : campusOptions;
  const courseTypeOptions = program?.courseType
    ? program.courseType.map((courseType) => ({
        value: courseType,
        label: courseType,
      }))
    : [];
  const CategoriesOptions = program?.popularCategories
    ? program.popularCategories.map((popularCategories) => ({
        value: popularCategories,
        label: popularCategories,
      }))
    : [];

 

  const inTakeOptions = program?.inTake
    ? program.inTake.map((inTake) => ({ value: inTake, label: inTake }))
    : [];
 

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
    const newError = handleValidation(program);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {

      const yearsData = years.map((year) => ({
        year: year.year,
        campuses: year.campuses.map((campus) => ({
          campus: campus.campus,
          inTake: campus.inTake,
          duration: campus.duration,
          courseFees: campus.courseFees
        })),
      }));

     
      const dataToSave = {
        ...program,
        years: yearsData,
        courseType: selectedCourseType?.label,
        popularCategories: selectedCourseType?.label,
      };
      saveProgram(dataToSave)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_program");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div >
        
          <Sidebar />
      

        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header ">
            <div className=" container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12 ">
                    <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          {" "}
                          Add Program Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row mb-2">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Country<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select font-weight-light"
                              name="country"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              value={program.country}
                              onChange={handleCountryChange}
                            >
                              <option
                                className=" font-weight-light"
                                value=""
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "14px",
                                }}
                              >
                                Select Country
                              </option>
                              {countries.map((country) => (
                                <option
                                  key={country._id}
                                  value={country.country}
                                >
                                  {country.country}
                                </option>
                              ))}
                            </select>
                            {errors.country.required ? (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                          </div>
                        <div className="row g-3">
                          
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              University<span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select font-weight-light"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              name="universityName"
                              value={program.universityName}
                              onChange={handleInputs}
                            >
                              <option
                                className=" font-weight-light"
                                value=""
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "14px",
                                }}
                              >
                                Select University
                              </option>
                              {universities.map((uni) => (
                                <option
                                  key={uni._id}
                                  value={uni.universityName}
                                >
                                  {uni.universityName}
                                </option>
                              ))}
                            </select>
                            {errors.universityName.required ? (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              University Id
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              onChange={handleInputs}
                              value={program?.universityName ?? ""}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              className="form-select rounded-2 p-2 "
                              name="universityId"
                            >
                              <option
                                value={""}
                                disabled
                                hidden
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                Select UniversityId
                              </option>
                              {university.map((data, index) => (
                                <option
                                  key={index}
                                  value={data?.universityId}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                >
                                  {" "}
                                  {data?.universityName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              University Logo
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              onChange={handleInputs}
                              value={program?.universityName ?? ""}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              className="form-select rounded-2 p-2 "
                              name="universityLogo"
                            >
                              <option
                                value={""}
                                disabled
                                hidden
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                University Logo
                              </option>
                              {university.map((data, index) => (
                                <option
                                  key={index}
                                  value={data?.universityId}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                >
                                  {" "}
                                  {data?.universityName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Popular Categories
                            </label>
                            <Select
                              value={selectedPopularType}
                              options={CategoriesOptions}
                              placeholder="Select Popular Categories"
                              name="popularCategories"
                              onChange={handleSelectPopularChange}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }),
                              }}
                            />
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Course Type
                            </label>
                            <Select
                              value={selectedCourseType}
                              options={courseTypeOptions}
                              placeholder="Select courseType"
                              name="courseType"
                              onChange={handleSelectCourseChange}
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
                              {" "}
                              Program Title
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Enter Program Title "
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="programTitle"
                              onChange={handleInputs}
                            />
                            {errors.programTitle.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                            <label style={{ color: "#231F20" }}>
                              {" "}
                              Application Fee
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter Application Fee"
                              name="applicationFee"
                              onChange={handleInputs}
                            />
                            {errors.applicationFee.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            {errors.applicationFee.valid && (
                              <div className="text-danger form-text">
                                Name should contain only letters.
                              </div>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                            <label style={{ color: "#231F20" }}>
                              Currency <span className="text-danger">*</span>
                            </label>
                            <div sm="9" className="d-flex align-items-center">
                              {program.flag && (
                                <Flags
                                  code={program.flag}
                                  className="me-2"
                                  style={{ width: "30px", height: "20px" }}
                                  onChange={handleInputs}
                                  name="flag"
                                />
                              )}
                              <input
                                className="form-control"
                                placeholder="Autofetch currency"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                type="text"
                                onChange={handleInputs}
                                name="currency"
                                value={`${program.currency}`}
                                readOnly
                              />
                            </div>
                            {errors.currency.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Discounted Value
                            </label>
                            <input
                              type="text"
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              className="form-control"
                              placeholder="Enter DiscountedValue"
                              name="discountedValue"
                              onChange={handleInputs}
                            />
                            {errors.discountedValue.required && (
                              <span className="text-danger form-text profile_error">
                                This field is required.
                              </span>
                            )}
                            {errors.discountedValue.valid && (
                              <div className="text-danger form-text">
                                Name should contain only letters.
                              </div>
                            )}
                          </div>



                          <div className="row g-3 mt-3">
                          <div className="col-12">
                            {years.map((year, yearIndex) => (
                              <div
                                key={yearIndex}
                                className="year-section mb-3"
                              >
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Year
                                  </label>
                                  <select
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "14px",
                                    }}
                                    value={year?.year}
                                    onChange={(e) =>
                                      handleInputChange(
                                        yearIndex,
                                        null,
                                        "year",
                                        e.target.value
                                      )
                                    }
                                    name="year"
                                    className="form-select form-select-lg rounded-2 mb-3 "
                                    placeholder="Enter Year"
                                  >
                                    <option value="">Select Year</option>
                                    {yearOptions.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <div>
                                    {year?.campuses &&
                                      year?.campuses.map(
                                        (campus, courseTypeIndex) => (
                                          <div
                                            className="row g-3"
                                            key={courseTypeIndex}
                                          >
                                            <div className=" col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                              <label
                                                style={{ color: "#231F20" }}
                                              >
                                               campus
                                              </label>
                                              <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  value={campus.campus}
                                  onChange={(e) =>
                                    handleInputChange(
                                      yearIndex,
                                      courseTypeIndex,
                                      "campus",
                                      e.target.value
                                    )
                                  }
                                  
                                  name="campus"
                                  className="form-select form-select-lg rounded-2"
                                  placeholder="Enter Campus"
                                >
                                  <option value="">Select Campus</option>
                                  {optionsToRender.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                            </div>
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <div>
                                    <label>Intake</label>
                                    <select
                                      style={{
                                        backgroundColor: "#fff",
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "12px",
                                      }}
                                      value={campus.inTake}
                                      onChange={(e) =>
                                        handleInputChange(
                                          yearIndex,
                                          courseTypeIndex,
                                          "inTake",
                                          e.target.value
                                        )
                                      }
                                     
                                      name="inTake"
                                      className="form-select form-select-lg rounded-2"
                                      placeholder="Enter Intake"
                                    >
                                      <option value="">Select Intake</option>
                                      {inTakeOptions.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                   
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <div>
                                    <label>Course Fees</label>
                                    <input
                                      style={{
                                        backgroundColor: "#fff",
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "12px",
                                      }}
                                      type="text"
                                      value={campus.courseFees}
                                      name="courseFees"
                                      onChange={(e) =>
                                        handleInputChange(
                                          yearIndex,
                                          courseTypeIndex,
                                          "courseFees",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                      placeholder="Enter Course Fees"
                                    />
                                   
                                  </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <div>
                                    <label>Duration</label>
                                    <input
                                      style={{
                                        backgroundColor: "#fff",
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "12px",
                                      }}
                                      type="text"
                                      value={campus.duration}
                                      name="duration"
                                      onChange={(e) =>
                                        handleInputChange(
                                          yearIndex,
                                          courseTypeIndex,
                                          "duration",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                      placeholder="Enter Duration"
                                    />
                                    
                                    
                                  </div>
                                </div>

                                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger text-white ml-2 mb-3"
                                                onClick={() =>
                                                  removeCampus(
                                                    yearIndex,
                                                    courseTypeIndex
                                                  )
                                                }
                                              >
                                                <i
                                                  class="fa fa-trash"
                                                  aria-hidden="true"
                                                ></i>
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    <div className="add-customer-btns mb-40 d-flex justify-content-start ml-auto">
                                      <button
                                        type="button"
                                        className="btn text-uppercase px-4 py-2 fw-semibold  text-white "
                                        onClick={() => addCampus(yearIndex)}
                                        style={{
                                          backgroundColor: "#FE5722",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                      >
                                        <i
                                          class="fa fa-plus-circle me-2"
                                          aria-hidden="true"
                                        ></i>{" "}
                                        Campus
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="add-customer-btns mb-40 d-flex justify-content-start ml-auto">
                            <button
                              type="button"
                              className="btn px-4 py-2 text-uppercase fw-semibold  text-white "
                              style={{
                                backgroundColor: "#FE5722",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onClick={addYear}
                            >
                              <i
                                class="fa fa-plus-circle me-2"
                                aria-hidden="true"
                              ></i>{" "}
                              Primary Campus
                            </button>
                          </div>
                        </div>
                         
                         
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }} className="">
                              English language Test (ELT) Requirement
                            </label>
                            <select
                              className="form-select form-select-lg rounded-2"
                              name="englishlanguageTest"
                              onChange={handleInputs}
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              value={program.englishlanguageTest}
                            >
                              <option value="">Select Type</option>
                              <option value="englishlanguageTest">Yes</option>
                              <option value="no">No</option>
                            </select>
                            <br />
                            <br />
                            {program.englishlanguageTest ===
                              "englishlanguageTest" && (
                              <div className="row ">
                                <div className="col-md-12 col-lg-12">
                                  <label
                                    style={{ color: "#231F20" }}
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    TextBox
                                  </label>

                                  <textarea
                                    name="textBox"
                                    placeholder="Enter TextBox"
                                    className="form-control"
                                    type="text"
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                      height: 100,
                                    }}
                                    onChange={handleInputs}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }} className="">
                              GRE/GMAT Requirement
                            </label>
                            <select
                              className="form-select form-select-lg rounded-2"
                              name="greGmatRequirement"
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                            >
                              <option value="">Select Type</option>
                              <option value="categories">Yes</option>
                              <option value="no">No</option>
                            </select>
                            <br />
                            <br />
                            {program.greGmatRequirement === "categories" && (
                              <div className="row">
                                <div className="col-md-12 col-lg-12">
                                  <label
                                    style={{ color: "#231F20" }}
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    Score
                                  </label>

                                  <textarea
                                    name="score"
                                    className="form-control"
                                    placeholder="Enter Score"
                                    style={{
                                      backgroundColor: "#fff",
                                      height: 100,
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    type="text"
                                    onChange={handleInputs}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              University Interview{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select form-select-lg rounded-2"
                              name="universityInterview"
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              onChange={handleInputs}
                            >
                              <option value="">Select Type</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>

                            {errors.universityInterview.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Academic requirement
                            </label>
                            <RichTextEditor
                                placeholder="Start writing your content here..."
                                name="academicRequirement"
                                onChange={handleRichTextChange}
                                value={program.academicRequirement}
                               type="text"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  minHeight: "200px",
                                  overflowY: "auto",
                                  zIndex:'0'
                                }}
                              />
                          </div>

                          <div className="row g-2">
                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                              <Link
                                to="/list_program"
                                style={{
                                  backgroundColor: "#231F20",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2"
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
                                className="btn btn-save border-0 fw-semibold text-uppercase  px-4 py-2 text-white m-2"
                              >
                                Submit
                              </button>
                            </div>
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
