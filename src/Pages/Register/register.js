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
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for password visibility

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
  const [type, setType] = useState('student');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    // Required Fields Validation
    for (const key in data) {
      if (data[key] === "" && key !== "confirmPassword") {
        error[key].required = true;
      }
    }

    // Validation Rules
    if (!isValidEmail(data.email)) error.email.valid = true;
    if (!isValidPhone(data.mobileNumber)) error.mobileNumber.valid = true;
    if (!isValidPassword(data.password)) error.password.valid = true;
    if (data.password !== data.confirmPassword) error.confirmPassword.valid = true;

    return error;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };

  const handleErrors = (obj) => {
    return !Object.values(obj).every(({ required, valid }) => !required && !valid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      const apiMap = {
        student: saveStudent,
        superAdmin: saveSuperAdmin,
        agent: saveAgent
      };
      const apiCall = apiMap[type];

      apiCall(inputs).then(res => {
        const { token, studentDetails, superAdminDetails, agentDetails, loginType } = res?.data?.result || {};
        const idMap = {
          student: studentDetails?._id,
          superAdmin: superAdminDetails?._id,
          agent: agentDetails?._id
        };
        const id = idMap[type];
        saveToken({ token, [`${type}Id`]: id, loginType });
        if (isAuthenticated()) {
          navigate(`/${type === 'student' ? 'Student' : type === 'superAdmin' ? 'Dashboard' : 'AgentHome'}`);
        }
        toast.success(res?.data?.message);
      }).catch(err => {
        toast.error(err?.response?.data?.message);
      });
    }
  };

  const handleSignUpType = (data) => {
    setType(data);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-4 col-lg-4 col-md-7 align-self-center">
            <div className="card my-1 border-0">
              <div className='card-body p-4'>
                <div className="text-center">
                  <h1 className="h3 fw-bold" style={{ color: '#E91E63' }}>Start Your Journey!</h1>
                </div>
                <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border-0 p-1 text-white nav-tab mt-2 text-uppercase fw-bold rounded-2 mx-auto my-3' style={{ backgroundColor: '#0056b3', color: '#fff', fontSize: '10px' }}>
                  {['student', 'superAdmin', 'agent'].map(userType => (
                    <button
                      key={userType}
                      className={`btn border-0 px-3 py-2 text-white text-uppercase fw-bold ${type === userType ? 'active bg-primary bg-gradient text-dark signup-button' : ''}`}
                      type="button"
                      aria-selected={type === userType}
                      role='tab'
                      onClick={() => handleSignUpType(userType)}
                      style={{ fontSize: '10px' }}
                    >
                      <i className={`fa fa-${userType === 'student' ? 'user-graduate' : userType === 'superAdmin' ? 'user-shield' : 'user-secret'} nav-icon text-white`} />
                      {userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSubmit}>
                  {['name', 'mobileNumber', 'email'].map(field => (
                    <div className="input-group mb-3" key={field}>
                      <span className="input-group-text" id="basic-addon1"><i className={`fa fa-${field === 'name' ? 'user' : field === 'mobileNumber' ? 'phone' : 'envelope'} nav-icon`}></i></span>
                      <input
                        type="text"
                        name={field}
                        onChange={handleInputs}
                        className="form-control form-control-user"
                        placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + '...'}
                        style={{ fontSize: '12px' }}
                      />
                      {errors[field].required && <div className="text-danger form-text">This field is required.</div>}
                      {errors[field].valid && field !== 'confirmPassword' && <div className="text-danger form-text">Enter valid {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}.</div>}
                    </div>
                  ))}
                  {['password', 'confirmPassword'].map(field => (
                    <div className="input-group mb-3" key={field}>
                      <span className="input-group-text" id="basic-addon1"><i className={`fa fa-${field === 'password' ? 'lock' : 'shield-alt'} nav-icon`}></i></span>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        name={field}
                        onChange={handleInputs}
                        className="form-control form-control-user"
                        placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + '...'}
                        style={{ fontSize: '12px' }}
                      />
                      <button
                        type="button"
                        className="btn border-0"
                        onClick={togglePasswordVisibility}
                        style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)' }}
                      >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {errors[field].required && <div className="text-danger form-text">This field is required.</div>}
                      {errors[field].valid && field !== 'confirmPassword' && <div className="text-danger form-text">Enter valid {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}.</div>}
                      {errors[field].valid && field === 'confirmPassword' && <div className="text-danger form-text">Passwords do not match.</div>}
                    </div>
                  ))}
                  <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-sm w-75 px-4 py-2 text-uppercase fw-semibold" style={{ backgroundColor: '#fe5722', color: '#fff', fontSize: '10px' }}><i class="fa fa-user-plus nav-icon text-white"></i>Sign Up</button>
                  </div>
                  <div className="d-flex align-items-center my-3">
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
                      <Link to='/ForgotPassword' className="btn btn-sm border-0 text-uppercase fw-bold px-4 py-2" style={{ backgroundColor: '#f0f0f0', color: '#231f20', fontSize: '9px' }}><i className="fa fa-key nav-icon"></i>Forgot Password</Link>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Link to='/' className="btn btn-sm px-4 text-uppercase fw-bold py-2" style={{ backgroundColor: '#008080', color: '#fff', fontSize: '9px' }}><i className="fa fa-user-circle nav-icon text-white"></i>Member Login</Link>
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
};

export default Register;
