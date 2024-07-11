import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import {getallClientModule} from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";



function EditCommission() {


  
    return (
        <>
        <div  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                  
                </nav>
            
            <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                <div className="content-header ">
                    <div className="content container-fluid ">
                        <form >
                            <div className="row">            
                  <div className="col-xl-12 ">
                  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'> Edit Commission Details</h5>
                </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                    <label style={{ color: "#231F20" }}>
                                        {" "}
                                        Country<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                        name="businessName"
                                        
                                        className="form-control "
                                        placeholder="Enter Country"

                                    />
                                   
                                        <div className="text-danger form-text">
                                            This field is required.
                                        </div>
                                   
                                
                            </div>
                       
                           
                               
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                        University<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter University"
                                            name="website"
                                            
                                        />
                                       <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> 
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Payment Method<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Payment Method"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="businessMailID"
                                            
                                        />
                                        
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        
                                            <div className="text-danger form-text">
                                                Enter valid Email Id.
                                            </div>
                                       
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                        Commission Paid On<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Commission Paid On "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="businessContactNo"
                                            
                                        />
                                      

                                            <span className="text-danger form-text profile_error">

                                                This field is required.

                                            </span> 
                                                <span className="text-danger form-text profile_error">
                                                    Enter valid mobile number.
                                                </span> 
                                   
                                </div>

                               

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                        Eligibility<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Eligibility"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="name"
                                            
                                        />
                                        <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> 
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  
                                        <label style={{ color: "#231F20" }}>
                                        Tax<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Tax"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="contactNo"
                                            
                                        />
                                        

                                            <span className="text-danger form-text profile_error">

                                                This field is required.

                                            </span>
                                                <span className="text-danger form-text profile_error">
                                                    Enter valid mobile number.
                                                </span> : null

                                        
                                    
                                </div>


                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Staff Email ID<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Staff Email ID"
                                            name="emailID"
                                            
                                        />
                                       
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        
                                            <div className="text-danger form-text">
                                                Enter valid Email Id.
                                            </div>
                                      
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            whatsApp Number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter WhatsApp Number"
                                            name="whatsAppNumber"
                                            
                                        />
                                        <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> 
                                    
                                </div>
                               
                           <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                   <label style={{ color: "#231F20" }}>
                                       Address Line1<span className="text-danger">*</span>
                                   </label>
                                   <input
                                       type="text"
                                       className="form-control "
                                       style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                       placeholder="Enter No Area Street Name"
                                       name="addressLine1"
                                       
                                   />
                                    <span className="text-danger form-text profile_error">
                                       This field is required.
                                   </span> 
                             
                           </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            Address Line2<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter City State"
                                            name="addressLine2"
                                            
                                        />
                                        <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> 
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            Pin<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Country Pincode"
                                            name="addressLine3"
                                            
                                        />
                                        <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> 
                                   
                                </div>
                               
                               
                               
                                <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                    <Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} to="/ClientList" className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} type="submit" className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-2">
                                        Submit
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
export default EditCommission;
