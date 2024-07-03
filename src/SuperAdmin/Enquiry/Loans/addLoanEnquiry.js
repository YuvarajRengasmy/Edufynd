import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { saveLoanEnquiry } from '../../../api/Enquiry/Loan';
import Mastersidebar from '../../../compoents/sidebar';
export const AddLoanEnquiry = () => {

  const initialState = {
    studentName:"",
    whatsAppNumber:"",
    primaryNumber:"",
    email:"",
    doYouHaveAValidOfferFromAnyUniversity:"",
    uploadOfferletter:"",
    loanAmountRequired:"",
    desiredCountry:"",
    whatIsYourMonthlyIncome:"",
    passportNumber:"",
    uploadPassport:"",
    didYouApplyForLoanElsewhere:"",
    chooseTheBankYouPreviouslyApplied:"",
    statusOfPreviousApplication:"",
    coApplicantName:"",
    age:"",
    employmentStatus:"",
    incomeDetails:"",
    willyouSubmitYourCollateral:"",


  }
  const initialStateErrors = {
    studentName:{required:false},
    whatsAppNumber:{required:false},
    primaryNumber:{required:false},
    email:{required:false},
    doYouHaveAValidOfferFromAnyUniversity:{required:false},
    uploadOfferletter:{required:false},
    loanAmountRequired:{required:false},
    desiredCountry:{required:false},
    whatIsYourMonthlyIncome:{required:false},
    passportNumber:{required:false},
    uploadPassport:{required:false},
    didYouApplyForLoanElsewhere:{required:false},
    chooseTheBankYouPreviouslyApplied:{required:false},
    statusOfPreviousApplication:{required:false},
    coApplicantName:{required:false},
    age:{required:false},
    employmentStatus:{required:false},
    incomeDetails:{required:false},
    willyouSubmitYourCollateral:{required:false},

  }
  const [loan, setLoan] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()



  const handleValidation = (data) => {
    let error = initialStateErrors;
      
    if (data.studentName === "") {
      error.studentName.required = true;
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
    if (data.doYouHaveAValidOfferFromAnyUniversity === "") {
      error.doYouHaveAValidOfferFromAnyUniversity.required = true;
    }
    if (data.uploadOfferletter === "") {
      error.uploadOfferletter.required = true;
    }
    if (data.loanAmountRequired === "") {
      error.loanAmountRequired.required = true;
    }
    if (data.desiredCountry === "") {
      error.desiredCountry.required = true;
    }
    if (data.whatIsYourMonthlyIncome === "") {
      error.whatIsYourMonthlyIncome.required = true;
    }
    if (data.passportNumber === "") {
      error.passportNumber.required = true;
    }
    if (data.uploadPassport === "") {
      error.uploadPassport.required = true;
    }
    if (data.didYouApplyForLoanElsewhere === "") {
      error.didYouApplyForLoanElsewhere.required = true;
    }
    if (data.chooseTheBankYouPreviouslyApplied === "") {
      error.chooseTheBankYouPreviouslyApplied.required = true;
    }
    if (data.statusOfPreviousApplication === "") {
      error.statusOfPreviousApplication.required = true;
    }
    if (data.coApplicantName === "") {
      error.coApplicantName.required = true;
    }
    if (data.age === "") {
      error.age.required = true;
    }
    if (data.employmentStatus === "") {
      error.employmentStatus.required = true;
    }
    if (data.incomeDetails === "") {
      error.incomeDetails.required = true;
    }
    if (data.willyouSubmitYourCollateral === "") {
      error.willyouSubmitYourCollateral.required = true;
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
    setLoan({ ...loan, [event?.target?.name]: event?.target?.value })
    if (submitted) {
      const newError = handleValidation({ ...loan, [event.target.name]: event.target.value })
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
    const newError = handleValidation(loan);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      saveLoanEnquiry(loan)
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
    <div> 
      <div  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ backgroundColor: '#fff',fontSize:'13px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title text-center fw-bold'>Loan Enquiry </h4>
    <hr/>
  <form className="p-1" onSubmit={handleSubmit}>
   
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Student Name</label>
                        
                          <input className="form-control" onChange={handleInputs} name="studentName" id="inputEmail4"  type="text" placeholder='Enter Name'style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                          {errors.studentName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Primary Number</label>
                          <input className="form-control" name="primaryNumber" onChange={handleInputs} id="inputPassword4" type="text" placeholder='Primary Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                          {errors.primaryNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">WhatsApp Number</label>
                          <input className="form-control" name="whatsAppNumber" onChange={handleInputs} id="inputAddress" type="text" placeholder="WhatsApp Number" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                          {errors.whatsAppNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Email ID</label>
                          <input className="form-control" name="email" onChange={handleInputs}  id="inputEmail4" type="text" placeholder='Email ID' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
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
                          <label className="form-label" for="inputPassword4">Do you have a valid offer from any university? </label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Do you have a valid offer from any university?' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Loan Amount Required</label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Loan Amount Required" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">What is your monthly income?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='What is your monthly income?' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputPassword4">Passport Number</label>
                          <input className="form-control" id="inputPassword4" type="Password" placeholder='Passport Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputAddress">Did you apply for loan elsewhere? </label>
                          <input className="form-control" id="inputAddress" type="text" placeholder="Did you apply for loan elsewhere? " style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
    </div>
    <div className='row mb-3'>
    <div className="col">
                          <label className="form-label" for="inputEmail4">Who is your co-applicant?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Who is your co-applicant?' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Will you submit your collateral if required?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Will you submit your collateral if required?' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputEmail4">Will you submit your collateral if required?</label>
                          <input className="form-control" id="inputEmail4" type="text" placeholder='Will you submit your collateral if required?' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}/>
                        </div>
    </div>
                    <div className='row mb-3'>
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save</button>
                        
                       
                          <button className="btn btn-secondary" type="submit">Cancel</button>
                        
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
export default AddLoanEnquiry;