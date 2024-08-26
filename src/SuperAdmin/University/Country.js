import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { updatedProgram, getSingleProgram } from "../../api/Program";
import { getallUniversity } from "../../api/university";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import { getallCurrency } from "../../api/currency";
import { Form, Row, Col } from "react-bootstrap";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { getUniversitiesByCountry } from "../../api/university";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import { RichTextEditor } from "@mantine/rte";

function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

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
    popularCategories: { required: false },
    universityLogo: { required: false },
  };
  const [program, setProgram] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [campuses, setCampuses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [university, setUniversity] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedPopularType, setSelectedPopularType] = useState(null);

  const [selectedCourseType, setSelectedCourseType] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
    getAllCurrencyDetails();
    getProgramDetails();
  }, []);

  const getProgramDetails = () => {
    getSingleProgram(id)
      .then((res) => {
        console.log(res?.data?.result);
        const programDetails = res?.data?.result;
        setProgram(programDetails);

        if (programDetails?.country) {
          // Fetch universities by country
          getUniversitiesByCountry(programDetails.country)
            .then((response) => {
              setUniversities(response.data.result || []);
              // You can further process or display university details here
            })
            .catch((error) => {
              console.error("Error fetching universities by country:", error);
            });
        } else if (programDetails?.universityName) {
          // Fetch all universities
          getallUniversity(programDetails?.universityName)
            .then((response) => {
              setUniversities(response.data.result || []);
              // You can further process or display university details here
            })
            .catch((error) => {
              console.error("Error fetching all universities:", error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    if (data.universityId === "") {
      error.universityId.required = true;
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
    if (data.currency === "") {
      error.currency.required = true;
    }

    if (data.universityInterview === "") {
      error.universityInterview.required = true;
    }

    if (data.universityLogo === "") {
      error.universityLogo.required = true;
    }
    return error;
  };

  // const addCampus = () => {
  //   setProgram({
  //     ...program,
  //     campuses: [
  //       ...program.campuses,
  //       {
  //         campus: "",
  //         inTake: "",
  //         courseFees: "",
  //         duration: "",
         
  //       },
  //     ],
  //   });
  // };
  const addCampus = () => {
    const newCampus = {
      campus: "",
      inTake: "",
      courseFees: "",
      duration: "",
    };
    setCampuses([...campuses, newCampus]);
  };

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setProgram((prevProgram) => ({ ...prevProgram, [name]: values }));
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

  const handleRichTextChange = (value) => {
    setProgram((prevUniversity) => ({
      ...prevUniversity,

      academicRequirement: value,
    }));
  };
  const handleInputChange = (index, field, value) => {
    const updatedCampuses = [...program.campuses];
    updatedCampuses[index][field] = value;
    setProgram({ ...program, campuses: updatedCampuses });
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
          return {
            ...updatedProgram,
            universityId: selectedUniversity._id,
            universityLogo: selectedUniversity.universityLogo,
            state: selectedUniversity.state,
            lga: selectedUniversity.lga,
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

  const handleSelectCourseChange = (selectedOption) => {
    setProgram({ ...program, courseType: selectedOption });
  };

  const campusOptions = program?.state
    ? program.state.map((state) => ({ value: state, label: state }))
    : [];
  const lgaOptions =
    program?.lga && program.lga.length > 0
      ? program.lga.map((lga) => ({ value: lga, label: lga }))
      : [];
  const optionsToRender = lgaOptions.length > 0 ? lgaOptions : campusOptions;
  //  const courseTypeOptions = program?.courseType ? program.courseType.map(courseType => ({ value: courseType, label: courseType })) : [];
  const inTakeOptions = program?.inTake
    ? program.inTake.map((inTake) => ({ value: inTake, label: inTake }))
    : [];
  // const popularCategoriesOptions = program?.popularCategories
  //   ? program.popularCategories.map((popularCategories) => ({
  //       value: popularCategories,
  //       label: popularCategories,
  //     }))
  //   : [];

  // const courseTypeOptions = program?.courseType
  //   ? program.courseType.map((courseType) => ({
  //       value: courseType,
  //       label: courseType,
  //     }))
  //   : [];

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
      updatedProgram({
        ...program,
        campuses: campuses,
        courseType: selectedCourseType?.label,
      })
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


      <Sidebar />


      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header ">
          <div className="content container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12 ">
                  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h5 className="text-center text-capitalize p-1">

                        Edit Program Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">


                      <div className="row gx-4 gy-3">
                      <div className="row gx-4 gy-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Country<span className="text-danger">*</span>
                          </label>
                          <select
                            className={`form-select form-select-lg rounded-1 ${errors.country.required ? 'is-invalid' : ''}`}
                            name="country"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            value={program.country}
                            onChange={handleCountryChange}
                          >
                            <option
                              className=" fw-light"
                              value=""
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
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

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            University<span className="text-danger">*</span>
                          </label>
                          <select
                             class={`form-select form-select-lg rounded-1 ${errors.universityName.required ? 'is-invalid' : ''}`}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
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
                                fontSize: "12px",
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

                                {data?.universityName}
                              </option>
                            ))}
                          </select>
                          {errors.universityId.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                          <label style={{ color: "#231F20" }}>

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

                                {data?.universityName}
                              </option>
                            ))}
                          </select>
                          {errors.universityId.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Popular Categories
                          </label>
                          <Select

                            //  options={popularCategoriesOptions}
                            value={
                              program?.popularCategories
                                ? {
                                  value: program?.popularCategories,
                                  label: program?.popularCategories,
                                }
                                : null

                            }
                            placeholder="Popular Categories"
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
                          {errors.popularCategories.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Course Type
                          </label>

                          <Select
                            name="courseType"
                            value={
                              program?.courseType
                                ? {
                                  value: program?.courseType,
                                  label: program?.courseType,
                                }
                                : null

                            }
                            //  options={courseTypeOptions}
                            placeholder="Course Type"
                            onChange={handleSelectCourseChange}
                          />

                          {errors.courseType.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>

                            Program Title
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control rounded-1 ${errors.programTitle.required ? 'is-invalid' : errors.programTitle.valid ? 'is-valid' : '' }`}
                            placeholder="Example M.Sc "
                            value={program.programTitle}
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

                            Application Fee
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className={`form-control rounded-1 ${errors.applicationFee.required ? 'is-invalid' : errors.applicationFee.valid ? 'is-valid' : '' }`}
                            value={program.applicationFee}
                            style={{
                              backgroundColor: "#fff",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 2500"
                            name="applicationFee"
                            onChange={handleInputs}
                          />
                          {errors.applicationFee.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                          <label style={{ color: "#231F20" }}>
                            Currency<span className="text-danger">*</span>
                          </label>
                          <div sm="9" className="d-flex align-items-center">
                            {program.flag && (
                              <Flags
                                code={program.flag}
                                value={program.flag}
                                className="me-2"
                                style={{ width: "30px", height: "20px" }}
                                onChange={handleInputs}
                                name="flag"
                              />
                            )}
                            <input
                              className="form-control"
                              placeholder="Autofetch Currency"
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
                        {/* <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Discounted Value
                          </label>
                          <input
                            type="number"
                            value={program.discountedValue}
                            style={{
                              backgroundColor: "#fff",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-control rounded-1 ${errors.discountedValue.required ? 'is-invalid' : errors.discountedValue.valid ? 'is-valid' : '' }`}
                            placeholder="Example 25"
                            name="discountedValue"
                            onChange={handleInputs}
                          />
                          {errors.discountedValue.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div> */}

                        <div className="col-lg-12 col-md-12 col-sm-12 text-end">
                          <div>
                            <button
                              type="button"
                              onClick={addCampus}
                              style={{
                                backgroundColor: "#fe5722",
                                fontSize: "12px",
                              }}
                              className="btn text-white text-uppercase fw-semibold px-4 py-2"
                            >
                              <i
                                class="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                              &nbsp;&nbsp;Add Campus
                            </button>
                          </div>
                        </div>

                        {program?.campuses &&
                          program?.campuses?.map((campus, index) => (
                            <div className="row gx-4 gy-3" key={index}>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label>Campus</label>

                                <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  value={campus?.campus}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "campus",
                                      e.target.value
                                    )
                                  }
                                  name="campus"
                                  options={optionsToRender}
                                  className=" form-select form-select-lg rounded-2"
                                  placeholder={campus?.campus}
                                >
                                  <option value="">{campus?.campus}</option>
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
                              <div className="row gx-4 gy-3">
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
                                      placeholder={campus.inTake}
                                    >
                                      <option value="">
                                        {campus.inTake}
                                      </option>
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
                                      type="number"
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
                                      placeholder="Example 2500"
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
                                      type="number"
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
                                      placeholder="Example 16"
                                    />
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
                            value={program?.englishlanguageTest}
                            name="englishlanguageTest"
                            onChange={handleInputs}
                            style={{
                              backgroundColor: "#fff",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option value="">Select Type</option>
                            <option value="englishlanguageTest">Yes</option>
                            <option value="no">No</option>
                          </select>
                          <br />
                          <br />
                          {program.englishlanguageTest ===
                            "englishlanguageTest" && (
                              <div className="row gx-4 gy-3 ">
                                <div className="col-md-12 col-lg-12">
                                  <label
                                    style={{ color: "#231F20" }}
                                    className="col-md-4 col-lg-3 col-form-label"
                                  >
                                    TextBox
                                  </label>

                                  <textarea
                                    name="textBox"
                                    value={program?.textBox}
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
                            value={program?.greGmatRequirement}
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
                            <div className="row gx-4 gy-3">
                              <div className="col-md-12 col-lg-12">
                                <label
                                  style={{ color: "#231F20" }}
                                  className="col-md-4 col-lg-3 col-form-label"
                                >
                                  Score
                                </label>

                                <textarea
                                  name="score"
                                  value={program?.score}
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
                            University Interview
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            class={`form-select form-select-lg rounded-1 ${errors.universityInterview.required ? 'is-invalid' : ''}`}
                            value={program?.universityInterview}
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

                              zIndex: '0'
                            }}
                          />
                        </div>



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
                            Update
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
}
export default Profile;
