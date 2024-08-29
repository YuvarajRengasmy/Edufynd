import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { getallCode } from "../../../api/settings/dailcode";
import { saveFlightEnquiry } from "../../../api/Enquiry/flight";
import Mastersidebar from "../../../compoents/sidebar";
import { getFilterSource } from "../../../api/settings/source";
import { getallStudent } from "../../../api/student";
import { getallAgent } from "../../../api/agent";
import Flags from "react-world-flags";

export const Addflight = () => {
  const initialState = {
    source: "",
    name: "",
    studentName: "",
    passportNo: "",
    primaryNumber: "",
    whatsAppNumber: "",
    email: "",
    agentName: "",
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
    from: "",
    to: "",
    dateOfTravel: "",
    dial1: "",
    dial2: "",
    dial3: "",
    dial4: "",
  };
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    studentName: { required: false },
    passportNo: { required: false },
    from: { required: false },
    to: { required: false },
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
    dial4: { required: false },
    primaryNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
    email: { required: false, valid: false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    dateOfTravel: { required: false },
  };
  const [flight, setFlight] = useState(initialState);
  const [university, setUniversity] = useState();
  const [source, setSource] = useState([]);
  const [agent, setAgent] = useState([]);
  const [students, setflights] = useState([]);
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false); // Added state for checkbox
  const [dial, setDial] = useState([]);
  const [pagination, setPagination] = useState({
    from: 0,
    to: 10,
    count: 0,
  });
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllSourceDetails();
    getStudentList();
    getAgentList();
    getallCodeList();
  }, [pagination.from, pagination.to]);

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
        setflights(res?.data?.result || []);
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
      setFlight((prevClient) => ({
        ...prevClient,
        whatsAppNumber: `${prevClient.primaryNumber}`,
      }));
    } else {
      setFlight((prevClient) => ({
        ...prevClient,
        whatsAppNumber: "",
      }));
    }
  };

  const handleCheckboxChanges = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setFlight((prevClient) => ({
        ...prevClient,
        agentWhatsAppNumber: `${prevClient.agentPrimaryNumber}`,
      }));
    } else {
      setFlight((prevClient) => ({
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
    if (!data.passportNo) {
      error.passportNo.required = true;
    }
    if (!data.from) {
      error.from.required = true;
    }
    if (!data.to) {
      error.to.required = true;
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
    if (!data.dateOfTravel) {
      error.dateOfTravel.required = true;
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
  
    setFlight((prevProgram) => {
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
        ...flight,
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
    const newError = handleValidation(flight);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      saveFlightEnquiry(flight)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_flight_ticket");
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

      <div className="content-wrapper" style={{ fontSize: "14px" }}>
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
                    Add Flight Enquiry
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
                        value={flight?.source}
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

                    {flight.source === "Student" ? (
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
                                <option
                                  key={index}
                                  value={`${data.name} - ${data.studentCode}`}
                                >
                                  {data.name}
                                  {" - "}
                                  {data.studentCode}
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
                    {flight.source === "Agent" ? (
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
                                  {data.agentName}
                                  {" - "}
                                  {data.agentCode}
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
                            value={flight.businessName}
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
                              <select
                                className="form-select form-select-sm"
                                name="dial3"
                                style={{
                                  maxWidth: "75px",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                onChange={handleInputs}
                                value={flight.dial3}
                              >
                                {dial?.map((item) => (
                                  <option
                                    value={item?.dialCode}
                                    key={item?.dialCode}
                                  >
                                    {item?.dialCode} - {item?.name} -
                                    {item?.flag && (
                                      <Flags
                                        code={item?.flag}
                                        className="me-2"
                                        style={{
                                          width: "40px",
                                          height: "30px",
                                        }}
                                      />
                                    )}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="text"
                                aria-label="Text input with dropdown button"
                                className={`form-control  ${
                                  errors.agentPrimaryNumber.required
                                    ? "is-invalid"
                                    : errors.agentPrimaryNumber.valid
                                    ? "is-valid"
                                    : ""
                                }`}
                                placeholder="Example 123-456-7890"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                name="agentPrimaryNumber"
                                value={flight.agentPrimaryNumber}
                                onChange={handleInputs}
                                onKeyDown={(e) => {
                                  if (
                                    !/^[0-9]$/i.test(e.key) &&
                                    ![
                                      "Backspace",
                                      "Delete",
                                      "ArrowLeft",
                                      "ArrowRight",
                                    ].includes(e.key)
                                  ) {
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
                            <select
                              className="form-select form-select-sm"
                              name="dial4"
                              style={{
                                maxWidth: "75px",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              value={flight.dial4}
                              onChange={handleInputs}
                            >
                              {dial?.map((item) => (
                                <option
                                  value={item?.dialCode}
                                  key={item?.dialCode}
                                >
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
                                errors.agentWhatsAppNumber.required
                                  ? "is-invalid"
                                  : errors.agentWhatsAppNumber.valid
                                  ? "is-valid"
                                  : ""
                              }`}
                              placeholder="Example 123-456-7890"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="agentWhatsAppNumber"
                              value={flight.agentWhatsAppNumber}
                              onChange={handleInputs}
                              onKeyDown={(e) => {
                                if (
                                  !/^[0-9]$/i.test(e.key) &&
                                  ![
                                    "Backspace",
                                    "Delete",
                                    "ArrowLeft",
                                    "ArrowRight",
                                  ].includes(e.key)
                                ) {
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
                            value={flight?.agentEmail}
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
                        className="form-control"
                        name="name"
                        onChange={handleInputs}
                        value={flight?.name}
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
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">
                        Passport No<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="inputpassportno"
                        onChange={handleInputs}
                        name="passportNo"
                        value={flight?.passportNo}
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
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">
                        Passport valid Date
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="inputpassportno"
                        onChange={handleInputs}
                        name="expiryDate"
                        value={flight?.expiryDate}
                        type="date"
                        placeholder="Enter Vaid Passport Date"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputuniversity">
                        {" "}
                        From<span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        id="inputstudentid"
                        name="from"
                        value={flight?.from}
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter from Location"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.from.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputuniversity">
                        To<span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        id="inputstudentid"
                        name="to"
                        value={flight?.to}
                        onChange={handleInputs}
                        type="text"
                        placeholder="Enter to Location"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.to.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputuniversity">
                        {" "}
                        Date Of Travel<span className="text-danger">
                          *
                        </span>{" "}
                      </label>
                      <input
                        className="form-control"
                        id="inputstudentid"
                        name="dateOfTravel"
                        onChange={handleInputs}
                        value={flight?.dateOfTravel}
                        type="date"
                        placeholder="Enter to  dateOfTravel"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.dateOfTravel.required ? (
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
                          <select
                            className="form-select form-select-sm"
                            name="dial1"
                            style={{
                              maxWidth: "75px",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                            value={flight?.dial1}
                          >
                            {dial?.map((item) => (
                              <option
                                value={item?.dialCode}
                                key={item?.dialCode}
                              >
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
                              errors.primaryNumber.required
                                ? "is-invalid"
                                : errors.primaryNumber.valid
                                ? "is-valid"
                                : ""
                            }`}
                            placeholder="Example 123-456-7890"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="primaryNumber"
                            value={flight?.primaryNumber}
                            onChange={handleInputs}
                            onKeyDown={(e) => {
                              if (
                                !/^[0-9]$/i.test(e.key) &&
                                ![
                                  "Backspace",
                                  "Delete",
                                  "ArrowLeft",
                                  "ArrowRight",
                                ].includes(e.key)
                              ) {
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
                        <select
                          className="form-select form-select-sm"
                          name="dial2"
                          style={{
                            maxWidth: "75px",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          value={flight?.dial2}
                          onChange={handleInputs}
                        >
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
                            errors.whatsAppNumber.required
                              ? "is-invalid"
                              : errors.whatsAppNumber.valid
                              ? "is-valid"
                              : ""
                          }`}
                          placeholder="Example 123-456-7890"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="whatsAppNumber"
                          value={flight.whatsAppNumber}
                          onChange={handleInputs}
                          onKeyDown={(e) => {
                            if (
                              !/^[0-9]$/i.test(e.key) &&
                              ![
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                              ].includes(e.key)
                            ) {
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
                      <label className="form-label" for="inputEmail">
                        Email ID<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="email"
                        onChange={handleInputs}
                        value={flight?.email}
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

                    <div className="row g-2">
                      <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <Link
                          to="/list_flight_ticket"
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
          </form>
        </div>
      </div>
    </>
  );
};
export default Addflight;
