import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { saveStudent } from '../../api/student';
import { saveAgent } from '../../api/agent';

const Register = () => {
  const initialState = {
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const initialStateErrors = {
    name: { required: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    password: { required: false, valid: false },
    confirmPassword: { required: false, valid: false }
  }
  const [inputs, setInputs] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('students');


  const navigate = useNavigate()





  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.name === "") {
      error.name.required = true;
    }

    if (data.email === "") {
      error.email.required = true;
    }
    if (data.password === "") {
      error.password.required = true;
    }
    if (data.confirmPassword === "") {
      error.confirmPassword.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (!isValidPassword(data.password)) {
      error.password.valid = true;
    }
    if (!isValidPassword(data.confirmPassword)) {
      error.confirmPassword.valid = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    return error
  }

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value })
    if (submitted) {
      const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value })
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
    const newError = handleValidation(inputs)
    setErrors(newError)
    setSubmitted(true)
    if (handleErrors(newError)) {
      if (type === 'student') {
        saveStudent(inputs).then(res => {
          let token = res?.data?.result?.token;
          let loginType = res?.data?.result?.loginType
          let studentId = res?.data?.result?.studentDetails?._id;
          let data = {
            token: token, loginType: loginType, studentId:studentId,
          }
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/Student");
          }
          toast.success(res?.data?.message);
        })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
      if (type === 'agent') {
        saveAgent(inputs).then(res => {
          let token = res?.data?.result?.token;
          
          let loginType = res?.data?.result?.loginType
          let agent = res?.data?.result?.agentDetails?._id;
          let data = {
            token: token,loginType: loginType, agentId: agent
          }
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/AgentHome");
          }
          toast.success(res?.data?.message);
        })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }

    }
  }

  const handleSinUpType = (data) => {
    setType(data)
  }

  return (
    <>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border p-1 rounded-5 nav-tab mt-2 w-50 mx-auto' style={{ backgroundColor: '#edf0f5' }}>
                      <button
                        className={`btn rounded-5 border-0  fw-bold ${type === 'student' ? 'active bg-white  text-success signup-button ' : ''}`}
                        type="button" aria-selected="true"
                        role='tab' onClick={() => handleSinUpType('student')}
                        style={{ fontSize: '1rem' }} >
                        Student
                      </button>
                      <button
                        className={`btn rounded-5 border-0  fw-bold ${type === 'agent' ? 'active bg-white  text-success signup-button' : ''}`}
                        type="button"
                        aria-selected="false"
                        role='tab' onClick={() => handleSinUpType('agent')}
                        style={{ fontSize: '1rem' }}>
                        Agent
                      </button>
                    </div>
                    <form className="user mt-5" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                        
                        <input type="text" name="name" onChange={handleInputs} className="form-control form-control-user" id="exampleFirstName" placeholder=" Name" />
                        {errors.name.required ? (
                                <div className="text-danger form-text">
                                    This field is required.
                                </div>
                            ) : null}
                        </div>
                        <div className="col-sm-6">
                          <input type="text" name="mobileNumber" onChange={handleInputs} className="form-control form-control-user" id="exampleLastName" placeholder="Mobile Number" />
                          {errors.mobileNumber.required ?

                            <span className="text-danger form-text profile_error">

                              This field is required.

                            </span> : errors.mobileNumber.valid ?
                              <span className="text-danger form-text profile_error">
                                Enter valid mobile number.
                              </span> : null

                          }
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="email" name="email" onChange={handleInputs} className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
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
                    
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input type="password" name="password" onChange={handleInputs} className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                          {errors.password.required ? (
                                <div className="text-danger form-text">
                                    This field is required.
                                </div>
                            ) : errors.password.valid ? (
                                <div className="text-danger form-text">
                                    A minimum 8 characters password contains a <br />
                                    combination of {''}
                                    <strong>uppercase, lowercase, {''}</strong>
                                    <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                </div>
                            ) : null}
                        </div>
                        <div className="col-sm-6">
                          <input type="password" name="confirmPassword" onChange={handleInputs} className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                          {errors.confirmPassword.required ? (
                                <div className="text-danger form-text">
                                    This field is required.
                                </div>
                            ) : errors.confirmPassword.valid ? (
                                <div className="text-danger form-text">
                                    A minimum 8 characters password contains a <br />
                                    combination of {''}
                                    <strong>uppercase, lowercase, {''}</strong>
                                    <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                </div>
                            ) : null}
                        </div>
                      </div>
                      <div className='d-flex justify-content-center'>
                            <button type="submit" className="w-100 p-3 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Sign Up</button>
                        </div>
                      
                      <hr />
                      <a href="/Dashboard" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw" /> Register with Google
                      </a>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small text-decoration-none" href="/ForgotPassword">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <a className="small text-decoration-none" href="/">Already have an account? Login!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
