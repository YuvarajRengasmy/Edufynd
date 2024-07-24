import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../Utils/Validation';
import { saveToken, getLoginType } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/login';
import { Link } from "react-router-dom";

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
                    token: token, studentId:studentId , loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Student");
                }
            }
            if (loginType === 'superAdmin') {
                let superAdminId = res?.data?.result?.superAdminDetails?._id;
                let data = {
                    token: token, superAdminId: superAdminId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Dashboard");
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
    else if (type === 'superAdmin') { return <Navigate to="/Dashboard" /> }
    else { return <Navigate to="/AgentHome" /> }
}
  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="container-fluid p-4">
          <div className="row  justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 align-self-center">
              <div className="card border-0 my-5  ">
                
               <div className="card-body p-4">
               <div className="text-center my-2 ">
                          <h1 className="h3  fw-semibold">Welcome Back!</h1>
                        </div>



                        <form className="user" onSubmit={handleSubmit}>
                        <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1"><i class="fa fa-user nav-icon "></i></span>
                            <input type="email" name="email" onChange={handleInputs} className="form-control  " id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Email Address..." style={{fontSize:'12px'}} />
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
                          <div class="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1"><i class="fa fa-lock nav-icon"></i></span>
                            <input type="password" name="password" onChange={handleInputs} autoComplete="off" className="form-control     " id="exampleInputPassword" placeholder="Password..." style={{fontSize:'12px'}} />
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
                              <input type="checkbox" className="form-check-input" id="customCheck" />
                              <label className="form-check-label fw-semibold" htmlFor="customCheck">Remember
                                Me</label>
                            </div>
                          </div>
                          <div className='d-flex justify-content-center'>
                            <button type="submit" className="w-75 btn btn-sm   border-0  fw-bold text-uppercase px-4 py-2" style={{ backgroundColor: '#fe5722',color:'#fff',fontSize:'10px' }}><i class="fa fa-sign-in-alt nav-icon text-white"></i>Login </button>
                          </div>
      
                          <div class="alternative-login d-flex flex-row align-items-center justify-content-center" style={{marginTop:'1rem',marginBottom:'1rem'}}>
                <hr className="border-0 border-top border-dark" style={{margin:'0 1rem',flexGrow:'1',borderTop:'1px solid #ccc'}}/>
                <span>or</span>
                <hr className="border-0 border-top border-dark " style={{margin:'0 1rem',flexGrow:'1',borderTop:'1px solid #ccc'}}/>
              </div>
              <div className='d-flex justify-content-center'>
                          <Link to='/'  className="btn btn-google btn-user btn-block  btn-sm   border-0  fw-bold text-uppercase  px-4 py-2 w-75" style={{backgroundColor:'#4285F4',color:'#fff',fontSize:'10px'}}>
                            <i className="fab fa-google fa-fw" /> Login with Google
                          </Link>
                          </div>
                          <div className="row g-3 text-center my-2">
                         <div className="col-md-6 col-sm-12">
                          <Link to='/ForgotPassword' className="btn btn-sm   border-0 text-uppercase  fw-bold px-4 py-2" style={{backgroundColor:'#f0f0f0',color:'#231f20',fontSize:'9px'}} ><i class="fa fa-key nav-icon"></i>Forgot Password</Link>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <Link to='/Register' className="btn btn-sm  px-4 text-uppercase fw-bold py-2" style={{backgroundColor:'#34A853',color:'#fff',fontSize:'9px'}}><i class="fa fa-plus-circle nav-icon text-white"></i>Create Account!</Link>
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

export default Login;
