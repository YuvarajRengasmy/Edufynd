import React, { useState } from "react";
const resetPassword = () => {
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
                        <form className="user">
                          <div className="form-group">
                            <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                          </div>
                          <a href="/" className="btn btn-primary btn-user btn-block text-decoration-none">
                            Reset Password
                          </a>
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
export default resetPassword;
