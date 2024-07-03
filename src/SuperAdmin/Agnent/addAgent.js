import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { isValidPhone, isValidEmail ,isValidPassword} from "../../Utils/Validation";
import {  SuperAgent } from "../../api/agent";

import Select from 'react-select';
import { getFilterCountry } from '../../api/globalsettings';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";

function AddAgent() {


    const initialState = {
      source:"",
        businessName: "",
        agentName: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        email: "",
        mobileNumber: "",
        whatsAppNumber: "",
        password:"",
        confirmPassword:"",
        panNumberIndividual: "",
        panNumberCompany: "", // If applicable
        gstn: "", // Optional
        inc: "", // If applicable
        staffName: "",
        staffContactNo: "", // agentPayout: string[]; // List of payouts
        agentsCommission: 0, // Will be calculated based on the University Commission & Agent Payout
        agentBusinessLogo: "", // Optional
        countryInterested:"",
        accountName: "",
        accountNumber: "",
        bankName: "",
        ifsc: "",
        branch: "",
      };
    
      const initialStateErrors = {
        source:{required:false},
        businessName: { required: false },
        agentName: { required: false },
        addressLine1: { required: false },
        addressLine2: { required: false },
        addressLine3: { required: false },
        email: { required: false, valid: false },
        mobileNumber: { required: false, valid: false },
        whatsAppNumber: { required: false, valid: false },
        panNumberIndividual: { required: false },
        panNumberCompany: { required: false }, // If applicable
        gstn: { required: false }, // Optional
        inc: { required: false }, // If applicable
        staffName: { required: false },
        staffContactNo: { required: false, valid: false }, // agentPayout: string[]; // List of payouts
        agentsCommission: { required: false }, // Will be calculated based on the University Commission & Agent Payout
        agentBusinessLogo: { required: false }, // Optional
        countryInterested: { required: false },
        accountName: { required: false },
        accountNumber: { required: false },
        bankName: { required: false },
        ifsc: { required: false },
        branch: { required: false },
        password: { required: false, valid: false },
        confirmPassword: { required: false, valid: false }
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
        } else { setAgent({ ...agent, [event.target.name]: event.target.value }) };
    
        if (submitted) {
          const newError = handleValidation({ ...agent, [event.target.name]: event.target.value, });
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
        if (data.branch === "") {
          error.branch.required = true;
        }
        if (data.panNumberIndividual === "") {
          error.panNumberIndividual.required = true;
        }
        if (data.panNumberCompany === "") {
          error.panNumberCompany.required = true;
        }
        if (data.gstn === "") {
          error.gstn.required = true;
        }
        if (data.inc === "") {
          error.inc.required = true;
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
        if (!isValidPhone(data.whatsAppNumber)) {
          error.whatsAppNumber.valid = true;
        }
        if (!isValidPhone(data.mobileNumber)) {
          error.mobileNumber.valid = true;
        }
        if (!isValidEmail(data.email)) {
          error.email.valid = true;
        }
        if (!isValidPassword(data.password)) {
          error.password.valid = true;
      }
      if (!isValidPassword(data.confirmPassword)) {
          error.confirmPassword.valid = true;
      }
        return error;
      };
    
    
    
      const handleSelectChange = (selectedOptions, action) => {
        const { name } = action;
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setAgent({ ...agent, [name]: values });
      };
     
      const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(agent);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
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
        .filter(country => Array.isArray(country.country)) // Ensure country.country is an array
        .flatMap(country => country.country.map(countryName => ({ value: countryName, label: countryName })));
    
      {
        countryList.map((country, index) => (
          <option key={index} value={country.value}>{country.label}</option>
        ))
      }
    return (
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    </nav>
                    <nav className="navbar navbar-top navbar-expand">
                    <Header />
                    </nav>
                   
                
        
            <div className="content-wrapper ">
                <div className="content-header mt-3">
                    <div className="content container-fluid w-75">
                    <form onSubmit={handleSubmit}>
                            <div className="content-page-header">
                                <h5 className="text-bold" style={{ color: "#231F20" }}>
                                    Add Agent
                                </h5>
                            </div>
                          
                            <div className="row mb-3">
                            <div className="col ">
                                <label htmlFor="company" className="form-label">Source</label>
                                <input name="source"  type="text" onChange={handleInputs} className="form-control" id="company" />
                                {errors.source.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col ">
                                <label htmlFor="company" className="form-label">Name</label>
                                <input name="agentName"  type="text" onChange={handleInputs} className="form-control" id="company" />
                                {errors.agentName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Job" className="form-label">Business Name</label>
                                <input name="businessName" type="text" className="form-control" onChange={handleInputs} id="Job" />
                                {errors.businessName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                             
                            </div>
                            <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="Address" className="form-label">Email ID</label>
                                <input name="email" type="text" className="form-control" onChange={handleInputs} id="Address" value={agent?.email} />
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
                              <div className="col ">
                                <label htmlFor="company" className="form-label">Password</label>
                                <input name="password"  type="text" onChange={handleInputs} className="form-control" id="company" />
                                {errors.password.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Job" className="form-label">confirmPassword</label>
                                <input name="confirmPassword" type="text" className="form-control" onChange={handleInputs} id="Job" />
                                {errors.confirmPassword.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                             
                            <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="Country" className="form-label">Address Line1</label>
                                <input name="addressLine1" type="text" onChange={handleInputs} className="form-control" id="Country" value={agent?.addressLine1} />
                                {errors.addressLine1.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                          
                              <div className="col">
                                <label htmlFor="Country" className="form-label">Address Line2</label>
                                <input name="addressLine2" type="text" onChange={handleInputs} className="form-control" id="Country" value={agent?.addressLine2} />
                                {errors.addressLine2.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Country" className="form-label">Address Line3</label>
                                <input name="addressLine3" type="text" onChange={handleInputs} className="form-control" id="Country" value={agent?.addressLine3} />
                                {errors.addressLine3.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                            </div> 
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="Phone" className="form-label">PAN Number of Individual</label>
                                <input name="panNumberIndividual" type="text" onChange={handleInputs} className="form-control" id="Phone" value={agent?.panNumberIndividual} />
                                {errors.panNumberIndividual.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}


                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">Primary Number</label>
                                <input name="mobileNumber" type="text" className="form-control" onChange={handleInputs} id="Email" value={agent?.mobileNumber} />
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
                              <div className="col">
                                <label htmlFor="Email" className="form-label">Whats App Number</label>
                                <input name="whatsAppNumber" type="text" onChange={handleInputs} className="form-control" id="Email" value={agent?.whatsAppNumber} />
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
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="Email" className="form-label">PAN of Company </label>
                                <input name="panNumberCompany" type="text" onChange={handleInputs} className="form-control" id="Email" value={agent?.panNumberCompany} />
                                {errors.panNumberCompany.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">GSTN </label>
                                <input name="gstn" type="text" className="form-control" onChange={handleInputs} id="Email" value={agent?.gstn} />
                                {errors.gstn.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}


                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">INC </label>
                                <input name="inc" type="text" className="form-control" onChange={handleInputs} id="Email" value={agent?.inc} />
                                {errors.inc.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}


                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="Email" className="form-label">staffName </label>
                                <input name="staffName" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.staffName} />
                                {errors.staffName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">Staff ContactNo</label>
                                <input name="staffContactNo" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.staffContactNo} />
                                {errors.staffName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">agentsCommission</label>
                                <input name="agentsCommission" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.agentsCommission} />
                                {errors.agentsCommission.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                            </div>
                            <div className="row mb-3">


                              <div className="col">
                                <label htmlFor="universityLogo" className="form-label" >agentBusinessLogo</label>

                                <input
                                  type="file"
                                  id="universityLogo"
                                  name="agentBusinessLogo"
                                  accept="image/*"
                                  className="form-control border-0 text-dark bg-transparent"
                                  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  onChange={handleInputs}
                                 

                                />
                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">Country Interested</label>

                                <Select
                                  isMulti
                                  options={countryList}
                                  value={agent?.countryInterested ? agent?.countryInterested.map(countryName => ({ value: countryName, label: countryName })) : null}
                                  name="countryInterested"
                                  onChange={handleSelectChange}
                                  styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                                >

                                </Select>

                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label"> Account Number</label>
                                <input name="accountNumber" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.accountNumber} />
                                {errors.accountNumber.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="Email" className="form-label"> BankName</label>
                                <input name="bankName" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.bankName} />
                                {errors.bankName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">Account Name</label>
                                <input name="accountName" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.accountName} />
                                {errors.accountName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col">
                                <label htmlFor="Email" className="form-label">IFSC</label>
                                <input name="ifsc" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.ifsc} />
                                {errors.ifsc.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                            </div>
                            <div className="col">
                              <label htmlFor="Email" className="form-label">branch</label>
                              <input name="branch" type="text" className="form-control" id="Email" onChange={handleInputs} value={agent?.branch} />
                              {errors.branch.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}

                            </div>
                            <div className="text-center mt-3">
                              <button type="submit" className="btn " style={{ backgroundColor: '#fe5722', color: '#fff' }}>Save Changes</button>
                            </div>
                            </form>
                       
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default AddAgent;
