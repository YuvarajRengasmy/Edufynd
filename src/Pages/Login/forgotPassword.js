import React, { useState } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { isValidEmail } from '../../Utils/Validation';

import { toast } from 'react-toastify';
import {forgotPassword } from '../../api/login';
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  let initialStateErrors = {
    email: { required: false, valid: false },
};



const [errors, setErrors] = useState(initialStateErrors);

const [inputs, setInputs] = useState({
    email: "",
});
const [submitted, setSubmitted] = useState(false)

const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.email === "") {
        error.email.required = true;
    }
    if (!isValidEmail(data.email)) {
        error.email.valid = true
    }
    return error
}

const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
        var data = {
            email: inputs.email,
            link: "https://crm.edufynd.in/ResetPassword?id=",
        };
        forgotPassword(data)
            .then((res) => {
                toast.success(res?.data?.message);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
            });
    }
};




  return (
    <>
      <div style={{ backgroundColor: '#f5f5f5', fontFamily: 'Plus Jakarta Sans', fontSize: '14px'}}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 align-self-center">
              <div className="card border-0 my-5">
                <div className="card-body p-5">
                
                 
                  
                   
                     
                        <div className="text-center">
                          <h1 className="h4 fw-bold mb-2 " style={{color:'#8E24AA'}} >Forgot Your Password?</h1>
                          <p className="mb-4 text-capitalize" style={{textAlign:'justify'}}>We get it, stuff happens. Just enter your email address below
                            and we'll send you a link to reset your password!</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope nav-icon"></i></span>
                            <input type="text" className="form-control " name="email" onChange={handleInputs} id="exampleInputEmail" aria-describedby="emailHelp" placeholder=" Email Address..." style={{fontSize:'12px'}} />
                            {errors.email.required ? (
                                <span className="text-danger form-text">
                                    This field is required.
                                </span>
                            ) : errors.email.valid ? (
                                <span className="text-danger form-text">
                                    Enter valid Email Id.
                                </span>
                            ) : null}
                         
                          </div>
                          <button type="submit" className="btn btn-sm border-0 text-uppercase fw-bold px-4 py-2 btn-user btn-block" style={{color:'#fff',backgroundColor:'#231f20',fontSize:'12px'}}>
                          <i class="fa fa-sync-alt nav-icon text-white"></i> Send Reset email
                          </button>
                       
                        <hr />
                        <div className='row g-3 my-2 text-center '>
                        <div className="text-center">
                          <Link to="/Register" className="small text-decoration-none" ><i class="fa fa-user-circle nav-icon"></i> Member Login!</Link>
                        </div>
                        <div className="text-center">
                          <Link to="/" className="small text-decoration-none"><i class="fa fa-sign-in-alt nav-icon"></i> Returning User? Log In!</Link>
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
export default ForgotPassword;
