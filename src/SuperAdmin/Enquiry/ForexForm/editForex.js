import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate, Link ,useLocation} from 'react-router-dom';
import { getallUniversity } from '../../../api/university';

import Select from 'react-select';
import Flags from 'react-world-flags';
import { updateForexEnquiry, getSingleForexEnquiry} from '../../../api/Enquiry/Forex';
import Mastersidebar from '../../../compoents/sidebar';
export const AddForex = () => {


  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

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


  }
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


  
  useEffect(() => {
    getForexDetails();
  }, []);
  const getForexDetails = () => {
    getSingleForexEnquiry(id)
      .then((res) => {
        setForex(res?.data?.result);
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
    if (!data.country) {
      error.country.required = true;
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

    return error
  }

  const handleInputs = (event) => {

    const { name, value } = event.target
    setForex({ ...forex, [event?.target?.name]: event?.target?.value })
    if (name === "country") {
      const details = countryToDetails[value] || {  currency: "", flag: "" };
      setForex({ ...forex, country: value, currency: details.currency, flag: details.flag })
    }

    
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
      updateForexEnquiry(forex)
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
      <div style={{ fontFamily: 'Plus Jakarta Sans' }}>
        <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
          <div className='content-wrapper' style={{ fontSize: '13px' }}>
            <div className='content-header'>
            <form className="p-1" onSubmit={handleSubmit}>

              <div className='container-fluid'>
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'> Edit Forex Enquiry Details</h5>
                </div>
                      <div className="card-body mt-5">
              
                  <div className='row g-3'>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputsource">Source</label>
                      <select className='form-select' value={forex?.source} onChange={handleInputs} name='source' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
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
                    {forex.source === 'Agent' ? (
                      <>
                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                          <label className="form-label" for="inputAgentName">Agent Name</label>
                          <input className="form-control" value={forex?.agentName} id="inputAgentName" onChange={handleInputs} type="text" name='agentName' placeholder='Enter Agent Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                          {errors.agentName.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                          <label className="form-label" for="inputbusinessname">Business Name</label>
                          <input className="form-control" value={forex?.businessName} id="inputbusinessname" type="text" onChange={handleInputs} name='businessName' placeholder='Enter Business Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />

                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputEmail">Agent Email ID</label>
                          <input className="form-control" value={forex?.agentEmail} name="agentEmail" onChange={handleInputs} id="inputEmail" type="text" placeholder='Enter Email ID' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />

                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputPrimaryNo">Primary Number</label>
                          <input className="form-control" value={forex?.agentPrimaryNumber} name="agentPrimaryNumber" onChange={handleInputs} id="inputPrimaryNo" type="text" placeholder='Enter Primary Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />

                        </div>


                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputWhatsAppNumber">Agent WhatsApp Number</label>
                          <input className="form-control" value={forex?.agentWhatsAppNumber} name="agentWhatsAppNumber" onChange={handleInputs} id="inputWhatsAppNumber" type="text" placeholder="Enter WhatsApp Number" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />

                        </div>


                    

                      </>
                    ) : null}
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputstudentname">Name of the Student</label>
                      <input className="form-control" name="studentName" value={forex?.studentName} onChange={handleInputs} id="inputstudentname" type="text" placeholder='Enter Name of the Student' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.studentName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">Passport No</label>
                      <input className="form-control" id="inputpassportno" value={forex?.passportNo} onChange={handleInputs} name='passportNo' type="text" placeholder='Enter Passport No' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.passportNo.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpassportno">Expiry Date<span className="text-danger">*</span></label>
                      <input className="form-control rounded-2" id="inputpassportno" name='Expirydate' type="date" placeholder='Enter ExpiryDate' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                   
                    </div>


                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail">Email ID</label>
                      <input className="form-control" name="email" value={forex?.email} onChange={handleInputs} id="inputEmail" type="text" placeholder='Enter Email ID' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                      <label className="form-label" for="inputPrimaryNo">Primary Number</label>
                      <input className="form-control" name="primaryNumber" value={forex?.primaryNumber} onChange={handleInputs} id="inputPrimaryNo" type="text" placeholder='Enter Primary Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                      <input className="form-control" name="whatsAppNumber" value={forex?.whatsAppNumber} onChange={handleInputs} id="inputWhatsAppNumber" type="text" placeholder="Enter WhatsApp Number" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                      <label className="form-label" for="inputuniversity">University Name </label>
                      <input className="form-control" id="inputstudentid" value={forex?.universityName} name='universityName' onChange={handleInputs} type="text" placeholder="Enter Student ID" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.universityName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputuniversity">Course<span className="text-danger">*</span> </label>
                      <input className="form-control rounded-2" id="inputstudentid" name='Course'  type="text" placeholder="Enter Course" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputpayment">Payment Type </label>
                      <select className='form-select' value={forex?.paymentType} onChange={handleInputs} name='paymentType' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} id='inputpayment'>
                        <option>Payment Type</option>
                        <option value="Tuition_Fees"> Tuition Fees</option>
                        <option value="GIC">GIC</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value=" Ticket"> Ticket</option>
                        <option value="Application_Fees">Application Fees</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.paymentType.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label style={{ color: "#231F20" }}>Country<span className="text-danger">*</span></label>
                      <select
                      value={forex.country}
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
                        {forex.flag && (
                          <Flags code={forex.flag} className="me-2" name="flag" onChange={handleInputs} style={{ width: '40px', height: '30px' }} />
                        )}
                        <input className='form-control' type="text" onChange={handleInputs} name='currency' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} value={`${forex.currency}`} readOnly />
                      </div>

                    </div>
                  

                 

                  

                

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputamount">Amount In Currency</label>
                      <input className="form-control" id="inputamount" value={forex?.amountInCurrency} onChange={handleInputs} name='amountInCurrency' type="text" placeholder='Enter Amount In Currency' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.amountInCurrency.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>

                  
                 

               


                
                

                   
                   
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputassignedto">Assigned To </label>
                      <select className='form-select' value={forex?.assignedTo} onChange={handleInputs} name='assignedTo' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} id='inputassignedto'>
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
                      <label className="form-label" for="inputamount">Mark up<span className="text-danger">*</span></label>
                      <input className="form-control rounded-2" id="inputamount" name='Markup' type="text" placeholder='Enter Mark up' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                     
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputamount">Profit (Value*Mark up)<span className="text-danger">*</span></label>
                      <input className="form-control rounded-2" id="inputamount" onChange={handleInputs} name='Profit' type="text" placeholder='Enter Profit' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.amountInCurrency.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>


                 



                  </div>


                  <div className='row g-3 '>
                    <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                      <Link

                        to="/ListForexForm"
                        style={{ backgroundColor: '#231f20', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2"
                      >
                        Cancel
                      </Link>
                      <button

                        style={{ backgroundColor: '#FE5722', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        type="submit" className="btn btn-save  border-0 fw-semibold text-uppercase px-4 py-2  text-white  m-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  </div>
                  </div>

              
              </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </div>

  )
}
export default AddForex;