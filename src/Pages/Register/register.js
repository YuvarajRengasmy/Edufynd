import React, { useState } from "react";
const Register = () => {
  const [activeTab, setActiveTab] = useState("student");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
                          <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" />
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
