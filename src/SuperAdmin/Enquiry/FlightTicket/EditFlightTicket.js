import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  updateFlightEnquiry,
  getSingleFlightEnquiry,
} from "../../../api/Enquiry/flight";
import Mastersidebar from "../../../compoents/sidebar";
export const AddForex = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const initialState = {
    source: "",
    studentName: "",
    passportNo: "",
    dob: "",
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
  };
  const initialStateErrors = {
    source: { required: false },
    studentName: { required: false },
    passportNo: { required: false },
    dob: { required: false },
    from: { required: false },
    to: { required: false },

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

  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFlightDetails();
  }, []);

  const getFlightDetails = () => {
    getSingleFlightEnquiry(id)
      .then((res) => {
        console.log("res", res);
        setFlight(res?.data?.result);
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
    if (!data.studentName) {
      error.studentName.required = true;
    }
    if (!data.passportNo) {
      error.passportNo.required = true;
    }
    if (!data.dob) {
      error.dob.required = true;
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
    setFlight({ ...flight, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...flight,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(flight);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      updateFlightEnquiry(flight)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListFlightTicket");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontSize: "14px", fontFamily: "Plus Jakarta Sans" }}
      >
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
                    Edit Flight Enquiry
                  </h6>
                </div>
                <div className="card-body mt-5">
                  <div className="row g-3">
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputsource">
                        Source<span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        value={flight.source}
                        onChange={handleInputs}
                        name="source"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "14px",
                        }}
                      >
                        <option value="">Select In Source</option>
                        <option value="Agent">Agent</option>
                        <option value="Student">Student</option>
                      </select>
                      {errors.source.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputstudentname">
                        Name of the Student
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        value={flight.studentName}
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
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">
                        Passport No<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        id="inputpassportno"
                        value={flight.passportNo}
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
                        value={flight.dob}
                        onChange={handleInputs}
                        name="dob"
                        type="date"
                        placeholder="Enter Vaid Passport Date"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                      {errors.dob.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputuniversity">
                        {" "}
                        From<span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        id="inputstudentid"
                        value={flight.from}
                        name="from"
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
                        value={flight.to}
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
                        value={flight.dateOfTravel}
                        name="dateOfTravel"
                        onChange={handleInputs}
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
                      <label className="form-label" for="inputPrimaryNo">
                        Primary Number<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="primaryNumber"
                        value={flight.primaryNumber}
                        onChange={handleInputs}
                        id="inputPrimaryNo"
                        type="text"
                        placeholder="Enter Primary Number"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
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
                        className="form-control"
                        name="whatsAppNumber"
                        value={flight.whatsAppNumber}
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
                      <label className="form-label" for="inputEmail">
                        Email ID<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="email"
                        value={flight.email}
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
                    {flight.source === "Agent" ? (
                      <div className="row gx-4 gy-2">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputAgentName">
                            Agent Name
                          </label>
                          <input
                            className="form-control"
                            id="inputAgentName"
                            value={flight.agentName}
                            onChange={handleInputs}
                            type="text"
                            name="agentName"
                            placeholder="Enter Agent Name"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                          {errors.agentName.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputbusinessname">
                            Business Name
                          </label>
                          <input
                            className="form-control"
                            id="inputbusinessname"
                            value={flight.businessName}
                            type="text"
                            onChange={handleInputs}
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
                            value={flight.agentPrimaryNumber}
                            onChange={handleInputs}
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
                            value={flight.agentWhatsAppNumber}
                            onChange={handleInputs}
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
                            value={flight.agentEmail}
                            onChange={handleInputs}
                            id="inputEmail"
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
                    <div className="row g-2">
                      <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <Link
                          to="/ListFlightTicket"
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
                          Update
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
