import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";
import { toast } from "react-toastify";
import { updateStaff, getSingleStaff } from "../../api/staff";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";

export const AddStaff = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    photo: "",
    empName: "",
    designation: "",
    jobDescription: "",
    reportingManager: "",
    shiftTiming: "", // (Attendance to be calculated based on this)
    areTheyEligibleForCasualLeave: "", // – Yes/No (Yes – Casual to be considered | No – Casual leave restricted)
    doj: "", // (Date of Joining)
    dob: "", // (Date of Birth)
    address: "",
    email: "",
    mobileNumber: "",
    emergencyContactNo: "",
    probationDuration: "",
    salary: "", // (Break Up with deduction – Manual)
    idCard: "", // – Yes / No (If ‘Yes’ card to be generated)
    manageApplications: "", // Yes/No
    //If Yes, List Country & University The user can only handle applications of these universities and country
    activeInactive: "", // – User
    teamLead: "",
  };
  const initialStateErrors = {
    photo: { required: false },
    empName: { required: false },
    designation: { required: false },
    jobDescription: { required: false },
    reportingManager: { required: false },
    shiftTiming: { required: false }, // (Attendance to be calculated based on this)
    areTheyEligibleForCasualLeave: { required: false }, // – Yes/No (Yes – Casual to be considered | No – Casual leave restricted)
    doj: { required: false }, // (Date of Joining)
    dob: { required: false }, // (Date of Birth)
    address: { required: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    emergencyContactNo: { required: false, valid: false },
    probationDuration: { required: false },
    salary: { required: false }, // (Break Up with deduction – Manual)
    idCard: { required: false }, // – Yes / No (If ‘Yes’ card to be generated)
    manageApplications: { required: false }, // Yes/No
    //If Yes, List Country & University The user can only handle applications of these universities and country
    activeInactive: { required: false }, // – User
    teamLead: { required: false },
  };
  const [staff, setStaff] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getStaffDetails();
  }, []);

  const getStaffDetails = () => {
    getSingleStaff(id)
      .then((res) => {
        console.log(res);
        setStaff(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.empName === "") {
      error.empName.required = true;
    }

    if (data.designation === "") {
      error.designation.required = true;
    }
    if (data.jobDescription === "") {
      error.jobDescription.required = true;
    }
    if (data.reportingManager === "") {
      error.reportingManager = true;
    }
    if (data.shiftTiming === "") {
      error.shiftTiming.required = true;
    }
    if (data.areTheyEligibleForCasualLeave === "") {
      error.areTheyEligibleForCasualLeave.required = true;
    }
    if (data.doj === "") {
      error.doj.required = true;
    }
    if (data.dob === "") {
      error.dob.required = true;
    }
    if (data.address === "") {
      error.address.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.emergencyContactNo === "") {
      error.emergencyContactNo.required = true;
    }
    if (data.probationDuration === "") {
      error.probationDuration.required = true;
    }
    if (data.salary === "") {
      error.salary.required = true;
    }
    if (data.idCard === "") {
      error.idCard.required = true;
    }
    if (data.manageApplications === "") {
      error.manageApplications.required = true;
    }
    if (data.teamLead === "") {
      error.teamLead.required = true;
    }
    if (data.activeInactive === "") {
      error.activeInactive.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }

    if (!isValidPhone(data.emergencyContactNo)) {
      error.emergencyContactNo.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setStaff({ ...staff, [event?.target?.name]: event?.target?.value });
    }
    if (submitted) {
      const newError = handleValidation({
        ...staff,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setStaff((staff) => ({
        ...staff,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
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
    const newError = handleValidation(staff);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      updateStaff(staff)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListStaff");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </nav>

          <div
            className="content-wrapper"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
          >
            <div className="content-header ">
              <div className="content container-fluid">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12  ">
                      <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                        <div
                          className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                          style={{ background: "#fe5722", color: "#fff" }}
                        >
                          <h5 className="text-center text-capitalize p-1">
                            {" "}
                            Edit Staff Details
                          </h5>
                        </div>

                        <div className="card-body mt-2 ">
                          <div className="row g-3 ">
                            <div className="position-relative d-inline-block">
                              <img
                                className="img-fluid rounded-circle img-thumbnail mx-auto d-block"
                                src="https://placehold.co/128x128"
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
                                name="universityLogo"
                                id="fileInputImage"
                                type="file"
                                accept="image/*"
                                className="form-control rounded-2 border-0 text-dark bg-transparent"
                                style={{
                                  display: "none",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                            </div>

                          
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Name<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2  "
                                placeholder="Enter Name "
                                value={staff.empName}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="empName"
                                onChange={handleInputs}
                              />
                              {errors.empName.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                DOB<span className="text-danger">*</span>
                              </label>

                              <input
                                type="date"
                                value={staff.dob}
                                className="form-control rounded-2  "
                                placeholder="Enter  DOB "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="dob"
                                onChange={handleInputs}
                              />
                              {errors.dob.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Role/Designation
                                <span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control rounded-2  "
                                placeholder="Enter  Role/Designation "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="designation"
                                value={staff.designation}
                                onChange={handleInputs}
                              />
                              {errors.designation.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                DOJ <span className="text-danger">*</span>
                              </label>
                              <input
                                type="date"
                                value={staff.doj}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter  DOJ "
                                name="doj"
                                onChange={handleInputs}
                              />
                              {errors.doj.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                           
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Reporting Manager
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2 "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Reporting Manager"
                                name="reportingManager"
                                value={staff.reportingManager}
                                onChange={handleInputs}
                              />
                              {errors.reportingManager.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Shift Timing{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter  Shift Timing"
                                name="shiftTiming"
                                value={staff.shiftTiming}
                                onChange={handleInputs}
                              />
                              {errors.shiftTiming.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Probation Duration
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={staff.probationDuration}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter Probation Duration"
                                name="probationDuration"
                                onChange={handleInputs}
                              />
                              {errors.probationDuration.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>   <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Official Mail
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2 rounded-2 "
                                placeholder="Enter Official Mail "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="OfficialMail"
                                
                              />
                              
                            </div>
                               
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Team{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="Team"
                               
                                className="form-select form-select-lg"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value={""}> Select Team</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                           
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }} className="">
                                Personal Mail ID
                              </label>
                              <input
                                type="email"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                value={staff.email}
                                placeholder="Enter Personal Mail ID"
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
                                Personal Contact No
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                value={staff.mobileNumber}
                                placeholder="Enter Personal Contact No"
                                name="mobileNumber"
                                onChange={handleInputs}
                              />
                              {errors.mobileNumber.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.mobileNumber.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid MobileNumber.
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }} className="">
                                Emergency Contact
                              </label>
                              <input
                                type="number"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter  Emergency Contact"
                                value={staff.emergencyContactNo}
                                name="emergencyContactNo"
                                onChange={handleInputs}
                              />
                              {errors.emergencyContactNo.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.emergencyContactNo.valid ? (
                                <div className="text-danger form-text">
                                  Enter valid emergencyContactNo.
                                </div>
                              ) : null}
                            </div>


                           
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Address 1 <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={staff.address}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter Street/Door No"
                                name="address"
                                onChange={handleInputs}
                              />
                              {errors.address.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Address 2 <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter City Name"
                                name="City"
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Address 3 <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Enter State"
                                name="State"
                              />
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                ID Card <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-select form-select-lg rounded-2"
                                value={staff.idCard}
                                onChange={handleInputs}
                                name="idCard"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="">Select Id Apporval</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {errors.idCard.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Status <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-select form-select-lg rounded-2"
                                value={staff.activeInactive}
                                onChange={handleInputs}
                                name="activeInactive"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="">Select Type</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              {errors.activeInactive.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Privileges/Rights{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter Privileges/Rights "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="Privileges/Rights "
                              />
                              {errors.empName.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          
                            <div className="row g-3">
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Company Assessts{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="companyassessts"
                               
                                className="form-select form-select-lg rounded-2"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value={""}> Select  Company Assessts</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                             
                            </div>
</div>
<div className="row g-3">
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                               Mobile<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Mobile"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="mobile"
                               
                              />
                             
                            </div>
</div>
<div className="row g-3">
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Brand Name<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Brand Name"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="BrandName"
                               
                              />
                             
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              IMEI<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  IMEI"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="IMEI"
                               
                              />
                             
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Phone Number<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Phone Number"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="PhoneNumber"
                               
                              />
                             
                            </div>
</div>






<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Laptop<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Laptop"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="Laptop"
                               
                              />
                             
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Brand Name<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Brand Name"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="BrandName"
                               
                              />
                             
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Model<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Model"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="Model"
                               
                              />
                             
                            </div>


                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              IP Address<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  IP Address"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="IPAddress"
                               
                              />
                             
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              UserName<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  UserName"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="BrandName"
                               
                              />
                             
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                              Password<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2"
                                placeholder="Enter  Password"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="Password"
                               
                              />
                             
                            </div>
                         

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Salary <span className="text-danger">*</span>
                              </label>
                              <input
                                type="number"
                                value={staff.salary}
                                className="form-control rounded-2"
                                placeholder="Enter  Salary"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="salary"
                                onChange={handleInputs}
                              />
                              {errors.salary.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>



                           
                          


                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Manage Applications{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="manageApplications"
                                value={staff.manageApplications}
                                onChange={handleInputs}
                                className="form-select form-select-lg rounded-2"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value={""}> Select Type</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                              </select>
                              {errors.manageApplications.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          


                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Team Lead <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                value={staff.teamLead}
                                className="form-control rounded-2"
                                placeholder="Enter  Team Lead   "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="teamLead"
                                onChange={handleInputs}
                              />
                              {errors.teamLead.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label
                                style={{ color: "#231F20" }}
                                htmlFor="fileInputImage"
                              >
                                Photo<span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                id="fileInputImage"
                                name="photo"
                                accept="image/*"
                                className="form-control rounded-2"
                                onChange={handleInputs}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                // onChange={handleInputs}
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Job Description
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2 "
                                placeholder="Enter Job Description "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="jobDescription"
                                value={staff.jobDescription}
                                onChange={handleInputs}
                              />
                              {errors.jobDescription.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Are they eligible for casual leave
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-select form-select-lg rounded-2" 
                                value={staff.areTheyEligibleForCasualLeave}
                                name="areTheyEligibleForCasualLeave"
                                onChange={handleInputs}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="">EligibleForCasualLeave</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {errors.areTheyEligibleForCasualLeave.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="row g-2">
                              <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                <Link
                                  to=""
                                  style={{
                                    backgroundColor: "#231F20",
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                  className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2"
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
                                  className="btn btn-save border-0 fw-semibold  px-4 py-2 text-uppercase text-white  m-2"
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
      </div>
    </div>
  );
};
export default AddStaff;
