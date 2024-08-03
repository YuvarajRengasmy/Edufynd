import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { getallCurrency } from "../../api/currency";
import { getallProgram, getProgramByCountry } from "../../api/Program";
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
    email: "",
    primaryNumber: "",
    whatsAppNumber: "",
    inTake: "",
    universityName: "",
    course: "",
    campus: "",
    courseFees: "",
  };
  const initialStateErrors = {
    name: { required: false },
    email: { required: false },
    primaryNumber: { required: false },
    whatsAppNumber: { required: false },
    inTake: { required: false },
    universityName: { required: false },
    course: { required: false },
    campus: { required: false },
    courseFees: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [student, setStudent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getStudentDetails();
    getAllCurrencyDetails();
    getAllUniversityList();
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

  const getAllCurrencyDetails = () => {
    getallCurrency()
      .then((res) => {
        setCountries(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUniversityList = () => {
    getallProgram()
      .then((res) => {
        setUniversities(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    Object.keys(initialStateInputs).forEach((key) => {
      if (!data[key]) {
        error[key].required = true;
      }
    });
    return error;
  };

  const handleErrors = (error) => {
    return !Object.values(error).some((field) => field.required);
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setStudent({ ...student, country: selectedCountry });

    getProgramByCountry(selectedCountry)
      .then((res) => {
        setUniversities(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(`Error fetching universities for ${selectedCountry}:`, err);
        setUniversities([]);
      });
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (submitted) {
      const newErrors = handleValidation({ ...inputs, [event.target.name]: event.target.value });
      setErrors(newErrors);
    }
  };

  const handleAddModule = () => {
    setInputs(initialStateInputs);
    setIsEditing(false);
    setSubmitted(false);
    setErrors(initialStateErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const newErrors = handleValidation(inputs);
    setErrors(newErrors);

    if (handleErrors(newErrors)) {
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
              <div className="col-md-4 text-center">
                <img
                  src={student?.photo || "https://via.placeholder.com/150"}
                  alt="Profile Photo"
                  className="img-fluid rounded-circle img-thumbnail"
                  style={{ width: "10rem", height: "10rem" }}
                />
              </div>

              <div className="col-md-4">
                <h3 className="mb-2">{student?.name}</h3>
                <p className="text-muted mb-2">Student Code: {student?.studentCode}</p>
                <p className="text-muted mb-2">
                  <i className="fas fa-envelope me-2"></i>{student?.email}
                </p>
                <p className="text-muted mb-2">
                  <i className="fas fa-phone-alt me-2"></i>{student?.primaryNumber}
                </p>
              </div>
              <div className="col-md-4">
                <div className="card card-body border-0 p-4">
                  <h6 className="fw-semibold text-center">Application Submission</h6>
                  <p className="card-text text-center my-2">
                    <Link
                      to="#"
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
                <div className="modal fade" id="ApplyStudentUniversity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Course Apply</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                  value={student.country || ""}
                                  onChange={handleCountryChange}
                                >
                                  <option className="font-weight-light" value="" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                                    Select Country
                                  </option>
                                  {countries.map((country) => (
                                    <option key={country._id} value={country.country}>{country.country}</option>
                                  ))}
                                </select>
                                {errors.country?.required && (
                                  <span className="text-danger form-text profile_error">This field is required.</span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  InTake<span className="text-danger">*</span>
                                </label>
                                <select
                                  style={{ backgroundColor: "#fff", fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                                  className="form-select rounded-1 p-2"
                                  name="inTake"
                                  value={inputs.inTake}
                                  onChange={handleInputs}
                                >
                                  <option>Select InTake</option>
                                  {/* Add intake options here */}
                                </select>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  University<span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-select font-weight-light"
                                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                                  name="universityName"
                                  value={inputs.universityName}
                                  onChange={handleInputs}
                                >
                                  <option className="font-weight-light" value="">Select University</option>
                                  {universities.map((university) => (
                                    <option key={university._id} value={university.name}>{university.name}</option>
                                  ))}
                                </select>
                                {errors.universityName?.required && (
                                  <span className="text-danger form-text profile_error">This field is required.</span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Course<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="course"
                                  value={inputs.course}
                                  onChange={handleInputs}
                                />
                                {errors.course?.required && (
                                  <span className="text-danger form-text profile_error">This field is required.</span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Campus<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="campus"
                                  value={inputs.campus}
                                  onChange={handleInputs}
                                />
                                {errors.campus?.required && (
                                  <span className="text-danger form-text profile_error">This field is required.</span>
                                )}
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Course Fees<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="courseFees"
                                  value={inputs.courseFees}
                                  onChange={handleInputs}
                                />
                                {errors.courseFees?.required && (
                                  <span className="text-danger form-text profile_error">This field is required.</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-body border-0 p-4 mt-4">
              <h5 className="text-center">Student Profile</h5>
              <div className="text-center mt-2">
                <p><strong>Name:</strong> {student?.name}</p>
                <p><strong>Email:</strong> {student?.email}</p>
                <p><strong>Primary Number:</strong> {student?.primaryNumber}</p>
                <p><strong>WhatsApp Number:</strong> {student?.whatsAppNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
