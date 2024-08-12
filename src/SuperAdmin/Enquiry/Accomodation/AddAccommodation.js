import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { getallUniversity } from "../../../api/university";
import { getFilterCountry } from "../../../api/globalsettings";
import Select from "react-select";
import Flags from "react-world-flags";
import { saveAccommodationEnquiry } from "../../../api/Enquiry/accommodation";
import Mastersidebar from "../../../compoents/sidebar";
export const AddAccommodation = () => {
  const initialState = {
    source: "",
    studentName: "",
    locationWhereAccommodationIsRequired: "",

    universityName: "",
    passportNumber: "",
    primaryNumber: "",
    whatsAppNumber: "",
    email: "",
    agentName: "",

    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
    holdingOfferFromTheUniversity: "",

    assignedTo: "",
  };
  const initialStateErrors = {
    source: { required: false },
    studentName: { required: false },
    locationWhereAccommodationIsRequired: { required: false },
    universityName: { required: false },
    passportNumber: { required: false },
    primaryNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },
    email: { required: false, valid: false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false },
    agentWhatsAppNumber: { required: false },
    agentEmail: { required: false },
    holdingOfferFromTheUniversity: { required: false },

    assignedTo: { required: false },
  };
  const [forex, setForex] = useState(initialState);

  const [countries, setCountries] = useState([]);
  const [pagination, setPagination] = useState({
    from: 0,
    to: 10,
    count: 0,
  });
  const [university, setUniversity] = useState();
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUniversityList();
  }, []);

  useEffect(() => {
    getAllCountryDetails();
  }, [pagination.from, pagination.to]);

  const getAllCountryDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterCountry(data)
      .then((res) => {
        console.log(res);
        setCountries(res?.data?.result?.countryList);
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

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (!data.source) {
      error.source.required = true;
    }
    if (!data.studentName) {
      error.studentName.required = true;
    }
    if (!data.locationWhereAccommodationIsRequired) {
      error.locationWhereAccommodationIsRequired.required = true;
    }

    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!data.passportNumber) {
      error.passportNo.required = true;
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

    if (!data.holdingOfferFromTheUniversity) {
      error.holdingOfferFromTheUniversity.required = true;
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

    return error;
  };

  const handleInputs = (event) => {
    setForex({ ...forex, [event?.target?.name]: event?.target?.value });

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
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveAccommodationEnquiry(forex)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListAccommodation");
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
                          <label className="form-label" for="inputsource">
                            Source<span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg rounded-2 "
                            onChange={handleInputs}
                            name="source"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
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
                        {forex.source === "Agent" ? (
                          <>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label
                                className="form-label"
                                for="inputAgentName"
                              >
                                Agent Name
                              </label>
                              <input
                                className="form-control rounded-2"
                                id="inputAgentName"
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
                              <label
                                className="form-label"
                                for="inputbusinessname"
                              >
                                Business Name
                              </label>
                              <input
                                className="form-control rounded-2"
                                id="inputbusinessname"
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
                              <label className="form-label" for="inputEmail">
                                Agent Email ID
                              </label>
                              <input
                                className="form-control rounded-2"
                                name="agentEmail"
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
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label
                                className="form-label"
                                for="inputPrimaryNo"
                              >
                                Agent Primary Number
                              </label>
                              <input
                                className="form-control rounded-2"
                                name="agentPrimaryNumber"
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
                                Agent WhatsApp Number
                              </label>
                              <input
                                className="form-control rounded-2"
                                name="agentWhatsAppNumber"
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
                          </>
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
                            name="passportNumber"
                            type="text"
                            placeholder="Enter Passport No"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
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
                            className="form-control rounded-2"
                            id="inputpassportno"
                            name="expirydate"
                            type="date"
                            placeholder="Enter Expiry Date"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
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
                          <label className="form-label" for="inputPrimaryNo">
                            Primary Number<span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control rounded-2"
                            name="primaryNumber"
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
                          <label
                            className="form-label"
                            for="inputWhatsAppNumber"
                          >
                            WhatsApp Number
                            <span className="text-danger">*</span>
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
                            University Name
                            <span className="text-danger">*</span>{" "}
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
                          ) : null}
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            Course<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputstudentid"
                            name="course"
                            type="text"
                            placeholder="Enter Course"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            Accommodation Type
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputstudentid"
                            name="AccommodationType"
                            type="text"
                            placeholder="Enter Accommodation Type"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            Country<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputstudentid"
                            name="Country"
                            type="text"
                            placeholder="EnterCountry"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            State<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputstudentid"
                            name="State"
                            type="text"
                            placeholder="Enter State"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">
                            City<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputstudentid"
                            name="City"
                            type="text"
                            placeholder="Enter City"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputassignedto">
                            Assigned To <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select form-select-lg rounded-2"
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
                          <label className="form-label" for="inputuniversity">
                            Finalised By<span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            className="form-control rounded-2"
                            id="inputstudentid"
                            name="  Finalised By"
                            type="text"
                            placeholder="Enter   Finalised By"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Location<span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select  form-select-lg rounded-2"
                            name="locationWhereAccommodationIsRequired"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            onChange={handleInputs}
                          >
                            <option value="" disabled hidden>
                              Select Country
                            </option>
                            {countries.map(
                              (country, index) =>
                                Array.isArray(country.country) &&
                                country.country.map(
                                  (countryName, countryIndex) => (
                                    <option
                                      key={`${index}-${countryIndex}`}
                                      value={countryName}
                                    >
                                      {countryName}
                                    </option>
                                  )
                                )
                            )}
                          </select>
                          {errors.locationWhereAccommodationIsRequired
                            .required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputpayment">
                            Holding Offer From The University
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <select
                            className="form-select form-select-lg rounded-2 "
                            onChange={handleInputs}
                            name="holdingOfferFromTheUniversity"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            id="inputpayment"
                          >
                            <option>Select Type</option>
                            <option value="No"> Yes</option>

                            <option value="No">No</option>
                          </select>
                          {errors.holdingOfferFromTheUniversity.required ? (
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
