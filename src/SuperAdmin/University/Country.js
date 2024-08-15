import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { getallCurrency } from "../../api/currency";
import { getallProgram, getProgramByUniversity, getProgramByCountry } from "../../api/Program";
import { getUniversitiesByCountry } from "../../api/university";
import { getallUniversity } from "../../api/university";

import { getallIntake } from "../../api/intake";
import { formatYear } from "../../Utils/DateFormat";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { MdCameraAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { Program } from "../../api/endpoints";

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
  const [program, setProgram] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [university, setUniversity] = useState([]);

  const navigate = useNavigate();
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
  const getAllUniversity = () => {
    getallUniversity()
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        setCountries(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllProgramList = () => {
    getallProgram()
      .then((res) => {
        console.log("getAllProgramList", res?.data?.result);
        setProgram(res?.data?.result?.programList || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (!data.country) {
      error.country.required = true;
    }
    if (!data.name) {
      error.name.required = true;
    }
    if (!data.dob) {
      error.dob.required = true;
    }
    if (!data.passportNo) {
      error.passportNo.required = true;
    }
    if (!data.email) {
      error.email.required = true;
    }
    if (!data.primaryNumber) {
      error.primaryNumber.required = true;
    }
    if (!data.whatsAppNumber) {
      error.whatsAppNumber.required = true;
    }
    if (!data.inTake) {
      error.inTake.required = true;
    }
    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!data.programTitle) {
      error.programTitle.required = true;
    }
    if (!data.campus) {
      error.campus.required = true;
    }
    if (!data.courseFees) {
      error.courseFees.required = true;
    }
    if (!data.courseType) {
      error.courseType.required = true;
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
    setInputs((prevInputs) => ({ ...prevInputs, universityId: selectedUniversity }));

    getProgramByUniversity(selectedUniversity)
      .then((res) => {
        console.log("yui" ,res?.data?.data?.universityDetails?.programDetails

        );
        setPrograms(res?.data?.data?.universityDetails?.programDetails || []);
      })
      .catch((err) => {
        console.error(`Error fetching programs for ${selectedUniversity}:`, err);
     
      });
  };
 

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };
  
      // Check if the changed field is the programTitle
      if (name === "programTitle") {
        const selectedProgram = program.find((u) => u.programTitle === value); // Ensure programs is correctly referenced
  
        if (selectedProgram) {
          const campuses = selectedProgram.campuses.map((campus) => campus.campus);

          return {
            ...updatedProgram,
            campus: campuses,
            courseType: selectedProgram.courseType,
          };
        }
      }
      return updatedProgram;
    });
  
    // Validate the updated inputs
    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };
  

  const handleErrors = (error) => {
    let isValid = true;
    Object.keys(error).forEach((key) => {
      if (error[key].required) {
        isValid = false;
      }
    });
    return isValid;
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

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header">
   
      
          <div className="container-fluid">
            <h2 className="mb-4 text-center">Student Details</h2>

            <div className="row mb-4">
             

            
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Course Apply
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <form>
                        <div class="modal-body">
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
                              value={inputs._id}
                              onChange={handleUniversityChange}
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
                                  value={uni._id}
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
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                 Program Name
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  className="form-select rounded-1 p-2"
                                  name="programTitle"
                                  onChange={handleInputs}
                                  value={inputs.programTitle}
                                >
                                  <option>Select Campus</option>
                                {programs.map((program) => (
                                  <option
                                    key={program._id}
                                    value={program.programTitle}
                                  >
                                    {program.programTitle}
                                  </option>
                                ))}
                                </select>
                                {errors.programTitle.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Campus<span className="text-danger">*</span>
                                </label>
                                <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  className="form-select rounded-1 p-2"
                                  name="campus"
                                  value={inputs.campus}
                                  onChange={handleInputs}
                                >
                                  <option>Select Campus</option>
                                  {program.campuses && program.campuses.map((campus) => (
                                    <option
                                      key={campus._id}
                                      value={campus.campus}
                                    >
                                      {campus.campus}
                                    </option>
                                  ))}
                                </select>
                                {errors.campus.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>

                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  InTake<span className="text-danger">*</span>
                                </label>
                                <select
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  className="form-select rounded-1 p-2"
                                  name="inTake"
                                  onChange={handleInputs}
                                  value={inputs.inTake}
                                >
                                  <option>Select InTake</option>
                                {program.campuses && program.campuses.map((intake) => (
                                  <option
                                    key={intake._id}
                                    value={intake.inTake}
                                  >
                                    {intake.inTake}
                                  </option>
                                ))}
                                </select>
                                {errors.inTake.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
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
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Course Fees
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 p-2"
                                  placeholder="Enter Course Fees"
                                  value={inputs?.courseFees}
                                  name="courseFees"
                                  style={{
                                    backgroundColor: "#fff",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                                {errors.courseFees.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary text-white px-4 py-2 text-uppercase fw-semibold"
                            style={{ fontSize: "12px" }}
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn text-white px-4 py-2 text-uppercase fw-semibold"
                            style={{
                              backgroundColor: "#fe5722",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            Submit
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
