import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveStaff,getallStaff } from "../../api/staff";
import { getallDepartment } from "../../api/universityModule/Department";
// import CheckBox from "./role"
import {
  isValidPhone,
  isValidEmail,
  isValidName,
  isValidDob,
  isValidNumber,
} from "../../Utils/Validation";
import Flags from "react-world-flags";
import { getallCode } from "../../api/settings/dailcode";
import Sidebar from "../../compoents/StaffSidebar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";
import { InputBase } from "@mui/material";
import BackButton from "../../compoents/backButton";
export const AddStaff = () => {
  const initialState = {
    photo: "",
    empName: "",
    dob: "",
    designation: "",
    role: "",
    doj: "",
    reportingManager: "",
    shiftTiming: "",
    probationDuration: "",
    email: "",
    team: "",
    dial1: "",
    dial2: "",
    dial3: "",
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
    active: "",
    role: "",
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
    role: { required: false },
    doj: { required: false }, // (Date of Joining)
    reportingManager: { required: false },
    shiftTiming: { required: false }, // (Attendance to be calculated based on this)
    probationDuration: { required: false },
    email: { required: false, valid: false },
    team: { required: false },
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
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
    active: { required: false },
    role: { required: false },
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
  const [dial, setDial] = useState([]);
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false); // Added state for checkbox
  const navigate = useNavigate();
  const [dail1, setDail1] = useState(null);
  const [dail2, setDail2] = useState(null);
  const [dail3, setDail3] = useState(null);
  const [dail4, setDail4] = useState(null);

  useEffect(() => {
    getAllStaffDetails();
    getallDepartmentData();
    getallCodeList();
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

  const getallCodeList = () => {
    getallCode()
      .then((res) => {
        setDial(res?.data?.result);
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

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setStaff((prevClient) => ({
        ...prevClient,
       emergencyContactNo: `${prevClient.mobileNumber}`,
      }));
    } else {
      setStaff((prevClient) => ({
        ...prevClient,
        emergencyContactNo: "",
      }));
    }
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
    if(data.role === "") {
      error.role.required = true;
    }

    if (data.reportingManager === "") {
      error.reportingManager.required = true;
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
    if (data.address2 === "") {
      error.address2.required = true;
    }
    if (data.pin === "") {
      error.pin.required = true;
    }
    if (data.country === "") {
      error.country.required = true;
    }
    if (data.state === "") {
      error.state.required = true;
    }
    if (data.city === "") {
      error.city.required = true;
    }
    if (data.companyAssests === "") {
      error.companyAssests.required = true;
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

    if (data.active === "") {
      error.active.required = true;
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

  const handleDail1 = (selectedOptions) => {
    setDail1(selectedOptions);
  };
  const handleDail2 = (selectedOptions) => {
    setDail2(selectedOptions);
  };
  const handleDail3 = (selectedOptions) => {
    setDail3(selectedOptions);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(staff);
    setErrors(newError);
    setSubmitted(true);
    const staffData={
      ...staff,
      dial1:dail1?.value,
      dial2:dail2?.value,
      dial3:dail3?.value,
    }
    if (handleErrors(newError)) {
      saveStaff(staffData)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/staff_list_staff");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
    else {
      toast.error("Please Fill Staff Mandatory Fields");
    }
  };
  const staffOption = staffs.map((data) => ({
    value: data.empName,
    label: data.empName,
  }));
  const dialOptions = dial.map((data) => ({
    value: data.dialCode,
    label: `${data.dialCode} - ${data.name}`,
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
            <BackButton/>
             
            </div>
            <div className=" container-fluid">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-12 ">
                      <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
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
                                className={`form-control rounded-1 text-capitalize ${
                                  errors.empName.required ? 'is-invalid' : errors.empName.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Example John Doe "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="empName"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  // Prevent non-letter characters
                                  if (/[^a-zA-Z\s]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors.empName.required && (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                DOB<span className="text-danger">*</span>
                              </label>

                              <input
                                type="date"
                                className={`form-control rounded-1 text-uppercase ${
                                  errors.dob.required ? 'is-invalid' : errors.dob.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Enter  DOB "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="dob"
                                onChange={handleInputs}
                              />
                              {errors.dob.required && (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) }
                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Designation
                                <span className="text-danger">*</span>
                              </label>
                              <select
                           
                            className={`form-select form-select-lg rounded-1 text-capitalize ${
                              errors.designation.required ? 'is-invalid' : errors.designation.valid ? 'is-valid' : ''
                            }`}
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
                             
                              {errors.designation.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Role
                                <span className="text-danger">*</span>
                              </label>
                            <input
                                type="text"
                                className={`form-control rounded-1 text-capitalize ${
                                  errors.role.required ? 'is-invalid' : errors.role.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Enter  Role "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "11px",
                                }}
                                name="role"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  // Prevent non-letter characters
                                  if (/[^a-zA-Z\s]/.test(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                                
                              />
                             
                              {errors.role.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
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
                                className={`form-control text-uppercase rounded-1 ${
                                  errors.doj.required ? 'is-invalid' : errors.doj.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Enter  DOJ "
                                name="doj"
                                onChange={handleInputs}
                              />
                              {errors.doj.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Reporting Manager
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control rounded-1 text-capitalize ${
                                  errors.reportingManager.required ? 'is-invalid' : ''
                                }`}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Example Jane Doe"
                                name="reportingManager"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors.reportingManager.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
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
                                className={`form-control rounded-1 text-capitalize ${
                                  errors.shiftTiming.required ? 'is-invalid' : errors.shiftTiming.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Example 10.00 AM - 07.00 PM"
                                name="shiftTiming"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors.shiftTiming.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
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
                                 className={`form-control rounded-1 text-capitalize ${
                                  errors.probationDuration.required ? 'is-invalid' : errors.probationDuration.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Example 6 Months"
                                name="probationDuration"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              {errors.probationDuration.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Official Mail
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control rounded-1 text-lowercase ${
                                  errors.email.required ? 'is-invalid' : errors.email.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Example jay.j@afynd.com "
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="email"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  // Prevent default behavior for disallowed keys
                             if (!/^[a-zA-Z0-9@._-]*$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
                                  'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
                               e.preventDefault();
                             }
                            }}
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
                                className={`form-select form-select-lg rounded-1 text-capitalize ${
                                  errors.team.required ? 'is-invalid' : errors.team.valid ? 'is-valid' : ''
                                }`}
                                
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
                                 className={`form-control rounded-1 text-lowercase ${
                                  errors.personalMail.required ? 'is-invalid' : errors.personalMail.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Example johndoe123@gmail.com"
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  // Prevent default behavior for disallowed keys
                             if (!/^[a-zA-Z0-9@._-]*$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
                                  'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
                               e.preventDefault();
                             }
                            }}
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
    Mobile Number
    <span className="text-danger">*</span>
  </label>
  <div className="d-flex align-items-end">


  <div className="input-group mb-3">
  <Select
                              value={dail1}
                              options={dialOptions}
                              placeholder="code"
                              name="dial1"
                              onChange={handleDail1}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxWidth: '140px'
                                }),
                              }}
                            />
  <input
      type="text"
       aria-label="Text input with dropdown button"
      className={`form-control  ${
        errors.mobileNumber.required ? 'is-invalid' : errors.mobileNumber.valid ? 'is-valid' : ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      name="mobileNumber"
      value={staff.mobileNumber}
      onChange={handleInputs}
      onKeyDown={(e) => {
        if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      }}
    />
     
</div>


    
    <div className="form-check ms-3 ">
      <input
        className="form-check-input"
        type="checkbox"
        id="copyToWhatsApp"
        checked={copyToWhatsApp}
        onChange={handleCheckboxChange}
      />
     
    </div>
  </div>
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
  <label style={{ color: "#231F20" }}>
    Emergency Contact Number
    <span className="text-danger">*</span>
  </label>
  <div className="input-group mb-3">
  <Select
                              value={dail2}
                              options={dialOptions}
                              placeholder="code"
                              name="dial2"
                              onChange={handleDail2}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxWidth: '140px'
                                }),
                              }}
                            />

  <input
    type="text"
    className={`form-control rounded-1 ${
      errors.emergencyContactNo.required ? 'is-invalid' : errors.emergencyContactNo.valid ? 'is-valid' : ''
    }`}
    placeholder="Example 123-456-7890"
    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
    name="emergencyContactNo"
    value={staff.emergencyContactNo}
    onChange={handleInputs}
    onKeyDown={(e) => {
      if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    }}
  />
  </div>
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
                                 className={`form-control rounded-1 text-capitalize ${
                                  errors.address.required ? 'is-invalid' :  ''
                                }`}
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
                                className={`form-control rounded-1 text-capitalize ${
                                  errors.address2.required ? 'is-invalid' : ''
                                }`}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                
                                placeholder="Example Alwartirunagar, Chennai"
                                name="address2"
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
                                Pincode <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                 className={`form-control rounded-1 text-capitalize ${
                                  errors.pin.required ? 'is-invalid' : errors.pin.valid ? 'is-valid' : ''
                                }`}
                                placeholder="Example 632001"
                                name="pin"
                                onChange={handleInputs}
                              />
                               {errors.pin.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
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
                                 className={`form-control rounded-1 text-capitalize ${
                                  errors.country.required ? 'is-invalid'  : ''
                                }`}
                                placeholder="Example India"
                                name="country"
                                onChange={handleInputs}
                              />
                              {errors.country.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                              
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
                                 className={`form-control rounded-1 text-capitalize ${
                                  errors.state.required ? 'is-invalid'  : ''
                                }`}
                                placeholder="Example Tamil Nadu"
                                name="state"
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
                                City <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                 className={`form-control rounded-1 text-capitalize ${
                                  errors.city.required ? 'is-invalid'  : ''
                                }`}
                                placeholder="Example Chennai"
                                name="city"
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
                                ID Card <span className="text-danger">*</span>
                              </label>
                              <select
                                className={`form-select form-select-lg rounded-1 text-capitalize ${errors.idCard.required ? 'is-invalid':''}`}
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
                              {errors.idCard.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Status <span className="text-danger">*</span>
                              </label>
                              <select
                                 className={`form-select form-select-lg rounded-1 text-capitalize ${errors.active.required ? 'is-invalid ':''}`}
                                onChange={handleInputs}
                                name="active"
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="">Select Active Type</option>
                                <option value="Active" selected>Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                              {errors.active.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Role{" "}
                                <span className="text-danger">*</span>
                              </label>
                             <select
                               className={`form-select form-select-lg rounded-1 text-capitalize ${errors.role.required ? 'is-invalid':''}`}
                                onChange={handleInputs}
                                name="role"
                                value={staff?.role}
                                style={{
                                  backgroundColor: "#fff",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              >
                                <option value="">Select Role</option>
                                <option value="superAdmin">SuperAdmin</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="student">Student</option>
                                <option value="agent">Agent</option>


                           
                              </select>
                              {errors.role.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>


                          
{/* <CheckBox/> */}


                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Company Assets{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="companyAssests"
                                onChange={handleInputs}
                                className={`form-select form-select-lg rounded-1 text-capitalize ${
                                  errors.companyAssests.required ? 'is-invalid' : errors.companyAssests.valid ? 'is-valid' : ''
                                }`}
                                
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
                              {errors.companyAssests.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                            </div>
                            {staff.companyAssests === "companyAssests" && (
                              <>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  <label style={{ color: "#231F20" }}>
                                    Laptop Assets{" "}
                                   
                                  </label>
                                  <select
                                    name="laptopName"
                                    onChange={handleInputs}
                                    className='form-select form-select-lg rounded-1 text-capitalize' 
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
                                   {errors.laptopName.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                                </div>
                                {staff.laptopName === "labtopAssets" && (
                                  <div className="row g-3">
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Brand Name
                                       
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1 text-capitalize' 
                                        placeholder="Example Apple"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="brand"
                                        onChange={handleInputs}
                                        onKeyDown={(e) => {
                                          if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                       {errors.brand.required && (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) }
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Model
                                        
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1 text-capitalize' 
                                        placeholder="Example MacBook Air"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="modelName"
                                        onChange={handleInputs}
                                        onKeyDown={(e) => {
                                          if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </div>

                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        IP Address
                                       
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1 text-capitalize '
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
                                      
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1 text-capitalize'
                                        placeholder="Example Afynd01"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="userName"
                                        handleInputs={handleInputs}
                                        onKeyDown={(e) => {
                                          if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                       
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Password
                                       
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1 text-capitalize' 
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
                                   
                                  </label>
                                  <select
                                    name="mobileName"
                                    className='form-select form-select-lg rounded-1 text-capitalize '
                                    onChange={handleInputs}
                                   
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
                                        
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1 text-capitalize '
                                        placeholder="Example  Samsung"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="brandName"
                                        onChange={handleInputs}
                                        onKeyDown={(e) => {
                                          if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        IMEI
                                       
                                      </label>
                                      <input
                                        type="text"
                                         className='form-control rounded-1  text-capitalize'
                                        placeholder="Example 356938035643209"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="imei"
                                        onChange={handleInputs}
                                        onKeyDown={(e) => {
                                          if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                    </div>

                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>
  Phone Number
    <span className="text-danger">*</span>
  </label>
  <div className="input-group mb-3">
  <Select
                              value={dail3}
                              options={dialOptions}
                              placeholder="code"
                              name="dial3"
                              onChange={handleDail3}
                              styles={{
                                container: (base) => ({
                                  ...base,
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  maxWidth: '140px'
                                }),
                              }}
                            />

  <input
    type="text"
     className="form-control rounded-1"
    placeholder="Example 123-456-7890"
    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
    name="phoneNumber"
    value={staff.phoneNumber}
    onChange={handleInputs}
    onKeyDown={(e) => {
      if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    }}
  />
  </div>
 
</div>
                                    {/* <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                      <label style={{ color: "#231F20" }}>
                                        Phone Number
                                       
                                      </label>
                                      <input
                                        type="number"
                                         className='form-control rounded-1'
                                        placeholder="Example 123-456-789"
                                        style={{
                                          backgroundColor: "#fff",
                                          fontFamily: "Plus Jakarta Sans",
                                          fontSize: "12px",
                                        }}
                                        name="phoneNumber"
                                        onChange={handleInputs}
                                      />
                                    </div> */}
                                  </div>
                                )}
                              </>
                            )}
                            <div className="row g-2">
                              <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                <Link
                                  to="/staff_list_staff"
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
      
    </>
  );
};
export default AddStaff;