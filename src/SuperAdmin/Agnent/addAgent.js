import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  isValidPhone,
  isValidWebsite,
  isValidEmail,
  isValidName,
  isValidGSTN,
  isValidPAN,
  isValidBankAccountNumber,
  isValidNumberLessThanOrEqualTo35
} from "../../Utils/Validation";
import { SuperAgent } from "../../api/agent";

import Select from "react-select";
import { getFilterCountry } from "../../api/globalsettings";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";

function AddAgent() {
  const initialState = {
    
    businessName: "",
    agentName: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    email: "",
    mobileNumber: "",
    whatsAppNumber: "",
    panNumberCompany: "", // If applicable
    gstn: "", // Optional
    staffName: "",
    staffContactNo: "", // agentPayout: string[]; // List of payouts
    agentsCommission: 0, // Will be calculated based on the University Commission & Agent Payout
    countryInterested: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifsc: "",
    businessWebsite:"",
    registrationNo:"",
    whatsApp:"",
    accountType:"",
    swift:"",
    requireVisaFilingSupport:"",
    visaCommission:"",
  };

  const initialStateErrors = {
    businessName: { required: false },
    agentName: { required: false },
    addressLine1: { required: false },
    addressLine2: { required: false },
    addressLine3: { required: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    whatsAppNumber: { required: false, valid: false },

    panNumberCompany: { required: false }, // If applicable
    gstn: { required: false }, // Optional
    // If applicable
    staffName: { required: false },
    staffContactNo: { required: false, valid: false }, // agentPayout: string[]; // List of payouts
    agentsCommission: { required: false }, // Will be calculated based on the University Commission & Agent Payout
    // Optional
    countryInterested: { required: false },
    accountName: { required: false },
    accountNumber: { required: false },
    bankName: { required: false },
    ifsc: { required: false },
    businessWebsite:{required:false},
    registrationNo:{required:false},
    whatsApp:{required:false},
    accountType:{required:false},
    swift:{required:false},
    requireVisaFilingSupport:{required:false},
    visaCommission:{required:false},
  };

  const [agent, setAgent] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAllCountryDetails();
  }, []);

  const getAllCountryDetails = () => {
    getFilterCountry()
      .then((res) => {
        console.log(res);
        setCountries(res?.data?.result?.countryList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setAgent({ ...agent, [event.target.name]: event.target.value });
    }

    if (submitted) {
      const newError = handleValidation({
        ...agent,
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
      setAgent((agent) => ({
        ...agent,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.agentName === "") {
      error.agentName.required = true;
    }
    if (data.businessName === "") {
      error.businessName.required = true;
    }
    if (data.addressLine1 === "") {
      error.addressLine1.required = true;
    }
    if (data.addressLine2 === "") {
      error.addressLine2.required = true;
    }
    if (data.addressLine3 === "") {
      error.addressLine3.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }
    if (data.accountName === "") {
      error.accountName.required = true;
    }
    if (data.accountNumber === "") {
      error.accountNumber.required = true;
    }
    if (data.bankName === "") {
      error.bankName.required = true;
    }
    if (data.academicYear === "") {
      error.academicYear.required = true;
    }
    if (data.ifsc === "") {
      error.ifsc.required = true;
    }

    if (data.panNumberCompany === "") {
      error.panNumberCompany.required = true;
    }
    if (data.gstn === "") {
      error.gstn.required = true;
    }

    if (data.staffName === "") {
      error.staffName.required = true;
    }
    if (data.staffContactNo === "") {
      error.staffContactNo.required = true;
    }
    if (data.countryInterested === 0) {
      error.countryInterested.required = true;
    }
    if(data.businessWebsite===0){
      error.businessWebsite.required = true;
    }
    if(data.registrationNo===0){
      error.registrationNo.required = true;
    }
    if(data.whatsApp===0){
      error.whatsApp.required = true;
    }
    if(data.accountType===0){
      error.accountType.required = true;
    }
    if(data.swift===0){
      error.swift.required = true;
    }
    if(data.agentsCommission===0){
      error.agentsCommission.required = true;
    }
    if (!isValidNumberLessThanOrEqualTo35(data.agentsCommission)) {
      error.agentsCommission.valid = true;
    }
    if (!isValidPAN(data.panNumberCompany)) {
      error.panNumberCompany.valid = true;
    }
    if (!isValidBankAccountNumber(data.accountNumber)) {
      error.accountNumber.valid = true;
    }
    if (!isValidGSTN(data.gstn)) {
      error.gstn.valid = true;
    }
    if (!isValidWebsite(data.businessWebsite)) {
      error.businessWebsite.valid = true;
    }
    if (!isValidName(data.staffName)) {
      error.staffName.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidName(data.businessName)) {
      error.businessName.valid = true;
    }
    if (!isValidName(data.agentName)) {
      error.agentName.valid = true;
    }
    if (!isValidPhone(data.staffContactNo)) {
      error.staffContactNo.valid = true;
    }
    if (!isValidPhone(data.whatsApp)) {
      error.whatsApp.valid = true;
    }
    return error;
  };

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setAgent({ ...agent, [name]: values });
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
    const newError = handleValidation(agent);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      SuperAgent(agent)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListAgent");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };
  const countryList = countries
    .filter((country) => Array.isArray(country.country)) // Ensure country.country is an array
    .flatMap((country) =>
      country.country.map((countryName) => ({
        value: countryName,
        label: countryName,
      }))
    );

  {
    countryList.map((country, index) => (
      <option key={index} value={country.value}>
        {country.label}
      </option>
    ));
  }
  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
      <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>
      

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
        >
          <div className="content-header">
            <div className="container-fluid ">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h5 className="text-center text-capitalize p-1">
                    {" "}
                    Add Agent Details
                  </h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body mt-2 ">
                    <div className="row g-3 ">
                    <div className="position-relative d-inline-block">
                              <img
                                className="img-fluid rounded-circle img-thumbnail mx-auto d-block"
                                src={
                                  agent?.agentBusinessLogo
                                    ? agent?.agentBusinessLogo
                                    : "https://placehold.co/128x128"
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
                                name="agentBusinessLogo"
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
                        <label htmlFor="company" className="form-label">
                          Name<span className="text-danger">*</span>
                        </label>
                        <input
                          name="agentName"
                          type="text"
                          onChange={handleInputs}
                          placeholder="Example John Doe"
                          className="form-control rounded-2"
                          id="company"
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.agentName.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.agentName.valid ? (
                          <div className="text-danger form-text">
                            Enter valid Letters Only.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Job" className="form-label">
                          Business Name<span className="text-danger">*</span>
                        </label>
                        <input
                          name="businessName"
                          type="text"
                          className="form-control rounded-2"
                          onChange={handleInputs}
                          placeholder="Example Jane Doe"
                          id="Job"
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.businessName.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.businessName.valid ? (
                          <div className="text-danger form-text">
                            Enter valid Letters Only.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Job" className="form-label">
                          Business Website<span className="text-danger">*</span>
                        </label>
                        <input
                          name="businessWebsite"
                          type="text"
                          onChange={handleInputs}
                          className="form-control rounded-2"
                          placeholder="Example www.edufynd.com"
                          id="Job"
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                         {errors.businessWebsite.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.businessWebsite.valid ? (
                          <div className="text-danger form-text">
                            Enter valid businessWebsite.
                          </div>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Address" className="form-label">
                          Email ID<span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          type="text"
                          className="form-control rounded-2"
                          onChange={handleInputs}
                          placeholder="Example john123@gmail.com"
                          id="Address"
                          value={agent?.email}
                          style={{
                            backgroundColor: "#fff",
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
                        <label htmlFor="Email" className="form-label">
                          Primary Number<span className="text-danger">*</span>
                        </label>
                        <input
                          name="mobileNumber"
                          type="number"
                          className="form-control rounded-2"
                          onChange={handleInputs}
                          placeholder="Example 123-456-789"
                          id="Email"
                          value={agent?.mobileNumber}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
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
                        <label htmlFor="Email" className="form-label">
                          WhatsApp Number<span className="text-danger">*</span>
                        </label>
                        <input
                          name="whatsAppNumber"
                          type="number"
                          onChange={handleInputs}
                          placeholder="Example 123-456-789"
                          className="form-control rounded-2"
                          id="Email"
                          value={agent?.whatsAppNumber}
                          style={{
                            backgroundColor: "#fff",
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
                            Enter valid whatsAppNumber.
                          </div>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Country" className="form-label">
                          Address Line1<span className="text-danger">*</span>
                        </label>
                        <input
                          name="addressLine1"
                          type="text"
                          onChange={handleInputs}
                          placeholder="Example 17/3A2, Gandhi St,"
                          className="form-control rounded-2"
                          id="Country"
                          value={agent?.addressLine1}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.addressLine1.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Country" className="form-label">
                          Address Line2<span className="text-danger">*</span>
                        </label>
                        <input
                          name="addressLine2"
                          type="text"
                          onChange={handleInputs}
                          placeholder="Example Alwartirunagar, Chennai"
                          className="form-control rounded-2"
                          id="Country"
                          value={agent?.addressLine2}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.addressLine2.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Country" className="form-label">
                          Pincode<span className="text-danger">*</span>
                        </label>
                        <input
                          name="addressLine3"
                          type="text"
                          onChange={handleInputs}
                          placeholder="Example 632001"
                          className="form-control rounded-2"
                          id="Country"
                          value={agent?.addressLine3}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.addressLine3.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                        <label htmlFor="Email" className="form-label">
                          Registration No{" "}
                        </label>
                        <input
                          name="registrationNo"
                          type="text"
                          placeholder="Example 41151904020"
                          className="form-control rounded-2"
                          id="Email"
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
 {errors.registrationNo.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}

                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          GSTN{" "}<span className="text-danger">*</span>
                        </label>
                        <input
                          name="gstn"
                          type="text"
                          className="form-control rounded-2"
                          onChange={handleInputs}
                          placeholder="Example 29GGGGG1314R9Z6 "
                          id="Email"
                          value={agent?.gstn}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                         {errors.gstn.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.gstn.valid ? (
                          <div className="text-danger form-text">
                            Enter valid Gstn Number.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                        <label htmlFor="Email" className="form-label">
                          PAN of Company{" "}<span className="text-danger">*</span>
                        </label>
                        <input
                          name="panNumberCompany"
                          type="text"
                          onChange={handleInputs}
                          placeholder="Example ABCTY1234D"
                          className="form-control rounded-2"
                          id="Email"
                          value={agent?.panNumberCompany}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                          {errors.panNumberCompany.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.panNumberCompany.valid ? (
                          <div className="text-danger form-text">
                            Enter valid Pan Number.
                          </div>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Staff Name{" "}<span className="text-danger">*</span>
                        </label>
                        <input
                          name="staffName"
                          type="text"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example Alice Smith"
                          value={agent?.staffName}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.staffName.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.staffName.valid ? (
                          <div className="text-danger form-text">
                            Enter  Letter Only.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Staff Contact No<span className="text-danger">*</span>
                        </label>
                        <input
                          name="staffContactNo"
                          type="number"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example 123-456-789"
                          value={agent?.staffContactNo}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.staffContactNo.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.staffContactNo.valid ? (
                          <div className="text-danger form-text">
                            Enter valid Phone Number Only.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Staff WhatsApp Number<span className="text-danger">*</span>
                        </label>
                        <input
                          name="whatsApp"
                          type="number"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example 123-456-789"
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                         {errors.whatsApp.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.whatsApp.valid ? (
                          <div className="text-danger form-text">
                            Enter valid Phone Number Only.
                          </div>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                        <label htmlFor="Email" className="form-label">
                          {" "}
                          Bank Name<span className="text-danger">*</span>
                        </label>
                        <input
                          name="bankName"
                          type="text"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example Axis Bank"
                          value={agent?.bankName}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.bankName.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Account Name<span className="text-danger">*</span>
                        </label>
                        <input
                          name="accountName"
                          type="text"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example  John Smith"
                          value={agent?.accountName}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.accountName.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          {" "}
                          Account Number<span className="text-danger">*</span>
                        </label>
                        <input
                          name="accountNumber"
                          type="text"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example  0112345678"
                          value={agent?.accountNumber}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.accountNumber.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.accountNumber.valid ? (
                          <div className="text-danger form-text">
                           account number is numeric and has a length between 9 to 18 characters
                          </div>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Account Type
                        </label>
                        <input
                          name="accountType"
                          type="text"
                          className="form-control rounded-2"
                          id="text"
                          onChange={handleInputs}
                          placeholder="Example  Personal"
                          value={agent?.branch}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.accountType.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                        IFSC/IBAN<span className="text-danger">*</span>
                        </label>
                        <input
                          name="ifsc"
                          type="text"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example AT611904300234573201"
                          value={agent?.ifsc}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.ifsc.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Swift
                        </label>
                        <input
                          name="swift"
                          type="text"
                          className="form-control rounded-2"
                          id="text"
                          onChange={handleInputs}
                          placeholder="Example AAAA-BB-CC-123"
                          value={agent?.branch}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                        {errors.swift.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                      </div>

                    

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Agents Commission<span className="text-danger">*</span>
                        </label>
                        <input
                          name="agentsCommission"
                          type="text"
                          className="form-control rounded-2"
                          id="Email"
                          onChange={handleInputs}
                          placeholder="Example 50"
                          value={agent?.agentsCommission}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        />
                       {errors.agentsCommission.required ? (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        ) : errors.agentsCommission.valid ? (
                          <div className="text-danger form-text">
                          Enter The agent Commission Is 35 % Less Than only 2 digit Number 
                          </div>
                        ) : null}
                      </div>

                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Country Interested
                        </label>

                        <Select
                          isMulti
                          placeholder="Select Country Interested"
                          options={countryList}
                          value={
                            agent?.countryInterested
                              ? agent?.countryInterested.map((countryName) => ({
                                  value: countryName,
                                  label: countryName,
                                }))
                              : null
                          }
                          name="countryInterested"
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
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label htmlFor="Email" className="form-label">
                          Do Require Visa Filing Support{" "}
                        </label>
                        <select
                          class="form-select form-select-lg rounded-2"
                          aria-label="Default select example"
                          name="requireVisaFilingSupport"
                          onChange={handleInputs}
                          value={agent?.requireVisaFilingSupport}
                          style={{
                            backgroundColor: "#fff",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                        >
                          <option selected>
                            Do Require Visa Filing sSupport{" "}
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <span className="text-center  text-capitalize" ><small>If 'Yes' 10% on commision will be charged'</small>  </span>
                      </div>
                    </div>

                    <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto mt-4">
                      <Link
                        style={{
                          backgroundColor: "#231f20",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        to="#"
                        className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2"
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
                        className="btn btn-save border-0  px-4 py-2 text-uppercase fw-semibold text-white  m-2"
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
      </div>
    </div>
  );
}
export default AddAgent;
