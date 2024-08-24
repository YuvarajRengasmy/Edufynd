import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidDob,
  isValidPhone,
  isValidName,
  isValidNo,
  isValidPassportNumber
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { StudentSuperAdmin, getallStudent } from "../../api/student";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdCameraAlt } from "react-icons/md";
function AddAgent() {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const initialState = {
    source: "",
    name: "",
    photo: "",
    passportNo: "",
    expiryDate: "",
    citizenship: "",
    dob: "",
    gender: "",
    highestQualification: "",
    degreeName: "",
    academicYear: "",
    yearPassed: "",
    institution: "",
    percentage: "",
    doHaveAnyEnglishLanguageTest: "",
    englishTestType: "",
    testScore: "",
    dateOfTest: "",
    desiredCountry: "",
    desiredUniversity: "",
    desiredCourse: "",
    workExperience: "",
    anyVisaRejections: "",
    visaReason: "",
    doYouHaveTravelHistory: "",
    travelReason: "",
    finance: "",
    email: "",
    primaryNumber: "",
    whatsAppNumber: "",
    duration:"",
    lastEmployeer:"",
    lastDesignation:"",
    date:"",
    purpose:"",
    countryName:"",
    dateVisa:"",
    purposeVisa:"",
    countryNameVisa:""
  };
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    photo: { required: false },
    passportNo: { required: false },
    expiryDate: { required: false },
    citizenship: { required: false },
    dob: { required: false },
    gender: { required: false },
    highestQualification: { required: false },
    addressLine1: { required: false },
    degreeName: { required: false },
    academicYear: { required: false },
    yearPassed: { required: false },
    institution: { required: false },
    percentage: { required: false },
    doHaveAnyEnglishLanguageTest: { required: false },
    englishTestType: { required: false },
    testScore: { required: false },
    dateOfTest: { required: false },
    desiredCountry: { required: false },
    desiredUniversity: { required: false },
    desiredCourse: { required: false },
    workExperience: { required: false },
    anyVisaRejections: { required: false },
    visaReason: { required: false },
    doYouHaveTravelHistory: { required: false },
    travelReason: { required: false },
    finance: { required: false },
    email: { required: false, valid: false },
    primaryNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
    duration:{required:false},
    lastEmployeer:{required:false},
    lastDesignation:{required:false},
    date:{required:false},
    purpose:{required:false},
    countryName:{required:false},
    dateVisa:{required:false},
    purposeVisa:{required:false},
    countryNameVisa:{required:false}
  };
  const [student, setStudent] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    getStudentDetails();
}, []);

const getStudentDetails = () => {
  getallStudent(id)
        .then((res) => {
            setStudent(res?.data?.result);
        })
        .catch((err) => {
            console.log(err);
        });
};
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.source === "") {
      error.source.required = true;
    }
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.passportNo === "") {
      error.passportNo.required = true;
    }
    if (data.expiryDate === "") {
      error.expiryDate.required = true;
    }
    if (data.citizenship === "") {
      error.citizenship.required = true;
    }
    if (data.dob === "") {
      error.dob.required = true;
    }
    if (data.gender === "") {
      error.gender.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.primaryNumber === "") {
      error.primaryNumber.required = true;
    }
    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }
    if (data.highestQualification === "") {
      error.highestQualification.required = true;
    }
    if (data.degreeName === "") {
      error.degreeName.required = true;
    }
    if (data.academicYear === "") {
      error.academicYear.required = true;
    }
    if (data.yearPassed === "") {
      error.yearPassed.required = true;
    }
    if (data.institution === "") {
      error.institution.required = true;
    }
    if (data.percentage === "") {
      error.percentage.required = true;
    }
    if (data.doHaveAnyEnglishLanguageTest === "") {
      error.doHaveAnyEnglishLanguageTest.required = true;
    }
    if (data.desiredCountry === "") {
      error.desiredCountry.required = true;
    }
    if (data.desiredUniversity === "") {
      error.desiredUniversity.required = true;
    }
    if (data.desiredCourse === "") {
      error.desiredCourse.required = true;
    }
    if (data.workExperience === "") {
      error.workExperience.required = true;
    }
    if (data.anyVisaRejections === "") {
      error.anyVisaRejections.required = true;
    }
    if (data.doYouHaveTravelHistory === "") {
      error.doYouHaveTravelHistory.required = true;
    }
    if (data.finance === "") {
      error.finance.required = true;
    }
   
    if (!isValidPassportNumber(data.passportNo)) {
      error.passportNo.valid = true;
    }
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    if (!isValidDob(data.dob)) {
      error.dob.valid = true;
    }

    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidName(data.name)) {
      error.name.valid = true;
    }
    if (!isValidName(data.institution)) {
      error.institution.valid = true;
    }
    if (!isValidName(data.degreeName)) {
      error.degreeName.valid = true;
    }
    if (!isValidName(data.highestQualification)) {
      error.highestQualification.valid = true;
    }
    if (!isValidNo(data.percentage)) {
      error.percentage.valid = true;
    }

    return error;
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setStudent((prevStudent) => {
        const updatedStudent = { ...prevStudent, [name]: value };
        return updatedStudent;
      });
    }
    if (submitted) {
      const newError = handleValidation({ ...student, [name]: value });
      setErrors(newError);
    }
  };
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
    const newError = handleValidation(student);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      StudentSuperAdmin(student)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_student");
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
            className="content-wrapper "
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
          >
            <div className="content-header ">
              <div className=" container-fluid ">
                <div className="row ">
                  <div className="col-xl-12 ">
                    <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          {" "}
                          Add Student Details
                        </h5>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="card-body mt-2 ">
                          <div className="row g-3 ">
                            <div className="position-relative d-inline-block">
                              <img
                                className="img-fluid rounded-circle img-thumbnail mx-auto d-block"
                                src={
                                  student?.photo
                                    ? student?.photo
                                    : "https://via.placeholder.com/128"
                                }
                                alt="student-image"
                                style={{ width: "8rem", height: "8rem" }}
                              />
                              <label
                                htmlFor="fileInputImage"
                                className="position-absolute fs-6 rounded-circle "
                                style={{
                                  cursor: "pointer",
                                  bottom: "5%",
                                  left: "53.5%",
                                  transform: "translate(25%, 25%)",
                                  color: "#0f2239",
                                }}
                              >
                                <i className="fas fa-camera"></i>
                              </label>
                              <input
                                name="photo"
                                id="fileInputImage"
                                type="file"
                                accept="image/*"
                                className="form-control border-0 text-dark bg-transparent"
                                style={{
                                  display: "none",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                onChange={handleInputs}
                              />
                            </div>
                            <div className="row">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  {" "}
                                  Source<span className="text-danger">*</span>
                                </label>
                                <select
                                  class={`form-select form-select-lg rounded-1 ${errors.source.required ? 'is-invalid' : ''}`}
                                  value={student?.source}
                                  aria-label="Default select example"
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  name="source"
                                  onChange={handleInputs}
                                >
                                  <option value="">Select Source</option>
                                  <option value="Walk In">Walk In</option>
                                  <option value="Social Media">
                                    Social Media
                                  </option>
                                  <option value="agent">Agent</option>
                                </select>
                                {errors.source.required && (
                                  <div className="text-danger form-text">
                                    This field is required.
                                  </div>
                                ) }
                              </div>
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Student Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="">
                                <input
                                  type="text"
                                  value={student?.name}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  name="name"
                                  onChange={handleInputs}
                                  className={`form-control ${errors.name.required ? 'is-invalid' : errors.name.valid ? 'is-valid' : '' }`}
                                  placeholder="Example John Doe"
                                />
                                {errors.name.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : errors.name.valid ? (
                                  <span className="text-danger form-text profile_error">
                                    Enter a Letter Only.
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Citizenship
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.citizenship.required ? 'is-invalid' : errors.citizenship.valid ? 'is-valid' : '' }`}
                                value={student?.citizenship}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example Indian"
                                name="citizenship"
                                onChange={handleInputs}
                              />
                              {errors.citizenship.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                DOB<span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className={`form-control ${errors.dob.required ? 'is-invalid' : errors.dob.valid ? 'is-valid' : '' }`}
                                placeholder="Enter Name"
                                value={student?.dob}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="dob"
                                onChange={handleInputs}
                              />
                              {errors.dob.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : errors.dob.valid ? (
                                <span className="text-danger form-text profile_error">
                                  Enter 15 Year eligible Student Apply
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                PassportNo<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.passportNo.required ? 'is-invalid' : errors.passportNo.valid ? 'is-valid' : '' }`}
                                value={student?.passportNo}
                                placeholder="Example M12345678"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="passportNo"
                                onChange={handleInputs}
                              />
                             {errors.passportNo.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : errors.passportNo.valid ? (
                                  <span className="text-danger form-text profile_error">
                                    Enter valid PassportNo
                                  </span>
                                ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Expiry Date{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                value={student?.expiryDate}
                                className={`form-control ${errors.expiryDate.required ? 'is-invalid' : errors.expiryDate.valid ? 'is-valid' : '' }`}
                                placeholder="Enter Contact Number "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="expiryDate"
                                onChange={handleInputs}
                              />
                              {errors.expiryDate.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Gender<span className="text-danger">*</span>
                              </label>
                              <select
                                type="text"
                                value={student?.gender}
                                className={`form-select ${errors.gender.required ? 'is-invalid' : errors.gender.valid ? 'is-valid' : '' }`}
                                placeholder="Select Gender"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="gender"
                                onChange={handleInputs}
                              >
                                <option value="">Select Gender Type</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                              </select>
                              {errors.gender.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Email ID<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.email}
                                className={`form-control ${errors.email.required ? 'is-invalid' : errors.email.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example johndoe123@gmail.com"
                                name="email"
                                onChange={handleInputs}
                              />
                              {errors.email.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.email.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Email Id.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Primary Number
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                value={student?.primaryNumber}
                                className={`form-control ${errors.primaryNumber.required ? 'is-invalid' : errors.primaryNumber.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example 123-456-789"
                                name="primaryNumber"
                                onChange={handleInputs}
                              />
                              {errors.primaryNumber.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : errors.primaryNumber.valid ? (
                                <span className="text-danger form-text profile_error">
                                  Enter valid mobile number.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                WhatsApp Number{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                value={student?.whatsAppNumber}
                                className={`form-control ${errors.whatsAppNumber.required ? 'is-invalid' : errors.whatsAppNumber.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example 123-456-789"
                                name="whatsAppNumber"
                                onChange={handleInputs}
                              />
                              {errors.whatsAppNumber.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : errors.whatsAppNumber.valid ? (
                                <span className="text-danger form-text profile_error">
                                  Enter valid whatsAppNumber.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Highest Qualification
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.highestQualification}
                                className={`form-control ${errors.highestQualification.required ? 'is-invalid' : errors.highestQualification.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example B.A. in English"
                                name="highestQualification"
                                onChange={handleInputs}
                              />
                              {errors.highestQualification.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.highestQualification.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Only Letters.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Degree Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.degreeName}
                                className={`form-control ${errors.degreeName.required ? 'is-invalid' : errors.degreeName.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example  B.Sc. IT"
                                name="degreeName"
                                onChange={handleInputs}
                              />
                              {errors.degreeName.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.degreeName.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Only Letters.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Percentage<span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                value={student?.percentage}
                                className={`form-control ${errors.percentage.required ? 'is-invalid' : errors.percentage.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example 85"
                                name="percentage"
                                onChange={handleInputs}
                              />
                              {errors.percentage.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.percentage.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Two digit number.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Institution Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.institution}
                                className={`form-control ${errors.institution.required ? 'is-invalid' : errors.institution.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example Harvard University"
                                name="institution"
                                onChange={handleInputs}
                              />
                              {errors.institution.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.institution.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid Only Letters.
                                </div>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Start Date<span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                value={student?.academicYear}
                                className={`form-control ${errors.academicYear.required ? 'is-invalid' : errors.academicYear.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter Start Date"
                                name="academicYear"
                                onChange={handleInputs}
                              />
                              {errors.academicYear.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                End Date<span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                className={`form-control ${errors.yearPassed.required ? 'is-invalid' : errors.yearPassed.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                placeholder="Enter End Date"
                                name="yearPassed"
                                value={student?.yearPassed}
                                onChange={handleInputs}
                              />
                              {errors.yearPassed.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="d-inline text-end">
                            <button class="btn fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{color:'#fff',background:'#231f20'}}>
                            <i class="fa fa-plus-circle" aria-hidden="true"></i> &nbsp;  Work Experience
  </button>
                            </div>
                            

<div class="collapse" id="collapseExample">
  <div class="work">
  <div className="row g-3">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  className="form-control "
                                  value={student?.duration}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example 2 Years"
                                  name="duration"
                                  onChange={handleInputs}
                                />
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Last Employeer
                                </label>
                                <input
                                  type="Text"
                                  className="form-control  "
                                  value={student?.lastEmployeer}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example Microsoft Corporation"
                                  name="lastEmployeer"
                                  onChange={handleInputs}
                                />
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Last Designation
                                </label>
                                <input
                                  type="Text"
                                  className="form-control  "
                                  value={student?.lastDesignation}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Example Senior Software Engineer"
                                  name="lastDesignation"
                                  onChange={handleInputs}
                                />
                              </div>

                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Do You Have Any ELT{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  type="text"
                                  value={student?.doHaveAnyEnglishLanguageTest}
                                  className={`form-select form-select-lg ${errors.doHaveAnyEnglishLanguageTest.required ? 'is-invalid' : errors.doHaveAnyEnglishLanguageTest.valid ? 'is-valid' : '' }`}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Enter Do have any English Language Test "
                                  name="doHaveAnyEnglishLanguageTest"
                                  onChange={handleInputs}
                                >
                                  <option value="">
                                    Select English Test Type
                                  </option>
                                  <option value="doHaveAnyEnglishLanguageTest">
                                    Yes
                                  </option>
                                  <option value="no">No</option>
                                </select>
                                {errors.doHaveAnyEnglishLanguageTest
                                  .required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                            
                             
                            
                             
                           
                            {student.doHaveAnyEnglishLanguageTest ===
                              "doHaveAnyEnglishLanguageTest" && (
                              <div className="row g-3">
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    English Test Type
                                  </label>
                                  <select
                                    type="text"
                                    value={student?.englishTestType}
                                    className="form-select form-select-lg rounded-2"
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Enter English Test Type"
                                    name="englishTestType"
                                    onChange={handleInputs}
                                  >
                                    <option value="">
                                      Select English Test Type
                                    </option>
                                    <option value="IELTS">IELTS</option>
                                    <option value="TOEFL">TOEFL</option>
                                    <option value="PTE">PTE</option>
                                    <option value="SAT">SAT</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Test Score
                                  </label>
                                  <input
                                    type="text"
                                    value={student?.testScore}
                                    className="form-control "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Example 75"
                                    name="testScore"
                                    onChange={handleInputs}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Date Of Test
                                  </label>
                                  <input
                                    type="date"
                                    value={student?.dateOfTest}
                                    className="form-control text-uppercase "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "11px",
                                    }}
                                    placeholder="Enter Date Of Test"
                                    name="dateOfTest"
                                    onChange={handleInputs}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="row g-3">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Do You Have Travel History
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  type="text"
                                  value={student?.doYouHaveTravelHistory}
                                  className={`form-select form-select-lg ${errors.doYouHaveTravelHistory.required ? 'is-invalid' : errors.doYouHaveTravelHistory.valid ? 'is-valid' : '' }`}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Enter Do You Have  Travel History"
                                  name="doYouHaveTravelHistory"
                                  onChange={handleInputs}
                                >
                                  <option value="">
                                    Do You Have Travel History
                                  </option>
                                  <option value="doYouHaveTravelHistory">
                                    Yes
                                  </option>
                                  <option value="No">No</option>
                                </select>
                                {errors.doYouHaveTravelHistory.required ? (
                                  <span className="text-danger form-text profile_error">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                            </div>




                            {student.doYouHaveTravelHistory ===
                              "doYouHaveTravelHistory" && (
                              <div className="row g-3">
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Travel Date
                                  </label>
                                  <input
                                    type="date"
                                    value={student?.date}
                                    className="form-control text-uppercase "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "11px",
                                    }}
                                    placeholder="Enter Date"
                                    name="date"
                                    onChange={handleInputs}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Purpose
                                  </label>
                                  <input
                                    type="text"
                                    value={student?.purpose}
                                    className="form-control "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Example Work"
                                    name="purpose"
                                    onChange={handleInputs}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    value={student?.countryName}
                                    className="form-control  "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Example New Year"
                                    name="countryName"
                                    onChange={handleInputs}
                                  />
                                </div>
                               


                              </div>
                            )}

<div className="row g-3"><div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Any Visa Rejections
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  type="text"
                                  value={student?.anyVisaRejections}
                                  className={`form-select form-select-lg ${errors.anyVisaRejections.required ? 'is-invalid' : errors.anyVisaRejections.valid ? 'is-valid' : '' }`}
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  placeholder="Enter Any Visa Rejections"
                                  name="anyVisaRejections"
                                  onChange={handleInputs}
                                >
                                  <option value="">Any Visa Rejections</option>
                                  <option value="anyVisaRejections">Yes</option>
                                  <option value="No">No</option>
                                </select>
                                {errors.anyVisaRejections.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) }

                             
                              </div></div>




                                  {student.anyVisaRejections ===
                                "anyVisaRejections" && (
                                    <div className="row g-3">
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Visa Reason
                                  </label>
                                  <input
                                    type="text"
                                    value={student?.visaReason}
                                    className="form-control "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Example Studying"
                                    name="visaReason"
                                    onChange={handleInputs}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Travel Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control text-uppercase "
                                    value={student?.dateVisa}
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "11px",
                                    }}
                                    placeholder="Enter Travel Date"
                                    name="dateVisa"
                                    onChange={handleInputs}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Purpose
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control "
                                    value={student?.purposeVisa}
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Example Study"
                                    name="purposeVisa"
                                    onChange={handleInputs}
                                  />
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    value={student?.countryNameVisa}
                                    className="form-control  "
                                    style={{
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                    placeholder="Example United Kingdom"
                                    name="countryNameVisa"
                                    onChange={handleInputs}
                                  />
                                </div>
                               

                                </div>
                                
                              )}

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Desired University{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.desiredUniversity.required ? 'is-invalid' : errors.desiredUniversity.valid ? 'is-valid' : '' }`}
                                value={student?.desiredUniversity}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example Standford University "
                                name="desiredUniversity"
                                onChange={handleInputs}
                              />
                              {errors.desiredUniversity.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Desired Country{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.desiredCountry}
                                className={`form-control ${errors.desiredCountry.required ? 'is-invalid' : errors.desiredCountry.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example New York "
                                name="desiredCountry"
                                onChange={handleInputs}
                              />
                              {errors.desiredCountry.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Desired Course{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.desiredCourse}
                                className={`form-control ${errors.desiredCourse.required ? 'is-invalid' : errors.desiredCourse.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example Game Development "
                                name="desiredCourse"
                                onChange={handleInputs}
                              />
                              {errors.desiredCourse.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Finance<span className="text-danger">*</span>
                              </label>
                              <select
                                type="text"
                                value={student?.finance}
                                className={`form-select form-select-lg ${errors.finance.required ? 'is-invalid' : errors.finance.valid ? 'is-valid' : '' }`}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter Finance"
                                name="finance"
                                onChange={handleInputs}
                              >
                                <option value="">Select Finance Type</option>
                                <option value="loan">Loan</option>
                                <option value="self">Self </option>
                              </select>

                              {errors.finance.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 visually-hidden">
                              <label style={{ color: "#231F20" }}>
                                Work Experience
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={student?.workExperience}
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter Work Experience"
                                name="workExperience"
                                onChange={handleInputs}
                              />
                              {errors.workExperience.required ? (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
  </div>
</div>
</div>
                           

                            

                            <div className="row g-3">
                              <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                <Link
                                  style={{
                                    backgroundColor: "#231F20",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  to="/list_student"
                                  className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2  text-white m-2"
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
                                  className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2"
                                >
                                save
                                </button>
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
          </div>
        </div>
      
    </>
  );
}
export default AddAgent;
