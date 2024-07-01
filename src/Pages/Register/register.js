import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { saveStudent } from '../../api/student';
import { saveAgent } from '../../api/agent';
import {saveSuperAdmin} from '../../api/superAdmin';

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
                let studentId = res?.data?.result?.studentDetails?._id;
                let loginType = res?.data?.result?.loginType
                let data = {
                    token: token, studentId: studentId, loginType: loginType
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
        if (type === 'superAdmin') {
            saveSuperAdmin(inputs).then(res => {
                let token = res?.data?.result?.token;
                let superAdminId = res?.data?.result?.superAdminDetails?._id;
                let loginType = res?.data?.result?.loginType
                let data = {
                    token: token, superAdminId: superAdminId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Dashboard");
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
                let agentId = res?.data?.result?.agentDetails?._id;
                let loginType = res?.data?.result?.loginType
                let data = {
                    token: token, agentId: agentId, loginType: loginType
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
    
      <div className="bg-gradient-white" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px'}}>
        <div className="container">
          <div className='container '>
          <div className="card o-hidden border-0 rounded-0 shadow-lg mt-5">
            <div className="card-body p-0">
              <div className="row justify-content-center">
              <div className="col-lg-6 bg-primary">
                  <div className="pt-4">
                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border-0 p-1 text-white rounded-3 nav-tab mt-2 w-50 mx-auto' style={{ backgroundColor: '#fe5722' }}>
                      <button
                        className={`btn rounded-5 border-0 text-white fw-semibold ${type === 'student' ? 'active bg-success bg-gradient px-2 py-1 text-dark signup-button  ' : ''}`}
                        type="button" aria-selected="true"
                        role='tab' onClick={() => handleSinUpType('student')}
                        style={{ fontSize: '1rem' }} >
                        Student
                      </button>
                     {/* <button
                        className={`btn rounded-5 border-0  fw-bold ${type === 'superAdmin' ? 'active bg-white  text-success signup-button' : ''}`}
                        type="button"
                        aria-selected="false"
                        role='tab' onClick={() => handleSinUpType('superAdmin')}
                        style={{ fontSize: '1rem' }}>
                      SAdmin
                      </button>  */}
                      <button
                        className={`btn rounded-5 border-0 text-white  fw-semibold ${type === 'agent' ? 'active bg-success bg-gradient px-2 py-1 text-dark signup-button' : ''}`}
                        type="button"
                        aria-selected="false"
                        role='tab' onClick={() => handleSinUpType('agent')}
                        style={{ fontSize: '1rem' }}>
                        Agent
                      </button>
                    </div>
                    <form className="user mt-5 px-5" onSubmit={handleSubmit}>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                        
                        <input type="text" name="name" onChange={handleInputs} className="form-control form-control-user  rounded-3" id="exampleFirstName" placeholder=" Name" />
                        {errors.name.required ? (
                                <div className="text-danger form-text">
                                    This field is required.
                                </div>
                            ) : null}
                        </div>
                        <div className="col-sm-6">
                          <input type="text" name="mobileNumber" onChange={handleInputs} className="form-control form-control-user rounded-3" id="exampleLastName" placeholder="Mobile Number" />
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
                        <input type="email" name="email" onChange={handleInputs} className="form-control form-control-user rounded-3" id="exampleInputEmail" placeholder="Email Address" />
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
                          <input type="password" name="password" onChange={handleInputs} className="form-control form-control-user rounded-3" id="exampleInputPassword" placeholder="Password" />
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
                          <input type="password" name="confirmPassword" onChange={handleInputs} className="form-control form-control-user rounded-3" id="exampleRepeatPassword" placeholder="Repeat Password" />
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
                            <button type="submit" className="w-50 px-3 py-2 btn rounded-5 text-white fw-semibold" style={{ backgroundColor: '#fe5722' }}>Sign Up</button>
                        </div>
                      
                      <hr />
                      <a href="/" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw" /> Register with Google
                      </a>
                      <hr />
                    
                   
                    <div className='row gy-3 text-center '>
                    <div className="col-lg-6 ">
                      <a className="small btn  text-white border-0 rounded-5 px-3 py-2" style={{backgroundColor:'#fe5722',fontSize:'12px'}} href="/ForgotPassword">Forgot Password?</a>
                    </div>
                    <div className="col-lg-6">
                      <a className="btn btn-outline-light rounded-5 btn-transparent px-3 py-2" style={{fontSize:'12px'}} href="/">Already have an account ?</a>
                    </div>
                    </div>
                    </form>
               
                  </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block bg-register-image" >
                  <img src='https://media.istockphoto.com/id/1390864016/vector/educational-tourism-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=mhkj3CUSexYWJA2m7oJGdW_4p-N0U-Sw9_DME5nwuV0=' className='img-fluid object-fit-fill' style={{width:'100%'}}/>
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
