import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  isValidNumber,
  isValidCourseFees,
  isValidDuration,
} from "../../Utils/Validation";
import { saveProgram } from "../../api/Program";
import { getallUniversity } from "../../api/university";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import { getallCurrency } from "../../api/currency";
import Sidebar from "../../compoents/AdminSidebar";
import { getUniversitiesByCountry } from "../../api/university";
import { Link } from "react-router-dom";
import Select from "react-select";

export const AdminAddProgram = () => {
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
    campuses: [{ id: 1, campus: "", inTake: "", duration: "", courseFees: "" }],
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
    // campuses:[]
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

  const handleInputChange = (index, fieldName, value) => {
    const updatedCampuses = [...campuses];
    updatedCampuses[index][fieldName] = value;
    setCampuses(updatedCampuses);
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
          const states = selectedUniversity.campuses.map(
            (campus) => campus.state
          );
          const lgas = selectedUniversity.campuses.flatMap(
            (campus) => campus.lga
          );

          return {
            ...updatedProgram,
            universityId: selectedUniversity._id,
            universityLogo: selectedUniversity.universityLogo,
            state: states,
            lga: lgas,
            courseType: selectedUniversity.courseType,
            country: selectedUniversity.country,
            inTake: selectedUniversity.inTake,
            popularCategories: selectedUniversity.popularCategories,
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
      saveProgram({
        ...program,
        campuses: campuses,
        courseType: selectedCourseType?.label,
        popularCategories: selectedPopularType.map(
          (popularCategories) => popularCategories.label
        ),
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

  return (
    <>
      <div>
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
                              isMulti
                              options={CategoriesOptions}
                              placeholder="Select courseType"
                              name="courseType"
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

                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div>
                              <button
                                type="button"
                                onClick={addCampus}
                                style={{
                                  backgroundColor: "#fe5722",
                                  fontSize: "14px",
                                }}
                                className="btn text-white"
                              >
                                Add Campus{" "}
                                <i
                                  class="fa fa-plus-circle"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                          {campuses.map((campus, index) => (
                            <div key={index}>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label>{campus?.campus}</label>
                                <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  value={campus.campus}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
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
                                {errors.campuses &&
                                  errors.campuses[index] &&
                                  errors.campuses[index].campus?.required && (
                                    <span className="text-danger form-text profile_error">
                                      Campus is required.
                                    </span>
                                  )}
                              </div>
                              <div className="row mt-3">
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
                                          index,
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
                                    {errors.campuses &&
                                      errors.campuses[index] &&
                                      errors.campuses[index].inTake
                                        ?.required && (
                                        <span className="text-danger form-text profile_error">
                                          Intake is required.
                                        </span>
                                      )}
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
                                          index,
                                          "courseFees",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                      placeholder="Enter Course Fees"
                                    />
                                    {errors.campuses &&
                                      errors.campuses[index] &&
                                      errors.campuses[index].courseFees
                                        ?.required && (
                                        <span className="text-danger form-text profile_error">
                                          Course Fees are required.
                                        </span>
                                      )}
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
                                          index,
                                          "duration",
                                          e.target.value
                                        )
                                      }
                                      className="form-control"
                                      placeholder="Enter Duration"
                                    />
                                    {errors.campuses.campus &&
                                      errors.campuses.campus &&
                                      errors.campuses.campus.duration
                                        ?.required && (
                                        <span className="text-danger form-text profile_error">
                                          Duration is required.
                                        </span>
                                      )}
                                    {errors.campuses &&
                                      errors.campuses.campus &&
                                      errors.campuses.campus.duration
                                        ?.valid && (
                                        <span className="text-danger form-text profile_error">
                                          Invalid Duration format.
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

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
                            <textarea
                              className="form-control"
                              placeholder="Enter Academic requirement "
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="academicRequirement"
                              rows="5" // You can adjust the number of rows as needed
                              onChange={handleInputs}
                            ></textarea>
                          </div>

                          <div className="row g-2">
                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                              <Link
                                to="/ListUniversity"
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
};
export default AdminAddProgram;
