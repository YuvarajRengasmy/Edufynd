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
                   
                
        
            <div className="content-wrapper " style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'> Add Agent Details</h5>
                </div>
                <form onSubmit={handleSubmit}>
                                                  
                <div className="card-body mt-2 ">
                                                    <div className="row g-3 ">
                                                    <div className="position-relative d-inline-block">
  <img 
    className="img-fluid rounded-circle img-thumbnail mx-auto d-block" 
    src="https://placehold.co/128x128" 
    alt="student-image"  
    style={{ width: '8rem', height: '8rem' }} 
  />
  <label 
    htmlFor="fileInputImage" 
    className="position-absolute fs-6 rounded-circle "
    style={{ cursor: 'pointer',bottom:'5%',left:'53.5%', transform: 'translate(25%, 25%)',color:'#0f2239' }}
  >
    <i className="fas fa-camera"></i>
  </label>
  <input
    name="universityLogo"
    id="fileInputImage"
    type="file"
    accept="image/*"
    className="form-control rounded-2 border-0 text-dark bg-transparent"
    style={{ display: "none", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  />
</div>
                         
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="company" className="form-label">Name</label>
                                <input name="agentName"  type="text" onChange={handleInputs} placeholder="Enter Name" className="form-control rounded-2" id="company" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.agentName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Job" className="form-label">Business Name</label>
                                <input name="businessName" type="text" className="form-control rounded-2" onChange={handleInputs} placeholder="Enter Business Name" id="Job"  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.businessName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Job" className="form-label">Business Website</label>
                                <input name="businessName" type="text" className="form-control rounded-2"  placeholder="Enter Business Website" id="Job"  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                               

                              </div>
                             
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Address" className="form-label">Email ID</label>
                                <input name="email" type="text" className="form-control rounded-2" onChange={handleInputs} placeholder="Enter Email ID" id="Address" value={agent?.email} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
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
                                <label htmlFor="Email" className="form-label">Primary Number</label>
                                <input name="mobileNumber" type="text" className="form-control rounded-2" onChange={handleInputs} placeholder="Enter Primary Number" id="Email" value={agent?.mobileNumber} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
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
                                <label htmlFor="Email" className="form-label">Whats App Number</label>
                                <input name="whatsAppNumber" type="text" onChange={handleInputs} placeholder="Enter WhatsApp Number" className="form-control rounded-2" id="Email" value={agent?.whatsAppNumber} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
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
                                <label htmlFor="Country" className="form-label">Address Line1</label>
                                <input name="addressLine1" type="text" onChange={handleInputs} placeholder="Enter Address Line1" className="form-control rounded-2" id="Country" value={agent?.addressLine1} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.addressLine1.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                          
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Country" className="form-label">Address Line2</label> 
                                <input name="addressLine2" type="text" onChange={handleInputs} placeholder="Enter Address Line2" className="form-control rounded-2" id="Country" value={agent?.addressLine2}  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.addressLine2.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Country" className="form-label">Address Line3</label>
                                <input name="addressLine3" type="text" onChange={handleInputs} placeholder="Enter Address Line3" className="form-control rounded-2" id="Country" value={agent?.addressLine3} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.addressLine3.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="Email" className="form-label">Registration No </label>
                                <input name="registrationno" type="text"  placeholder="Enter Registration No" className="form-control rounded-2" id="Email"  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                              

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">GSTN </label>
                                <input name="gstn" type="text" className="form-control rounded-2" onChange={handleInputs} placeholder="Enter GSTN " id="Email" value={agent?.gstn} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.gstn.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}


                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Phone" className="form-label">PAN (Individual/Company)</label>
                                <input name="panNumberIndividual" type="text" onChange={handleInputs} placeholder="Enter PAN (Individual/Company)" className="form-control rounded-2" id="Phone" value={agent?.panNumberIndividual} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.panNumberIndividual.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}


                              </div>
                           
                            
                           
                             
                             
                            
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">Staff Name </label>
                                <input name="staffName" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Staff Name" value={agent?.staffName} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.staffName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">Staff Contact No</label>
                                <input name="staffContactNo" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Staff Contact No" value={agent?.staffContactNo} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.staffName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">Staff WhatsApp Number</label>
                                <input name="staffwhatsappnumber" type="text" className="form-control rounded-2" id="Email"  placeholder="Enter  WhatsApp Number" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                              

                              </div>
                             
                           
                        
                           
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">Account Name</label>
                                <input name="accountName" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Account Name" value={agent?.accountName} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.accountName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label"> Account Number</label>
                                <input name="accountNumber" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Account Number" value={agent?.accountNumber} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.accountNumber.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                        
                             
                        
                             
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label htmlFor="Email" className="form-label">Account Type</label>
                              <input name="AccountType" type="text" className="form-control rounded-2" id="text" o placeholder="Enter Account Type" value={agent?.branch} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                            

                            </div>

                        
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">IFSC</label>
                                <input name="ifsc" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter IFSC" value={agent?.ifsc}  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.ifsc.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label htmlFor="Email" className="form-label">Swift</label>
                              <input name="swift" type="text" className="form-control rounded-2" id="text" o placeholder="Enter Swift" value={agent?.branch} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                            

                            </div>

                          

                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="Email" className="form-label"> Bank Name</label>
                                <input name="bankName" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Bank Name" value={agent?.bankName}  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.bankName.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                             
                           
                           
                          
                           
                            
                           
                          
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">Agents Commission</label>
                                <input name="agentsCommission" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Agents Commission" value={agent?.agentsCommission} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.agentsCommission.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                           
                           
                         


                            
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                <label htmlFor="Email" className="form-label">Country Interested</label>

                                <Select
                                  isMulti
                                  placeholder='Select Country Interested'
                                  options={countryList}
                                  value={agent?.countryInterested ? agent?.countryInterested.map(countryName => ({ value: countryName, label: countryName })) : null}
                                  name="countryInterested"
                                  onChange={handleSelectChange}
                                  styles={{ container: base => ({ ...base, fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }) }}
                                >

                                </Select>

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label htmlFor="Email" className="form-label">Do require visa filing support </label>
                              <select class="form-select form-select-lg rounded-2" aria-label="Default select example" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
  <option selected>Do require visa filing support </option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>

</select>
                            

                            </div>



                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="company" className="form-label">Source</label>
                                <input name="source"  type="text" onChange={handleInputs} placeholder="Enter Source" className="form-control rounded-2" id="company"    style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.source.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="Email" className="form-label">PAN of Company </label>
                                <input name="panNumberCompany" type="text" onChange={handleInputs} placeholder="Enter PAN of Company" className="form-control rounded-2" id="Email" value={agent?.panNumberCompany} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.panNumberCompany.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                              <label htmlFor="Email" className="form-label">Branch</label>
                              <input name="branch" type="text" className="form-control rounded-2" id="Email" onChange={handleInputs} placeholder="Enter Branch" value={agent?.branch} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                              {errors.branch.required ? (
                                <span className="form-text text-danger">
                                  This field is required.
                                </span>
                              ) : null}

                            </div>
                        
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="Email" className="form-label">INC </label>
                                <input name="inc" type="text" className="form-control rounded-2" onChange={handleInputs} placeholder="Enter INC" id="Email" value={agent?.inc} style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                                {errors.inc.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}


                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="universityLogo" className="form-label" >Agent Business Logo</label>

                                <input
                                  type="file"
                                  id="universityLogo"
                                  name="agentBusinessLogo"
                                  accept="image/*"
                                  className="form-control rounded-2 "
                                  style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  onChange={handleInputs} placeholder="Enter"
                                 

                                />
                              </div>

                                
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="company" className="form-label">Password</label>
                                <input name="password"  type="text" onChange={handleInputs} placeholder="Enter" className="form-control rounded-2" id="company" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.password.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                <label htmlFor="Job" className="form-label">Confirm Password</label>
                                <input name="confirmPassword" type="text" className="form-control rounded-2" onChange={handleInputs} placeholder="Enter" id="Job" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}  />
                                {errors.confirmPassword.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}

                              </div>
                            
                            </div>
                          
                            <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto mt-4">
                                    <Link style={{ backgroundColor: "#0f2239", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} to="#" className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="submit" className="btn btn-save border-0  px-4 py-2 text-uppercase fw-semibold text-white  m-2">
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
