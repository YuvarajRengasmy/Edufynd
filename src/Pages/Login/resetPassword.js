import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isValidPassword } from '../../Utils/Validation';
import { resetPassword } from '../../api/login';
import { toast } from 'react-toastify';
const ResetPassword = () => {
  const initialState = {
    password: "",
    confirmPassword: "",
};
const initialStateErrors = {
  password: { required: false, valid: false },
  confirmPassword: { required: false, valid: false },
};

  const location = useLocation()
  const resetId = new URLSearchParams(location.search).get('id')
  const navigate = useNavigate()
  
  const [inputs, setInputs] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  

  const handleValidation = (data) => {
      let error = initialStateErrors;
      if (data.password === "") {
          error.password.required = true;
      }
      if (data.confirmPassword === "") {
          error.confirmPassword.required = true;
      }
      if (!isValidPassword(data.password)) {
          error.password.valid = true;
      }
      if (data.confirmPassword !== data.password) {
          error.confirmPassword.valid = true;
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
              if (prop.required === true || prop.valid === true || prop.confirm === true) {
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
              _id: resetId,
              password: inputs.password,
              confirmPassword: inputs.confirmPassword
          }
          resetPassword(data)
              .then((res) => {
                  toast.success(res?.data?.message);
                  navigate('/')
              })
              .catch((err) => {
                  toast.error(err?.response?.data?.message);
              });
      }
  };



  return (
    <>
      
        <div className="container-fluid"style={{ backgroundColor: '#f5f5f5', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-4 col-lg-4 col-md-7 align-items-center">
              <div className="card border-0 my-5 ">
                <div className="card-body p-4">
                 
                  
                    
                    
                        <div className="text-center my-3">
                          <h1 className="h3 fw-semibols mb-2">Reset Your Password?</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="fa fa-lock "></i> </span>
                            
                            <input type="password" className="form-control  "  id="exampleInputPassword1" onChange={handleInputs} placeholder='Enter Password' name='password' style={{fontSize:'12px'}} aria-describedby="basic-addon1"
 />
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
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="fa fa-check "></i></span>
                           
                            <input type="password" className="form-control  " id="PasswordConfirmation" 
aria-describedby="basic-addon1" onChange={handleInputs} placeholder='Re-Enter Password' name='confirmPassword' style={{fontSize:'12px'}} />
                            {errors.confirmPassword.required ? (
                                <span className="text-danger form-text">
                                    Confirm password is required.
                                </span>
                            ) :
                                errors.confirmPassword.confirm ? (
                                    <span className="text-danger form-text">
                                        Password and confirm password doesn't match.
                                    </span>
                                ) : null}
                        </div>
                        <div className='d-flex justify-content-center gap-3 mb-3'>
                            <Link to='/' type="button" className=" w-75 btn btn-sm border-0 fw-bold text-uppercase px-4 py-2 " style={{ backgroundColor: '#e0e0e0',color:'#333333' }}>Back</Link>
                            <button type="submit" className=" w-75 btn btn-sm border-0 text-white fw-bold text-uppercase px-4 py-2 " style={{ backgroundColor: '#4caf50' }}>Submit</button>
                        </div>
                    </form>
                    <div className="alternative-login d-flex flex-row align-items-center justify-content-center" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                    <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                    <span>or</span>
                    <hr className="border-0 border-top border-dark" style={{ margin: '0 1rem', flexGrow: '1', borderTop: '1px solid #ccc' }} />
                  </div>
                        <div className="text-center">
                          <a className="small text-decoration-none" href="./Register">Create an Account!</a>
                        </div>
                        <div className="text-center">
                          <a className="small text-decoration-none" href="/">Already have an account? Login!</a>
                        </div>
                      
                   
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};
export default ResetPassword;
