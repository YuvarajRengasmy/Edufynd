import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../Utils/Validation';
import { saveToken, getLoginType } from '../../Utils/storage';
import FacebookLogin from 'react-facebook-login';
import { isAuthenticated } from '../../Utils/Auth';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/login';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: { required: false, valid: false }, password: { required: false, valid: false } });
  const [submitted, setSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let newErrors = {
      email: {
        required: data.email === "",
        valid: !isValidEmail(data.email)
      },
      password: {
        required: data.password === "",
        valid: !isValidPassword(data.password)
      }
    };
    return newErrors;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    if (submitted) {
      const newErrors = handleValidation({ ...inputs, [name]: value });
      setErrors(newErrors);
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
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
        loginUser(inputs).then(res => {
            let token = res?.data?.result?.token;
            let loginType = res?.data?.result?.loginType;
            if (loginType === 'student') {
                let studentId = res?.data?.result?.studentDetails?._id;
                let data = {
                    token: token, studentId: studentId, loginType: loginType
                };
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/student_dashboard");
                    window.location.reload(); // Refresh the page
                }
            }
            if (loginType === 'superAdmin') {
                let superAdminId = res?.data?.result?.superAdminDetails?._id;
                let data = {
                    token: token, superAdminId: superAdminId, loginType: loginType
                };
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/dashboard");
                    window.location.reload(); // Refresh the page
                }
            }
            if (loginType === 'agent') {
                let agentId = res?.data?.result?.agentDetails?._id;
                let data = {
                    token: token, agentId: agentId, loginType: loginType
                };
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/AgentHome");
                    window.location.reload(); // Refresh the page
                }
            }
            if (loginType === 'admin') {
              let adminId = res?.data?.result?.adminDetails?._id;
              let data = {
                  token: token, adminId: adminId, loginType: loginType
              };
              saveToken(data);
              if (isAuthenticated()) {
                  navigate("/AdminDashboard");
                  window.location.reload(); // Refresh the page
              }
          }
            if (loginType === 'staff') {
              let staffId = res?.data?.result?.staffDetails?._id;
              let data = {
                  token: token, staffId: staffId, loginType: loginType
              };
              saveToken(data);
              if (isAuthenticated()) {
                  navigate("/staff_dashboard");
                  window.location.reload(); // Refresh the page
              }
          }
            toast.success(res?.data?.message);
        })
        .catch((err) => {
            toast.error(err?.response?.data?.message);
        });
    }
  }

  if (isAuthenticated()) {
    const type = getLoginType();
    if (type === 'student') { return <Navigate to="/Student" /> }
    else if (type === 'superAdmin') { return <Navigate to="/Dashboard" /> }
    else if (type === 'staff') { return <Navigate to="/ViewProfile" /> }
    else if (type === 'admin') { return <Navigate to="/AdminDashboard" /> }
    else  { return <Navigate to="/AgentHome" /> }
  }

  const responseFacebook = (response) => {
    console.log(response);
    // You can handle the response here
    // like storing user data, redirecting, etc.
  };
  return (
    <div style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="container-fluid ">
        <div className="row  justify-content-center align-items-center min-vh-100">
          <div className="col-xl-4 col-lg-5 col-md-7 ">
            <div className="card border-0 rounded-1 shadow-sm p-4">
              <div className="card-body ">
                <div className="text-center my-2">
                  <h1 className="h3 fw-bold" style={{ color: '#E91E63' }}>Member Login!</h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><i className="fa fa-user "></i></span>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInputs}
                      className="form-control"
                      id="exampleInputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Email Address..."
                      style={{ fontSize: '12px' }}
                    />
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
                    <span className="input-group-text " id="basic-addon1"><i className="fa fa-lock  "></i></span>
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      onChange={handleInputs}
                      autoComplete="off"
                      className="form-control rounded-end"
                      id="exampleInputPassword"
                      placeholder="Password..."
                      style={{ fontSize: '12px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
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
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
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
                  <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                      <input type="checkbox" className="form-check-input" id="customCheck" />
                      <label className="form-check-label fw-semibold" htmlFor="customCheck">Remember Me</label>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button type="submit" className="w-75 btn  rounded-1  border-0 fw-semibold  " style={{ backgroundColor: '#fe5722', color: '#fff', fontSize: '10px' }}><i className="fa fa-sign-in-alt  text-white"></i>&nbsp;Login</button>
                  </div>
                  <div className="alternative-login d-flex flex-row align-items-center justify-content-center" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                    <span>or</span>
                    <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                  </div>
                  <div className='d-flex justify-content-center'>
                    <Link to='/' className="btn btn-google btn-user btn-block rounded-1  border-0 fw-semibold h-25   w-75" style={{ backgroundColor: '#4285F4', color: '#fff', fontSize: '10px' }}>
                      <i className="fab fa-google fa-fw" /> &nbsp;Login with Google
                    </Link>
                    <FacebookLogin
                    appId="521433973800512" 
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    />
                  </div>
                  <div className="row g-3 text-center my-2">
                    <div className="col-md-6 col-sm-12">
                      <Link to='/ForgotPassword'  className="btn  border-0 rounded-1   fw-semibold " style={{ backgroundColor: '#f0f0f0', color: '#231f20',  }}><i className="fa fa-key "></i>&nbsp;Forgot Password</Link>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <Link to='/Register'  className="btn  px-4  fw-semibold rounded-1  " style={{ backgroundColor: '#34A853', color: '#fff' }}><i className="fa fa-plus-circle  text-white"></i>&nbsp;Create User!</Link>
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

export default Login;
