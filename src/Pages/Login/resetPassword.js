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
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-password-image" />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-2">Reset Your Password?</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control rounded-3 p-3 " id="exampleInputPassword1" onChange={handleInputs} placeholder='Enter Password' name='password' />
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
                        <div className="mb-3">
                            <label htmlFor="PasswordConfirmation" className="form-label fw-bold">Password Confirmation</label>
                            <input type="password" className="form-control rounded-3 p-3 " id="PasswordConfirmation" onChange={handleInputs} placeholder='Re-Enter Password' name='confirmPassword' />
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
                            <Link to='/' type="button" className="w-100 p-2 btn rounded-5 text-dark fw-bold btn-outline-dark" style={{ backgroundColor: '#ffffff' }}>Back</Link>
                            <button type="submit" className="w-100 p-2 btn rounded-5 text-white fw-bold" style={{ backgroundColor: '#10429b' }}>Submit</button>
                        </div>
                    </form>
                        <hr />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
