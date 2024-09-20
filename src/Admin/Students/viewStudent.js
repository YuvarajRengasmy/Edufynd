import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/AdminSidebar";
import { getSingleStudent } from "../../api/student";
import { getallCurrency } from "../../api/currency";
import {
  getallProgram,
  getProgramByUniversity,
  getProgramByCountry,
} from "../../api/Program";
import { getUniversitiesByCountry } from "../../api/university";
import { getallUniversity } from "../../api/university";
import { saveApplication } from "../../api/applicatin";
import { getallIntake } from "../../api/intake";
import { formatYear } from "../../Utils/DateFormat";

import { toast } from "react-toastify";
import { getMonthYear } from "../../Utils/DateFormat";
import {
  getallApplication,
  deleteApplication,
  getStudentApplication,
} from "../../api/applicatin";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MdCameraAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { Program } from "../../api/endpoints";
import BackButton from "../../compoents/backButton";

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
    applicationFee: "",
    courseType: "",
  };
  const initialStateErrors = {
    name: { required: false },
    dob: { required: false },
    passportNo: { required: false },
    studentId: { required: false },
    country: { required: false },
    email: { required: false },
    primaryNumber: { required: false },
    whatsAppNumber: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    programTitle: { required: false },
    campus: { required: false },
    courseFees: { required: false },
    applicationFee: { required: false },
    courseType: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [staff, setStaff] = useState(null);
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
  }, [pagination.from, pagination.to]);

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
          whatsAppNumber: result?.whatsAppNumber,
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
        console.error(
          `Error fetching universities for ${selectedCountry}:`,
          err
        );
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
        console.error(
          `Error fetching programs for ${selectedUniversity}:`,
          err
        );
      });
  };

  const handleProgramChange = (event) => {
    const selectedProgramTitle = event.target.value;
    const program = programs.find(
      (prog) => prog.programTitle === selectedProgramTitle
    );
    setSelectedProgram(program || null);
    setInputs((prevInputs) => ({
      ...prevInputs,
      programTitle: selectedProgramTitle,
      campus: program ? program.campuses.map((campus) => campus.campus) : [],
      courseType: program ? program.courseType : "",
      applicationFee: program ? program.applicationFee : "",
    }));
  };

  const handleInputs = (event) => {
    console.log("balan", event);
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log("balangfd", setInputs);
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
      saveApplication({
        ...inputs,

        name: student?.name,
        dob: student?.dob,
        passportNo: student?.passportNo,
        studentId: student?._id,
        email: student?.email,
        primaryNumber: student?.primaryNumber,
        whatsAppNumber: student?.whatsAppNumber,
      })
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
        <div className="content-header ">
          <BackButton />

       
          <div className="container-fluid">
            <div className="container-fluid">
              <h2 className="text-center mb-4">Student Details</h2>

              <div className="row mb-4 align-items-center">
                <div className="col-md-2 text-center">
                  <img
                    src={student?.photo || "https://via.placeholder.com/150"}
                    alt="Profile Photo"
                    className="img-fluid rounded-circle border border-primary mb-3 my-auto"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <h3>{student?.name || "Not Available"}</h3>
                  <p className="text-muted">
                    {student?.studentCode || "Not Available"}
                  </p>
                </div>

                <div className="col-md-10">
                  <div className="text-end">
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
                  </div>

                  <ul
                    className="nav nav-pills mb-3"
                    id="studentTabs"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active"
                        id="basic-info-tab"
                        data-bs-toggle="tab"
                        href="#basic-info"
                        role="tab"
                        aria-controls="basic-info"
                        aria-selected="true"
                      >
                        Basic Info
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="academic-info-tab"
                        data-bs-toggle="tab"
                        href="#academic-info"
                        role="tab"
                        aria-controls="academic-info"
                        aria-selected="false"
                      >
                        Academic Info
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="test-info-tab"
                        data-bs-toggle="tab"
                        href="#test-info"
                        role="tab"
                        aria-controls="test-info"
                        aria-selected="false"
                      >
                        Test Info
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="travel-info-tab"
                        data-bs-toggle="tab"
                        href="#travel-info"
                        role="tab"
                        aria-controls="travel-info"
                        aria-selected="false"
                      >
                        Travel & Visa
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="finance-info-tab"
                        data-bs-toggle="tab"
                        href="#finance-info"
                        role="tab"
                        aria-controls="finance-info"
                        aria-selected="false"
                      >
                        Finance & Additional Info
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content" id="studentTabsContent">
                    <div
                      className="tab-pane fade show active"
                      id="basic-info"
                      role="tabpanel"
                      aria-labelledby="basic-info-tab"
                    >
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>
                            <strong>Date of Birth:</strong>{" "}
                            {student?.dob || "Not Available"}
                          </p>
                          <p>
                            <strong>Passport Number:</strong>{" "}
                            {student?.passportNo || "Not Available"}
                          </p>
                          <p>
                            <strong>Expiry Date:</strong>{" "}
                            {student?.expiryDate || "Not Available"}
                          </p>
                          <p>
                            <strong>Citizenship:</strong>{" "}
                            {student?.citizenship || "Not Available"}
                          </p>
                          <p>
                            <strong>Gender:</strong>{" "}
                            {student?.gender || "Not Available"}
                          </p>
                          <p>
                            <strong>PrimaryNumber:</strong>{" "}
                            {student?.dial2}-{student?.primaryNumber || "Not Available"}
                          </p>
                          <p>
                            <strong>WhatsApp Number:</strong>{" "}
                           {student?.dial2}-{student?.whatsAppNumber || "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="academic-info"
                      role="tabpanel"
                      aria-labelledby="academic-info-tab"
                    >
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>
                            <strong>Highest Qualification:</strong>{" "}
                            {student?.highestQualification || "Not Available"}
                          </p>
                          <p>
                            <strong>Degree Name:</strong>{" "}
                            {student?.degreeName || "Not Available"}
                          </p>
                          <p>
                            <strong>Institution:</strong>{" "}
                            {student?.institution || "Not Available"}
                          </p>
                          <p>
                            <strong>Percentage:</strong>{" "}
                            {student?.percentage || "Not Available"}
                          </p>
                          <p>
                            <strong>Academic Year:</strong>{" "}
                            {student?.academicYear || "Not Available"}
                          </p>
                          <p>
                            <strong>Year Passed:</strong>{" "}
                            {student?.yearPassed || "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="test-info"
                      role="tabpanel"
                      aria-labelledby="test-info-tab"
                    >
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>
                            <strong>Test Type:</strong>{" "}
                            {student?.englishTestType || "Not Available"}
                          </p>
                          <p>
                            <strong>Test Score:</strong>{" "}
                            {student?.testScore || "Not Available"}
                          </p>
                          <p>
                            <strong>Date of Test:</strong>{" "}
                            {student?.dateOfTest || "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="travel-info"
                      role="tabpanel"
                      aria-labelledby="travel-info-tab"
                    >
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>
                            <strong>Travel History:</strong>{" "}
                            {student?.doYouHaveTravelHistory || "Not Available"}
                          </p>
                          {student?.doYouHaveTravelHistory === "Yes" && (
  <>
    <p>
      <strong>Travel Date:</strong> {student?.date || "Not Available"}
    </p>
    <p>
      <strong>Purpose:</strong> {student?.purpose || "Not Available"}
    </p>
    <p>
      <strong>Country Name:</strong> {student?.countryName || "Not Available"}
    </p>
  </>
)}
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <p>
                            <strong>Visa Rejections:</strong>{" "}
                            {student?.anyVisaRejections || "Not Available"}
                          </p>
                          {student?.anyVisaRejections === "Yes" &&
                            <>
                          <p>
                            <strong>Visa Reason:</strong>{" "}
                            {student?.visaReason || "No Visa Rejections"}
                          </p>
                          <p>
                            <strong>Travel Date:</strong>{" "}
                            {student?.dateVisa || "No Visa Rejections"}
                          </p>
                          <p>
                            <strong>Purpose:</strong>{" "}
                            {student?.purposeVisa || "No Visa Rejections"}
                          </p>
                          <p>
                            <strong>Country:</strong>{" "}
                            {student?.countryNameVisa || "No Visa Rejections"}
                          </p>
                          </>
}
                          
                          
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="finance-info"
                      role="tabpanel"
                      aria-labelledby="finance-info-tab"
                    >
                      <div className="card mb-3">
                        <div className="card-body">
                          <p>
                            <strong>Finance Information:</strong>{" "}
                            {student?.finance || "Not Available"}
                          </p>
                          <p>
                            <strong>Duration</strong>{" "}
                            {student?.duration|| "Not Available"}
                          </p>
                          <p>
                            <strong>Last Employee</strong>{" "}
                            {student?.lastEmployeer || "Not Available"}
                          </p>
                          <p>
                            <strong>Last Duration</strong>{" "}
                            {student?.lastDesignation || "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="modal fade"
              id="ApplyStudentUniversity"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down">
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
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              value={inputs.country}
                              onChange={handleCountryChange}
                            >
                              <option value="">Select Country</option>
                              {[
                                ...new Set(
                                  universities.map((uni) => uni.country)
                                ),
                              ].map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
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
                              University
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              className="form-select font-weight-light"
                              name="universityName"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              value={inputs.universityName}
                              onChange={handleUniversityChange}
                            >
                              <option value="">Select University</option>
                              {universities.map((uni) => (
                                <option
                                  key={uni._id}
                                  value={uni.universityName}
                                >
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
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              value={inputs.programTitle}
                              onChange={handleProgramChange}
                            >
                              <option value="">Select Program</option>
                              {programs.map((program) => (
                                <option
                                  key={program._id}
                                  value={program.programTitle}
                                >
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
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              value={inputs.campus}
                              onChange={handleInputs}
                            >
                              <option value="">Select Campus</option>

                              {[
                                ...new Set(
                                  selectedProgram?.campuses?.map(
                                    (campus) => campus.campus
                                  )
                                ),
                              ].map((uniqueCampus, index) => (
                                <option key={index} value={uniqueCampus}>
                                  {uniqueCampus}
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
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "14px",
                              }}
                              value={inputs.inTake}
                              onChange={handleInputs}
                            >
                              <option value="">Select Intake</option>

                              {[
                                ...new Set(
                                  selectedProgram?.campuses?.map(
                                    (campus) => campus.inTake
                                  )
                                ),
                              ].map((uniqueCampus, index) => (
                                <option key={index} value={uniqueCampus}>
                                  {uniqueCampus}
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
                              value={student?.name}
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
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden  ">
                            <label style={{ color: "#231F20" }}>
                              Student Id
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              // type="text"
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
                              value={student?.dob?.slice(0, 10)}
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
                              value={student?.passportNo}
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
                              value={student?.email}
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
                              value={student?.primaryNumber}
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
                              value={student?.whatsAppNumber}
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
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              ApplicationFee
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 p-2"
                              placeholder="Enter Course Type"
                              name="applicationFee"
                              value={inputs?.applicationFee}
                              onChange={handleInputs}
                              style={{
                                backgroundColor: "#fff",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            />
                            {errors.applicationFee.required ? (
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
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn"
                        style={{
                          backgroundColor: "#fe5722",
                          color: "#fff",
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
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
                                    {getMonthYear(data?.createdOn) ||
                                      "Not Available"}
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
                                    {data?.course ||
                                      data?.programTitle ||
                                      "Not Available"}
                                  </td>
                                  <td className="text-capitalize text-start text-truncate"></td>

                                  <td className="text-capitalize text-start text-truncate">
                                    <div className="d-flex">
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/view_application",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-eye text-primary me-1"></i>
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/edit_application",
                                          search: `?id=${data?._id}`,
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

          <div className="container-fluid my-2">
            <div className="row ">
              <div className="col-12 col-lg-7 col-auto">
                <ul className="list-unstyled">
                  <li className="mb-4 position-relative">
                    <div className="row align-items-start g-0">
                      <div className="col-1 d-flex justify-content-center align-items-center">
                        <div
                          className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                          style={{ width: "2rem", height: "2rem" }}
                        >
                          <i className="fas fa-check" />
                        </div>
                      </div>
                      <div className="col-4 text-center">
                        <p className="mb-1 fw-semibold text-muted">
                          23 August, 2023 10:30 AM
                        </p>
                        <p className="mb-0 text-muted">
                          Changed by:<strong>John Doe</strong>
                        </p>
                      </div>

                      <div className="col-7">
                        <div className="mb-3">
                          <div className="bg-success text-white rounded-3 p-2">
                            <h6 className="mb-1">New University Name</h6>
                            <p className="mb-0">University Y</p>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="bg-danger text-white rounded-3 p-2">
                            <h6 className="mb-1">Old University Name</h6>
                            <p className="mb-0">University X</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="position-absolute top-0 start-0 translate-middle-x"
                      style={{
                        width: 2,
                        height: "100%",
                        backgroundColor: "#007bff",
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
