import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { getallUniversity } from '../../../api/university';

import Select from 'react-select';
import Flags from 'react-world-flags';
import { saveForexEnquiry } from '../../../api/Enquiry/Forex';
import Mastersidebar from '../../../compoents/sidebar';
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
    businessName: "",
    agentPrimaryNumber: "",
    agentWhatsAppNumber: "",
    agentEmail: "",
    paymentType: "",
    amountInCurrency: "",
    assignedTo: "",
    

  }
  const initialStateErrors = {
    source: { required: false },
    studentName: { required: false },
    country: { required: false },
    currency: { required: false },
    universityName: { required: false },
    passportNo: { required: false },
    primaryNumber: { required: false,valid:false },
    whatsAppNumber: { required: false,valid:false },
    email: { required: false,valid:false },
    agentName: { required: false },
    businessName: { required: false },
    agentPrimaryNumber: { required: false,valid:false },
    agentWhatsAppNumber: { required: false ,valid:false },
    agentEmail: { required: false,valid:false },
    paymentType: { required: false },
    amountInCurrency: { required: false },
    assignedTo: { required: false },

  }
  const [forex, setForex] = useState(initialState)
  const [university, setUniversity] = useState()
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    getAllUniversityList();
   
  }, [])

  const getAllUniversityList = () => {
    getallUniversity().then(res => {
      setUniversity(res?.data?.result)
    }).catch(err => { console.log(err) })
  }

  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (!data.source) {
      error.source.required = true;
    }
    if (!data.studentName) {
      error.studentName.required = true;
    }
    if (!data.country) {
      error.country.required = true;
    }
    if (!data.currency) {
      error.currency.required = true;
    }
    if (!data.universityName) {
      error.universityName.required = true;
    }
    if (!data.passportNo) {
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
    if (!data.agentName) {
      error.agentName.required = true;
    }
    if (!data.businessName) { 
      error.businessName.required = true; 
    }
    if (!data.agentPrimaryNumber) {
      error.agentPrimaryNumber.required = true;
    }   
    if (!data.agentWhatsAppNumber) {
      error.agentWhatsAppNumber.required = true;
    }
    if (!data.agentEmail) {
      error.agentEmail.required = true;
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
    if (!isValidPhone(data.agentPrimaryNumber)) {
      error.agentPrimaryNumber.valid = true;
    }
    if (!isValidPhone(data.agentWhatsAppNumber)) {
      error.agentWhatsAppNumber.valid = true;
    }
    if (!isValidEmail(data.agentEmail)) {
      error.agentEmail.valid = true;
    }
    return error
  }

  const handleInputs = (event) => {
     setForex({ ...forex, [event?.target?.name]: event?.target?.value }) 
    if (submitted) {
      const newError = handleValidation({ ...forex, [event.target.name]: event.target.value })
      setErrors(newError)
    }
  }


  const countryToDetails = {
    "United States": { currency: "USD", flag: "us" },
    "Canada": { currency: "CAD", flag: "ca" },
    "United Kingdom": { currency: "GBP", flag: "gb" },
    "Australia": { currency: "AUD", flag: "au" },
    "India": { currency: "INR", flag: "in" },

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
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(forex);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
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
    <div> 
      <div  style={{  fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'14px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Add Forex Enquiry </h4>
    <hr/>
  <form className="p-1">
   
    <div className='row mb-3'>
  
                        <div className="col">
                          <label className="form-label" for="inputstudentname">Name of the Student</label>
                          <input className="form-control" name="studentname" onChange={handleInputs} id="inputstudentname" type="text"  placeholder='Enter Name of the Student'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                          {errors.studentName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                        
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label style={{ color: "#231F20" }}>Country<span className="text-danger">*</span></label>
                      <select
                        className="form-select rounded-2 p-2"
                        name="country"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onChange={handleInputs}
                      >
                        <option value="" disabled hidden>Select Country</option>
                        {Object.keys(countryToDetails).map((country) => (
                          <option key={country} value={country}>
                            {country}
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
                        {countryToDetails[forex.country] && (
                          <Flags code={countryToDetails[forex.country].flag} className="me-2" style={{ width: '40px', height: '30px' }} />
                        )}
                        <input className='form-control' type="text" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} value={`${countryToDetails[forex.country]?.currency || ''}`} readOnly />
                      </div>
                      {errors.currency.required && (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      )}
                    </div>
                  </div>
    
    <div className='row mb-3'>
   
                        <div className="col">
                          <label className="form-label" for="inputuniversity">University Name </label>
                          <input className="form-control" id="inputstudentid" name='universityName' onChange={handleInputs} type="text" placeholder="Enter Student ID" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                            {errors.universityName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}

                        </div>
                        
                        <div className="col">
                          <label className="form-label" for="inputpassportno">Passport No</label>
                          <input className="form-control" id="inputpassportno" onChange={handleInputs} name='passportno' type="text" placeholder='Enter Passport No' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                          {errors.passportno.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                        </div>
    </div>
    <div className='row mb-3'>

    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPrimaryNo">Primary Number</label>
                      <input className="form-control" name="primaryNumber" onChange={handleInputs} id="inputPrimaryNo" type="text" placeholder='Enter Primary Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                      <label className="form-label" for="inputWhatsAppNumber">WhatsApp Number</label>
                      <input className="form-control" name="whatsAppNumber" onChange={handleInputs} id="inputWhatsAppNumber" type="text" placeholder="Enter WhatsApp Number" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                      <label className="form-label" for="inputEmail">Email ID</label>
                      <input className="form-control" name="email" onChange={handleInputs} id="inputEmail" type="text" placeholder='Enter Email ID' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                        <div className="col">
                          <label className="form-label" for="inputsource">Source</label>
                        
                       
                     
                        </div>
                      
                        
    </div>
    <div className='row mb-3'>
                         <div className='col'>
                      <label className="form-label" for="inputAgentName">Agent Name</label>
                      <input className="form-control" id="inputAgentName" type="text" name='agentname' placeholder='Enter Agent Name'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputbusinessname">Business Name</label>
                      <input className="form-control" id="inputbusinessname" type="text" name='businessname' placeholder='Enter Business Name'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputprimaryno">Primary Number</label>
                      <input className="form-control" id="inputprimaryno" type="text" name='primaryno' placeholder='Enter Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                 
                          </div> 
                          <div className='row mb-3'>
                      <div className='col'>
                      <label className="form-label" for="inputwhatsappno">WhatsApp Number</label>
                      <input className="form-control" id="inputwhatsappno" type="text" name='whatsappno' placeholder='Enter WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputemailid">Email ID</label>
                      <input className="form-control" id="inputemailid" type="email" name='whatsappno' placeholder='Enter Email ID'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      </div>
                      <div className='row mb-3'>
                      <div className='col'>
                      <label className="form-label" for="inputstudentprimaryno"> Student Primary Number</label>
                      <input className="form-control" id="inputstudentprimaryno" name='studentprimaryno' type="text" placeholder='Enter Student Primary Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                      <div className='col'>
                      <label className="form-label" for="inputstudentwhatsappno">Student WhatsApp Number</label>
                      <input className="form-control" id="inputstudentwhatsappno" type="text" name='studentwhatsappno' placeholder='Enter Student WhatsApp Number'style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                      </div>
                     
                      </div>
    <div className='row mb-3'>
   
                        <div className="col">
                          <label className="form-label" for="inputemail">Email ID</label>
                          <input className="form-control" id="inputemail" type="email" name='email' placeholder='Enter Email ID' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputpayment">Payment Type </label>
                          <Select
                        isMulti


                        placeholder="Select  Payment Type"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                         
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputamount">Amount In Currency</label>
                          <input className="form-control" id="inputamount" name='amountincurrency' type="text" placeholder='Enter Amount In Currency' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
 
                        <div className="col">
                          <label className="form-label" for="inputassignedto">Assigned To </label>
                          <Select
                        isMulti


                        placeholder="Select   Assigned To"
                        name="University Name"
                        style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}

                      />
                       
                        </div>
                     
    </div>
                    <div className='row my-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save</button>
                        
                       
                          <button className="btn " style={{backgroundColor:'#0f2239',color:'#fff'}} type="submit">Cancel</button>
                        
                      </div>
                    
                    </div>
                        
        </form>
  </div>
</div>
        
        </div>
                    
               </div>     
    </div>
 </div>

  )
}
export default AddForex