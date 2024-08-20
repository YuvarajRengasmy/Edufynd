import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { getallCurrency } from "../../api/currency";
import { getallProgram, getProgramByUniversity, getProgramByCountry } from "../../api/Program";
import { getUniversitiesByCountry } from "../../api/university";
import { getallUniversity } from "../../api/university";
import { saveApplication } from "../../api/applicatin";
import { getallIntake } from "../../api/intake";
import { formatYear } from "../../Utils/DateFormat";
import { toast } from "react-toastify";
import { getMonthYear } from "../../Utils/DateFormat";
import { getallApplication, deleteApplication,getStudentApplication } from "../../api/applicatin";

import { Dialog, DialogContent, DialogTitle, IconButton, Pagination,  } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MdCameraAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { Program } from "../../api/endpoints";

function Profile() {
 
  const location = useLocation();
  const studentId = new URLSearchParams(location.search).get("id");

  const initialStateInputs = {
    name: "",
    dob: "",
    passportNo: "",
    studentId: "",
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
    // studentId: { required: false },
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
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [submitted, setSubmitted] = useState(false);
  const [student, setStudent] = useState({});
  const [application, setApplication] = useState([]);

  useEffect(() => {
    getApplicationList();
  }, [ pagination.from, pagination.to]);

  const getApplicationList = () => {
 
    getStudentApplication(studentId)
    .then((res) => {
      console.log("API Response:", res); // Debugging API response
      if (res?.data?.result && Array.isArray(res.data.result)) {
        setApplication(res.data.result);
        setPagination({
          ...pagination,
          count: res?.data?.result?.length,
        });
      } else {
        console.warn("Unexpected response structure:", res);
      }
    })
    .catch((err) => {
      console.error("Error fetching programs:", err);
    });
  };
const navigate = useNavigate();
  useEffect(() => {
    getStudentDetails();
    getAllCurrencyDetails();
    getAllProgramList();
    getAllUniversity();
    getAllIntakeDetails();
  }, []);

  const getStudentDetails = () => {
    getSingleStudent(studentId)
      .then((res) => {
        const result = res?.data?.result;
        setStudent(result);
        setInputs((prev) => ({
          ...prev,
          name: result?.name,
          dob: result?.dob,
          passportNo: result?.passportNo,
          studentId: result?._id,
          email: result?.email,
          primaryNumber: result?.primaryNumber,
          whatsAppNumber: result?.whatsAppNumber
      }));
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
        console.log(res?.data?.result);
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
      campus: program ? program.campuses.map((campus) => campus.campus) : [],
      courseType: program ? program.courseType : "",
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
        saveApplication(inputs)
      .then((res) => {
        toast.success(res?.data?.message);
        getStudentDetails();

      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  }
};
const handlePageChange = (event, page) => {
  const from = (page - 1) * pageSize;
  const to = (page - 1) * pageSize + pageSize;
  setPagination({ ...pagination, from: from, to: to });
};
const openPopup = (data) => {
  setOpen(true);
  setDeleteId(data);
};

const closePopup = () => {
  setOpen(false);
};
const tableRef = useRef(null);

  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header">
        <nav aria-label="breadcrumb">
  <ol className="breadcrumb float-end">
    <li className="breadcrumb-item">
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListStudent' className="text-decoration-none">ListSudent</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditStudent",
          search: `?studentId=${student?._id}`,
        }} className="text-decoration-none">EditStudent</Link>
      </li>
  
  </ol>
</nav>
      
          <div className="container-fluid">
            <h2 className="mb-4 text-center">Student Details</h2>

            <div className="row mb-4">
              <div className="col-md-4 text-center">
                <img
                  src={
                    student?.photo
                      ? student?.photo
                      : "https://via.placeholder.com/150"
                  }
                  alt="Profile Photo"
                  className="img-fluid rounded-circle img-thumbnail"
                  style={{ width: "10rem", height: "10rem" }}
                />
              </div>

              <div className="col-md-4">
                <h3 className="mb-2">{student?.name  || "Not Available"}</h3>
                <p className="text-muted mb-2">
                  Student Code: {student?.studentCode  || "Not Available"}
                </p>
                <p className="text-muted mb-2">
                  <i className="fas fa-envelope me-2"></i>
                  {student?.email  || "Not Available"}
                </p>
                <p className="text-muted mb-2">
                  <i className="fas fa-phone-alt me-2"></i>
                  {student?.primaryNumber  || "Not Available"}
                </p>
              </div>
              <div className="col-md-4">
                <div className="card card-body border-0 p-4">
                  <h6 className="fw-semibold text-center">
                    Application Submission
                  </h6>
                  <p className="card-text text-center my-2">
                    <Link
                      to=""
                      className="btn btn-sm px-4 py-2 text-uppercase fw-semibold"
                      data-bs-toggle="modal"
                      data-bs-target="#ApplyStudentUniversity"
                      style={{ backgroundColor: "#fe5722", color: "#fff" }}
                      onClick={() => {
                        handleAddModule();
                      }}
                    >
                      Apply
                    </Link>
                  </p>
                </div>
                <div
                  class="modal fade"
                  id="ApplyStudentUniversity"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" studentId="exampleModalLabel">
                          Course Apply
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
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
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden ">
                                <label style={{ color: "#231F20" }}>
                                  Student Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={student.name}
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Name"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  name="name"
                                />
                                {errors.name.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12  ">
                                <label style={{ color: "#231F20" }}>
                                  Student Id
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={student?._id}
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Student Id"
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  name="studentId"
                                />
                               
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                                <label style={{ color: "#231F20" }}>
                                  DOB<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="date"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter DOB"
                                  value={student.dob?.slice(0, 10)}
                                  onChange={handleInputs}
                                  name="dob"
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.dob.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                                <label style={{ color: "#231F20" }}>
                                  Passport No
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Passport No"
                                  value={student.passportNo}
                                  onChange={handleInputs}
                                  name="passportNo"
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.passportNo.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                                <label style={{ color: "#231F20" }}>
                                  Email<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Email"
                                  name="email"
                                  value={student.email}
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.email.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                                <label style={{ color: "#231F20" }}>
                                  Primary Number
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Primary Number"
                                  name="primaryNumber"
                                  value={student.primaryNumber}
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.primaryNumber.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                                <label style={{ color: "#231F20" }}>
                                  WhatsApp Number
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter WhatsApp Number"
                                  name="whatsAppNumber"
                                  value={student.whatsAppNumber}
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.whatsAppNumber.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Course Type
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Course Type"
                                  name="courseType"
                                  value={inputs?.courseType}
                                  onChange={handleInputs}
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.courseType.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              {/* Add additional fields here */}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <Link
                          
                          
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </Link>
                          <button type="submit" data-bs-dismiss="modal" className="btn" style={{ backgroundColor: "#fe5722", color: "#fff" }}>
                           Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-info-circle me-2"></i> Basic
                      Information
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Source:</strong> {student?.source  || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Date of Birth:</strong> {student?.dob  || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Passport:</strong> {student?.passportNo  || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Expiry Date:</strong> {student?.expiryDate  || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Citizenship:</strong> {student?.citizenship  || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Gender:</strong> {student?.gender || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>WhatsApp Number:</strong>{" "}
                      {student?.whatsAppNumber  || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-graduation-cap me-2"></i> Academic
                      Information
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Highest Qualification:</strong>{" "}
                      {student?.highestQualification || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Degree Name:</strong> {student?.degreeName || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Institution:</strong> {student?.institution || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Percentage:</strong> {student?.percentage || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Academic Year:</strong> {student?.academicYear || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Year Passed:</strong> {student?.yearPassed || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-file-alt me-2"></i> Test Type
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.englishTestType || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-tachometer-alt me-2"></i> Test Score
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.testScore || "Not Available"}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-calendar-day me-2"></i> Date of Test
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.dateOfTest || "Not Available"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-globe me-2"></i> Desired Country
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.desiredCountry || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-university me-2"></i> Desired
                      University
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.desiredUniversity || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-book me-2"></i> Desired Course
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.desiredCourse || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-briefcase me-2"></i> Work Experience
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                    {student?.duration || "Not Available"} || {student?.lastDesignation || "Not Available"} ||  {student?.lastEmployeer || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-ban me-2"></i> Visa Rejections
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.anyVisaRejections || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-globe-americas me-2"></i> Travel
                      History
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.travelHistory || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">
                      <i className="fas fa-question-circle me-2"></i> Additional
                      Information
                    </h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      {student?.additionalInfo || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card rounded-1 shadow-sm border-0">
                  <div className="card-body">
                    <div className="card-table">
                      <div className="table-responsive">
                        <table
                          className=" table table-hover card-table dataTable table-responsive-sm text-center"
                          ref={tableRef}
                        >
                          <thead className="table-light">
                            <tr
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <th className="text-capitalize text-start sortable-handle">
                                S No
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Date
                              </th>
                              <th className="text-capitalize text-start">
                                {" "}
                                Code
                              </th>

                              <th className="text-capitalize text-start sortable-handle">
                                {" "}
                                Name
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                University Applied
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Course Applied
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Status
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {application?.map((data, index) => (
                              <tr
                                key={index}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                              >
                                <td className="text-capitalize text-start text-truncate">
                                  {pagination.from + index + 1}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {getMonthYear(data?.createdOn) || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.applicationCode || "Not Available"}
                                </td>

                                <td className="text-capitalize text-start text-truncate">
                                  {data?.name || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.universityName || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate">
                                  {data?.course || data?.programTitle || "Not Available"}
                                </td>
                                <td className="text-capitalize text-start text-truncate"></td>

                                <td className="text-capitalize text-start text-truncate">
                                  <div className="d-flex">
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/ApplicationView",
                                        search: `?studentId=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-eye text-primary me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      to={{
                                        pathname: "/EditApplication",
                                        search: `?studentId=${data?._id}`,
                                      }}
                                    >
                                      <i className="far fa-edit text-warning me-1"></i>
                                    </Link>
                                    <Link
                                      className="dropdown-item"
                                      onClick={() => {
                                        openPopup(data?._id);
                                      }}
                                    >
                                      <i className="far fa-trash-alt text-danger me-1"></i>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="float-right my-2">
                      <Pagination
                        count={Math.ceil(pagination.count / pageSize)}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                      />
                    </div>
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
