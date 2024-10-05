import React, { useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { saveStudents } from '../../api/student';
import { saveAgents } from '../../api/agent';
import { saveSuperAdmin } from '../../api/superAdmin';
import {saveAdmin} from '../../api/admin'
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for visibility toggle

const Register = () => {
  const initialState = {
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const initialStateErrors = {
    name: { required: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    password: { required: false, valid: false },
    confirmPassword: { required: false, valid: false }
  };
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('students');

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

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
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value });
      setErrors(newError);
    }
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
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      if (type === 'student') {
        saveStudents(inputs).then(res => {
          let token = res?.data?.result?.token;
          let studentId = res?.data?.result?.studentDetails?._id;
          let loginType = res?.data?.result?.loginType;
          let data = {
            token: token, studentId: studentId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/student_dashboard");
          }
          toast.success(res?.data?.message);
        }).catch((err) => {
          toast.error(err?.response?.data?.message);
        });
      }
      if (type === 'superAdmin') {
        saveSuperAdmin(inputs).then(res => {
          let token = res?.data?.result?.token;
          let superAdminId = res?.data?.result?.superAdminDetails?._id;
          let loginType = res?.data?.result?.loginType;
          let data = {
            token: token, superAdminId: superAdminId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/dashboard");
          }
          toast.success(res?.data?.message);
        }).catch((err) => {
          toast.error(err?.response?.data?.message);
        });
      }
      if (type === 'admin') {
        saveAdmin(inputs).then(res => {
          let token = res?.data?.result?.token;
          let adminId = res?.data?.result?.adminDetails?._id;
          let loginType = res?.data?.result?.loginType;
          let data = {
            token: token, adminId: adminId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/Dashboard");
          }
          toast.success(res?.data?.message);
        }).catch((err) => {
          toast.error(err?.response?.data?.message);
        });
      }
      if (type === 'agent') {
        saveAgents(inputs).then(res => {
          let token = res?.data?.result?.token;
          let agentId = res?.data?.result?.agentDetails?._id;
          let loginType = res?.data?.result?.loginType;
          let data = {
            token: token, agentId: agentId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/agent_dashboard");
          }
          toast.success(res?.data?.message);
        }).catch((err) => {
          toast.error(err?.response?.data?.message);
        });
      }
    }
  };

  const handleSinUpType = (data) => {
    setType(data);
  };

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <div style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-xl-4 col-lg-4 col-md-7">
              <div className="card rounded-1 shadow-sm border-0 ">
                <div className='card-body'>
                  <div className="text-center">
                    <h1 className="h3 fw-bold" style={{ color: '#E91E63' }}>Start Your Journey!</h1>
                  </div>
                  <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border-0 p-1 text-white nav-tab mt-2 w-75  fw-semibold rounded-2 mx-auto my-3' style={{ backgroundColor: '#7627ef', color: '#fff', fontSize: '10px' }}>
                    <button
                      className={`btn rounded-1 border-0 border-0 text-white fw-semibold   ${type === 'student' ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button" aria-selected="true"
                      role='tab' onClick={() => handleSinUpType('student')}
                      style={{ fontSize: '10px' }} >
                      <i className="fa fa-user-graduate  text-white"></i>&nbsp; Student
                    </button>
                    <button
                      className={`btn rounded-1 border-0 border-0  text-white  fw-semibold ${type === 'superAdmin' ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button"
                      aria-selected="false"
                      role='tab' onClick={() => handleSinUpType('superAdmin')}
                      style={{ fontSize: '10px' }}>
                      <i className="fa fa-user-shield  text-white"></i> SAdmin
                    </button>
                    <button
                      className={`btn rounded-1 border-0 border-0 text-white  text-white  fw-semibold ${type === 'agent' ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button"
                      aria-selected="false"
                      role='tab' onClick={() => handleSinUpType('agent')}
                      style={{ fontSize: '10px' }}>
                      <i className="fa fa-user-secret  text-white"></i>&nbsp;Partner
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-user "></i></span>
                      <input type="text" name="name" onChange={handleInputs} className="form-control form-control-user" id="exampleFirstName" placeholder="UserName..." style={{ fontSize: '12px' }} />
                     
                    </div>
                    {errors.name.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i class="fa fa-phone-alt "></i></span>
                      <input type="text" name="mobileNumber" onChange={handleInputs} className="form-control form-control-user" id="exampleLastName" placeholder="Contact No..." style={{ fontSize: '12px' }} />
                     
                    </div>
                    {errors.mobileNumber.required ?
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span> : errors.mobileNumber.valid ?
                          <span className="text-danger form-text profile_error">
                            Enter valid mobile number.
                          </span> : null
                      }
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope "></i></span>
                      <input type="email" name="email" onChange={handleInputs} className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address..." style={{ fontSize: '12px' }} />
                      
                    </div>
                    {errors.email.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.email.valid ? (
                        <div className="text-danger form-text">
                          Enter valid Email Id.
                        </div>
                      ) : null}
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock "></i></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleInputs}
                        className="form-control form-control-user rounded-end"
                        id="exampleInputPassword"
                        placeholder="Password..."
                        style={{ fontSize: '12px' }}
                      />
                      <button
                        type="button"
                        className="btn rounded-1 border-0 btn-transprent border-0"
                        onClick={handleTogglePassword}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                     
                    </div>
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
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-shield-alt "></i></span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        onChange={handleInputs}
                        className="form-control form-control-user rounded-end"
                        id="exampleRepeatPassword"
                        placeholder="Confirm Password..."
                        style={{ fontSize: '12px' }}
                      />
                      <button
                        type="button"
                        className="btn rounded-1 border-0 btn-transprent border-0"
                        onClick={handleToggleConfirmPassword}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    
                    </div>
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
                    <div className='d-flex justify-content-center'>
                      <button type="submit" className="btn rounded-1 border-0  w-75  fw-semibold" style={{ backgroundColor: '#fe5722', color: '#fff', fontSize: '10px' }}><i className="fa fa-user-plus  text-white"></i> Sign Up</button>
                    </div>
                    <div className="alternative-login d-flex flex-row align-items-center justify-content-center" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                      <span>or</span>
                      <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                    </div>
                    <div className='d-flex justify-content-center'>
                      <Link to='/' className="btn rounded-1 border-0 btn-google btn-user btn-block  border-0 fw-semibold  w-75" style={{ backgroundColor: '#4285F4', color: '#fff', fontSize: '10px' }}>
                        <i className="fab fa-google fa-fw" /> Login with Google
                      </Link>
                    </div>
                    <div className='row g-3 my-2 text-center'>
                      <div className="col-md-6 col-sm-12">
                        <Link to='/ForgotPassword' className="btn rounded-1 border-0  border-0  fw-semibold px-4 " style={{ backgroundColor: '#f0f0f0', color: '#231f20', fontSize: '9px' }} ><i className="fa fa-key  "></i> Forgot Password</Link>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <Link to='/' className="btn rounded-1 border-0  px-4  fw-semibold " style={{ backgroundColor: '#008080', color: '#fff', fontSize: '9px' }} > <i className="fa fa-user-circle  text-white"></i> Member Login</Link>
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
  );
};

export default Register;
