import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { saveStudnetEnquiry } from '../../../api/Enquiry/student';

import Mastersidebar from '../../../compoents/sidebar';

export const AddStudentForm = () => {


  const initialState = {
    source: "",
    name: "",
    dob: "",
    passportNo: "",
    qualification: "",
    whatsAppNumber: "",
    primaryNumber: "",
    email: "",
    cgpa: "",
    yearPassed: "",
    desiredCountry: "",
    desiredCourse: "",
    doYouNeedSupportForLoan: "",
    assignedTo: "",

  }
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    dob: { required: false },
    passportNo: { required: false },
    qualification: { required: false },
    whatsAppNumber: { required: false },
    primaryNumber: { required: false },
    email: { required: false },
    cgpa: { required: false },
    yearPassed: { required: false },
    desiredCountry: { required: false },
    desiredCourse: { required: false },
    doYouNeedSupportForLoan: { required: false },
    assignedTo: { required: false },

  }
  const [student, setStudent] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()



  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.source === "") {
      error.source.required = true;
    }
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.dob === "") {
      error.dob.required = true;
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
    if (data.primaryNumber === "") {
      error.primaryNumber.required = true;
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
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    return error
  }

  const handleInputs = (event) => {
    setStudent({ ...student, [event?.target?.name]: event?.target?.value })
    if (submitted) {
      const newError = handleValidation({ ...student, [event.target.name]: event.target.value })
      setErrors(newError)
    }
  }


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
    const newError = handleValidation(student);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveStudnetEnquiry(student)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListStudentForm");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };



  return (
    <>
   
        <div >
         
            <Mastersidebar />
         
          <div className='content-wrapper' style={{ fontSize: '13px' }}>
            <div className='content-header'>
              <div className='container-fluid'>
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'> Add Student Enquiry Details</h5>
                </div>
                      <div className="card-body mt-5">
               
                <form className="p-1" onSubmit={handleSubmit}>

                  <div className='row g-3'>
                  <div className='row g-3'>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Source</label>
                      <select onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} className="form-select form-select-lg rounded-2 " name="source">
                        <option value="">Select Source</option>
                        <option value="walkin">Walk In</option>
                        <option value="direct">Direct</option>
                        <option value="others">Others</option>
                      </select>
                      {errors.source.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                  </div>

                    
                  
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Student Name</label>
                      <input className="form-control rounded-2" type="text" id="inputEmail4" name='name' onChange={handleInputs} placeholder='Enter Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.name.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label className="form-label" for="inputgender">Gender</label>
                    <select class="form-select form-select-lg rounded-2" aria-label="Default select example" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
  <option selected>Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
                   

                    </div>
                    

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">DOB</label>
                      <input className="form-control rounded-2" onChange={handleInputs} id="inputPassword4" type="date" placeholder='DOB' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} name="dob" />
                      {errors.dob.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">CitizenShip</label>
                      <input className="form-control rounded-2" id="inputPassword4" type="text" placeholder='Enter CitizenShip' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} name="citizenship" />
                    
                        
                   

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">Passport No</label>
                      <input className="form-control rounded-2" onChange={handleInputs} name="passportNo" id="inputAddress" type="text" placeholder="Enter Passport No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.passportNo.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputExpiry">Expiry Date</label>
                      <input className="form-control rounded-2"  name="expirydate" id="inputAddress" type="Date" placeholder="Enter Expiry Date" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                     

                    </div>

                  
                 
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">Email ID</label>
                      <input className="form-control rounded-2" onChange={handleInputs} id="inputPassword4" text="text" placeholder='Enter Email ID' name="email" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
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
                      <label className="form-label" for="inputEmail4">Primary Number</label>
                      <input className="form-control rounded-2" onChange={handleInputs} id="inputEmail4" type="text" name="primaryNumber" placeholder='Enter Primary Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.primaryNumber.required ?

                        <span className="text-danger form-text profile_error">

                          This field is required.

                        </span> : errors.primaryNumber.valid ?
                          <span className="text-danger form-text profile_error">
                            Enter valid mobile number.
                          </span> : null

                      }

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">WhatsApp Number</label>
                      <input className="form-control rounded-2" id="inputEmail4" onChange={handleInputs} type="text" name="whatsAppNumber" placeholder='Enter WhatsApp Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.whatsAppNumber.required ?

                        <span className="text-danger form-text profile_error">

                          This field is required.

                        </span> : errors.whatsAppNumber.valid ?
                          <span className="text-danger form-text profile_error">
                            Enter valid WhatsApp number.
                          </span> : null

                      }

                    </div>

                      
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">Qualification</label>
                      <input className="form-control rounded-2" id="inputPassword4" onChange={handleInputs} type="text" name="qualification" placeholder='Enter Qualification' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.qualification.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                  

                  
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress"> Year passed</label>
                      <input className="form-control rounded-2" id="inputAddress" onChange={handleInputs} name="yearPassed" type="text" placeholder="Enter Passed Year" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.yearPassed.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">CGPA </label>
                      <input className="form-control rounded-2" onChange={handleInputs} name='cgpa' id="inputAddress" type="text" placeholder=" Enter CGPA" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.cgpa.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Desired Country</label>
                      <input className="form-control rounded-2" id="inputEmail4" onChange={handleInputs} name="desiredCountry" type="text" placeholder='Enter Desired Country' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.desiredCountry.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">Desired University</label>
                      <input className="form-control rounded-2" id="inputPassword4"  type="text" name="desireduniversity" placeholder='Enter Desired University' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    
                      

                    </div>
                 
                  
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputPassword4">Desired Course</label>
                      <input className="form-control rounded-2" id="inputPassword4" onChange={handleInputs} type="text" name="desiredCourse" placeholder='Enter Desired Course' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.desiredCourse.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className='row g-3'>

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputAddress">Do You Hold Any Other Offer? </label>
                      <select className="form-select form-select-lg rounded-2"
                        name="doYouNeedSupportForLoan"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onChange={handleInputs}>
                        <option value=""> Select Offer </option>
                        <option value="yes"> Yes </option>
                        <option value="no">No </option>

                      </select>
                     

                    </div>
                    </div>
                   
                   

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4"> Country</label>
                      <input className="form-control rounded-2" id="inputEmail4"  type="text" name="assignedTo" placeholder=' Enter Country' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                     

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">University</label>
                      <input className="form-control rounded-2" id="inputEmail4"  type="text" name="University" placeholder='Enter University ' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                   

                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Program</label>
                      <input className="form-control rounded-2" id="inputEmail4" type="text" name="Program" placeholder='Enter Program' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    
                    </div>
                    <div className='row g-3'>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Referee Name</label>
                      <input className="form-control rounded-2" id="inputEmail4" type="text" name="RefereeName" placeholder='Enter Referee Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Referee Contact</label>
                      <input className="form-control rounded-2" id="inputEmail4" type="text" name="RefereeContact" placeholder='Enter Referee Contact' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    
                    </div>
                    </div>
                    <div className='row g-3'>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Request Loan Support</label>
                      <input className="form-control rounded-2" id="inputEmail4" type="text" name="RequestLoanSupport" placeholder='Enter Request Loan sSupport' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label className="form-label" for="inputEmail4">Register for IELTS class</label>
                      <input className="form-control rounded-2" id="inputEmail4" type="text" name="RegisterforIELTSclass" placeholder='Enter Register for IELTS class' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    
                    </div>
                    </div>


                 
                  

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                      <label className="form-label" for="inputAddress">Do you need support for loan? </label>
                      <select className="form-control rounded-2"
                        name="doYouNeedSupportForLoan"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onChange={handleInputs}>
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
                
                
                  
             

                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                      <label className="form-label" for="inputEmail4"> Assigned To</label>
                      <input className="form-control rounded-2" id="inputEmail4" onChange={handleInputs} type="text" name="assignedTo" placeholder=' Assigned To Staff' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.assignedTo.required ?

                        <span className="text-danger form-text profile_error">

                          This field is required.

                        </span> : null

                      }

                    </div>
                 
                  <div className='row g-4'>
                  <div className='d-flex flex-row align-item-center justify-content-end gap-3 '>


<Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} to="/ClientList" className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white">
  Cancel
</Link>

<button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} type="submit" className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 text-white  ">
  Submit
</button>

</div>
                  </div>
                 

                  </div>

                </form>
                </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      
    </>
  )
}
export default AddStudentForm