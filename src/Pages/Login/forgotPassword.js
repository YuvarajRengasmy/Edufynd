import React, { useState } from "react";
import { Link } from "react-router-dom";
const forgotPassword = () => {
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
                        <form >
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope nav-icon"></i></span>
                            <input type="email" className="form-control " id="exampleInputEmail" aria-describedby="emailHelp" placeholder=" Email Address..." style={{fontSize:'12px'}} />
                          </div>
                          <a href="/" className="btn btn-sm border-0 text-uppercase fw-bold px-4 py-2 btn-user btn-block" style={{color:'#fff',backgroundColor:'#231f20',fontSize:'12px'}}>
                          <i class="fa fa-sync-alt nav-icon text-white"></i>  Reset Password
                          </a>
                       
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
export default forgotPassword;
