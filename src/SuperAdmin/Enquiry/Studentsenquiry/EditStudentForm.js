import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidDob,
  isValidPhone,
  isValidName,
  isValidNo,
  isValidPassportNumber,
} from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  updateStudnetEnquiry,
  getSingleStudnetEnquiry,
} from "../../../api/Enquiry/student";
import {getFilterSource} from "../../../api/settings/source";
import{getallStudent} from "../../../api/student";
import { getallAgent } from "../../../api/agent";
import Flags from "react-world-flags";
import { getallCode } from "../../../api/settings/dailcode";

import Mastersidebar from "../../../compoents/sidebar";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { RichTextEditor } from "@mantine/rte";
export const AddStudentForm = () => {

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    source: "",
    name: "",
    dob: "",
    citizenShip: "",
    passportNo: "",
    expiryDate: "",
    email: "",
    dial1: "",
    dial2: "",
    dial3:"",
    dial4:"",
    primaryNumber: "",
    whatsAppNumber: "",
    qualification: "",
    yearPassed: "",
    cgpa: "",
    desiredCountry: "",
    desiredUniversity: "",
    desiredCourse: "",
    doYouHoldAnyOtherOffer: "",
    doYouNeedSupportForLoan: "",
    assignedTo: "",
    gender: "",
    country: "",
    universityName: "",
    programName: "",
    refereeName: "",
    refereeContactNo: "",
    registerForIELTSClass: "",
    agentName: "",
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
  };
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    dob: { required: false },
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
    dial4: { required: false },
    citizenShip: { required: false },
    passportNo: { required: false },
    expiryDate: { required: false },
    email: { required: false },
    primaryNumber: { required: false },
    whatsAppNumber: { required: false },
    qualification: { required: false },
    yearPassed: { required: false },
    cgpa: { required: false },
    desiredCountry: { required: false },
    desiredUniversity: { required: false },
    desiredCourse: { required: false },
    doYouHoldAnyOtherOffer: { required: false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    doYouNeedSupportForLoan: { required: false },

    assignedTo: { required: false },
    gender: { required: false },

    country: { required: false },
    universityName: { required: false },
    programName: { required: false },
    refereeName: { required: false },
    refereeContactNo: { required: false },
    registerForIELTSClass: { required: false },
  };
  const [student, setStudent] = useState(initialState);
  const [source ,setSource] = useState([]);
  const [agent, setAgent] = useState([]);
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false); // Added state for checkbox
  const [dial, setDial] = useState([]);

  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.source === "") {
      error.source.required = true;
    }

    if (data.name === "") {
      error.name.required = true;
    }
    if (!isValidName(data.name)) {
      error.name.valid = true;
    }
    if (data.dob === "") {
      error.dob.required = true;
    }
    if (!isValidDob(data.dob)) {
      error.dob.valid = true;
    }
    if (data.citizenShip === "") {
      error.citizenShip.required = true;
    }
    if (!isValidName(data.citizenShip)) {
      error.citizenShip.valid = true;
    }
    if (data.passportNo === "") {
      error.passportNo.required = true;
    }
    if (!isValidPassportNumber(data.passportNo)) {
      error.passportNo.valid = true;
    }
    if (data.expiryDate === "") {
      error.expiryDate.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (data.primaryNumber === "") {
      error.primaryNumber.required = true;
    }
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }

    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }

    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    if (data.qualification === "") {
      error.qualification.required = true;
    }
    if (!isValidName(data.qualification)) {
      error.qualification.valid = true;
    }
    if (data.yearPassed === "") {
      error.yearPassed.required = true;
    }
    if (data.cgpa === "") {
      error.cgpa.required = true;
    }
    if (!isValidNo(data.cgpa)) {
      error.cgpa.valid = true;
    }
    if (data.desiredCountry === "") {
      error.desiredCountry.required = true;
    }

    if (data.desiredUniversity === "") {
      error.desiredUniversity.required = true;
    }
    if (!isValidName(data.desiredUniversity)) {
      error.desiredUniversity.valid = true;
    }
    if (data.desiredCourse === "") {
      error.desiredCourse.required = true;
    }
    if (data.doYouHoldAnyOtherOffer === "") {
      error.doYouHoldAnyOtherOffer.required = true;
    }

    if (data.gender === "") {
      error.gender.required = true;
    }
    if (data.assignedTo === "") {
      error.assignedTo.required = true;
    }

    if (data.doYouNeedSupportForLoan === "") {
      error.doYouNeedSupportForLoan.required = true;
    }
    if (data.registerForIELTSClass === "") {
      error.registerForIELTSClass.required = true;
    }
    if (data.refereeName === "") {
      error.refereeName.required = true;
    }
    if (data.refereeContactNo === "") {
      error.refereeContactNo.required = true;
    }

    if (!isValidPhone(data.refereeContactNo)) {
      error.refereeContactNo.valid = true;
    }

    if (!isValidName(data.refereeName)) {
      error.refereeName.valid = true;
    }

    return error;
  };

  useEffect(() => {
    getAllSourceDetails();
    getStudentList();
    getAgentList();
    getallCodeList();
    getStudentDetails();
  }, []);

  const getallCodeList = () => {
    getallCode()
      .then((res) => {
        setDial(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAgentList = () => {
    getallAgent()
      .then((res) => {
        setAgent(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentList = () => {
    getallStudent()
      .then((res) => {
        setStudents(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllSourceDetails = () => {
  
    getFilterSource()
      .then((res) => {
        setSource(res?.data?.result?.sourceList || []);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getStudentDetails = () => {
    getSingleStudnetEnquiry(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;

    setStudent((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };
      if (name === "agentName") {
        const selectedAgent = agent.find(
          (u) => u.agentName === value
        );
        if (selectedAgent) {
         
  
          return {
            ...updatedProgram,
            businessName: selectedAgent.businessName,
            agentPrimaryNumber: selectedAgent.mobileNumber,
            agentWhatsAppNumber: selectedAgent.whatsAppNumber,
            agentEmail: selectedAgent.email,
            dial1: selectedAgent.dial1,
            dial2: selectedAgent.dial2,
          };
         
   
        }
      }

      return updatedProgram;
    });

    if (submitted) {
      const newError = handleValidation({
        ...student,
        [event.target.name]: event.target.value,
      });

      setErrors(newError);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setStudent((prevClient) => ({
        ...prevClient,
        whatsAppNumber: `${prevClient.primaryNumber}`,
      }));
    } else {
      setStudent((prevClient) => ({
        ...prevClient,
        whatsAppNumber: "",
      }));
    }
  };

  const handleCheckboxChanges = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setStudent((prevClient) => ({
        ...prevClient,
        agentWhatsAppNumber: `${prevClient.agentPrimaryNumber}`,
      }));
    } else {
      setStudent((prevClient) => ({
        ...prevClient,
        agentWhatsAppNumber: "",
      }));
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
      updateStudnetEnquiry(student)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_enquiry_student");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }else {
      toast.error("Please Fill  Mandatory Fields");
    }
  };

  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "13px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h5 className="text-center text-capitalize p-1">
                  {" "}
                  Edit Student Enquiry Details
                </h5>
              </div>
              <div className="card-body mt-5">
                <form className="p-1" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="row g-3">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label" for="inputEmail4">
                          Source
                        </label>
                        <select
                          onChange={handleInputs}
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          className={`form-select form-select-lg rounded-2 ${errors.source.required ? 'is-invalid' : ''}`}
                          name="source"
                          value={student.source}
                        >
                          <option value="">Select Source</option>
                          {source.length > 0 ? (
                          source.map((data, index) => (
                          <option key={index} value={data.sourceName}>
                          {data.sourceName}
                      </option>
                    ))
                  ) : (
                    <option value="">No Source Found</option>
                  )}
                        
                          <option value="others">Others</option>
                        </select>
                        {errors.source.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}
                      </div>
                      
                    </div>

                    {student.source === "Student" ? (
                    <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputAgentName">
                            Name
                          </label>
                          <select
                          onChange={handleInputs}
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          className="form-select form-select-lg rounded-2 "
                          name="studentName"
                          value={student.studentName}
                        >
                          <option value="">Select students</option>
                          {students.length > 0 ? (
                          students.map((data, index) => (
                          <option key={index} value={`${data.name} - ${data.studentCode}`}>
                          {data.name}{" - "}{data.studentCode}
                      </option>
                    ))
                  ) : (
                    <option value="">No Source Found</option>
                  )}
                        
                          <option value="others">Others</option>
                        </select>
                          
                        </div>
                        
                       </div>
                     
                  
                    ) : null}
                      {student.source === "Agent" ? (
                    <div className="row gx-4 gy-2">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputAgentName">
                      Agent Name
                    </label>
                    <select
                          onChange={handleInputs}
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          className="form-select form-select-lg rounded-2 "
                          name="agentName"
                          value={student.agentName}
                        >
                          <option value="">Select Agent</option>
                          {agent.length > 0 ? (
                          agent.map((data, index) => (
                          <option key={index} value={data?.agentName}>
                          {data.agentName}{" - "}{data.agentCode}
                      </option>
                    ))
                  ) : (
                    <option value="">No Source Found</option>
                  )}
                        
                          <option value="others">Others</option>
                        </select>
                   
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputbusinessname">
                      Business Name
                    </label>
                    <input
                      className="form-control"
                      id="inputbusinessname"
                      type="text"
                      onChange={handleInputs}
                      value={student.businessName}
                      name="businessName"
                     
                      placeholder="Enter Business Name"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    />
                  </div>
                
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>
     Agent Primary Number
    <span className="text-danger">*</span>
  </label>
  <div className="d-flex align-items-end">


  <div className="input-group mb-3">
  <select className="form-select form-select-sm" name="dial3" style={{ maxWidth: '75px', fontFamily: "Plus Jakarta Sans",fontSize: "12px", }}  
  onChange={handleInputs} value={student?.dial3} >
  
  {dial?.map((item) => (
    <option value={item?.dialCode} key={item?.dialCode}>
      {item?.dialCode} - {item?.name} -
      {item?.flag && (
        <Flags
          code={item?.flag}
          className="me-2"
          style={{ width: "40px", height: "30px" }}
        />
      )}
    </option>
  ))}

   
  </select>
  <input
      type="text"
       aria-label="Text input with dropdown button"
      className={`form-control  ${
        errors.agentPrimaryNumber.required ? 'is-invalid' :  ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      name="agentPrimaryNumber"
      value={student.agentPrimaryNumber}
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
        onChange={handleCheckboxChanges}
      />
     
    </div>
  </div>
  {errors.agentPrimaryNumber.required && (
    <span className="text-danger form-text profile_error">
      This field is required.
    </span>
  )}
</div>

<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>
     Agent WhatsApp Number
    <span className="text-danger">*</span>
  </label>
  <div className="input-group mb-3">
  <select className="form-select form-select-sm" name="dial4" style={{ maxWidth: '75px', fontFamily: "Plus Jakarta Sans",fontSize: "12px", }}  
  value={student?.dial4}
  onChange={handleInputs}>
    
    {dial?.map((item) => (
    <option value={item?.dialCode} key={item?.dialCode}>
      {item?.dialCode} - {item?.name} -
      {item?.flag && (
        <Flags
          code={item?.flag}
          className="me-2"
          style={{ width: "40px", height: "30px" }}
        />
      )}
    </option>
  ))}

   
  </select>

  <input
    type="text"
    className={`form-control rounded-1 ${
      errors.agentWhatsAppNumber.required ? 'is-invalid' : ''
    }`}
    placeholder="Example 123-456-7890"
    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
    name="agentWhatsAppNumber"
    value={student.agentWhatsAppNumber}
    onChange={handleInputs}
    onKeyDown={(e) => {
      if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    }}
  />
  </div>
  {errors.agentWhatsAppNumber.required && (
    <span className="text-danger form-text profile_error">
      This field is required.
    </span>
  )}
</div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputEmail">
                      Agent Email ID
                    </label>
                    <input
                      className="form-control"
                      name="agentEmail"
                      onChange={handleInputs}
                      id="inputEmail"
                      value={student?.agentEmail}
                      type="text"
                      placeholder="Enter Email ID"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    />
                  </div>
                 
                  </div>
                     
                      
                
                    ) : null}
                     <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                         <label className="form-label" for="inputEmail4">
                           Student Name
                         </label>
                         <input
                           className={`form-control rounded-1 ${errors.name.required ? 'is-invalid' : ''}`}
                           type="text"
                           id="inputEmail4"
                           name="name"
                           onChange={handleInputs}
                           value={student?.name}
                           placeholder="Enter Name"
                           style={{
                             fontFamily: "Plus Jakarta Sans",
                             fontSize: "12px",
                           }}
                         />
                         {errors.name.required ? (
                           <span className="text-danger form-text profile_error">
                             This field is required.
                           </span>
                         ) : errors.name.valid ? (
                           <span className="text-danger form-text profile_error">
                             This field is required.
                           </span>
                         ) : null}
                       </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputgender">
                        Gender
                      </label>
                      <select
                        class={`form-select form-select-lg rounded-1 ${errors.gender.required ? 'is-invalid' : ''} `}
                        onChange={handleInputs}
                        name="gender"
                        value={student?.gender}
                        aria-label="Default select example"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option selected>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        DOB
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.dob.required ? 'is-invalid' : ''}`}
                        onChange={handleInputs}
                        id="inputPassword4"
                        type="date"
                        value={student?.dob}
                        placeholder="Enter DOB"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        name="dob"
                      />
                      {errors.dob.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : errors.dob.valid ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        CitizenShip
                      </label>
                      <input
                        className= {`form-control rounded-1 ${errors.citizenShip.required ? 'is-invalid' : ''}`}
                        onChange={handleInputs}
                        value={student?.citizenShip}
                        name="citizenShip"
                        id="inputPassword4"
                        type="text"
                        placeholder="Enter CitizenShip"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />

                      {errors.citizenShip.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : errors.citizenShip.valid ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        Passport No
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.passportNo.required ?  'is-invalid' : ''}`}
                        onChange={handleInputs}
                        name="passportNo"
                        value={student?.passportNo}
                        id="inputAddress"
                        type="text"
                        placeholder="Enter Passport No"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.passportNo.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.passportNo.valid ? (
                        <span className="text-danger form-text">
                          Enter Vaild PassportNo.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputExpiry">
                        Expiry Date
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.expiryDate.required ? 'is-invalid' : ''}`}
                        onChange={handleInputs}
                        value={student?.expiryDate}
                        name="expiryDate"
                        id="inputAddress"
                        type="Date"
                        placeholder="Enter Expiry Date"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.expiryDate.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.expiryDate.valid ? (
                        <span className="text-danger form-text">
                         This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Email ID
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.email.required  ? 'is-invalid' : ''}`}
                        onChange={handleInputs}
                        value={student?.email}
                        id="inputPassword4"
                        text="text"
                        placeholder="Enter Email ID"
                        name="email"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.email.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.email.valid ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                 


<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>
     Primary Number
    <span className="text-danger">*</span>
  </label>
  <div className="d-flex align-items-end">


  <div className="input-group mb-3">
  <select className="form-select form-select-sm" name="dial1" style={{ maxWidth: '75px', fontFamily: "Plus Jakarta Sans",fontSize: "12px", }}  
  onChange={handleInputs} value={student?.dial1} >
  
  {dial?.map((item) => (
    <option value={item?.dialCode} key={item?.dialCode}>
      {item?.dialCode} - {item?.name} -
      {item?.flag && (
        <Flags
          code={item?.flag}
          className="me-2"
          style={{ width: "40px", height: "30px" }}
        />
      )}
    </option>
  ))}

   
  </select>
  <input
      type="text"
       aria-label="Text input with dropdown button"
      className={`form-control  ${
        errors.primaryNumber.required ? 'is-invalid' :  ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      name="primaryNumber"
      value={student.primaryNumber}
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
  {errors.primaryNumber.required && (
    <span className="text-danger form-text profile_error">
      This field is required.
    </span>
  )}
</div>

<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>
     WhatsApp Number
    <span className="text-danger">*</span>
  </label>
  <div className="input-group mb-3">
  <select className="form-select form-select-sm" name="dial2" style={{ maxWidth: '75px', fontFamily: "Plus Jakarta Sans",fontSize: "12px", }}  
  value={student?.dial2}
  onChange={handleInputs}>
    
    {dial?.map((item) => (
    <option value={item?.dialCode} key={item?.dialCode}>
      {item?.dialCode} - {item?.name} -
      {item?.flag && (
        <Flags
          code={item?.flag}
          className="me-2"
          style={{ width: "40px", height: "30px" }}
        />
      )}
    </option>
  ))}

   
  </select>

  <input
    type="text"
    className={`form-control rounded-1 ${
      errors.whatsAppNumber.required ? 'is-invalid' :  ''
    }`}
    placeholder="Example 123-456-7890"
    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
    name="whatsAppNumber"
    value={student.whatsAppNumber}
    onChange={handleInputs}
    onKeyDown={(e) => {
      if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    }}
  />
  </div>
  {errors.whatsAppNumber.required && (
    <span className="text-danger form-text profile_error">
      This field is required.
    </span>
  )}
</div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Qualification
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.qualification.required ? 'is-invalid' : ''}`}
                        id="inputPassword4"
                        onChange={handleInputs}
                        value={student?.qualification}
                        type="text"
                        name="qualification"
                        placeholder="Enter Qualification"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.qualification.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.qualification.valid ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        {" "}
                        Year passed
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.yearPassed.required ? 'is-invalid' : ''}`}
                        id="inputAddress"
                        onChange={handleInputs}
                        name="yearPassed"
                        value={student?.yearPassed}
                        type="text"
                        placeholder="Enter Passed Year"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.yearPassed.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">
                        CGPA{" "}
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.cgpa.required ?  'is-invalid' : ''}`}
                        onChange={handleInputs}
                        name="cgpa"
                        id="inputAddress"
                        type="text"
                        value={student?.cgpa}
                        placeholder=" Enter CGPA"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.cgpa.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.cgpa.valid ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">
                        Desired Country
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.desiredCountry.required ? 'is-invalid' : ''}`}
                        id="inputEmail4"
                        onChange={handleInputs}
                        value={student?.desiredCountry}
                        name="desiredCountry"
                        type="text"
                        placeholder="Enter Desired Country"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.desiredCountry.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Desired University
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.desiredUniversity.required ? 'is-invalid' : ''}`}
                        id="inputPassword4"
                        type="text"
                        onChange={handleInputs}
                        value={student?.desiredUniversity}
                        name="desiredUniversity"
                        placeholder="Enter Desired University"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.desiredUniversity.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : errors.desiredUniversity.valid ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">
                        Desired Course
                      </label>
                      <input
                        className={`form-control rounded-1 ${errors.desiredCourse.required ? 'is-invalid' : ''}`}
                        id="inputPassword4"
                        onChange={handleInputs}
                        value={student?.desiredCourse}
                        type="text"
                        name="desiredCourse"
                        placeholder="Enter Desired Course"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.desiredCourse.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="row g-3">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label" for="inputAddress">
                          Do You Hold Any Other Offer?{" "}
                        </label>
                        <select
                          className={`form-select form-select-lg rounded-1 ${errors.doYouHoldAnyOtherOffer.required ? 'is-invalid' : ''} `}
                          name="doYouHoldAnyOtherOffer"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          onChange={handleInputs}
                          value={student?.doYouHoldAnyOtherOffer}
                        >
                          <option value=""> Select Offer </option>
                          <option value="yes"> Yes </option>
                          <option value="no">No </option>
                        </select>
                        {errors.doYouHoldAnyOtherOffer.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label" for="inputEmail4">
                          Referee Name
                        </label>
                        <input
                          className={`form-control rounded-1 ${errors.refereeName.required ? 'is-invalid' : ''}`}
                          id="inputEmail4"
                          type="text"
                          name="refereeName"
                          value={student?.refereeName}
                          onChange={handleInputs}
                          placeholder="Enter Referee Name"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.refereeName.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.refereeName.valid ? (
                          <span className="text-danger form-text">
                           This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>
  Referee Contact
    <span className="text-danger">*</span>
  </label>
  <div className="d-flex align-items-end">


  <div className="input-group mb-3">
  <select className="form-select form-select-sm" name="dial3" style={{ maxWidth: '75px', fontFamily: "Plus Jakarta Sans",fontSize: "12px", }}  
  onChange={handleInputs} value={student?.dial} >
   <option value="+91">+91-India-in</option>
  {dial?.map((item) => (
    <option value={item?.dialCode} key={item?.dialCode}>
      {item?.dialCode} - {item?.name} -
      {item?.flag && (
        <Flags
          code={item?.flag}
          className="me-2"
          style={{ width: "40px", height: "30px" }}
        />
      )}
    </option>
  ))}

   
  </select>
  <input
      type="text"
       aria-label="Text input with dropdown button"
      className={`form-control  ${
        errors.refereeContactNo.required ? 'is-invalid' :  ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      name="refereeContactNo"
      value={student.refereeContactNo}
      onChange={handleInputs}
      onKeyDown={(e) => {
        if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      }}
    />
</div>


    
   
  </div>
  {errors.refereeContactNo.required && (
    <span className="text-danger form-text profile_error">
      This field is required.
    </span>
  )}
</div>
                    </div>

                    {student.doYouHoldAnyOtherOffer === "yes" ? (
                      <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputEmail4">
                            {" "}
                            Country
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputEmail4"
                            type="text"
                            name="country"
                            onChange={handleInputs}
                            value={student?.country}
                            placeholder=" Enter Country"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputEmail4">
                            University
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputEmail4"
                            type="text"
                            onChange={handleInputs}
                            value={student?.universityName}
                            name="universityName"
                            placeholder="Enter University "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputEmail4">
                            Program
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputEmail4"
                            type="text"
                            onChange={handleInputs}
                            value={student?.programName}
                            name="programName"
                            placeholder="Enter Program"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                      </div>
                    ) : null}

                  
                    <div className="row g-3">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label" for="inputEmail4">
                          Request Loan Support
                        </label>
                        <select
                          className={`form-select form-select-lg rounded-1 ${errors.doYouNeedSupportForLoan.required ? 'is-invalid' : ''}`}
                          name="doYouNeedSupportForLoan"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          onChange={handleInputs}
                          value={student?.doYouNeedSupportForLoan}
                        >
                          <option value=""> Select Loan support </option>
                          <option value="yes"> Yes </option>
                          <option value="no">No </option>
                        </select>
                        {errors.doYouNeedSupportForLoan.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label className="form-label" for="inputEmail4">
                          Register for IELTS class
                        </label>
                        <input
                          className={`form-control rounded-1 ${errors.registerForIELTSClass.required ? 'is-invalid' : ''}`}
                          id="inputEmail4"
                          type="text"
                          name="registerForIELTSClass"
                          onChange={handleInputs}
                          value={student?.registerForIELTSClass}
                          placeholder="Enter Register for IELTS class"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.registerForIELTSClass.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.registerForIELTSClass.valid ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                        <label className="form-label" for="inputEmail4">
                          {" "}
                          Assigned To
                        </label>
                        <input
                          className={`form-control rounded-1 ${errors.assignedTo.required ? 'is-invalid' : ''}`}
                          id="inputEmail4"
                          onChange={handleInputs}
                          type="text"
                          name="assignedTo"
                          value={student?.assignedTo}
                          placeholder=" Assigned To Staff"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.assignedTo.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row g-4">
                      <div className="d-flex flex-row align-item-center justify-content-end gap-3 ">
                        <Link
                          style={{
                            backgroundColor: "#231F20",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          to="/ListStudentForm"
                          className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white"
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
                          className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 text-white  "
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddStudentForm;
