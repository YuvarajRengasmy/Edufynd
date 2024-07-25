import React, { useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { saveStudent } from '../../api/student';
import { saveAgent } from '../../api/agent';
import { saveSuperAdmin } from '../../api/superAdmin';
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
        saveStudent(inputs).then(res => {
          let token = res?.data?.result?.token;
          let studentId = res?.data?.result?.studentDetails?._id;
          let loginType = res?.data?.result?.loginType;
          let data = {
            token: token, studentId: studentId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/Student");
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
            navigate("/Dashboard");
          }
          toast.success(res?.data?.message);
        }).catch((err) => {
          toast.error(err?.response?.data?.message);
        });
      }
      if (type === 'agent') {
        saveAgent(inputs).then(res => {
          let token = res?.data?.result?.token;
          let agentId = res?.data?.result?.agentDetails?._id;
          let loginType = res?.data?.result?.loginType;
          let data = {
            token: token, agentId: agentId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/AgentHome");
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
      <div style={{ backgroundColor: '#f5f5f5', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 align-self-center">
              <div className="card my-1 border-0 ">
                <div className='card-body p-4'>
                  <div className="text-center">
                    <h1 className="h3 fw-bold" style={{ color: '#E91E63' }}>Start Your Journey!</h1>
                  </div>
                  <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border-0 p-1 text-white nav-tab mt-2 text-uppercase fw-bold rounded-2 mx-auto my-3' style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '10px' }}>
                    <button
                      className={`btn border-0 text-white fw-bold text-uppercase px-3 py-2 ${type === 'student' ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button" aria-selected="true"
                      role='tab' onClick={() => handleSinUpType('student')}
                      style={{ fontSize: '10px' }} >
                      <i className="fa fa-user-graduate nav-icon text-white"></i> Student
                    </button>
                    <button
                      className={`btn border-0 px-3 py-2 text-white text-uppercase fw-bold ${type === 'superAdmin' ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button"
                      aria-selected="false"
                      role='tab' onClick={() => handleSinUpType('superAdmin')}
                      style={{ fontSize: '10px' }}>
                      <i className="fa fa-user-shield nav-icon text-white"></i> SAdmin
                    </button>
                    <button
                      className={`btn border-0 text-white px-3 py-2 text-white text-uppercase fw-bold ${type === 'agent' ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button"
                      aria-selected="false"
                      role='tab' onClick={() => handleSinUpType('agent')}
                      style={{ fontSize: '10px' }}>
                      <i className="fa fa-user-secret nav-icon text-white"></i> Agent
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-user nav-icon"></i></span>
                      <input type="text" name="name" onChange={handleInputs} className="form-control form-control-user" id="exampleFirstName" placeholder="UserName..." style={{ fontSize: '12px' }} />
                      {errors.name.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i class="fa fa-phone-alt nav-icon"></i></span>
                      <input type="text" name="mobileNumber" onChange={handleInputs} className="form-control form-control-user" id="exampleLastName" placeholder="Contact No..." style={{ fontSize: '12px' }} />
                      {errors.mobileNumber.required ?
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span> : errors.mobileNumber.valid ?
                          <span className="text-danger form-text profile_error">
                            Enter valid mobile number.
                          </span> : null
                      }
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope nav-icon"></i></span>
                      <input type="email" name="email" onChange={handleInputs} className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address..." style={{ fontSize: '12px' }} />
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
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-lock nav-icon"></i></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={handleInputs}
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password..."
                        style={{ fontSize: '12px' }}
                      />
                      <button
                        type="button"
                        className="btn btn-transprent border-0"
                        onClick={handleTogglePassword}
                        style={{ position: 'absolute', right: '0px', top: '10px',transform:'translate(-25%,-25%)' }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
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
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1"><i className="fa fa-shield-alt nav-icon"></i></span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        onChange={handleInputs}
                        className="form-control form-control-user"
                        id="exampleRepeatPassword"
                        placeholder="Confirm Password..."
                        style={{ fontSize: '12px' }}
                      />
                      <button
                        type="button"
                        className="btn btn-transprent border-0"
                        onClick={handleToggleConfirmPassword}
                        style={{ position: 'absolute', right: '0px', top: '10px',transform:'translate(-25%,-25%)' }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
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
                    <div className='d-flex justify-content-center'>
                      <button type="submit" className="btn btn-sm w-75 px-4 py-2 text-uppercase fw-semibold" style={{ backgroundColor: '#fe5722', color: '#fff', fontSize: '10px' }}><i className="fa fa-user-plus nav-icon text-white"></i> Sign Up</button>
                    </div>
                    <div className="alternative-login d-flex flex-row align-items-center justify-content-center" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                      <span>or</span>
                      <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                    </div>
                    <div className='d-flex justify-content-center'>
                      <Link to='/' className="btn btn-google btn-user btn-block btn-sm border-0 fw-bold text-uppercase px-4 py-2 w-75" style={{ backgroundColor: '#4285F4', color: '#fff', fontSize: '10px' }}>
                        <i className="fab fa-google fa-fw" /> Login with Google
                      </Link>
                    </div>
                    <div className='row g-3 my-2 text-center'>
                      <div className="col-md-6 col-sm-12">
                        <Link to='/ForgotPassword' className="btn btn-sm border-0 text-uppercase fw-bold px-4 py-2" style={{ backgroundColor: '#f0f0f0', color: '#231f20', fontSize: '9px' }} ><i className="fa fa-key nav-icon "></i> Forgot Password</Link>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <Link to='/' className="btn btn-sm px-4 text-uppercase fw-bold py-2" style={{ backgroundColor: '#008080', color: '#fff', fontSize: '9px' }} > <i className="fa fa-user-circle nav-icon text-white"></i> Member Login</Link>
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
