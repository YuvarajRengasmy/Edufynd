import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../Utils/Validation';
import { getLoginType, saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/login';
const Login = () => {

  const initialState = {
    email: "",
    password: ""
}
const initialStateErrors = {
    email: { required: false, valid: false },
    password: { required: false, valid: false },
}
const [inputs, setInputs] = useState(initialState)
const [errors, setErrors] = useState(initialStateErrors)
const [submitted, setSubmitted] = useState(false);
const navigate = useNavigate()

const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.email === "") {
        error.email.required = true;
    }
    if (data.password === "") {
        error.password.required = true;
    }
    if (!isValidPassword(data.password)) {
        error.password.valid = true;
    }
    if (!isValidEmail(data.email)) {
        error.email.valid = true;
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
        loginUser(inputs).then(res => {
            let token = res?.data?.result?.token;
            let loginType = res?.data?.result?.loginType
            if (loginType === 'student') {
                let studentId = res?.data?.result?.studentDetails?._id;
                let data = {
                    token: token, studentId: studentId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Student");
                }
            }
            if (loginType === 'agent') {
                let agentId = res?.data?.result?.agentDetails?._id;
                let data = {
                    token: token, agentId: agentId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/AgentHome");
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
    const type = getLoginType()
    if (type === 'student') { return <Navigate to="/Student" /> }
    else if (type === 'agent') { return <Navigate to="/AgentHome" /> }
    else { return <Navigate to="/" /> }
}

  return (
    <>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form className="user" onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input type="email" name="email" onChange={handleInputs} className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
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
                            <input type="password" name="password" onChange={handleInputs} autoComplete="off" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
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
                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input type="checkbox" className="custom-control-input" id="customCheck" />
                              <label className="custom-control-label" htmlFor="customCheck">Remember
                                Me</label>
                            </div>
                          </div>
                          <div className='d-flex justify-content-center'>
                            <button type="submit" className="w-75 p-2 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Login with email</button>
                        </div>
                          <hr />
                          <a href="/Dashboard" className="btn btn-google btn-user btn-block">
                            <i className="fab fa-google fa-fw" /> Login with Google
                          </a>
                        </form>
                        <hr />
                        <div className="text-center">
                          <a className="small text-decoration-none" href="/ForgotPassword">Forgot Password?</a>
                        </div>
                        <div className="text-center">
                          <a className="small text-decoration-none" href="/Register">Create an Account!</a>
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
    </>
  );
};
export default Login;
