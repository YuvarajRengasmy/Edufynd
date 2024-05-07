import React, { useState } from "react";
const Register = () => {
  const initialState = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    conformPassword
}
const initialStateErrors = {
    name: { required: false },
    email: { required: false, valid: false },
    mobile: { required: false, valid: false },
    password: { required: false, valid: false },
    conformPassword: { required: false, valid: false }
}
const [inputs, setInputs] = useState(initialState)
const [errors, setErrors] = useState(initialStateErrors)
const [submitted, setSubmitted] = useState(false);
const [type, setType] = useState('students');


const navigate = useNavigate()





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
    if (data.conformPassword === "") {  
        error.conformPassword.required = true;
    }
    if (data.mobile === "") {
        error.mobile.required = true;
    }
    if (!isValidPassword(data.password)) {
        error.password.valid = true;
    }
    if (!isValidPassword(data.conformPassword)) {
      error.conformPassword.valid = true;
  }
    if (!isValidEmail(data.email)) {
        error.email.valid = true;
    }
    if (!isValidPhone(data.mobile)) {
        error.mobile.valid = true;
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
        if (type === 'student') {
            saveMaster(inputs).then(res => {
                let token = res?.data?.result?.token;
                let masterId = res?.data?.result?.studentDetails?._id;
                let loginType = res?.data?.result?.loginType
                let data = {
                    token: token, masterId: masterId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Dashboard");
                }
                toast.success(res?.data?.message);
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
        if (type === 'user') {
            saveUser(inputs).then(res => {
                let token = res?.data?.result?.token;
                let userId = res?.data?.result?.userDetails?._id;
                let loginType = res?.data?.result?.loginType
                let data = {
                    token: token, userId: userId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/UserHome");
                }
                toast.success(res?.data?.message);
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
        if (type === 'company') {
            saveCompany(inputs).then(res => {
                let token = res?.data?.result?.token;
                let companyId = res?.data?.result?.companyDetails?._id;
                let loginType = res?.data?.result?.loginType
                let data = {
                    token: token, companyId: companyId, loginType: loginType
                }
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/Home");
                }
                toast.success(res?.data?.message);
            })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }
}

const handleSinUpType = (data) => {
    setType(data)
}

  return (
    <>
      <div className="bg-gradient-primary">
        <div className="container">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-block bg-register-image" />
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className='navbar-brand d-flex justify-content-center align-items-center gap-3 border p-1 rounded-5 nav-tab mt-2 w-50 mx-auto' style={{ backgroundColor: '#edf0f5' }}>
                      <button
                        className={`btn rounded-5 border-0 fw-bold signup-button ${activeTab === 'student' ? 'active bg-white text-success' : 'bg-white text-secondary'}`}
                        type="button"
                        onClick={() => handleTabClick('student')}
                        style={{ fontSize: '1rem' }}
                      >
                        Student
                      </button>
                      <button
                        className={`btn rounded-5 border-0 fw-bold signup-button ${activeTab === 'agent' ? 'active bg-white text-success' : 'bg-white text-secondary'}`}
                        type="button"
                        onClick={() => handleTabClick('agent')}
                        style={{ fontSize: '1rem' }}
                      >
                        Agent
                      </button>
                    </div>
                    <form className="user mt-5">
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" />
                        </div>
                        <div className="col-sm-6">
                          <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Mobile Number" />
                        </div>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                        </div>
                        <div className="col-sm-6">
                          <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                        </div>
                      </div>
                      <a href="/Dashboard" className="btn btn-primary btn-user btn-block">
                        Register Account
                      </a>
                      <hr />
                      <a href="/Dashboard" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw" /> Register with Google
                      </a>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small text-decoration-none" href="/ForgotPassword">Forgot Password?</a>
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
    </>
  );
};
export default Register;
