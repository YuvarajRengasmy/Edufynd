import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { saveGeneralEnquiry } from "../../../api/Enquiry/GeneralEnquiry";
import { getFilterSource } from "../../../api/settings/source";
import { getallStudent } from "../../../api/student";
import { getallAgent } from "../../../api/agent";
import { getallCode } from "../../../api/settings/dailcode";
import Flags from "react-world-flags";

import Mastersidebar from "../../../compoents/sidebar";

export const AddGeneralEnquiry = () => {
  const initialState = {
    source: "",
    name: "",
    expiryDate: "",
    passportNo: "",
    qualification: "",
    whatsAppNumber: "",
    mobileNumber: "",
    email: "",
    cgpa: "",
    yearPassed: "",
    desiredCountry: "",
    desiredCourse: "",
    doYouNeedSupportForLoan: "",
    assignedTo: "",
    dial1: "",
    dial2: "",
    dial3: "",
    dial4: "",
    agentName: "",
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
  };
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    expiryDate: { required: false },
    passportNo: { required: false },
    qualification: { required: false },
    whatsAppNumber: { required: false },
    mobileNumber: { required: false },
    email: { required: false },
    cgpa: { required: false },
    yearPassed: { required: false },
    desiredCountry: { required: false },
    desiredCourse: { required: false },
    doYouNeedSupportForLoan: { required: false },
    assignedTo: { required: false },
    agentName: { required: false },
    businessName: { required: false },

    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    dial1: { required: false },
    dial2: { required: false },
    dial3: { required: false },
    dial4: { required: false },
  };
  const [student, setStudent] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [source, setSource] = useState([]);
  const [agent, setAgent] = useState([]);
  const [students, setStudents] = useState([]);
  const [copyToWhatsApp, setCopyToWhatsApp] = useState(false); // Added state for checkbox
  const [dial, setDial] = useState([]);

  useEffect(() => {
    getAllSourceDetails();
    getStudentList();
    getAgentList();
    getallCodeList();
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
  const getallCodeList = () => {
    getallCode()
      .then((res) => {
        setDial(res?.data?.result);
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

    if (data.source === "") {
      error.source.required = true;
    }
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.expiryDate === "") {
      error.expiryDate.required = true;
    }
    if (data.passportNo === "") {
      error.passportNo.required = true;
    }
    if (data.qualification === "") {
      error.qualification.required = true;
    }
    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.cgpa === "") {
      error.cgpa.required = true;
    }
    if (data.yearPassed === "") {
      error.yearPassed.required = true;
    }
    if (data.desiredCountry === "") {
      error.desiredCountry.required = true;
    }
    if (data.desiredCourse === "") {
      error.desiredCourse.required = true;
    }
    if (data.doYouNeedSupportForLoan === "") {
      error.doYouNeedSupportForLoan.required = true;
    }
    if (data.assignedTo === "") {
      error.assignedTo.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    return error;
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCopyToWhatsApp(isChecked);
    if (isChecked) {
      setStudent((prevClient) => ({
        ...prevClient,
        whatsAppNumber: `${prevClient.mobileNumber}`,
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
  const handleInputs = (event) => {
    setStudent({ ...student, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...student,
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
    const newError = handleValidation(student);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      saveGeneralEnquiry(student)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_general_enquiry");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please Fill  Mandatory Fields");
    }
  };

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ backgroundColor: "#fff", fontSize: "14px" }}
      >
        <div className="content-header">
          <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
            <div
              className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
              style={{ background: "#fe5722", color: "#fff" }}
            >
              <h5 className="text-center text-capitalize p-1">
                {" "}
                Add General Enquiry
              </h5>
            </div>
            <div className="card-body mt-5">
              <form className="p-1" onSubmit={handleSubmit}>
                <div className="row mb-3">
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
                      className={`form-select form-select-lg rounded-1 text-capitalize ${
                        errors.source.required ? "is-invalid" : ""
                      } `}
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
                          className="form-select form-select-lg rounded-1 text-capitalize "
                          name="studentName"
                        >
                          <option value="">Select Student</option>
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
                          className="form-select form-select-lg rounded-1 text-capitalize "
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
                          className="form-control rounded-1 text-capitalize"
                          id="inputbusinessname"
                          type="text"
                          onChange={handleInputs}
                          value={student.businessName}
                          name="businessName"
                          placeholder="Example John Doe"
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
                              value={student?.dial3}
                            >
                              <option value="+91">+91-India-in</option>
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
                                errors.agentPrimaryNumber.required
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Example 123-456-7890"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="
agentPrimaryNumber"
                              value={student.agentPrimaryNumber}
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
                            value={student?.dial4}
                            onChange={handleInputs}
                          >
                            <option value="+91">+91-India-in</option>
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
                            className={`form-control  ${
                              errors.agentWhatsAppNumber.required
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Example 123-456-7890"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="agentWhatsAppNumber"
                            value={student.agentWhatsAppNumber}
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
                          className="form-control rounded-1 text-lowercase"
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
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputstudentname">
                     Student Name
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control rounded-1 text-capitalize ${
                        errors.name.required ? "is-invalid" : ""
                      }`}
                      name="name"
                      onChange={handleInputs}
                      id="inputstudentname"
                      type="text"
                      placeholder="Example Jane Doe"
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
                    ) : errors.name.valid ? (
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
                      className={`form-control rounded-1 text-uppercase ${
                        errors.passportNo.required ? "is-invalid" : ""
                      }`}
                      id="inputpassportno"
                      onChange={handleInputs}
                      name="passportNo"
                      type="text"
                      placeholder="Example  M12345678"
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
                    {errors.passportNo.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : errors.passportNo.valid ? (
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
                      className={`form-control rounded-1 text-uppercase ${
                        errors.expiryDate.required ? "is-invalid" : ""
                      }`}
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
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputEmail">
                      Email ID<span className="text-danger">*</span>
                    </label>
                    <input
                      className={`form-control rounded-1 text-lowercase ${
                        errors.email.required ? "is-invalid" : ""
                      }`}
                      name="email"
                      onChange={handleInputs}
                      id="inputEmail"
                      type="text"
                      placeholder="Example johndoe123@gmail.com"
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
                        <select
                          className="form-select form-select-sm"
                          name="dial1"
                          style={{
                            maxWidth: "75px",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          onChange={handleInputs}
                          value={student?.dial1}
                        >
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
                            errors.mobileNumber.required ? "is-invalid" : ""
                          }`}
                          placeholder="Example 123-456-7890"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="mobileNumber"
                          value={student.mobileNumber}
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
                    {errors.mobileNumber.required && (
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
                        value={student?.dial2}
                        onChange={handleInputs}
                      >
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
                        className={`form-control  ${
                          errors.whatsAppNumber.required ? "is-invalid" : ""
                        }`}
                        placeholder="Example 123-456-7890"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        name="whatsAppNumber"
                        value={student.whatsAppNumber}
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
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputAddress">
                      CGPA{" "}
                    </label>
                    <input
                      className={`form-control rounded-1 ${
                        errors.cgpa.required ? "is-invalid" : ""
                      }`}
                      onChange={handleInputs}
                      name="cgpa"
                      id="inputAddress"
                      type="text"
                      placeholder="Example 98"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                      onKeyDown={(e) => {
                        if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                
                    />
                    {errors.cgpa.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputAddress">
                      {" "}
                      Year passed
                    </label>
                    <input
                      className={`form-control rounded-1 ${
                        errors.yearPassed.required ? "is-invalid" : ""
                      }`}
                      id="inputAddress"
                      onChange={handleInputs}
                      name="yearPassed"
                      type="text"
                      placeholder="Example 2024"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                      onKeyDown={(e) => {
                        if (!/^[0-9]$/i.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                
                    />
                    {errors.yearPassed.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputEmail4">
                      Desired Country
                    </label>
                    <input
                      className={`form-control rounded-1 text-capitalize ${
                        errors.desiredCountry.required ? "is-invalid" : ""
                      }`}
                      id="inputEmail4"
                      onChange={handleInputs}
                      name="desiredCountry"
                      type="text"
                      placeholder="Example United Kingdom"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                      onKeyDown={(e) => {
                        // Prevent non-letter characters
                        if (/[^a-zA-Z\s]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.desiredCountry.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputPassword4">
                      Desired Course
                    </label>
                    <input
                      className={`form-control rounded-1 text-capitalize ${
                        errors.desiredCourse.required ? "is-invalid" : ""
                      }`}
                      id="inputPassword4"
                      onChange={handleInputs}
                      type="text"
                      name="desiredCourse"
                      placeholder="Example Game Designing"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                      onKeyDown={(e) => {
                        // Prevent non-letter characters
                        if (/[^a-zA-Z\s]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.desiredCourse.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputAddress">
                      Do you need support for loan?{" "}
                    </label>
                    <select
                      className={`form-select form-select-lg  rounded-1 ${
                        errors.doYouNeedSupportForLoan.required
                          ? "is-invalid"
                          : ""
                      }`}
                      name="doYouNeedSupportForLoan"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                      onChange={handleInputs}
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
                </div>
                <div className="row mb-3">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputPassword4">
                      Qualification
                    </label>
                    <input
                      className={`form-control rounded-1 ${
                        errors.qualification.required ? "is-invalid" : ""
                      }`}
                      id="inputPassword4"
                      onChange={handleInputs}
                      type="text"
                      name="qualification"
                      placeholder="Desired Course"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                    />
                    {errors.qualification.required ? (
                      <div className="text-danger form-text">
                        This field is required.
                      </div>
                    ) : null}
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputEmail4">
                      {" "}
                      Assigned To
                    </label>
                    <input
                      className={`form-control rounded-1 ${
                        errors.assignedTo.required ? "is-invalid" : ""
                      }`}
                      id="inputEmail4"
                      onChange={handleInputs}
                      type="text"
                      name="assignedTo"
                      placeholder=" assignedTo Staff"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                    />
                    {errors.assignedTo.required ? (
                      <span className="text-danger form-text profile_error">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="d-flex flex-row align-item-center justify-content-end gap-4">
                    <Link
                      style={{
                        backgroundColor: "#231F20",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                      to="/list_general_enquiry"
                      className="btn btn-cancel border text-white m-2"
                    >
                      Cancel
                    </Link>

                    <button
                      style={{
                        backgroundColor: "#FE5722",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                      type="submit"
                      className="btn btn-save border text-white  m-2"
                    >
                      Submit
                    </button>
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
export default AddGeneralEnquiry;
