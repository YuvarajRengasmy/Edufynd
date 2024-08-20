import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { getallCurrency } from "../../api/currency";
import { getallProgram, getProgramByUniversity } from "../../api/Program";
import { getUniversitiesByCountry } from "../../api/university";
import { getallUniversity } from "../../api/university";
import { getallIntake } from "../../api/intake";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialStateInputs = {
    name: "",
    dob: "",
    passportNo: "",
    country: "",
    email: "",
    primaryNumber: "",
    whatsAppNumber: "",
    inTake: "",
    universityName: "",
    programTitle: "",
    campus: "",
    courseFees: "",
    courseType: "",
  };
  const initialStateErrors = {
    name: { required: false },
    dob: { required: false },
    passportNo: { required: false },
    country: { required: false },
    email: { required: false },
    primaryNumber: { required: false },
    whatsAppNumber: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    programTitle: { required: false },
    campus: { required: false },
    courseFees: { required: false },
    courseType: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [inTake, setInTake] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    getStudentDetails();
    getAllCurrencyDetails();
    getAllProgramList();
    getAllUniversity();
    getAllIntakeDetails();
  }, []);

  const getStudentDetails = () => {
    getSingleStudent(id)
      .then((res) => {
        setStudent(res?.data?.result);
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

  const getAllCurrencyDetails = () => {
    getallCurrency()
      .then((res) => {
        setCountries(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProgramList = () => {
    getallProgram()
      .then((res) => {
        setPrograms(res?.data?.result?.programList || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUniversity = () => {
    getallUniversity()
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    for (let key in data) {
      if (!data[key]) {
        error[key].required = true;
      }
    }
    setErrors(error);
  };

  const handleAddModule = () => {
    setInputs(initialStateInputs);
    setIsEditing(false);
    setSubmitted(false);
    setErrors(initialStateErrors);
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setInputs({ ...inputs, country: selectedCountry });

    getUniversitiesByCountry(selectedCountry)
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(`Error fetching universities for ${selectedCountry}:`, err);
      });
  };

  const handleUniversityChange = (event) => {
    const selectedUniversity = event.target.value;
    setInputs({ ...inputs, universityName: selectedUniversity });

    getProgramByUniversity(selectedUniversity)
      .then((res) => {
        setPrograms(res?.data?.data?.universityDetails?.programDetails || []);
      })
      .catch((err) => {
        console.error(`Error fetching programs for ${selectedUniversity}:`, err);
      });
  };

  const handleProgramChange = (event) => {
    const selectedProgramTitle = event.target.value;
    const program = programs.find((prog) => prog.programTitle === selectedProgramTitle);
    setSelectedProgram(program || null);
    setInputs((prevInputs) => ({
      ...prevInputs,
      programTitle: selectedProgramTitle,
      campus: program ? program.campuses.map((campus) => campus.campus) : []
    }));
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));

    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };

  const handleErrors = (error) => {
    return !Object.keys(error).some((key) => error[key].required);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (handleErrors(errors)) {
      setIsEditing(true);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <h2 className="mb-4 text-center">Student Details</h2>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card card-body border-0 p-4">
                  <h6 className="fw-semibold text-center">Application Submission</h6>
                  <p className="card-text text-center my-2">
                    <Link
                      to=""
                      className="btn btn-sm px-4 py-2 text-uppercase fw-semibold"
                      data-bs-toggle="modal"
                      data-bs-target="#ApplyStudentUniversity"
                      style={{ backgroundColor: "#fe5722", color: "#fff" }}
                      onClick={handleAddModule}
                    >
                      Apply
                    </Link>
                  </p>
                </div>
                <div
                  className="modal fade"
                  id="ApplyStudentUniversity"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Course Apply
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                          <div className="container">
                            <div className="row g-4">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Country<span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select font-weight-light"
                                  name="country"
                                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                                  value={inputs.country}
                                  onChange={handleCountryChange}
                                >
                                  <option value="">Select Country</option>
                                  {countries.map((country) => (
                                    <option key={country._id} value={country.country}>
                                      {country.country}
                                    </option>
                                  ))}
                                </select>
                                {errors.country.required && (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  University<span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select font-weight-light"
                                  name="universityName"
                                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                                  value={inputs.universityName}
                                  onChange={handleUniversityChange}
                                >
                                  <option value="">Select University</option>
                                  {universities.map((uni) => (
                                    <option key={uni._id} value={uni.universityName}>
                                      {uni.universityName}
                                    </option>
                                  ))}
                                </select>
                                {errors.universityName.required && (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Program<span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select font-weight-light"
                                  name="programTitle"
                                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                                  value={inputs.programTitle}
                                  onChange={handleProgramChange}
                                >
                                  <option value="">Select Program</option>
                                  {programs.map((program) => (
                                    <option key={program._id} value={program.programTitle}>
                                      {program.programTitle}
                                    </option>
                                  ))}
                                </select>
                                {errors.programTitle.required && (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Campus<span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select font-weight-light"
                                  name="campus"
                                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                                  value={inputs.campus}
                                  onChange={handleInputs}
                                >
                                  <option value="">Select Campus</option>
                                  {selectedProgram?.campuses?.map((campus) => (
                                    <option key={campus.campus} value={campus.campus}>
                                      {campus.campus}
                                    </option>
                                  ))}
                                </select>
                                {errors.campus.required && (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Intake<span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select font-weight-light"
                                  name="inTake"
                                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                                  value={inputs.inTake}
                                  onChange={handleInputs}
                                >
                                  <option value="">Select Intake</option>
                                  {selectedProgram?.campuses?.map((campus) => (
                                    <option key={campus.campus} value={campus.inTake}>
                                      {campus.inTake}
                                    </option>
                                  ))}
                                </select>
                                {errors.inTake.required && (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                )}
                              </div>
                              {/* Add additional fields here */}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="submit" className="btn" style={{ backgroundColor: "#fe5722", color: "#fff" }}>
                            {isEditing ? "Update" : "Submit"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
