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
import { useNavigate, Link } from "react-router-dom";
import { getallUniversity } from "../../../api/university";
import {  getSingleStaff } from "../../../api/staff";
import {getStaffId } from "../../../Utils/storage";
import { getallCode } from "../../../api/settings/dailcode";
import { getallCurrency } from "../../../api/currency";
import Select from "react-select";
import Flags from "react-world-flags";
import { saveForexEnquiry } from "../../../api/Enquiry/Forex";
import {getFilterSource} from "../../../api/settings/source";
import{getallStudent} from "../../../api/student";
import { getallAgent } from "../../../api/agent";
import Mastersidebar from "../../../compoents/StaffSidebar";
import { getallClient } from "../../../api/client";


export const AddForex = () => {
  const initialState = {
    typeOfClient: "",
    source: "",
    name:"",
    studentName: "",
    passportNo: "",
    email: "",
    dial1: "",
    dial2: "",
    dial3:"",
    dial4:"",
    agentName: "",
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
    expiryDate: "",
    primaryNumber: "",
    whatsAppNumber: "",
    country: "",
    universityName: "",
    courseType: "",
    paymentType: "",
    flag: "",
    currency: "",
    assignedTo: "",
    value: "",
    markUp: "",
    profit: "",
  };
  const initialStateErrors = {
    typeOfClient: { required: false },
    source: { required: false },
    name:{required: false},
    studentName: { required: false },
    passportNo: { required: false },
    email: { required: false, valid: false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
    dial4: { required: false },
    expiryDate: { required: false },
    primaryNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
    universityName: { required: false },
    courseType: { required: false },
    paymentType: { required: false },
    flag: { required: false },
    country: { required: false },
    currency: { required: false },
    assignedTo: { required: false },
    value: {required: false},
    markUp: {required: false},
    profit: {required: false},
  };
  const [forex, setForex] = useState(initialState);
  const [university, setUniversity] = useState();
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [staff, setStaff] = useState([]);
  const [source ,setSource] = useState([]);
  const [agent, setAgent] = useState([]);
  const [students, setForexs] = useState([]);
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false); // Added state for checkbox
  const [dial, setDial] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [client, setClient] = useState([]);


  useEffect(() => {
    getAllUniversityList();
    getAllCurrencyDetails();
    getStaffDetails();
    getallCodeList();
    getClientList();
  }, []);

  const getClientList = () => {
    
    getallClient()
      .then((res) => {
        setClient(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStaffDetails = () => {
    const id = getStaffId();
    getSingleStaff(id)
      .then((res) => {
        console.log("yuvi", res);
        setStaff(res?.data?.result); // Assuming the staff data is inside res.data.result
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllUniversityList = () => {
    getallUniversity()
      .then((res) => {
        setUniversity(res?.data?.result);
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
  const getallCodeList = () => {
    getallCode()
      .then((res) => {
        setDial(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
    getAllSourceDetails();
    getStudentList();
    getAgentList();
  }, []);


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
        setForexs(res?.data?.result || []);
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
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.typeOfClient === "") {
      error.typeOfClient.required = true;
    }
    if (!data.source) {
      error.source.required = true;
    }
   
    if (!data.name) {
      error.name.required = true;
    }
    if (!isValidName(data.name)) {
      error.name.valid = true;
    }
    if (!data.passportNo) {
      error.passportNo.required = true;
    }
    if (!isValidPassportNumber(data.passportNo)) {
      error.passportNo.valid = true;
    }
    if (!data.expiryDate) {
      error.expiryDate.required = true;
    }
   
    if (!data.email) {
      error.email.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!data.primaryNumber) {
      error.primaryNumber.required = true;
    }
    if (!data.whatsAppNumber) {
      error.whatsAppNumber.required = true;
    }
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!isValidName(data.universityName)) {
      error.universityName.valid = true;
    }
    if (!data.courseType) {
      error.courseType.required = true;
    }

    if (!data.paymentType) {
      error.paymentType.required = true;
    }
    if (!data.country) {
      error.country.required = true;
    }
    if (!data.currency) {
      error.currency.required = true;
    }

    if (!data.assignedTo) {
      error.assignedTo.required = true;
    }
    if (!data.value) {
      error.value.required = true;
    }
    if (!data.markUp) {
      error.markUp.required = true;
    }
    if (!data.profit) {
      error.profit.required = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
  
    setForex((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };
  
      if (name === "agentName") {
        const selectedAgent = agent.find((u) => u.agentName === value);
        if (selectedAgent) {
          return {
            ...updatedProgram,
            businessName: selectedAgent.businessName,
            agentPrimaryNumber: selectedAgent.mobileNumber,
            agentWhatsAppNumber: selectedAgent.whatsAppNumber,
            agentEmail: selectedAgent.email,
            dial1: selectedAgent.dial1,
            dial2: selectedAgent.dial2
          };
        }
      }
  

      if (name === "country") {
        const selectedCountryData = countries.find(
          (country) => country.country === value
        ) || { currency: "", flag: "" };
  
        updatedProgram.currency = selectedCountryData.currency;
        updatedProgram.flag = selectedCountryData.flag;
      }
  
      return updatedProgram;
    });
  
    if (submitted) {
      const newError = handleValidation({
        ...forex,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setForex((prevClient) => ({
        ...prevClient,
        whatsAppNumber: `${prevClient.primaryNumber}`,
      }));
    } else {
      setForex((prevClient) => ({
        ...prevClient,
        whatsAppNumber: "",
      }));
    }
  };

  const handleCheckboxChanges = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setForex((prevClient) => ({
        ...prevClient,
        agentWhatsAppNumber: `${prevClient.agentPrimaryNumber}`,
      }));
    } else {
      setForex((prevClient) => ({
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
    const newError = handleValidation(forex);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
      saveForexEnquiry({...forex,
        staffId:staff._id,
        adminId:staff.adminId,
      })
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/staff_list_forex_form");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "13px" }}>
        <div className="content-header">
          <form className="p-1" onSubmit={handleSubmit}>
            <div className="container-fluid">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h6 className="text-center text-capitalize p-1">
                    {" "}
                    Forex Enquiry
                  </h6>
                </div>
                <div className="card-body mt-5">
                  <div className="row g-3">

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            Client Name<span className="text-danger">*</span>
                          </label>
                          <select
                            onChange={handleInputs}
                            style={{
                              backgroundColor: "#fff",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1 ${
                              errors.typeOfClient.required ? "is-invalid" : ""
                            }`}
                            name="typeOfClient"
                            placeholder="Select Client"
                          >
                            <option value={""}>Select Client</option>
                            {client.map((data, index) => (
                              <option key={index} value={data?.businessName}>
                                {" "}
                                {data?.businessName}
                              </option>
                            ))}
                          </select>
                          {errors.typeOfClient.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                  </div>
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
                          className="form-select form-select-lg rounded-2 "
                          name="source"
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

                      {forex.source === "Student" ? (
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
                      {forex.source === "Agent" ? (
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
                      value={forex.businessName}
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
  onChange={handleInputs} value={forex?.dial3} >
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
        errors.agentPrimaryNumber.required ? 'is-invalid' : errors.agentPrimaryNumber.valid ? 'is-valid' : ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      name="agentPrimaryNumber"
      value={forex.agentPrimaryNumber}
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
  value={forex?.dial4}
  onChange={handleInputs}>
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
    className={`form-control rounded-1 ${
      errors.agentWhatsAppNumber.required ? 'is-invalid' : errors.agentWhatsAppNumber.valid ? 'is-valid' : ''
    }`}
    placeholder="Example 123-456-7890"
    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
    name="agentWhatsAppNumber"
    value={forex.agentWhatsAppNumber}
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
                      value={forex?.agentEmail}
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
                      <label className="form-label" for="inputstudentname">
                        Name of the Student
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        name="name"
                        onChange={handleInputs}
                        id="inputstudentname"
                        type="text"
                        placeholder="Enter Name of the Student"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.name.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.name.valid ? (
                        <div className="text-danger form-text">
                          Enter Name Letter Only
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">
                        Passport No<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputpassportno"
                        onChange={handleInputs}
                        name="passportNo"
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
                        <div className="text-danger form-text">
                          Enter Vaild Passport Number Only
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">
                        Expiry Date<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputpassportno"
                        name="expiryDate"
                        onChange={handleInputs}
                        type="date"
                        placeholder="Enter ExpiryDate"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.expiryDate.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail">
                        Email ID<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        name="email"
                        onChange={handleInputs}
                        id="inputEmail"
                        type="text"
                        placeholder="Enter Email ID"
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
                          Enter valid Email Id.
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
  onChange={handleInputs} value={forex?.dial1} >
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
        errors.primaryNumber.required ? 'is-invalid' : errors.primaryNumber.valid ? 'is-valid' : ''
      }`}
      placeholder="Example 123-456-7890"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      name="primaryNumber"
      value={forex.primaryNumber}
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
  value={forex?.dial2}
  onChange={handleInputs}>
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
    className={`form-control rounded-1 ${
      errors.whatsAppNumber.required ? 'is-invalid' : errors.whatsAppNumber.valid ? 'is-valid' : ''
    }`}
    placeholder="Example 123-456-7890"
    style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
    name="whatsAppNumber"
    value={forex.whatsAppNumber}
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
                      <label className="form-label" for="inputuniversity">
                        University Name<span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputstudentid"
                        name="universityName"
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter Student ID"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.universityName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.universityName.valid ? (
                        <div className="text-danger form-text">
                          Enter valid universityName.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputuniversity">
                        Course<span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputstudentid"
                        name="courseType"
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter Course"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.courseType.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpayment">
                        Payment Type<span className="text-danger">*</span>{" "}
                      </label>
                      <select
                        className="form-select form-select-lg"
                        onChange={handleInputs}
                        name="paymentType"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        id="inputpayment"
                      >
                        <option>Payment Type</option>
                        <option value="Tuition_Fees"> Tuition Fees</option>
                        <option value="GIC">GIC</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value=" Ticket"> Ticket</option>
                        <option value="Application_Fees">
                          Application Fees
                        </option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.paymentType.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label style={{ color: "#231F20" }}>
                        Country<span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-2 p-2"
                        name="country"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        onChange={handleInputs}
                      >
                        <option value="" disabled hidden>
                          Select Country
                        </option>
                        {countries.map((country) => (
                          <option
                            key={country.value}
                            value={country.country}
                          >
                            {country.country}
                          </option>
                        ))}
                      </select>
                      {errors.country.required && (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      )}
                    </div>


                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label style={{ color: "#231F20" }}>Currency</label>
  <div className="d-flex align-items-center">
    {forex.flag && (
      <Flags
        code={forex.flag}
        className="me-2"
        name="flag"
        onChange={handleInputs}
        style={{ width: "40px", height: "30px" }}
      />
    )}
    <input
      className="form-control rounded-2"
      type="text"
      name="currency"
      style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      value={forex.currency}
      onChange={handleInputs}
      readOnly
    />
    {errors.currency.required && (
      <div className="text-danger form-text">
        This field is required.
      </div>
    )}
  </div>
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputassignedto">
                        Assigned To <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select form-select-lg"
                        onChange={handleInputs}
                        name="assignedTo"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        id="inputassignedto"
                      >
                        <option>Assigned To</option>
                        <option>Agent</option>
                        <option>Admin</option>
                      </select>
                      {errors.assignedTo.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputamount">
                        Value<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputamount"
                        name="value"
                        onChange={handleInputs}
                        type="number"
                        placeholder="Enter Mark up"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.value.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputamount">
                        Mark up<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputamount"
                        name="markUp"
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter Mark up"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.markUp.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputamount">
                        Profit (Value*Mark up)
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputamount"
                        onChange={handleInputs}
                        name="profit"
                        type="text"
                        placeholder="Enter Profit"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.profit.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="row g-2">
                      <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <Link
                          to="/staff_list_forex_form"
                          style={{
                            backgroundColor: "#231F20",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
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
                          className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-1"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddForex;
