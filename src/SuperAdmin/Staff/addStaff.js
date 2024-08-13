import React, { useEffect, useState } from "react";
import Flags from "react-world-flags";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveStaff,getallStaff } from "../../api/staff";
import { getallDepartment } from "../../api/universityModule/Department";
import {
  isValidPhone,
  isValidEmail,
  isValidName,
  isValidDob,
} from "../../Utils/Validation";

import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
export const AddStaff = () => {
  const initialState = {
    photo: "",
    empName: "",
    dob: "",
    designation: "",
    doj: "",
    reportingManager: "",
    shiftTiming: "",
    probationDuration: "",
    email: "",
    team: "",
    staffList: [],
    personalMail: "",
    mobileNumber: "",
    emergencyContactNo: "",
    address: "",
    address2: "",
    pin: "",
    country: "",
    state: "",
    city: "",
    idCard: "",
    status: "",
    privileges: "",
    companyAssests: "",
    mobileName: "",
    brandName: "",
    imei: "",
    phoneNumber: "",
    laptopName: "",
    brand: "",
    modelName: "",
    ipAddress: "",
    userName: "",
    loginPassword: "",
  };
  const initialStateErrors = {
    photo: { required: false },
    empName: { required: false },
    dob: { required: false }, // (Date of Birth)
    designation: { required: false },
    doj: { required: false }, // (Date of Joining)
    reportingManager: { required: false },
    shiftTiming: { required: false }, // (Attendance to be calculated based on this)
    probationDuration: { required: false },
    email: { required: false, valid: false },
    team: { required: false },
    staffList: { required: false },
    personalMail: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    emergencyContactNo: { required: false, valid: false },
    address: { required: false },
    address2: { required: false },
    pin: { required: false },
    country: { required: false },
    state: { required: false },
    city: { required: false },
    idCard: { required: false }, // – Yes / No (If ‘Yes’ card to be generated)
    status: { required: false },
    privileges: { required: false },
    companyAssests: { required: false },
    mobileName: { required: false },
    brandName: { required: false },
    imei: { required: false },
    phoneNumber: { required: false },
    laptopName: { required: false },
    brand: { required: false },
    modelName: { required: false },
    ipAddress: { required: false },
    userName: { required: false },
    loginPassword: { required: false },
  };
  const [staff, setStaff] = useState(initialState);
  const [staffs, setStaffs] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [department, setDepartment] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    getAllStaffDetails();
    getallDepartmentData();
  }, []);
  const getallDepartmentData = () => {
    getallDepartment()
      .then((res) => {
        setDepartment(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllStaffDetails = () => {
    getallStaff()
      .then((res) => {
        console.log(res);
        setStaffs(res?.data?.result);
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
    if (data.dob === "") {
      error.dob.required = true;
    }

    if (data.designation === "") {
      error.designation.required = true;
    }

    if (data.reportingManager === "") {
      error.reportingManager = true;
    }
    if (data.shiftTiming === "") {
      error.shiftTiming.required = true;
    }

    if (data.doj === "") {
      error.doj.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.team === "") {
      error.team.required = true;
    }
    if (data.personalMail === "") {
      error.personalMail.required = true;
    }
    if (data.address === "") {
      error.address.required = true;
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

    if (data.idCard === "") {
      error.idCard.required = true;
    }

    if (data.status === "") {
      error.status.required = true;
    }
    if (data.privileges === "") {
      error.privileges.required = true;
    }
    if (data.companyAssests === "") {
      error.companyAssests.required = true;
    }
    if (!isValidName(data.empName)) {
      error.empName.valid = true;
    }
    if (!isValidDob(data.dob)) {
      error.dob.valid = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidEmail(data.personalMail)) {
      error.personalMail.valid = true;
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
  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setStaff({ ...staff, [name]: values });
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
    if (handleErrors(newError)) {
      saveStaff(staff)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListStaff");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };
  const staffOption = staffs.map((data) => ({
    value: data.empName,
    label: data.empName,
  }));

  return (
    <>
      
        <div >
         
            <Sidebar />
          

          <div
            className="content-wrapper"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
          >
            <div className="content-header ">
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
                            Add Staff Details
                          </h5>
                        </div>

                        <div className="card-body mt-2 ">
                          <div className="row g-3 ">
                            <div className="position-relative d-inline-block">
                              <img
                                className="img-fluid rounded-circle img-thumbnail mx-auto d-block"
                                src={
                                  staff?.photo
                                    ? staff?.photo
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

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                               Full Name<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2  "
                                placeholder="Example John Doe "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="empName"
                                onChange={handleInputs}
                              />
                              {errors.empName.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.empName.valid ? (
                                <div className="text-danger form-text">
                                  Enter Vaild Letter Only .
                                </div>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                DOB<span className="text-danger">*</span>
                              </label>

                              <input
                                type="date"
                                className="form-control text-uppercase "
                                placeholder="Enter  DOB "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="dob"
                                onChange={handleInputs}
                              />
                              {errors.dob.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.dob.valid ? (
                                <div className="text-danger form-text">
                                  Enter Vaild 15 Year Age Completed .
                                </div>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Role/Designation
                                <span className="text-danger">*</span>
                              </label>
                              <select
                            className="form-select rounded-1"
                            style={{ fontSize: "12px" }}
                            name="designation"
                            onChange={handleInputs}
                            
                          >
                            <option value="">Select Department Head</option>
                            {department.map((data, index) => (
                              <option key={index} value={data?.department}>
                                {data?.department}
                              </option>
                            ))}
                          </select>
                             
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
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                className="form-control text-uppercase rounded-2"
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
                                placeholder="Example Jane Doe"
                                name="reportingManager"
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
                                placeholder="Example 10.00 AM - 07.00 PM"
                                name="shiftTiming"
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
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example 6 Months"
                                name="probationDuration"
                                onChange={handleInputs}
                              />
                              {errors.probationDuration.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Official Mail
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control rounded-2 "
                                placeholder="Example jay.j@afynd.com "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="email"
                                onChange={handleInputs}
                              />
                              {errors.email.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.email.valid ? (
                                <div className="text-danger form-text">
                                  Enter Vaild email Id .
                                </div>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Team <span className="text-danger">*</span>
                              </label>
                              <select
                                name="team"
                                onChange={handleInputs}
                                className="form-select form-select-lg rounded-2"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value={""}> Select Team</option>
                                <option value="team">Yes</option>
                                <option value="no">No</option>
                              </select>
                              {errors.team.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            {staff.team === "team" && (
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label style={{ color: "#231F20" }}>
                                  Staff List{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Select
                                  isMulti
                                  placeholder="Select Staff"
                                  name="staffList"
                                  
                                  options={staffOption}
                                  onChange={handleSelectChange}
                                  styles={{
                                    container: (base) => ({
                                      ...base,
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }),
                                  }}
                                ></Select>
                              </div>
                            )}

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }} className="">
                                Personal Mail ID
                              </label>
                              <input
                                type="text"
                                name="personalMail"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example johndoe123@gmail.com"
                                onChange={handleInputs}
                              />
                              {errors.personalMail.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : errors.personalMail.valid ? (
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
                                placeholder="Example 123-456-789"
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
                                placeholder="Example 123-456-789"
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
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example 17/3A2, Gandhi St,"
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
                                placeholder="Example Alwartirunagar, Chennai"
                                name="address2"
                                onChange={handleInputs}
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Pincode <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example 632001"
                                name="pin"
                                onChange={handleInputs}
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Country <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example India"
                                name="country"
                                onChange={handleInputs}
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                State <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example Tamil Nadu"
                                name="state"
                                onChange={handleInputs}
                              />
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                City <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                className="form-control rounded-2"
                                placeholder="Example Chennai"
                                name="city"
                                onChange={handleInputs}
                              />
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                ID Card <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-select form-select-lg rounded-2"
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
                                onChange={handleInputs}
                                name="status"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="">Select Status Type</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              {errors.status.required ? (
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
                                placeholder="Example Employment..."
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="privileges"
                                onChange={handleInputs}
                              />
                              {errors.privileges.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Company Assets{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="companyAssests"
                                onChange={handleInputs}
                                className="form-select form-select-lg rounded-2"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value={""}>
                                  {" "}
                                  Select Company Assets
                                </option>
                                <option value="companyAssests">Yes</option>
                                <option value="no">No</option>
                              </select>
                              {errors.companyAssests.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            {staff.companyAssests === "companyAssests" && (
                              <>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Laptop Assets{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    name="laptopName"
                                    onChange={handleInputs}
                                    className="form-select form-select-lg rounded-2"
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <option value={""}>
                                      {" "}
                                      Select Laptop Assets
                                    </option>
                                    <option value="labtopAssets">Yes</option>
                                    <option value="no">No</option>
                                  </select>
                                </div>
                                {staff.laptopName === "labtopAssets" && (
                                  <div className="row g-3">
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Brand Name
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example Apple"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="brand"
                                        onChange={handleInputs}
                                      />
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Model
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example MacBook Air"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="modelName"
                                        onChange={handleInputs}
                                      />
                                    </div>

                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        IP Address
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example IPv4 192.168.1.1 "
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="ipAddress"
                                        onChange={handleInputs}
                                      />
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        UserName
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example Afynd01"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="userName"
                                        handleInputs={handleInputs}
                                      />
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Password
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example G7$kL!8mQz@1wXp^"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="loginPassword"
                                        onChange={handleInputs}
                                      />
                                    </div>
                                  </div>
                                )}

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Mobile Assets
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    name="mobileName"
                                    onChange={handleInputs}
                                    className="form-select form-select-lg rounded-2"
                                    style={{
                                      backgroundColor: "#fff",
                                      fontFamily: "Plus Jakarta Sans",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <option value={""}>
                                      {" "}
                                      Select Mobile Assets
                                    </option>
                                    <option value="mobileName">Yes</option>
                                    <option value="no">No</option>
                                  </select>
                                </div>
                                {staff.mobileName === "mobileName" && (
                                  <div className="row g-3">
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Brand Name
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example  Samsung"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="brandName"
                                        onChange={handleInputs}
                                      />
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        IMEI
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control rounded-2"
                                        placeholder="Example 356938035643209"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="imei"
                                        onChange={handleInputs}
                                      />
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Phone Number
                                        <span className="text-danger">*</span>
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control rounded-2"
                                        placeholder="Example 123-456-789"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="phoneNumber"
                                        onChange={handleInputs}
                                      />
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                            <div className="row g-2">
                              <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                <Link
                                  to=""
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
                                  className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2"
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
export default AddStaff;
