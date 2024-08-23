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
import { getallCurrency } from "../../../api/currency";
import Select from "react-select";
import Flags from "react-world-flags";
import { saveForexEnquiry } from "../../../api/Enquiry/Forex";
import {getFilterSource} from "../../../api/settings/source";
import{getallStudent} from "../../../api/student";
import { getallAgent } from "../../../api/agent";
import Mastersidebar from "../../../compoents/sidebar";
export const AddForex = () => {
  const initialState = {
    source: "",
    studentName: "",
    country: "",
    currency: "",
    universityName: "",
    passportNo: "",
    primaryNumber: "",
    whatsAppNumber: "",
    email: "",
    agentName: "",
    flag: "",
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
    paymentType: "",
    amountInCurrency: "",
    assignedTo: "",
    expiryDate: "",
    courseType: "",
    value: "",
    markUp: "",
    profit: "",
  };
  const initialStateErrors = {
    source: { required: false },
    studentName: { required: false },
    country: { required: false },
    currency: { required: false },
    universityName: { required: false },
    passportNo: { required: false },
    primaryNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
    email: { required: false, valid: false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    paymentType: { required: false },
    amountInCurrency: { required: false },
    assignedTo: { required: false },
    flag: { required: false },
    expiryDate: { required: false },
    courseType: { required: false },
    value: {
      required: false,
    },
    markUp: {
      required: false,
    },
    profit: {
      required: false,
    },
  };
  const [forex, setForex] = useState(initialState);
  const [university, setUniversity] = useState();
  const [errors, setErrors] = useState(initialStateErrors);
  const [countries, setCountries] = useState([]);
  const [source ,setSource] = useState([]);
  const [agent, setAgent] = useState([]);
  const [students, setStudents] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
  }, []);

  const getAllUniversityList = () => {
    getallUniversity()
      .then((res) => {
        setUniversity(res?.data?.result);
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
  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (!data.source) {
      error.source.required = true;
    }
    if (!data.agentName) {
      error.agentName.required = true;
    }
    if (!isValidName(data.agentName)) {
      error.agentName.valid = true;
    }
    if (!data.businessName) {
      error.businessName.required = true;
    }

    if (!isValidName(data.businessName)) {
      error.businessName.valid = true;
    }

    if (!data.agentEmail) {
      error.agentEmail.required = true;
    }
    if (!isValidEmail(data.agentEmail)) {
      error.agentEmail.valid = true;
    }
    if (!data.agentPrimaryNumber) {
      error.agentPrimaryNumber.required = true;
    }
    if (!isValidPhone(data.agentPrimaryNumber)) {
      error.agentPrimaryNumber.valid = true;
    }

    if (!data.agentWhatsAppNumber) {
      error.agentWhatsAppNumber.required = true;
    }
    if (!isValidPhone(data.agentWhatsAppNumber)) {
      error.agentWhatsAppNumber.valid = true;
    }
    if (!data.studentName) {
      error.studentName.required = true;
    }
    if (!isValidName(data.studentName)) {
      error.studentName.valid = true;
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
    if (!data.primaryNumber) {
      error.primaryNumber.required = true;
    }
    if (!data.whatsAppNumber) {
      error.whatsAppNumber.required = true;
    }
    if (!data.email) {
      error.email.required = true;
    }
    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!isValidName(data.universityName)) {
      error.universityName.valid = true;
    }
    if (!data.country) {
      error.country.required = true;
    }
    if (!data.courseType) {
      error.courseType.required = true;
    }

    if (!data.paymentType) {
      error.paymentType.required = true;
    }
    if (!data.amountInCurrency) {
      error.amountInCurrency.required = true;
    }
    if (!data.assignedTo) {
      error.assignedTo.required = true;
    }

    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    if (!data.currency) {
      error.currency.required = true;
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
          };
         
   
        }
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
      saveForexEnquiry(forex)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListForexForm");
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
                    <label className="form-label" for="inputPrimaryNo">
                      Primary Number
                    </label>
                    <input
                      className="form-control"
                      name="agentPrimaryNumber"
                      onChange={handleInputs}
                      value={forex?.agentPrimaryNumber}
                      id="inputPrimaryNo"
                      type="text"
                      placeholder="Enter Primary Number"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    />
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label
                      className="form-label"
                      for="inputWhatsAppNumber"
                    >
                      {" "}
                      WhatsApp Number
                    </label>
                    <input
                      className="form-control"
                      name="agentWhatsAppNumber"
                      onChange={handleInputs}
                      value={forex?.agentWhatsAppNumber}
                      id="inputWhatsAppNumber"
                      type="text"
                      placeholder="Enter WhatsApp Number"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    />
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
                        name="studentName"
                        onChange={handleInputs}
                        id="inputstudentname"
                        type="text"
                        placeholder="Enter Name of the Student"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.studentName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.studentName.valid ? (
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
                      <div className="input-group">
                      <label className="form-label" for="inputPrimaryNo">
                        Primary Number<span className="text-danger">*</span>
                      </label>

                      <div className="input-group mb-3">
  <select className="form-select-sm" style={{ maxWidth: '100px', fontFamily: "Plus Jakarta Sans",fontSize: "12px", }} >
    <option value="+91" selected>+91</option>
    <option value="+1">+1</option>
    <option value="+44">+44</option>
    <option value="+61">+61</option>
    {/* Add more country codes as needed */}
  </select>
  <input
    className="form-control"
    name="primaryNumber"
    onChange={handleInputs}
    id="inputPrimaryNo"
    type="text"
    aria-label="Text input with dropdown button"
    placeholder="Enter Primary Number"
    style={{
      fontFamily: "Plus Jakarta Sans",
      fontSize: "12px",
    }}
  />
</div>

                      {/* <div className="input-group mb-3">
  <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  
   
  </ul>
  
</div> */}
                    
                     
                     
                      </div>
                     
                    
                      {errors.primaryNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.primaryNumber.valid ? (
                        <div className="text-danger form-text">
                          Enter valid emergencyContactNo.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputWhatsAppNumber">
                        WhatsApp Number<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        name="whatsAppNumber"
                        onChange={handleInputs}
                        id="inputWhatsAppNumber"
                        type="text"
                        placeholder="Enter WhatsApp Number"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.whatsAppNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.whatsAppNumber.valid ? (
                        <div className="text-danger form-text">
                          Enter valid emergencyContactNo.
                        </div>
                      ) : null}
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
                          onChange={handleInputs}
                          name="currency"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          value={`${forex.currency}`}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputamount">
                        Amount In Currency<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputamount"
                        onChange={handleInputs}
                        name="amountInCurrency"
                        type="text"
                        placeholder="Enter Amount In Currency"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.amountInCurrency.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
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
                        Mark up<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control rounded-2"
                        id="inputamount"
                        name="Markup"
                        type="text"
                        placeholder="Enter Mark up"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
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
                        name="Profit"
                        type="text"
                        placeholder="Enter Profit"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.amountInCurrency.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                    <div className="row g-2">
                      <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <Link
                          to="/ListForexForm"
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
