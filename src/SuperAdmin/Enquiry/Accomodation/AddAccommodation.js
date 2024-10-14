import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { getallUniversity } from "../../../api/university";
import { getFilterCountry } from "../../../api/globalsettings";
import { getallCode } from "../../../api/settings/dailcode";
import {getFilterSource} from "../../../api/settings/source";
import{getallStudent} from "../../../api/student";
import { getallAgent } from "../../../api/agent";
import CountryRegion from "countryregionjs";
import { getallCountryList } from "../../../api/country";
import {getFilterApplicationStatus} from "../../../api/StatusEnquiry/accomdation";
import Select from "react-select";
import Flags from "react-world-flags";
import { saveAccommodationEnquiry } from "../../../api/Enquiry/accommodation";
import Mastersidebar from "../../../compoents/sidebar";
export const AddAccommodation = () => {
  const initialState = {
    source: "",
    studentName: "",
    name: "",
    passportNumber: "",
    expiryDate: "",
    email:"",
    primaryNumber: "",
    whatsAppNumber: "",
    universityName: "",
    courseType: "",
    accommodationType: "",
    country:"",
    state:"",
    lga:"",
    dial1: "",
    dial2: "",
    dial3:"",
    dial4:"",  
    agentName: "",
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
    final: "",
    assignedTo: "",
  };
  const initialStateErrors = {
    source: { required: false },
    studentName: { required: false },
    name: { required: false },
    universityName: { required: false },
    courseType: { required: false },
    passportNumber: { required: false },
    expiryDate: { required: false },
    primaryNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
    email: { required: false, valid: false },
    accommodationType: { required: false },
    country: { required: false },
    state: { required: false },
    lga: { required: false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
    dial4: { required: false },
   
    final: { required: false },
    assignedTo: { required: false },
  };
  const [forex, setForex] = useState(initialState);
  const [source ,setSource] = useState([]);
  const [agent, setAgent] = useState([]);
  const [students, setForexs] = useState([]);
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false); // Added state for checkbox
  const [dial, setDial] = useState([]);
  const [pagination, setPagination] = useState({
    from: 0,
    to: 10,
    count: 0,
  });
  const [university, setUniversity] = useState();
  const [countrie, setCountrie] = useState([]);

  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState([]);
  const [countriesData, setCountriesData] = useState([]); // Holds country data
  const [states, setStates] = useState([]); // Holds state data
  const [cities, setCities] = useState([]); // Holds city data
  const [selectedCountry, setSelectedCountry] = useState(""); // Selected country
  const [selectedState, setSelectedState] = useState(""); // Selected state
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
  }, []);

  useEffect(() => {
    getAllCountryDetails();
    getAllCountryDetail();
    getAllApplicationsModuleDetails();
    getAllSourceDetails();
    getStudentList();
    getAgentList();
    getallCodeList();
  }, [pagination.from, pagination.to]);


  const getAllCountryDetail = () => {
    getallCountryList()
      .then((res) => {
        setCountriesData(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllCountryDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterCountry(data)
      .then((res) => {
        console.log(res);
        setCountrie(res?.data?.result?.countryList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.countryCount,
        });
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

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (!data.source) {
      error.source.required = true;
    }
    if (!data.name) {
      error.name.required = true;
    }
    
   
    if (!data.passportNumber) {
      error.passportNo.required = true;
    }
    if (!data.expiryDate) {
      error.expiryDate.required = true;
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
    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!data.courseType) {
      error.courseType.required = true;
    }
    if (!data.accommodationType) {
      error.accommodationType.required = true;
    }
    if (!data.assignedTo) {
      error.assignedTo.required = true;
    }
     if (!data.final) {
      error.final.required = true;
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
 
  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    // Find the selected country in the countriesData
    const selectedCountryData = countriesData.find(country => country._id === countryId);
    
    if (selectedCountryData) {
      setStates(selectedCountryData.state); // Set the states for selected country
      setCities([]); // Clear city data if country changes
      setSelectedState('');
      setSelectedCountryName(selectedCountryData.name); // Reset selected state
    }
  };

  // Handle state selection
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);

    // Find the selected state in the states data
    const selectedStateData = states.find(state => state.name === stateName);
    
    if (selectedStateData) {
      setCities(selectedStateData.cities); 
      setSelectedCity(''); // Set cities for selected state
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    
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

  const getAllApplicationsModuleDetails = () => {
    const data = {
      limit: 10,
    
    };
    getFilterApplicationStatus(data)
      .then((res) => {
       
        setStatus(res?.data?.result?.statusList || []);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(forex);
    setErrors(newError);
    setSubmitted(true);
    const data = {
      ...forex,
      status: status,
      country: selectedCountryName,
      state: selectedState,
      lga: selectedCity,
    }
    if (handleErrors(newError)){
      saveAccommodationEnquiry(data)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_accommodation");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }else {
      toast.error("Please Fill  Mandatory Fields");
    }
  };


  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };
  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "13px" }}>
        <div className="content-header">
          <form className="p-1" onSubmit={handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h6 className="text-center text-capitalize p-1">
                        {" "}
                        Add Accommodation Enquiry
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
                          className={`form-select form-select-lg rounded-1 text-capitalize ${errors.source.required ? 'is-invalid' : ''} `}
                          name="source"
                          value={forex?.source}
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
                          className="form-select form-select-lg rounded-1 text-capitalize "
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
                          className="form-select form-select-lg rounded-1 text-capitalize "
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
                      className="form-control rounded-1 text-capitalize"
                      id="inputbusinessname"
                      type="text"
                      onChange={handleInputs}
                      value={forex.businessName}
                      name="businessName"
                      placeholder="Example Jake Doe"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                      onKeyDown={(e) => {
                        // Prevent default behavior for disallowed keys
                   if (!/^[a-zA-Z0-9]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                     e.preventDefault();
                   }
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
  onChange={handleInputs} value={forex.dial3} >
  
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
        errors.agentPrimaryNumber.required ? 'is-invalid'  : ''
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
  value={forex.dial4}
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
    className={`form-control  ${
      errors.agentWhatsAppNumber.required ? 'is-invalid'  : ''
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
                      className="form-control rounded-1 text-lowercase"
                      name="agentEmail"
                      onChange={handleInputs}
                      id="inputEmail"
                      value={forex?.agentEmail}
                      type="text"
                      placeholder="Example jake123@gmail.com"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                      onKeyDown={(e) => {
                        // Prevent default behavior for disallowed keys
                   if (!/^[a-zA-Z0-9@._-]*$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
                        'Tab', 'Enter', 'Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) {
                     e.preventDefault();
                   }
                  }}
                    />
                  </div>
                 
                  </div>
                     
                      
                
                    ) : null}
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputstudentname">
                          Student Name
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control rounded-1 text-capitalize ${errors.name.required ? 'is-invalid' : ''}`}
                            name="name"
                            onChange={handleInputs}
                            value={forex?.name}
                            id="inputstudentname"
                            type="text"
                            placeholder="Example John Doe"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onKeyDown={(e) => {
                              // Prevent non-letter characters
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.name.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputpassportno">
                            Passport No<span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control rounded-1 text-uppercase ${errors.passportNumber.required ? 'is-invalid' : ''}`}
                            id="inputpassportno"
                            onChange={handleInputs}
                            name="passportNumber"
                            value={forex?.passportNumber}
                            type="text"
                            placeholder="Example WER23YRT"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onKeyDown={(e) => {
                              // Prevent default behavior for disallowed keys
                         if (!/^[a-zA-Z0-9]$/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                           e.preventDefault();
                         }
                        }}
                          />
                          {errors.passportNumber.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputpassportno">
                            Expiry Date<span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control rounded-1 text-uppercase ${errors.expiryDate.required ? 'is-invalid' : ''}`}
                            id="inputpassportno"
                            name="expiryDate"
                            value={forex?.expiryDate}
                            onChange={handleInputs}
                            type="date"
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
                          ) : null}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputEmail">
                            Email ID<span className="text-danger">*</span>
                          </label>
                          <input
                            className={`form-control rounded-1 text-lowercase ${errors.email.required ? 'is-invalid' : ''}`}
                            name="email"
                            onChange={handleInputs}
                            value={forex?.email}
                            id="inputEmail"
                            type="text"
                            placeholder="Example john123@gmail.com"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
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
  onChange={handleInputs} value={forex?.dial1} >
  
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
      value={forex?.primaryNumber}
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
      errors.whatsAppNumber.required ? 'is-invalid' : ''
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
                            University Name
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className={`form-control rounded-1 text-capitalize ${errors.universityName.required ? 'is-invalid' : ''}`}
                            id="inputstudentid"
                            name="universityName"
                            onChange={handleInputs}
                            value={forex?.universityName}
                            type="text"
                            placeholder="Example Harvard University"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onKeyDown={(e) => {
                              // Prevent non-letter characters
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.universityName.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            Course<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className={`form-control rounded-1 text-capitalize ${errors.courseType.required ?  'is-invalid' : ''}`}
                            id="inputstudentid"
                            name="courseType"
                            onChange={handleInputs}
                            type="text"
                            value={forex?.courseType}
                            placeholder="Example Machine Learning"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onKeyDown={(e) => {
                              // Prevent non-letter characters
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.courseType.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                       
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            Country<span className="text-danger">*</span>
                          </label>
                          <select
                             style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1`}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                          >
                            <option value="">Select a country</option>
                            {countriesData.map((country) => (
                              <option key={country._id} value={country._id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            State<span className="text-danger">*</span>
                          </label>
                          <select
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1`}
                            value={selectedState}
                            onChange={handleStateChange}
                            disabled={!selectedCountry}
                          >
                            <option value="">Select a state</option>
                            {states.map((state) => (
                              <option key={state.name} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            City<span className="text-danger">*</span>
                          </label>

                          <select
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            className={`form-select form-select-lg rounded-1`}
                          value={selectedCity} onChange={handleCityChange}   disabled={!selectedState} 
                          >
                            <option value="">Select a city</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            Accommodation Type
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className={`form-control rounded-1 text-capitalize ${errors.accommodationType.required ?  'is-invalid' : ''}`}
                            id="inputstudentid"
                            name="accommodationType"
                            type="text"
                            value={forex.accommodationType}
                            onChange={handleInputs}
                            placeholder="Example Personal"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onKeyDown={(e) => {
                              // Prevent non-letter characters
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.accommodationType.required ? (
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
                            className={`form-select form-select-lg rounded-1 text-capitalize ${errors.assignedTo.required ? 'is-invalid' : ''} `}
                            onChange={handleInputs}
                            value={forex.assignedTo}
                            name="assignedTo"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            id="inputassignedto"
                          >
                            <option>Select User</option>
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
                          <label className="form-label" for="inputuniversity">
                            Finalised By<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className={`form-control rounded-1 text-capitalize ${errors.final.required ? 'is-invalid' : ''}`}
                            id="inputstudentid"
                            name="final"
                            value={forex.final}
                            onChange={handleInputs}
                            type="text"
                            placeholder="Example Admin"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onKeyDown={(e) => {
                              // Prevent non-letter characters
                              if (/[^a-zA-Z\s]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                          {errors.final.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>

                      

                      
                        <div className="row g-2">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              to="/list_accommodation"
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
                              className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2"
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddAccommodation;
