import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../Utils/Validation';
import { saveToken, getLoginType } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/login';

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: { required: false, valid: false }, password: { required: false, valid: false } });
  const [submitted, setSubmitted] = useState(false);
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
                    navigate("/Student");
                }
            } else if (loginType === 'superAdmin') {
                let superAdminId = res?.data?.result?.superAdminDetails?._id;
                let data = {
                    token: token, superAdminId: superAdminId, loginType: loginType
                };
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Dashboard");
                }
            } else if (loginType === 'agent') {
                let agentId = res?.data?.result?.agentDetails?._id;
                let data = {
                    token: token, agentId: agentId, loginType: loginType
                };
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/AgentHome");
                }
            }
            toast.success(res?.data?.message);
        }).catch((err) => {
            toast.error(err?.response?.data?.message);
        });
    }
  };

  if (isAuthenticated()) {
    const type = getLoginType();
    if (type === 'student') { return <Navigate to="/Student" /> }
    else if (type === 'superAdmin') { return <Navigate to="/Dashboard" /> }
    else { return <Navigate to="/AgentHome" /> }
  }

  return (
    <div className="bg-gradient-white" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-12">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 col-md-6 d-none d-md-block bg-login-image">
                    <img src="https://media.istockphoto.com/id/1312082686/vector/educational-tourism-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=ktT4aECl2TPhlA2Zoq-f-UtRo5AgHicn9IsTXBXracY=" className="img-fluid" alt="Login" />
                  </div>
                  <div className="col-lg-6 col-md-6 bg-primary">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h3 text-gray-900 mb-4 fw-semibold">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input type="email" name="email" onChange={handleInputs} className="form-control form-control-user border-0 rounded-5 px-4" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
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
                        <div className="form-group">
                          <input type="password" name="password" onChange={handleInputs} autoComplete="off" className="form-control form-control-user px-4  border-0 rounded-5" id="exampleInputPassword" placeholder="Password" />
                          {errors.password.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : errors.password.valid ? (
                            <div className="text-danger form-text">
                              A minimum 8 characters password contains a <br />
                              combination of <strong>uppercase, lowercase, </strong> special character and <strong>number</strong>.
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                          </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                          <button type="submit" className="w-75 p-2 btn rounded-5 border-0 text-white fw-semibold" style={{ backgroundColor: '#fe5722' }}>Login </button>
                        </div>
                        <hr />
                        <a href="/" className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw" /> Login with Google
                        </a>
                      </form>
                      <hr />
                      <div className="row g-3 text-center">
                        <div className="col-md-6 col-sm-12">
                          <a className="btn-sm btn text-white border-0 rounded-pill px-3 py-2" href="/ForgotPassword" style={{backgroundColor:'#fe5722',color:'white',}}>Forgot Password?</a>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <a className="btn btn-sm btn-outline-light rounded-pill btn-transparent px-3 py-2" href="/Register">Create an Account!</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
