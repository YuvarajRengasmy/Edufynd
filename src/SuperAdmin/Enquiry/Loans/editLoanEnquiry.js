import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { saveLoanEnquiry } from '../../../api/Enquiry/Loan';
import Mastersidebar from '../../../compoents/sidebar';
import Select from 'react-select';
export const EditLoanEnquiry = () => {
  
  

  return (
    <div>
       {/* <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
        <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
          <div className='content-wrapper' style={{ backgroundColor: '#fff', fontSize: '13px' }}>
            <div className='content-header'>
              <div className='container card card-body p-4 border-0'>
                <h4 className='card-title  fw-bold'>Edit Loan Enquiry </h4>
                <hr />
                <form className="p-1" onSubmit={handleSubmit}>

                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputStudentName">Student Name</label>

                      <input className="form-control" onChange={handleInputs} name="studentName" id="inputStudentName" type="text" placeholder='Enter Student Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.studentName.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputPrimaryNo">Primary Number</label>
                      <input className="form-control" name="primaryNumber" onChange={handleInputs} id="inputPrimaryNo" type="text" placeholder='Enter Primary Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.primaryNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputWhatsAppNumber">WhatsApp Number</label>
                      <input className="form-control" name="whatsAppNumber" onChange={handleInputs} id="inputWhatsAppNumber" type="text" placeholder="Enter WhatsApp Number" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      {errors.whatsAppNumber.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className="col">
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
                      <label className="form-label" for="inputOffer">Do you have a valid offer from any university? </label>
                      <Select
                        isMulti


                        placeholder="Select   eligible for casual leave"
                        name=" inputoffer"


                      />
                      <br />
                      <div className="col">
                        <input
                          type="file"
                          className="form-control  "
                          placeholder="Upload  offerletter "
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '15px' }}
                          name=" offerletter"

                        />
                      </div>

                    </div>
                    <div className="col">
                      <label className="form-label" for="inputloanamount">Loan Amount Required</label>
                      <input className="form-control" id="inputloanamount" type="text" placeholder='Enter Loan Amount Required' name='loanamount' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />

                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputmonthlyincome">What is your monthly income?</label>
                      <input className="form-control" id="inputmonthlyincome" name='monthlyincome' type="text" placeholder='Enter What is your monthly income?' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputPassportno">Passport Number</label>
                      <input className="form-control" id="inputPassportno" type="Password" name='passportno' placeholder='Enter Passport Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                      <br />
                      <div className="col">
                        <input
                          type="file"
                          className="form-control  "
                          placeholder="Upload  passportPhoto "
                          style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '15px' }}
                          name=" passportPhoto"

                        />
                      </div>
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputapplyloan">Did you apply for loan elsewhere? </label>
                      <Select
                        isMulti


                        placeholder="Select  loan "
                        name=" applyloanelsewhere"


                      />
                      <br />
                      <div className="col">
                        <label className="form-label" for="inputbankapplied">Choose the bank you previously applied </label>
                        <Select
                          isMulti


                          placeholder="Select  the bank  previously applied"
                          name=" Choose the bank you previously applied"


                        />
                      </div>
                      <br />
                      <div className="col">
                        <label className="form-label" for="input previousapplication">Status of previous application</label>
                        <Select
                          isMulti


                          placeholder=" Status of previous application"
                          name=" Status of previous application"


                        />
                      </div>


                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputCo-ApplicantName"> Co-Applicant Name</label>
                      <input className="form-control" id="inputCo-ApplicantName" name='co-applicant-name' type="text" placeholder='Enter  Co-Applicant Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputCo-Applicantage"> Co-Applicant Age</label>
                      <input className="form-control" id="inputCo-Applicantage" name='co-applicant-age' type="text" placeholder='Enter  Co-Applicant Age' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputCo-Applicantstatus"> Co-Applicant Employment Status</label>
                      <input className="form-control" id="inputCo-Applicantstatus" type="text" name='co-applicant-status' placeholder='Enter  Co-Applicant Employment Status' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    </div>



                  </div>
                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputCo-Applicantdetails"> Co-Applicant Income Details</label>
                      <input className="form-control" id="inputCo-Applicantdetails" type="text" placeholder='Enter  Co-Applicant Income Details' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }} />
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputcollateral">Will you submit your collateral if required</label>
                      <Select
                        isMulti


                        placeholder=" Will you submit your collateral if required"
                        name="collateral-required"


                      />
                    </div>

                  </div>
                  <div className='row my-3'>
                    <div className='d-flex flex-row align-item-center justify-content-end gap-4 '>

                      <button className="btn border-0 w-25" type="submit" style={{ backgroundColor: '#fe5722', color: '#fff' }}>Save Changes</button>


                      <button className="btn border-0 w-25" style={{ backgroundColor: '#0f2239', color: '#fff' }} type="submit">Cancel</button>

                    </div>

                  </div>

                </form>
              </div>
            </div>

          </div>

        </div>
      </div> */}
  </div>
  )
}
export default EditLoanEnquiry