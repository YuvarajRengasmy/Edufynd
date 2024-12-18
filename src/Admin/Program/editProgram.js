import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import {
  isValidNumber,
  isValidCourseFees,
  isValidDuration,
} from "../../Utils/Validation";
import { updatedProgram, getSingleProgram } from "../../api/Program";
import { getallUniversity } from "../../api/university";
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import { getallCurrency } from "../../api/currency";
import Sidebar from "../../compoents/AdminSidebar";
import { getUniversitiesByCountry } from "../../api/university";
import { Link } from "react-router-dom";
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

    // if (!isValidNumber(data.applicationFee)) {
    //   error.applicationFee.valid = true;
    // }

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

  const removeCampus = (index) => {
    setCampuses(campuses.filter((_, i) => i !== index));
  };
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

  const campusOptions = program?.state
    ? program.state.map((state) => ({ value: state, label: state }))
    : [];
  const lgaOptions =
    program?.lga && program.lga.length > 0
      ? program.lga.map((lga) => ({ value: lga, label: lga }))
      : [];
  const optionsToRender = lgaOptions.length > 0 ? lgaOptions : campusOptions;

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
      updatedProgram({
        ...program,
        campuses: campuses,
      })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/admin_list_program");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please Fill Program Details");
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
          <div className="content-header "></div>
          <div className=" container-fluid">
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
                            className={`form-select form-select-lg rounded-1 ${
                              errors.country.required ? "is-invalid" : ""
                            }`}
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
                            {[
                              ...new Set(university.map((uni) => uni.country)),
                            ].map((country, index) => (
                              <option key={index} value={country}>
                                {country}
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
                            class={`form-select form-select-lg rounded-1 ${
                              errors.universityName.required ? "is-invalid" : ""
                            }`}
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
                              <option key={uni._id} value={uni.universityName}>
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
                                value={data?.universityLogo}
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

                          <select
                            onChange={handleInputs}
                            value={program?.popularCategories}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className="form-select rounded-2 p-2 "
                            name="popularCategories"
                          >
                            <option
                              value={""}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              Selected Popular Categories
                            </option>
                            {Array.isArray(universities) &&
                              universities.map((data, index) =>
                                data?.popularCategories?.map(
                                  (category, catIndex) => (
                                    <option
                                      key={`${index}-${catIndex}`}
                                      value={category}
                                      style={{
                                        fontFamily: "Plus Jakarta Sans",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {category}
                                    </option>
                                  )
                                )
                              )}
                          </select>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Course Type
                          </label>
                          <select
                            onChange={handleInputs}
                            value={program?.courseType}
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className="form-select rounded-2 p-2 "
                            name="courseType"
                          >
                            <option
                              value={""}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              Select Course Type
                            </option>
                            {Array.isArray(universities) &&
                              universities.map((data, index) =>
                                data?.courseType?.map((category, catIndex) => (
                                  <option
                                    key={`${index}-${catIndex}`}
                                    value={category}
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {category}
                                  </option>
                                ))
                              )}
                          </select>

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
                            className={`form-control rounded-1 ${
                              errors.programTitle.required
                                ? "is-invalid"
                                : errors.programTitle.valid
                                ? "is-valid"
                                : ""
                            }`}
                            placeholder="Enter Program Title "
                            style={{
                              backgroundColor: "#fff",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            value={program?.programTitle}
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
                            className={`form-control rounded-1 ${
                              errors.applicationFee.required ? "is-invalid" : ""
                            }`}
                            value={program?.applicationFee}
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

                        <div className="col-lg-12 col-md-12 col-sm-12 text-end">
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
                        {Array.isArray(program?.campuses) &&
                          program?.campuses.map((campus, index) => (
                            <div key={index}>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label>Campus</label>
                                <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  value={campus.campus || "Not Available"}
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
                                  errors.campuses[index]?.campus?.required && (
                                    <span className="text-danger form-text profile_error">
                                      Campus is required.
                                    </span>
                                  )}
                              </div>

                              <div className="row mt-3">
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label>Intake</label>
                                  <select
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    value={campus?.inTake || ""}
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
                                    errors.campuses[index]?.inTake
                                      ?.required && (
                                      <span className="text-danger form-text profile_error">
                                        Intake is required.
                                      </span>
                                    )}
                                </div>

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label>Course Fees</label>
                                  <input
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    type="text"
                                    value={campus?.courseFees || ""}
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
                                    errors.campuses[index]?.courseFees
                                      ?.required && (
                                      <span className="text-danger form-text profile_error">
                                        Course Fees are required.
                                      </span>
                                    )}
                                </div>

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label>Duration</label>
                                  <input
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    type="text"
                                    value={campus?.duration || ""}
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
                                  {errors.campuses &&
                                    errors.campuses[index]?.duration
                                      ?.required && (
                                      <span className="text-danger form-text profile_error">
                                        Duration is required.
                                      </span>
                                    )}
                                  {errors.campuses &&
                                    errors.campuses[index]?.duration?.valid && (
                                      <span className="text-danger form-text profile_error">
                                        Invalid Duration format.
                                      </span>
                                    )}
                                </div>
                              </div>

                              <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto my-3">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => removeCampus(index)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
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
                            class={`form-select form-select-lg rounded-1 ${
                              errors.universityInterview.required
                                ? "is-invalid"
                                : ""
                            }`}
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

                              zIndex: "0",
                            }}
                          />
                        </div>

                        <div className="row g-2">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                            <Link
                              to="/admin_list_program"
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
    </>
  );
}
export default Profile;
